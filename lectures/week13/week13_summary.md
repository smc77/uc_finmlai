# Week 13 Summary — Logged Policies and Intervention Effects

This file begins with a short entry ramp and continues with a complete review
reference. Foundational terms are defined in the
[Core Vocabulary](../../docs/CORE_GLOSSARY.md).

## Start here

Week 13 asks what can be learned from a world that did not let us try every
action. A historical log shows the action actually chosen and the outcome that
followed. It does not directly show the outcome under an unchosen action. Part A
studies that problem for policies; Part B studies it for interventions.

| Word | Plain-English meaning | Week 13 example |
|---|---|---|
| **Behavior policy** | The rule that generated the recorded actions. | The desk's historical execution rule. |
| **Candidate policy** | The new rule we want to evaluate. | A more aggressive execution policy. |
| **Support** | The log contains the actions the candidate would choose in comparable states. | Large orders exist in thin markets. |
| **Counterfactual** | The outcome that would have followed an unchosen alternative. | Cost if the desk had waited instead. |
| **Causal effect** | The change produced by an intervention rather than an association. | Change in cost caused by a market rule. |
| **Difference-in-differences (DiD)** | Comparison of before–after changes in treated and comparison groups. | Did costs change more for affected securities? |

A recording shows the road actually taken. It does not turn its head and show
the road not taken.

## Required / explain / recognize

| Level | What Week 13 expects |
|---|---|
| **USE** | Audit logged-action support, define an estimand, and work a two-by-two DiD calculation. |
| **EXPLAIN** | Why prediction differs from intervention, why replay differs from a responsive environment, and why parallel trends is counterfactual. |
| **RECOGNIZE** | Deep RL as neural function approximation, importance weighting, effective sample size, clipping, instruments, synthetic control, regression discontinuity, and heterogeneous effects. |

## Full reference

## Core ideas

1. **A replay, decision log, and simulator answer different questions.** A
   replay preserves a recorded price path. A log records chosen actions and
   their probabilities. A simulator supplies a transition law for alternative
   actions by assumption.
2. **A contextual bandit is one decision deep.** It observes a context, chooses
   an action, receives one reward, and the case ends. Sequential policy
   evaluation must additionally account for action-dependent successors.
3. **Support comes before estimation.** If the behavior policy never selected
   an action in a relevant state, the log contains no direct outcome evidence
   for a candidate that chooses it there.
4. **Importance weighting reuses actions that did occur.** It gives more weight
   to logged decisions that the candidate policy would choose more often. Very
   small behavior probabilities create unstable large weights.
5. **Clipping trades variance for bias.** Limiting extreme weights may stabilize
   an estimate, but it does not create the missing counterfactual.
6. **Search over policies is still multiple testing.** The policy selected after
   many simulator or validation trials inherits that search.
7. **An exact controlled world separates learning error from environment
   error.** Backward induction can provide an oracle execution policy against
   which Q-learning and simple baselines are compared.
8. **Stress a frozen policy.** Change liquidity, volatility, impact, or fill
   behavior after selection. Retraining on the stress environment converts it
   into development data.
9. **Deep RL changes the representation, not the evidence.** A neural network
   can estimate action values or a policy when a table is too large. Experience
   replay and a slower target network can stabilize DQN training, but they do
   not create action support or validate the simulator.
10. **Prediction and intervention answer different questions.** A feature can
   predict an outcome without the outcome changing when the feature is
   manipulated.
11. **The estimand comes first.** State whose outcome, which treatment, which
    comparison, what horizon, and which population the causal quantity refers
    to.
12. **Confounding creates an open alternative explanation.** A common cause of
    treatment and outcome can make their association differ from the treatment
    effect.
13. **More controls are not always safer.** Controlling for a consequence of
    treatment or a collider can introduce rather than remove bias.
14. **DiD borrows the comparison group's trend.** It subtracts the comparison
    group's before–after change from the treated group's change.
15. **Parallel trends is an assumption about the missing untreated path.** It
    cannot be proved from pre-treatment similarity alone, though pre-trends and
    institutional evidence can challenge it.
