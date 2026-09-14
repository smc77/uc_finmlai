# HW2 — Linear Models + Regularization, Validated in Time

**FIN 7057 · Due after Week 5 · 100 points**

Build on HW1. You'll fit OLS, Ridge, Lasso, and Elastic Net to predict returns, **tune the
regularization strength with walk-forward cross-validation** (never shuffled k-fold), and document
the gap between in-sample and out-of-sample performance. The deliverable is not a great model — it's
an *honestly evaluated* one.

## Learning goals
- Fit and compare regularized linear models.
- Tune a hyperparameter with **time-aware** cross-validation and *demonstrate* why shuffled k-fold
  is misleading here.
- Quantify overfitting with in-sample versus out-of-sample R² and time-series Spearman
  correlation. Reserve the term **rank IC** for the per-date cross-sectional statistic used later.
- Use Lasso for feature selection and check coefficient stability.
- Turn the same features into a **probability**, judge whether that probability is
  **calibrated**, and choose an operating **threshold from declared costs** rather than from
  accuracy.

## Setup
Reuse your HW1 dataset and leak-free `build_features`. **Add at least 8 features** (more is fine) so
regularization has something to do — include a few you suspect are weak/noisy on purpose. Target:
next-day return (regression); Part F reuses the same rows with a direction target. Keep a final
**test period** you do not touch until the very end.

## Tasks

### Part A — Data, features, splits (15 pts)
1. Load data; build ≥ 8 leak-free features; re-run the look-ahead check from HW1. (8)
2. Define the target and make a **three-way time split**: train / validation (for tuning) / test
   (touched once). State the date ranges. (7)

### Part B — Fit the four models (20 pts)
1. Put `StandardScaler` inside the time-series cross-validation pipeline so every fold fits
   preprocessing on that fold's training rows only. Apply the frozen selected pipeline to
   validation/test. (5)
2. Fit OLS, Ridge, Lasso, Elastic Net. For the regularized models, tune `alpha` (and Elastic Net's
   `l1_ratio`) using **`TimeSeriesSplit`** on the training data. (15)

### Part C — Why shuffled CV is wrong (20 pts) — *the point of this assignment*
1. For one model (say Ridge), estimate performance two ways on the **training** data:
   shuffled `KFold` vs. `TimeSeriesSplit`. Report both. (10)
2. Compare the estimates without requiring a particular ordering or gap. Explain which design
   matches the deployment task and, for overlapping labels, why an exact purge or gap may still
   be needed even with a time-ordered splitter. (10)
3. State which CV you used to choose your final hyperparameters, and why. (5)

### Part D — In-sample vs. out-of-sample (15 pts)
Produce a table for all four models with **train** and **test** R² and Spearman correlation:

| Model | Train R² | Test R² | Train Spearman | Test Spearman |
|-------|---------|--------|---------|--------|
| OLS | | | | |
| Ridge | | | | |
| Lasso | | | | |
| ElasticNet | | | | |

Interpret it clearly and completely: Which model overfit most (largest train–test gap)? Did
regularization help out of sample? Did it improve upon the predict-the-mean baseline? (15)

### Part E — Feature selection, stability & reflection (15 pts)
1. Report which features Lasso kept (non-zero coefficients). (4)
2. Refit on two sub-periods; comment on coefficient **stability**. Stability is useful evidence,
   not proof that a coefficient is true or causal. (5)
3. Reflection: Is your test association meaningfully different from zero? What would you try next,
   and what are you *not* allowed to do with the test set? Answer accurately and completely; there
   is no graded word-count requirement. (6)

### Part F — The same information, as a decision (15 pts)

Everything above forecast a *magnitude*. Now ask the same features for a *decision*, using the
same three-way split. Nothing about the information changes; the contest does.

1. **Fit a classifier.** Convert the target to direction (sign of the next-day return) and fit a
   logistic regression on the same features and the same split. Report **AUROC** and **log loss**
   on the test block, each beside the training base-rate forecast. Say plainly whether the model
   beats that baseline. (5)
2. **Is it calibrated?** On the validation block, plot a **reliability curve** with the count of
   observations in each bin, and report **Brier score** and **log loss** against the base rate.
   A model can rank well and still state the wrong probabilities — say which of those two your
   model achieved. (5)
3. **Choose the threshold from costs.** Declare a cost for a false positive and a false negative
   and justify the ratio in one sentence. Sweep thresholds on the **validation** block, pick the
   one minimizing expected cost, **freeze it**, and report the action rate and realized cost on
   the test block beside a 0.5 threshold. (5)

> Direction on daily returns is close to a coin flip, so an AUROC near 0.5 and no improvement over
> the base rate is the *expected* result. That is a finding, and it earns full marks. What is
> graded is whether ranking, probability quality, and the cost of a decision are kept apart.

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Compare coefficient paths for Ridge, Lasso, and Elastic Net over a declared alpha grid.
- Measure feature/coefficient stability across the time-series folds.
- Try a second prediction horizon (e.g., 5-day) and see whether the edge persists.

## Deliverables
- Run the **Self-check** cell at the end; every item must print **PASS**. It checks selected
  invariants, including future invariance and fold-local preprocessing.
- Completed notebook (start from `hw2_starter.ipynb`), runs top-to-bottom.
- Reproducibility (seed, dates, source, package list) and an **AI-use disclosure** cell.

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Data, features, three-way time split | 15 |
| B — Four models, tuned time-aware, scaled on train only | 20 |
| C — Shuffled vs walk-forward CV demonstration | 20 |
| D — IS vs OOS table + interpretation | 15 |
| E — Feature selection, stability, reflection | 15 |
| F — Classifier, calibration, cost-based threshold | 15 |
| Reproducibility & hygiene | *up to −10 penalty if missing* |

## Tips
- Use `Pipeline(StandardScaler(), model)` inside `GridSearchCV(..., cv=TimeSeriesSplit(5))`.
  Fitting one scaler before the inner folds lets later training rows influence earlier folds.
- Scikit-learn's default CV is not necessarily shuffled, but it is not a forward deployment
  design: ordinary K-fold training for an early fold can still include later observations.
- This assignment has one instrument, so report a time-series Spearman correlation. HW5 uses
  per-date cross-sectional rank IC.
- A negative test R² is a *finding*, not a failure. Report it honestly.
- Once you inspect this test period, it is spent. HW3 must use a later forward assessment window.
- In Part F, the threshold is a *policy*, not a parameter of the model. Select it on validation,
  freeze it, then apply it once. Choosing it on the test block is the same error as tuning `alpha`
  there.
