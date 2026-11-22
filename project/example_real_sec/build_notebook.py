#!/usr/bin/env python3
"""Build the interactive notebook from reviewable Markdown and code cells."""

from pathlib import Path

import nbformat as nbf

ROOT = Path(__file__).resolve().parent


def md(text: str):
    return nbf.v4.new_markdown_cell(text.strip() + "\n")


def code(text: str):
    return nbf.v4.new_code_cell(text.strip() + "\n")


cells = [
    md("""
# Can FinBERT improve analyst triage of real SEC earnings releases?

This worked final-project example uses **real SEC evidence**, a **pinned FinBERT
checkpoint**, a **transparent baseline**, an **untouched later period**, and a
specific decision: which one third of releases receive scarce analyst review.

The notebook uses committed model scores by default. The accompanying downloader
and `analysis.py --score-finbert` recreate the primary-source and model pipeline.
"""),
    md("""
## 1. Start with a question that can lose

> Does pinned FinBERT rank next-quarter year-over-year revenue growth better than
> a transparent word-count lexicon on 2024–2025 releases from a fixed six-issuer
> cohort?

FinBERT can lose by tying the baseline, reversing in the later period, or producing
an improvement too uncertain to justify replacing the cheap reader.
"""),
    code("""
from pathlib import Path
import json, sys
import pandas as pd
from IPython.display import Image, display

ROOT = Path.cwd()
if not (ROOT / "analysis.py").exists():
    candidates = [
        ROOT / "project" / "example_real_sec",
        Path("/content/uc_finmlai/project/example_real_sec"),
        Path("/content/aiinfinance/project/example_real_sec"),
    ]
    ROOT = next((path for path in candidates if (path / "analysis.py").exists()), None)
    if ROOT is None:
        raise FileNotFoundError(
            "Open this notebook from a clone of smc77/uc_finmlai, or run it "
            "inside project/example_real_sec so its compact data and figures are available."
        )
sys.path.insert(0, str(ROOT))
import analysis as A

frame = pd.read_csv(ROOT / "data/derived/scored_events.csv", dtype={"cik": str})
summary = json.loads((ROOT / "data/derived/summary.json").read_text())
print(f"{len(frame)} observations: {(frame.split == 'development').sum()} development, {(frame.split == 'test').sum()} test")
"""),
    md("""
## 2. Inspect one source record before calculating anything

The feature is the selected EX-99 earnings release. The record also retains the
8-K accession, SEC URL, acceptance time, exhibit hash, future label date, and future
XBRL accession.
"""),
    code("""
columns = ["ticker", "accession_number", "decision_time_utc", "release_type",
           "release_sha256", "outcome_quarter_end", "outcome_available_date",
           "outcome_accession_number", "split"]
display(frame.loc[[46], columns].T.rename(columns={46: "recorded value"}))
"""),
    md("""
### Pause 1 — Which information may the score use?

Before revealing the timeline, write down:

1. When does the release text first become admissible?
2. Which date belongs to the future outcome?
3. Why would aligning the text to quarter end be wrong?
"""),
    code("""
display(Image(filename=str(ROOT / "figures/01_information_clock.png")))
"""),
    md("""
**Reveal.** The 8-K acceptance is the earliest-public-time bound for the text. The
next-quarter revenue label is not available until a later filing. Quarter end describes
the business period; it is not the publication time.
"""),
    md("""
## 3. Make the population and test boundary visible

The fixed cohort contains six large issuers. The first 45 observations are
development evidence. The 23 observations accepted during 2024–2025 form the later
test. This is a deliberately small teaching cohort, not a representative market sample.
"""),
    code("""
display(Image(filename=str(ROOT / "figures/02_cohort.png")))
"""),
    md("""
## 4. Compare one cheap reader with one pinned candidate

- **Baseline:** the printed finance-word vocabulary in `analysis.py`.
- **Candidate:** `ProsusAI/finbert` at revision
  `0bc2ac10dda6929bcb1f77ccc43c7ec5c424f031`.
- **Long documents:** average class probabilities across at most eight evenly spaced
  480-token windows; score = positive probability − negative probability.

The checkpoint is not tuned on these releases, and the later test does not select a
different window rule.
"""),
    md("""
### Pause 2 — Would these two point estimates be enough?

Reveal the point-estimate chart. Before moving on, decide whether a test IC of 0.62
versus 0.50 would justify replacing the transparent baseline. Write down the additional
number you need.
"""),
    code("""
display(Image(filename=str(ROOT / "figures/03a_point_estimates.png")))
"""),
    md("""
## 5. Uncertainty changes the sentence

The chart below resamples issuers rather than pretending 23 releases are independent.
Both individual intervals are wide. More importantly, the paired 90% interval for
FinBERT minus lexicon is **−0.35 to +0.55**.
"""),
    code("""
display(Image(filename=str(ROOT / "figures/03_model_comparison.png")))
print("Paired IC difference:", round(summary["test"]["finbert_minus_lexicon_ic"], 3))
print("90% interval:", [round(x, 3) for x in summary["test"]["finbert_minus_lexicon_ic_90"]])
"""),
    md("""
### Pause 3 — Convert the score into a decision

Assume analyst capacity is fixed at one third of releases. Predict what the next plot
must show before it can support that policy. Is mean selected revenue growth enough, or
must the figure retain the dispersion and the unselected observations too?
"""),
    code("""
display(Image(filename=str(ROOT / "figures/04_review_policy.png")))
"""),
    md("""
## 6. The warranted conclusion

FinBERT's test point estimate is higher, and its top third contains high-growth future
quarters. But the same is true for the lexicon, the paired ranking interval includes a
large reversal, and NVIDIA contributes unusually large growth observations.

**Conclusion:** In this fixed six-issuer test, pinned FinBERT does not establish a
stable incremental ranking advantage over the transparent baseline. Keep the baseline
and require a broader issuer population plus a genuinely new later test before changing
the review policy.

That is a useful final-project result. The method was allowed to lose, the result is
visible, and the decision authority matches the evidence.
"""),
    md("""
## 7. Reproducibility and limits

- `download_sec_data.py` recreates the SEC event/outcome ledger and hashes its sources.
- `analysis.py --score-finbert` recreates the scores from the pinned checkpoint.
- `summary.json` contains every number quoted above.
- `RESEARCH_RECORD.md` distinguishes the clock, procedure, result, and limitations.

This is historical teaching evidence, not a preregistered study, a market-wide sample,
or a trading backtest. It estimates neither returns nor implementation costs.
"""),
]

notebook = nbf.v4.new_notebook(cells=cells)
notebook["metadata"]["kernelspec"] = {"display_name": "Python 3", "language": "python", "name": "python3"}
notebook["metadata"]["language_info"] = {"name": "python", "version": "3"}
nbf.write(notebook, ROOT / "analysis.ipynb")
print(f"wrote {ROOT / 'analysis.ipynb'} with {len(cells)} cells")

