# Financial Machine Learning and AI — Course Materials

Student repository for **Financial Machine Learning and AI** (FIN 7057), Carl H.
Lindner College of Business, University of Cincinnati.

Everything you need to run the course code lives here: each week's reading
guide, lecture notebook, and released homework assignment. Recorded lectures
and their slides are delivered through Canvas; this repository holds the files
you read or run alongside them.

**Start here:** run [`lectures/week00/setup.ipynb`](lectures/week00/setup.ipynb)
(the Week 0 setup check), and read [`docs/syllabus.pdf`](docs/syllabus.pdf) for
the schedule, grading, and policies.

**What the course covers:** [`docs/course_map.md`](docs/course_map.md) — one row
per week, with both lecture parts, what that week leaves you able to do, and
what is due.

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

Every example notebook carries an **"Open in Colab"** badge at the top. Click
the badge to open the public notebook directly; no private-repository
authorization is required.

For reference, the badge link format is
`https://colab.research.google.com/github/smc77/uc_finmlai/blob/main/<path-to-notebook>`.

## Layout

```
uc_finmlai/
  docs/
    syllabus.pdf         # course schedule, grading, policies
    course_map.md        # what each week covers, week by week
  lectures/              # one folder per week, released as the term progresses
    week00/
      setup.ipynb        # start here: environment + data check
      reading.md
    week01/
      week1_demos.ipynb  # notebook used during the lecture breaks
      reading.md         # this week's reading guide
  homework/              # homework assignments (released on the syllabus schedule)
    hw1/                 # starter notebook + README
  README.md
```

## The textbook is optional

The recorded lectures teach everything required for the homework and quizzes. The textbook,
*Financial Machine Learning and AI: Simulation, Signals, and Evaluation*, is
**optional** further reading for going deeper — it is not required, and no
assignment depends on it.
