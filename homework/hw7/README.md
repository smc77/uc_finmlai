# HW7 — A Financial Text / LLM Application, With Evaluation

**FIN 7057 · Due after Week 13 · 100 points**

Build a small but complete text/LLM application for finance — and **evaluate it**. This is a
**deliberately lighter assignment than HW1–6**: the final project is ramping up, so pick one task,
keep the corpus small, and put your effort into the *evaluation*, not the demo. A modest pipeline with
a rigorous faithfulness/leakage/accuracy check earns full marks; an impressive pipeline with no
evaluation earns little. Treat it as a **transfer exercise** — a new dataset and task that check
whether the *workflow* carries over, not just one pipeline.

## Choose ONE task
1. **Sentiment / classification:** label financial text by tone or topic, using at least 40
   labeled snippets with both classes represented and at least 10 later held-out cases.
2. **RAG Q&A:** retrieve over a small corpus of filing/transcript snippets and answer questions
   grounded in the sources, with citations. Evaluate at least 10 adjudicated questions spanning
   answerable, unanswerable, numerical, and indirect-injection cases.
3. **Extraction:** pull structured facts (guidance, KPIs, risks) from text, checked against ground
   truth for at least 20 labeled fields or extraction cases.

You may use classical NLP (TF-IDF, Loughran-McDonald), embeddings, or an LLM API. If you use an LLM,
**document model, prompts, and limitations** (per the syllabus AI policy for LLM-as-method work).

## Tasks

### Part A — Task, corpus & timestamps (15 pts)
1. Define the task and assemble a corpus meeting the selected track's minimum above. (8)
2. Record each document's **public/availability date** and explain any timestamp-leakage risk. (7)

### Part B — The pipeline (30 pts)
Build it end-to-end: e.g., TF-IDF + classifier (sentiment), or retrieve→answer (RAG), or an
extraction prompt. State each step. Runs top-to-bottom. (30)

### Part C — Evaluation (35 pts) — *the core*
Pick the right evaluation for your task and **implement it**:
- *Sentiment/classification:* accuracy, F1, and where defined ROC-AUC on a later held-out labeled
  set, compared with a majority and simple lexical baseline.
- *RAG:* a **faithfulness check** (are the answer's claims/numbers grounded in retrieved context?),
  citation correctness, answer accuracy, and behavior on unanswerable questions and indirect
  prompt injection.
- *Extraction:* precision/recall against ground-truth fields.
For any LLM track, include a prompt-injection or contamination probe. (35)

### Part D — Reflection & limitations (20 pts)
Explain accurately and completely: Where does it fail? What are the **timestamp leakage** risks?
For LLMs, address **hallucination**,
**knowledge-cutoff / training-data look-ahead**, and when you would *not* trust the output for a
financial decision. There is no graded word-count requirement. (20)

## Required core & optional extensions

The tasks above are the **required core** — that is what is graded, and the self-check verifies it. Do them well before reaching for anything fancier; maximal sophistication is not the implicit norm. If you have time and want to go further, pick an **optional extension** (encouraged, not required for full marks):

- Compare two retrieval or chunking policies on the same adjudicated RAG set.
- Add a second later test cohort or a declared lexical-shift stress test.
- Evaluate a support checker on meaning-preserving and meaning-changing challenges.

## Deliverables
- Set `TASK` to `classification`, `rag`, or `extraction`, then run the **task-specific
  Self-check**. It checks only the selected track; students are not required to complete multiple
  scaffolds.
Completed notebook (start from `hw7_starter.ipynb`), reproducibility, and an AI-use disclosure (with
model/prompt documentation if you used an LLM).

## Grading rubric (100 pts)

| Component | Pts |
|-----------|-----|
| A — Task, corpus, timestamps | 15 |
| B — Working pipeline | 30 |
| C — **Evaluation** (faithfulness / accuracy / injection) | 35 |
| D — Reflection & limitations | 20 |
| Reproducibility & hygiene | *up to −10 penalty if missing* |

## Tips
- Beat a baseline: TF-IDF + logistic regression is a strong, cheap sentiment baseline before FinBERT.
- For RAG, *ground every number* and make the system **cite or refuse** — then test that it does.
