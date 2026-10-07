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
- PC1 as the market factor — same-sign loadings, 0.999 correlation with the
  equal-weighted market (Ch 20 §3)
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

- Course research note, [“PCA on the yield curve”](../yield_curve_pca_note.pdf) — an
  applied treatment of yield changes, level/slope/curvature, regime dependence, and
  component-based interest-rate hedging.
- Michaud, R. (1989), "The Markowitz Optimization Enigma" — the foundational
  diagnosis of the error-amplification problem developed in Lecture 7A.
- López de Prado, *Advances in Financial Machine Learning*, Ch. 2 — denoising
  covariance matrices via random-matrix theory.
- Ledoit & Wolf, "Honey, I Shrunk the Sample Covariance Matrix" — the
  practical shrinkage estimator.
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
