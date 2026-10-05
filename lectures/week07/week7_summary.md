# Week 7 Summary — From Mathematical Structure to Financial Decisions

Use this as a short review map for Week 7. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 7 follows two connected questions:

> **What problem did we ask the optimizer to solve, and does its answer remain
> useful when estimated inputs, frictions, or the search budget change?**

> **What structure did PCA or clustering find, and was that fitted structure
> stable, available at the decision time, and useful for a later task?**

Optimization turns a declared objective and constraints into an action. PCA
turns many correlated variables into a smaller set of shared directions.
Clustering turns observations into groups. These are powerful operations, but
their outputs inherit the data, scaling, geometry, search, and information
clock used to produce them.

Three principles organize the week:

1. **A solver certifies the problem that was written.** It cannot certify that
   the objective, estimated inputs, or constraints describe the financial
   decision correctly.
2. **No target does not mean no fitting.** PCA loadings, scales, centroids, and
   cluster boundaries are estimated from a sample and must respect the same
   training and later-data boundaries as supervised transformations.
3. **Description, detection, recovery, and decision value are different
   claims.** A pattern can be visible, above a noise benchmark, and still too
   unstable or too late to support the intended action.

## Core ideas

1. **An optimization problem has a variable, objective, and feasible set.** The
   variable is what may change, such as coefficients, portfolio weights, or
   trades. The objective scores candidate choices. The feasible set encodes
   budget, leverage, concentration, turnover, lot-size, and operational limits.
   The numerical algorithm is a separate choice about how to search that
   written problem.
2. **Convexity is a computational guarantee, not an economic guarantee.** For a
   convex objective over a convex feasible set, every local minimum is global.
   Strict convexity can also make the optimum unique. Neither statement says
   that expected returns are accurate, transaction costs are complete, or the
   resulting position is sensible.
3. **Uniqueness and stability are different.** A problem may have one optimum
   and still be nearly flat in one direction. Small input changes can then move
   that unique answer a long distance. Conversely, several mathematically
   equivalent optima may have very different turnover or concentration.
4. **Gradient descent follows local slope.** The negative gradient supplies the
   direction and the learning rate controls step size. Momentum carries part of
   the recent direction forward; Adam changes step scale by coordinate. These
   methods alter the path used to search an objective, not the objective itself.
5. **Conditioning controls how difficult that path is.** A large condition
   number means the surface is much steeper in some directions than others.
   One safe step size then makes slow progress along the flatter directions.
   Scaling can improve the numerical path, but the scaler must be fitted inside
   the training boundary.
6. **Optimization error and generalization error are different.** Optimization
   error means the method did not adequately minimize the stated training
   objective. Generalization error means it fit that objective but performs
   poorly on later data. Forward-validation early stopping uses later-than-fit
   development data to choose a checkpoint; it does not validate the economic
   specification.
7. **Use the structure that remains.** Smooth convex problems, nonsmooth
   problems, quadratic programs, integer decisions, and costly black boxes do
   not require the same method. A missing ordinary derivative does not force
   every problem into a genetic algorithm or other general heuristic.
8. **A search budget is part of model selection.** Grid, random, Bayesian, and
   evolutionary searches may inspect many candidates on historical validation
   data. More evaluations consume computation and give the procedure more
   chances to adapt to validation noise. Record the ranges, evaluations, random
   seeds, stopping rule, and untouched later period.
9. **Estimated inputs can be amplified into large actions.** Dividing an
   estimated return by a small estimated variance can create a large position.
   In a multivariate portfolio, the inverse covariance matrix performs the same
   operation along covariance directions. A modest estimation error in a
   direction estimated to have very little risk can therefore cause a large
   weight change.
10. **Numerical convergence does not imply decision stability.** A solver may
    converge at every perturbation while the recommended weights and turnover
    change materially. Stress estimated means, covariance, frictions, and
    constraints; report the action movement as well as the modeled objective
    value.
11. **Regularization and constraints change the problem deliberately.** Ridge
    stabilization, shrinkage, turnover penalties, weight bounds, and robust
    objectives can reduce sensitivity. They are not neutral repairs. Report the
    modified objective and compare it with serious baselines such as equal
    weight.
12. **PCA finds sample directions of shared variance.** A component direction
    is an eigenvector, its variance is an eigenvalue, and its asset weights are
    loadings. Component scores locate observations along that direction.
    Orthogonal sample scores are uncorrelated in the fitted sample; they are not
    necessarily independent or predictive.
13. **A scree plot appears even in pure noise.** Finite samples make some noise
    eigenvalues larger than others. The Marchenko--Pastur benchmark gives the
    eigenvalue range expected under a stated standardized independent-noise
    model. A component above that range has separated from that null; this does
    not yet establish accurate loadings, later stability, or forecasting value.
14. **Detection can precede accurate recovery.** A leading eigenvalue may clear
    the noise benchmark before its estimated direction aligns closely with the
    true direction. A stable multi-component subspace can also matter even when
    individual axes rotate within it.
