# Week 2 Summary — What Could the Row Know?

Use this as a short review map for Quiz 2. The lecture, slides, and demos remain
the full source. The quiz is open-book and open-note, but individual and without
AI assistance.

Every modeling row makes a claim:

> At this decision time, these were the admissible inputs, transformed using
> only an admissible population, and paired with an outcome that occurred later.

That claim has three boundaries:

| Boundary | Question |
|---|---|
| **Memory** | What part of history does the feature keep, and what does it discard? |
| **Clock** | When did each input actually become available? |
| **Estimation population** | Which observations were allowed to fit transformations, select features, or estimate the model? |

## Core ideas

1. **A feature is a deliberately incomplete memory.** Momentum remembers net
   direction; volatility remembers the size of moves; drawdown remembers distance
   from a past peak. Every feature keeps something and discards something.
2. **A feature definition must include its clock.** State the source,
   availability, transformation, lookback or memory, unit, and hypothesis.
   For every historical row, ask for the latest timestamp touched anywhere in
   producing that feature. When the feature is relative, also name its comparison
   set beside the transformation.
3. **Transformations are part of the model—but not all transformations learn
   from a population.** A fixed `log(x)` or multiplication by 100 is stateless.
   Rolling volatility depends on a dated historical window. Standardization,
   estimated winsorization cutoffs, PCA, feature selection, and neutralization
   are fitted on a population, so their learned state belongs inside the
   training boundary.
4. **The target is a financial definition, not merely a column named `y`.** It
   specifies the decision time, feasible entry, outcome interval, horizon, and
   benchmark or cost convention. A label remains missing until its outcome has
   actually occurred.
5. **Historical research should be conducted as if you were alive then. A
   timestamp is not an information set.** July CPI describes July, is released
   in August, reaches a particular system later still, and may be revised again.
   An earlier row may use only the vintage available by its decision time.
6. **Leakage is an information path across a boundary.** Row-level look-ahead
   gives an individual row something it could not yet know, such as a future
   price, later revision, or future universe membership. Population-level
   leakage lets future or test observations influence a fitted scaler, selector,
   neutralization, or other learned operation.
7. **Make the boundary executable.** Use time-ordered splits, pipelines,
   backward as-of joins, dated universe membership, timestamp assertions, and
   the Future-Invariance Test: change tomorrow and verify that yesterday does
   not move.

The course's six-field feature definition is:

| Field | Question |
|---|---|
| **Source** | Where does the raw value come from? |
| **Availability** | When could the system first use it? |
| **Transformation** | What operation produces the feature, and is it fitted? |
| **Memory** | What historical window or state does it summarize? |
| **Unit** | What are the resulting dimensions? |
| **Hypothesis** | Why might this contain useful information? |

For an as-of join, choose the latest value available **by** the decision:

> **Jan 10: A available → Feb 5: decision → Feb 10: B available**
>
> The Feb 5 row receives **A**, even if B describes earlier economic activity.

## Terms and vocabulary

### Features and targets

| Term | Plain-English meaning |
|---|---|
| **Feature** | A number constructed from available inputs to represent one useful aspect of history or state. |
| **Feature definition** | The source, availability, transformation, memory, unit, and hypothesis behind a feature. |
| **Transformation** | A rule that changes an input's representation, scale, shape, or comparison group. |
| **Comparison set** | The observations used to decide what counts as high, low, unusual, or neutral. |
| **StandardScaler** | Centers with a mean and scales by a standard deviation; extreme values can strongly affect both. |
| **RobustScaler** | Centers with a median and scales by an interquartile range, so a few extremes affect the ruler less. |
| **Target / label** | The future quantity or event the row is asked to predict. |
| **Overlapping labels** | Nearby observations whose target intervals share future returns or events, creating mechanical dependence and reducing the amount of independent evidence. |

### Clocks, historical data, and leakage

| Term | Plain-English meaning |
|---|---|
| **Information set** | Everything that could actually have been known by a stated decision time. |
| **Economic or event time** | When the activity described by a value occurred; this is not necessarily when the value was known. |
| **Release time** | When a source first publishes a value. |
| **Availability time** | When the research or production system could actually use that value. |
| **Decision time** | When the forecast, trade, or other action is assumed to be fixed. Admissible inputs must satisfy `availability time ≤ decision time`. |
| **Vintage** | One historically published version of a value that may later be revised. |
| **Point-in-time data** | Data that preserve which value, vintage, and entity membership were available at each past decision. |
| **As-of join** | A join that selects the latest eligible record available no later than each decision, usually within each entity. |
| **Row-level look-ahead** | A historical row uses a value, vintage, or membership fact that was unavailable at its decision time. |
| **Population-level leakage** | A transformation or selection rule learns from observations outside its permitted training population. |
| **Survivorship bias** | Rebuilding the past with entities known today to have survived, while omitting failures and departures. |
| **Fit / transform** | Fit learns parameters from a population; transform applies those frozen parameters to rows. |
| **Pipeline** | A sequence that keeps fitted preprocessing and the model inside the correct training boundary. |
| **Forward split** | Training on earlier dates and evaluating on later dates to reproduce the production clock. |
| **Future invariance** | The requirement that changing data after a cutoff cannot alter correctly constructed pre-cutoff features. |

## Research protocol after Week 2

Keep the Week 1 evidence rules, and add the following to every modeling row:

- the decision time and latest admissible input;
- the identified data snapshot, source, availability, vintage, and dated
  universe rule;
- the population and cutoff used to fit every learned transformation;
- the feasible target start, target end, and label maturity time; and
- an executable timing assertion or Future-Invariance Test, together with what
  that test cannot certify.

## Quiz check

You should be able to:

- explain what a momentum feature remembers and what it discards;
- explain why `StandardScaler` and `RobustScaler` can give the same observation very
  different scaled values;
- identify which vintage is admissible for a stated historical decision;
- distinguish a stateless calculation from a transformation fitted on a
  population;
- explain why a random split answers a different question from repeated
  forecasting into the future; and
- explain what an as-of join or Future-Invariance Test can establish—and what it
  cannot certify.

Then audit this design:

> A researcher builds daily equity signals using today's index constituents,
> standardizes the features once over 2000–2025, trains on 2000–2018, and calls
> 2019–2025 the test period. A signal uses the close at date `t`; its label is the
> return over the next 21 trading days. Identify the information-boundary and
> dependence questions that must be resolved before the test score is credible.

A strong audit should examine universe history, the scaler's fitted population,
the exact decision and feasible execution times, overlap among the 21-day
labels, and whether any test result later influenced the procedure.
