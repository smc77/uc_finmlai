# Week 13 — Reading

The two required course chapters are distributed with the course textbook and
through Canvas. The public links below provide optional background; students do
not need the private narration scripts or local podcast-generation files.

## Before Lecture A — Ch 34 (RL in Finance)

**Read in full:**
- Chapter 34 of *Financial Machine Learning and AI* —
  RL in Finance: Execution and the Environment Contract

**Focus on:**
- §1 — fixed replay, logged decision process, and responsive simulator
- §2 — logged contextual bandits, action support, and weight concentration in offline evaluation
- §3 — generic policy-selection bias under a pure-noise control
- §4–6 — the controlled execution MDP, exact dynamic-programming answer,
  repeated Q-learning audit, and changed-simulator tests
- Recognition bridge — tabular Q-learning versus deep Q-networks; use Mnih et
  al. (2015) below for the full DQN treatment
- §7 — the bounded deployment ladder from offline evidence to authority
- The case file on the May 6, 2010 Flash Crash

**Exercises to attempt:**
- Ch 34 exercises 1, 2, 3, 4

**Watch:**
- Lecture 13A recordings in Canvas: recorded evidence and unsupported actions;
  the exact execution world and its oracle; simulator shift and bounded authority.

**Rule earned:** Rule 20 — *Reinforcement learning needs an environment that
can answer actions.*

---

## Before Lecture B — Ch 35 (Causal Inference for Finance)

**Read in full:**
- Chapter 35 of *Financial Machine Learning and AI* —
  Causal Inference for Finance

**Focus on:**
- §1 — the empty-chair framing; prediction and intervention answer different
  questions
- §2 — the $P(Y \mid X)$ vs. $P(Y \mid do(X))$ distinction; why SHAP is
  not a causal estimate
- §3 — potential outcomes; the fundamental problem of causal inference
- §4 — difference-in-differences in depth: the borrowed trend, event-study
  timing, clustered inference, anticipation, and staggered adoption
- §5–7 — the closing design map: IV, synthetic control, and RDD, with the
  assumption each rests on
- §8 — T-, X-, and R-learners; the qini statistic
- §9 — SUTVA violation, instrument scarcity, regime shifts — why finance
  is harder than medicine or labor economics
- The 2007 quant-quake case file

**Exercises to attempt:**
- Ch 35 exercises 1, 2, 3, 4

**Watch:**
- Lecture 13B recordings in Canvas: estimands, adjustment, and the missing
  outcome; difference-in-differences; IV, synthetic control, RDD, uplift, and
  transport.

**Rule earned:** Rule 25 — *A causal claim begins by naming the missing
counterfactual.*

---

## Optional supplementary reading

These public links are optional unless Canvas says otherwise.

- [Almgren & Chriss (2000), “Optimal Execution of Portfolio Transactions”](https://doi.org/10.21314/JOR.2001.041),
  *Journal of Risk* — the foundational impact-versus-risk formulation.
- [Nevmyvaka, Feng & Kearns (2006), “Reinforcement Learning for Optimized Trade Execution”](https://doi.org/10.1145/1143844.1143929), *ICML*.
- [Mnih et al. (2015), “Human-level control through deep reinforcement learning”](https://doi.org/10.1038/nature14236),
  *Nature* — recognition-level DQN background.
- [Hambly, Xu & Yang (2023), “Recent Advances in Reinforcement Learning in Finance”](https://ora.ox.ac.uk/objects/uuid%3A45234c44-2874-4666-b273-38ee57d6be50), *Mathematical Finance*.
- [Bertrand, Duflo & Mullainathan (2004), “How Much Should We Trust Differences-in-Differences Estimates?”](https://sendhil.org/wp-content/uploads/2019/08/Publication-53.pdf),
  *QJE* — serial dependence and inference; correcting uncertainty does not establish parallel trends.
- Imbens & Rubin (2015), *Causal Inference for Statistics, Social, and Biomedical Sciences* —
  available through [Cambridge University Press or a university library](https://www.cambridge.org/core/books/causal-inference-for-statistics-social-and-biomedical-sciences/71126BE90C58F1A431FE9B2DD07938AB).
- [Khandani & Lo (2011), “What Happened to the Quants in August 2007? Evidence from Factors and Transactions Data”](https://web.mit.edu/~alo/www/Papers/august07b_2.pdf)
  — author working-paper version of the historical case study.
- [Künzel et al. (2019), “Metalearners for estimating heterogeneous treatment effects using machine learning”](https://arxiv.org/pdf/1706.03461)
  — author preprint for T-/X-learners.

The optional podcast also uses [Sutton & Barto](http://incompleteideas.net/book/RLbook2020.pdf)
for RL foundations and [Gârleanu & Pedersen](https://doi.org/10.1111/jofi.12080)
for an analytical trading benchmark. Upload only the episode's specified core
sources when generating audio.

## How to spend the week

| Day        | Activity                                                       |
|------------|----------------------------------------------------------------|
| Day 1      | Read Ch 34; sketch the impact-vs-risk tradeoff in your notes   |
| Day 2      | Watch Part A; run `week13_demos.ipynb` Demos 0, 2, 3, and 3b (support, execution, stress); Demo 1 is optional |
| Day 3      | Read Ch 35 §1–4; trace the signal-that-wasn't vignette         |
| Day 4      | Read Ch 35 §5–9; attempt the IV / DiD exercises                |
| Day 5      | Watch Part B; run `week13_demos.ipynb` Demos 4–7 (adjustment, DiD, IV, uplift) |
| Day 6–7    | Submit HW7 and Quiz 12; bring one frozen project result, its    |
|            | baseline, decision, and weakest slide to the Week 14 clinic     |

## Teaching references and visual prompts — reviewed November 14

- **Worked examples and explanation:** the [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)
  supports interleaving worked solutions with student problems and pairing graphics
  with words (moderate evidence), and asking explanatory questions (strong evidence).
  The placed code walkthroughs use those practices; this is not evidence that any
  particular animation is superior.
- **Q-learning and endings:** [Farama's Gymnasium training example](https://gymnasium.farama.org/v1.0.0/introduction/train_agent/)
  and [time-limit explanation](https://gymnasium.farama.org/tutorials/gymnasium_basics/handling_time_limits/)
  provide an optional implementation bridge after Demo 1. Prerequisite: states,
  actions, rewards, and the Q update. Predict whether a true terminal state should
  contribute a continuation value. The local grid and execution cells supply a
  runnable fallback; the execution deadline is part of the task, not an arbitrary
  collection cutoff.
- **Deep RL visualization:** the Breakout comparison shown in Lecture 13A uses
  a pinned RL Baselines3 Zoo agent. Place it after the Q-table-to-network
  bridge. Predict how random exploration differs from trained control, then
  explain why evaluation score is not oracle regret. Its chart reveals recorded
  training history alongside fixed policies; gameplay is not retraining live.
- **DiD diagnostics:** [Jonathan Roth, *Pretest with Caution*](https://www.jonathandroth.com/assets/files/roth_pretrends_testing.pdf)
  explains why a quiet pre-trend test cannot prove the required counterfactual.
  Use after the event-study slide. Predict what adding an untreated differential
  trend does to the local Demo 5 trajectory and event-time plots.
- **Historical mechanism:** the [joint SEC/CFTC final report](https://www.cftc.gov/sites/default/files/idc/groups/public/%40otherif/documents/ifdocs/staff-findings050610.pdf)
  supplies the May 6, 2010 case. Use its account as a mechanism prompt, not a
  controlled causal estimate of one algorithm's effect.
