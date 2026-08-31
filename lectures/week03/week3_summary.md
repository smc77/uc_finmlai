# Week 3 Summary — From a Line to a Trading Ledger

Use this as a short review map for Week 3. The lecture, slides, and demos remain
the full source. The quiz is open-book and open-note, but individual and without
AI assistance.

Week 3 follows one complete chain:

> **feature row → fitted forecast → baseline comparison → position → turnover → cost → net return**

Each arrow changes the claim. A fitted relationship is not yet a useful forecast,
a useful forecast is not yet a trading rule, and a trading rule is not yet a net
investment result.

## Core ideas

1. **OLS is the simplest serious conditional forecast.** It gives a fast,
   inspectable baseline: an intercept plus a weighted contribution from each
   feature. A coefficient is interpretable only beside the feature definition,
   target, unit, and fit population that produced it.
2. **The sample limits how much model freedom we can support.** Adding columns
   creates capacity, not information. When features are numerous or strongly
   correlated, training fit can improve while future performance becomes less
   stable.
3. **Selection and shrinkage solve related but different problems.** Selection
   chooses columns and therefore creates a search. Ridge keeps all coefficients
   but pulls them toward zero; lasso can set some exactly to zero; elastic net
   combines the two penalties. Validation chooses complexity. A final untouched
   test assesses the complete procedure.
4. **Sparsity is not discovery.** A lasso coefficient of zero does not prove that
   a feature is useless, and a nonzero coefficient does not prove a stable
   mechanism. Correlated features can substitute for one another, so selected
   sets may change even when predictions remain similar.
5. **Changing the estimator changes the claim.** OLS targets a conditional mean
   under squared loss. Huber limits the pull of extreme residuals. Quantile
   regression targets a stated percentile, such as the median or 90th
   percentile. WLS, GLS, and robust standard errors address other assumptions;
   they are not interchangeable repairs.
6. **Every forecast needs a feasible opponent.** Predictive R² compares the
   model's squared error with a named baseline on the same held-out rows. Its
   denominator is part of the result. A negative value means the challenger lost
   to that baseline on that sample—not that forecasting is impossible.
7. **Order and scale are different claims.** Predictive R² cares about numerical
   forecast errors. Pearson measures linear association. Spearman replaces
   values with ranks and measures ordering. Positive rescaling preserves both
   correlations but can ruin a magnitude forecast.
8. **A score becomes financial only through a declared policy and ledger.** The
   policy maps the forecast to a position. The position must earn a later return,
   turnover begins from cash, and cost is charged using an explicit convention.
   Every reported net return should reconcile row by row.

## Three boundaries in the model contest

| Boundary | What it does |
|---|---|
| **Training** | Fits coefficients, scalers, and every other learned state. |
| **Validation** | Chooses features, penalties, and other complexity without consuming the final test. |
| **Test** | Assesses the complete frozen procedure once all choices are fixed. |

If test results influence a later choice, that period has become development
data. The next honest assessment needs new untouched observations.

## Reading the first trading ledger

For a decision made at date \(t\):

\[
\text{gross return}_{t+1}=w_t r_{t+1},
\qquad
\text{turnover}_t=|w_t-w_{t-1}|,
\]

\[
\text{net return}_{t+1}
=\text{gross return}_{t+1}
-c\,\text{turnover}_t.
\]

The first previous position is cash, \(w_{t-1}=0\). The Week 3 cost model is a
simple symmetric linear convention. Real implementation may also require
spreads, nonlinear market impact, financing, borrow, and capacity limits.

## Terms and vocabulary

### Regression and model capacity

| Term | Plain-English meaning |
|---|---|
| **Ordinary least squares (OLS)** | Chooses coefficients that minimize the sum of squared residuals. |
| **Coefficient** | The fitted change in the target associated with a one-unit feature change, holding the model's other features fixed. |
| **Intercept** | The model's baseline forecast when every included feature equals zero. |
| **Fitted value / residual** | The model's prediction / the observed target minus that prediction. |
| **Multicollinearity** | Features carry very similar information, making their individual coefficient allocation unstable. |
| **Ill-conditioned design** | Small changes in data can create large coefficient changes because some feature directions are weakly supported. |
| **Regularization** | Constraining coefficients to reduce the damage caused by noisy estimation. |
| **Ridge** | Squared-coefficient penalty that shrinks all coefficients toward zero. |
| **Lasso** | Absolute-coefficient penalty that can set some coefficients exactly to zero. |
| **Elastic net** | A blend of ridge and lasso penalties. |
| **Hyperparameter** | A choice such as penalty strength that must be selected outside the final test set. |

