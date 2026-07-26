# Financial Machine Learning and AI — Course Materials

Student repository for **Financial Machine Learning and AI** (FIN 70xx), Carl H.
Lindner College of Business, University of Cincinnati.

Everything you need to run the course code lives here: the weekly lecture
notebooks and the homework assignments. **The lectures are self-contained** —
this repository is simply where you run the code they walk through.

## Getting started

1. **Clone the repository** (once):
   ```bash
   git clone https://github.com/smc77/uc_finmlai.git
   cd uc_finmlai
   ```
2. **Pull each week** — new lecture notebooks and homework are released weekly:
   ```bash
   git pull
   ```
3. **Install the companion package** used throughout the course:
   ```bash
   pip install finmlsim
   ```

## Running notebooks in Google Colab

Every example notebook carries an **"Open in Colab"** badge at the top. Because
this repository is private, authorize Colab to read your GitHub the first time:

- In Colab, choose **File → Open notebook → GitHub**, tick
  **"Include private repositories,"** and authorize when prompted.
- After that, the Colab badge on each notebook opens it directly.

For reference, the badge link format is
`https://colab.research.google.com/github/smc77/uc_finmlai/blob/main/<path-to-notebook>`.

## Layout

```
uc_finmlai/
  notebooks/        # weekly lecture notebooks (released each week)
    weekNN_*.ipynb
  homework/         # homework assignments (released on the syllabus schedule)
    hwN/
  README.md
```

## The textbook is optional

The lectures teach everything required for the homework and quizzes. The textbook,
*Financial Machine Learning and AI: Simulation, Signals, and Evaluation*, is
**optional** further reading for going deeper — it is not required, and no
assignment depends on it.
