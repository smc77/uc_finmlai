# Week 5 — Reading

## Before Lecture A — Ch 11 + Ch 12 (trees and forests, paired)

**Read in full:**
- Chapter 11 of *Financial Machine Learning and AI* — Decision Trees
- Chapter 12 of *Financial Machine Learning and AI* — Random Forests

**Focus on:**
- How a tree recursively partitions feature space and represents interactions through paths (Ch 11, §1–2)
- The XOR demonstration — what a single line cannot do (Ch 11, §2)
- Tree overfitting and depth control (Ch 11, §3)
- **Feature-support and target-range limits**, and when the target or model structure should change (Ch 11, §4)
- The bagging + feature subsampling decorrelation argument (Ch 12, §1)
- The adaptive-neighborhood interpretation of a forest prediction (Ch 12, §2)
- Out-of-bag error and its time-series caveat (Ch 12, §3)
- Impurity vs. permutation importance, and *importance is not causation* (Ch 12, §4)

**Exercises to attempt:**
- Ch 11 exercises 1, 2, 3
- Ch 12 exercises 1, 2, 4

**Rule introduced:** Rule 11 — *A tree cannot continue a trend beyond its last
split. Transform the target or supply defensible structure when the decision
requires extrapolation.*

---

## Before Lecture B — Ch 13 + Ch 14 (boosting and tuning, paired)

**Read in full:**
- Chapter 13 of *Financial Machine Learning and AI* — Gradient Boosting
- Chapter 14 of *Financial Machine Learning and AI* — Tuning and Early Stopping

**Focus on:**
- The additive, stagewise mechanics: $F_m = F_{m-1} + \eta h_m$ (Ch 13, §1)
- Why each tree fits the **negative gradient** of the loss (Ch 13, §1)
- The equal-information comparison among linear, forest, and boosting models (Ch 13, §3)
- **The leakage amplifier** (Ch 13, §4) — a large jump begins the data audit
- The learning-rate / n-trees tradeoff (Ch 14, §2)
- Depth as an interaction budget in boosting (Ch 14, §3)
- Early stopping done the finance way — forward-in-time validation (Ch 14, §4)
- The full end-to-end recipe (Ch 14, §5)

**Exercises to attempt:**
- Ch 13 exercises 1, 2, 3
- Ch 14 exercises 1, 2, 4

**Rule earned:** Rule 12 — *A large performance jump begins an audit of data,
timing, selection, concentration, and fragility.*

---

## Optional supplementary reading

- Breiman (2001), "Random Forests," *Machine Learning* — the original paper.
- Friedman (2001), "Greedy Function Approximation: A Gradient Boosting Machine" — surprisingly readable.
- Chen & Guestrin (2016), "XGBoost: A Scalable Tree Boosting System."
- Strobl et al. (2007), "Bias in random forest variable importance measures."
- Prechelt (1998), "Early Stopping — But When?"

## How to spend the week

| Day        | Activity                                                |
|------------|---------------------------------------------------------|
| Day 1      | Read Ch 11; run Demos 1–3 (XOR, tree depth, and extrapolation) |
| Day 2      | Read Ch 12; run Demos 4–5 (forest averaging and importance) |
| Day 3      | Attend Lecture A                                        |
| Day 4      | Read Ch 13; run Demo 6 (boosting paths)                    |
| Day 5      | Read Ch 14; run Demo 7 (forward early stopping)            |
| Day 6      | Attend Lecture B                                        |
| Day 7      | Run Demos 8–9; apply Rule 12 to a result you have seen   |
