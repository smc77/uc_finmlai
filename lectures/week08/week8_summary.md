# Week 8 Summary — Portfolio Decisions and Neural Networks

Use this as a short review map for Week 8. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 8 follows two connected questions:

> **What happens to a forecast between the model and the realized net return,
> and which of those steps decided the result?**

> **When does the flexibility of a neural network add validated value over a
> simpler model that uses the same information?**

A forecast is not a portfolio. Scores become capital only after sizing, risk,
turnover, constraint, and trading choices are made. A neural network is not a
verdict either: it is a flexible function class whose usefulness depends on the
data structure, sample size, target, and baseline.

Three principles organize the week:

1. **The research object is the policy.** Forecast, sizing, constraints,
   trading, and cost together produce the result. Two identical models can
   produce different net performance when their policies differ.
2. **Make the optimizer compete with lower-estimation baselines.** Plug-in
   mean-variance weights amplify uncertain inputs. Equal weight, inverse
   volatility, and stabilized covariance methods are demanding comparisons
   under the same mandate.
3. **Use deep learning when its representation adds validated value.** On
   low-signal tabular return prediction, linear and boosted-tree models are
   strong baselines. Networks are strong candidates for expensive known
   functions, sequences with abundant data, and unstructured data such as text.

## Core ideas — scores to positions (Part A)

1. **A decision has three layers.** The forecast supplies a score, return,
   probability, or risk. Sizing turns it into a target position.
   Implementation turns the target into an actual trade with a cost.
2. **Information does not determine the stake.** The Kelly fraction for an
   idealized repeated bet needs a win probability and a payoff. A ranking alone
   supplies neither, so it cannot determine how much capital to commit.
3. **Same order, different capital.** Transformations that preserve every
   score rank leave rank-proportional weights unchanged but can change
   magnitude-proportional weights and their concentration. The sizing rule is a
   modeling choice.
4. **Volatility targeting scales exposure to hold risk roughly constant.** The
   scale is the target volatility divided by the forecast risk of the whole
   unscaled book, including correlations. That risk forecast must use past
   returns only; using later returns is one of the most tempting leaks in
   portfolio construction.
5. **Risk can be predictable when direction is not.** Volatility targeting
   changes the risk path; it does not create a return forecast. In the frozen
   2000–2026 market test, realized volatility moved from 19.6% to 11.1% near the
   10% target, while the Sharpe improvement (+0.02, 90% interval −0.13 to +0.17)
   was not distinguishable from zero. The two claims must be reported
   separately.
6. **Turnover can decide the net winner.** The same forecast can win before
   costs and lose after them. A no-trade band changes the policy while the
   forecast stays fixed. Select the band on validation data, freeze it, and
   report test tracking error, turnover, and net Sharpe.
7. **The holding earns the return, not the target.** If a no-trade band leaves
   a position at 1.2% when the target was 1.5%, a 2% return contributes 2.4 bp.
   Booking 3.0 bp credits capital the policy never held.
8. **Mean-variance weights amplify estimation error.** The unconstrained
   solution multiplies expected returns by the inverse covariance matrix. A
   direction with very small estimated variance receives a very large
   multiplier, so every error in the mean is filtered through that inverse. Two
   nearly redundant assets can produce wildly unstable relative bets.
9. **Mean errors usually cost more than variance errors.** The magnitude
   depends on the setting; the asymmetry is the lesson.
10. **Lower-estimation rules refuse the noisy distinction.** Equal weight (1/N)
    uses no estimates, though equal capital is not equal risk. Inverse
    volatility uses only each asset's own volatility. Ledoit–Wolf shrinkage
    regularizes the covariance while keeping the optimizer. Hierarchical risk
    parity allocates through clusters of correlated assets without estimating
    means or inverting the full covariance matrix.
11. **No rule dominates everywhere.** In known-truth settings, sample and shrunk
    minimum-variance portfolios can sit closer to the oracle than equal weight;
    on empirical industry data, no rule dominates return, drawdown, and
    turnover. Compare rules with common dates, costs, and mandate.
