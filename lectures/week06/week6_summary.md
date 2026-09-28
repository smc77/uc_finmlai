# Week 6 Summary — What Counts as a Result?

Use this as a short review map for Week 6. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 6 follows two connected questions:

> **What property did the model improve, and did that improvement remain useful
> after dependence, costs, and search were included?**

> **When a large model fits every training row, what conditions could still allow
> it to generalize?**

A model can rank assets well without predicting return magnitudes accurately. A
gross portfolio can look attractive and fail after turnover. The best result in
a large search can look impressive even when every candidate is noise. A model
with many parameters can be tightly constrained by its fitting procedure, while
a large data table can contain little independent information. Week 6 separates
these issues before reconnecting them in one evaluation.

Three principles organize the week:

1. **The metric follows the decision.** Different outputs and decisions require
   different evidence.
2. **The portfolio inherits implementation.** Positions, turnover, costs,
   constraints, capacity, and path separate a forecast from a usable result.
3. **The result inherits the search.** A selected statistic must be interpreted
   relative to the alternatives and choices that produced it.

## Core ideas

1. **A metric must match the job.** Predictive R² evaluates numerical forecast
   error relative to a baseline. Rank information coefficient evaluates order
   within each date. A quantile spread tests a simple use of that ordering. Net
   Sharpe, drawdown, and capacity evaluate properties of an implemented strategy.
2. **Cross-sectional IC is sampled by date.** On each date, compare the ranks of
   eligible assets' scores with the ranks of their later outcomes. The evidence
   is the time series of those date-level IC values, not every asset-date row
   treated as an independent experiment.
3. **Breadth counts independent opportunities, not names or rows.** Correlated
   securities, overlapping horizons, and repeated exposure to one factor reuse
   information. The fundamental law is a useful planning approximation only
   when skill is stable, breadth is effective, and forecasts transfer into
   positions without unmodeled costs or constraints.
4. **Tail risk is a separate evaluation job.** Value at risk identifies a loss
   threshold. Expected shortfall describes average loss severity beyond that
   threshold. Both inherit assumptions about the loss distribution and the
   estimation window.
5. **A decision rule can interact with the market.** On 5 February 2018,
   daily-reset volatility products had to buy VIX futures as volatility rose.
   Higher futures prices increased required purchases, contributing to a
   feedback loop. A product rule and a return distribution need not be
   independent.
6. **Turnover begins with the position policy.** A forecast has no transaction
   cost by itself. A policy turns the forecast into changing holdings; those
   changes create trades, and a declared cost model converts trades into net
   returns. Recompute the complete return series after costs rather than
   subtracting an arbitrary amount from a Sharpe ratio.
7. **Capacity is a stress test, not one precise number.** Fees and spreads may
   be approximately linear for small trades, while market impact generally is
   not. Report how results change with capital, participation, liquidity, and
   other stated assumptions.
8. **Search changes the relevant null distribution.** The largest Sharpe among
   many noise strategies is not centered at zero. Record features, horizons,
   universes, models, cost assumptions, stopping rules, and any random draws
   inspected before reporting a result. A predeclared average across random
   seeds measures algorithmic variability; choosing a favorable seed expands
   the search. A deflated Sharpe calculation is only as credible as this search
   record.
9. **Interpolation does not determine generalization.** Test error can sometimes
   fall again after a model first reaches zero training error. This second
   descent depends on the representation, covariance spectrum, location of the
   signal, noise, fitting algorithm, and similarity of training and later data.
10. **Parameter count, fitted freedom, and effective information are different.**
    Parameter count describes the available representation. Fitted freedom
    describes how sensitively the selected algorithm uses it. Effective
    information describes the independent evidence supplied by the sampling
    process.
11. **Simulation identifies mechanisms that one historical path cannot.** A
    known-truth experiment can switch signal, persistence, spectrum, or
    alignment on and off. Historical evaluation then asks whether a frozen
    procedure helps on later observations. The two forms of evidence have
    different purposes.
12. **The final evaluation must reach the decision.** Report predictive loss,
    the feasible baseline, uncertainty, the complete search, the position or
    action rule, costs and constraints, and the result after implementation.

## One forecast, several evaluations

| Question | Appropriate evidence |
|---|---|
| Did the model predict numerical magnitudes? | Held-out loss and predictive R² against a feasible baseline |
| Did it order opportunities? | Per-date rank IC and its time-series uncertainty |
| Did the ordering support a simple action? | Quantile outcomes and a transparent top-minus-bottom spread |
| Did implementation preserve the result? | Position, turnover, cost, capacity, and net-return ledgers |
| Did the model describe tail risk? | VaR exceedances, expected shortfall, stress losses, and drawdowns |
| Was the selected result unusual after search? | Full trial ledger, dependence among trials, later test, and deflation |

These are not interchangeable scores. A result may be useful at one layer and
weak at another.

## Three quantities called complexity

| Quantity | Plain-English meaning |
|---|---|
| **Nominal capacity** | The number of features, coefficients, weights, leaves, or other available parameters. |
| **Effective fitted freedom** | How freely the trained predictions can respond after shrinkage, early stopping, constraints, and data geometry are included. |
| **Effective information** | How much genuinely independent evidence the rows provide for the particular quantity being estimated. |

None can be inferred from either of the others. Twelve correlated months can
contain much less than twelve independent repetitions, and a million-parameter
model can use far less than a million effective directions.

The same nominal-versus-effective distinction appears throughout the week:

