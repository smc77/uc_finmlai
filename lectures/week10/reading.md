# Week 10 — Reading

The local podcast research packet is indexed in
[`papers/README.md`](papers/README.md).

## Before Lecture A — Ch 28 (Text as Data)

**Read in full:**
- Chapter 28 of *Financial Machine Learning and AI* — Text as Data:
  Representations and the Finance Lexicon

**Focus on:**
- Bag-of-words and the TF-IDF reweighting (§2) — what idf does and why
- Embeddings as geometry, and the transformer/FinBERT cost-benefit (§3–4)
- The **Loughran–McDonald lexicon trap** (§5) — this is the central
  warning of the chapter
- TF-IDF + logistic regression as the cheap, hard-to-beat baseline (§6)

**Exercises to attempt:**
- Ch 28 exercises 1, 2, 3, 4

**Rules invoked:** Rule 6 (compare added representation under the same
information and evaluation) and a preview of Rule 19 (for a material factual
claim, an unsupported answer is worse than a refusal).

---

## Before Lecture B — Ch 29 (Sentiment, Retrieval, and Timestamp Leakage)

**Read in full:**
- Chapter 29 of *Financial Machine Learning and AI* — Sentiment, Retrieval, and
  Timestamp Leakage

**Focus on:**
- The four canonical text jobs (§1) and their shared pipeline
- **Cosine-similarity retrieval** (§2) — the front end of RAG
- The four text-specific leakage paths (§3): timestamp, revision,
  post-event contamination, label leakage
- **§4 — Timestamp leakage made visible.** The 80% → 51% collapse is
  the central demonstration of the chapter
- The incremental-signal test (§5): does text actually add anything
  over a no-text numeric baseline?
- The time-correct text pipeline (§6)

**Exercises to attempt:**
- Ch 29 exercises 1, 2, 3, 4

**Rule invoked:** Rule 5 (*Stand at the decision time*) — in text
clothing.

---

## Optional supplementary reading

- Loughran & McDonald (2011), "When Is a Liability Not a Liability?,"
  *Journal of Finance* — the field-defining finance-NLP paper.
- Spärck Jones (1972) and Salton & Buckley (1988) — the origin of
  TF-IDF.
- Tetlock (2007), *Journal of Finance* — news-sentiment empirics.
- Vaswani et al. (2017), "Attention Is All You Need" — the transformer.

## How to spend the week

| Day        | Activity                                                   |
|------------|------------------------------------------------------------|
| Day 1      | Read Ch 28; attempt Ch 28 exercises 1–2                    |
| Day 2      | Watch Lecture A; run `week10_demos.ipynb` Demos 1–3       |
| Day 3      | Read Ch 29 §1–3; sketch the four leakage paths             |
| Day 4      | Read Ch 29 §4–6; watch Lecture B                            |
| Day 5      | Run `week10_demos.ipynb` Demos 4–7; reproduce the timing collapse |
| Day 6      | Complete Quiz 9 and freeze the HW6 question, split, metric  |
| Day 7      | Run the first HW6 baseline and save one result table        |
