# Week 14 Summary — Fairness, Model Risk, and the Evidence Story

This file begins with a short entry ramp and continues with a complete review
reference. Foundational terms are defined in the
[Core Vocabulary](../../docs/CORE_GLOSSARY.md).

## Start here

Week 14 moves from a fitted result to an accountable decision system. The model
is only one component. Data collection, thresholds, human review, constraints,
appeals, monitoring, and retirement all affect outcomes and responsibility.

| Word | Plain-English meaning | Week 14 example |
|---|---|---|
| **Fairness criterion** | A declared comparison of outcomes or errors across groups. | Compare approval rates or false-negative rates. |
| **Base rate** | How often an outcome occurs in a population. | Historical repayment rate for each group. |
| **Model risk** | Harm from wrong assumptions, data, implementation, or use. | A model is applied outside its intended population. |
| **Monitoring** | Checking inputs, behavior, performance, and outcomes after launch. | Track drift and error rates each month. |
| **Governance** | People and processes controlling use, approval, change, and challenge. | Independent validation and named decision authority. |
| **Retirement** | Ending use when a model is no longer appropriate. | Replace a model after data or policy changes. |

A volatility model may propose a target hedge, but policy determines the
no-trade tolerance and limits, execution determines costs and fills, and named
people control approval, fallback, and stop authority.

## Required / explain / recognize

| Level | What Week 14 expects |
|---|---|
| **USE** | Report group rates with counts and denominators; storyboard a project from question through final conclusion. |
| **EXPLAIN** | Why no single fairness metric, feature attribution, or model score completes the decision-system argument. |
| **RECOGNIZE** | Selective labels, policy tradeoff maps, Pareto-efficient choices, feature-attribution instability, model-risk standards, monitoring clocks, and retirement triggers. |

## Full reference

## Core ideas

1. **The target must match the purpose.** A model can predict its chosen label
   accurately while that label remains a poor proxy for the benefit or harm the
   decision is supposed to manage.
2. **Fairness begins with the full decision path.** Observed outcomes reflect
   data, prior policy, model, threshold, constraints, human review, and access.
3. **Removing a protected attribute does not remove its proxies.** Location,
   income, product history, and other variables can preserve related
   information.
4. **Rates require denominators and uncertainty.** A percentage without group
   counts can make a small, noisy difference look precise.
5. **Different criteria ask different moral and operational questions.** Equal
   selection rates, equal true-positive rates, and calibrated probabilities are
   not interchangeable.
6. **Different base rates create tradeoffs.** With different nonzero outcome rates, the same nonzero true- and false-positive rates imply different precision among positive decisions. That binary-decision identity is distinct from calibration at each score.
7. **A fairness metric is a screen, not a verdict.** Legal context, product
   purpose, data quality, access, error consequences, and alternatives remain
   part of the analysis.
8. **Selective labels begin with the old policy.** Outcomes may be observed only
   for cases previously approved, reviewed, or treated.
9. **Mitigation creates a policy tradeoff map.** Adjusting data, objectives,
   thresholds, constraints, or review may trade among utility, access, and
   different errors. Only nondominated choices form a Pareto frontier; the full
   sweep is not automatically a frontier.
10. **The governed object extends beyond the model.** Purpose, data, code,
   threshold, user interface, people, overrides, monitoring, and dependencies
   belong to the system record.
11. **Different risk families should remain distinct.** Model, business,
    operational, and legal or compliance risks can interact without becoming
    the same problem.
12. **A reason describes the implemented decision.** A feature attribution for
    a prediction is not automatically the legal, causal, or operational reason
    for an action.
13. **Monitoring has at least two clocks.** Input and behavior drift may be
    visible quickly; outcome labels and realized harm may arrive later.
14. **An alert begins an investigation.** A threshold crossing does not explain
    the cause or prescribe the remedy.
15. **Retirement belongs in the original design.** Define unacceptable drift,
    missing inputs, changed use, control failure, or superior replacement before
    a crisis forces the decision.
