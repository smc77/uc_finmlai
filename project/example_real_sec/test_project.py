"""Fast integrity tests for the real-SEC Week 14 worked example.

These tests use committed derived artifacts and small in-memory fixtures. They do
not contact the SEC or download the FinBERT checkpoint.
"""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

import numpy as np
import pandas as pd

import analysis
import download_sec_data as downloader


ROOT = Path(__file__).resolve().parent
DERIVED = ROOT / "data" / "derived"
SHA256 = re.compile(r"^[0-9a-f]{64}$")


class ParsingTests(unittest.TestCase):
    def test_html_cleaner_removes_code_and_preserves_cells(self) -> None:
        raw = b"<style>hide</style><p>Revenue&nbsp;</p><table><tr><td>Q1</td><td>$10</td></tr></table>"
        cleaned = downloader.clean_html(raw)
        self.assertNotIn("hide", cleaned)
        self.assertIn("Revenue", cleaned)
        self.assertIn("Q1 | $10", cleaned)

    def test_release_selection_prefers_described_ex_991(self) -> None:
        documents = [
            {"type": "EX-99.2", "sequence": "3", "filename": "other.htm", "description": "Other"},
            {"type": "EX-99.1", "sequence": "2", "filename": "release.htm", "description": "Quarterly results"},
            {"type": "10-K", "sequence": "1", "filename": "annual.htm", "description": "Annual report"},
        ]
        self.assertEqual(downloader.select_release(documents)["filename"], "release.htm")

    def test_future_outcome_link_is_forward_and_split_is_frozen(self) -> None:
        events = [
            {"cik": "1", "ticker": "T", "quarter_end": "2023-12-31", "decision_time_utc": "2024-01-10T10:00:00Z",
             "current_yoy_growth": 0.10, "current_label_available_date": "2024-01-12", "accession_number": "a"},
            {"cik": "1", "ticker": "T", "quarter_end": "2024-03-31", "decision_time_utc": "2024-04-10T10:00:00Z",
             "current_yoy_growth": 0.20, "current_label_available_date": "2024-04-12", "accession_number": "b"},
        ]
        linked = downloader.add_future_outcomes(events, "2024-01-01")
        self.assertEqual(len(linked), 1)
        self.assertEqual(linked[0]["target_next_quarter_yoy_growth"], 0.20)
        self.assertEqual(linked[0]["outcome_accession_number"], "b")
        self.assertEqual(linked[0]["split"], "test")


class ArtifactTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.events = pd.read_csv(DERIVED / "sec_events.csv", dtype={"cik": str})
        cls.scored = pd.read_csv(DERIVED / "scored_events.csv", dtype={"cik": str})
        cls.summary = json.loads((DERIVED / "summary.json").read_text())
        cls.model = json.loads((DERIVED / "scored_events.model.json").read_text())

    def test_frozen_cohort_shape_and_keys(self) -> None:
        self.assertEqual(len(self.events), 68)
        self.assertEqual((self.events["split"] == "development").sum(), 45)
        self.assertEqual((self.events["split"] == "test").sum(), 23)
        self.assertEqual(self.events["ticker"].nunique(), 6)
        self.assertFalse(self.events["accession_number"].duplicated().any())

    def test_information_clock_is_forward(self) -> None:
        decision = pd.to_datetime(self.events["decision_time_utc"], utc=True).dt.date
        outcome = pd.to_datetime(self.events["outcome_available_date"]).dt.date
        quarter = pd.to_datetime(self.events["outcome_quarter_end"]).dt.date
        self.assertTrue((outcome > decision).all())
        self.assertTrue((quarter > pd.to_datetime(self.events["quarter_end"]).dt.date).all())

    def test_source_hashes_and_urls_are_recorded(self) -> None:
        for column in ("release_sha256", "filing_header_sha256", "exhibit_sha256"):
            self.assertTrue(self.events[column].map(lambda value: bool(SHA256.fullmatch(str(value)))).all())
        self.assertTrue(self.events["exhibit_url"].str.startswith("https://www.sec.gov/Archives/").all())
        self.assertTrue(self.events["filing_header_url"].str.startswith("https://www.sec.gov/Archives/").all())

    def test_pinned_model_and_probability_contract(self) -> None:
        self.assertEqual(self.model["model"], analysis.MODEL_ID)
        self.assertEqual(self.model["revision"], analysis.MODEL_REVISION)
        self.assertEqual(self.model["observations"], 68)
        probabilities = self.scored[[
            "finbert_positive_probability", "finbert_negative_probability", "finbert_neutral_probability"
        ]].sum(axis=1)
        self.assertTrue(np.allclose(probabilities, 1.0, atol=2e-6))
        self.assertTrue(self.scored["finbert_windows"].between(1, analysis.MAX_WINDOWS).all())

    def test_committed_point_estimates_recompute(self) -> None:
        test = self.scored[self.scored["split"] == "test"]
        lexicon = analysis.rank_ic(test["lexicon_score"], test["target_next_quarter_yoy_growth"])
        finbert = analysis.rank_ic(test["finbert_score"], test["target_next_quarter_yoy_growth"])
        self.assertAlmostEqual(lexicon, self.summary["test"]["lexicon_ic"], places=12)
        self.assertAlmostEqual(finbert, self.summary["test"]["finbert_ic"], places=12)
        self.assertAlmostEqual(finbert - lexicon, self.summary["test"]["finbert_minus_lexicon_ic"], places=12)


if __name__ == "__main__":
    unittest.main()
