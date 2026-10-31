# Week 11 Summary — LLM Systems, Adaptation, and Inference Economics

Use this as a short review map for Week 11. The lecture, slides, demos, and book
chapters remain the full source. The quiz is open-book and open-note, but
individual and without AI assistance.

Week 10 established which financial documents were historically admissible.
Week 11 asks what happens when a language model receives that evidence:

> **Part A — decoder, evidence, and authority.** What does the language model
> contribute, what must the surrounding system supply, and where do evidence
> and permission enter?

> **Part B — context, adaptation, and inference economics.** What should change
> when the system fails: instructions, retrieved evidence, model parameters,
> tools, or the amount of inference computation?

Four properties must not be collapsed:

1. **Fluency is not support.** A decoder can produce a plausible continuation
   without a recoverable record for the claim.
2. **Available evidence is not faithful use.** Retrieval can place the correct
   passage in context while the generator omits it, misreads it, cites the
   wrong span, or violates the answer contract.
3. **A supported proposal is not authority.** A model may extract a correct
   fact or propose a sensible action without permission to write, execute,
   trade, or pay.
4. **More computation is not automatically worth buying.** Select the
   inference procedure from quality, cost, latency, verification, and the loss
   caused by errors.

## Core ideas

### The decoder and the larger system (Part A)

1. **A pretrained decoder predicts the next token.** Its training objective can
   reward useful linguistic regularities without explicitly requiring source
   recovery, historical admissibility, refusal, tool authorization, or correct
   financial action.
2. **Post-training changes behavior, not the basic system boundary.**
   Instruction tuning and preference optimization can make a model more
   helpful and more likely to follow directions. A deployed assistant still
   needs evidence, validation, policy, and authority supplied by the
   application around it.
3. **The answer space must contain the null state.** If a model must choose one
   of five sectors for an identifier that has no valid record, its
   probabilities still sum to one. Better calibration over an incomplete
   answer space does not establish that the record exists.
4. **Typed state makes handoffs inspectable.** A claim should carry fields such
   as metric, value, unit, period, source identifier, source span, and
   availability. Downstream code can validate those fields instead of trying
   to recover the operative assertion from prose.
5. **An edge in a system graph is an information contract.** Record the state
   object crossing it, the version that produced it, the checks that apply, and
   who owns failure. A final fluent answer otherwise hides where the error
   entered.
6. **Partial evidence and permission are separate.** In Demo 0, two of three
   workers completed and the system reported usable partial coverage. The
   missing policy worker left the action blocked. A recoverable research result
   did not silently become authority to act.

### Parametric memory and the dated reading room

7. **Parametric memory has an information clock.** A model trained on material
   extending through 2025 may contain associations with outcomes that were
   unknown in a 2021 backtest.
8. **A lagged dataframe is not a complete historical research process.**
   Retrospective information can enter through feature extraction, hypothesis
   generation, strategy choice, or the model's interpretation of historical
   text even when the final numeric columns are lagged correctly.
9. **A model cutoff is not one date.** Pretraining, instruction tuning,
   preference data, retrieval indexes, tools, and model updates can have
   different clocks. Freeze the complete system version and name the control
   aimed at each suspected information channel.
10. **RAG supplies a dated reading room beside the dissolved library.** The
    retrieval packet should preserve the decision time, document identity,
    version, hash, recoverable span, rank, score, and admissible availability.
11. **Retrieval rank is not claim verification.** Retrieval answers which
    passages entered the packet. Claim evaluation asks whether a particular
    passage supports a particular assertion.
12. **The packet can change with the date.** In Demo 1, revenue was $4.2 from
    source A2 at day 20. At day 50, a declared supersession rule admitted the
    later amendment B1 and returned $3.8. The answer changed because the
    admissible evidence changed, not because the system silently replaced
    history with the latest version.
13. **Cite or refuse is a system contract.** A material factual claim should be
    attached to a recoverable supporting span or declared unsupported. A
    refusal is useful output when the permitted packet does not contain the
    answer.
