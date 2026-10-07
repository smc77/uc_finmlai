# Weeks 7–9 Final-Project Checkpoint

The Week 6 paragraph described a project you *could* run. This checkpoint
establishes whether you *can* run it, using the real data, before Homework 6
asks you to commit to a full proposal and a working baseline.

Most projects that fail do not fail at the model. They fail because a promised
series turns out to be unavailable, undated, too short, or only knowable after
the decision it was supposed to inform. That is cheap to discover now and
expensive to discover in Week 14.

## What to submit

Submit **one feasibility memo of roughly one to two pages** through Canvas.
It has two parts, described below, and may be a Markdown file, a PDF, or an
executed notebook that contains the same content.

You are **not** submitting your research record this checkpoint. Keep updating
it; it is first collected with Homework 6.

## Part 1 — Data feasibility, with evidence

The point of this part is that you have actually touched the data, not that you
have planned to.

Report the following, and include the small amount of output that demonstrates
each claim rather than asserting it:

1. **Source and access route.** Where the data comes from, how you obtain it
   (API, bulk download, bundled course dataset), and whether access is
   reliable and repeatable. Note any key, licence, or rate limit.
2. **Row and date counts.** How many observations you actually loaded, and the
   first and last date. Paste the counts.
3. **The clock.** For each important input: when is it *stamped*, and when
   would it actually have been *available*? Name any filing lag, release lag,
   restatement, or vendor revision. If an input is only available later than
   its own timestamp, say by how much.
4. **Sample adequacy for your design.** How many usable decision dates remain
   after the features, the target horizon, and any required warm-up window are
   applied — and whether overlapping horizons mean that number overstates your
   independent evidence (Week 6).
5. **One thing that surprised you.** A missing stretch, a survivorship
   question, a units problem, a revision you did not expect. If nothing
   surprised you, say that you looked and found the data clean.

Then state a verdict in one sentence: **the design is feasible as written, is
feasible with a stated modification, or must change.** All three are acceptable
answers at this checkpoint. A documented pivot now is a good outcome.

## Part 2 — A compact literature map

Identify **at least three** pieces of credible prior work — published papers,
working papers, or well-documented practitioner studies. For each, record:

- the **question** it asked and the **evidence** it used;
- its **narrow finding**, stated specifically enough to be checked against,
  not as a general theme; and
- its **relevance to your design** — what you borrow, what you change, and
  what it predicts you should find.

Then state in one or two sentences whether your project is primarily a
**replication, extension, comparison, audit, or applied evaluation**, and what
its contribution would be if the result is negative.

Three sources is a floor. Homework 6 requires at least four and asks you to
synthesize them, so work done here is not repeated later — it is extended.

## Grading

Graded **on completion**, as one of the five project milestones that together
carry 10% of the course grade. It is not assessed on whether the data turned
out to be usable or on the sophistication of the literature. It is assessed on
whether the feasibility work was genuinely done.

## Update your research record

Do not submit it, but bring it into line with what you learned:

- revise the **Information Contract** with the real dates, lags, and counts;
- revise the **Frozen Pre-Analysis Plan** if the feasible baseline, metric, or
  split roles changed;
- record a provisional research area or the sources you found in **Identity**;
  and
- append a dated **Decision Log** entry for any material change, including a
  decision to abandon or narrow the original idea.

A pivot recorded with its date and reason is evidence of good practice. A
silently rewritten plan is not.

## What comes next

- **Weeks 10–11 / Homework 6:** the full proposal, a literature map of at
  least four sources with synthesis, a runnable baseline on real data, the
  updated research record, and a pre-analysis plan committed before the final
  lockbox is opened.
- **Before the final test:** freeze the selection rule and keep the final
  assessment lockbox closed.
- **Week 14:** a complete paper draft, reviewed against the
  [paper-review checklist](PAPER_REVIEW_CHECKLIST.md).
- **Week 15:** the presentation, reproducible analysis, written report, and
  completed research record.

See the [full project brief](README.md) for tracks, required components, and
grading emphasis, and the [Week 6 checkpoint](WEEK6_CHECKPOINT.md) for the
idea paragraph this builds on.
