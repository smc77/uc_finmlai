# Worked final-project example: real SEC filings and pinned FinBERT

This is the empirical companion to [`../example/`](../example/). It follows the
Week 14 recommended project structure while replacing the synthetic filings with
real SEC EDGAR evidence.

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

## Files

| File | Role |
|---|---|
| `cohort.json` | Fixed issuers, dates, revenue concepts, and test boundary. |
| `download_sec_data.py` | Downloads SEC submissions, filing headers, selected EX-99 exhibits, and companyfacts; writes hashes and clocks. |
| `analysis.py` | Re-scores the releases, computes the baseline, freezes the test comparison, bootstraps by issuer, and creates figures. |
| `analysis.ipynb` | Interactive worked report with predict–pause–reveal checkpoints. |
| `slides.qmd` | A 14-slide final-project presentation following the recommended structure. |
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
jupyter lab analysis.ipynb
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
jupyter nbconvert --to notebook --execute --inplace analysis.ipynb
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

