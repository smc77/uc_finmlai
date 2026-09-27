# Final Project

Conduct and communicate a **credible empirical investigation of a financial
problem**. Machine learning is part of the research design, but the final
product is a piece of research rather than a model demonstration. Worth **35%**
of the course grade. The bar is rigorous, reproducible, skeptical work — **a
well-executed negative result earns full credit.**

**Starting in Week 6?** Follow the focused
[`WEEK6_CHECKPOINT.md`](WEEK6_CHECKPOINT.md) prompt first. It identifies exactly
what belongs in the one-paragraph idea and which parts of the research record
should be initialized now.

## Pick a track

| Track | Example problems |
|-------|------------------|
| **Markets / asset management** | Return prediction, volatility forecasting, factor timing, long-short portfolios |
| **Corporate / credit / text** | Credit default, bankruptcy prediction, filing analysis, earnings-call sentiment, risk summaries |

## Example projects (for inspiration — not a menu to copy)

These are fully-scoped starting points. Each uses free/public data, has a clear baseline to beat,
and carries a built-in way to be wrong — a strong *negative* result on any of them earns full credit.

**Markets / asset management**

- **Momentum, net of costs.** Does a 12–1 cross-sectional momentum signal on a liquid US-equity
  universe earn a positive *net* long–short return out of sample? Data: a public equity panel +
  Ken French factors. Baseline: equal-weight and the market. Model: gradient boosting on
  momentum/volatility features. The real question is what ~15 bps of round-trip cost does to the
  gross Sharpe.
- **Volatility is forecastable; direction isn't.** Beat a GARCH(1,1) / EWMA baseline at one-day-ahead
  realized volatility on SPY. Data: SPY daily (yfinance). Metric: QLIKE / MSE out of sample. A rare
  genuine win — and a clean contrast to how hard return direction is.
- **Timing the value factor.** Can macro state (yield-curve slope, credit spread) time HML? Data:
  Ken French HML + FRED. Baseline: always-on HML. Model: logistic / boosting on the macro state —
  then deflate the Sharpe for every signal you tried.

**Corporate / credit / text**

- **Credit default, done with discipline.** Predict loan default on a public lending dataset with
  time-aware splits and a *cost-sensitive* threshold (not accuracy). Watch for post-origination
  leakage, and run the four-fifths fairness check on the resulting decisions.
- **Filing tone and post-filing drift.** Does Loughran–McDonald tone in 10-Ks predict drift after the
  *filing* date? Data: SEC EDGAR + returns. Baseline: the lexicon count; then TF-IDF / embeddings +
  logistic. The whole project lives or dies on the timestamp.
- **A retrieval assistant over filings, evaluated.** Answer factual questions from one company's
  filings and *measure* faithfulness and refusal rate — the deliverable is the evaluation, not the
  demo. (Overlaps HW7; go deeper.)

## Required components (every project, either track)

1. **Research question** — what financial question are you answering?
2. **Prior evidence and contribution** — what has already been studied, what
   was found, and does this project replicate, extend, compare, or stress-test
   that work?
3. **Data pipeline** — what data, and *when would it actually have been available* (point-in-time)?
4. **Feature engineering** — what predictors, and why? (leak-free)
5. **Baseline model** — a simple linear/naive benchmark to beat.
6. **ML model** — at least one course-relevant method meaningfully more flexible
   than the baseline and appropriate to the data and sample size.
7. **Out-of-sample evaluation** — time-aware validation, with the right metric for your track (Week 6).
8. **Decision layer** — translate predictions into a portfolio, classification decision, risk flag, or action.
9. **Uncertainty and robustness** — how stable is the comparison, and which
   prespecified alternative explanations or changed-world conditions were tested?
10. **Limitations** — what would make this fail in reality, and what does the
    evidence not establish?

The project does not need to claim academic novelty. A careful replication,
extension, comparison, audit, or negative result can make a strong contribution.
Use prior literature to shape the design rather than adding citations after the
analysis is complete. See [`REPORT_PATHWAYS.md`](REPORT_PATHWAYS.md) for the
literature standard and the two permitted report formats.

## The Research Audit

Before you believe your own result — and before you believe anyone else's — put it through eight
questions. This is the course's recurring habit: apply it to your project at every milestone, and to
every paper, backtest, or vendor claim you meet after the course ends.

1. **What was known when?** Every input available at the decision time, in the vintage a user then
   had — nothing from the future.
2. **What is the baseline?** The simple, honest comparison the sophisticated model must beat — not zero.
3. **Is the validation genuinely out of sample?** Time-aware, leak-free, and never tuned on the test set.
4. **What decision follows?** A prediction is not yet a portfolio, a threshold, or an action.
5. **What frictions intervene?** Costs, turnover, capacity, slippage — does the edge survive them?
6. **How many choices were tried?** Features, windows, thresholds, models — and has the search been
   paid for?
7. **How uncertain is the result?** Error bars, seed sensitivity, and regime dependence, not one point
   estimate.
8. **What could make it fail?** The mechanism that would break it out of sample — named before it does.