14. **Retrieval does not guarantee contract compliance.** In Demo 1a, a pinned
    generator invented values without evidence. With the dated packet it
    recovered the supplied revenue and margin, but omitted required citations.
    It substantively refused the absent employee-count question while missing
    the exact required refusal format.
15. **Contradictory evidence needs a declared policy.** Return both values with
    their dates, apply a prespecified supersession rule, or escalate. Silently
    choosing the more convenient number is not provenance.

### Extraction, selection, and authority

16. **LLM extraction creates candidate fields.** A prompt and schema can quickly
    produce a proposed metric, value, period, source, and span. The candidate
    still needs support checks, labeled evaluation, and later validation.
17. **An extracted feature inherits two memories.** One is the document's
    passport and availability. The other is the model's parametric
    associations. Names, dates, products, quotations, and numbers can reconnect
    historical text to later events.
18. **Keep a transparent extraction baseline.** A lexical rule or small
    task-specific classifier is an important comparison even when a language
    model is more flexible. The richer extractor must demonstrate incremental
    value under the same evidence and labels.
19. **Cheap proposals increase search, not evidence.** Prompts, schemas, model
    variants, retries, transformations, and thresholds are candidate trials.
    Record every attempted path, not only the winning prompt.
20. **Selection is not later-test evidence.** Demo 1b selected guidance-v2
    from three candidates at validation score 0.84. That records a development
    choice; it does not establish later generalization.
21. **Support does not create authority.** Demo 1b extracted a supported
    FY2026 revenue-growth change from 8% to 10%, but the proposed database write
    remained blocked because approved was false.
22. **Tool use crosses an authority boundary.** Separate observation,
    proposal, independent approval, bounded execution, and postcondition
    verification. Record the exact arguments, approver, response,
    side-effect identifier, exception, and rollback or compensation path.
23. **Idempotency must be enforced downstream.** An idempotency key written only
    in a prompt does not prevent a duplicate order. The executor or downstream
    service must recognize the key and decline the second side effect.

### Context changes a frozen model (Part B)

24. **In-context learning changes behavior without updating base weights.**
    Instructions, demonstrations, evidence, output schemas, and prior turns
    jointly specify a temporary task.
25. **Examples teach more than labels.** They can communicate which field
    matters, how to normalize periods and units, when to refuse, and which
    output syntax to use. They can also teach a mistake.
26. **Prompt order is fitted procedure.** Demonstration selection, ordering,
    wording, and formatting belong to the model-selection record. Searching
    fifty prompt layouts and retaining the best one spends validation evidence.
27. **Context capacity is not effective context use.** A model may accept a
    long context without using every position equally. More passages can bury
    the decisive span, introduce a conflicting period, repeat a misleading
    claim, or consume the budget needed for the answer.
28. **Demo 1c made context sensitivity observable.** On twelve paired
    questions, few-shot answer accuracy was 8/12, 1/12, and 2/12 when the
    relevant record appeared first, middle, and last under the original
    distractor order. Under reversed distractors it was 7/12, 2/12, and 1/12.
    This is a diagnostic for one pinned small model and task, not a universal
    ranking of positions.
29. **Use paired diagnostics.** With the original distractor order, seven
    questions moved from correct to wrong when the evidence moved from first
    to middle, and none moved in the opposite direction. Pairing shows whether
    an aggregate difference is broad or driven by a few unusual cases.
30. **Answer accuracy and citation identity are different metrics.** A model
    can return the right value without the expected source identifier, or the
    wrong value while naming the right document. Citation identity is still
    weaker than semantic entailment.
31. **Retrieved evidence is untrusted input.** Authentic documents can contain
    text that resembles an instruction. Authenticity does not grant permission
    to alter system policy or execute an action.

### Claim checks and evaluator limits