15. **Variance explained is not return predicted.** PCA orders directions by
    contemporaneous sample variance. A high-variance component may be valuable
    for risk monitoring without predicting later returns, while a low-variance
    direction can contain target information.
16. **Fit PCA inside the time split.** Estimate means, scales, covariance, and
    loadings on earlier data; freeze them; transform later observations with the
    stored objects; and refit only on declared dates. A full-sample refit can
    rotate the coordinate system and revise earlier scores.
17. **Clustering depends on representation, distance, and algorithm.** K-means
    minimizes distance to selected centroids and tends to favor roughly round
    groups under Euclidean distance. Hierarchical clustering builds a nested
    merge tree whose result depends on the linkage rule. Either method will
    return groups even when no stable group structure exists.
18. **Cluster numbers and names are not discovered facts.** Numeric labels are
    arbitrary across fits. Match groups by membership before comparing them.
    Names such as “technology” or “stress” are interpretations that require
    composition checks and later evidence.
19. **Historical conditions are not automatically decision-time states.** A
    full-sample regime label can use later observations to scale features,
    locate centroids, and name an earlier date. That can describe a completed
    episode, but a policy needs a filtered state computed from information
    available before the action.
20. **Every representation needs a later job and a falsification test.** Save
    the fitted scaler, loadings, centroids or hierarchy, cutoff date, and refit
    rule. Then test stability and the intended use. Abandon or revise the
    representation if its subspace rotates too far, its groups dissolve, its
    detector arrives too late, or its decision loses to a simpler rule.

## From problem to decision

| Stage | Question | Evidence to preserve |
|---|---|---|
| Specify | What is chosen, rewarded, and permitted? | Variable, estimated inputs, objective, constraints, and omitted frictions |
| Solve | Which method matches the geometry? | Solver, initialization, scaling, trace, stopping rule, random seeds, and evaluation budget |
| Stress | Does a plausible input change move the action? | Sensitivity map, weights or trades, binding constraints, turnover, and modeled-objective change |
| Compare | Is the optimized action useful? | Feasible baseline, implementation costs, and performance on later untouched data |

The solver trace answers whether the numerical method handled the stated
problem. The sensitivity and later-decision evidence answer whether that
problem deserved authority.

## Four claims about an unsupervised representation

| Claim | A suitable check |
|---|---|
| The sample contains more structure than a declared noise world. | Known-truth simulation, permutation or noise control, or an explicit spectral benchmark |
| The fitted structure was recovered accurately. | Alignment with planted truth or another independently measured reference |
| The representation persists. | Frozen later-data scores, loading-subspace overlap, matched cluster membership, or composition stability |
| The representation helps a decision. | A prespecified later risk, forecast, monitoring, or policy comparison against a feasible baseline |

Passing one row does not pass the others. A PCA eigenvalue can exceed a noise
benchmark while its loading direction remains inaccurate. A cluster partition
can be stable but irrelevant to the downstream decision.

## Terms and vocabulary

### Optimization

| Term | Plain-English meaning |
|---|---|
| **Decision variable** | The quantity the optimizer may choose, such as coefficients, weights, or trades. |
| **Objective** | The numerical rule used to score candidate choices. |
| **Feasible set** | All choices allowed by the stated constraints. |
| **Convex problem** | A problem whose geometry makes every local minimum global under the relevant convexity conditions. |
| **Strict convexity** | Curvature strong enough to permit at most one minimizer. |
| **Gradient** | Vector of local slopes of the objective. |
| **Learning rate** | Step-size multiplier in a first-order update. |
| **Condition number** | Ratio of largest to smallest curvature; a large value indicates an elongated, difficult numerical landscape. |
| **Optimization error** | Remaining failure to minimize the stated training objective. |
| **Generalization error** | Failure of the fitted result to perform well on later data. |
| **Optimality gap** | A solver-specific bound on how far a feasible discrete solution may be from the best possible value. |
| **Derivative-free search** | Search based on evaluated objective values rather than ordinary gradients. |
| **Search budget** | Number of candidate evaluations, generations, restarts, or other allowed search effort. |
| **Error amplification** | A modest estimation error becoming a much larger change in the recommended action. |
| **Decision stability** | Degree to which plausible input changes leave the recommended action close to the original one. |
| **Objective regret** | Modeled loss from retaining a reference action rather than adopting the newly optimized action. |

### PCA and clustering

