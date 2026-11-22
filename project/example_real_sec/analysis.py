#!/usr/bin/env python3
"""Score the real SEC cohort and build the worked final-project evidence.

The committed `scored_events.csv` contains outputs from the pinned FinBERT model
so the lecture and notebook run without a model download. Use `--score-finbert`
after running `download_sec_data.py` to recreate those scores from the archived
release text. Analysis never reads the later outcome while constructing a text
score; outcomes enter only after the score table has been frozen.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Callable

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent
EVENTS = ROOT / "data" / "derived" / "sec_events.csv"
SCORED = ROOT / "data" / "derived" / "scored_events.csv"
SUMMARY = ROOT / "data" / "derived" / "summary.json"
FIGURES = ROOT / "figures"

MODEL_ID = "ProsusAI/finbert"
MODEL_REVISION = "0bc2ac10dda6929bcb1f77ccc43c7ec5c424f031"
MODEL_LICENSE = "CC BY-NC-SA 4.0"
WINDOW_TOKENS = 480
MAX_WINDOWS = 8
BOOTSTRAP_REPETITIONS = 2000
BOOTSTRAP_SEED = 20261122

BLUE = "#1565c0"
GREY = "#6b7280"
GREEN = "#2e7d32"
RED = "#a32121"
AMBER = "#b36b00"
NAVY = "#18376b"

POSITIVE = {
    "achieve", "achieved", "benefit", "confident", "exceed", "exceeded", "growth",
    "improve", "improved", "increase", "increased", "momentum", "profit", "record",
    "resilient", "strong", "strength", "upside",
}
NEGATIVE = {
    "adverse", "challenge", "challenging", "decline", "declined", "decrease",
    "decreased", "deteriorate", "deteriorated", "impairment", "loss", "pressure",
    "risk", "slowdown", "uncertain", "weak", "weakness",
}


def lexicon_score(text: str) -> float:
    """Transparent count baseline: normalized positive-minus-negative word hits."""
    words = [word for word in "".join(ch.lower() if ch.isalpha() else " " for ch in text).split()]
    positive = sum(word in POSITIVE for word in words)
    negative = sum(word in NEGATIVE for word in words)
    return (positive - negative) / max(positive + negative, 1)


def load_release(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8", errors="replace")


def selected_windows(token_ids: list[int], width: int = WINDOW_TOKENS, maximum: int = MAX_WINDOWS) -> list[list[int]]:
    """Select deterministic, evenly spaced windows from the complete release."""
    if len(token_ids) <= width:
        return [token_ids]
    starts = np.linspace(0, len(token_ids) - width, num=min(maximum, int(np.ceil(len(token_ids) / width))))
    return [token_ids[int(round(start)): int(round(start)) + width] for start in np.unique(starts)]


def finbert_scorer() -> tuple[Callable[[str], tuple[float, float, float, float, int]], dict[str, Any]]:
    try:
        import torch
        from transformers import AutoModelForSequenceClassification, AutoTokenizer
    except ImportError as exc:
        raise RuntimeError(
            "Re-scoring requires transformers and torch. Run: "
            "pip install 'transformers==4.44.2' torch"
        ) from exc

    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, revision=MODEL_REVISION)
    # We tokenize the full document only to choose our own windows; each model
    # call below remains within BERT's 512-token limit.
    tokenizer.model_max_length = 10**9
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_ID, revision=MODEL_REVISION)
    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    model.to(device)
    model.eval()
    labels = {int(index): str(label).lower() for index, label in model.config.id2label.items()}
    reverse = {label: index for index, label in labels.items()}
    required = {"positive", "negative", "neutral"}
    if not required.issubset(reverse):
        raise RuntimeError(f"Unexpected FinBERT labels: {labels}")

    def score(text: str) -> tuple[float, float, float, float, int]:
        ids = tokenizer.encode(text, add_special_tokens=False)
        windows = selected_windows(ids)
        prepared = [
            tokenizer.prepare_for_model(
                window,
                add_special_tokens=True,
                return_attention_mask=True,
                truncation=True,
                max_length=512,
            )
            for window in windows
        ]
        encoded = {key: value.to(device) for key, value in tokenizer.pad(prepared, padding=True, return_tensors="pt").items()}
        with torch.no_grad():
            probabilities = torch.softmax(model(**encoded).logits, dim=-1).cpu().numpy()
        mean = probabilities.mean(axis=0)
        positive = float(mean[reverse["positive"]])
        negative = float(mean[reverse["negative"]])
        neutral = float(mean[reverse["neutral"]])
        return positive - negative, positive, negative, neutral, len(windows)

    metadata = {
        "model": MODEL_ID,
        "revision": MODEL_REVISION,
        "license": MODEL_LICENSE,
        "window_tokens": WINDOW_TOKENS,
        "maximum_windows": MAX_WINDOWS,
        "pooling": "mean class probabilities across evenly spaced windows",
        "scoring_device": str(device),
    }
    return score, metadata


def score_events(events_path: Path = EVENTS, output: Path = SCORED) -> pd.DataFrame:
    events = pd.read_csv(events_path, dtype={"cik": str})
    scorer, metadata = finbert_scorer()
    rows = []
    for index, row in events.iterrows():
        text = load_release(row["release_text_path"])
        fb_score, positive, negative, neutral, windows = scorer(text)
        rows.append(
            {
                **row.to_dict(),
                "lexicon_score": lexicon_score(text),
                "finbert_score": fb_score,
                "finbert_positive_probability": positive,
                "finbert_negative_probability": negative,
                "finbert_neutral_probability": neutral,
                "finbert_windows": windows,
            }
        )
        print(f"[{index + 1:02d}/{len(events):02d}] {row['ticker']} {row['filing_date']} windows={windows}")
    scored = pd.DataFrame(rows)
    output.parent.mkdir(parents=True, exist_ok=True)
    scored.to_csv(output, index=False)
    metadata["observations"] = len(scored)
    metadata["score_columns"] = [
        "finbert_score", "finbert_positive_probability", "finbert_negative_probability",
        "finbert_neutral_probability", "finbert_windows",
    ]
    output.with_suffix(".model.json").write_text(json.dumps(metadata, indent=2) + "\n")
    return scored


def rank_ic(score: pd.Series | np.ndarray, outcome: pd.Series | np.ndarray) -> float:
    left = pd.Series(np.asarray(score, float)).rank(method="average")
    right = pd.Series(np.asarray(outcome, float)).rank(method="average")
    return float(left.corr(right))


def top_third_mean(frame: pd.DataFrame, score: str) -> tuple[float, int]:
    cutoff = frame[score].quantile(2 / 3)
    selected = frame[frame[score] >= cutoff]
    return float(selected["target_next_quarter_yoy_growth"].mean()), len(selected)


def issuer_bootstrap_ic(frame: pd.DataFrame, score: str) -> np.ndarray:
    """Resample issuer index blocks while preserving within-company sequences."""
    rng = np.random.default_rng(BOOTSTRAP_SEED)
    groups = [np.flatnonzero(frame["ticker"].to_numpy() == ticker) for ticker in sorted(frame["ticker"].unique())]
    score_values = frame[score].to_numpy(float)
    outcomes = frame["target_next_quarter_yoy_growth"].to_numpy(float)
    values = np.empty(BOOTSTRAP_REPETITIONS)
    for _ in range(BOOTSTRAP_REPETITIONS):
        selected = rng.integers(0, len(groups), size=len(groups))
        indices = np.concatenate([groups[index] for index in selected])
        values[_] = rank_ic(score_values[indices], outcomes[indices])
    return values


def issuer_bootstrap_selected_mean(frame: pd.DataFrame, score: str | None) -> np.ndarray:
    """Bootstrap the overall or top-third outcome mean by issuer block."""
    rng = np.random.default_rng(BOOTSTRAP_SEED)
    groups = [np.flatnonzero(frame["ticker"].to_numpy() == ticker) for ticker in sorted(frame["ticker"].unique())]
    scores = frame[score].to_numpy(float) if score else None
    outcomes = frame["target_next_quarter_yoy_growth"].to_numpy(float)
    values = np.empty(BOOTSTRAP_REPETITIONS)
    for repetition in range(BOOTSTRAP_REPETITIONS):
        selected_groups = rng.integers(0, len(groups), size=len(groups))
        indices = np.concatenate([groups[index] for index in selected_groups])
        if scores is None:
            values[repetition] = outcomes[indices].mean()
        else:
            cutoff = np.quantile(scores[indices], 2 / 3)
            values[repetition] = outcomes[indices][scores[indices] >= cutoff].mean()
    return values


def interval(values: np.ndarray) -> tuple[float, float]:
    finite = values[np.isfinite(values)]
    return tuple(np.quantile(finite, [0.05, 0.95])) if len(finite) else (np.nan, np.nan)


def clock_figure(frame: pd.DataFrame) -> None:
    row = frame.iloc[len(frame) // 2]
    fig, ax = plt.subplots(figsize=(10.5, 3.5))
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    stages = [
        (.08, "QUARTER END", row["quarter_end"], GREY),
        (.38, "8-K ACCEPTED", row["decision_time_utc"][:10], BLUE),
        (.70, "NEXT QUARTER", row["outcome_quarter_end"], AMBER),
        (.92, "LABEL FILED", row["outcome_available_date"], GREEN),
    ]
    ax.plot([.08, .92], [.52, .52], color="#aab2bd", lw=3)
    for x, title, date_label, color in stages:
        ax.scatter([x], [.52], s=260, color=color, zorder=3)
        ax.text(x, .70, title, ha="center", color=color, fontsize=10, fontweight="bold")
        ax.text(x, .36, date_label, ha="center", fontsize=9.5)
    ax.annotate("text becomes admissible", xy=(.38, .52), xytext=(.38, .15),
                ha="center", color=BLUE, arrowprops=dict(arrowstyle="->", color=BLUE))
    ax.annotate("future outcome only", xy=(.92, .52), xytext=(.83, .87),
                ha="center", color=GREEN, arrowprops=dict(arrowstyle="->", color=GREEN))
    ax.set_title(f"One real observation: {row['ticker']} accession {row['accession_number']}",
                 color=NAVY, fontweight="bold")
    fig.tight_layout(); fig.savefig(FIGURES / "01_information_clock.png", dpi=180, bbox_inches="tight"); plt.close(fig)


def cohort_figure(frame: pd.DataFrame) -> None:
    counts = frame.assign(year=frame["decision_time_utc"].str[:4]).pivot_table(
        index="ticker", columns=["split", "year"], values="accession_number", aggfunc="count", fill_value=0
    )
    test = frame[frame["split"] == "test"]
    fig, axes = plt.subplots(1, 2, figsize=(10.5, 4.0), gridspec_kw={"width_ratios": [1.2, 1]})
    yearly = frame.assign(year=frame["decision_time_utc"].str[:4]).groupby(["year", "split"]).size().unstack(fill_value=0)
    yearly.plot(kind="bar", stacked=True, color=[GREY, BLUE], ax=axes[0])
    axes[0].set(title="Real SEC observations by decision year", xlabel="8-K acceptance year", ylabel="labeled releases")
    axes[0].legend(title="role")
    by_ticker = test.groupby("ticker").size().sort_values()
    axes[1].barh(by_ticker.index, by_ticker.values, color=BLUE)
    axes[1].set(title="Untouched test observations", xlabel="releases", xlim=(0, max(by_ticker.max() + 1, 5)))
    for y, value in enumerate(by_ticker.values):
        axes[1].text(value + .08, y, str(value), va="center")
    for ax in axes: ax.spines[["top", "right"]].set_visible(False)
    fig.suptitle(f"Fixed six-issuer cohort: {len(frame)} observations; {len(test)} in the 2024–2025 test",
                 color=NAVY, fontweight="bold")
    fig.tight_layout(); fig.savefig(FIGURES / "02_cohort.png", dpi=180, bbox_inches="tight"); plt.close(fig)


def comparison_figure(test: pd.DataFrame, summary: dict[str, Any]) -> None:
    labels = ["transparent\nlexicon", "pinned\nFinBERT"]
    points = [summary["test"]["lexicon_ic"], summary["test"]["finbert_ic"]]
    intervals = [summary["test"]["lexicon_ic_90"], summary["test"]["finbert_ic_90"]]
    lower = [point - bounds[0] for point, bounds in zip(points, intervals)]
    upper = [bounds[1] - point for point, bounds in zip(points, intervals)]
    fig, ax = plt.subplots(figsize=(7.2, 4.1))
    for index, (point, low, high, color) in enumerate(zip(points, lower, upper, [GREY, BLUE])):
        ax.errorbar(index, point, yerr=[[low], [high]], fmt="o", ms=10,
                    color=color, ecolor=color, elinewidth=3, capsize=7)
    ax.axhline(0, color="#aab2bd", lw=1)
    ax.set(xticks=range(2), xticklabels=labels, ylabel="Spearman rank IC",
           title="FinBERT does not clearly improve the later SEC outcome ranking")
    for index, value in enumerate(points):
        ax.text(index, value + .035 * (1 if value >= 0 else -1), f"{value:+.2f}",
                ha="center", va="bottom" if value >= 0 else "top", fontweight="bold")
    ax.text(.02, .02, f"2024–2025 test: n={len(test)} • bars are 90% issuer-block bootstrap intervals",
            transform=ax.transAxes, fontsize=8.5, color=GREY)
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout(); fig.savefig(FIGURES / "03_model_comparison.png", dpi=180, bbox_inches="tight"); plt.close(fig)

    fig, ax = plt.subplots(figsize=(7.2, 4.1))
    ax.scatter(range(2), points, s=130, color=[GREY, BLUE], zorder=3)
    ax.axhline(0, color="#aab2bd", lw=1)
    ax.set(xticks=range(2), xticklabels=labels, ylabel="Spearman rank IC",
           title="Pause before seeing uncertainty: would you replace the baseline?")
    for index, value in enumerate(points):
        ax.text(index, value + .035, f"{value:+.2f}", ha="center", fontweight="bold")
    ax.text(.02, .02, f"2024–2025 test: n={len(test)} • point estimates only",
            transform=ax.transAxes, fontsize=8.5, color=RED, fontweight="bold")
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout(); fig.savefig(FIGURES / "03a_point_estimates.png", dpi=180, bbox_inches="tight"); plt.close(fig)


def policy_figure(test: pd.DataFrame, summary: dict[str, Any]) -> None:
    names = ["all test\nreleases", "lexicon\ntop third", "FinBERT\ntop third"]
    values = [
        float(test["target_next_quarter_yoy_growth"].mean()),
        summary["test"]["lexicon_selected_mean"],
        summary["test"]["finbert_selected_mean"],
    ]
    intervals = [summary["test"]["all_mean_90"], summary["test"]["lexicon_selected_mean_90"],
                 summary["test"]["finbert_selected_mean_90"]]
    lower = [(value - bounds[0]) * 100 for value, bounds in zip(values, intervals)]
    upper = [(bounds[1] - value) * 100 for value, bounds in zip(values, intervals)]
    fig, axes = plt.subplots(1, 2, figsize=(10.5, 4.0), gridspec_kw={"width_ratios": [1.15, 1]})
    axes[0].bar(names, np.array(values) * 100, color=[GREY, GREY, BLUE],
                yerr=[lower, upper], capsize=5, ecolor=NAVY)
    axes[0].axhline(0, color="black", lw=.8)
    axes[0].set(ylabel="mean next-quarter revenue growth (%)",
                title="A fixed review budget selects one third")
    for index, value in enumerate(values):
        axes[0].text(index, value * 100 + .4 * np.sign(value or 1), f"{value:.1%}", ha="center", fontweight="bold")
    ordered = test.sort_values("finbert_score", ascending=False).reset_index(drop=True)
    colors = [BLUE if index < summary["test"]["finbert_selected_n"] else "#c7ccd2" for index in range(len(ordered))]
    axes[1].bar(range(len(ordered)), ordered["target_next_quarter_yoy_growth"] * 100, color=colors)
    axes[1].axhline(0, color="black", lw=.8)
    axes[1].set(xlabel="test releases ordered by FinBERT score", ylabel="future revenue growth (%)",
                title="Blue bars received scarce review capacity")
    for ax in axes: ax.spines[["top", "right"]].set_visible(False)
    fig.suptitle("A score becomes a decision only after capacity and outcome are declared",
                 color=NAVY, fontweight="bold")
    fig.tight_layout(); fig.savefig(FIGURES / "04_review_policy.png", dpi=180, bbox_inches="tight"); plt.close(fig)


def summarize(frame: pd.DataFrame) -> dict[str, Any]:
    test = frame[frame["split"] == "test"].copy()
    outcome = "target_next_quarter_yoy_growth"
    lex_ic = rank_ic(test["lexicon_score"], test[outcome])
    fin_ic = rank_ic(test["finbert_score"], test[outcome])
    lex_boot = issuer_bootstrap_ic(test, "lexicon_score")
    fin_boot = issuer_bootstrap_ic(test, "finbert_score")
    difference_boot = fin_boot - lex_boot
    lex_selected, lex_n = top_third_mean(test, "lexicon_score")
    fin_selected, fin_n = top_third_mean(test, "finbert_score")
    all_mean_boot = issuer_bootstrap_selected_mean(test, None)
    lex_selected_boot = issuer_bootstrap_selected_mean(test, "lexicon_score")
    fin_selected_boot = issuer_bootstrap_selected_mean(test, "finbert_score")
    return {
        "design": {
            "observations": len(frame),
            "development": int((frame["split"] == "development").sum()),
            "test": len(test),
            "test_start": "2024-01-01",
            "outcome": "next-quarter year-over-year revenue growth from later SEC XBRL",
            "decision": "send the top third of current earnings releases to scarce analyst review",
            "bootstrap": f"{BOOTSTRAP_REPETITIONS} issuer-block resamples; seed {BOOTSTRAP_SEED}; 90% percentile intervals",
        },
        "model": json.loads(SCORED.with_suffix(".model.json").read_text()),
        "test": {
            "lexicon_ic": lex_ic,
            "finbert_ic": fin_ic,
            "lexicon_ic_90": interval(lex_boot),
            "finbert_ic_90": interval(fin_boot),
            "finbert_minus_lexicon_ic": fin_ic - lex_ic,
            "finbert_minus_lexicon_ic_90": interval(difference_boot),
            "all_mean": float(test[outcome].mean()),
            "all_mean_90": interval(all_mean_boot),
            "lexicon_selected_mean": lex_selected,
            "lexicon_selected_mean_90": interval(lex_selected_boot),
            "finbert_selected_mean": fin_selected,
            "finbert_selected_mean_90": interval(fin_selected_boot),
            "lexicon_selected_n": lex_n,
            "finbert_selected_n": fin_n,
        },
        "warranted_claim": "In this fixed six-issuer test, the pinned FinBERT score does not establish an incremental ranking advantage over a transparent lexicon for next-quarter revenue growth.",
    }


def run(scored_path: Path = SCORED) -> dict[str, Any]:
    frame = pd.read_csv(scored_path, dtype={"cik": str})
    required = {"lexicon_score", "finbert_score", "target_next_quarter_yoy_growth", "split"}
    missing = required - set(frame)
    if missing:
        raise RuntimeError(f"Scored data are missing columns: {sorted(missing)}")
    FIGURES.mkdir(exist_ok=True)
    summary = summarize(frame)
    SUMMARY.write_text(json.dumps(summary, indent=2) + "\n")
    clock_figure(frame)
    cohort_figure(frame)
    comparison_figure(frame[frame["split"] == "test"], summary)
    policy_figure(frame[frame["split"] == "test"], summary)
    return summary


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--score-finbert", action="store_true", help="Recompute model scores from downloaded release text.")
    parser.add_argument("--events", type=Path, default=EVENTS)
    parser.add_argument("--scored", type=Path, default=SCORED)
    args = parser.parse_args()
    if args.score_finbert:
        score_events(args.events, args.scored)
    summary = run(args.scored)
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
