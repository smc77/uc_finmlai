# Week 14 — Reading

## Before Part A — Ch 37–38 (From Result to Governed Decision)

**Read in full:**
- Chapter 37 of *Financial Machine Learning and AI* — Fairness in Lending

**Focus on:**
- §1 — the "race-blind" vignette: dropping race produces a model whose
  approvals are 79.7% / 51.6% by group
- §2 — proxy discrimination: legitimate features (income, ZIP) recover
  group membership at AUC ≈ 0.81
- §3 — selection-rate ratios and uncertainty; why the four-fifths rule is a
  screening reference from employment guidance rather than a lending verdict
- §4 — three fairness criteria (demographic parity, equal opportunity,
  calibration), then distinguish binary equalized-odds versus predictive-parity conflict from the separate score-level theorem
- §5 — mitigation as a documented tradeoff; distinguish the full policy sweep
  from its nondominated Pareto frontier
- The Kleinberg–Mullainathan–Raghavan and Chouldechova impossibility papers

**Exercises to attempt:**
- Ch 37 exercises 1, 2, 3, 4

**Read in full:**
- Chapter 38 of *Financial Machine Learning and AI* — Model Risk, Regulation,
  Interpretability, and Deployment

**Focus on:**
- §1 — the SR 11-7 to SR 26-2 transition: risk-based validation, effective challenge,
  documentation, ongoing monitoring
- §2 — ECOA / Regulation B adverse-action reasons; why a creditor must state
  the principal reasons actually used by the decision system
- §3 — post-hoc interpretability tools (SHAP, permutation importance,
  partial dependence, model cards)
- §4 — the wider authority ledger: banking guidance, product law,
  SEC/FINRA obligations where applicable, GDPR, and the EU AI Act
- §5 — input drift vs. concept drift; PSI; live AUC lag
- §6 — champion/challenger, human oversight, kill switches
- §7 — LLM-specific governance issues

**Exercises to attempt:**
- Ch 38 exercises 1, 2, 3, 4

**Watch:**
- `../short/scripts/s1.md` — proxy information, selection rates, and selective labels
- `../short/scripts/s2.md` — conflicting criteria and the policy tradeoff map
- `../short/scripts/s3.md` — SR 26-2, reasons, monitoring, oversight, and retirement

**Rule earned:** Rule 21 — *Don't fool yourself — and don't fool others.*

---

## Before Part B — Final-project clinic and synthesis

Bring:

1. one **frozen** out-of-sample result figure;
2. one simple baseline comparison under the same objective;
3. one sentence naming the decision the result supports;
4. the slide you trust least.

Review:

- [`project specification`](../../project/README.md) — required components, eight-question audit,
  deliverables, and grading emphasis
- [`worked example slides`](../../project/example/pathway2_separate_paper/slides.qmd) — a complete 12–16 slide research-story
  example

**Watch:**
- `../short/scripts/s4.md` — the project storyboard
- `../short/scripts/s5.md` — the evidence and visual clinic
- `../short/scripts/s6.md` — the course method and submission audit

---

## Also read — Ch 36 (Model Uncertainty and Conformal Prediction)

Not lectured this term, but the natural close to the governance arc: how a
deployed model states the population and horizon attached to an uncertainty
claim.

- Chapter 36 of *Financial Machine Learning and AI* — Model Uncertainty:
  Confidence Intervals and Conformal Prediction

**Focus on:**
- Parameter vs. prediction uncertainty — a confidence interval on the mean is not a prediction
  interval for tomorrow (§1)
- Where classical intervals fail in finance: autocorrelation, heavy tails, multiple testing (§2)
- Split conformal and its distribution-free coverage guarantee — under **exchangeability** (§3)
- Why a population shift invalidates the original exchangeability argument,
  and how adaptive conformal methods respond to observed coverage error (§4–5)

---

## Optional supplementary reading

- Barocas, Hardt & Narayanan, *Fairness and Machine Learning*
  (fairmlbook.org) — definitive textbook on fairness criteria and
  impossibility results
- Hardt, Price & Srebro (2016), "Equality of Opportunity in Supervised
  Learning"
- Kleinberg, Mullainathan & Raghavan (2016), "Inherent Trade-Offs in the
  Fair Determination of Risk Scores"
- Federal Reserve **SR 26-2** (2026) — current risk-based guidance, expected
  to be most relevant to Federal Reserve-supervised banking organizations
  with more than $30 billion in assets; compare its scope and tailoring with
  **SR 11-7** (2011)