| Term | Plain-English meaning |
|---|---|
| **Principal component analysis (PCA)** | A fitted rotation that orders sample directions by explained variance. |
| **Eigenvector / component direction** | A weighted direction through the feature space. |
| **Eigenvalue** | Sample variance along its component direction. |
| **Loading** | Weight of an original variable in a component direction. |
| **Component score** | Coordinate of one observation along a fitted component. |
| **Covariance spectrum** | Ordered collection of covariance eigenvalues. |
| **Covariance PCA vs. correlation PCA** | Whether the rotation is fitted to raw covariances or to standardized variables. Covariance PCA lets the highest-variance series dominate the first component, so it suits variables already on one comparable scale; correlation PCA standardizes first, so each variable contributes on equal footing. The choice is part of the question, not a cosmetic preprocessing step. |
| **Orthogonal** | Perpendicular in the fitted geometry; component scores are uncorrelated in sample, not necessarily independent. |
| **Subspace** | Region spanned by several component directions, which may remain stable while individual axes rotate. |
| **Scree plot** | Plot of ordered component eigenvalues or explained-variance shares. |
| **Marchenko--Pastur benchmark** | Noise reference for the sample-eigenvalue range under a stated high-dimensional independent-noise model. |
| **K-means** | Method that assigns observations to centroids to minimize within-group squared distance. |
| **Centroid** | Fitted center of a cluster. |
| **Hierarchical clustering** | Method that successively merges observations or groups into a tree. |
| **Linkage rule** | Rule for measuring distance between groups during hierarchical merging. |
| **Purity** | Known-truth score asking whether each recovered group contains observations from the same planted class. |
| **Retrospective label** | Historical assignment produced with information from the completed sample. |
| **Filtered state** | State estimate using only observations available through the stated decision time. |
| **Refit schedule** | Declared dates on which a fitted representation may be re-estimated for future use. |

## Research protocol after Week 7

Keep the timing, validation, search, implementation, and research-record rules
from earlier weeks, then add:

- write the decision variable, objective, estimated inputs, and feasible set;
- identify the geometry before choosing the numerical method;
- preserve the solver trace, stopping rule, initialization, seeds, and complete
  search budget;
- distinguish numerical convergence from stability of the resulting action;
- stress means, covariance, constraints, and omitted frictions before trusting
  an optimized portfolio;
- compare with a feasible simple allocation and carry the decision through
  turnover, cost, and later outcomes;
- fit every scaler, PCA rotation, centroid, and cluster boundary inside the
  training period;
- save the fitted representation, cutoff date, and refit schedule;
- separate noise detection, structural recovery, later stability, and decision
  usefulness; and
- state what later result would cause the representation or policy to be
  abandoned.

For the project, move from the Week 6 idea to one real, timestamped data row.
Confirm that every input existed at the decision time. If PCA, factors, or
regimes become features, save the version that could actually have been fitted
then rather than rebuilding the historical representation with newer data.

## Common mistakes

Be able to explain why each statement is incomplete:

- “The solver converged, so this is the correct portfolio.”
- “The problem is convex, so its inputs and constraints must be realistic.”
- “The optimum is unique, so it must be stable.”
- “The genetic algorithm found a better validation result after 5,000 trials,
  so the additional search discovered signal.”
- “PC1 explains the most variance, so it should predict the most return.”
- “The largest eigenvalue is above the noise band, so the loadings are accurate.”
- “K-means returned four clusters, so the data contain four persistent groups.”
- “The full-sample regime labels identify the crisis early, so the strategy
  could have traded on them.”

## Quiz check

You should be able to:

- identify the variable, objective, feasible set, and numerical method in a
  stated problem;
- distinguish convexity, strict convexity, uniqueness, and stability;
- explain a gradient-descent step and how conditioning changes convergence;
- distinguish optimization error from generalization error;
- explain why the evaluation budget belongs in the search record;
- trace how a small estimated variance can amplify an input error into a large
  portfolio position;
- distinguish solver convergence from decision stability;
- interpret PCA eigenvectors, eigenvalues, loadings, scores, and a scree plot;
- say when correlation PCA is more appropriate than covariance PCA, and why
  rescaling one variable can change the first component;
- explain why a component's sign is arbitrary, so naming a component
  "market-like" is an empirical and stability-dependent claim rather than a
  property of the algebra;
- explain what the Marchenko--Pastur benchmark does and does not establish;
- distinguish variance description from prediction;
- compare K-means with hierarchical clustering;
- explain why cluster numbers and economic names are not intrinsic;
- distinguish a retrospective condition from a filtered decision-time state;
  and
- specify how to fit, freeze, test, and later use an unsupervised
  representation.

Then audit this procedure:

> A researcher standardizes all returns using the complete 2010–2026 sample,
> fits PCA and four market clusters on that same sample, and calls the largest
> component a return factor because it explains the most variance. They choose
> four clusters after comparing many values of K, label the first day of a 2020
> selloff “crisis,” and let a mean-variance optimizer take a large position in a
> direction with very small estimated variance. The solver converges, and the
> researcher reports only the objective value.

A strong answer should identify full-sample scaling and fitting as future
contamination for earlier decisions, reject variance explained as evidence of
return prediction, include the search over K, distinguish the retrospective
crisis description from a usable state, stress the small-variance direction,
compare the resulting action with a feasible baseline, and require turnover,
cost, stability, and later-decision evidence in addition to convergence.
