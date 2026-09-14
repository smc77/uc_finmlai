# Week 4 Summary — Probabilities, Decisions, and Forward Evidence

Use this as a short review map for Week 4. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 4 follows two connected chains:

> **features → score → probability → threshold → action → realized cost**

> **fit candidates → select earlier → freeze the procedure → assess later**

Each arrow changes the claim. A model can rank cases well without producing
trustworthy probabilities. A trustworthy probability can support several
different actions. And a policy chosen on one population still needs later data
to show whether the complete selection procedure travels.

## Core ideas

1. **Keep the score, probability, and action separate.** A score orders cases.
   Logistic regression maps an unrestricted linear score into a number between
   zero and one. A separately chosen threshold or queue rule turns that
   probability into an action.
2. **A bounded number is not automatically a trustworthy probability.** A
   probability is calibrated when cases receiving predictions near (p)
   experience the event about a fraction (p) of the time in the relevant
   future population.
3. **Ranking and probability quality are different contests.** ROC-AUC asks
   whether an event case tends to receive a higher score than a non-event case.
   Brier score and log loss grade the numerical probabilities. A strictly
   increasing transformation can preserve every rank and AUC while damaging
   probability quality.
4. **The threshold creates classifications and errors.** Moving the threshold
   changes true positives, false positives, true negatives, false negatives,
   recall, precision, and workload without changing the fitted probabilities.
5. **There is no model-free best threshold.** The operating point should follow
   the consequences of the two mistakes, review capacity, exposure, recovery,
   or another declared objective. A default threshold of 0.50 is a library
   convention, not an economic decision rule.
6. **Class imbalance changes what familiar metrics mean.** Predicting the
   majority class can give high accuracy while catching no rare events. The
   no-skill precision baseline is the event prevalence, so average precision
   must be read beside the population's base rate.
7. **The probability baseline must be feasible.** Estimate the event rate from
   training data and freeze its update rule before assessment. Using the test
   event rate gives later outcomes to the competitor retroactively.
8. **Calibration belongs to a population and a date.** A model calibrated over
   all history can misstate risk for a later vintage, product, score band, or
   subgroup. Any recalibration step must be fitted without consuming final
   assessment data.
9. **A saved fitted object is not the whole research procedure.** The candidate
   models, fitted preprocessing, selection rule, threshold rule, refit schedule,
   and baseline all contribute to the result that later data assess.
10. **Validation should reproduce the deployment clock.** If production fits on
    the past and predicts the future, shuffled folds answer a different
    historical-mixture question. Every fitted input and matured training label
    must be available before the validation decision.
11. **Label overlap and time dependence are not the same problem.** Exact
    purging removes training rows whose outcome intervals cross an assessment
    boundary. Blocking can reduce neighbor overlap. Neither action by itself
    proves independence or fixes every source of leakage.
12. **Select inside; assess outside.** Inner earlier folds choose features,
    hyperparameters, calibration, and thresholds. Outer later blocks assess the
    complete selected procedure. The outer result—not the best inner score—is
    the evidence about travel.

## One probability, three questions

| Question | Appropriate evidence |
|---|---|
| **Did the model order cases usefully?** | ROC-AUC, precision-recall, or another declared ranking measure |
| **Were the numerical probabilities trustworthy?** | Brier score, log loss, reliability by relevant population, calibration intercept and slope |
| **Did one frozen action rule help?** | confusion-matrix counts, workload, missed events, and realized cost under the declared threshold or capacity rule |

These are not three interchangeable quality scores. A model may pass one
contest and fail another.

## A simple cost threshold

Under calibrated probabilities, constant binary costs, and no capacity limit,
flag the case when

\[
p>\frac{C_{FP}}{C_{FP}+C_{FN}}.
\]

If a missed event costs ten units and an unnecessary flag costs one, the cutoff
is (1/11\approx0.091), not 0.50. This formula is only as good as its assumptions.
When exposure, recovery, margin, or capacity differs across cases, the policy
may need more than one universal threshold.

## Three validation roles

| Role | What it may do |
|---|---|
| **Training** | Fit coefficients, scalers, imputers, calibrators, and other learned state. |
| **Inner validation** | Choose candidate features, models, hyperparameters, thresholds, and stopping rules. |
| **Outer assessment** | Judge the complete frozen selection procedure on later observations. |

If an outer result changes the procedure, that block becomes development data.
A fresh confirmatory claim needs later outcomes or another defensible untouched
population.

## Terms and vocabulary

### Classification and probability quality

