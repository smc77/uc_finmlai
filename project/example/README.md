# Worked final-project example: two report pathways

A reproducible example showing the **two permitted final-report pathways** (see
[`../REPORT_PATHWAYS.md`](../REPORT_PATHWAYS.md)). Both use the same analysis
and answer the same methodological question:

> **Does transformer sentiment (FinBERT) predict post-filing drift better than a lexicon
> baseline — once we respect the filing timestamp and pay costs?**

The honest answer here is *barely*, and that disciplined negative result is
exactly the kind of finding the project rewards. Because the data are synthetic
and the committed offline run uses a deterministic stand-in, this is a model of
research structure and timing discipline—not evidence about real SEC filings or
FinBERT profitability.

## How the two pathways appear here

- **Pathway 1 — integrated Jupyter report:** `analysis.ipynb` combines the
  written argument, analysis, figures, limitations, references, and disclosure.
  A student may complete this route entirely in JupyterLab or Colab.
- **Pathway 2 — analysis plus separate paper:** `analysis.ipynb` produces the
  evidence, while `paper.qmd` turns it into a standalone paper and `slides.qmd`
  turns it into a presentation. A student may use Word, Google Docs, or another
  editor instead; Quarto is the demonstration tool, not a requirement.

## Files

| File | What it is |
|------|-----------|
| `analysis.ipynb` | The integrated-notebook route: exposition plus data → baseline → model → OOS evaluation → decision → limitations. Runs top to bottom. |
| `paper.qmd` | The separate-paper route, with abstract, related work, data/clock, design, results, robustness, limitations, conclusion, and references. |
| `paper.html` | Self-contained rendered paper; no Quarto installation is needed to read it. |
| `paper.docx` | Editable Word rendering of the same Quarto paper; no LaTeX installation is involved. |
| `references.bib` | Verified bibliography used by the paper. |
| `LITERATURE_MAP.md` | Development notes showing how each source affects the research design. |
| `RESEARCH_RECORD.md` | A filled evidence trail: information clock, protocol, decision log, results, limitations, and artifact links. |
| `slides.qmd` / `slides.html` | The Quarto presentation source and self-contained rendered slides. |
| `_pipeline.py` | Shared data generator + the two sentiment readers + metrics (imported by the notebook). |
| `figures/` | Figures written by the notebook and embedded in the slides. |

## Run it

```bash
pip install numpy pandas matplotlib scikit-learn jupyter
# optional, for the real model instead of the built-in fallback:
pip install transformers torch

cd project/example
jupyter lab analysis.ipynb                   # or: jupyter nbconvert --to notebook --execute --inplace analysis.ipynb
quarto render paper.qmd --to html            # demonstration only; students are not required to use Quarto
quarto render slides.qmd --to revealjs       # produces slides.html
```

Quarto can also render the paper to Word with `quarto render paper.qmd --to
docx`. PDF output may require an additional PDF engine; it is not necessary for
the course's integrated-notebook pathway.

## Two honest caveats (that make it a *model*, not a shortcut)

- **Synthetic filings.** The data is generated with a fixed seed so the example runs offline
  with no API and reproduces exactly. A real submission uses SEC EDGAR text — the *method*
  (point-in-time alignment, a baseline, time-aware evaluation, costs, limitations) is what
  transfers, not the data.
- **FinBERT is optional.** With `transformers`+`torch` installed the notebook uses the real
  `ProsusAI/finbert`; without them it falls back to a deterministic text-reader stand-in so
  it always runs. The pipeline and the conclusion are the same either way.

The interesting part is not the model — it is the **filing timestamp** (leakage inflates the
apparent signal ~5×) and whether any edge **survives out of sample, net of costs**.

The original example predates the course's research-record convention, so its filled record
explicitly discloses that the plan cannot be shown to precede the results. That is preferable to
inventing a freeze date. A student submission must include a real pre-lockbox commit.