16. **The final project is an evidence chain.** Show the question, dated data,
    representation, baseline, selection, final test, decision rule, costs,
    uncertainty, and limitation.
17. **A negative result can be a strong result.** A careful test showing that a
    proposed method did not improve the baseline still answers the question.

## Terms and vocabulary

| Term | Plain-English meaning |
|---|---|
| **Protected group** | Population defined by an attribute receiving legal or ethical attention in the application. |
| **Selection rate** | Fraction of a group receiving the positive decision. |
| **Selection-rate ratio** | One group's selection rate divided by another's; a screen whose interpretation needs context. |
| **Equal opportunity** | A family of criteria comparing true-positive rates across groups. |
| **Predictive parity** | A family of criteria comparing outcome rates among cases receiving the same positive prediction or decision. |
| **Calibration by group** | Whether the same predicted probability corresponds to similar observed frequency within each group. |
| **Base rate** | Outcome prevalence in the stated population. |
| **Selective labels** | Outcomes observed only for cases selected by an earlier policy. |
| **Mitigation** | A change intended to reduce an identified harm or disparity. |
| **Policy tradeoff map** | All candidate policies plotted against declared objectives, constraints, or outcomes. It may include dominated choices. |
| **Pareto frontier** | Nondominated policies: improving one displayed objective requires worsening at least one other displayed objective. |
| **Model risk** | Risk of adverse consequences from model error or inappropriate use. |
| **Independent validation** | Review performed with authority and incentives sufficiently separate from development. |
| **Feature attribution** | Allocation of a prediction among input features under a chosen reference and method. |
| **Drift** | Change in inputs, relationships, behavior, or outcomes after development. |
| **Monitoring threshold** | Prespecified level that triggers review or escalation. |
| **Override** | Human or system action that changes the model-recommended decision. |
| **Retirement trigger** | Condition requiring withdrawal, replacement, or major redevelopment. |
| **Evidence chain** | Visible connection from question and data through procedure, comparison, result, and conclusion. |

## Research protocol after Week 14

- Define the full decision path and the people or systems controlling each
  stage.
- Report group counts, denominators, rates, uncertainty, and the consequences
  of each error.
- State which fairness criterion is being used and why it matches the decision.
- Preserve the mitigation search and choose policy tradeoffs outside the final
  test.
- Monitor inputs, predictions, decisions, overrides, delayed outcomes, and
  group effects on their appropriate clocks.
- Define escalation, rollback, and retirement authority before launch.
- Present the project as one visible evidence chain, including a negative result
  when that is what later data support.

## Cases to remember

- **Obermeyer et al. health-care algorithm:** predicting spending was not the
  same as identifying health need; target choice can create disparity even when
  the model predicts its label well.
- **JPMorgan London Whale:** the same CIO portfolio received VaR estimates of
  $132 million and $66 million under two models; a favorable metric change
  requires reconciliation and independent challenge.
- **Robinhood options approvals:** automation can follow its coded rule while
  failing to handle contradictory customer information or provide meaningful
  review.
- **Zillow Offers:** a home-price forecast became inventory, liquidity, capacity,
  and operating risk; continuation and retirement are business-system decisions.
- **SEC AI-washing cases:** claims about AI capabilities and performance require
  dated, reproducible records just like any other empirical claim.

## Quiz check

You should be able to:

- compute and interpret a selection rate and ratio with denominators;
- explain why deleting a protected attribute does not remove proxy information;
- distinguish several fairness criteria and the questions they ask;
- explain why differing base rates create tradeoffs;
- identify selective-label risk;
- distinguish prediction attribution from an implemented decision reason;
- name fast and slow monitoring clocks; and
- state who can approve, override, escalate, and retire a system.


## Notebook boundary

Demos 1–5 illustrate mechanisms on 4,000 training applicants, not held-out performance. Demo 6 freezes the model and shows three-month outcome delays, ranking, and an average calibration gap. Demo 7 records those evidence limits. The chapter figures are separate experiments with their own samples and clocks.
