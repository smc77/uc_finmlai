# Week 1 Summary — Evidence Before Complexity

Use this as a short review map for Quiz 1. The lecture, slides, and demos remain
the full source. The quiz is open-book and open-note, but individual and without
AI assistance.

## Core ideas

1. **Machine learning creates both opportunity and danger in finance.** Flexible
   models can learn useful nonlinear patterns, but financial signals are often
   weak and noisy. More flexibility also creates more ways to fit chance.
2. **A fitted model is not the whole result.** A credible result includes the
   question, data, transformations, search process, model, evaluation procedure,
   decision rule, costs, and risks. The research record preserves that evidence
   trail.
3. **A backtest is a historical “what if?” experiment.** It is useful when the
   trading rule and information boundary are clear. A beautiful curve alone
   cannot tell us how much was searched or whether the strategy used information
   that would really have been available.
4. **Search changes the evidence required.** Trying many features, models, or
   trading rules gives luck more chances to win. Development data may guide the
   search; a frozen later period should judge the selected procedure.
5. **Returns are usually a better default than standalone price levels.** Prices
   accumulate shocks and often wander. Returns are usually more stable, although
   they are not independent, Gaussian, or equally volatile through time.
6. **Markets remember risk more clearly than direction.** Raw returns often have
   little autocorrelation, while squared or absolute returns show persistent
   volatility. Heavy tails also make extreme moves more common than a Gaussian
   model suggests.
7. **Every claim needs the right benchmark.** A forecast can be compared with a
   simple forecast; a strategy with cash, momentum, or a 60/40 portfolio; and a
   risk-adjusted result with a factor model. Matching a benchmark with low
   correlation may also be valuable because it improves diversification.

Before fitting a financial model, ask:

1. What am I trying to predict?
2. Why might it be predictable?
3. What simple forecast or decision must it improve upon?
4. What untouched data will be allowed to judge it?

## Terms and vocabulary

| Term | Plain-English meaning |
|---|---|
| **Generalization** | Performing well on relevant observations that did not help choose or fit the procedure. |
| **Backtest** | A replay asking what would have happened if a stated historical rule had been followed. |
| **Development data** | Data used to explore, fit, compare, and revise ideas. |
| **Frozen test period** | Later data kept out of the research process until the procedure is fixed. |
| **Search overfitting** | Selecting a lucky winner after trying many otherwise reasonable alternatives. |
| **Reproducibility** | Another researcher can recover the same result from identified code, data, settings, versions, and seeds. |
| **Robustness** | The conclusion survives reasonable changes in sample, assumptions, costs, or design. |
| **Research record** | A running evidence trail that records what was tried, what changed, what was learned, and what remains uncertain. |
| **Return** | A price change expressed relative to the starting price; simple and log returns use different conventions. |
| **Stationarity** | A process whose important statistical behavior is stable enough over time to support comparison and learning. |
| **Unit root** | A form of extreme persistence in which shocks permanently move the level of a series. |
| **Spurious regression** | An apparently strong relationship created by regressing unrelated wandering series on one another. |
| **Cointegration** | Two or more wandering levels whose particular combination is more stable. |
| **Autocorrelation / ACF** | Correlation between a series and its own lagged values; the ACF shows that relationship across several lags. |
| **AR / MA** | Classical models of time-series memory: AR uses past values; MA uses past shocks. |
| **Volatility clustering** | Large moves tend to arrive near other large moves, and quiet periods near quiet periods. |
| **Heavy tails** | Extreme observations occur more often than a Gaussian model would predict. |
| **Random walk** | A process whose level changes by accumulating new shocks. |
| **Martingale** | Given the current information set, the next expected value equals the current value. |
| **Market efficiency** | A claim that available information is already reflected in prices, stated relative to a particular information set and return benchmark. |
| **Benchmark** | The simple forecast, investment, or risk model that gives a new result its meaning. |
| **Sharpe ratio** | Average excess return divided by return volatility; a scale-free summary, not a complete investment decision. |

## Quiz check

You should be able to explain:

- why repeated model search can spend a test set;
- why exact rerunning establishes reproducibility but not robustness;
- why returns are usually modeled instead of standalone price levels;
- why a small predictive improvement can matter without yet proving a profitable strategy;
- why predictions must be translated into positions, turnover, costs, and risk
  before choosing between investment procedures.