A result that cannot answer all eight is not yet a finding. A strong limitations section is mostly a
candid pass through this list.

## The project research record

Beginning with the **Week 6 project idea**, copy
[`RESEARCH_RECORD_TEMPLATE.md`](RESEARCH_RECORD_TEMPLATE.md) to the root of your own project
repository and rename it exactly `RESEARCH_RECORD.md`.

Maintain that one Markdown file through Week 15. Update its current protocol as the project develops,
append a dated decision-log entry whenever a material choice changes, and commit it regularly. The
pre-analysis plan must have a recoverable commit from **before** you open the final assessment
lockbox. Link to notebooks, scripts, figures, data manifests, and commits rather than pasting large
outputs into the record.

The short research-record cells in the weekly lecture notebooks are practice. They stay in those
notebooks and are not merged into the project file. Your project record documents only your final
project.

The record is required at the project milestones and in the final submission. It is not a new grading
bucket: it is evidence for the existing rubric rows, including provenance, design, validation,
decision relevance, limitations, and reproducibility. See the completed
[`example/RESEARCH_RECORD.md`](example/RESEARCH_RECORD.md) for the expected level of detail.

## Policies
- **Negative results earn full credit** if the design, evaluation, and interpretation are strong.
  Don't p-hack a "win."
- **Reproducibility (required):** runs from submitted code; documents data sources, sample periods,
  train/test splits, fixed seeds, package list, and any AI tools used.
- **AI use:** allowed for code with disclosure; not for your analysis/conclusions (see syllabus).

## Milestones
- **Week 6:** one-paragraph project idea and initialized project-root `RESEARCH_RECORD.md` (so
  data-availability problems surface early).
- **Weeks 7–9:** test data feasibility and build a compact literature map of the
  closest work.
- **Weeks 10–11:** full proposal + literature synthesis + working baseline
  checkpoint — this is **HW6** (`homework/hw6/`). Submit the updated record with
  the pre-analysis plan and lockbox rule committed.
- **Week 14:** complete a paper draft and use the
  [`PAPER_REVIEW_CHECKLIST.md`](PAPER_REVIEW_CHECKLIST.md) before finalizing the
  presentation.
- **Week 15:** final presentation + report with code.

## Deliverables

Choose one of the two formats in [`REPORT_PATHWAYS.md`](REPORT_PATHWAYS.md):

- **Pathway 1 — integrated Jupyter research report.** One executed notebook
  contains both the analysis and paper-quality exposition. It requires no
  Quarto, LaTeX, or local publishing setup and can be completed in Colab.
- **Pathway 2 — analysis plus separate paper.** Jupyter or scripts produce the
  analysis and figures; Quarto, Microsoft Word, Google Docs, Typst, LaTeX, or
  another editor produces the standalone paper. A genuinely professional
  paper/slides/repository package is eligible for up to **2 bonus points on the
  final-project score**, capped at 100 and counted within the syllabus bonus
  limit. The bonus rewards the package, not the software used.

Four core artifacts are submitted together:

1. **Presentation** — a **10–12 minute** talk, **12–16 slides**, built in any
   appropriate tool. One idea per slide; tell the research argument rather than
   touring code. Suggested arc: question and prior evidence (1–2) · data and
   point-in-time availability (1–2) · baseline and design (1–2) · results and
   uncertainty (2–3) · decision layer (1) · limitations (1) · takeaway (1).
2. **Reproducible analysis** — an executed Jupyter notebook or documented
   scripts that run from a clean environment: data → features → baseline → model
   → OOS evaluation → decision → robustness. Include fixed seeds, an environment
   file or package list, and documented data sources.
3. **Written report** — either the integrated notebook under Pathway 1 or a
   separate **6–10 page** paper under Pathway 2. In either form it must include
   an abstract, introduction, related literature, data and information clock,
   research design, results, decision implications, robustness, limitations,
   conclusion, and references. Code output without sustained exposition does
   not satisfy the report requirement.
4. **Research record** — `RESEARCH_RECORD.md` at the repository root, including the information
   contract, frozen plan and its commit, decision log, final evidence, limitations, and artifact
   index. This remains a separate inspectable file even when the report adapts parts of it.

The worked repository in `project/example/` demonstrates both routes with the
same analysis: its expanded notebook illustrates Pathway 1, while its Quarto
paper and slide deck illustrate Pathway 2. Quarto is used for the demonstration
because it works well, not because students are required to install it.

## Grading emphasis

| Component | Weight |
|---|---:|
| Question, motivation, prior literature, and contribution | 15% |
| Data provenance and point-in-time integrity | 15% |
| Baseline, model, and validation design | 20% |
| Results, uncertainty, and robustness | 20% |
| Decision relevance and implementation | 10% |
| Interpretation, limitations, and conclusion | 10% |
| Reproducibility and communication | 10% |

The project is not graded on whether the sophisticated model wins. The research
record has no separate percentage; instructors use it as evidence when applying
the rubric. Unsupported or unrecoverable claims reduce the relevant component
scores.
