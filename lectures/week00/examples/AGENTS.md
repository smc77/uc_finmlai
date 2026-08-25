# Quantitative research project instructions

## Purpose

This repository studies whether a stated information set can improve a stated
financial decision. Keep the research question, not model complexity, at the
center of the work. Read `README.md` and `research_record.md` before editing.

## Document clearly

- When designing something new, document it clearly in language that an
  advanced high school student could understand. Use a Markdown document.
- Store research results in Jupyter notebooks.

## Research invariants

- Reconstruct each historical row as if you were alive at its decision time.
- State the information cutoff, decision time, feasible execution time, target
  interval, units, universe, and timezone.
- Do not use later observations, revised values, or today's survivor list to
  construct an earlier row.
- Fit scalers, imputers, encoders, feature selection, and models on training
  data only. Apply the frozen fitted state to later data.
- Validate forward in time. Keep the final assessment period out of model and
  feature selection.
- Compare results with a named forecast, investment, or risk benchmark under
  the same target, horizon, loss, and cost assumptions.
- Keep raw data immutable. Do not silently replace missing data with synthetic
  data; report what is missing and stop if it changes the claim.

## Working conventions

- Make the smallest change that answers the request. Preserve unrelated work.
- Keep notebooks readable as research narratives. Move reused logic into
  tested functions under `src/`.
- Use project-relative paths, explicit random seeds, and named configuration
  values rather than hidden notebook state.
- Record material changes to data, timing, features, targets, benchmarks, or
  evaluation in `research_record.md`.
- Do not add dependencies, download large data, or change the research question
  without explaining the need first.
- Never commit credentials, `.env` values, licensed raw data, or private
  employer material.

## Verification

- Find the repository's real setup and test commands in `README.md`,
  `pyproject.toml`, or the task runner. Do not invent successful checks.
- Run the smallest relevant test while working and the documented full check
  before reporting completion.
- Restart and run any affected notebook from top to bottom in a clean kernel.
- For time-dependent features, test future invariance: changing data after a
  cutoff must not alter feature values before that cutoff.
- Inspect `git diff` and report changed files, tests run, assumptions, and
  remaining limitations. If a check could not run, say why.

## Review priorities

- When reviewing code, look first for timing leakage, preprocessing fitted
  before the split, invalid random shuffling, revised or survivor-biased data,
  overlapping labels treated as independent, undisclosed search, weak
  benchmarks, and omitted trading costs.

## Simplicity first

- Use the minimum code that solves the problem. Do not reinvent the wheel when
  a widely used tool already does the job well.

## Goal-driven execution

- Define success criteria and work until they are verified. Turn large tasks
  into verifiable goals with intermediate checks. If something is unclear, ask
  for more detail.
