# Week 7 — Reading

## Before Lecture A — Ch 19 (Optimization)

**Read in full:**
- Chapter 19 of *Financial Machine Learning and AI* — Optimization: From Loss
  Functions to Trading Decisions

**Focus on:**
- The unifying template: objective + feasible set + optimum (§1)
- Convexity and why it changes everything (§2) — convex bowl figure
- Gradient descent and its modern descendants: SGD, momentum, Adam (§3)
- Derivative-free methods and the GA's multiple-testing trap (§4)
- The three financial pathologies (§5): error amplification, overfitting to
  the objective, treating the optimizer as truth
- The LTCM case file — the canonical "constraints were incomplete" story

**Exercises to attempt:**
- Ch 19 exercises 1, 2, 3

**Rule earned:** Rule 15 — *An optimizer maximizes what you ask, not what
you mean.*

---

## Before Lecture B — Ch 20 + Ch 21 (PCA and Clustering)

**Read in full:**
- Chapter 20 of *Financial Machine Learning and AI* — PCA and Factor Structure
- Chapter 21 of *Financial Machine Learning and AI* — Clustering, Regimes, and
  the Tradeability Caveat

**Focus on:**
- Why the high-dimensional cross-section is a problem (Ch 20 §1)
- PCA mechanics and the scree plot (Ch 20 §2)
- PC1 as a market-like common direction — same-sign loadings and comparison with an equal-weight same-panel proxy, which is not an external market test (Ch 20 §3)
- Marchenko-Pastur and low-rank covariance denoising (Ch 20 §4)
- The variance ≠ prediction warning, and PCA-as-feature leakage (Ch 20 §5)
- k-means and hierarchical clustering basics (Ch 21 §1)
- Clustering the correlation matrix recovers sectors (Ch 21 §2)
- Clustering time-period features finds regimes (Ch 21 §3)
- **The tradeability caveat** (Ch 21 §4) — the headline lesson of the
  unsupervised week

**Exercises to attempt:**
- Ch 20 exercises 1, 2, 3, 4
- Ch 21 exercises 1, 2, 4

**Rules touched:** the chapter is unsupervised but the *trading* discipline
falls under Rule 5 (stand at the decision time) and Rule 22 (regimes are
stories told after the fact).

---

## Optional supplementary reading

- Course research note, “PCA on the yield curve” — an
  applied treatment of yield changes, level/slope/curvature, regime dependence, and
  component-based interest-rate hedging.
- Michaud, R. (1989), "The Markowitz Optimization Enigma" — the foundational
  diagnosis of the error-amplification problem developed in Lecture 7A.
- López de Prado, *Machine Learning for Asset Managers*, Ch. 2 — denoising
  covariance matrices via random-matrix theory.
- Ledoit & Wolf (2004), [“Honey, I Shrunk the Sample Covariance Matrix”](https://ledoit.net/Honey_2004.pdf) — constant-correlation shrinkage. The `sklearn.covariance.LedoitWolf` example instead shrinks toward a scaled identity; these targets are different.
- Hamilton (1989), "A New Approach to the Economic Analysis of Nonstationary
  Time Series" — Markov regime switching, the parametric cousin of Wk 7B's
  clustering approach.

## How to spend the week

| Day        | Activity                                                |
|------------|---------------------------------------------------------|
| Day 1      | Read Ch 19; sketch the optimization template for OLS    |
| Day 2      | Attend Lecture A; run `week7_demos.ipynb` Demos 1–4     |
| Day 3      | Read Ch 20; trace the scree-plot logic                  |
| Day 4      | Read Ch 21; focus on the tradeability caveat            |
| Day 5      | Attend Lecture B; run `week7_demos.ipynb` Demos 5–9     |
| Day 6–7    | Pick one of: build a clustered-sector view of a basket  |
|            | of ETFs, or apply MP filtering to a sample covariance   |

## Visual learning route

Begin with a concrete choice and a worked step before the formulas. The notebook's
code guide places an explanation before every demo and
pairs it with a prediction or change. This follows the [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1):
worked examples interleaved with problems, aligned graphics and explanations,
and concrete-to-abstract connections have moderate evidence; explanatory questions
have strong evidence. That does not establish that a particular video is best.

- **Downhill steps:** Grant Sanderson's [gradient-descent lesson](https://www.3blue1brown.com/lessons/gradient-descent/), after the S2 one-step calculation. Use its surface intuition; the later neural-network detail is optional. Predict a step before watching it. Demo 2 is the runnable fallback and explicitly separates rates, units, and stopping conditions.
- **PCA:** [scikit-learn's decomposition guide](https://scikit-learn.org/stable/modules/decomposition.html#pca), after the basket/score example. Read `fit` versus `transform` and distinguish centering from scaling. Predict which fit in Demo 6 can change earlier scores.
- **Groups:** [scikit-learn's K-means explanation](https://scikit-learn.org/stable/modules/clustering.html#k-means), after the assignment-and-update picture. Explain why asking for four groups is not evidence of four persistent sectors. Demo 8 uses average-linkage clustering; Demo 9 uses K-means.

The LTCM figures and timeline are checked against the [President's Working Group report](https://www.cftc.gov/sites/default/files/tm/tmhedgefundreport.htm), Section II.A–B. The case illustrates leverage and funding constraints; it does not identify one algorithm as the cause.

## Treasury companion versus addendum

The notebook's optional cell is a retrospective 1–7-year zero-coupon example,
using the bundled Federal Reserve snapshot through April 2026. Its change-PCA
basis is projected onto levels for historical interpretation; it is not a live
backtest. A live download can differ because of source revisions.

The separate addendum also includes an
11-tenor constant-maturity sample and curve snapshots. Those charts are produced
by the yield-curve builder and the Treasury
figure-generation routine in `books/notebooks/build_ch20_notebook.py`; the compact notebook cell does not reproduce
all of them. The builder refreshes source data, so preserve the declared snapshot
before comparing its outputs with an older recording. The addendum requires its
own full rendering and conceptual review; the active six-section review does
not certify it.
