# Week 2 — Optional background

The lectures, slides, and driver are self-contained. These readings provide
derivations, historical context, and additional exercises; no assessment
depends on completing them.

## Aligned book chapters

- Chapter 6 of *Financial Machine Learning and AI* — Building Features:
  Families, Normalization, and Target Alignment
- Chapter 5 of *Financial Machine Learning and AI* — The Leakage Taxonomy and
  Point-in-Time Data

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
- why a random temporal split changes the evaluation population; forward
  deployment requires a matching time-aware evaluation;
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

## Short technical companions

These primary sources were checked on November 12, 2026. Use them after the
local worked example; the links are optional, not additional quiz prerequisites.

- [scikit-learn: common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html):
  after Demo 7, identify which rows teach `fit` and which only pass through
  `transform`. Its feature-selection example is a useful additional leakage
  exercise; a pipeline still needs a suitable temporal split.
- [ALFRED: download formats](https://alfred.stlouisfed.org/help/downloaddata):
  after Demo 8, distinguish an observation date from the lifetime of its
  published version. Our GDP matrix uses release ages; it is not a calendar
  vintage triangle.
- [Kenneth French: book-to-market portfolio construction](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/Data_Library/det_form_btm.html):
  identify the fiscal-year book equity, December market equity, June formation,
  and later return interval before reading the formal portfolio description.
