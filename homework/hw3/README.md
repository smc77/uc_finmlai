# HW3 — Trees & Boosting, Evaluated Properly

**FIN 7057 · Due after Week 7 · 100 points**

This is the synthesis assignment for the first third of the course. You'll fit nonlinear models
(random forest, gradient boosting) against a linear baseline, then — the point — **evaluate them
honestly**: out of sample, net of realistic transaction costs, against a baseline, and accounting
for how much you searched. A fancy model that doesn't beat a regularized linear baseline *after
costs* is not an improvement, and saying so earns full credit.

## Learning goals
- Fit and tune tree-based models with **time-aware** validation / early stopping.
- Turn predictions into positions and run a **cost-aware** backtest (gross vs. net Sharpe,
  turnover, drawdown).
- Compare models against a **baseline** and decide whether the extra complexity is justified.
- Reason about **multiple testing**: report and deflate for the size of your search.

## Setup
Reuse your corrected HW1/HW2 feature pipeline if useful, but extend the series with a **new
forward test window that begins after the end of the HW2 test period**. The old HW2 test
period is now development history, not untouched evidence. Target: next-day return.

## Tasks

### Part A — Models, fit time-aware (20 pts)
1. **Linear baseline:** a regularized linear model (Ridge or Lasso), tuned with `TimeSeriesSplit`. (6)
2. **Random forest** (tune depth / n_estimators sensibly). (6)
3. **Gradient boosting** with **early stopping on a forward validation block** (shallow trees, low
   learning rate). You may use scikit-learn, XGBoost, or LightGBM. (8)

### Part B — Predictions → a strategy (15 pts)
1. Convert each model's test-period predictions into **positions** (e.g., scaled/clipped signal, or
   long-top/short-bottom if you use a cross-section). State your rule. (8)
2. Compute **daily strategy returns** = position(t) × realized return(t+1). (7)

### Part C — Honest, cost-aware evaluation (30 pts) — *the core*
1. Report test-period R² and time-series Spearman correlation for each model. Do not call a
   single-instrument correlation a cross-sectional rank IC. (6)
2. Compute **turnover** and a **gross vs. net Sharpe** curve across at least three cost levels
   (e.g., 0 / 5 / 10 / 20 bps). Show the table or plot. (14)
3. Report **max drawdown** for the best model's net strategy. (5)
4. State the realistic cost level for your instrument and the **net** Sharpe there. (5)

### Part D — Comparison & verdict (20 pts)
Produce a table: each model × {test R², test Spearman, gross Sharpe, net Sharpe @ realistic cost},
plus the
baseline (predict-the-mean / buy-and-hold).

| Model | Test R² | Test Spearman | Gross Sharpe | Net Sharpe |
|-------|---------|---------------|--------------|------------|
| Linear (baseline) | | | |
| Random forest | | | |
| Gradient boosting | | | |

Explain accurately and completely: **Did the nonlinear models improve upon the linear baseline
*after costs*?** If not, say so plainly — that is a valid and valuable finding. Which model would
you actually deploy, and why? There is no graded word-count requirement. (20)

### Part E — Multiple testing & limitations (15 pts)
1. **How many configurations did you try** (features, models, hyperparameters)? Estimate it
   honestly. (5)
2. Under a clearly stated independent-Gaussian null, approximate the expected best Sharpe from
   the declared number of trials and test length. Explain why this is only a teaching
   approximation and not the full deflated-Sharpe statistic. Would the winner clear that bar? (5)
3. Limitations: capacity, post-publication decay, regime dependence — what would make this fail
   live? (5)

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Add permutation importance -- and state why it is not a causal mechanism.
- Stress the selected procedure on a second, later subperiod without retuning it.
- Replace linear costs with a declared nonlinear impact curve and report the capacity sensitivity.

## Deliverables
- Run the **Self-check** cell at the end; every item must print **PASS**. It checks the new
  test boundary, future invariance, and past-only position scaling among other invariants.
- Completed notebook (start from `hw3_starter.ipynb`), runs top-to-bottom.
- Reproducibility (seed, dates, source, packages) and an **AI-use disclosure** cell.

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Three models, time-aware | 20 |
| B — Predictions → positions → returns | 15 |
| C — Cost-aware evaluation (gross vs net, turnover, drawdown) | 30 |
| D — Comparison table + honest verdict | 20 |
| E — Multiple-testing & limitations | 15 |
| Reproducibility & hygiene | *up to −10 penalty if missing* |

## Tips
- A `backtest()` helper is provided (positions → gross/net returns, turnover, Sharpe, drawdown).
- Compute Sharpe again from the **net return series** after subtracting trading costs. It is not
  generally equal to gross Sharpe minus a scalar “cost drag.”
- "My boosting model has a great gross Sharpe" is not a result. "It still beats the linear baseline
  by X at 10 bps net, having tried ~Y configs" is.
