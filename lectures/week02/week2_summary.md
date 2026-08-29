# Week 2 Summary — What Could the Row Know?

Use this as a short review map for Quiz 2. The lecture, slides, and demos remain
the full source. The quiz is open-book and open-note, but individual and without
AI assistance.

## Core ideas

1. **A feature is a deliberately incomplete memory.** Momentum remembers net
   direction; volatility remembers the size of moves; drawdown remembers distance
   from a past peak. Every feature keeps something and discards something.
2. **A feature definition must include its clock.** State the source,
   availability, transformation, lookback or memory, unit, and intended idea.
   For every historical row, ask for the latest timestamp touched anywhere in
   producing that feature.
3. **Transformations are part of the model.** Scaling, winsorizing, ranking,
   filtering, and neutralizing change the representation and comparison set.
   Any transformation that learns from data must be fitted inside the training
   boundary.
4. **The target is a financial definition, not merely a column named `y`.** It
   specifies the decision time, feasible entry, outcome interval, horizon, and
   benchmark or cost convention. A label remains missing until its outcome has
   actually occurred.
5. **Historical research should be conducted as if you were alive then.** The
   economic date of a value is not necessarily its release or availability date.
   Later revisions and today's universe membership must not rewrite an earlier
   decision.
6. **Leakage is an information path across a boundary.** Future values can enter
   through features, targets, scaling statistics, feature selection, revised
   histories, surviving entities, or an unsuitable split—even when no code
   visibly says “use the future.”
7. **Make the boundary executable.** Use time-ordered splits, pipelines,
   backward as-of joins, dated universe membership, timestamp assertions, and
   the Future-Invariance Test: change tomorrow and verify that yesterday does
   not move.

## Terms and vocabulary

| Term | Plain-English meaning |
|---|---|
| **Feature** | A number constructed from available inputs to represent one useful aspect of history or state. |
| **Feature definition** | The source, availability, transformation, memory, unit, and intended idea behind a feature. |
| **Information set** | Everything that could actually have been known by a stated decision time. |
| **Lookback window** | The historical interval summarized by a feature. |
| **Transformation** | A rule that changes an input's representation, scale, shape, or comparison group. |
| **Comparison set** | The observations used to decide what counts as high, low, unusual, or neutral. |
| **Time-series z-score** | A value measured relative to an asset's own historical mean and standard deviation. |
| **Cross-sectional rank** | A value measured relative to other eligible entities at the same date. |
| **Neutralization** | Removing the part of a feature explained by stated exposures; this requires a fitted model and a dated eligible universe. |
| **StandardScaler** | Centers with a mean and scales by a standard deviation; extreme values can strongly affect both. |
| **RobustScaler** | Centers with a median and scales by an interquartile range, so a few extremes affect the ruler less. |
| **Target / label** | The future quantity or event the row is asked to predict. |
| **Forecast horizon** | The time from the permitted entry or target start to the target end. |
| **Overlapping labels** | Nearby targets that share part of the same future outcome interval and therefore are not independent evidence. |
| **Release time** | When a source first publishes a value. |
| **Availability time** | When the research or production system could actually use that value. |
| **Vintage** | One historically published version of a value that may later be revised. |
| **Point-in-time data** | Data that preserve which value, vintage, and entity membership were available at each past decision. |
| **Bitemporal data** | Data that keep both what time a fact describes and when that version of the fact was known. |
| **As-of join** | A join that selects the latest eligible record available no later than each decision, usually within each entity. |
| **Look-ahead leakage** | A historical feature or fitted object uses information that arrived after its decision time. |
| **Survivorship bias** | Rebuilding the past with entities known today to have survived, while omitting failures and departures. |
| **Fit / transform** | Fit learns parameters from a population; transform applies those frozen parameters to rows. |
| **Pipeline** | A sequence that keeps fitted preprocessing and the model inside the correct training boundary. |
| **Forward split** | Training on earlier dates and evaluating on later dates to reproduce the production clock. |
| **Future invariance** | The requirement that changing data after a cutoff cannot alter correctly constructed pre-cutoff features. |

## Quiz check

You should be able to explain:

- what a momentum feature remembers and what it discards;
- why `StandardScaler` and `RobustScaler` can give the same observation very
  different scaled values;
- why random cross-validation answers the wrong question for prospective
  time-series forecasting;
- which vintage is admissible for a stated historical decision;
- how survivorship, full-sample preprocessing, and full-sample feature selection
  leak information; and
- what a correct as-of join or Future-Invariance Test can establish—and what it
  cannot certify.