| Term | Plain-English meaning |
|---|---|
| **Binary classification** | Predicting which of two outcomes will occur, such as default or repayment. |
| **Logistic regression** | A linear score passed through a sigmoid to produce an event probability. |
| **Log-odds** | \(\log(p/(1-p))\); logistic regression is linear on this scale. |
| **Base rate / prevalence** | The fraction of the relevant population experiencing the event. |
| **Threshold** | The policy cutoff that converts a probability or score into a class or action. |
| **Confusion matrix** | Counts of true positives, false positives, true negatives, and false negatives for one frozen threshold. |
| **Type I error** | Rejecting a true null. If “no event” is the null, this is a false positive. |
| **Type II error** | Failing to reject a false null. If “no event” is the null, this is a false negative. |
| **Recall / sensitivity** | Fraction of actual events that the policy flags. |
| **Specificity** | Fraction of actual non-events that the policy correctly leaves unflagged. |
| **Precision** | Fraction of flagged cases that are actual events. |
| **ROC-AUC** | Probability that a randomly chosen event receives a higher score than a randomly chosen non-event. |
| **Precision-recall curve** | Precision and recall across thresholds; especially useful for understanding rare-event queues. |
| **Calibration** | Agreement between predicted probabilities and observed event frequencies in a declared population. |
| **Reliability diagram** | Predicted probability against observed event rate across bins, ideally with counts or uncertainty. |
| **Brier score** | Mean squared probability error; lower is better. |
| **Log loss** | Probability loss that punishes confident errors especially strongly; lower is better. |
| **Proper scoring rule** | A loss minimized in expectation by reporting one's genuine probability belief. |
| **Recalibration** | Fitting a new probability map, such as an intercept update, Platt scaling, or isotonic regression. |

### Forward validation

| Term | Plain-English meaning |
|---|---|
| **K-fold cross-validation** | Divide development data into $k$ groups, fit $k$ times, and let each group serve once as validation while the other $k-1$ groups train. |
| **Out-of-fold prediction** | A prediction for a development row made by the fit that excluded that row's fold from training. |
| **Shuffled K-fold** | Assign rows to folds without preserving calendar order; appropriate only when that historical-mixture question matches the intended use. |
| **Contiguous K-fold** | Hold out date blocks but permit the other blocks—including later dates—to train; useful diagnostically but not a live forward forecast. |
| **Validation estimand** | The population, horizon, loss, baseline, and production procedure the validation score is intended to describe. |
| **Forward validation** | Fitting on earlier eligible observations and evaluating on later decisions. |
| **Label interval** | The full future period used to determine one outcome, not merely the row's feature date. |
| **Purging** | Removing training rows whose label intervals overlap the assessment interval. |
| **Gap** | Prespecified separation before an assessment block, often used for latency or dependence beyond exact label overlap. |
| **Embargo** | In a non-forward design with later observations in training, exclusion of a post-test margin before those later rows re-enter training. |
| **Expanding window** | Training history grows as time advances. |
| **Rolling window** | A fixed-length recent training history moves through time. |
| **Refit cadence** | How often production re-estimates the model or policy. |
| **Nested forward validation** | Inner earlier folds select; outer later folds assess the complete selected procedure. |
| **Lockbox / final assessment** | Untouched evidence used once; after it influences a change, it becomes development history. |
| **Distribution shift** | The later population differs from the population that produced the earlier evidence. |

## Rules earned this week

> **Rule 8 — The metric and the threshold must follow the decision.**

Score ranking, probability quality, and policy value separately. Choose the
operating rule from declared consequences before final assessment.

> **Rule 10 — Validate forward in time.**

Reproduce the production information set and refit schedule, remove exact
interval conflicts, and state what the remaining validation design estimates.

## Research protocol after Week 4

Keep the Week 1–3 evidence, timing, baseline, and ledger rules, then add:

- define the event, forecast horizon, action, population, and consequences;
- preserve score, probability, threshold, action, and cost as separate fields;
- compare the probability model with a frozen training-rate baseline;
- declare whether ranking, probability loss, or policy cost is primary;
- choose calibration and the operating rule inside development data;
- store feature availability and label start/end for every row;
- make the split protect the time, entity, or event unit required by deployment;
- record every candidate inspected inside the selection procedure; and
- report outer-period losses individually as well as under a declared aggregate.

## Common mistakes

Be able to explain why each statement is too strong:

- “The model has high AUC, so its 20% predictions really mean 20%.”
- “Accuracy is 92%, so the rare-event classifier works well.”
- “Logistic regression outputs probabilities, so 0.50 is the correct cutoff.”
- “The row is dated before validation, so its five-day label is safe for training.”
- “The shuffled score is higher, so the chronological model must contain leakage.”
- “We selected the winner on validation, so its best validation score is an unbiased final result.”

## Quiz check

You should be able to:

- separate a score, probability, threshold, action, and realized cost;
- distinguish ranking evidence from probability and policy evidence;
- interpret AUC as a pairwise ranking probability;
- explain why prevalence changes precision and majority-class accuracy;
- compute a simple cost-ratio threshold and state its assumptions;
- identify which rows cross a fixed-horizon assessment boundary;
- explain why a shuffled fold and forward split answer different questions;
- distinguish blocking, purging, a gap, and an embargo;
- choose expanding or rolling windows to match a deployment procedure; and
- explain why outer assessment judges the selection procedure rather than its
  best inner score.

Then audit this procedure:

> A lender fits a default model and calibrator on all 2010–2025 data, selects a
> 0.50 threshold because it gives the highest full-sample accuracy, reports AUC
> from shuffled folds, and claims the system is ready for 2026. Some five-month
> default labels from late 2025 do not mature until 2026. The manual-review team
> can inspect only 5% of applications.

A strong answer should identify the full-sample fitted-state leakage, the
unjustified 0.50 and accuracy objective, the mismatch between shuffled folds and
prospective deployment, the crossing label intervals, the missing later outer
assessment, and the need for a capacity-aware policy such as a validation-frozen
top-5% queue.