32. **Decompose fluent answers into atomic claims.** A sentence can contain a
    correct number, wrong metric, wrong period, and unsupported comparison at
    the same time. Whole-answer grading can hide the material error.
33. **Use four claim states.** A claim may be entailed, contradicted, absent
    from the permitted packet, or unscorable because the packet or claim is
    ambiguous.
34. **Faithfulness and world accuracy differ.** A statement can be true in the
    world but unsupported by the permitted historical packet. It can also be
    faithfully copied from a source that is itself wrong.
35. **Numeric overlap is a narrow screen.** Requiring answer digits to appear
    in context can reject an absent number. It cannot bind entity, metric,
    period, unit, sign, comparison, or negation.
36. **Challenge sets diagnose mechanisms.** On Demo 3's twelve designed cases,
    the exact-overlap rule achieved 50% accuracy, with four false supports and
    two missed supports. That stress result is not a production error-rate
    estimate.
37. **The evaluator is a model too.** Rule systems are brittle, trained
    classifiers can drift, and LLM judges can respond to position, verbosity,
    style, or shared-model preferences. Preserve blinded human labels and test
    meaning-preserving surface changes.
38. **Ground truth does not move when context order moves.** If a checker
    changes its support label merely because the same evidence moved, that
    reveals evaluator sensitivity rather than a changed correct label.

### Choose where adaptation lives

39. **Diagnose the missing object before choosing an intervention.** Current or
    private facts point to retrieval. Inconsistent syntax points to a schema or
    constrained output. Arithmetic points to a calculator. Repeated domain
    behavior may justify training only after simpler controls receive a fair
    test.
40. **Prompting and retrieval are complementary.** Prompting changes
    instructions, format, and demonstrations. Retrieval changes request-time
    evidence. Most grounded systems need both.
41. **Put changing facts in recoverable evidence.** A filing released this
    morning belongs in retrieval, not in a weight update.
42. **Change weights when repeated behavior is missing.** If good evidence,
    instructions, demonstrations, schemas, glossaries, and narrow baselines do
    not repair a stable mapping, an adapter or fine-tune becomes a candidate.
43. **Fine-tuning is a model-development project.** It introduces a training
    dataset, objective, optimizer, checkpoint-selection rule, storage, serving,
    and regression tests. It is not merely a long prompt performed once.
44. **LoRA learns a low-rank update.** For one frozen matrix,
    $W_{\text{effective}}=W_0+BA$. If the rank is $r$, the trainable parameter
    count is $r(d_{\text{in}}+d_{\text{out}})$ rather than
    $d_{\text{in}}d_{\text{out}}$.
45. **Rank is a capacity choice.** A rank that is too small cannot represent the
    desired update. Larger ranks add trainable parameters and storage, and the
    incremental approximation benefit can flatten.
46. **Trainable-parameter share is not total resource savings.** The frozen
    base still participates in the forward pass. Training memory, wall-clock
    time, and inference cost depend on activations, precision, batching,
    targeted matrices, and whether adapters are merged or served dynamically.
47. **Demo 4 illustrates capacity, not trained-LLM quality.** In the planted
    128-by-128 rank-six construction, rank 6 used 9.38% of full-matrix
    parameters and reduced relative update error to 0.077. Rank 8 crossed the
    10% budget while improving error only to 0.074. Real LoRA must optimize
    task loss and demonstrate later generalization.
48. **Structured output is a contract, not knowledge.** A valid JSON object can
    still contain the wrong number, period, or source. Structure makes the
    handoff testable; it does not prove support.

### Reasoning under an economic budget

49. **Inference-time compute has several forms.** A system can generate one
    deeper trajectory, sample several complete answers and reduce them, search
    partial candidates, call an external tool, or independently verify a
    result. These are different procedures.
50. **Reasoning is not verification.** A longer explanation can elaborate the
    same mistaken premise. Five samples from one model can share one systematic
    error; agreement is not an independent source.
