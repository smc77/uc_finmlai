#!/usr/bin/env python3
"""Download and assemble the real-SEC cohort for the FIN 7057 worked project.

The script follows the information discipline used by the Signal Factory:

* start from original Form 8-K filings that report Item 2.02;
* use the SEC acceptance timestamp as an earliest-public-time bound;
* archive the filing index-header record and selected EX-99 earnings-release
  exhibit;
* hash every source artifact;
* attach a later XBRL revenue outcome without letting it enter the text feature;
* preserve the outcome-availability date separately from the decision time.

Raw files are cached and never silently replaced. The compact derived CSV can be
committed; raw SEC payloads are reproducible from the recorded URLs and hashes.

Example
-------
SEC_USER_AGENT="Your Name you@example.edu" \
    python download_sec_data.py
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import html
import json
import os
import re
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import UTC, date, datetime, timedelta
from pathlib import Path
from typing import Any, Iterable

ROOT = Path(__file__).resolve().parent
DEFAULT_COHORT = ROOT / "cohort.json"
DEFAULT_RAW = ROOT / "data" / "raw"
DEFAULT_OUTPUT = ROOT / "data" / "derived" / "sec_events.csv"

SUBMISSIONS = "https://data.sec.gov/submissions/CIK{cik:010d}.json"
COMPANYFACTS = "https://data.sec.gov/api/xbrl/companyfacts/CIK{cik:010d}.json"
FILING_HEADER = "https://www.sec.gov/Archives/edgar/data/{cik}/{compact}/{accession}-index-headers.html"
DOCUMENT = "https://www.sec.gov/Archives/edgar/data/{cik}/{compact}/{filename}"

BLOCK_END = re.compile(r"(?i)<br\s*/?>|</(p|div|tr|h[1-6]|li|table|title)\s*>")
CELL_END = re.compile(r"(?i)</t[dh]\s*>")


class DownloadError(RuntimeError):
    pass


def sha256(payload: bytes) -> str:
    return hashlib.sha256(payload).hexdigest()


def atomic_write(path: Path, payload: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".partial")
    temporary.write_bytes(payload)
    os.replace(temporary, path)


class SecClient:
    """Small, conservative SEC client with an explicit contact User-Agent."""

    def __init__(self, user_agent: str, interval: float = 0.20, timeout: float = 60.0):
        if "@" not in user_agent or len(user_agent.strip()) < 12:
            raise DownloadError("The SEC User-Agent must identify you and include a contact email.")
        if interval < 0.12:
            raise DownloadError("Request interval must be at least 0.12 seconds.")
        self.user_agent = user_agent
        self.interval = interval
        self.timeout = timeout
        self.last_request = 0.0

    def get(self, url: str, destination: Path) -> bytes:
        if destination.exists():
            return destination.read_bytes()
        wait = self.interval - (time.monotonic() - self.last_request)
        if wait > 0:
            time.sleep(wait)
        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": self.user_agent,
                "Accept-Encoding": "identity",
                "Accept": "application/json,text/html,text/plain,*/*",
            },
        )
        for attempt in range(4):
            try:
                with urllib.request.urlopen(request, timeout=self.timeout) as response:  # noqa: S310
                    payload = response.read()
                self.last_request = time.monotonic()
                atomic_write(destination, payload)
                return payload
            except urllib.error.HTTPError as exc:
                self.last_request = time.monotonic()
                if exc.code in {429, 503} and attempt < 3:
                    time.sleep(5 * (attempt + 1))
                    continue
                raise DownloadError(f"SEC returned HTTP {exc.code} for {url}") from exc
            except urllib.error.URLError as exc:
                if attempt < 3:
                    time.sleep(3 * (attempt + 1))
                    continue
                raise DownloadError(f"Could not retrieve {url}: {exc.reason}") from exc
        raise DownloadError(f"Exhausted retries for {url}")


def clean_html(raw: bytes) -> str:
    """Convert an exhibit to stable plain text while keeping table rows together."""
    text = raw.decode("utf-8", errors="replace")
    text = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", text)
    text = re.sub(r"(?is)<!--.*?-->", " ", text)
    text = CELL_END.sub(" | ", text)
    text = BLOCK_END.sub("\n", text)
    text = html.unescape(re.sub(r"<[^>]+>", " ", text)).replace("\xa0", " ")
    lines = []
    for line in text.splitlines():
        line = re.sub(r"[ \t]+", " ", line).strip(" |")
        line = re.sub(r"\s*\|(?:\s*\|)+\s*", " | ", line)
        if line:
            lines.append(line)
    return "\n".join(lines) + "\n"


def document_blocks(submission: str) -> list[dict[str, str]]:
    # The SEC index-header endpoint wraps SGML document tags in an HTML <pre>
    # block, so decode entities before applying the document parser.
    submission = html.unescape(submission)
    documents = []
    for block in re.findall(r"<DOCUMENT>(.*?)</DOCUMENT>", submission, flags=re.S | re.I):
        def field(name: str) -> str:
            match = re.search(rf"<{name}>([^\n<]+)", block, flags=re.I)
            return match.group(1).strip() if match else ""

        text_match = re.search(r"<TEXT>(.*)</TEXT>", block, flags=re.S | re.I)
        documents.append(
            {
                "type": field("TYPE"),
                "sequence": field("SEQUENCE"),
                "filename": field("FILENAME"),
                "description": field("DESCRIPTION"),
                "payload": text_match.group(1) if text_match else "",
            }
        )
    return documents


def select_release(documents: list[dict[str, str]]) -> dict[str, str] | None:
    """Choose one earnings-release exhibit with a declared, deterministic rule."""
    exhibits = [row for row in documents if row["type"].upper().startswith("EX-99") and row["filename"]]
    if not exhibits:
        return None
    preferred = [row for row in exhibits if row["type"].upper() in {"EX-99.1", "EX-99.01"}]
    pool = preferred or exhibits
    results_words = re.compile(r"(?i)results|earnings|quarter|financial")
    described = [row for row in pool if results_words.search(row["description"] + " " + row["filename"])]
    pool = described or pool
    return sorted(pool, key=lambda row: (row["sequence"] or "999", row["filename"]))[0]


def rows(recent: dict[str, list[Any]]) -> Iterable[dict[str, Any]]:
    length = len(recent["accessionNumber"])
    for index in range(length):
        yield {key: values[index] for key, values in recent.items() if len(values) == length}


def original_item_202(row: dict[str, Any], start: str, end: str) -> bool:
    return (
        row.get("form") == "8-K"
        and "2.02" in str(row.get("items", ""))
        and start <= str(row.get("filingDate", "")) <= end
    )


@dataclass(frozen=True)
class RevenueObservation:
    concept: str
    quarter_start: str
    quarter_end: str
    value: float
    prior_value: float
    yoy_growth: float
    xbrl_accession: str
    filed: str


def date_distance(left: str, right: str) -> int:
    return abs((date.fromisoformat(left) - date.fromisoformat(right)).days)


def revenue_observation(
    facts: dict[str, Any], concepts: list[str], event_date: str
) -> RevenueObservation | None:
    """Find the quarterly revenue first reported shortly after an earnings release.

    Only 10-Q duration facts are used. Fourth-quarter derivation is deliberately
    omitted so the teaching example does not hide an annual-minus-nine-month rule.
    The prior-year comparison must appear in the same 10-Q accession.
    """
    event = date.fromisoformat(event_date)
    for concept in concepts:
        units = (
            facts.get("facts", {})
            .get("us-gaap", {})
            .get(concept, {})
            .get("units", {})
            .get("USD", [])
        )
        candidates = []
        for row in units:
            if row.get("form") != "10-Q" or not all(key in row for key in ("start", "end", "filed", "accn", "val")):
                continue
            start_date, end_date, filed = map(date.fromisoformat, (row["start"], row["end"], row["filed"]))
            duration = (end_date - start_date).days
            if not 75 <= duration <= 120:
                continue
            if not event <= filed <= event + timedelta(days=21):
                continue
            if not event - timedelta(days=130) <= end_date <= event:
                continue
            candidates.append(row)
        for current in sorted(candidates, key=lambda row: (row["end"], row["filed"]), reverse=True):
            prior_rows = [
                row
                for row in units
                if row.get("accn") == current["accn"]
                and row.get("form") == "10-Q"
                and all(key in row for key in ("start", "end", "val"))
                and 350 <= (date.fromisoformat(current["end"]) - date.fromisoformat(row["end"])).days <= 380
                and 75 <= (date.fromisoformat(row["end"]) - date.fromisoformat(row["start"])).days <= 120
            ]
            if not prior_rows:
                continue
            prior = min(prior_rows, key=lambda row: date_distance(row["end"], current["end"]))
            if float(prior["val"]) == 0:
                continue
            growth = float(current["val"]) / float(prior["val"]) - 1.0
            return RevenueObservation(
                concept=concept,
                quarter_start=current["start"],
                quarter_end=current["end"],
                value=float(current["val"]),
                prior_value=float(prior["val"]),
                yoy_growth=growth,
                xbrl_accession=current["accn"],
                filed=current["filed"],
            )
    return None


def capture_issuer(
    client: SecClient,
    issuer: dict[str, Any],
    cohort: dict[str, Any],
    raw_root: Path,
) -> list[dict[str, Any]]:
    cik = int(issuer["cik"])
    issuer_root = raw_root / f"CIK{cik:010d}"
    submissions_url = SUBMISSIONS.format(cik=cik)
    facts_url = COMPANYFACTS.format(cik=cik)
    submissions_bytes = client.get(submissions_url, issuer_root / "submissions.json")
    facts_bytes = client.get(facts_url, issuer_root / "companyfacts.json")
    submissions = json.loads(submissions_bytes)
    facts = json.loads(facts_bytes)
    events: list[dict[str, Any]] = []
    for filing in rows(submissions["filings"]["recent"]):
        if not original_item_202(filing, cohort["start_date"], cohort["end_date"]):
            continue
        observation = revenue_observation(facts, cohort["revenue_concepts"], filing["filingDate"])
        if observation is None:
            continue
        accession = filing["accessionNumber"]
        compact = accession.replace("-", "")
        filing_header_url = FILING_HEADER.format(cik=cik, compact=compact, accession=accession)
        filing_root = issuer_root / accession
        header_payload = client.get(filing_header_url, filing_root / "header.html")
        selected = select_release(document_blocks(header_payload.decode("utf-8", errors="replace")))
        if selected is None:
            continue
        exhibit_url = DOCUMENT.format(cik=cik, compact=compact, filename=selected["filename"])
        release_html = client.get(exhibit_url, filing_root / "release.source")
        release_text = clean_html(release_html)
        atomic_write(filing_root / "release.txt", release_text.encode("utf-8"))
        events.append(
            {
                "cohort_id": cohort["cohort_id"],
                "ticker": issuer["ticker"],
                "company": issuer["name"],
                "cik": f"{cik:010d}",
                "accession_number": accession,
                "decision_time_utc": filing.get("acceptanceDateTime") or filing["filingDate"],
                "filing_date": filing["filingDate"],
                "quarter_start": observation.quarter_start,
                "quarter_end": observation.quarter_end,
                "release_type": selected["type"],
                "release_filename": selected["filename"],
                "release_text_path": str((filing_root / "release.txt").relative_to(ROOT)),
                "release_sha256": sha256(release_text.encode("utf-8")),
                "filing_header_url": filing_header_url,
                "filing_header_sha256": sha256(header_payload),
                "exhibit_url": exhibit_url,
                "exhibit_sha256": sha256(release_html),
                "revenue_concept": observation.concept,
                "current_revenue": observation.value,
                "prior_year_revenue": observation.prior_value,
                "current_yoy_growth": observation.yoy_growth,
                "current_xbrl_accession": observation.xbrl_accession,
                "current_label_available_date": observation.filed,
            }
        )
    # Keep the earliest release when more than one Item 2.02 filing maps to a quarter.
    by_quarter: dict[str, dict[str, Any]] = {}
    for event in sorted(events, key=lambda row: (row["quarter_end"], row["decision_time_utc"])):
        by_quarter.setdefault(event["quarter_end"], event)
    return list(by_quarter.values())


def add_future_outcomes(events: list[dict[str, Any]], test_start: str) -> list[dict[str, Any]]:
    output = []
    by_issuer: dict[str, list[dict[str, Any]]] = {}
    for event in events:
        by_issuer.setdefault(event["cik"], []).append(event)
    for issuer_events in by_issuer.values():
        issuer_events.sort(key=lambda row: row["quarter_end"])
        for current, future in zip(issuer_events, issuer_events[1:]):
            gap = (date.fromisoformat(future["quarter_end"]) - date.fromisoformat(current["quarter_end"])).days
            if not 75 <= gap <= 125:
                continue
            output.append(
                current
                | {
                    "target_next_quarter_yoy_growth": future["current_yoy_growth"],
                    "outcome_quarter_end": future["quarter_end"],
                    "outcome_available_date": future["current_label_available_date"],
                    "outcome_accession_number": future["accession_number"],
                    "split": "test" if current["decision_time_utc"][:10] >= test_start else "development",
                }
            )
    return sorted(output, key=lambda row: (row["decision_time_utc"], row["ticker"]))


def write_csv(path: Path, records: list[dict[str, Any]]) -> None:
    if not records:
        raise DownloadError("The declared cohort produced no labeled observations.")
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".partial")
    with temporary.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(records[0]))
        writer.writeheader()
        writer.writerows(records)
    os.replace(temporary, path)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cohort", type=Path, default=DEFAULT_COHORT)
    parser.add_argument("--raw-root", type=Path, default=DEFAULT_RAW)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--user-agent", default=os.getenv("SEC_USER_AGENT", ""))
    parser.add_argument("--request-interval", type=float, default=0.20)
    parser.add_argument("--timeout", type=float, default=60.0)
    args = parser.parse_args()
    cohort = json.loads(args.cohort.read_text(encoding="utf-8"))
    client = SecClient(args.user_agent, args.request_interval, args.timeout)
    captured = []
    for issuer in cohort["issuers"]:
        issuer_events = capture_issuer(client, issuer, cohort, args.raw_root)
        print(f"{issuer['ticker']}: {len(issuer_events)} quarterly releases with XBRL revenue")
        captured.extend(issuer_events)
    labeled = add_future_outcomes(captured, cohort["test_start"])
    write_csv(args.output, labeled)
    manifest = {
        "cohort": cohort,
        "observations": len(labeled),
        "development": sum(row["split"] == "development" for row in labeled),
        "test": sum(row["split"] == "test" for row in labeled),
        "output": (
            str(args.output.resolve().relative_to(ROOT))
            if args.output.resolve().is_relative_to(ROOT)
            else str(args.output.resolve())
        ),
        "output_sha256": sha256(args.output.read_bytes()),
        "created_utc": datetime.now(UTC).isoformat(timespec="seconds").replace("+00:00", "Z"),
        "user_agent_sha256": sha256(args.user_agent.encode("utf-8")),
    }
    manifest_path = args.output.with_suffix(".manifest.json")
    atomic_write(manifest_path, (json.dumps(manifest, indent=2) + "\n").encode("utf-8"))
    print(json.dumps({key: manifest[key] for key in ("observations", "development", "test", "output_sha256")}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
