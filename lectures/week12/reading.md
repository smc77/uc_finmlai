# Week 12 — Reading

The local podcast research packet is indexed in
[`papers/README.md`](papers/README.md).

## Before Lecture A — Ch 32 (Microstructure and Execution)

**Read in full:**
- Chapter 32 of *Financial Machine Learning and AI* — Market Microstructure and
  Optimal Execution

**Required companion selections:**

- Almgren and Chriss (2000), [“Optimal Execution of Portfolio
  Transactions”](papers/Almgren_Chriss_2000_Optimal_Execution.pdf) — model,
  objective, efficient frontier, and conclusion
- Bouchaud, Farmer, and Lillo (2009), [“How Markets Slowly Digest Changes in
  Supply and Demand”](papers/Bouchaud_Farmer_Lillo_2009_Market_Impact.pdf) —
  market-impact mechanism, square-root evidence, and limitations

**Focus on (heavy chapter — prioritize):**
- The execution-gap vignette and the cost decomposition (§1)
- The LOB mechanics: spread, queue position, tick size (§2)
- **§2.5 — the agent-based LOB simulator** (Cont-Stoikov-Talreja): how the
  book shape and impact emerge from primitive Poisson rates
- Temporary vs. permanent impact, and the square-root law $I \approx Y\sigma\sqrt{Q/V}$ (§3)
- Almgren-Chriss closed form, the sinh trajectory, the role of $\lambda$ (§4)
- **§4.5 — the parameter sweep**: how the desk should move $\lambda$ when
  $\sigma$ or $\eta$ changes; the "knee" rule $\kappa T \approx 1$
- Implementation shortfall as decomposition (§5)
- VWAP / TWAP / POV failure modes (§6)
- The Knight Capital case file (§6) and the Rule 23 box (§7)

**Exercises to attempt:**
- Ch 32 exercises 1, 2, 4 (the AC parameter sweep)

**Rule earned:** Rule 23 — *An alpha is not executable until it survives the
fill ledger.*

---

## Before Lecture B — Ch 33 (Reinforcement-Learning Foundations)

**Read in full:**
- Chapter 33 of *Financial Machine Learning and AI* — Reinforcement-Learning
  Foundations

**Required companion selections:**

- Sutton and Barto (2018), [*Reinforcement Learning: An
  Introduction*](papers/Sutton_Barto_2018_Reinforcement_Learning.pdf) — Chapter
  2 on multi-armed bandits, Chapter 3 on finite Markov decision processes, and
  the Q-learning portion of Chapter 6
- Nevmyvaka, Feng, and Kearns (2006), [“Reinforcement Learning for Optimized
  Trade Execution”](papers/Nevmyvaka_Feng_Kearns_2006_RL_Execution.pdf) —
  problem formulation, state and action design, benchmark comparison, and
  limitations

**Focus on:**
- The shift from **prediction to control** (§1)
- **Multi-armed bandits as one-state RL**, contextual bandits, and regret (§2)
- The ingredients of an **MDP** (§3) and the role of the discount
  factor
- **Value functions**, the **Bellman optimality equation**, and the
  greedy-on-$Q^*$ trick (§5)
- **Q-learning** as a model-free, off-policy TD update (§7)
- **Exploration–exploitation** and $\varepsilon$-greedy (§8)
- The gridworld demo and what it assumes (§6–8) — these are the conditions a
  market application must examine

**Exercises to attempt:**
- Ch 33 exercises 1, 2, 3, 4

**Rule previewed:** Rule 20 — *Reinforcement learning needs an environment
that can answer actions.* Earned in Ch 34 (next week).

---

This is the week the course's two halves meet. Ch 32 gives you the
environment — a limit order book that reacts to your trades — and Ch 33
gives you the formalism for acting inside one. Next week's Ch 34 argues
how a controlled execution MDP can be well posed while a fixed price replay
cannot answer counterfactual actions. Read them in that order.

## Optional supplementary reading

- Bouchaud, Bonart, Donier & Gould (2018), *Trades, Quotes and Prices* —
  the standard practitioner reference for the empirical microstructure of §2–§3.
- Almgren & Chriss (2000), "Optimal Execution of Portfolio Transactions" —
  the canonical Wk 12A paper.
- Cont, Stoikov & Talreja (2010) — the reduced-form LOB model behind §2.5.
- Kyle (1985) and Glosten and Milgrom (1985) — foundational models of informed
  trading and the bid–ask spread; local PDFs are retained in
  [`papers/`](papers/)
- Lattimore & Szepesvári (2020), *Bandit Algorithms* — exploration,
  regret, and contextual-bandit foundations
- Watkins & Dayan (1992) — convergence of Q-learning

## How to spend the week

| Day        | Activity                                                   |
|------------|------------------------------------------------------------|
| Day 1      | Read Ch 32 §1–3 (LOB and impact)                           |
| Day 2      | Read Ch 32 §4–5 (Almgren-Chriss); watch Lecture A          |
| Day 3      | Run `week12_demos.ipynb` Demos 0–1 (book walk and impact extrapolation) |
| Day 4      | Read Ch 33 through the MDP contract; run the bandit warm-up and Demo 2 |
| Day 5      | Read Ch 33 §5–8; finish Lecture B; run Demos 3–5           |
| Day 6      | Submit Quiz 11; continue the HW7 challenge set             |
| Day 7      | Compare replay, logged support, and a responsive simulator  |
