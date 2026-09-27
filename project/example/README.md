# Worked final-project example

A complete, reproducible example at the **scope and structure expected of the final project**
(see `../README.md`). Topic:

> **Does transformer sentiment (FinBERT) predict post-filing drift better than a lexicon
> baseline — once we respect the filing timestamp and pay costs?**

The honest answer here is *barely*, and that disciplined negative result is exactly the kind
of finding the project rewards.

## Files

| File | What it is |
|------|-----------|
| `analysis.ipynb` | The analysis notebook: data → features → baseline → model → OOS evaluation → decision → limitations. Runs top to bottom. |
| `RESEARCH_RECORD.md` | A filled evidence trail: information clock, protocol, decision log, results, limitations, and artifact links. |
| `slides.qmd` | The presentation (Quarto → reveal.js), ~10 slides telling the research story. |
| `_pipeline.py` | Shared data generator + the two sentiment readers + metrics (imported by the notebook). |
| `figures/` | Figures written by the notebook and embedded in the slides. |

## Run it

```bash
pip install numpy pandas matplotlib scikit-learn jupyter
# optional, for the real model instead of the built-in fallback:
pip install transformers torch

cd project/example
jupyter lab analysis.ipynb                   # or: jupyter nbconvert --to notebook --execute --inplace analysis.ipynb
quarto render slides.qmd --to revealjs       # produces slides.html
```

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
