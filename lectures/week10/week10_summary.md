# Week 10 Summary — Financial Text and Point-in-Time Documents

Use this as a short review map for Week 10. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 10 turns documents into measurements, then asks whether those
measurements could have existed at the decision time:

> **Part A — text representations.** What does a representation keep, what
> does it discard, and which baseline must a richer one beat?

> **Part B — retrieval and the document clock.** Was the exact evidence
> retrievable, available, and incrementally useful when the decision was made?

A representation is a fitted instrument, not neutral preprocessing. A document
is evidence only once its identity, version, and availability are recorded.
The distance between those two ideas is the point of the week.

Three principles organize the week:

1. **Compare an added representation under the same information and
   evaluation (Rule 6).** Change the representation while holding the split,
   labels, dates, and metric fixed. TF-IDF with regularized logistic regression
   is the baseline to beat.
2. **Stand at the decision time (Rule 5), in text clothing.** For documents,
   “future” includes publication, ingestion, revision, annotation, and
   post-event wording. The relevant timestamp is when the feature could have
   entered the decision system.
3. **Text earns a place only through incremental evidence.** Text-only
   performance does not show decision value. Compare numeric-only and
   numeric-plus-text models on the same later observations.

## Core ideas

### Text representations (Part A)

1. **A representation is an instrument.** It determines which distinctions a
   model can express and what it must discard. No representation preserves
   language without loss.
2. **Text is statistically difficult.** The vocabulary can exceed the document
   count, the document-term matrix is sparse, firms repeat boilerplate, labels
   are weak, and language and disclosure practice change over time.
3. **The vocabulary is fitted state.** Fit the vectorizer on training documents
   only, then transform the test documents. Expanding the vocabulary with
   later documents changes the feature map after the split; in a historical
   backtest those documents did not yet exist.
4. **Count is not importance.** Template words can dominate raw counts while
   distinguishing little among documents.
5. **TF-IDF combines local and corpus evidence.** Term frequency in a document
   is multiplied by inverse document frequency, which downweights terms that
   appear in many training documents. High weight means *distinctive within the
   fitted corpus*, not positive, negative, or economically important. The IDF
   weights are fitted state too.
6. **Regularized logistic regression on TF-IDF is the demanding baseline.** It
   is fast, inspectable, and hard to beat without clear evidence. A transformer
   or embedding model should be compared with it on the same documents,
   labels, dates, and metric, under a chronological split.
7. **Sparse features collide.** Unigrams cannot separate *revenue rose and costs
   fell* from its role reversal, and they handle negation poorly. Bigrams keep
   some local order (“not lowered”) but stay lexically brittle. Paraphrases with
   little word overlap look unrelated.
8. **Character n-grams help with form, not meaning.** They tolerate inflection,
   misspelling, and some new word forms, but they lose easy word-level
   interpretation and can learn formatting artifacts.
9. **Lexical shift is visible chronologically.** Later documents contain terms
   absent from the development vocabulary: new products, regulation, crises,
   managerial phrasing. A random document split conceals this.
10. **Embeddings place similar usage nearby.** The geometry reflects the corpus
    the encoder was trained on, so record the encoder, checkpoint, pooling
    rule, and corpus provenance. **Semantic similarity is not factual
    agreement or entailment.**
11. **There are three different embedding objects.** A static embedding gives
    one vector per token type, so *river bank* and *investment bank* share one
    vector. A contextual embedding represents one occurrence in its sentence. A
    sentence or document embedding pools a whole passage. A contextual encoder
    does not automatically supply a good document vector.
12. **Attention lets one token modify another.** The representation of
    *lowered* can depend on *not*. Attention enables interaction; it does not
    guarantee correct reasoning or supply a causal explanation.
13. **“FinBERT” is not one model.** The name covers checkpoints with different
    corpora, labels, architectures, tokenizers, and licenses. Record the exact
    model identifier and revision. In a historical backtest also record the
    pretraining cutoff, because later pretraining text complicates a strict
    point-in-time claim.
14. **The finance-lexicon trap.** A generic sentiment list flags ordinary
    accounting language (*liability*, *tax*, *cost*) as negative, so the score
    partly measures accounting vocabulary as distress. A domain-aware list
    removes those false positives.
15. **Domain repair needs two-sided evidence.** Removing false flags is not
    enough: the repaired lexicon must still detect genuinely negative language.
    Also check negation, intensity, and changes across document types and eras.
16. **Accuracy is not probability quality.** Two models with nearly equal
    accuracy can have very different log loss. Report log loss or calibration
    when probabilities drive position size, thresholds, or review priority.

### Retrieval and the document clock (Part B)

17. **Financial text has four jobs.** Classification produces a label; scoring
    produces sentiment or risk; retrieval produces ranked passages; extraction
    produces entities and values. Every output becomes a feature or claim and
    inherits a timestamp.
18. **Retrieval ranks passages by similarity.** Lexical TF-IDF retrieval is
    strong when query and evidence share exact financial terms. Dense
    retrieval can recover paraphrases. A **hybrid** blends normalized scores,
    with the weight chosen on judged development queries, never on the final
    query set. Reciprocal-rank fusion is a rank-based alternative when score
    scales are not comparable.
