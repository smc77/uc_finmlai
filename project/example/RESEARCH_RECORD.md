# Research Record — Transformer Sentiment and Post-Filing Drift

This is a filled example of the final-project research record. It points to the
worked analysis in this directory and shows the expected level of specificity.

> **Timing disclosure.** The worked example was originally committed with its
> results on 2026-07-18, before the course adopted this record template. This
> document therefore reconstructs the design but cannot retroactively prove that
> its plan preceded the results. A student submission must replace that caveat
> with the actual pre-lockbox commit. Recording this defect, rather than inventing
> a freeze date, is itself part of a successful research record.

## Identity

- **Record ID:** `filing-sentiment-drift-v1`
- **Question:** Does a finance-tuned transformer extract filing tone that predicts
  post-filing drift better than a shallow lexicon once the filing timestamp and
  trading costs are respected?
- **Intended decision or use:** Rank newly public filings and decide whether the
  transformer warrants replacing the cheap lexicon in a long-short signal.
- **Closest prior work and provisional contribution:** Financial-dictionary,
  FinBERT, and filing-language studies summarized in `LITERATURE_MAP.md`. The
  example is a known-truth timing audit and baseline comparison, not a claim of
  new empirical evidence about SEC filings.
- **Owner:** FIN 7057 worked example.
- **Created / last changed:** Original example 2026-07-18; record reconstructed
  2026-08-15.
- **Repository and artifact commit:** The original notebook, pipeline, and slides
  are recoverable at commit `6f745b5950ddea93d58e96b1ae253353e9a8db0a`.
- **Code, data, model, prompt, and environment versions:** `analysis.ipynb` calls
  `_pipeline.py`; notebook metadata records Python 3.12.2; data generation uses
  NumPy RNG seed `20260718`; the primary path requests `ProsusAI/finbert`; the
  committed output used the deterministic lexicon stand-in because
  `transformers` and `torch` were not installed.

## Information Contract

- **Decision time:** Immediately after the filing is public at `filing_date`.
- **Feature or evidence time:** Filing text becomes admissible at `filing_date`,
  not at the fiscal period end.
- **Label or outcome interval:** Synthetic 20-day post-filing drift. The
  announcement return at the filing event is excluded from the tradeable label.
- **Execution time:** After the filing timestamp; the example does not model an
  intraday ingestion delay.
- **Data source, vintage, cutoff, and sample dates:** 1,200 synthetic filings
  generated offline by `_pipeline.make_filings`; one toy filing every three
  days; each filing is public 45 days after its period end. There are no revised
  vintages because the data are generated known truth.
- **Units and transformations:** Sentiment scores are continuous; the shallow
  lexicon is normalized net positive-minus-negative hits. Returns and spreads
  are decimal returns; cost is 10 basis points per long and short leg.
- **Known-truth, historical, or deployment evidence:** Known-truth simulation.
  It tests the research procedure, not the empirical profitability of real SEC
  filings.

## Frozen Pre-Analysis Plan

The following is the protocol the example implements. Its timing is
**reconstructed, not preregistered**, as disclosed above.

- **Hypothesis or proposed mechanism:** Filing tone may contain information that
  diffuses into returns after publication; a finance-tuned transformer may read
  that tone better than a shallow word list.
- **Feasible baseline:** Normalized shallow finance lexicon score.
- **Candidate model, rule, or system:** `ProsusAI/finbert`, with a deterministic
  richer-lexicon stand-in so the pipeline remains runnable offline.
- **Training / development role:** Neither text reader is fit on these examples.
  The first 70% of the time-ordered records is outside the final comparison and
  would be the development region for any fitted extension.
- **Selection / validation role:** No hyperparameter search is conducted. The
  target, two readers, tercile rule, and 10-basis-point cost are fixed in code.
- **Final assessment / lockbox role:** Last 30% of time-ordered filings; never
  shuffled.
- **Search space and trial-count rule:** Two declared readers and one declared
  horizon. The leaked period-end alignment is a diagnostic, not an eligible
  model. Any added reader, horizon, cost, or portfolio cut would increment the
  trial ledger.
- **Primary metric and denominator:** Spearman-style rank information coefficient
  on the last 30% of filings.
- **Secondary ledgers:** Net top-minus-bottom tercile drift and the leaked-versus-
  admissible timestamp comparison.
- **Pass, fail, or kill criterion:** The transformer must improve on the lexicon
  on the honest later block and leave a positive spread after the declared costs.
  A small difference without uncertainty evidence is reported as inconclusive,
  not as a win.
