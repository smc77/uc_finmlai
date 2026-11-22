# Worked final-project example: real SEC filings and pinned FinBERT

This is the empirical companion to [`../example/`](../example/). It follows the
Week 14 recommended project structure while replacing the synthetic filings with
real SEC EDGAR evidence. Like the simulated example, it now demonstrates both
permitted final-report pathways.

> **Question:** Does the pinned `ProsusAI/finbert` sentiment score rank
> next-quarter year-over-year revenue growth better than a transparent word-count
> baseline in a fixed six-issuer cohort?

The intended decision is deliberately modest: an analyst has capacity to inspect
one third of newly filed earnings releases. The score ranks which releases receive
that scarce follow-up. This is not presented as a trading strategy.

## What is real, frozen, and illustrative

- **Real evidence:** original Form 8-K Item 2.02 earnings-release exhibits from
  SEC EDGAR, their acceptance clocks, and later quarterly revenue facts from SEC
  XBRL companyfacts.
- **Fixed teaching cohort:** AAPL, MSFT, NVDA, CAT, KO, and IBM; releases from
  2020–2025; test period begins January 1, 2024.
- **Pinned candidate:** `ProsusAI/finbert`, revision
  `0bc2ac10dda6929bcb1f77ccc43c7ec5c424f031`, using the mean class probabilities
  from at most eight evenly spaced 480-token windows.
- **Transparent baseline:** normalized positive-minus-negative hits from the
  small vocabulary printed in `analysis.py`.
- **Illustrative policy:** send the top third of releases to analyst review.
- **Important boundary:** six large issuers and 23 later observations cannot
  establish market-wide performance or a profitable strategy.

The committed score table lets the notebook run without downloading a transformer.
The downloader and scoring path remain available so every number can be recreated.

## What the actual SEC data are

The analytical table is assembled from two different public records:

1. A company furnishes an earnings release with a **Form 8-K**. Item 2.02 says
   the report concerns results of operations and financial condition; Item 9.01
   lists the exhibits; and Exhibit 99.1 is the document converted to text and
   scored in this example.
2. A later SEC filing supplies structured **XBRL** revenue facts for the next
   fiscal quarter and the same quarter one year earlier. Those facts create the
   future year-over-year growth label.

The worked Apple record is accession
[`0000320193-23-000005`](https://www.sec.gov/Archives/edgar/data/320193/000032019323000005/0000320193-23-000005-index.html),
accepted February 2, 2023 at 16:30:33 ET. The selected source document is its
[`EX-99.1` earnings release](https://www.sec.gov/Archives/edgar/data/320193/000032019323000005/a8-kex991q1202312312022.htm).
The project stores those URLs, identifiers, timestamps, and content hashes.

## Two final-report pathways

- **Pathway 1 — integrated Jupyter report:**
  `pathway1_integrated_notebook/analysis.ipynb` contains the written argument,
  code, source walkthrough, results, limitations, and references in one report.
  `analysis.html` is its static, employer-readable export.
- **Pathway 2 — analysis plus separate paper:**
  `pathway2_separate_paper/analysis.ipynb` is the concise computational
  companion. `paper.qmd` is a complete Quarto research paper rendered to HTML,
  editable Word, and PDF. The folder also contains the presentation in Quarto.

Both pathways use the same root-level downloader, analysis code, derived ledger,
figures, and frozen conclusion. Quarto demonstrates the separate-paper route; it
is not required for a student who chooses another writing tool.

## Files

| File | Role |
|---|---|
| `cohort.json` | Fixed issuers, dates, revenue concepts, and test boundary. |
| `download_sec_data.py` | Downloads SEC submissions, filing headers, selected EX-99 exhibits, and companyfacts; writes hashes and clocks. |
| `analysis.py` | Re-scores the releases, computes the baseline, freezes the test comparison, bootstraps by issuer, and creates figures. |
| `pathway1_integrated_notebook/` | Integrated notebook report and static HTML export. |
| `pathway2_separate_paper/` | Concise analysis notebook, Quarto paper in HTML/Word/PDF, and slides. |
| `analysis.ipynb` | Root compatibility copy of the integrated worked report. |
| `slides.qmd` | Root compatibility copy of the final-project presentation. |
| `references.bib` / `LITERATURE_MAP.md` | Verified sources and the design consequence of each. |
| `RESEARCH_RECORD.md` | Evidence, clock, model, split, result, limitations, and artifact ledger. |
| `data/derived/sec_events.csv` | The real-SEC event/outcome ledger without model scores. |
| `data/derived/scored_events.csv` | Frozen lexicon and FinBERT scores plus the real SEC ledger. |
| `data/derived/summary.json` | Exact reported metrics and uncertainty intervals. |
| `figures/` | Reproducible project figures. |

Raw payloads are intentionally excluded from Git. The derived ledger records the
source URLs and SHA-256 hashes needed to audit them.

## Fast classroom run

The committed model outputs make the core analysis lightweight:

```bash
pip install numpy pandas matplotlib
python analysis.py
jupyter lab pathway1_integrated_notebook/analysis.ipynb
```

No SEC or Hugging Face connection is needed for that path.

## Rebuild from the primary sources

The SEC asks automated clients to use a descriptive contact-bearing User-Agent.

```bash
export SEC_USER_AGENT="Your Name you@example.edu"
python download_sec_data.py

pip install -r requirements.txt
python analysis.py --score-finbert
python build_notebook.py
jupyter nbconvert --to notebook --execute --inplace pathway1_integrated_notebook/analysis.ipynb

cd pathway2_separate_paper
quarto render paper.qmd --to html
quarto render paper.qmd --to docx
quarto render paper.qmd --to pdf
```

The downloader is conservative and cached. A fresh run downloads roughly 100 MB
for the fixed cohort. It keeps the SEC acceptance time separate from the later
XBRL label date and never uses a future outcome when constructing a text score.

## Result

On the 23 releases in the 2024–2025 test:

- lexicon rank IC: **0.50**;
- FinBERT rank IC: **0.62**;
- paired FinBERT-minus-lexicon difference: **0.12**;
- issuer-block 90% interval for the difference: **−0.35 to 0.55**.

FinBERT's point estimate is higher, but the comparison does not establish a stable
incremental advantage. The correct conclusion is not “FinBERT wins.” It is that
the richer reader remains unproven relative to the cheap baseline in this small,
concentrated cohort.

## Why this is useful in Week 14B

The example gives students a real object to audit rather than another checklist.
They can pause before each reveal and ask:

1. Which timestamp makes the release admissible?
2. When does the label become available?
3. Is the baseline genuinely cheaper and transparent?
4. Would the point estimates alone justify replacing it?
5. What changes when issuer-block uncertainty is shown?
6. What decision can this result support—and what authority has it not earned?