19. **Retrieval needs judgments.** Mark which passages are relevant to each
    query *before* comparing retrievers. Without judgments, an attractive
    example shows only that one query worked.
20. **Retrieval metrics answer different questions.** Recall@*k* is the
    fraction of *all* judged relevant evidence that enters the top *k*.
    Success@*k* asks whether *at least one* relevant passage entered.
    Precision@*k* is how much returned material was relevant. MRR rewards an
    early first relevant passage. nDCG scores the ordering of graded results.
    Choose the metric from the downstream use.
21. **Retrieval is the evidence gate for RAG.** A generator cannot cite evidence
    that never entered its context, so retrieval failure and generation
    failure must be evaluated separately.
22. **The period described is not the time the document was available.** A
    10-K about a fiscal year ending December 31 may be filed weeks later,
    parsed later still, and amended months afterward. Period described ≠ public
    availability ≠ usable feature time.
23. **Every document needs a passport.** Record its source identity (for
    example the SEC accession number), subject period, creation or issue time,
    public availability, feature-ready time, and version. The feature row
    should point back to that record.
24. **Acceptance is an earliest bound, not observed dissemination.** EDGAR
    records when a filing was accepted, not when its content was first publicly
    available. Use observed retrieval logs when you have them; otherwise
    declare a conservative public-time and pipeline-latency policy.
25. **There are two admissibility margins.** The public margin is decision time
    minus public availability: did the source exist? The usable margin is
    decision time minus feature-ready time: was the implemented feature ready?
    Both must be nonnegative.
26. **There are four text-specific leakage paths:** timestamp, revision,
    post-event contamination, and label leakage. Each can pass a conventional
    random train/test split.
27. **Timestamp leakage creates a strong, useless relationship.** A filing
    released after a reporting interval can “predict” returns that were already
    realized. In the lecture's controlled construction, the same released tone
    reached about 0.81 directional accuracy on the past interval and about 0.52
    on the admissible future interval. **The collapse is the result:** correct
    alignment removes access to the past.
28. **As-of joins use availability.** For decision time *t*, select the latest
    document version with availability ≤ *t*. Do not join on fiscal period end,
    on a headline date without a time, or on a database's latest snapshot.
29. **Intraday timing needs a stated policy.** A filing accepted at 16:05 cannot
    support a trade at the 16:00 close. Daily backtests should say whether
    same-day or next-session trading is allowed.
30. **Amendments are new events.** A revised value enters the feature only after
    the amendment becomes available. A latest-snapshot database backfills the
    correction into earlier dates, in both numeric fields and language, and
    erases that history.
31. **Post-event contamination hides in document creation.** Summaries written
    after the price response, transcripts that discuss an announced outcome,
    updated risk sections, and document windows extending past the decision
    time all carry the future. Inspect when the document was created, not only
    its nominal source date.
32. **Labels can leak too.** The target can enter through outcome-organized
    filenames or folders, hindsight-written summaries, labels made from
    post-event language, or duplicates and near-identical firm-year filings
    crossing folds. Group and deduplicate before splitting. Group by firm when
    the claim is transfer to unseen firms; preserve firm history when the
    claim is forecasting later documents for firms already observed.
33. **Test incremental value with a paired chronological comparison.** Fit
    TF-IDF on an early block, select regularization on a middle block, and
    compare numeric-only with numeric-plus-text on the same later
    observations. In the lecture's twelve generated worlds, the median paired
    log-loss improvement was close to zero and positive in only six of twelve:
    that pipeline did not show stable incremental value.
34. **Keep the pipeline reconstructable.** Preserve versioned raw documents and
    corpus hashes, the passport and availability filter, the train-fitted
    parser, parser versions and model identifiers, chronological selection,
    and a frozen final test.

## Match the representation to the task

| Task | Strong starting point |
|---|---|
| Rare disclosed term | Word or character TF-IDF |
| Filing classification | TF-IDF + regularized linear model |
| Paraphrase retrieval | Dense embeddings + lexical hybrid |
| Contextual sentiment | Domain transformer, compared with the baseline |
| Factual extraction | Schema and span-level evaluation |

## The text evidence card

| Question | Record |
|---|---|
| What document existed? | Source, version, hash |
| When was it usable? | Availability and latency |
| What representation? | Fitted vocabulary or checkpoint |
| What baseline? | Numeric-only and sparse text |
| What was selected? | Development period only |
| What improved? | Paired later-period decision metric |

## Terms and vocabulary

### Representations

| Term | Plain-English meaning |
|---|---|
| **Document-term matrix** | Rows are documents, columns are vocabulary terms, entries are counts or weights. |
| **Fitted vocabulary** | The terms (and their IDF weights) learned from the training documents. |
| **TF-IDF** | Term frequency times inverse document frequency; downweights corpus-common terms. |
| **n-gram** | A run of *n* consecutive words (or characters, for character n-grams). |
| **Representation collision** | Two texts with different meanings mapped to nearly the same features. |
| **Lexical shift** | Later documents using terms absent from the fitted vocabulary. |
| **Static embedding** | One dense vector per token type, whatever its context. |
| **Contextual embedding** | A vector for one occurrence of a token in its sentence. |
| **Attention** | A mechanism that lets each token's representation draw on other tokens. |
| **Finance-lexicon trap** | Generic sentiment words misreading neutral accounting language as negative. |
| **Log loss** | A probability-quality metric that penalizes confident wrong predictions. |

