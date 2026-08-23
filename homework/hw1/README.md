# HW1 — Financial Data Audit & Leakage-Free Feature Engineering

**FIN 7057 · Due after Week 3 · 100 points**

This first assignment establishes the habits the whole course depends on: *understand your data
before you model it, and never let the future leak into the past.* It is deliberately light on
"machine learning" and heavy on discipline. Later assignments reuse the pipeline you build here.

## Learning goals

- Acquire a financial dataset and document **what it is and when it would have been available**.
- Compute returns correctly and run the Week 2 diagnostics (stationarity, autocorrelation,
  volatility clustering, heavy tails).
- Engineer a set of predictive features that use **only past information** — and *prove* they do.
- Define a target and build a **time-ordered** (never shuffled) train/test split.
- Establish a naive baseline and reflect on where things could go wrong.

## Dataset

Pick **one** liquid instrument with a long daily history (≥ 8 years). Suggestions: a broad ETF
(`SPY`, `QQQ`, `IWM`), a single large-cap stock, or an FX/crypto pair. You may use `yfinance`, the
Ken French data library, or any documented source. Do **not** commit large data files; commit the
*code that fetches* the data (and a small cached sample if you must).

## Tasks

### Part A — Data acquisition & audit (25 pts)
1. Load daily prices; document the source, ticker, and exact date range. (5)
2. Compute simple and log returns; explain which you'll use and why. (5)
3. Audit the data: missing values, duplicate dates, calendar gaps, zero/negative prices, obvious
   outliers. Report what you found and how you handled it. (10)
4. Summary statistics table (mean, std, annualized return/vol, min/max). (5)

### Part B — Time-series diagnostics (20 pts)
Run and **interpret** (a sentence each, not just plots):
1. ADF stationarity test on prices vs. returns. (5)
2. ACF of returns vs. ACF of squared/absolute returns (volatility clustering). (5)
3. Heavy tails: excess kurtosis, a normality test, and a Q-Q plot. (5)
4. A rolling-volatility plot showing regimes. (5)

### Part C — Leakage-free feature engineering (35 pts) — *the heart of the assignment*
1. Build **at least 6 features** from these families, each using only past data:
   lagged returns; rolling momentum (≥2 windows); rolling volatility; a normalized/z-scored feature;
   and one of your choice (e.g., RSI, range, calendar dummy). Include a compact feature-definition
   table for every column: source, availability, transformation, memory, unit, and hypothesis. (15)
2. Define a prediction **target** (e.g., next-day return sign, or next-day return) and align it
   correctly so no feature can see the target's period. Leave the final unavailable outcome
   missing; do not convert it to a class label. Include a target-definition table stating decision
   time, execution assumption, horizon, return convention, and missing-label policy. (8)
3. **Prove there is no look-ahead:** run the provided `assert_no_lookahead` check (it *scrambles the
   future* and verifies your past feature values don't change) and report the max change (should be
   ~0). Explain in one paragraph *why* your features pass. (7)
4. Make a **time-ordered, disjoint** train/test split (e.g., 70/30 by date). State the split
   dates and verify `train.index.max() < test.index.min()`. (5)

### Part D — Baseline & reflection (20 pts)
1. Compute a naive baseline on the test period (majority class, or "predict up"). (5)
2. Write 250–400 words: Which Week 1 stylized facts did your data exhibit? Where could leakage
   have crept in, and how did you prevent it? What would make a model on this data fail in reality?
   (15)

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Add a second feature family (calendar/seasonality, or a range/RSI variant) and confirm it passes the look-ahead check.
- Repeat the Week-2 stylized-facts diagnostics on a second instrument and compare.
- Swap the 70/30 split for a purged/embargoed split and note what changes.

## Deliverables
- Run the **Self-check** cell at the end of the notebook; every item must print **PASS** before
  you submit. It verifies selected mechanical invariants, not every possible source of leakage.
- Your completed notebook (start from `hw1_starter.ipynb`), run top-to-bottom.
- Your feature- and target-definition tables. These remain part of the audit trail when later
  assignments add models or change the decision.
- The notebook must satisfy the **reproducibility checklist**: fixed seed, explicit dates,
  documented data source, package list, runs with *Restart & Run All*.
- An **AI-use disclosure** cell following the syllabus policy: state what materially assisted
  you, what you incorporated, and how you verified it. You remain responsible for the analysis.

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Data audit & returns | 25 |
| B — Diagnostics (with interpretation) | 20 |
| C — Leakage-free features (incl. proof & time split) | 35 |
| D — Baseline & reflection | 20 |
| **Reproducibility & hygiene** (seed, dates, source, clean notebook) | *up to −10 penalty if missing* |

Notably: **leakage-free features (Part C) is the most heavily weighted section.** A model that
predicts well *because it cheats* earns zero. Honest features that predict nothing are fine here —
this assignment is about the pipeline, not the alpha.

## Tips
- Almost all leakage comes from a missing `.shift()` or a centered/forward window. When in doubt,
  ask: "to compute this feature for day *t*, what is the latest day's data I touched?" It must be
  ≤ *t−1* (or *t* only for genuinely point-in-time data).
- Run `assert_no_lookahead` *early and often*, not just at the end.
