# Week 9 — Reading

The local podcast research packet and source-status notes are indexed in
[`papers/README.md`](papers/README.md).

## Before Lecture A — Ch 26 (Options Pricing and Volatility Modeling with ML)

**Read in full:**
- Chapter 26 of *Financial Machine Learning and AI* — Options Pricing and
  Volatility Modeling with ML

**Focus on:**
- What the implied-vol surface tells us (§1) — smile, skew, term structure
- The pricing model as a function $\mathcal{M}(\text{spec}, \theta) \to P$ (§2)
- The neural-pricer recipe (§3) — emphasize the **off-grid** validation step
- Calibration as the inverse problem; how speedup makes intraday recal feasible (§4)
- The three arbitrage-free constraints and why naive fits violate them (§5)
- LSM for Americans with a neural basis (§6)
- The "when to use a neural pricer" decision rule (§8)
- The smile-that-broke-LTCM case file
- **Rule 26** — keep model, numerical, surrogate, and calibration errors on
  separate ledgers

**Exercises to attempt:**
- Ch 26 exercises 1, 2, 3, 4

**Rule earned:** Rule 26 — *Keep model, numerical, surrogate, and calibration
error on separate ledgers.*

---

## Before Lecture B — Ch 27 (Deep Hedging)

**Read in full:**
- Chapter 27 of *Financial Machine Learning and AI* — Deep Hedging: Hedging as a
  Decision

**Focus on:**
- The five Black–Scholes assumptions and what each violation costs (§1–3)
- The Buehler–Gonon–Teichmann–Wood (2019) framing: hedging as policy
  learning, not as pricing (§4)
- **§5's cost-and-frequency sweep** — this compares a validation-selected
  constant band with delta; it does not compare the neural policy
- The equal-objective result: the band and neural policy are not meaningfully
  separated on entropic risk while differing in tail loss and turnover
- Neural-SDE calibration and the off-grid-error trap (§6)
- The Equity desks/March 2020 case file (§7)

**Exercises to attempt:**
- Ch 27 exercises 1, 2, 3, 4

**Rule earned:** Rule 24 — *Hedging is a decision, not a price.*

---

## Optional supplementary reading

- Hutchinson, Lo & Poggio (1994) — the original neural-pricer paper.
- Horvath, Muguruza & Tomas (2021), "Deep Learning Volatility" — the
  reference for §3–§4 of Ch 26.
- McGhee (2018) — early production account of neural pricers at a bank.
- Longstaff & Schwartz (2001) — the LSM paper.
- Bayer, Friz & Gatheral (2016) — the foundational rough-vol paper that
  drove the calibration-by-NN literature.
- Buehler, Gonon, Teichmann & Wood (2019), "Deep Hedging,"
  *Quantitative Finance* — the foundational paper.
- Whalley & Wilmott (1997), *Math. Finance* — the bandwidth analytic
  baseline; the right thing to compare deep hedgers against.

## How to spend the week

| Day        | Activity                                                |
|------------|---------------------------------------------------------|
| Day 1      | Read Ch 26 §1–4 (surface, pricing, NN pricer)           |
| Day 2      | Read Ch 26 §5–8; attend Lecture A                       |
| Day 3      | Run `week9_demos.ipynb` Demos 1–2 (neural BS pricer, off-grid) |
| Day 4      | Read Ch 27 §1–4; sketch the five BS assumptions         |
| Day 5      | Read Ch 27 §5–7; attend Lecture B; run `week9_demos.ipynb` Demos 3–5 |
| Day 6–7    | Implement off-grid validation: train on one box, test   |
|            | on the boundary; report worst-case error in bps. Then   |
|            | write up: "one place where the analytic hedge is fine   |
|            | and the network is overengineering"                     |
