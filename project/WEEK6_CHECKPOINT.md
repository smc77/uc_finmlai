# Week 6 Final-Project Checkpoint

This checkpoint begins the final project before model selection starts. The
idea may change later; the purpose now is to make the financial question, data
clock, comparison, and intended decision concrete enough to investigate.

## What to submit

Submit both of the following through Canvas:

1. **One project paragraph** containing the six elements below.
2. **An initialized `RESEARCH_RECORD.md`** copied from
   [`RESEARCH_RECORD_TEMPLATE.md`](RESEARCH_RECORD_TEMPLATE.md), placed at the
   root of your project repository, and committed to Git.

Unknown details do not need to be invented. Write `not applicable yet` or
`provisional` and identify what must be learned next.

## The one-paragraph idea

Your paragraph should let a reader identify:

1. **Financial question and intended decision** — what will someone do
   differently if the estimate is useful?
2. **Population and decision time** — which assets, borrowers, documents, or
   transactions are in scope, and when is the estimate made?
3. **Outcome and horizon** — what later quantity or event will be evaluated,
   and over what interval?
4. **Data and availability** — which source appears feasible, and when would
   each important input actually have been available?
5. **Baseline and primary metric** — what simple feasible alternative must the
   project improve upon, and how will the comparison be scored?
6. **First practical risk** — what access, timestamp, sample-size, leakage, or
   implementation problem could make the design infeasible?

A useful sentence pattern is:

> At **[decision time]**, for **[population]**, estimate **[outcome over a
> stated horizon]** using **[information available by then]**. Compare
> **[candidate procedure]** with **[feasible baseline]** using **[primary
> metric]** so that **[decision or use]** can be evaluated. The first material
> risk is **[data or design limitation]**.

The candidate model may remain provisional. A clear question with an honest
baseline and feasible data is more valuable now than a complicated model name.

## Initialize the research record

Copy the template to your own project repository and rename it exactly:

```text
RESEARCH_RECORD.md
```

For this checkpoint, complete at least:

- **Identity:** question, intended decision or use, owner, and repository;
- **Information Contract:** decision time, feature/evidence time, outcome
  interval, proposed data source, and expected sample dates;
- **Frozen Pre-Analysis Plan:** feasible baseline, provisional candidate,
  development/validation/test roles, primary metric, and a proposed lockbox
  rule; and
- **Decision Log:** one dated entry recording the initial design and the first
  unresolved feasibility question.

Then commit the file. The plan is allowed to change before the final lockbox is
opened, but material changes must remain visible in the decision log.

The closest prior work may still be unknown at this checkpoint. Record a
provisional research area or search question in the Identity section rather
than inventing a contribution. The literature map is developed during Weeks
7–9 and synthesized for Homework 6.

## What comes next

- **Weeks 7–9:** investigate data feasibility and refine the information
  contract while beginning a literature map of the closest research.
- **Weeks 10–11 / Homework 6:** submit the full proposal, literature synthesis,
  runnable baseline, updated research record, and a committed pre-analysis plan.
- **Before the final test:** freeze the selection rule and keep the final
  assessment lockbox closed.
- **Week 15:** submit the presentation, reproducible analysis, written report,
  and completed research record.

See the [full project brief](README.md) for tracks, required components,
deliverables, and grading emphasis. The
[report-pathways guide](REPORT_PATHWAYS.md) explains the integrated-notebook and
separate-paper options. The [`example/`](example/) directory demonstrates both
paths with one analysis; it is a model of scope and documentation, not a topic
that must be copied.