51. **Use the right computational object.** Use a calculator for arithmetic, a
    dated source lookup for a current fact, a parser for schema validity, a
    deterministic rule for policy eligibility, and labeled review for semantic
    support.
52. **Every answer needs a budget ledger.** Record model and procedure version,
    input and output tokens, calls, tools, retries, checker work, human review,
    wall-clock and tail latency, and final disposition.
53. **Parallel calls separate compute from elapsed time.** Five calls can run
    concurrently, but completion still depends on the slowest call, queueing,
    rate limits, reducer work, retries, and review.
54. **Select by expected total loss, not token cost alone.** A simple policy
    comparison adds inference cost to the probability-weighted losses from a
    wrong or late answer. The application supplies those losses.
55. **Routing creates a complete path to evaluate.** A calculator can be
    reliable while the router misses eligible tasks or passes invalid
    arguments. Measure task classification, argument construction, tool
    execution, and fallback together.
56. **Demo 5's preferred policy depended on the contract.** With an illustrative
    eight-cent wrong-answer loss, the imperfect tool route had the lowest
    expected total loss at 0.0170. With a one-tenth-cent error loss, direct
    generation was preferred. Under a one-second latency limit, direct
    generation was the only feasible illustrated policy.
57. **The checker also spends budget.** A cheap generator followed by an
    expensive universal judge may not be the cheap system. Evaluator calls,
    source recovery, deterministic execution, and human adjudication all enter
    the operating ledger.
58. **Abstention is an economic choice.** Answer when evidence and checks agree,
    escalate disagreement to a stronger procedure, and refuse when expected
    loss exceeds the value of answering.

## Demo map

| Demo | Teaching job | Main output |
|---|---|---|
| 0 | Make partial failure visible | Typed node results, coverage, blocked action |
| 1 | Build a point-in-time packet | Dated passages, versions, hashes, refusal |
| 1a | Observe one real generator | Support, citation, refusal, and format failures |
| 1b | Separate extraction from authority | Candidate, trial ledger, blocked write |
| 1c | Test context position and examples | Paired answer and citation-ID counts |
| 2 | Apply a deterministic numeric gate | Supported answer and fabricated-value refusal |
| 3 | Audit the numeric gate | Confusion matrix and diagnosed false supports/misses |
| 4 | Audit the LoRA rank budget | Parameters versus planted update error |
| 5 | Choose an inference policy | Quality-cost-latency and expected-loss ledger |

## Terms and vocabulary

| Term | Plain-English meaning |
|---|---|
| **Decoder** | The component that predicts the next token from the preceding context. |
| **Parametric memory** | Associations encoded in model weights rather than recoverable source records. |
| **Working context** | Instructions, examples, evidence, tool results, and prior turns supplied for the current request. |
| **RAG** | Retrieval-augmented generation: supplying retrieved evidence to a generator at inference time. |
| **Typed state** | A structured handoff whose required fields and types can be checked. |
| **Cite or refuse** | Bind a material claim to a recoverable supporting span or declare it unsupported. |
| **In-context learning** | Behavior change caused by current instructions or examples without updating base weights. |
| **Atomic claim** | One independently checkable assertion extracted from a larger answer. |
| **Entailed** | Supported by the permitted evidence. |
| **Contradicted** | In conflict with the permitted evidence. |
| **Citation identity** | Whether the output names the expected source, scored separately from answer correctness. |
| **Fine-tuning** | Additional parameter training on task or domain examples. |
| **LoRA** | Low-Rank Adaptation: a learned low-rank update added to frozen base weights. |
| **Adapter rank** | The bottleneck dimension controlling LoRA update capacity and trainable-parameter count. |
| **Inference-time compute** | Computation spent after training through depth, samples, search, tools, or verification. |
| **Router** | A procedure that sends a request to a model, tool, checker, or escalation path. |
| **Expected total loss** | Inference expense plus probability-weighted error and delay consequences. |
| **Idempotency key** | A request identifier enforced downstream to prevent duplicate side effects. |

