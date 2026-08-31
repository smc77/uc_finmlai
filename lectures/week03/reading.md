# Week 3 — Optional background

The lectures, slides, driver, and HW1 instructions are self-contained. These
readings offer deeper derivations, history, and additional exercises; no
assessment depends on completing them.

## Aligned book chapters

- Chapter 7 of *Financial Machine Learning and AI* — Linear Regression for
  Returns: Baselines and Rank IC
- Chapter 9 of *Financial Machine Learning and AI* — Regularization: Ridge,
  Lasso, and Elastic Net

### Chapter 7 focus

- OLS as the simplest serious conditional-mean model;
- feasible baselines and predictive R-squared;
- ordering versus meaningful forecast scale; time-series Spearman and
  cross-sectional rank IC;
- weak-signal sampling variation;
- added columns as capacity rather than information;
- the score-to-position ledger and the first long--short.

### Chapter 9 focus

- ill-conditioning and the bias--variance trade in prospective error;
- ridge, lasso, and elastic-net penalties and their coefficient paths;
- standardization and the meaning of the penalty;
- sparsity as a sample-dependent hypothesis, not discovery.

**Optional exercises:** Ch 7 exercises 1–5 and Ch 9 exercises 1–4.

## External background (optional)

The selection-and-shrinkage material also appears, at a gentler level, in *An
Introduction to Statistical Learning* (James, Witten, Hastie, Tibshirani & Taylor)
— Ch 3 (linear regression) and Ch 6 (subset selection, ridge, lasso). A more
mathematical treatment appears in Ch 3 of *The Elements of Statistical Learning*
(Hastie, Tibshirani & Friedman). Both books are freely available from their
authors. The lecture and the book chapters above are self-contained; these are
only for readers who want another treatment.

## Further reading

- Tibshirani (1996), “Regression Shrinkage and Selection via the Lasso.”
- Hoerl and Kennard (1970), “Ridge Regression: Biased Estimation for
  Nonorthogonal Problems.”
- Koenker and Bassett (1978), “Regression Quantiles” (the pinball loss).
- Huber (1964), “Robust Estimation of a Location Parameter.”
- Campbell and Thompson (2008), “Predicting Excess Stock Returns Out of
  Sample: Can Anything Beat the Historical Average?”
- Grinold (1989), “The Fundamental Law of Active Management.”
- Gu, Kelly, and Xiu (2020), “Empirical Asset Pricing via Machine Learning.”

## Suggested sequence

| AFTER | OPTIONAL FOLLOW-UP |
|:--|:--|
| Segment 1 (the line and least squares) | Ch 7 on OLS and baselines (ISL Ch 3; ESL Ch 3) |
| Segment 2 (select or shrink) | Ch 9 on selection, ridge, lasso, elastic net (ISL Ch 6; ESL Ch 3) |
| Segment 3 (robust and quantile) | Huber (1964); Koenker and Bassett (1978) |
| Segment 4 (baselines and predictive R-squared) | Ch 7; Campbell and Thompson (2008) |
| Segment 5 (order, calibration, rank correlation) | Ch 7 on rank IC and metrics |
| Segment 6 (the first trading ledger) | Ch 7 on the score-to-position ledger and costs |