16. **Identification is not transport.** A credible effect for one population,
    time, and implementation does not automatically apply elsewhere.

## Terms and vocabulary

| Term | Plain-English meaning |
|---|---|
| **Recorded replay** | Applying accounting rules to a fixed historical path without letting actions change that path. |
| **Responsive environment** | A world or simulator that returns a successor conditional on the chosen action. |
| **Logged contextual bandit** | Context, chosen action, behavior probability, and reward for one-step decisions. |
| **Behavior probability** | Probability the historical policy assigned to the action it took. |
| **Support / overlap** | Requirement that actions needed by the candidate appear with positive probability in the log. |
| **Importance weight** | Candidate action probability divided by behavior action probability. |
| **Effective sample size** | A summary of how much information remains after unequal weights concentrate evidence. |
| **Deep reinforcement learning (deep RL)** | RL in which a neural network represents an action-value function, policy, or value critic instead of a small lookup table. |
| **Deep Q-network (DQN)** | A neural network that estimates Q-values; experience replay and a slower target network are commonly used to make its training more stable. |
| **Estimand** | The exact quantity the analysis intends to learn. |
| **Treatment / intervention** | The action or exposure whose effect is being studied. |
| **Potential outcome** | Outcome that would occur under one specified intervention. |
| **Counterfactual** | A potential outcome not observed for that unit at that time. |
| **Confounder** | A pre-treatment common cause of treatment and outcome. |
| **Collider** | A variable caused by two other variables; conditioning on it can create a false association. |
| **Adjustment set** | Variables conditioned on to block stated noncausal paths. |
| **Difference-in-differences** | Treated before–after change minus comparison before–after change. |
| **Parallel trends** | Assumption that, without treatment, the groups would have followed the same average change. |
| **Event study** | A time-indexed extension showing estimates before and after treatment. |
| **Instrumental variable** | A source of treatment variation used under relevance, independence, and exclusion assumptions. |
| **Synthetic control** | A weighted combination of comparison units used to construct a counterfactual path. |
| **Regression discontinuity** | Comparison of observations close to a treatment cutoff. |
| **Transport** | Applying an identified result to a different population or setting. |

## Research protocol after Week 13

- Name whether the evidence source is a replay, logged policy, or responsive
  simulator.
- Audit action support before estimating a candidate policy's value.
- Record behavior probabilities, weight concentration, clipping, and every
  policy tried.
- Freeze policies before simulator stress and keep calibration separate from
  final evaluation.
- For causal work, state the estimand, draw the assumed causal structure, and
  name the comparison supplying the missing counterfactual.
- Treat identification assumptions and transport assumptions as separate.

## Quiz check

You should be able to:

- distinguish a replay, logged contextual bandit, and responsive simulator;
- explain why support cannot be repaired by a clever estimator;
- interpret an importance weight and effective sample size;
- distinguish prediction from the effect of an intervention;
- identify a confounder and explain why some controls can create bias;
- calculate a two-by-two DiD estimate;
- state parallel trends in counterfactual language; and
- distinguish identification from transport.


## Demo interpretation updates — November 14

- The matching-engine comparison shows **filled-share shortfall and completion
  together**. Thin-book median completion is only 79–81%; the lower-cost bar
  is not necessarily the best complete order. Its metric also differs from
  the training world’s inventory-risk-inclusive cost.
- The support exercise now plots the actual sample. Capping weights can raise
  weight-based ESS without adding evidence or identifying unsupported actions.
- The DiD notebook includes common-date event-time contrasts and pointwise
  intervals. These can reveal prior divergence but cannot prove parallel trends.
- Every random fixture resets its own seed. The current noise-search scores are
  +.559 in training and +.005 on average across 30 new paths. The DiD estimates
  are .325/.503 without/with the extra untreated trend; truth
  stays .300.
- Regression discontinuity diagnostics must check composition and mechanism,
  not only a density jump exactly at zero. Symmetric sorting can alter nearby
  composition without that particular jump.
