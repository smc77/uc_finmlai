# Week 11 — Reading

The local podcast research packet is indexed in
[`papers/README.md`](papers/README.md).

## Before Lecture A — Ch 30 (LLMs and Retrieval-Augmented Generation)

**Read in full:**
- Chapter 30 of *Financial Machine Learning and AI* — LLMs and
  Retrieval-Augmented Generation

**Focus on:**
- What an LLM is and is not (§1) — the next-token-predictor framing
- **Inference-time compute** (§3) — depth, breadth, search, and why the
  procedure, checker, and budget belong in the system record
- The **knowledge-cutoff** leakage hazard (§4) — look-ahead bias
  applied to LLM forecasts
- The **RAG pipeline** (§5): index → retrieve → generate, and why each
  step buys what
- The **cite-or-refuse** rule (§6)
- Agent graphs, bounded loops, and tool use (§§9–11) — typed state, graph
  budgets, runtime routing, loop stopping rules, authority, and why error compounds

**Exercises to attempt:**
- Ch 30 exercises 1, 2, 3, 4, 10

**Rule previewed:** Rule 19 — *For a material factual claim, an unsupported
answer is worse than a refusal.* Stated fully in Ch 31, Lecture B this week.

---

## Before Lecture B — Context, adaptation, and inference economics

**Read selectively:**
- Chapter 30 §§1–3 and §§5–7 of *Financial Machine Learning and AI* — the
  model/system distinction, context, inference-time compute, RAG, and refusal
- Chapter 31 §§1–2 — atomic claims and why numeric overlap is not entailment
- Hu et al. (2021), [“LoRA: Low-Rank Adaptation of Large Language
  Models”](https://arxiv.org/abs/2106.09685)
- Liu et al. (2024), [“Lost in the Middle: How Language Models Use Long
  Contexts”](https://aclanthology.org/2024.tacl-1.9/)

**Focus on:**
- **In-context learning** — examples can specify a temporary task without
  changing the base weights
- **Effective context use** — capacity does not guarantee equal use of every
  passage or position
- The adaptation frontier: prompting, retrieval, LoRA, and full fine-tuning
- The LoRA parameter rule $r(d_{in}+d_{out})$ for one adapted matrix
- **Inference-time compute** — depth, breadth, search, tools, and checking
- The complete operating ledger: quality, tokens, calls, latency, cost, and
  expected error loss

**Exercises to attempt:**
- Ch 30 exercises 3 and 10
- Notebook Demo 1c and Demos 3–5

**Rule retained:** Rule 19 — *For a material factual claim, an unsupported
answer is worse than a refusal.* Part B adds that adaptation and inference
compute do not replace the supporting evidence.

---

## Optional supplementary reading

- `slides_c_agent_graphs_frontier.qmd` — a guided course supplement on typed
  state graphs, coordination budgets, deterministic reducers, visible failure,
  and topology-level observability.
- Lewis et al. (2020), "Retrieval-Augmented Generation for
  Knowledge-Intensive NLP Tasks" — the RAG paper.
- Lu et al. (2022), "Fantastically Ordered Prompts and Where to Find Them"
- Zheng et al. (2023), "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
- Chapter 31 §§3–6 — extended abstention, injection, and governance treatment

## How to spend the week

| Day        | Activity                                                   |
|------------|------------------------------------------------------------|
| Day 1      | Read Ch 30 §1–5; sketch the RAG and inference procedures  |
| Day 2      | Read Ch 30 §6–11; watch Lecture A; run Demos 0–2           |
| Day 3      | Read Ch 30 §§1–3 and the LoRA paper; audit Demo 3           |
| Day 4      | Read the long-context paper; watch Lecture B                |
| Day 5      | Audit Demos 4–5; complete the adapter and inference ledgers |
| Day 6      | Submit HW6 and Quiz 10                                     |
| Day 7      | Open HW7; freeze its evidence packet and evaluator labels  |
