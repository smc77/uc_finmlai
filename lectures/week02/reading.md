# Week 2 — Optional background

The lectures, slides, and driver are self-contained. These readings provide
derivations, historical context, and additional exercises; no assessment
depends on completing them.

## Aligned book chapters

- `../../books/ch06/chapter.md` — *Building Features: Families, Normalization,
  and Target Alignment*
- `../../books/ch05/chapter.md` — *The Leakage Taxonomy and Point-in-Time Data*

### Chapter 6 focus

- features as designed memories and six-field contracts;
- sources versus transformations;
- the transformation toolbox — scaling (StandardScaler, RobustScaler),
  distribution-shaping (PowerTransformer, QuantileTransformer), winsorizing,
  basis expansion (Polynomial, Spline), and filtering (SelectKBest) — each a
  *fitted* step that stays inside the training boundary;
- time-series scaling, cross-sectional comparison, and exposure neutralization;
- target definitions and timestamp alignment.

### Chapter 5 focus

- event, release, availability, decision, and vintage timestamps;
- look-ahead, survivorship, point-in-time, and target leakage;
- why a random split changes the estimand — you cannot shuffle financial data;
- the preprocessing boundary and information-set audit;
- as-of joins, changing universes, and future-invariance tests.

**Optional exercises:** Ch 6 exercises 1–4 and Ch 5 exercises 1–4.

## Further reading

- Lopez de Prado, *Advances in Financial Machine Learning*, chapters 2, 3, and 7
  (features, labeling, and the dangers of leakage).
- McLean and Pontiff (2016), “Does Academic Research Destroy Stock Return
  Predictability?”
- Bailey, Borwein, Lopez de Prado, and Zhu (2014), “Pseudo-Mathematics and
  Financial Charlatanism.”
- Green, Hand, and Zhang (2017), “The Characteristics that Provide Independent
  Information about Average US Monthly Stock Returns.”

## Suggested sequence

| AFTER | OPTIONAL FOLLOW-UP |
|:--|:--|
| Segment 1 (feature memories & contracts) | Ch 6 on sources, transformations, and contracts |
| Segment 2 (the transformation toolbox) | Ch 6 on scaling, shaping, filtering, and comparison sets |
| Segment 3 (targets & alignment) | Ch 6 on target definitions and timestamp invariants |
| Segment 4 (data biography & leakage) | Ch 5 on timestamps and the leakage taxonomy |
| Segment 5 (the preprocessing boundary) | Ch 5 on fit/transform and the information-set audit |
| Segment 6 (proving the boundary) | Ch 5 on PIT tables, universes, and future-invariance |
