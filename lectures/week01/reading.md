# Week 1 — Optional Background Reading

The lectures and their task notebooks are self-contained. Nothing below is
required for the homework or quizzes; use it for more depth, derivations, and
additional worked examples.

## Lecture A background — Ch 1 + Ch 2

**Aligned chapters:**
- `../../books/ch01/chapter.md` — The Financial Machine Learning Mindset
- `../../books/ch02/chapter.md` — The Research Workflow & Tools

**Useful sections:**
- How machine learning's emphasis on generalization and representation
  overlaps with statistical inference, uncertainty, and study design
- What the major model families add, and the problems each can represent
- The four-backtest case study: judge the development evidence before seeing
  the later period
- The insurance example: flexible interactions in a higher-signal setting
- The research path: *data → features → models → evaluation → decisions → risk*
- The manifest, versioned environment, and test-set protocol that make a
  result reproducible

**Optional exercises:**
- Ch 1 exercises 1, 3, 5
- Ch 2 exercises 2, 4

**Rule earned:** Rule 1 — *Be most skeptical when the result looks best.*

---

## Lecture B background — Ch 3 + Ch 4 (returns, stationarity, stylized facts)

**Aligned chapters:**
- `../../books/ch03/chapter.md` — Returns, Prices, and Stationarity
- `../../books/ch04/chapter.md` — Stylized Facts of Returns *(the descriptive
  facts — fat tails, volatility clustering, ACF; GARCH/VaR modeling is taken up
  with risk in Week 6)*

**Useful sections:**
- Why returns rather than prices (Ch 3 §1)
- Stationarity, a compact ADF diagnostic, and persistence half-life (Ch 3)
- Random walk vs. martingale; the forms of EMH (Ch 3 §4–5)
- ACF memory fingerprints; AR, MA, ARMA/ARIMA, and justified seasonality;
  univariate versus cross-sectional prediction (Ch 4)
- Two kinds of predictability; ACF of returns vs. squared returns; heavy tails
  (Ch 4 — descriptive facts only)

**Optional exercises:**
- Ch 3 exercises 1, 2, 4, 5

**Further reading (stylized facts):**
- Cont (2001), “Empirical Properties of Asset Returns: Stylized Facts and
  Statistical Issues.”

**Rule earned:** Rule 2 — *Model returns, not prices.*

---

## Optional supplementary reading

- McLean & Pontiff (2016), "Does academic research destroy stock return
  predictability?", J. of Finance — for the anomaly-decay backdrop to
  Rule 1.
- Granger & Newbold (1974), "Spurious regressions in econometrics",
  J. of Econometrics — the canonical demonstration of why
  non-stationary regression goes wrong.
- Hutchinson, Lo & Poggio (1994), "A Nonparametric Approach to Pricing and
  Hedging Derivative Securities via Learning Networks", J. of Finance — the
  learning-networks study that opens Lecture A. Full text:
  <https://www.nber.org/papers/w4718>.

```bibtex
@article{hutchinson1994nonparametric,
  author  = {Hutchinson, James M. and Lo, Andrew W. and Poggio, Tomaso},
  title   = {A Nonparametric Approach to Pricing and Hedging Derivative
             Securities via Learning Networks},
  journal = {The Journal of Finance},
  volume  = {49},
  number  = {3},
  pages   = {851--889},
  year    = {1994},
  month   = jul,
  note    = {NBER Working Paper 4718, \url{https://doi.org/10.3386/w4718}}
}
```

## Suggested route

Start with the lecture slides and mini-projects. Return to the aligned chapter
only where you want a fuller derivation, another example, or further reading.
