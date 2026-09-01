# HW1 — Financial Data Audit & Leakage-Free Feature Engineering

**FIN 7057 · Due after Week 3 · 100 points**

This first assignment establishes the habits the whole course depends on: *understand your data
before you model it, and never let the future leak into the past.* It is deliberately light on
"machine learning" and heavy on discipline. Later assignments reuse the pipeline you build here.

## Learning goals

- Acquire a financial dataset and document **what it is and when it would have been available**.
- Compute returns correctly and run the Week 1 diagnostics (unit-root evidence, autocorrelation,
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
1. An ADF unit-root diagnostic on prices vs. returns. State the null and do not treat rejection
   as a general certificate of stationarity. (5)
2. ACF of returns vs. ACF of squared/absolute returns (volatility clustering). (5)
3. Heavy tails: excess kurtosis, a normality test, and a Q-Q plot. (5)
4. A rolling-volatility plot showing regimes. (5)

### Part C — Leakage-free feature engineering (35 pts) — *the heart of the assignment*

**The clock for this assignment.** A feature dated day *t* must be known *before* the day-*t*
return is observed, so every price-derived feature uses data through *t−1*. That is why the
solution shifts each rolling statistic by one day. Later in the course we also use the
convention "decide at the close of *t*, forecast *t+1*"; both are defensible, but mixing them
inside one dataset is not. State which one you are using and hold to it.
1. Build **at least 6 features** from these families, each using only past data:
   lagged returns; rolling momentum (≥2 windows); rolling volatility; a normalized/z-scored feature;
   and one of your choice (e.g., RSI, range, calendar dummy). Include a compact feature-definition
   table for every column: source, availability, transformation, memory, unit, and hypothesis. (15)
2. Define a prediction **target** (e.g., next-day return sign, or next-day return) and align it
   correctly so no feature can see the target's period. Leave the final unavailable outcome
   missing; do not convert it to a class label. Include a target-definition table stating decision
   time, execution assumption, horizon, return convention, and missing-label policy. (8)
3. **Probe and then test the information boundary:** first predict how the supplied trailing,
   shifted, centered, and full-sample feature examples will behave. Run the detector and explain
   why an unshifted trailing feature can pass the detector while still violating this assignment's
   prior-day clock. Then run `assert_no_lookahead` on your own builder, report the maximum change
   (approximately zero), and explain why your features pass. The detector *scrambles the future*
   and verifies that past feature values do not change; it is necessary evidence, not a complete
   proof that every timing assumption is correct. (7)
4. Make a **time-ordered, disjoint** train/test split (e.g., 70/30 by date). State the split
   dates and verify `train.index.max() < test.index.min()`. (5)

### Part D — Baseline & reflection (20 pts)
1. Compute a **feasible** baseline on the test period: fix the rule using the training data
   only — the training-period majority class, or a plain "always predict up" — then apply it
   unchanged to the test rows. A majority class computed from the *test* outcomes is not a
   forecast anyone could have made at the split, and will not earn the points. (5)
2. Write 250–400 words in three short labeled paragraphs, aiming for roughly one-third of the
   response on each topic: **what the data showed** from Week 1, **where leakage could occur and
   how you prevented it**, and **why a model could still fail in reality**. (15)

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Add a second feature family (calendar/seasonality, or a range/RSI variant) and confirm it passes the look-ahead check.
- Repeat the Week-1 stylized-facts diagnostics on a second instrument and compare.
- Move the chronological cutoff—for example, compare 60/40 and 70/30 splits. Before rerunning,
  predict how the training majority class, test composition, and measured baseline accuracy might
  change. Explain why neither cutoff is automatically the correct estimate of future performance.

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
- Remember what the detector proves: changing future prices did not move earlier features. A
  feature can still violate your declared clock, use a revised vintage, or inherit fitted state
  from outside the function. Pair the test with the feature and target definitions.
