# Week 4 — Optional Reading

The videos, slides, tasks, and driver contain everything required for the Week 4
portion of HW2 and Quiz 4, which is due after Week 5. Quiz 3 is due during Week 4
and assesses Week 3. The textbook readings below are optional background for a
fuller derivation and the complete empirical case studies.

## Classification and calibration

Read Chapter 8 of *Financial Machine Learning and AI* — Logistic Regression:
Direction and Credit.

Focus on:

- the distinction among a score, probability forecast, class label, and action;
- the log-odds interpretation of logistic coefficients;
- feasible event-rate and majority-policy baselines;
- ROC-AUC and precision-recall under changing prevalence;
- reliability diagrams, Brier loss, and log loss;
- the cost-ratio threshold and validation/test separation; and
- the disciplined classification protocol.

Useful exercises: 1–5.

*(Regularization — ridge, lasso, elastic net — now lives in Week 3 with the
regression family; see `../../week03/readings/README.md` and Ch 9.)*

## Forward validation

Read Chapter 10 of *Financial Machine Learning and AI* — Validation Without
Fooling Yourself.

Focus on:

- the estimand of shuffled versus forward validation;
- feature-availability and label-end times;
- the interaction of overlap, persistence, and learner capacity;
- exact purging, pre-validation gaps, and post-test embargoes;
- expanding versus rolling windows;
- nested forward selection and later outer testing; and
- validation clocks for time-series, panel, and event/document settings.

Useful exercises: 1–7.

## Further reading

- Cox (1958), "The Regression Analysis of Binary Sequences."
- Brier (1950), "Verification of Forecasts Expressed in Terms of Probability."
- Hoerl and Kennard (1970), "Ridge Regression."
- Tibshirani (1996), "Regression Shrinkage and Selection via the Lasso."
- Stone (1974), "Cross-Validatory Choice and Assessment of Statistical
  Predictions."
- Dawid (1984), "Statistical Theory: The Prequential Approach."
- Cawley and Talbot (2010), "On Over-fitting in Model Selection and Subsequent
  Selection Bias in Performance Evaluation."

## Suggested sequence

| Before or after | Activity |
|:--|:--|
| before Deck A | skim the opening credit thought experiment and probability layers |
| after Section 1 | run Demos 1–2 and compare AUC with probability loss |
| after Section 2 | complete the threshold table from Demo 3 |
| after Section 3 | freeze the policy in Demo 4 |
| before Deck B | read the correlated-proxy and label-interval sections |
| after Section 4 | run Demo 4b and compare reported and fresh-period losses |
| after Section 5 | draw one exact purge boundary |
| after Section 6 | begin the ordered split and pipeline structure in HW2 |

## Targeted explanations and teaching sources

- [scikit-learn calibration guide](https://scikit-learn.org/stable/modules/calibration.html): reliability bins, held-out calibration, proper losses, and why isotonic ties can change ranking. Useful beside Section 3; lower Brier loss alone does not establish better calibration.
- [Cawley and Talbot's original study](https://www.jmlr.org/papers/v11/cawley10a.html): selection can overfit its own criterion. Read beside the repeated search-width figure; a single inner/outer loss difference does not isolate the bias.
- [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): supports pairing worked examples with practice and graphics with explanations (moderate evidence), and explanatory questions (strong evidence). The revised notebook applies those general principles; this is not a direct trial of these finance lessons. Pre-questions have weaker evidence in this guide, so prediction prompts are not presented as a proven substitute for instruction.
