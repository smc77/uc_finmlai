# Week 1 Summary — Evidence Before Complexity

This file begins with a short entry ramp for Quiz 1 and continues with a
complete review reference. The quiz is open-book and open-note, but individual
and without AI assistance.

## Start here

If this is your first pass, learn the small map below before reading the full
reference. The course begins with one table: each **row** is one case, its
**features** are the clues available now, and its **target** is the later answer
we want to predict. A **model** learns a rule connecting the clues to the
answer. A **baseline** tells us whether the rule added anything useful.

| Word | Plain-English meaning | Week 1 example |
|---|---|---|
| **Row** | One case in the dataset. | One stock on one month-end date. |
| **Feature** | Information the model receives before predicting. | Past return or volatility. |
| **Target** | The future answer the model is asked to predict. | Next month's return. |
| **Model** | A rule converting features into an output. | A rule forecasting next-month return. |
| **Baseline** | A simple feasible prediction or decision to beat. | Predict zero excess return. |
| **Test data** | Untouched observations opened after the procedure is fixed. | A later year not used to revise the model. |

Foundational terms are collected in the [Core Vocabulary](../../docs/CORE_GLOSSARY.md).

## Required / explain / recognize

| Level | What Week 1 expects |
|---|---|
| **USE** | State a question, feature, target, baseline, and chronological test. |
| **EXPLAIN** | Why a good fit or attractive backtest is not yet reliable evidence. |
| **RECOGNIZE** | Unit roots, cointegration, AR/MA models, and heavy tails as time-series language whose detailed formulas are not the week's main burden. |

## Full reference

## Core ideas

1. **Machine learning creates both opportunity and danger in finance.** Flexible
   models can learn useful nonlinear patterns, but financial signals are often
   weak and noisy. More flexibility also creates more ways to fit chance.
2. **A fitted model is not the whole result.** A credible result includes the
   question, data, transformations, search process, model, evaluation procedure,
   decision rule, costs, and risks. The research record preserves that evidence
   trail.
3. **A backtest is a historical “what if?” experiment.** It is useful when the
   rule and information boundary are clear. A beautiful curve alone cannot tell
   us how much was searched or what could really have been known.
4. **Search changes the evidence required, and a test set is consumable.** Trying
   many features, models, or trading rules gives luck more chances to win.
   Development data may guide that search. Once a test result influences any
   later choice, however, that period has become development data and a new
   untouched test is needed.
5. **For many prediction problems, returns are a better starting point than
   standalone price levels.** Prices often accumulate shocks and wander, while
   returns are usually more statistically stable. Levels can still contain
   useful information when an economic relationship constrains them, as with
   cointegration.
6. **Markets remember risk more clearly than direction.** Raw returns often have
   little autocorrelation, while squared or absolute returns show persistent
   volatility. Heavy tails also make extreme moves more common than a Gaussian
   model suggests.
7. **Every claim needs the right benchmark.** Compare a forecast with a sensible
   simple forecast, a trading rule with a plausible alternative after costs, and
   an investment with an appropriate passive or factor benchmark. A candidate
   can also add value by matching a useful return distribution with low
   correlation, because diversification matters.
8. **Prediction is not the final objective.** A forecast becomes economically
   meaningful only after it becomes a position and passes through turnover,
   costs, risk, and portfolio context. Better predictive accuracy does not
   automatically mean greater portfolio value.

The full path is:

> **Data → forecast → position → gross P&L → costs → net P&L → portfolio risk and value**

Before fitting a financial model, ask:

1. What am I trying to predict?
2. Why might it be predictable?
3. What simple forecast or decision must it improve upon?
4. What untouched data will be allowed to judge it?

## Terms and vocabulary

The two groups organize the ideas; both are part of Week 1.

### Research and evidence

| Term | Plain-English meaning |
|---|---|
| **Generalization** | Performing well on relevant observations that did not help choose or fit the procedure. |
| **Backtest** | A replay asking what would have happened if a stated historical rule had been followed. |
| **Training data** | Development observations used to fit coefficients, transformations, or other learned quantities. |
| **Validation data** | Development observations used to compare features, hyperparameters, models, or decision rules. |
| **Development data** | Data used to explore, fit, compare, and revise ideas. |
| **Test data / frozen test period** | Observations kept out of training and validation until the complete procedure is fixed; they test the selected procedure once. |
| **Search overfitting** | Selecting a lucky winner after trying many otherwise reasonable alternatives. |
| **Reproducibility** | Another researcher can recover the same result from identified code, data, settings, versions, and seeds. |
| **Robustness** | The conclusion survives reasonable changes in sample, assumptions, costs, or design. |
| **Research record** | A running evidence trail that records what was tried, what changed, what was learned, and what remains uncertain. |
| **Benchmark** | The simple forecast, alternative investment, or risk model that gives a new result its meaning. |
| **Sharpe ratio** | Average excess return divided by return volatility; a scale-free summary, not a complete investment decision. |

### Time series and markets

| Term | Plain-English meaning |
|---|---|
| **Return** | A price change expressed relative to the starting price; simple and log returns use different conventions. |
| **Stationarity** | A process whose important statistical behavior is stable enough over time to support comparison and learning. |
| **Unit root** | A form of extreme persistence in which shocks permanently move the level of a series. |
| **Spurious regression** | An apparently strong relationship created by regressing unrelated wandering series on one another. |
| **Cointegration** | Two or more wandering levels whose particular combination is more stable. |
| **Autocorrelation / ACF** | Correlation between a series and its own lagged values; the ACF displays it across several lags. |
| **AR / MA** | Classical models of time-series memory: AR uses past values; MA uses past shocks. |
| **Volatility clustering** | Large moves tend to arrive near other large moves, and quiet periods near quiet periods. |
| **Heavy tails** | Extreme observations occur more often than a Gaussian model would predict. |
| **Random walk** | A process whose level changes by accumulating new shocks. |
| **Martingale** | A process whose expected future value, conditional on currently available information, equals its current value. |
| **Market efficiency** | A claim that prices reflect an identified **information set**, judged relative to an identified **return benchmark**. |

## Research protocol after Week 1

- Define the prediction target and why it might contain learnable structure.
- Declare the benchmark, metric, decision rule, and important implementation
  assumptions.
- Record the search process and keep genuinely untouched observations for final
  test.
- Translate any predictive result into positions, costs, risk, and the narrow
  conclusion the evidence supports.

## Quiz check

Be able to explain why each statement is too strong:

- “My test predictive R² is positive, so I have a trading strategy.”
- “My backtest has a high Sharpe ratio, so I found something real.”
- “My code reproduces the result, so the result is robust.”

Then diagnose this research process:

> A researcher tests 100 signals, selects the best performer from 2010–2020,
> examines its 2021–2025 result, changes the signal after seeing that result,
> and still reports 2021–2025 as “out of sample.” What happened to the test set,
> and what evidence would be needed next?
