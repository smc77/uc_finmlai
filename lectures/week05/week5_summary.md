# Week 5 Summary — Flexible Models, Disciplined Evidence

Use this as a short review map for Week 5. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 5 asks one question:

> **What additional structure can a flexible model represent, and what evidence
> supports its use?**

Trees can discover thresholds and interactions that a line misses. Forests can
stabilize trees by averaging them. Boosting can build a strong predictor through
many small corrections. None of those abilities makes a result trustworthy by
itself. As flexibility and search grow, the information boundary, validation
path, feasible baseline, and final test matter more.

## Core ideas

1. **A tree is a movable set of if-then walls.** At each node, the algorithm
   chooses a feature and threshold, sends rows left or right, and repeats. Every
   leaf stores a prediction for the region created by those decisions.
2. **Trees represent thresholds and interactions naturally.** A feature can
   matter only after another condition is met. XOR is the clean example: neither
   input has a useful additive effect by itself, but their combination determines
   the outcome.
3. **Depth increases capacity, not information.** Deeper trees can isolate smaller
   groups and reduce training error. They can also memorize accidents. Minimum
   leaf size, depth limits, and pruning ask how much evidence each local rule
   must have.
4. **Ordinary trees reuse fitted leaf values; they do not continue a trend beyond
   their last split.** Outside the observed feature range, a regression tree reuses an
   existing leaf value. That makes range shift a serious deployment question.
   It does not mean that levels are always the wrong target or that a line's
   extrapolation must be correct.
5. **A forest primarily reduces sampling variance by averaging disagreement.** Each tree sees a
   bootstrap sample and a random subset of features. Averaging helps most when
   the trees' errors are not too correlated. More nearly identical trees add
   little new protection.
6. **A forest learns an adaptive neighborhood.** Training cases receive more
   weight when the fitted trees repeatedly place them in the same leaves as the
   new case. The forest therefore learns which features define predictive
   similarity rather than starting from a fixed distance formula.
7. **Out-of-bag evidence is convenient, but its clock must match the intended evaluation.** A
   row is out of bag for trees that did not sample it. That creates an internal
   diagnostic, not automatically a valid prospective time-series test.
8. **Feature importance is a question, not a fact stored inside the model.**
   Impurity importance summarizes training split gains and can favor features
   with many split opportunities. Held-out permutation importance asks how much
   prediction worsens when one feature is broken. Correlated substitutes can
   make either individual attribution incomplete. Importance is not causation.
9. **Boosting primarily reduces systematic error, or bias, through sequential correction.** Begin with a simple forecast. Fit a
   small tree to what the current model still gets wrong, shrink that correction,
   add it, and repeat. The loss defines what “wrong” means. A correction can
   reduce bias and still worsen total prediction error if it adds too much variance.
10. **Learning rate and number of trees form one path.** A smaller learning rate
   takes smaller steps and usually needs more stages. The maximum tree count is
   only a search cap. Forward validation chooses where to stop.
11. **A spectacular jump begins an audit.** Every model family exploits target
    proxies, revised values, timing mistakes, identifiers, and selection
    artifacts; in the Week 5 demo the linear baseline gained the most, not the
    least. A simple model is not a defense. Trace the information path before
    telling an economic story.
12. **Validation selects; a later test assesses.** Depth, feature subsets,
    learning rate, stage count, and stopping rules all belong to the search.
    Once the final test influences any of them, it is development data.

## Three ensemble ideas

| Method | Plain-English construction | Main purpose |
|---|---|---|
| **Single tree** | Repeatedly divide the feature space and predict within each final region. | Represent thresholds and interactions clearly. |
| **Random forest** | Fit many randomized trees independently, then average or vote. | Reduce the instability of one tree. |
| **Gradient boosting** | Add small trees one after another, with each correcting the current ensemble. | Build a strong additive predictor along a controlled path. |

A forest is like a group of researchers working independently and averaging
their answers. Boosting is like one editor revising a draft repeatedly: each
new edit depends on the draft produced by the earlier edits.

The mechanisms can be combined. Stochastic boosting randomizes rows or features
inside one ordered correction path. Bagged boosting averages several complete
boosting paths. A one-step boosted forest averages first and then fits one
honest residual correction. None is automatically superior: later data must
show that any bias reduction is larger than the added variance.

**XGBoost, LightGBM, and CatBoost** are different software systems built around
the additive-tree boosting idea. They differ in optimization, tree growth,
missing-value handling, and categorical-feature treatment. They still require
the same point-in-time inputs and forward evaluation design.

## The evidence path

For a prospective financial application:

1. Fit models and all preprocessing on the training history.
2. Use the next chronological block to choose complexity and the stopping rule.
3. Save the complete selected configuration before opening the final block.
4. Test that frozen procedure once on later observations and against the same
   feasible baseline used by its competitors.
5. Preserve the full search path and the final result in the research record.

The selected score is not interpretable without the number and dependence of the
candidates evaluated during selection.

## Terms and vocabulary

### Trees and forests