- Lundberg & Lee (2017), "A Unified Approach to Interpreting Model
  Predictions" — SHAP
- Mitchell et al. (2019), "Model Cards for Model Reporting"
- Rudin (2019), "Stop Explaining Black Box Machine Learning Models for
  High Stakes Decisions" — the case for inherent interpretability
- ECOA, current Regulation B, and CFPB guidance on adverse-action notices;
  record the effective date of the authority you consult
- EU AI Act summary on high-risk systems

### Case-study source trail

- [Obermeyer et al. (2019), PubMed record](https://pubmed.ncbi.nlm.nih.gov/31649194/):
  why predicting health-care spending can miss the decision's intended object,
  health need.
- [U.S. Senate London Whale report](https://www.hsgac.senate.gov/wp-content/uploads/imo/media/doc/REPORT%20-%20JPMorgan%20Chase%20Whale%20Trades%20%283-15-13%29.pdf):
  pp. 180–182 compare the $132 million and $66 million CIO VaR estimates and
  document the subsequent model reversal.
- [FINRA Robinhood AWC (2021)](https://www.finra.org/sites/default/files/2021-06/robinhood-financial-awc-063021.pdf):
  automated options approvals, contradictory application information, and the
  difference between checking code execution and reviewing decision quality.
- [Zillow Q3 2021 filing](https://www.sec.gov/Archives/edgar/data/1617640/000161764021000087/z-20210930.htm):
  the reported inventory write-down and interacting forecast, inventory,
  capacity, and operating risks.
- [SEC release 2024-36](https://www.sec.gov/newsroom/press-releases/2024-36):
  settled AI-washing cases and the need to substantiate claims about model
  capabilities and performance.

## How to spend the week

| Day        | Activity                                                       |
|------------|----------------------------------------------------------------|
| Day 1      | Read Ch 37; compute the impact ratio for the §3 example        |
| Day 2      | Watch Part A §1–2; run `week14_demos.ipynb` Demos 1–3 (audit + frontier) |
| Day 3      | Watch Part A §3; compare the scope pages of SR 11-7 and SR 26-2 |
| Day 4      | Read Ch 38 §5–7; sketch a monitoring plan for your project     |
|            | built in this course                                           |
| Day 5      | Bring the frozen result, baseline, decision, and weakest slide |
| Day 6–7    | Repair the presentation; rerun from a clean environment        |

## Teaching sources and prediction prompts — verified November 14, 2026

- [IES: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1): combine graphics with explanation and interleave worked examples with problems. Students predict an approval count, a precision denominator, or an outcome-availability month before checking the local calculation. These are design principles, not proof that each particular visualization improves learning.
- [Chouldechova (2017)](https://arxiv.org/pdf/1610.07524): use the binary true/false-alert counts to distinguish equalized error rates from predictive parity. In the lecture's local figure, predict the number of false alerts before dividing precision. No video is needed to understand this count example.
- [Kleinberg, Mullainathan, and Raghavan](https://arxiv.org/pdf/1609.05807): enrichment on calibrated risk scores and mean-score balance within outcome classes. Do not substitute this score-level theorem for a claim about a single threshold without checking assumptions.
- [Scikit-learn permutation importance](https://scikit-learn.org/stable/modules/permutation_importance.html): read the held-out-data and correlated-feature caveats, then explain why the notebook's one training-sample shuffle is only a mechanism illustration.
- [NYDFS Apple Card investigation, March 2021](https://www.dfs.ny.gov/system/files/documents/2021/03/rpt_202103_apple_card_investigation.pdf): separate the investigated allegations, evidence, and finding. It is not a claim about every later Apple Card issue.
- [SR 26-2 and attachment](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm): date, tailoring, applicability, and attachment footnote 3 on generative/agentic AI.
- [Regulation B final amendments](https://www.govinfo.gov/content/pkg/FR-2026-04-22/pdf/2026-07804.pdf): publication April 22, effective July 21, 2026. Date both events rather than treating publication as implementation.
- [Regulation B §1002.9](https://www.consumerfinance.gov/rules-policy/regulations/1002/9/): compare a score attribution with the factors actually used in the implemented decision; official interpretations 2 and 4–8 are especially relevant.

Use the seven placed code walkthroughs before the corresponding cells. The monitoring figure and count example are local, reproducible alternatives to an external player. For the project clinic, show one weak result slide, have students identify the missing comparison, and only then reveal its repair. Preserve the frozen analysis while revising communication.