12. **The deployable problem is broader than the textbook one.** It adds a
    turnover penalty and budget, gross, position, and factor limits. The
    solver, estimators, constraints, penalty, and rebalance clock together
    define one policy.
13. **Freeze every selected choice.** Estimators, lookback windows, caps,
    no-trade width, rebalance clock, cost model, and missing-input rule are
    chosen on development data and carried unchanged into the test block.
14. **Separate the verdicts.** Did the forecast predict later risk or return?
    Did exposure and turnover follow the rule? Did net risk, return, or utility
    improve? Success at one layer does not settle the others. Fixing the
    forecast and varying the policy measures construction value; fixing the
    policy and varying the forecast measures information value.

## Core ideas — neural networks (Part B)

15. **A network composes simple units.** Each layer computes
    $a = \phi(Wx + b)$. A perceptron makes one weighted decision; the
    nonlinear activation lets summed units build flexible shapes that a single
    affine function cannot.
16. **Backpropagation is the chain rule applied in reverse.** The forward pass
    records values from inputs to loss; the backward pass returns each
    parameter's gradient. Check an implementation against central finite
    differences; very large and very small step sizes both make that check
    fail.
17. **Universal approximation says *could*, not *would*.** A wide enough
    network can approximate a continuous function on a bounded domain. The
    theorem says nothing about how many units, how much data, whether training
    finds the approximation, or whether it generalizes.
18. **Capacity is dangerous relative to data.** A large network on a small
    sample fits the training labels and misses the true function. Parameter
    count is one measure of capacity; regularization, data coverage, and
    distribution shift also matter.
19. **Early stopping is model selection.** The selected epoch is part of the
    fitted procedure. Forward validation must choose it, and the test block
    must stay outside that choice.
20. **Inductive bias matches structure to problem.** Convolutions, recurrence,
    and attention reuse structure and can improve sample efficiency. A
    representation wins only in the world whose structure it matches; reverse
    the target's structure and the ranking can reverse.
21. **Financial series are a hard regime for sequence models.** They are
    short, noisy, and non-stationary, which is where flexible sequence models
    overfit.
22. **Approximation accuracy and structural validity are different claims.** A
    neural option-price surrogate can be accurate inside its training box and
    still violate bounds, monotonicity, or convexity near the boundary. Small
    RMSE does not excuse a no-arbitrage violation.
23. **One seed is one draw.** Training is non-convex and seed-dependent. Report
    the spread across seeds; a median across refitted seeds is an ensemble,
    analogous to bagging with diversity from optimization randomness.
24. **A network forecast still needs the policy audit.** Units, limits, timing,
    and market costs apply to its output exactly as to any other forecast.

## When to reach for deep learning

| Situation | Deep learning? |
|---|---|
| Tabular, low-signal return prediction | Start with linear and boosting |
| Approximating a known expensive function | Strong candidate |
| Text, images, audio | Strong candidate |
| Long sequences with abundant data | Compare under forward validation |

## Terms and vocabulary

### Portfolio construction

| Term | Plain-English meaning |
|---|---|
| **Sizing rule** | The mapping from a score to a target position. |
| **Kelly fraction** | The wealth fraction that maximizes long-run log growth in an idealized repeated bet with known odds and payoff. |
| **Volatility targeting** | Scaling exposure by target risk divided by forecast risk. |
| **No-trade band** | A threshold inside which the policy does not trade toward the target. |
| **Turnover** | The amount traded per period, usually measured as the change in weights. |
| **Plug-in mean-variance** | Inserting sample estimates of means and covariance as if they were known. |
| **Global minimum variance (GMV)** | The fully invested portfolio with the lowest estimated variance. |
| **Inverse volatility** | Weights proportional to one over each asset's volatility. |
| **Ledoit–Wolf shrinkage** | Pulling a sample covariance toward a structured target to reduce estimation error. |
| **Hierarchical risk parity (HRP)** | Allocation through a cluster tree, without mean estimates or a full covariance inverse. |
| **Condition number** | Ratio of largest to smallest eigenvalue; large values mean an unstable inverse. |
| **Policy card** | The record of sizing, constraints, trading, cost, and clock that accompanies a model card. |

