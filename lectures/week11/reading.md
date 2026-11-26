# Week 11 — Reading

## Before Lecture A — Ch 30 (LLMs and Retrieval-Augmented Generation)

**Read in full:**

- Chapter 30 of *Financial Machine Learning and AI* — LLMs and
  Retrieval-Augmented Generation

**Required companion selections:**

- Lewis et al. (2020), “Retrieval-Augmented Generation for Knowledge-Intensive
  NLP Tasks” — abstract, introduction, model
  overview, and conclusion
- Lopez-Lira, Tang, and Zhu (2025), “The Memorization Problem: Can We Trust
  LLMs' Economic Forecasts?”
  — abstract, research design, main results, and conclusion

**Focus on:**

- **The model and the system** — the next-token-predictor framing and the
  surrounding evidence, checking, and authority layers
- **A second place to spend compute** — depth, breadth, search, and why the
  procedure, checker, and budget belong in the system record
- **Parametric memory has a clock** — look-ahead bias applied to LLM forecasts
- **The reading room: RAG** — index → retrieve → generate, and why each step
  buys what
- **A context packet that can say no** and **A generator can still break the
  packet contract** — cite, check, or refuse
- **From a chain of chats to a graph of typed states**, **Where a loop belongs**,
  and **Tools need an authority map** — typed state, graph
  budgets, runtime routing, loop stopping rules, authority, and why error compounds

**Exercises to attempt:**

- Ch 30 exercises 1, 3, 4, 12, and 15

**Rule previewed:** Rule 19 — *For a material factual claim, an unsupported
answer is worse than a refusal.* Stated fully in Ch 31, Lecture B this week.

---

## Before Lecture B — Context, adaptation, and inference economics

**Read selectively:**

- Chapter 30: **Context is a temporary task specification**, **Choose where
  adaptation lives**, **LoRA buys a low-rank behavior update**, and **Inference
  is an economic policy**
- Chapter 31: **The evaluator stands at the border** and **Digits are not
  entailment**
- Liu et al. (2024), “Lost in the Middle: How Language Models Use Long
  Contexts” — abstract,
  experimental setup, main position results, limitations, and conclusion
- Hu et al. (2022; 2021 preprint), “LoRA: Low-Rank Adaptation of Large
  Language Models” — abstract, method,
  parameter-count argument, selected results, and limitations
- Snell et al. (2025), “Scaling LLM Test-Time Compute Optimally Can Be More
  Effective than Scaling Parameters for Reasoning”
  — abstract, compute-optimal policy, experimental boundary, and conclusion

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

- Ch 30 exercises 5, 7, 8, and 9
- Ch 31 exercise 1
- Notebook Demo 1c and Demos 3–5

**Rule retained:** Rule 19 — *For a material factual claim, an unsupported
answer is worse than a refusal.* Part B adds that adaptation and inference
compute do not replace the supporting evidence.

---

## Optional supplementary reading

- `slides_c_agent_graphs_frontier.qmd` — a guided course supplement on typed
  state graphs, coordination budgets, deterministic reducers, visible failure,
  and topology-level observability.
- Lu et al. (2022), [“Fantastically Ordered Prompts and Where to Find
  Them”](https://aclanthology.org/2022.acl-long.556/)
- Min et al. (2023), [“FActScore: Fine-grained Atomic Evaluation of Factual
  Precision in Long Form Text Generation”](https://aclanthology.org/2023.emnlp-main.741/)
- Tian et al. (2025), [“Distance between Relevant Information Pieces Causes
  Bias in Long-Context LLMs”](https://aclanthology.org/2025.findings-acl.28/)
- Vaswani et al. (2017), Brown et al. (2020), and Wei et al. (2022) — historical
  architecture, in-context learning, and chain-of-thought background; local PDFs
  are retained in papers/
- Chapter 31 from **Six metrics, six denominators** onward — extended
  abstention, injection, evaluator audit, and governance treatment

## How to spend the week

| Day        | Activity                                                   |
|------------|------------------------------------------------------------|
| Day 1      | Read the first half of Ch 30 and the Lewis selection        |
| Day 2      | Finish Ch 30; read the memorization selection; watch A      |
| Day 3      | Read the context and evaluator selections; audit Demos 1c–3 |
| Day 4      | Read Liu and Hu; watch Lecture B; audit Demo 4              |
| Day 5      | Read Snell; audit Demo 5 and the complete policy ledger     |
| Day 6      | Submit HW6 and Quiz 10                                     |
| Day 7      | Open HW7; freeze its evidence packet and evaluator labels  |
