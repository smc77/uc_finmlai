# Final-Project Paper Review Checklist

Use this checklist on a complete draft in Week 14. It applies to both the
integrated Jupyter report and the separate-paper pathway.

## Research argument

- [ ] The title names the financial question or finding rather than only the
  algorithm.
- [ ] The abstract states the question, data, design, result, and principal
  limitation.
- [ ] The introduction identifies the intended decision and a narrow,
  defensible contribution.
- [ ] The conclusion directly answers the opening question without making a
  stronger claim than the evidence supports.

## Prior evidence

- [ ] The related-work section synthesizes prior findings rather than listing
  paper summaries.
- [ ] Prior work helps justify the baseline, features, metric, or robustness
  design.
- [ ] The paper says whether it replicates, extends, compares, audits, or
  applies the closest work.
- [ ] Every citation was opened and verified by the author; persistent links or
  DOIs are supplied where available.

## Data and research design

- [ ] The population, sample dates, unit of observation, and exclusions are
  explicit.
- [ ] The decision time, feature/evidence time, and outcome interval are
  unambiguous.
- [ ] The baseline is feasible and answers the same forecasting or decision
  question as the candidate.
- [ ] Training, validation, and final testing roles are distinct.
- [ ] Search, stopping, threshold, and seed choices are recorded.
- [ ] The final test was not used to revise the reported procedure.

## Results and decision relevance

- [ ] The baseline result appears before the more complex model result.
- [ ] Every figure and table has a descriptive title or caption and is
  interpreted in the text.
- [ ] Uncertainty, seed sensitivity, or stability is reported where it could
  change the conclusion.
- [ ] The report distinguishes statistical performance from the decision or
  business consequence.
- [ ] Costs, constraints, error asymmetries, capacity, or other relevant
  implementation effects are included.
- [ ] Robustness checks address declared alternative explanations rather than
  searching indefinitely for favorable specifications.

## Limitations and reproducibility

- [ ] The limitations section identifies what the evidence does not establish.
- [ ] The warranted claim would remain acceptable if the candidate model did
  not beat the baseline.
- [ ] Reported numbers and final figures can be regenerated from submitted
  code.
- [ ] Data-access instructions, sample boundaries, fixed seeds, and package or
  environment information are present.
- [ ] `RESEARCH_RECORD.md` links the frozen plan, material design changes, final
  evidence, and artifacts.
- [ ] The AI-use disclosure follows the syllabus and the author can explain
  every submitted claim and code path.

## Reader test

After five minutes, can a technically literate reader identify:

1. what was predicted or estimated;
2. what was known at the decision time;
3. what baseline had to be improved;
4. what the principal result was;
5. what decision or use followed;
6. what the main limitation was; and
7. where to inspect or reproduce the evidence?

If not, revise the report's hierarchy before polishing its formatting.