| Nominal count | Effective quantity |
|---|---|
| dated observations | independent temporal evidence |
| names or positions | effective breadth |
| tried strategies | effective search size |
| parameters | effective fitted freedom |
| rows | effective information for the stated target |

The recurring rule is: **count independent information, not rows or labels.**

## Terms and vocabulary

### Metrics, risk, and implementation

| Term | Plain-English meaning |
|---|---|
| **Information coefficient (IC)** | Here, Spearman rank correlation between scores and later outcomes, computed separately within each date. |
| **IC information ratio (IC-IR)** | Mean of the date-level IC series divided by its time-series variability, with frequency and dependence stated. |
| **Quantile spread** | Difference in later outcomes between high- and low-score groups; a transparent diagnostic decision. |
| **Breadth** | Number of effectively independent opportunities to apply a skill. |
| **Transfer coefficient** | How fully a forecast is expressed after portfolio constraints and implementation. |
| **Value at risk (VaR)** | A specified quantile of the loss distribution: the threshold exceeded with a stated probability under the model. |
| **Expected shortfall (ES)** | Average loss conditional on being beyond the chosen VaR threshold. |
| **Turnover** | Size of the trade from drifted pre-trade holdings to new target holdings, under a declared accounting convention. |
| **Net return** | Gross return minus the costs generated by the actual trades. |
| **Capacity** | Scale at which the decision remains viable after liquidity and market impact are considered. |

### Search and model complexity

| Term | Plain-English meaning |
|---|---|
| **Multiple testing** | Trying many alternatives increases the chance that at least one looks strong by luck. |
| **Selected-result null** | Distribution of the winning statistic under a search in which the candidates have no genuine edge. |
| **Deflated Sharpe ratio** | A Sharpe test adjusted for non-normal returns, sample length, and the number and dependence of trials. |
| **Pre-registration** | Recording the candidates, selection rule, and test plan before observing the final results. |
| **Interpolation** | Fitting every training response exactly, so training error is zero. |
| **Interpolation threshold** | Region where model capacity first becomes sufficient to interpolate the training sample. |
| **Double descent** | A possible test-error pattern with a classical decline and rise followed by another decline beyond interpolation. |
| **Benign overfitting** | Exact training fit that still has controlled later error under specific data and algorithmic conditions. |
| **Covariance spectrum** | How feature variation is distributed across directions in the feature space. |
| **Signal alignment** | Whether useful predictive structure lies in feature directions that the sample measures well. |
| **Minimum-norm interpolator** | Among exact fits, the coefficient vector with the smallest Euclidean norm. |
| **Effective degrees of freedom** | A model-specific measure of how sensitively fitted values respond to the observed outcomes. |

## Research protocol after Week 6

Keep the timing, validation, probability, and model-selection rules from earlier
weeks, then add:

- state the decision property each reported metric evaluates;
- calculate cross-sectional IC by date and treat dates as the repeated units;
- distinguish nominal opportunities from effective breadth;
- preserve the dated position, trade, cost, and net-result ledger;
- report capacity as sensitivity to explicit impact assumptions;
- record the complete search rather than only the selected configuration;
- select complexity on validation data and test the frozen procedure later;
- separate parameter count, fitted freedom, and effective information; and
- use known-truth and failure controls when proposing a mechanism.

This is also the first project week. Initialize one `RESEARCH_RECORD.md` at the
root of the project repository, commit it, and append dated entries when evidence
changes the design. The weekly notebook entries remain practice; they are not a
substitute for the project record. Follow
[`project/WEEK6_CHECKPOINT.md`](../../project/WEEK6_CHECKPOINT.md) for the exact
one-paragraph prompt and the fields that should be initialized now. The
[`project/REPORT_PATHWAYS.md`](../../project/REPORT_PATHWAYS.md) guide explains
the integrated Jupyter report and optional separate-paper route that the same
research record will eventually support.

## Common mistakes

Be able to explain why each statement is incomplete:

- “The model's IC is positive, so the strategy is profitable.”
- “The gross Sharpe is high, so transaction costs can be added later.”
- “There are 500 stocks, so the strategy has 500 independent bets each month.”
- “The best of 200 strategies has a Sharpe of 1.0, so the strategy has an edge.”
- “The model has more parameters than rows, so it must generalize badly.”
- “The second descent appeared once, so benign overfitting explains the result.”

## Quiz check

You should be able to:

- select an evaluation metric for magnitude, ordering, probability, tail risk,
  or an implemented decision;
- explain why IC is computed within each date and why its uncertainty is based
  on the date series;
- distinguish VaR from expected shortfall;
- reconstruct net return from positions, turnover, and costs;
- explain why effective breadth can be much smaller than the number of names;
- identify the choices that belong in a search ledger;
- distinguish interpolation from generalization;
- explain what conditions can permit benign overfitting; and
- distinguish nominal capacity, fitted freedom, and effective information.

Then audit this design:

> A researcher tries 80 feature sets, five training windows, and four neural
> network sizes. They choose the highest gross Sharpe on 2015–2025, describe the
> same period as out of sample, count 600 correlated securities as 600
> independent bets, and report only parameter count and gross performance. The
> largest model interpolates its training rows and displays a second descent.

A strong answer should count the full search, recognize that 2015–2025 became
development data, require a later test, question nominal breadth, demand
turnover and cost evidence, separate parameter count from fitted freedom and
effective information, and require mechanism controls before interpreting the
second descent.
