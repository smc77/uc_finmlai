window.COURSE_LEARNING_EXTRAS = {
  "research-path": {
    takeaway: "A useful result depends on every link from dated information to an implemented decision and later evidence.",
    analogy: "Think of the research path as a relay race. A brilliant model is one fast runner, but the team still loses if data, implementation, or evaluation drops the baton."
  },
  "six-words": {
    takeaway: "Define the row, feature, target, model, baseline, and test before writing model code.",
    analogy: "Treat a prediction problem like a labeled card: who or what is this card about, what was written on it at the time, what future answer belongs on the back, and what simple rule must the model beat?"
  },
  "information-clock": {
    takeaway: "A value becomes usable when it was available to the decision process—not when the period it describes ended.",
    analogy: "A newspaper may describe yesterday, but you cannot trade on its story before the paper is delivered. The delivery time, not the date inside the story, controls availability."
  },
  "regression-classification": {
    takeaway: "Choose the model output for the decision: a magnitude, a ranking score, or a probability are not interchangeable.",
    analogy: "A weather service can estimate tomorrow’s temperature, rank cities by rain risk, or report a 70% chance of rain. Carrying an umbrella is a separate decision made from that output.",
    tryIt: {
      title: "Fit one numerical target and one event target",
      description: "Generate one simulated signal, then compare a regression estimate with a classification probability.",
      language: "Python · scikit-learn",
      code: `import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression

rng = np.random.default_rng(7)
X = rng.normal(size=(200, 1))
y_return = 0.02 * X[:, 0] + rng.normal(0, 0.03, 200)
y_up = (y_return > 0).astype(int)

reg = LinearRegression().fit(X, y_return)
clf = LogisticRegression().fit(X, y_up)
print(reg.predict([[1.0]])[0], clf.predict_proba([[1.0]])[0, 1])`,
      notebook: "regression-classification.ipynb"
    }
  },
  "trees": {
    takeaway: "A tree partitions with rules, a forest averages unstable trees, and boosting adds corrections to current errors.",
    analogy: "A tree is one rule-based reviewer. A forest asks many varied reviewers and averages them. Boosting gives the next reviewer the cases the current panel still gets wrong.",
    tryIt: {
      title: "Fit successive trees to a nonlinear signal",
      description: "Compare a single shallow tree with gradient boosting on the same simulated relationship.",
      language: "Python · scikit-learn",
      code: `import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import GradientBoostingRegressor

rng = np.random.default_rng(5)
X = rng.uniform(-2, 2, size=(250, 1))
y = np.sin(3 * X[:, 0]) + rng.normal(0, 0.15, 250)

tree = DecisionTreeRegressor(max_depth=2).fit(X, y)
boost = GradientBoostingRegressor(max_depth=2, n_estimators=40).fit(X, y)
print(tree.score(X, y), boost.score(X, y))`,
      notebook: "trees-and-boosting.ipynb"
    }
  },
  "train-validate-test": {
    takeaway: "Training learns parameters, validation chooses the procedure, and the final test judges that frozen procedure once.",
    analogy: "Training is practice, validation is rehearsal, and testing is opening night. If opening-night feedback changes the performance, it has become another rehearsal."
  },
  "metrics": {
    takeaway: "A metric is meaningful only when it measures the job the model output is supposed to perform.",
    analogy: "A speedometer can be perfectly accurate and still tell you nothing about fuel economy. Likewise, low forecast error need not imply good ranking, calibrated probabilities, or profitable trading."
  },
  "optimization-unsupervised": {
    takeaway: "An optimizer solves the objective it receives; PCA and clustering learn sample structure, not economic usefulness.",
    analogy: "Organizing a library by book color can reveal real groups, but those groups may not help readers find a subject. Structure is genuine without necessarily serving the decision.",
    tryIt: {
      title: "Recover a common direction and two clusters",
      description: "Fit PCA and K-means to simulated correlated observations, then inspect what each procedure learned.",
      language: "Python · scikit-learn",
      code: `import numpy as np
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

rng = np.random.default_rng(4)
factor = rng.normal(size=(200, 1))
X = factor @ np.array([[1.0, 0.7]]) + rng.normal(0, 0.25, (200, 2))

pca = PCA(n_components=1).fit(X)
groups = KMeans(n_clusters=2, n_init=10, random_state=4).fit_predict(X)
print(pca.explained_variance_ratio_[0], np.bincount(groups))`,
      notebook: "pca-and-clustering.ipynb"
    }
  },
  "portfolio": {
    takeaway: "Forecasts are inputs to a portfolio; risk, constraints, holdings, and costs determine the actual positions.",
    analogy: "Restaurant ratings do not determine how much of each dish belongs on your table. Price, allergies, balance, and what you already ordered still determine the portions.",
    tryIt: {
      title: "Turn expected returns into constrained weights",
      description: "Solve a tiny long-only mean–variance allocation and compare it with equal weighting.",
      language: "Python · SciPy",
      code: `import numpy as np
from scipy.optimize import minimize

mu = np.array([0.08, 0.06, 0.04])
cov = np.array([[.04, .012, .006], [.012, .025, .008], [.006, .008, .016]])
risk_aversion = 3.0
objective = lambda w: -(w @ mu - risk_aversion * w @ cov @ w / 2)

result = minimize(objective, np.ones(3) / 3,
                  bounds=[(0, 1)] * 3,
                  constraints={"type": "eq", "fun": lambda w: w.sum() - 1})
print(result.x.round(3))`,
      notebook: "portfolio-optimization.ipynb"
    }
  },
  "neural-networks": {
    takeaway: "More representational capacity can fit more functions, but it does not create signal or guarantee generalization.",
    analogy: "A more powerful microscope can reveal finer structure, but it also magnifies dust. Capacity helps only when the data contain stable structure worth magnifying.",
    tryIt: {
      title: "Use a hidden layer to learn XOR",
      description: "Fit the classic pattern that a linear classifier cannot represent with one boundary.",
      language: "Python · scikit-learn",
      code: `import numpy as np
from sklearn.neural_network import MLPClassifier

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([0, 1, 1, 0])

net = MLPClassifier(hidden_layer_sizes=(4,), activation="tanh",
                    max_iter=5000, random_state=3)
net.fit(X, y)
print(net.predict_proba(X)[:, 1].round(3))`,
      notebook: "neural-network-xor.ipynb"
    }
  },
  "pricing-hedging": {
    takeaway: "Learning a static pricing map and learning a sequence of hedge actions are different problems with different evidence.",
    analogy: "A map estimates where a destination is; driving chooses a new action after every turn, delay, and road condition. Pricing resembles the map, while hedging resembles the drive."
  },
  "financial-text": {
    takeaway: "A text representation determines what the model can use, while the document clock determines when it may use it.",
    analogy: "A quotation is not evidence merely because it exists in an archive. You must know which edition contained it, when that edition arrived, and whether you preserved its words or only a summary.",
    tryIt: {
      title: "Turn short financial texts into features",
      description: "Fit a TF–IDF representation and a small sentiment classifier to illustrative documents.",
      language: "Python · scikit-learn",
      code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

docs = ["demand improved and margins expanded",
        "guidance fell as costs increased",
        "cash flow strengthened", "revenue missed expectations"]
y = [1, 0, 1, 0]

vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X = vectorizer.fit_transform(docs)
model = LogisticRegression().fit(X, y)
print(model.predict_proba(vectorizer.transform(["margins improved"]))[0, 1])`,
      notebook: "financial-text.ipynb"
    }
  },
  "llm-systems": {
    takeaway: "An LLM’s reliability depends on context, verification, tools, and authority—not only on the decoder.",
    analogy: "Treat the model like an analyst inside a controlled research process. The reading room supplies evidence, calculators handle arithmetic, reviewers check claims, and an authority map limits action."
  },
  "execution": {
    takeaway: "A strategy is not implemented until desired positions become actual trades with impact, delay, and non-completion recorded.",
    analogy: "A route on a map is not the trip. Traffic, speed, detours, and missed turns determine when—and whether—you arrive, just as execution determines the realized position."
  },
  "reinforcement-learning": {
    takeaway: "Reinforcement learning values actions by both immediate reward and the future states those actions create.",
    analogy: "This is closer to chess than a slot machine. A move matters not only for what it wins now, but for the positions and choices it leaves available next.",
    tryIt: {
      title: "Learn action values in a tiny changing state",
      description: "Run tabular Q-learning in a five-state environment and watch future value propagate backward.",
      language: "Python · NumPy",
      code: `import numpy as np

rng = np.random.default_rng(2)
Q = np.zeros((5, 2))
for episode in range(1000):
    state = 0
    while state < 4:
        action = rng.integers(2) if rng.random() < 0.2 else Q[state].argmax()
        next_state = min(4, state + (2 if action else 1))
        reward = 1.0 if next_state == 4 else -0.02
        Q[state, action] += 0.2 * (reward + 0.95 * Q[next_state].max() - Q[state, action])
        state = next_state
print(Q.round(3))`,
      notebook: "reinforcement-learning.ipynb"
    }
  },
  "causal-policy": {
    takeaway: "Observed outcomes do not reveal what would have happened under the action that was not taken.",
    analogy: "Seeing that one patient recovered after treatment does not reveal whether that same patient would have recovered without it. The missing alternative requires a design or assumption.",
    tryIt: {
      title: "Estimate a difference in differences",
      description: "Simulate treated and comparison groups, then recover the treatment effect from their change over time.",
      language: "Python · NumPy",
      code: `import numpy as np

rng = np.random.default_rng(8)
control_pre = rng.normal(10, 1, 200)
control_post = control_pre + 1 + rng.normal(0, .3, 200)
treated_pre = rng.normal(11, 1, 200)
treated_post = treated_pre + 1 + 2.5 + rng.normal(0, .3, 200)

did = (treated_post.mean() - treated_pre.mean()) - (control_post.mean() - control_pre.mean())
print(f"Estimated treatment effect: {did:.2f}")`,
      notebook: "difference-in-differences.ipynb"
    }
  },
  "governance": {
    takeaway: "Governance defines purpose, ownership, authority, monitoring, escalation, change, and retirement around the model.",
    analogy: "An aircraft needs more than an engine. It also needs a flight plan, qualified pilots, instruments, maintenance rules, and emergency procedures. A deployed model needs the same surrounding discipline."
  },
  "evidence-chain": {
    takeaway: "The final product is a reproducible, bounded claim—not a winning metric detached from how it was produced.",
    analogy: "Think of the evidence chain as a receipt for the conclusion. Every important ingredient, choice, cost, comparison, and limitation must remain traceable when someone checks the total."
  }
};
