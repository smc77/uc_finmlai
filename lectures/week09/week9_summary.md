# Week 9 Summary — Learning a Pricing Function and a Hedging Policy

Use this as a short review map for Week 9. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 9 is a case study in options, built around two different learning
targets:

> **Part A — learning a pricing function.** Can a fast neural surrogate replace
> an expensive pricing evaluator, and over what declared domain?

> **Part B — learning a hedging policy.** Under trading costs, which sequence of
> trades produces a terminal profit-and-loss distribution the desk can carry?

A pricing surrogate emits a number and is judged against a reference
evaluator. A hedging policy changes inventory through its trades and is judged
by the distribution of terminal net P&L. The difference between those two
targets is the point of the week.

Three principles organize the week:

1. **Keep model, numerical, surrogate, and calibration error on separate
   ledgers (Rule 26).** Each has a different reference and a different report.
   Netting them into one accuracy number hides which layer failed.
2. **Hedging is a decision, not a price (Rule 24).** Declare the premium,
   information, instruments, costs, constraints, and risk objective; select on
   development paths; and report mean, dispersion, tail loss, turnover, and
   changed-world stress.
3. **Reach for deep learning where it has a real job (Rule 18).** A costly,
   structured nonlinear pricing map with abundant generated labels is such a
   job. Flexibility in a hedging policy must still beat a transparent rule on
   held-out paths.

## Core ideas

### Learning a pricing function (Part A)

1. **Implied volatility is a quote coordinate, not a physical observation.** It
   is the number that makes Black–Scholes reproduce a market price. A smile or
   surface organizes how prices depart from constant volatility; it does not
   by itself identify the mechanism that produced them.
2. **There are four error ledgers.** *Model error* compares the model with the
   market. *Numerical error* compares the implemented evaluator with the
   model's exact answer. *Surrogate error* compares the network with the
   reference evaluator. *Calibration error* compares fitted prices with market
   quotes, rescored by the reference.
3. **Audit the evaluator before learning a shortcut.** Monte Carlo has a
   sampling error, reduced by more paths, and a discretization bias, reduced by
   more time steps. A nominal 95% interval covers sampling variation only
   *conditional on the discretized scheme*; it can reach nominal coverage
   while time-step bias remains material. Report accuracy and runtime on
   separate axes.
4. **A surrogate inherits its labels.** Training labels come from the
   reference evaluator, so the network inherits its assumptions, tolerances,
   and any implementation defect — and can reproduce an unmeasured bias more
   quickly.
5. **A surrogate moves computation offline.** Its value comes from replacing
   thousands of repeated evaluator calls, for example inside a calibration
   search. A speed claim belongs to a stated batch, hardware, implementation,
   and domain.
6. **Declare the box before sampling.** Moneyness, maturity, volatility state,
   and model parameters each need an interior and a boundary region. A random
   train/test split inside one box does not test its edge.
7. **Interior accuracy does not authorize extrapolation.** Wing values are
   small and sparsely sampled, and activations extrapolate by architecture,
   not by finance. The declared deployment box must travel with the fitted
   surrogate.
8. **Report a distribution of errors, not one RMSE.** Absolute price error,
   error in basis points of spot, relative error, worst-group error, Greek
   error, and shape violations protect different things.
9. **Calibration is the inverse problem.** Pricing maps parameters to quotes;
   calibration asks which parameters could have produced the observed surface.
   A fast surrogate makes a larger search feasible, which is a real
   contribution even without new financial theory.
10. **Fit is not identification.** A small quote error can coexist with
    parameter vectors that differ across starts or reach their bounds.
    Calibration fit and parameter identification are separate claims.
11. **Rescore with the reference.** A surrogate may propose parameters, but the
    reported calibration loss should come from the reference evaluator.
    Otherwise surrogate error is silently reported as model fit.
12. **Static arbitrage is a shape audit.** For European calls, price should
    fall with strike, be convex in strike, and rise with maturity. These
    restrictions connect nearby predictions, so pointwise accuracy cannot test
    them: a surrogate can be close to every price and still produce an illegal
    surface.