| Term | Plain-English meaning |
|---|---|
| **Decision tree** | A model that predicts by following learned feature-threshold questions to a leaf. |
| **Node / split** | A group of rows / the feature-and-threshold rule that divides that group. |
| **Leaf** | A final region and its stored prediction. |
| **Impurity** | A measure of how mixed the outcomes are inside a node. |
| **Greedy split** | The best split available at the current step, chosen without rebuilding earlier choices. |
| **Tree depth** | The largest number of split decisions on a path from root to leaf. |
| **Minimum leaf size** | The fewest training rows allowed to support a leaf prediction. |
| **Pruning** | Removing branches whose added complexity is not sufficiently useful. |
| **Interaction** | A feature's effect depends on the value of another feature. |
| **XOR** | A known-truth pattern in which exactly one of two conditions must hold; a simple additive line cannot represent it. |
| **Held-out sample** | Rows drawn from the same population and never used to fit or select. Carries no dates; a held-out score estimates population risk. |
| **Out-of-sample** | Evaluated on a *later* period than the one used to fit or select. Held-out plus a forward boundary. |
| **Population risk** | Expected squared prediction error for a new observation from the target population, with the fitted model held fixed. Held-out rows estimate it; more rows sharpen the estimate, not the quantity. |
| **Bootstrap sample** | A same-sized training sample drawn with replacement, so some rows repeat and some are omitted. |
| **Random forest** | An average of trees fitted with row and feature randomization. |
| **Adaptive neighborhood** | The training cases that repeatedly share forest leaves with a new case and therefore receive more prediction weight. |
| **Out-of-bag (OOB) row** | A training row omitted from one tree's bootstrap sample. |
| **Impurity importance** | Total training split improvement credited to a feature. |
| **Permutation importance** | Score loss after a feature is shuffled on a declared test population. |

### Boosting and tuning

| Term | Plain-English meaning |
|---|---|
| **Gradient boosting** | A stagewise model that adds learners chosen to reduce the current loss. |
| **Base learner** | The small model fitted at one boosting stage, usually a shallow tree here. |
| **Decision stump** | A depth-one tree with one split and two terminal leaves. |
| **Residual** | Under squared loss, observed outcome minus the current prediction. |
| **Negative gradient / pseudo-residual** | The direction in which the current loss says predictions should move; for squared loss, this is the residual. |
| **Learning rate** | The fraction of each new tree's correction that enters the ensemble. |
| **Stage / boosting round** | One additional base learner and update. |
| **Early stopping** | Selecting the stage where declared validation performance stops improving enough. |
| **Patience** | How many non-improving stages are tolerated before stopping. |
| **Search boundary** | The edge of the tried hyperparameter range; a selected setting there may mean the search cap influenced the answer. |
| **Stochastic gradient boosting** | One ordered boosting path whose stages use randomized subsets of rows or features. |
| **Forward validation** | Choosing complexity on observations later than the fitting data while preserving production order. |

## Research protocol after Week 5

Keep the evidence, timing, validation, and ledger rules from Weeks 1–4, then add:

- state why the flexible function class matches the suspected structure;
- record every depth, leaf-size, feature, learning-rate, and stage candidate;
- inspect training and forward-validation paths rather than only the selected result;
- compare OOB evidence with the deployment clock before interpreting it;
- audit range shift and predictions beyond the training support;
- name the population used for every importance calculation;
- treat an extreme improvement as a trigger for data-lineage and search audits;
  and
- reserve a later test block to evaluate the complete selection-and-stopping procedure.

## Common mistakes

Be able to explain why each statement is too strong:

- “The deepest tree fits best, so it learned the most.”
- “The forest's OOB score is good, so it passed a forward test.”
- “This feature has the largest impurity importance, so it causes the outcome.”
- “Five hundred boosting trees have lower training loss than one hundred, so we
  should keep adding trees.”
- “The score doubled after adding a new data field, so we found a powerful signal.”

## Quiz check

You should be able to:

- follow a row through a tree and interpret its leaf prediction;
- explain why XOR requires an interaction or transformed representation;
- read training and later accuracy across depth and identify overfitting;
- explain why a tree flatlines outside its observed feature range;
- describe how bootstrap rows, random features, and averaging stabilize a forest;
- distinguish impurity from held-out permutation importance;
- describe one squared-error boosting update in plain English;
- explain the learning-rate/stage-count tradeoff;
- assign training, validation, and final test their proper roles; and
- respond to a spectacular score by tracing its information lineage.

Then audit this procedure:

> A researcher fits a boosted model to predict next-month returns. The feature
> table contains today's vendor value for every historical row. They try 60
> depth, learning-rate, and stage-count combinations, choose the best result on
> 2018–2025, add a feature after inspecting that period, and report the same
> 2018–2025 score as out of sample. The new feature dominates impurity
> importance, so they call it the economic cause of the returns.

A strong answer should question whether today's values reproduce historical
vintages, count the full 60-model search plus the later feature change, recognize
that 2018–2025 has become development data, require a new later test, and
reject impurity importance as causal evidence.
