# Literature map for the worked example

This compact map shows how prior research changes the question and design. It is
not a substitute for the synthesized discussion in `paper.qmd`.

| Source | Question and evidence | Main finding | Relevance to this example |
|---|---|---|---|
| Loughran and McDonald (2011) | Financial dictionaries applied to 10-K text | General dictionaries misclassify financially meaningful language; a domain-specific dictionary is more appropriate | Motivates the transparent lexicon baseline |
| Tetlock (2007) | Media pessimism and aggregate market outcomes | Text-derived pessimism is associated with return and trading-volume dynamics in the reported sample | Establishes an early finance use of quantified language while underscoring that the downstream outcome must be specified |
| Jegadeesh and Wu (2013) | Alternative weighting of words in financial documents | Term weighting can materially affect measured document tone and its market association | Shows that the baseline itself is a modeling choice and motivates transparent score construction |
| Araci (2019) | Domain-adapted BERT on financial sentiment datasets | A finance-adapted language model improves financial sentiment classification in the reported benchmarks | Motivates a contextual candidate reader, but does not establish return predictability |
| Huang, Wang, and Yang (2023) | Finance-specific language modeling and labeled financial-text tasks | FinBERT improves several text-classification tasks relative to dictionary and conventional ML methods | Sharpens the distinction between text-classification accuracy and a downstream investment result |
| Cohen, Malloy, and Nguyen (2020) | Changes in corporate filings and later firm outcomes/returns | Changes in filing language contain information associated with later outcomes and returns | Establishes that filing text can contain market-relevant information while leaving timestamp and implementation questions central |

The worked example therefore asks a narrower downstream question than the
language-model papers: after a filing is public, does the more complex text
reader improve a feasible return-ranking decision relative to a finance-specific
lexicon? Because the data are synthetic, the example demonstrates the research
design and timing failure mode; it does not provide empirical evidence about
actual SEC filings or FinBERT profitability.