- **Plan-freeze date and commit:** **Not available.** Commit `6f745b5` already
  contains results. This would fail the timing requirement in a student project.

## Decision Boundary

- **Position, threshold, refusal, or authority policy:** Rank filing sentiment;
  go long the top tercile and short the bottom tercile.
- **Costs and constraints:** Ten basis points charged to each leg. The example
  omits financing, impact, capacity, sector neutrality, and overlapping holdings.
- **Stress or changed-world test:** Correct the timestamp from fiscal period end
  to filing date and compare the resulting collapse in information coefficient.
- **Stop, escalation, or fallback rule:** Retain the cheap lexicon unless the
  transformer earns a stable later-period advantage net of costs.

## Final Result

- **Assessment artifact:** Executed outputs in `analysis.ipynb` and figures
  `figures/01_leakage.png` and `figures/02_finbert_vs_lexicon.png` at the original
  artifact commit.
- **Primary result:** Honest later-block information coefficient is 0.140 for the
  transformer stand-in and 0.136 for the shallow lexicon.
- **Baseline result:** The lexicon's net tercile spread is 0.0014; the transformer's
  is 0.0022 after the stylized cost.
- **Uncertainty or stability evidence:** Not estimated. The 0.004 information-
  coefficient difference is therefore treated as fragile and inconclusive.
- **Reconciliation check:** Aligning tone to period end produces an inadmissible
  information coefficient of 0.548; using the public filing date reduces it to
  0.106 on the full sample, exposing roughly fivefold leakage inflation.
- **What would weaken the claim:** Real EDGAR text, realistic publication and
  execution delays, alternate horizons, sector and size controls, higher costs,
  or uncertainty intervals could eliminate the remaining spread.
- **Limitation:** Synthetic data, one horizon, one portfolio cut, stylized costs,
  no multiple-testing correction, optional-model fallback, and no genuinely
  pre-result plan commit.
- **Warranted claim:** In this controlled example, most apparent NLP alpha comes
  from the wrong timestamp. After repair and costs, the transformer stand-in does
  not clearly beat the lexicon. The example does not establish a profitable
  strategy on real filings.
- **Next decision:** Keep the lexicon as the default and require a preregistered
  real-EDGAR study with uncertainty and realistic execution before adopting the
  transformer.

## Decision Log

### 2026-07-18 — Original worked example created

- **Commit:** `6f745b5950ddea93d58e96b1ae253353e9a8db0a`
- **What changed:** Added the synthetic filing pipeline, notebook, figures, and
  slides as a worked final-project example.
- **Why it changed:** The course needed a reproducible negative-result example.
- **Evidence seen before the change:** Not recoverable as a separate committed
  plan; the commit contains both procedure and results.
- **Was the final lockbox still closed?** Cannot be established.
- **Effect on the claim or trial count:** Prevents a claim of preregistration.

### 2026-08-15 — Research record reconstructed

- **Commit:** Pending with this course revision.
- **What changed:** Added the structured record and explicit timing disclosure.
- **Why it changed:** Storage, submission, and grading expectations were made
  explicit across the course.
- **Evidence seen before the change:** All notebook results were already known.
- **Was the final lockbox still closed?** No.
- **Effect on the claim or trial count:** No empirical claim changed; the record
  now identifies the missing plan timestamp as a limitation.

## Artifact Index

| Artifact | Path or version | What it establishes |
|---|---|---|
| Analysis notebook | `analysis.ipynb` | Executed pipeline, comparisons, results, limitations |
| Shared pipeline | `_pipeline.py` | Seed, data-generating process, text readers, metrics |
| Research paper | `paper.qmd` and `paper.html` | Standalone argument, related literature, results, and warranted claim |
| Literature map | `LITERATURE_MAP.md`; `references.bib` | Prior evidence and its role in the design |
| Presentation | `slides.qmd` and `slides.html` | Concise research story |
| Leakage figure | `figures/01_leakage.png` | Consequence of the wrong information clock |
| Model comparison | `figures/02_finbert_vs_lexicon.png` | Honest later-block comparison net of costs |
| Environment | `project/example/README.md`; notebook Python 3.12.2 metadata | Core software route |

## Submission Check

- [x] File is named `RESEARCH_RECORD.md` at the project-example root.
- [x] Material choices and known history appear in the decision log.
- [ ] A pre-analysis-plan commit predates the result—intentionally disclosed as
      missing because the example predates the convention.
- [x] Claims point to recoverable artifacts and state their limitations.
- [x] The record sits beside the presentation and analysis deliverables.
