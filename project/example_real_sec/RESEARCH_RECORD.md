# Research record — SEC earnings releases, FinBERT, and analyst triage

## Identity

- **Record ID:** `fin7057-sec-finbert-v1`
- **Question:** Does a pinned FinBERT sentiment score rank next-quarter
  year-over-year revenue growth better than a transparent lexicon in a fixed
  six-issuer SEC cohort?
- **Decision:** With capacity to inspect one third of releases, rank which filings
  receive deeper analyst review.
- **Owner:** FIN 7057 worked example.
- **Evidence type:** Historical SEC evidence used for a classroom demonstration.

## Information contract

- **Feature evidence:** one selected EX-99 earnings-release exhibit attached to an
  original Form 8-K reporting Item 2.02.
- **Feature clock:** the EDGAR acceptance timestamp is an earliest-public-time
  bound. The analysis does not treat fiscal quarter end as publication time.
- **Outcome:** the issuer's next-quarter year-over-year revenue growth, constructed
  from a later-filed Form 10-Q fact and its same-filing prior-year comparative.
- **Outcome clock:** `outcome_available_date` in `sec_events.csv`; every recorded
  outcome date is later than its feature decision time.
- **Population:** AAPL, MSFT, NVDA, CAT, KO, and IBM; 2020–2025 Item 2.02 releases
  satisfying the declared quarterly-XBRL rule.
- **Exclusions:** no Q4 annual-minus-nine-month derivation; no event lacking a
  selected EX-99 exhibit, a 75–120-day 10-Q revenue duration, or a next labeled
  quarter 75–125 days later.
- **Source identity:** accession number, source URL, selected exhibit filename,
  acceptance time, and SHA-256 hashes are retained for each observation.

## Frozen procedure

- **Cohort and test boundary:** `cohort.json`; test begins 2024-01-01.
- **Baseline:** the fixed normalized word-count lexicon in `analysis.py`.
- **Candidate:** `ProsusAI/finbert`, revision
  `0bc2ac10dda6929bcb1f77ccc43c7ec5c424f031`, CC BY-NC-SA 4.0.
- **Long-document rule:** tokenize the complete release, choose at most eight
  evenly spaced 480-token windows, compute class probabilities for each, average
  the probabilities, and use positive minus negative probability as the score.
- **Development/test roles:** 45 observations before 2024; 23 later observations.
  The reported comparison uses only the later set.
- **Primary metric:** Spearman rank information coefficient with next-quarter
  revenue growth.
- **Decision metric:** mean future growth among the score's top third, alongside
  the full test population.
- **Uncertainty:** 2,000 issuer-block bootstrap resamples, seed 20261122, reporting
  90% percentile intervals. Each resample keeps an issuer's time sequence together.
- **Search ledger:** one baseline, one pinned model, one outcome, one test boundary,
  one review-capacity rule. No reported horizon or checkpoint search.

## Results

- **Observations:** 68 total; 45 development; 23 test.
- **Lexicon test IC:** 0.501; issuer-block 90% interval −0.043 to 0.814.
- **FinBERT test IC:** 0.624; issuer-block 90% interval −0.071 to 0.785.
- **Incremental IC:** 0.122; paired interval −0.351 to 0.553.
- **Mean future growth:** 18.3% for all test observations, 44.3% in the lexicon
  top third, and 46.5% in the FinBERT top third. The intervals are wide and the
  cohort contains unusually high NVIDIA growth observations.
- **Warranted claim:** The pinned FinBERT point estimate is higher, but this fixed
  six-issuer test does not establish a stable incremental ranking advantage over
  the transparent lexicon.
- **Decision:** Do not replace the baseline on this evidence alone. Expand the
  issuer population and preserve a genuinely new later test before reconsidering.

## Limitations and authority

1. Six large, surviving issuers are a convenience cohort, not a market universe.
2. Only 23 observations enter the final comparison; issuer-block intervals are wide.
3. FinBERT was trained for sentence sentiment, not this downstream revenue outcome.
4. Evenly spaced window averaging is one declared long-document policy, not a
   validated optimal aggregation rule.
5. The lexicon is deliberately small and transparent, not the full
   Loughran–McDonald dictionary.
6. Revenue growth is a fundamental outcome; the project does not estimate returns,
   trading costs, capacity, or profitability.
7. The teaching project was assembled and inspected in one development session.
   It demonstrates a lockbox structure but is not itself a preregistered study.

## Artifact ledger

| Artifact | Purpose |
|---|---|
| `cohort.json` | Population, concepts, dates, and test boundary. |
| `download_sec_data.py` | Primary-source acquisition and outcome construction. |
| `data/derived/sec_events.csv` | Source identities, hashes, clocks, and labels. |
| `data/derived/scored_events.model.json` | Pinned model and window-pooling identity. |
| `data/derived/scored_events.csv` | Frozen scores joined to the SEC ledger. |
| `data/derived/summary.json` | Exact reported metrics and intervals. |
| `analysis.py` | Metrics, bootstrap, and figure construction. |
| `analysis.ipynb` | Interactive explanatory report. |
| `slides.qmd` | Recommended 14-slide research story. |