13. **American exercise changes the target.** In Longstaff–Schwartz, the fitted
    continuation value matters only through the stopping rule it induces.
    Judge the frozen policy's value on independent paths, not the
    continuation regression score; training-path value is optimistic.

### Learning a hedging policy (Part B)

14. **Replication holds only under its assumptions.** Black–Scholes delta
    replicates the option under continuous trading, no costs, constant-volatility
    GBM, no jumps, and common funding. Each failed assumption opens a
    boundary: discretization error, cost debits, changed dynamics, jump error,
    or position-dependent financing.
15. **Write the self-financing ledger.** Terminal P&L is the premium, plus
    trading gains, minus transaction costs, minus the option settlement. State
    sign and unit conventions; this week reports loss as positive, so lower is
    better.
16. **Rebalancing frequency changes two ledgers at once.** Without costs, more
    frequent hedging reduces dispersion and tail loss. With costs, it pays more
    for that control. The best frequency depends on the declared objective and
    friction model.
17. **Declare the objective first.** Entropic risk,
    $\rho_\lambda(L)=\tfrac1\lambda\log\mathbb E[e^{\lambda L}]$, is convex and
    tail-sensitive, and adding a constant to the loss shifts it by the same
    amount. The 5% expected shortfall is the mean loss in the worst 5% of
    paths.
18. **Freeze the environment contract.** Paths, claim, action, friction,
    information, and objective define the problem. Every learned policy and
    performance claim is conditional on that contract.
19. **Compare three policies under one objective.** Black–Scholes delta is
    analytic but cost-blind. A constant no-trade band holds inside a
    validation-selected half-width and trades to the nearest edge outside it.
    A neural policy can learn partial, asymmetric, state-dependent restraint;
    initializing it at delta lets it learn only the residual created by
    frictions.
20. **No single number settles the comparison.** In the case study, band and
    neural policies were not meaningfully separated on the primary entropic
    objective; the network had lower tail loss, while the band traded less.
    Opening the policy — plotting trade against inventory — supplies the
    mechanism behind the result.
21. **One friction cell is not a conclusion.** A cost-by-frequency sweep, with
    the band reselected on validation in each cell, locates where restraint
    matters. The selected band generally widens as costs rise, and at very low
    cost the improvement over delta stays small.
22. **New paths from the same simulator are not a changed world.** Test paths
    evaluate one simulated environment. Changed volatility, jumps, wider
    spreads, impact, or execution limits are separate stress tests. Freeze
    policies before stressing them; retraining turns the stress set into
    another selection environment.
23. **Relative ranking is not absolute safety.** A policy can stay ranked first
    while every policy deteriorates. Whether any remains acceptable requires a
    risk limit declared before the results are seen.

## When a learned pricer is useful

| Task | Starting point |
|---|---|
| Liquid vanilla quote | Analytic formula plus implied volatility |
| Costly high-dimensional calibration | Learned surrogate candidate |
| Large exotic book | Surrogate after a reference audit |
| Sparse extrapolation | Reference model plus explicit stress tests |
| American exercise | Compare frozen stopping policies |

## The four-ledger result card

| Ledger | Reference | Required report |
|---|---|---|
| Model | Market object | Misspecification and scope |
| Numerical | High-accuracy evaluator | Convergence and runtime |
| Surrogate | Reference evaluator | Regional error and shape |
| Calibration | Market quotes, rescored | Loss, parameters, stability |

## Terms and vocabulary

### Pricing

| Term | Plain-English meaning |
|---|---|
| **Implied volatility** | The volatility that makes Black–Scholes reproduce an observed option price. |
| **Volatility smile / surface** | Implied volatility across strike, and across strike and maturity. |
| **Reference evaluator** | The trusted numerical routine that generates labels and rescoring prices. |
| **Discretization bias** | Error from simulating continuous dynamics with finite time steps. |
| **Surrogate** | A fast learned approximation of an evaluator over a declared domain. |
| **Deployment box** | The input region inside which a surrogate has been validated. |
| **Calibration** | Choosing model parameters so model prices match market quotes. |
| **Weak identification** | Different parameter vectors fitting the quotes almost equally well. |
| **Static arbitrage** | Price shapes across strike or maturity that would allow riskless profit. |
| **Continuation value** | The estimated value of holding an American option rather than exercising now. |

