# Week 8 — Reading

The local research PDFs used to generate the two optional Week 8 podcasts are
catalogued in [`papers/README.md`](papers/README.md). This packet is separate
from the student reading assignment below; its role is to give the podcast
generator the primary sources named in the episode briefs.

## Before Lecture A — Ch 22 + Ch 23 (Sizing and MV Fragility)

**Read in full:**
- Chapter 22 of *Financial Machine Learning and AI* — From Scores to Positions
- Chapter 23 of *Financial Machine Learning and AI* — Mean-Variance Fragility
  and Robust Construction

**Focus on:**
- The "prediction is not a portfolio" framing (Ch 22 §1)
- The three sizing schemes and what they bet on (Ch 22 §2)
- Volatility targeting and the past-only $\hat\sigma_t$ rule (Ch 22 §3)
- The turnover inversion: raw vs. smoothed signal (Ch 22 §4)
- $w \propto \Sigma^{-1}\mu$ and why $\Sigma^{-1}$ amplifies low-variance
  directions (Ch 23 §1)
- The error-maximization figure: 1/4 standard-error perturbations flip 8/12
  signs (Ch 23 §2)
- Lower-estimation and stabilized allocations under a common mandate (Ch 23 §3)
- Ledoit-Wolf shrinkage and the Wk 7B factor-structure connection (Ch 23 §4)

**Exercises to attempt:**
- Ch 22 exercises 1, 2, 3, 4
- Ch 23 exercises 1, 2, 3

**Rules earned:** Rule 16 — *A better forecast is not automatically a better
portfolio.* Rule 17 — *Make the optimizer compete with lower-estimation
baselines under the same mandate.*

---

## Before Lecture B — Ch 24 + Ch 25 (NN Foundations + DL in Finance)

**Read in full:**
- Chapter 24 of *Financial Machine Learning and AI* — Neural-Network Foundations
- Chapter 25 of *Financial Machine Learning and AI* — Deep Learning in Finance

**Focus on:**
- The activation as the whole point (Ch 24 §1) — the units-summed figure
- Loss → backpropagation → gradient descent (Ch 24 §2). Note: Ch 19 §3
  covered SGD/momentum/Adam; here we just apply that to a high-capacity,
  non-convex landscape.
- Universal approximation and its **three modesty caveats** (Ch 24 §3)
- The capacity-overfit figure (Ch 24 §4) — train R² 0.99, test R² 0.57
- Why neural networks are especially useful for function approximation,
  rich sequences, and unstructured data, while tabular return prediction
  still requires an empirical comparison (Ch 24 §5; Ch 25 §1)
- The Black-Scholes neural-pricer demo as a known-truth approximation audit (Ch 25 §2)
- Sequences (LSTM, 1-D CNN) — promise and the leakage-amplifier warning (Ch 25 §3)
- The MLP-vs-boosting verdict on tabular returns (Ch 25 §4)
- Early stopping on a *forward* validation block (Ch 25 §5)

**Exercises to attempt:**
- Ch 24 exercises 1, 2, 4
- Ch 25 exercises 1, 2, 3

**Rule earned:** Rule 18 — *Reach for deep learning where it pays off, not
by default.*

---

## Optional supplementary reading

- DeMiguel, Garlappi & Uppal (2009), "Optimal Versus Naive Diversification"
  — the evidence behind "1/N is hard to beat" ([article](https://doi.org/10.1093/rfs/hhm075)).
- Michaud (1989), "The Markowitz Optimization Enigma: Is 'Optimized'
  Optimal?" — the classic estimation-error-maximization critique
  ([article](https://doi.org/10.2469/faj.v45.n1.31)).
- Jobson & Korkie (1980), "Estimation for Markowitz Efficient Portfolios" —
  the finite-sample statistical foundation for treating optimized weights as
  estimated objects ([article](https://doi.org/10.1080/01621459.1980.10477507)).
- Ledoit & Wolf (2004), "Honey, I Shrunk the Sample Covariance Matrix" —
  a portfolio-focused case for stabilizing covariance estimates
  ([paper](https://ledoit.net/honey.pdf)).
- Chopra & Ziemba (1993) — errors in means hurt ~10× more than errors in
  variances; the quantitative backbone of Wk 8A.
- Goodfellow, Bengio & Courville, *Deep Learning* — Ch 6 (feedforward),
  Ch 7 (regularization), Ch 8 (optimization).
- Grinsztajn, Oyallon & Varoquaux, "Why do tree-based models still
  outperform deep learning on tabular data?" — the empirical case behind
  Wk 8B §4.

## How to spend the week

| Day        | Activity                                                |
|------------|---------------------------------------------------------|
| Day 1      | Read Ch 22; trace guided Demos 1–2, then complete mini-project Demo 3 |
| Day 2      | Read Ch 23; attend Lecture A; run `week8_demos.ipynb` Demos 4–6 |
| Day 3      | Read Ch 24; run Demo 7 and trace guided Demos 8–9       |
| Day 4      | Read Ch 25; attend Lecture B; run capacity Demo 10      |
| Day 5      | Run Demos 11–13; use instructor-led Demo 14 as the portfolio synthesis |
| Day 6–7    | Re-run the MLP-vs-boosting demo on your own features;   |
|            | report which wins out of sample, and by how little      |
