#!/usr/bin/env python3
"""Build the interactive notebook from reviewable Markdown and code cells."""

from pathlib import Path

import nbformat as nbf

ROOT = Path(__file__).resolve().parent
PATHWAY1 = ROOT / "pathway1_integrated_notebook"
PATHWAY2 = ROOT / "pathway2_separate_paper"


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

This notebook is **Pathway 1**: the prose, code, results, limitations, and
references form one integrated report. Pathway 2 uses a shorter analysis notebook
plus a separately rendered Quarto paper.
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
        ROOT.parent,
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
## 2. Understand the source before calculating anything

### What is an 8-K?

A **Form 8-K** is a company's current report for specified events. It is not the
regular quarterly 10-Q or annual 10-K. In our selected filings, **Item 2.02** says
the report concerns results of operations and financial condition; **Item 9.01**
lists the exhibits; and **Exhibit 99.1** is the attached earnings release we score.

Open the exact Apple example:

- [SEC filing-detail page](https://www.sec.gov/Archives/edgar/data/320193/000032019323000005/0000320193-23-000005-index.html)
- [selected Exhibit 99.1](https://www.sec.gov/Archives/edgar/data/320193/000032019323000005/a8-kex991q1202312312022.htm)

The filing page is the folder and index. The exhibit is the document the model
reads. The future outcome comes from structured XBRL facts in a later filing.
"""),
    code("""
display(Image(filename=str(ROOT / "figures/05_sec_filing_page.png")))
display(Image(filename=str(ROOT / "figures/06_sec_exhibit.png")))
"""),
    md("""
### Inspect the corresponding research record

The feature is the selected EX-99 earnings release. The record also retains the
8-K accession, SEC URL, acceptance time, exhibit hash, future label date, and future
XBRL accession.
"""),
    code("""
columns = ["ticker", "accession_number", "decision_time_utc", "release_type",
           "exhibit_url", "release_sha256", "outcome_quarter_end", "outcome_available_date",
           "outcome_accession_number", "split"]
apple = frame.loc[frame.accession_number == "0000320193-23-000005", columns].iloc[0]
display(apple.to_frame("recorded value"))
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
PATHWAY1.mkdir(parents=True, exist_ok=True)
nbf.write(notebook, ROOT / "analysis.ipynb")
nbf.write(notebook, PATHWAY1 / "analysis.ipynb")

pathway2_cells = [
    md("""
# Analysis companion for the separate Quarto paper

This is **Pathway 2**. The notebook produces and audits the evidence. The paper in
this folder carries the complete research narrative. Both pathways use the same
root-level data, code, figures, and frozen conclusion.
"""),
    code("""
from pathlib import Path
import json, sys
import pandas as pd
from IPython.display import Image, display

HERE = Path.cwd()
candidates = [HERE, HERE.parent, HERE / "project" / "example_real_sec",
              Path("/content/uc_finmlai/project/example_real_sec")]
ROOT = next((p for p in candidates if (p / "analysis.py").exists()), None)
if ROOT is None:
    raise FileNotFoundError("Run from project/example_real_sec/pathway2_separate_paper or the project root.")
sys.path.insert(0, str(ROOT))
import analysis as A
frame = pd.read_csv(ROOT / "data/derived/scored_events.csv", dtype={"cik": str})
summary = json.loads((ROOT / "data/derived/summary.json").read_text())
print(f"Project root: {ROOT}")
print(f"Rows: {len(frame)}; later test: {(frame.split == 'test').sum()}")
"""),
    md("""
## Audit one source record

The feature is Apple's selected Exhibit 99.1, accepted with the February 2, 2023
8-K. The label is next-quarter revenue growth computed from a later filing.
"""),
    code("""
cols = ["ticker", "accession_number", "decision_time_utc", "exhibit_url",
        "release_sha256", "outcome_available_date", "outcome_accession_number"]
display(frame.loc[frame.accession_number == "0000320193-23-000005", cols].T)
display(Image(filename=str(ROOT / "figures/01_information_clock.png")))
"""),
    md("""
## Recreate the declared evidence

`analysis.py` reads the committed score ledger, recomputes the later-test metrics,
and rebuilds every result figure. Add `--score-finbert` only when intentionally
re-scoring the raw releases with the pinned checkpoint.
"""),
    code("""
A.run()
display(Image(filename=str(ROOT / "figures/03_model_comparison.png")))
display(Image(filename=str(ROOT / "figures/04_review_policy.png")))
"""),
    code("""
print("Lexicon test rank IC:", round(summary["test"]["lexicon_ic"], 3))
print("FinBERT test rank IC:", round(summary["test"]["finbert_ic"], 3))
print("Paired difference:", round(summary["test"]["finbert_minus_lexicon_ic"], 3))
print("Paired 90% interval:", [round(x, 3) for x in summary["test"]["finbert_minus_lexicon_ic_90"]])
"""),
    md("""
## Hand the evidence to the paper

The Quarto paper references the same root-level figures and reports the same
metrics. It may improve explanation, but it may not change the model, population,
threshold, or final test after seeing these results.
"""),
]

pathway2_notebook = nbf.v4.new_notebook(cells=pathway2_cells)
pathway2_notebook["metadata"] = notebook["metadata"]
PATHWAY2.mkdir(parents=True, exist_ok=True)
nbf.write(pathway2_notebook, PATHWAY2 / "analysis.ipynb")
print(f"wrote root and pathway notebooks ({len(cells)} integrated cells; {len(pathway2_cells)} analysis cells)")