## Research protocol after Week 11

Carry forward the point-in-time document passport from Week 10, then add:

- freeze the decoder, prompt, demonstrations, ordering, retriever, adapter,
  tools, router, and evaluator as separate versioned components;
- preserve the exact permitted evidence packet and every generated output;
- decompose material answers into atomic claims and score support, citation,
  refusal, and format separately;
- test context order, distractors, answerability, negation, units, and
  conflicting versions on independent labels;
- keep a transparent extraction or classification baseline;
- count every prompt, schema, model, threshold, retry, and adapter candidate;
- choose prompting, retrieval, a schema, a narrow model, an adapter, or a tool
  from the diagnosed failure rather than from novelty;
- record trainable parameters separately from memory, time, tokens, latency,
  and total operating cost;
- evaluate the complete routed path, including misses, bad arguments, fallback,
  and human escalation; and
- keep evidence, adaptation, and authority records separate.

For the project and **Homework 6**, leave this week with the question, data
path, availability logic, fixed split and metric, simple working baseline, one
result table, and the updated research record. **Quiz 10** is due this week.
**Homework 7** opens as a deliberately narrow financial-text or LLM application
with a transparent baseline, fixed labeled fixture, adversarial cases, and a
refusal state.

## Common mistakes

Be able to explain why each statement is incomplete:

- “The model sounded confident, so it probably knew the fact.”
- “The correct filing was retrieved, so the answer is grounded.”
- “The answer cites a passage containing the same number.”
- “The model refused, so it obeyed the output contract.”
- “The dataframe is lagged, so a later-trained language model cannot leak.”
- “We tried only the winning prompt.”
- “The extracted value is supported, so the model may write it to the research database.”
- “The document is authentic, so instructions inside it are safe.”
- “The model has a large context window, so evidence position cannot matter.”
- “Five sampled answers agree, so the result has been independently verified.”
- “The JSON parsed successfully, so its content is correct.”
- “LoRA trains 90% fewer parameters, so every training and inference cost falls by 90%.”
- “Rank six was best in the matrix demo, so rank six is best for our application.”
- “The tool is correct, so tool routing is correct.”
- “The cheapest request is the cheapest decision.”

## Quiz check

You should be able to:

- distinguish a pretrained decoder from the RAG application around it;
- list the identity, span, version, hash, and time fields in a point-in-time packet;
- distinguish answer support, citation correctness, refusal correctness, and format compliance;
- explain why a later-trained model can contaminate a historical experiment;
- describe how in-context learning changes behavior without changing base weights;
- explain why prompt and evidence order belong to the fitted procedure;
- diagnose the limits of exact numeric overlap;
- choose among prompting, retrieval, schemas, tools, narrow models, LoRA, and full fine-tuning;
- calculate $r(d_{\text{in}}+d_{\text{out}})$ for one LoRA-adapted matrix;
- explain why trainable-parameter share is not total resource savings;
- distinguish additional reasoning from independent verification;
- calculate expected total loss from inference cost and wrong-answer loss;
- explain how router misses and invalid tool arguments affect the complete system; and
- state why a supported proposal still requires independent authority.

Then audit this procedure:

> A researcher asks a model trained through 2025 to analyze 2021 filings. The
> current vendor copy of each filing is retrieved, and the relevant passage is
> placed somewhere in a long prompt. The researcher tries many example orders
> and retains the one that performs best on the final questions. The system
> reports a number in valid JSON and cites a passage containing the same
> digits. Five sampled answers agree, so the response is written directly into
> the research database. The researcher reports only token price and concludes
> that the system is reliable and cheap.

A strong answer should identify the model-memory clock, latest-version
document risk, untested context-position sensitivity, prompt search on the
final set, the difference between valid structure and factual support, the
failure of digit overlap to bind meaning, correlated self-consistency rather
than independent verification, missing approval and executor controls, and an
incomplete economic ledger that omits checking, latency, failures, review, and
error consequences.