### Retrieval and timing

| Term | Plain-English meaning |
|---|---|
| **Judged query set** | Queries with relevant passages marked before retrievers are compared. |
| **Recall@*k*** | Fraction of all judged relevant passages that appear in the top *k*. |
| **Success@*k*** | Whether at least one relevant passage appears in the top *k*. |
| **MRR** | Mean reciprocal rank: how early the first relevant passage appears. |
| **Hybrid retrieval** | A blend of normalized lexical and dense scores. |
| **RAG** | Retrieval-augmented generation: a generator answering from retrieved passages. |
| **Document passport** | Identity, subject period, availability, feature-ready time, and version of a document. |
| **Admissibility margin** | Decision time minus public time, or minus feature-ready time; must be ≥ 0. |
| **As-of join** | Selecting the latest version available at or before the decision time. |
| **Backfill** | Writing a later corrected value into earlier dates. |
| **Post-event contamination** | Document content written or updated after the event being predicted. |
| **Incremental value** | Improvement from adding text to an existing numeric model on the same later data. |

## Research protocol after Week 10

Keep the timing, validation, search, policy, and research-record rules from
earlier weeks, then add:

- fit vocabularies, IDF weights, and parsers on training documents only, and
  record tokenizer, n-gram range, document-frequency rules, and normalization;
- start from train-fitted TF-IDF with regularized logistic regression, and
  change one representation at a time under a fixed chronological split and
  metric;
- record the exact checkpoint, revision, pooling rule, and pretraining cutoff
  for any embedding or contextual model;
- validate a domain lexicon on both false flags and genuine negatives;
- judge retrieval queries before comparing retrievers, and report the metric
  that matches the downstream use;
- give every document a passport, with both admissibility margins and an
  execution convention;
- keep original vintages, treat amendments as new events, deduplicate, and
  group before splitting; and
- claim text value only from a paired, chronological comparison with the
  numeric model already in use.

For the project and **Homework 6**, leave this week with your question, one
clean data pull, availability logic, a fixed split and metric, and a simple
end-to-end baseline. **Quiz 9** is due this week.

## Common mistakes

Be able to explain why each statement is incomplete:

- “I fit the vectorizer on the full corpus so the test set has no unknown
  words.”
- “This term has the highest TF-IDF weight, so it is the most important
  economic signal.”
- “Bigrams fix negation and word order.”
- “The two passages are close in embedding space, so they say the same thing.”
- “We used FinBERT,” with no checkpoint, revision, or pretraining cutoff.
- “The finance lexicon no longer flags neutral sentences, so it is correct.”
- “Our retriever works — look at this example.”
- “The 10-K covers fiscal 2025, so it can enter fiscal 2025 features.”
- “The filing was accepted at 06:01, so the feature was available at 06:01.”
- “Tone predicts returns with 80% accuracy.”
- “The text model beats a model with no features, so text adds value.”

## Quiz check

You should be able to:

- explain why the vocabulary and IDF weights are fitted state;
- explain what inverse document frequency does and what TF-IDF weight does not
  mean;
- name the baseline a transformer must beat, and the conditions of that
  comparison;
- construct order-reversal, negation, and paraphrase collisions, and say which
  representation helps with each;
- distinguish static, contextual, and document embeddings;
- explain why a generic sentiment lexicon misreads financial language, and how
  to validate a repair;
- explain why accuracy and log loss can disagree;
- distinguish Recall@*k*, Success@*k*, Precision@*k*, and MRR;
- explain why retrieval and generation failures are evaluated separately;
- list the passport fields and compute both admissibility margins;
- name the four text-specific leakage paths with an example of each;
- explain the leaked-past versus admissible-future collapse;
- write the as-of join condition and state an intraday timing policy; and
- design a paired chronological test of incremental text value.

Then audit this procedure:

> A researcher downloads the current version of every 10-K from a vendor
> database and fits a TF-IDF vocabulary on all of them. Each filing is dated
> by its fiscal year-end. A generic sentiment lexicon scores tone, and the
> score is used to predict the stock's return over the quarter that ends at
> the fiscal year-end. A random 80/20 split gives 80% directional accuracy. The
> researcher then swaps in “FinBERT,” reports that it is two points more
> accurate, and concludes that text adds value.

A strong answer should identify the latest-snapshot archive (revision
leakage), the vocabulary fitted on test documents, dating by subject period
instead of availability and feature-ready time, a target interval already
realized before the filing existed (timestamp leakage), the unvalidated
generic lexicon, a random split that hides lexical shift and duplicate
firm-years, an unidentified checkpoint compared only on accuracy, and the
missing paired comparison with a numeric baseline on later observations.