### Loss, noise, and distributional targets

| Term | Plain-English meaning |
|---|---|
| **Squared loss** | Penalizes an error by its square, so large misses receive much more weight. |
| **Huber loss** | Behaves like squared loss for ordinary residuals and more like absolute loss for extreme residuals. |
| **Quantile regression** | Predicts a stated percentile of the conditional outcome distribution rather than only its mean. |
| **Heteroskedasticity** | The variance of the unexplained outcome changes across observations. |
| **Leverage point** | An observation with unusual feature values that can strongly move a fitted line. |
| **BLUE** | The narrow Gauss–Markov claim that, under stated conditions, OLS is the lowest-variance linear unbiased estimator. |
| **Robust standard error** | An uncertainty estimate changed to tolerate a stated form of dependent or unequal-variance noise; it does not automatically change the fitted coefficients. |

### Evaluation and implementation

| Term | Plain-English meaning |
|---|---|
| **Feasible baseline** | A forecast that could really have been produced at the same time and on the same rows as the challenger. |
| **Predictive R²** | Improvement in held-out squared error relative to a named baseline. |
| **Pearson correlation** | Linear association that uses the distances among values. |
| **Spearman correlation** | Pearson correlation of the ranks; it keeps ordering and discards distances. |
| **Time-series Spearman** | Rank association across dates for one series. |
| **Cross-sectional rank IC** | Rank association across assets within each date, computed first by date. |
| **Position policy** | The declared rule that converts a score into an exposure. |
| **Turnover** | Under the Week 3 convention, the absolute change in position. |
| **Trading ledger** | The dated table linking forecast, position, realized return, turnover, cost, and net return. |
| **Reconciliation** | Verifying that every net result exactly follows from the declared row-level accounting. |
| **Effective breadth** | The amount of genuinely distinct information or risk, which can be far smaller than the number of rows or trades. |

## Research protocol after Week 3

Keep the Week 1 evidence rules and Week 2 information boundaries, then add:

- declare the estimator, objective, preprocessing, and all tuned complexity;
- separate training, validation, and final test roles;
- compare the frozen model with a feasible baseline on identical rows;
- state whether the primary claim concerns magnitude, ordering, or a decision;
- define the forecast-to-position rule using training information only; and
- preserve a dated ledger that reconciles gross return, turnover, cost, and net
  return.

## Common mistakes

Be able to explain why each statement is too strong:

- “Training error fell after I added 100 features, so the model improved.”
- “Lasso selected this feature, so we discovered a real economic mechanism.”
- “Spearman is positive, so the strategy is profitable.”
- “The equity curve is net of costs, so the backtest is auditable.”

## Quiz check

You should be able to:

- interpret a coefficient with its feature and target units;
- explain why correlated features can destabilize OLS coefficients;
- distinguish selection from ridge, lasso, and elastic net;
- match OLS, Huber, or quantile regression to the outcome the decision needs;
- compute and interpret predictive R² relative to a named baseline;
- explain why rescaling a forecast can preserve rank while changing squared loss;
- align a position chosen at \(t\) with the return it can actually earn; and
- reconstruct turnover, cost, and net return for two consecutive ledger rows.

Then audit this procedure:

> A researcher standardizes 80 features on the full sample, tries 30 penalty
> values, chooses the one with the best test predictive R², multiplies the
> forecast by three to size positions, pairs each position with the same row's
> return, omits the first trade from turnover, and reports a cost-adjusted Sharpe
> ratio without showing the ledger.

A strong answer should identify the leaked scaler, consumption of the test set,
the unvalidated sizing scale, possible forecast/return misalignment, the free
initial portfolio, and the missing row-level reconciliation.
