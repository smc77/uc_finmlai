# HW4 — Unsupervised Mini-Lab: Factor Structure & Regimes

**FIN 7057 · Due after Week 8 · 100 points · *short assignment* (aim for a 3–4 page notebook)**

A deliberately light, interpretive assignment: use PCA to uncover the **factor structure** of a
panel of returns, and (optionally) cluster time periods into **regimes**. The goal is insight and
correct interpretation, not a big modeling effort.

## Setup
Get daily returns for a **panel of ≥ 10 assets** — e.g., sector ETFs (XLK, XLF, XLE, …), a basket
of large-cap stocks, or country ETFs. Document the source and date range. (A loader with a synthetic
fallback is provided.)

## Tasks

### Part A — The return panel (15 pts)
1. Load prices, compute daily returns, align dates, handle missing values. (10)
2. Show the correlation matrix (heatmap) and comment on the overall co-movement. (5)

### Part B — PCA & the market factor (35 pts)
1. Run PCA on the returns; show a **scree plot** and the explained-variance ratios. (10)
2. How much variance does **PC1** explain? Show its loadings and describe their sign and
   concentration without assuming the answer in advance. (10)
3. Assess whether PC1 deserves a **market-like interpretation**: compare its score with the
   equal-weight panel return and use the loading structure and stability as evidence. A weak or
   mixed result is valid. (15)

### Part C — Deeper structure OR regimes (30 pts) — pick one
**Option 1 (factors):** Interpret **PC2/PC3**. Do they separate sectors / styles / regions? Show
loadings grouped by your asset categories and discuss.
**Option 2 (regimes):** Cluster *time periods* (k-means on rolling volatility and trend of a market
proxy) into 2–3 regimes. Report each regime's frequency, volatility, and mean return, and plot the
cumulative market return colored by regime.

### Part D — Interpretation & caveats (20 pts)
Explain each of the following accurately and completely; there is no graded word-count
requirement:
- What structure did you find, and does it make economic sense?
- **Stability:** would PC1 / your clusters look the same on a different sub-period? (Check if you can.)
- **The leakage caveat for *using* this:** why is a regime label computed over the full sample *not*
  tradeable, and what would you need to do to act on regimes in real time? Why must PCA be fit on
  **train only** when it feeds a predictive model?

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Cluster rolling market features (e.g., KMeans) into regimes and interpret them.
- Recompute PCA on rolling windows and report how stable PC1's loadings are.
- Add a second asset panel (a different sector set) and compare the factor structure.

## Deliverables
- Run the **Self-check** cell at the end; every item must print **PASS**. It verifies that the
  requested panel and PCA outputs exist, not that PC1 must cross a predetermined economic threshold.
Completed notebook (start from `hw4_starter.ipynb`), reproducibility (seed, dates, source), and an
AI-use disclosure cell.

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Panel + correlation | 15 |
| B — PCA + evidence for or against a market interpretation | 35 |
| C — PC2/PC3 interpretation **or** regime clustering | 30 |
| D — Interpretation, stability, leakage caveat | 20 |
| Reproducibility & hygiene | *up to −10 penalty if missing* |

## Tips
- PCA finds *variance*, not *prediction* — a big component need not be a profitable signal.
- Standardize returns before PCA if scales differ; fit any scaler/PCA on training data only if you
  later use the output to predict.