### Neural networks

| Term | Plain-English meaning |
|---|---|
| **Perceptron** | One unit making a weighted threshold decision. |
| **Multilayer perceptron (MLP)** | Stacked layers of units with nonlinear activations. |
| **Activation** | The nonlinear function, such as ReLU or tanh, applied inside each unit. |
| **Backpropagation** | Computing parameter gradients by applying the chain rule backward through the network. |
| **Finite-difference check** | Approximating a gradient by small parameter perturbations to verify an implementation. |
| **Universal approximation** | The existence result that a wide enough network can approximate a continuous function. |
| **Capacity** | How flexible a model is relative to the information in the data. |
| **Early stopping** | Selecting the training epoch where forward-validation loss is lowest. |
| **Inductive bias** | Structure built into an architecture that favors some functions over others. |
| **Seed ensemble** | Averaging or taking the median across networks trained from different random seeds. |

## Research protocol after Week 8

Keep the timing, validation, search, and research-record rules from earlier
weeks, then add:

- record the sizing rule, constraints, no-trade band, rebalance clock, and cost
  model as part of the model;
- compute every risk forecast from information available before the trade;
- book returns on actual holdings, not desired targets;
- compare any optimizer with equal weight, inverse volatility, and a
  stabilized covariance rule under the same mandate and costs;
- stress estimated inputs and report how weights, trades, and binding
  constraints move;
- report risk and return effects separately for any overlay;
- for a network, verify gradients, select width and stopping epoch on forward
  validation, and report the spread across seeds; and
- name the structure a network can exploit, a baseline that shares its
  information, and the forward evidence that would change your mind.

For the project, the feasibility memo is due at the end of Week 9. If your
design turns forecasts into positions, write down the sizing, turnover, and
cost rules now so they can be frozen before the final test.

## Common mistakes

Be able to explain why each statement is incomplete:

- “The model has the higher rank IC, so it will have the higher net Sharpe.”
- “Volatility targeting raised the Sharpe ratio on the full history, so it
  predicts returns.”
- “The target weight was 1.5%, so the return contribution uses 1.5%.”
- “The optimizer converged, so the weights reflect real differences between
  the assets.”
- “Equal weight is naive, so any estimated portfolio should beat it.”
- “The universal approximation theorem guarantees the network will learn the
  true function.”
- “The network beat the baseline with one seed, so the architecture is better.”
- “The surrogate's RMSE is tiny, so its prices are arbitrage-free.”

## Quiz check

You should be able to:

- distinguish the forecast, sizing, and implementation layers;
- explain why a ranking cannot by itself determine a position size;
- compute a volatility-targeting scale and identify the leakage risk in its
  risk forecast;
- separate a risk-stabilization claim from a return-improvement claim;
- explain how a no-trade band changes turnover and net results without
  changing the forecast;
- book a return contribution on the actual holding;
- explain why the inverse covariance matrix amplifies estimation error;
- compare 1/N, inverse volatility, sample GMV, Ledoit–Wolf GMV, and HRP;
- trace one forward and backward pass through a small network;
- explain what a finite-difference gradient check does and does not verify;
- state what universal approximation does and does not guarantee;
- relate capacity to sample size and distribution shift;
- explain why early stopping is a model-selection choice;
- explain why reporting one seed misstates a network's performance; and
- match a financial task to a model family with a stated baseline.

Then audit this procedure:

> A researcher trains an MLP on lagged factor returns with one random seed,
> chooses its width and stopping epoch by test-set loss, and finds a higher
> rank IC than ridge regression. They convert the scores to
> magnitude-proportional weights, volatility-target the book using a full-sample
> covariance estimate, rebalance exactly to target every day, and compute P&L on
> the target weights. They report a higher gross Sharpe than an equal-weight
> book and conclude that deep learning improves the portfolio.

A strong answer should identify test-set selection of width and epoch, the
single seed, full-sample covariance leakage in the risk forecast, P&L booked on
targets rather than holdings, missing turnover and costs, and the comparison
against equal weight on gross rather than net performance. It should also ask
whether the forecast or the construction produced the difference, by fixing
one and varying the other.
