"""Shared pipeline for the worked example: does transformer sentiment beat a lexicon at
predicting post-filing drift?

Self-contained and reproducible. Uses **synthetic filings** (a stand-in for real SEC EDGAR
text, so the example runs offline with no API and a fixed seed) that carry a planted tone
with a known truth, plus a realistic timestamp structure so the leakage lesson is concrete.
The sentiment model is **FinBERT** when `transformers`+`torch` are installed; otherwise a
deterministic text-reader stand-in, so the notebook always runs. The baseline is a small
Loughran-McDonald-style lexicon.

Imported by analysis.ipynb; not meant to be edited by students — the point is the notebook.
"""
from __future__ import annotations

import numpy as np

RNG = np.random.default_rng(20260718)

# --- a tiny sentiment vocabulary (positive / negative finance sentences) -----
_POS = ["Revenue grew strongly.", "Margins expanded this quarter.", "Demand exceeded expectations.",
        "We raised full-year guidance.", "Free cash flow improved markedly.", "Backlog reached a record."]
_NEG = ["Revenue declined sharply.", "Margins compressed this quarter.", "Demand fell short of plan.",
        "We cut full-year guidance.", "Free cash flow deteriorated.", "We recorded a large impairment."]
_NEUTRAL = ["The board declared the usual dividend.", "The filing was submitted on schedule.",
            "Headcount was broadly unchanged.", "The company operates in several segments.",
            "Capital expenditure was in line with prior guidance."]

# small lexicon for the BASELINE (deliberately shallow)
_LEX_POS = {"grew", "expanded", "exceeded", "raised", "improved", "record", "strong", "strongly"}
_LEX_NEG = {"declined", "compressed", "short", "cut", "deteriorated", "impairment", "sharply"}


def make_filings(n: int = 1200):
    """Generate n synthetic filings with a latent tone and a realistic timestamp/return
    structure. Returns a dict of arrays aligned by document.

    Truth we set by hand:
      * `tone` in [-1, 1] is the filing's real sentiment.
      * an **announcement** return hits at the filing date and is strongly driven by tone
        (the market reacts to the news) — you could NOT have traded it before the filing.
      * a faint **post-filing drift** over the next 20 days is weakly driven by tone — this
        is the only thing genuinely predictable *after* the information is public.
    """
    tone = np.clip(RNG.normal(0, 0.6, n), -1, 1)
    period_end = np.arange(n) * 3            # a toy calendar (days); one filing every 3 days
    filing_lag = 45
    filing_date = period_end + filing_lag

    announcement = 0.030 * tone + 0.010 * RNG.standard_normal(n)   # big, tone-driven, pre-public
    drift = 0.004 * tone + 0.012 * RNG.standard_normal(n)          # faint, post-public (tradeable)

    texts = [_compose(t) for t in tone]
    return {"tone": tone, "text": texts, "period_end": period_end, "filing_date": filing_date,
            "announcement": announcement, "drift": drift}


def _compose(tone: float) -> str:
    """Build a short filing text whose pos/neg sentence mix encodes the tone."""
    n_sent = 6
    p_pos = 0.5 + 0.45 * tone
    sents = []
    for _ in range(n_sent):
        u = RNG.random()
        if u < 0.34:
            sents.append(RNG.choice(_NEUTRAL))
        elif RNG.random() < p_pos:
            sents.append(RNG.choice(_POS))
        else:
            sents.append(RNG.choice(_NEG))
    return " ".join(sents)


# --- the two "models" that read the text -------------------------------------
def lexicon_score(texts) -> np.ndarray:
    """BASELINE: net (positive − negative) lexicon hits, normalized. Shallow on purpose."""
    out = np.empty(len(texts))
    for i, doc in enumerate(texts):
        w = doc.lower().replace(".", "").split()
        pos = sum(x in _LEX_POS for x in w)
        neg = sum(x in _LEX_NEG for x in w)
        out[i] = (pos - neg) / max(pos + neg, 1)
    return out


def finbert_score(texts) -> tuple[np.ndarray, str]:
    """MODEL: FinBERT sentiment in [-1, 1] if transformers+torch are available; otherwise a
    deterministic richer-lexicon stand-in. Returns (scores, backend_name)."""
    try:  # real FinBERT
        from transformers import pipeline
        clf = pipeline("sentiment-analysis", model="ProsusAI/finbert", truncation=True)
        out = np.empty(len(texts))
        for i, doc in enumerate(texts):
            r = clf(doc)[0]
            sign = {"positive": 1.0, "negative": -1.0, "neutral": 0.0}[r["label"].lower()]
            out[i] = sign * float(r["score"])
        return out, "FinBERT (ProsusAI/finbert)"
    except Exception:
        # Fallback: a richer lexicon over the full pos/neg sentence vocabulary — still reads
        # the *text*, distinct from the shallow baseline, deterministic. Stands in for FinBERT
        # so the notebook runs without torch. Install transformers+torch to use the real model.
        pos_words = set(" ".join(_POS).lower().replace(".", "").split())
        neg_words = set(" ".join(_NEG).lower().replace(".", "").split())
        pos_words -= {"this", "quarter", "we", "the"}
        neg_words -= {"this", "quarter", "we", "the"}
        out = np.empty(len(texts))
        for i, doc in enumerate(texts):
            w = doc.lower().replace(".", "").split()
            p = sum(x in pos_words for x in w)
            n = sum(x in neg_words for x in w)
            out[i] = (p - n) / max(p + n, 1)
        return out, "lexicon stand-in (install transformers+torch for real FinBERT)"


def rank_ic(pred, actual) -> float:
    p = np.argsort(np.argsort(np.asarray(pred, float))).astype(float)
    a = np.argsort(np.argsort(np.asarray(actual, float))).astype(float)
    p -= p.mean(); a -= a.mean()
    d = np.sqrt((p**2).sum() * (a**2).sum())
    return float((p * a).sum() / d) if d else np.nan


def long_short_return(score, fut, cost_bps=10.0):
    """Daily long-short: long the top tercile of `score`, short the bottom, net of a simple
    per-rebalance cost. Returns the net return series."""
    s = np.asarray(score, float); f = np.asarray(fut, float)
    hi, lo = np.quantile(s, 2 / 3), np.quantile(s, 1 / 3)
    pos = (s >= hi).astype(float) - (s <= lo).astype(float)
    pos /= max(np.abs(pos).sum(), 1)
    gross = pos * f
    turnover = np.abs(np.diff(pos, prepend=0)).sum()
    return gross - (cost_bps / 1e4) * turnover / len(f)