### Hedging

| Term | Plain-English meaning |
|---|---|
| **Delta hedge** | Holding the Black–Scholes sensitivity of the option in the underlying. |
| **Self-financing ledger** | P&L accounting with no outside cash added after the premium. |
| **Turnover** | Total amount traded in the hedge over the option's life. |
| **No-trade band** | A region around the target holding inside which the policy does not trade. |
| **Entropic risk** | A convex, tail-sensitive risk measure controlled by a risk-aversion parameter. |
| **Expected shortfall (5%)** | Mean loss in the worst 5% of paths. |
| **Environment contract** | The declared paths, claim, actions, frictions, information, and objective. |
| **Residual policy** | A learned adjustment added to a theory-based baseline action. |
| **Changed-world stress** | Evaluating a frozen policy under different dynamics or trading conditions. |

## Research protocol after Week 9

Keep the timing, validation, search, policy, and research-record rules from
earlier weeks, then add:

- audit the reference evaluator for sampling error, discretization bias, and
  runtime before training anything on its output;
- declare the input box and boundary sets before sampling, and report
  interior and boundary error separately;
- check static-arbitrage shape as well as pointwise error;
- rescore any surrogate-assisted calibration with the reference and report
  parameter stability, not just quote fit;
- for hedging, write the ledger with sign and unit conventions, declare the
  risk objective and environment contract, and select on validation paths;
- compare learned policies with delta and a transparent band under the same
  objective, and inspect policy shape; and
- stress frozen policies in changed worlds against a risk limit declared in
  advance.

For the project, the **data-feasibility memo and literature map are due at
the end of this week**. Homework 5 and Quiz 8 are also due.

## Common mistakes

Be able to explain why each statement is incomplete:

- “The Monte Carlo interval achieved 95% coverage, so the price is accurate.”
- “The surrogate's test R² is 0.999, so it can be used across the whole
  surface.”
- “The calibration error is tiny, so the parameters are identified.”
- “The surrogate prices are close to the reference, so the surface is
  arbitrage-free.”
- “The continuation regression fits well, so the exercise policy is good.”
- “Daily hedging is best because it gives the smallest dispersion.”
- “The neural policy has the lowest tail loss, so it dominates the band.”
- “The policy performed well on fresh simulated paths, so it is robust.”

## Quiz check

You should be able to:

- explain what implied volatility does and does not measure;
- name the four error ledgers and the reference for each;
- separate sampling error from discretization bias in a Monte Carlo price;
- explain why a surrogate inherits the evaluator's defects;
- explain why a random holdout inside the training box does not test the
  boundary;
- distinguish calibration fit from parameter identification, and explain
  rescoring with the reference;
- state the three static-arbitrage shape conditions for European calls;
- explain why an American-exercise policy is judged on independent paths;
- list the Black–Scholes replication assumptions and what fails without each;
- write the self-financing hedging ledger with costs;
- explain how rebalancing frequency trades tracking error against cost;
- describe delta, a constant no-trade band, and a residual neural policy; and
- distinguish independent test paths from a changed-world stress test.

Then audit this procedure:

> A researcher trains a neural pricer on Heston Monte Carlo prices generated
> with few time steps, tests it on a random 20% holdout from the same box, and
> reports R² of 0.999. They use it to calibrate to market quotes, report the
> surrogate's calibration loss, and do not check the fitted surface's shape.
> They then train a neural hedging policy on simulated GBM paths, tune its
> width on the test paths, compare it with daily delta hedging at zero cost,
> and declare it robust after evaluating it on new paths from the same
> simulator.

A strong answer should identify the unmeasured discretization bias in the
labels, the missing boundary and shape audits, the unrescored calibration
loss and unchecked parameter stability, test-set selection of the policy, a
cost-blind comparison against an untuned baseline with no band, and the
absence of any changed-world stress or declared risk limit.
