# HW5 — From Predictions to a Portfolio

**FIN 7057 · Due after Week 9 · 100 points**

Take cross-sectional predictions and turn them into a tradeable long-short portfolio — then judge it
by what it earns **after costs**, not by the forecast's cleverness. The headline lesson to
demonstrate: **a better prediction (higher IC) is not automatically a better portfolio.**

## Setup
Use a **cross-sectional panel** (many assets × time): reuse the HW4 panel if suitable, build
HW3-style features per asset, or use the supplied known-truth panel. Changing datasets here is
deliberate: cross-sectional portfolio construction needs breadth that the earlier single-instrument
exercise did not. State your data, information clock, and dates. A `backtest()` helper is provided.

## Tasks

### Part A — Signal & setup (15 pts)
1. Produce a per-asset, per-day **prediction** matrix (assets in columns, dates in rows), computed
   from **past-only** information. (10)
2. Report the **rank IC** (mean daily Spearman correlation of prediction vs. next-day return). (5)

### Part B — Scores → positions (20 pts)
Implement **at least 2 sizing schemes** (e.g., quintile long-short, rank-proportional, signal-scaled),
each normalized to be dollar-neutral with gross exposure 1. State each rule. (20)

### Part C — Cost-aware backtest (30 pts)
For each scheme: (a) cumulative long-short return (plot); (b) **gross vs. net Sharpe** across cost
levels (0/5/10/20 bps); (c) **turnover**; (d) **max drawdown** of the best net strategy. (30)

### Part D — Prediction quality vs. portfolio quality (20 pts)
Make a table of **IC, gross Sharpe, net Sharpe, turnover** for each scheme. Then explain each of
the following accurately and completely; there is no graded word-count requirement:
- Does the scheme with the highest gross Sharpe also have the highest **net** Sharpe? Why or why not?
- Which would you actually deploy, and at what assumed cost level?
- Construct (or describe) a case where a **higher-IC** signal yields a **worse** net portfolio
  because of turnover. (20)

### Part E — Risk control & limitations (15 pts)
1. Apply **volatility targeting** (past-only) to one strategy and report what changes (risk
   stability / drawdown). (8)
2. Limitations: capacity, concentration, transaction-cost realism, regime dependence. (7)

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Build a sector-neutral (or beta-neutral) version and compare turnover and drawdown.
- Add no-trade bands and compare their turnover and net performance with the raw policy.
- Replace linear costs with a nonlinear impact assumption and report capacity sensitivity.

## Deliverables
- Run the **Self-check** cell at the end; every item must print **PASS**. It checks future
  invariance, alignment, the requested number of schemes, and cost accounting; it does not require
  a positive signal.
Completed notebook (start from `hw5_starter.ipynb`), reproducibility, AI-use disclosure.

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Cross-sectional signal + IC | 15 |
| B — ≥2 sizing schemes | 20 |
| C — Cost-aware backtest (gross vs net, turnover, drawdown) | 30 |
| D — Prediction-quality-vs-portfolio-quality table + analysis | 20 |
| E — Volatility targeting + limitations | 15 |
| Reproducibility & hygiene | *up to −10 penalty if missing* |

## Tips
- Recompute Sharpe from net returns after costs; do not subtract a scalar directly from gross
  Sharpe. Cost still scales with **turnover**, so slower signals often retain more of their edge.
- Report IC *and* net Sharpe side by side — the whole point is that they can disagree.
