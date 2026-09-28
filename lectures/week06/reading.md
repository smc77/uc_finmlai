# Week 6 — Reading

## Before Lecture A — Ch 15 + Ch 16 (paired): what counts as a result

**Read in full:**
- Chapter 15 of *Financial Machine Learning and AI* — Matching Metrics to
  Decisions
- Chapter 16 of *Financial Machine Learning and AI* — Costs, Turnover, Multiple
  Testing, and Deflated Sharpe

**Focus on:**
- The metric-by-job table (Ch 15, §1) — no universal "accuracy"
- The rank IC, computed per period (Ch 15, §2)
- Quantile spread *monotonicity* as a diagnostic (Ch 15, §3)
- IC-IR — consistency over size (Ch 15, §4)
- The fundamental law and its caveats (Ch 15, §5). Grinold (1989) gave $\text{IR} \approx \text{IC}\sqrt{\text{breadth}}$; the transfer-coefficient form used in lecture, $\text{IR} \approx \text{IC}\times\text{TC}\times\sqrt{B_{\text{eff}}}$, adds Clarke, de Silva \& Thorley (2002) for constrained portfolios
- The tail-risk section (Ch 15) — VaR as a loss threshold and expected shortfall as average severity beyond it
- The February 2018 volatility-product feedback loop as a case in which a product rule and market response interacted
- Net return subtracts a declared cost function applied to the trade vector; constant cost times turnover is one linear special case (Ch 16, §1–2)
- The multiple-testing mirage and best-of-N order statistics (Ch 16, §3)
- The deflated Sharpe ratio and the t > 3 argument (Ch 16, §4)
- The research ledger (Ch 16, §8) — the information needed to interpret and reproduce an evaluation

**Exercises to attempt:**
- Ch 15 exercises 1, 2, 4
- Ch 16 exercises 1, 2, 4

**Rules earned:** Rule 13 — *Breadth turns a tiny edge into a strategy.* Rule 14 — *Say how many you tried, and report net of costs.*

---

## Before Lecture B — Ch 18 (double descent and the virtue of complexity)

**Read in full:**
- Chapter 18 of *Financial Machine Learning and AI* — Double Descent and the
  Virtue of Complexity

**Guided frontier reading (not an additional recorded section):**
- Chapter 17 of *Financial Machine Learning and AI* — State-Space Models, HMMs,
  and Regime Switching
- Revisit Chapter 4's conditional-volatility discussion: the frontier deck uses
  GARCH as the observable-variance bridge into latent state and regime models
- The state-space template — transition + observation equations (§1–2)
- Kalman filter for time-varying beta; the process-variance hyperparameter (§3)
- HMM mechanics — Baum-Welch, forward-backward, Viterbi (§4)
- **Filtered vs. smoothed posteriors** — the leakage specific to sequential models (§4)
- The regime-overfitting trap, three pathologies (§6)
- **§7 — when is a regime recoverable?** The (Δ, p) heatmap is the lecture's centerpiece
- Connection to clustering (§8)

**Focus on (Ch 18):**
- Double descent and benign overfitting; the Kelly–Malamud–Zhou virtue-of-complexity claim (§1)
- The persistent-predictor control: predictors add no population information, yet similarity can reconstruct a return-history policy (§2)
- **Three notions of complexity** — nominal feature count, fitted degrees of freedom, and dependence-adjusted information (§3)
- The **training-window sweep** as a stress test that does not identify a mechanism by itself (§4)
- The stable nonlinear planted-signal experiment as a positive control (§4)
- The evidence bundle: mechanism controls, nested selection, costs, and an untouched final evaluation (§5)

**Exercises to attempt:**
- Ch 17 exercises 1, 2, 3, 5
- Ch 18 exercises 1, 2

**Rules used:** Rule 22 — *A regime label is an estimate, not an observed
state.* Rule 6 governs the complexity comparison: added representation must
show what it contributes under the same information and evaluation.

---

## Optional supplementary reading

- Kalman (1960), "A New Approach to Linear Filtering and Prediction Problems," *J. Basic Engineering* — the original paper.
- Rabiner (1989), "A Tutorial on Hidden Markov Models," *Proceedings of the IEEE* — the standard pedagogical reference for HMMs.
- Hamilton (1989), "A New Approach to the Economic Analysis of Nonstationary Time Series and the Business Cycle," *Econometrica* — Markov-switching regression.
- López de Prado, *Advances in Financial Machine Learning*, Ch. 11–17 — backtesting pitfalls, deflated Sharpe, structural breaks.
- Harvey, Liu & Zhu (2016), "…and the Cross-Section of Expected Returns" — the t > 3 argument and the factor zoo.

## How to spend the week

| Day        | Activity                                                |
|------------|---------------------------------------------------------|
| Day 1      | Read Ch 15 and the Ch 4 tail-risk case; run `week6_demos.ipynb` Demos 1–3 (IC, decile, breadth) |
| Day 2      | Read Ch 16; run `week6_demos.ipynb` Demos 4–5 (costs, multiple test) |
| Day 3      | Attend Lecture A; apply the 6-question checklist        |
| Day 4      | Read Ch 18 and attend Lecture B                         |
| Day 5      | Read Ch 17 as frontier exposure                         |
| Day 6      | Run `week6_demos.ipynb` Demos 6–10 (complexity sweep, Kalman beta, and HMM audit) |
| Day 7      | Follow the [Week 6 project checkpoint](https://github.com/smc77/uc_finmlai/blob/main/project/WEEK6_CHECKPOINT.md); review the [two final-report pathways](https://github.com/smc77/uc_finmlai/blob/main/project/REPORT_PATHWAYS.md); submit Quiz 5, the project paragraph, and an initialized `RESEARCH_RECORD.md` |
