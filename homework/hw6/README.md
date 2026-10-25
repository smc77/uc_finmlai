# HW6 — Final-Project Proposal & Baseline Checkpoint

**FIN 7057 · Due Weeks 10–11 · 100 points**

This is your final project's foundation, due early on purpose: it forces you to lock a question, a
**data pipeline with realistic availability**, and a **working baseline** *before* the end-of-term
crush — so you discover "my data doesn't exist" now, not in Week 15. Much of it is written; the one
coding requirement is a runnable, leak-free baseline.

[Open the starter notebook in Colab](https://colab.research.google.com/github/smc77/uc_finmlai/blob/main/homework/hw6/hw6_starter.ipynb), or download it from this folder and run it locally.

## Tasks

### Part A — Research question, track & prior evidence (20 pts)
1. State your **research question** in one or two sentences. (8)
2. Pick a **track** and say why: *Markets / asset management* (return/vol prediction, factor timing,
   long-short) or *Corporate / credit / text* (default, bankruptcy, filing/earnings-call analysis). (4)
3. Begin a **literature map** with at least four credible sources. For each,
   record the question/evidence, narrow finding, and relevance to your proposed
   design. Then state whether the project is primarily a replication, extension,
   comparison, audit, or applied evaluation. (8)

### Part B — Data pipeline & point-in-time availability (20 pts)
1. What data will you use, and from where? (8)
2. **When would each input actually have been available?** (filing lags, restatements, vendor
   point-in-time). Identify any look-ahead risks and how you'll avoid them. (12)

### Part C — Features + a working baseline (30 pts) — *the coding checkpoint*
1. Load **real** data; build leak-free or availability-correct features. Use the HW1
   future-invariance check when it applies; for filings, events, or cohorts, provide an
   availability assertion appropriate to that data. (10)
2. Define your target and a time-ordered or temporal/cohort development split. Reserve and state
   a **final lockbox** that will remain unopened until the final project. (7)
3. Fit a **simple baseline** (linear/logistic or predict-the-mean/majority) and report an honest
   **development-validation** number (rank IC / R² / AUROC / PR-AUC / log loss / calibration, as
   fits your track). This is the preliminary bar for model development, not the final-project
   performance claim. (13)

### Part D — Evaluation plan (15 pts)
1. Which **metric(s)** will judge success, given your track (Week 6)? (5)
2. What **baseline** must you beat, and what **costs / frictions / implementation constraints**
   apply? (10)

### Part E — Risks & kill criteria (15 pts)
Explain accurately and completely what could make this fail (capacity, decay, regime dependence,
data quality); there is no graded word-count requirement.
**How will you know if it isn't working** — including a criterion chosen without opening the
lockbox — and what result would lead you to report a negative
finding? (Recall: a well-executed negative result earns full credit on the final project.)

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Add a second baseline (a different model or feature set) for comparison.
- Test sensitivity to the sample period (e.g., drop or shift the training window).
- Sketch the decision layer your final project will use, and a first metric for it.

## Deliverables
- Run the **track-aware Self-check** cell at the end; every item must print **PASS**. It checks a
  real-data indicator, declared metric, temporal/cohort ordering, and a reserved lockbox without
  forcing every project into a return-prediction template.
- Completed notebook (start from `hw6_starter.ipynb`) with the baseline running top-to-bottom, plus
  the written sections. Reproducibility + AI-use disclosure.
- A declared final-report pathway and paper outline. Choose either the integrated
  Jupyter research report or analysis plus a separate paper; see
  [`project/REPORT_PATHWAYS.md`](../../project/REPORT_PATHWAYS.md). The choice may
  change later, but the intellectual sections are the same.
- The project-root `RESEARCH_RECORD.md`, initialized from
  [`project/RESEARCH_RECORD_TEMPLATE.md`](../../project/RESEARCH_RECORD_TEMPLATE.md) and updated
  through the working baseline. Complete the information contract, search and evaluation plan,
  lockbox rule, and current decision log. Commit the pre-analysis plan before opening the final
  lockbox.

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Question, track & prior evidence | 20 |
| B — Data pipeline & availability | 20 |
| C — Features + working baseline (OOS) | 30 |
| D — Evaluation plan | 15 |
| E — Risks & kill criteria | 15 |
| Reproducibility & hygiene | *up to −10 penalty if missing* |

HW6 is graded as homework for the quality of the proposal and baseline analysis. The project
milestone grade separately records timely completion of the checkpoint, as described in the syllabus.
The research record has no separate point row; instructors use it as evidence for Parts A–E and the
reproducibility requirement.

## Tips
- A strong baseline now saves you later: your final grade rewards beating it *honestly*, not raw
  performance.
- If you can't get the data, change the question **now**. That's the whole point of this checkpoint.
- Do not tune the final model against the lockbox. Once opened, a period is evidence spent.
