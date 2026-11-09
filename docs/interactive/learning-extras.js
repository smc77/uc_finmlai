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
    analogy: "A newspaper may describe yesterday, but you cannot trade on its story before the paper is delivered. The delivery time, not the date inside the story, controls availability.",
    tryIt: {
      title: "Build a point-in-time information set",
      description: "Join each decision date only to records that had actually become available by then.",
      library: {
        label: "Python · pandas merge_asof",
        code: `import pandas as pd

releases = pd.DataFrame({
    "available": pd.to_datetime(["2026-02-15", "2026-03-20", "2026-05-10"]),
    "value": [10.0, 10.4, 11.1]
}).sort_values("available")
decisions = pd.DataFrame({
    "decision": pd.to_datetime(["2026-02-01", "2026-03-01", "2026-04-01"])
})

point_in_time = pd.merge_asof(decisions, releases,
                              left_on="decision", right_on="available",
                              direction="backward")
print(point_in_time)`
      },
      scratch: {
        label: "Python · availability filtering with lists",
        code: `from datetime import date

releases = [(date(2026, 2, 15), 10.0),
            (date(2026, 3, 20), 10.4),
            (date(2026, 5, 10), 11.1)]
decisions = [date(2026, 2, 1), date(2026, 3, 1), date(2026, 4, 1)]

for decision in decisions:
    eligible = [(stamp, value) for stamp, value in releases if stamp <= decision]
    latest = max(eligible, default=None, key=lambda row: row[0])
    print(decision, latest)`
      },
      notebook: "information-clock.ipynb"
    }
  },
  "regression-classification": {
    takeaway: "Choose the model output for the decision: a magnitude, a ranking score, or a probability are not interchangeable.",
    analogy: "A weather service can estimate tomorrow’s temperature, rank cities by rain risk, or report a 70% chance of rain. Carrying an umbrella is a separate decision made from that output.",
    tryIt: {
      title: "Fit one numerical target and one event target",
      description: "Generate one simulated signal, then compare a regression estimate with a classification probability.",
      library: {
        label: "Python · scikit-learn",
        code: `import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression

rng = np.random.default_rng(7)
X = rng.normal(size=(200, 1))
y_return = 0.02 * X[:, 0] + rng.normal(0, 0.03, 200)
y_up = (y_return > 0).astype(int)

reg = LinearRegression().fit(X, y_return)
clf = LogisticRegression().fit(X, y_up)
print(reg.predict([[1.0]])[0], clf.predict_proba([[1.0]])[0, 1])`
      },
      scratch: {
        label: "Python · equations implemented with NumPy",
        code: `import numpy as np

rng = np.random.default_rng(7)
x = rng.normal(size=200)
y_return = 0.02 * x + rng.normal(0, 0.03, 200)
y_up = (y_return > 0).astype(float)
X = np.c_[np.ones(len(x)), x]

beta = np.linalg.solve(X.T @ X, X.T @ y_return)
w = np.zeros(2)
for _ in range(2000):
    probability = 1 / (1 + np.exp(-(X @ w)))
    w -= 0.1 * (X.T @ (probability - y_up)) / len(x)

new = np.array([1.0, 1.0])
print(new @ beta, 1 / (1 + np.exp(-(new @ w))))`
      },
      notebook: "regression-classification.ipynb"
    }
  },
  "trees": {
    takeaway: "A tree partitions with rules, a forest averages unstable trees, and boosting adds corrections to current errors.",
    analogy: "A tree is one rule-based reviewer. A forest asks many varied reviewers and averages them. Boosting gives the next reviewer the cases the current panel still gets wrong.",
    tryIt: {
      title: "Fit successive trees to a nonlinear signal",
      description: "Compare a single shallow tree with gradient boosting on the same simulated relationship.",
      library: {
        label: "Python · scikit-learn",
        code: `import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import GradientBoostingRegressor

rng = np.random.default_rng(5)
X = rng.uniform(-2, 2, size=(250, 1))
y = np.sin(3 * X[:, 0]) + rng.normal(0, 0.15, 250)

tree = DecisionTreeRegressor(max_depth=2).fit(X, y)
boost = GradientBoostingRegressor(max_depth=2, n_estimators=40).fit(X, y)
print(tree.score(X, y), boost.score(X, y))`
      },
      scratch: {
        label: "Python · residual boosting with NumPy",
        code: `import numpy as np

rng = np.random.default_rng(5)
x = rng.uniform(-2, 2, 250)
y = np.sin(3 * x) + rng.normal(0, 0.15, 250)
prediction = np.full(len(y), y.mean())

for _ in range(40):
    residual = y - prediction
    best = None
    for threshold in np.linspace(-1.8, 1.8, 30):
        left = residual[x <= threshold].mean()
        right = residual[x > threshold].mean()
        update = np.where(x <= threshold, left, right)
        error = np.mean((residual - update) ** 2)
        if best is None or error < best[0]:
            best = (error, update)
    prediction += 0.08 * best[1]

print(np.mean((y - prediction) ** 2))`
      },
      notebook: "trees-and-boosting.ipynb"
    }
  },
  "train-validate-test": {
    takeaway: "Training learns parameters, validation chooses the procedure, and the final test judges that frozen procedure once.",
    analogy: "Training is practice, validation is rehearsal, and testing is opening night. If opening-night feedback changes the performance, it has become another rehearsal.",
    tryIt: {
      title: "Construct chronological validation splits",
      description: "Create expanding training windows while preserving a final untouched block.",
      library: {
        label: "Python · finmlsim + scikit-learn",
        code: `import numpy as np
from finmlsim import simulate as sim
from sklearn.model_selection import TimeSeriesSplit

returns = sim.garch(n=120, seed=6)
X = returns[:-1, None]
y = returns[1:]

splitter = TimeSeriesSplit(n_splits=3, test_size=20)
for train, validation in splitter.split(X[:-20]):
    print(train[[0, -1]], validation[[0, -1]])
final_test = np.arange(len(X) - 20, len(X))
print("untouched test", final_test[[0, -1]])`
      },
      scratch: {
        label: "Python · expanding-window index construction",
        code: `n_rows = 119
test_size = 20
development_end = n_rows - test_size
validation_size = 20

for validation_end in range(development_end, validation_size, -validation_size):
    validation_start = validation_end - validation_size
    train = list(range(validation_start))
    validation = list(range(validation_start, validation_end))
    print("train", train[0], train[-1], "validate", validation[0], validation[-1])

test = list(range(development_end, n_rows))
print("untouched test", test[0], test[-1])`
      },
      notebook: "chronological-splits.ipynb"
    }
  },
  "metrics": {
    takeaway: "A metric is meaningful only when it measures the job the model output is supposed to perform.",
    analogy: "A speedometer can be perfectly accurate and still tell you nothing about fuel economy. Likewise, low forecast error need not imply good ranking, calibrated probabilities, or profitable trading.",
    tryIt: {
      title: "Measure rank, turnover, and net performance",
      description: "Score the same simulated panel at the prediction, position, and strategy levels.",
      library: {
        label: "Python · finmlsim metrics",
        code: `import numpy as np
from finmlsim import simulate as sim, metrics as met

returns = sim.panel(n=260, n_assets=20, seed=6)
prediction, actual = returns[:-1], returns[1:]
rank_ic = np.mean([met.rank_ic(p, a) for p, a in zip(prediction, actual)])
weights = prediction / np.abs(prediction).sum(axis=1, keepdims=True)
strategy = (weights * actual).sum(axis=1)

print("rank IC", round(rank_ic, 3))
print("turnover", round(met.turnover(weights), 3))
print("gross Sharpe", round(met.sharpe(strategy), 2))`
      },
      scratch: {
        label: "Python · metric formulas with NumPy",
        code: `import numpy as np
from finmlsim import simulate as sim

returns = sim.panel(n=260, n_assets=20, seed=6)
prediction, actual = returns[:-1], returns[1:]
rank = lambda x: np.argsort(np.argsort(x)).astype(float)
ics = [np.corrcoef(rank(p), rank(a))[0, 1] for p, a in zip(prediction, actual)]
weights = prediction / np.abs(prediction).sum(axis=1, keepdims=True)
turnover = np.abs(np.diff(weights, axis=0)).sum(axis=1).mean()
strategy = (weights * actual).sum(axis=1)
sharpe = np.sqrt(252) * strategy.mean() / strategy.std(ddof=1)

print("rank IC", round(np.mean(ics), 3))
print("turnover", round(turnover, 3))
print("gross Sharpe", round(sharpe, 2))`
      },
      notebook: "decision-metrics.ipynb"
    }
  },
  "optimization-unsupervised": {
    takeaway: "An optimizer solves the objective it receives; PCA and clustering learn sample structure, not economic usefulness.",
    analogy: "Organizing a library by book color can reveal real groups, but those groups may not help readers find a subject. Structure is genuine without necessarily serving the decision.",
    tryIt: {
      title: "Recover a common direction and two clusters",
      description: "Fit PCA and K-means to simulated correlated observations, then inspect what each procedure learned.",
      library: {
        label: "Python · finmlsim + scikit-learn",
        code: `import numpy as np
from finmlsim import simulate as sim
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

X = sim.panel(n=200, n_assets=2, seed=4)

pca = PCA(n_components=1).fit(X)
groups = KMeans(n_clusters=2, n_init=10, random_state=4).fit_predict(X)
print(pca.explained_variance_ratio_[0], np.bincount(groups))`
      },
      scratch: {
        label: "Python · finmlsim data + NumPy algorithms",
        code: `import numpy as np
from finmlsim import simulate as sim

X = sim.panel(n=200, n_assets=2, seed=4)
centered = X - X.mean(axis=0)

values, vectors = np.linalg.eigh(centered.T @ centered / len(X))
pc1 = vectors[:, values.argmax()]
centers = X[[0, 100]].copy()
for _ in range(20):
    distances = ((X[:, None, :] - centers[None, :, :]) ** 2).sum(axis=2)
    groups = distances.argmin(axis=1)
    centers = np.array([X[groups == k].mean(axis=0) for k in range(2)])

print(pc1, np.bincount(groups))`
      },
      notebook: "pca-and-clustering.ipynb"
    }
  },
  "portfolio": {
    takeaway: "Forecasts are inputs to a portfolio; risk, constraints, holdings, and costs determine the actual positions.",
    analogy: "Restaurant ratings do not determine how much of each dish belongs on your table. Price, allergies, balance, and what you already ordered still determine the portions.",
    tryIt: {
      title: "Turn expected returns into constrained weights",
      description: "Solve a tiny long-only mean–variance allocation and compare it with equal weighting.",
      library: {
        label: "Python · SciPy",
        code: `import numpy as np
from scipy.optimize import minimize

mu = np.array([0.08, 0.06, 0.04])
cov = np.array([[.04, .012, .006], [.012, .025, .008], [.006, .008, .016]])
risk_aversion = 3.0
objective = lambda w: -(w @ mu - risk_aversion * w @ cov @ w / 2)

result = minimize(objective, np.ones(3) / 3,
                  bounds=[(0, 1)] * 3,
                  constraints={"type": "eq", "fun": lambda w: w.sum() - 1})
print(result.x.round(3))`
      },
      scratch: {
        label: "Python · projected gradient ascent with NumPy",
        code: `import numpy as np

mu = np.array([0.08, 0.06, 0.04])
cov = np.array([[.04, .012, .006], [.012, .025, .008], [.006, .008, .016]])
risk_aversion = 3.0
w = np.ones(3) / 3

def project_to_simplex(values):
    ordered = np.sort(values)[::-1]
    cumulative = np.cumsum(ordered)
    rho = np.where(ordered * np.arange(1, len(values) + 1) > cumulative - 1)[0][-1]
    threshold = (cumulative[rho] - 1) / (rho + 1)
    return np.maximum(values - threshold, 0)

for _ in range(2000):
    gradient = mu - risk_aversion * cov @ w
    w = project_to_simplex(w + 0.05 * gradient)

print(w.round(3))`
      },
      notebook: "portfolio-optimization.ipynb"
    }
  },
  "neural-networks": {
    takeaway: "More representational capacity can fit more functions, but it does not create signal or guarantee generalization.",
    analogy: "A more powerful microscope can reveal finer structure, but it also magnifies dust. Capacity helps only when the data contain stable structure worth magnifying.",
    tryIt: {
      title: "Use a hidden layer to learn XOR",
      description: "Fit the classic pattern that a linear classifier cannot represent with one boundary.",
      library: {
        label: "Python · scikit-learn",
        code: `import numpy as np
from sklearn.neural_network import MLPClassifier

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([0, 1, 1, 0])

net = MLPClassifier(hidden_layer_sizes=(4,), activation="tanh",
                    max_iter=5000, random_state=3)
net.fit(X, y)
print(net.predict_proba(X)[:, 1].round(3))`
      },
      scratch: {
        label: "Python · forward and backward passes with NumPy",
        code: `import numpy as np

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], float)
y = np.array([[0], [1], [1], [0]], float)
rng = np.random.default_rng(3)
W1, b1 = rng.normal(0, .5, (2, 4)), np.zeros((1, 4))
W2, b2 = rng.normal(0, .5, (4, 1)), np.zeros((1, 1))

for _ in range(5000):
    hidden = np.tanh(X @ W1 + b1)
    probability = 1 / (1 + np.exp(-(hidden @ W2 + b2)))
    d2 = (probability - y) / len(X)
    gW2, gb2 = hidden.T @ d2, d2.sum(axis=0, keepdims=True)
    d1 = (d2 @ W2.T) * (1 - hidden ** 2)
    W1 -= 0.5 * X.T @ d1; b1 -= 0.5 * d1.sum(axis=0)
    W2 -= 0.5 * gW2; b2 -= 0.5 * gb2

print(probability.ravel().round(3))`
      },
      notebook: "neural-network-xor.ipynb"
    }
  },
  "pricing-hedging": {
    takeaway: "Learning a static pricing map and learning a sequence of hedge actions are different problems with different evidence.",
    analogy: "A map estimates where a destination is; driving chooses a new action after every turn, delay, and road condition. Pricing resembles the map, while hedging resembles the drive.",
    tryIt: {
      title: "Price once, then hedge through time",
      description: "Compare a Black–Scholes price and delta with the mechanics of a discrete hedge path.",
      library: {
        label: "Python · SciPy normal distribution",
        code: `import numpy as np
from scipy.stats import norm

spot, strike, rate, volatility, maturity = 100, 100, .03, .20, 1.0
d1 = (np.log(spot / strike) + (rate + volatility**2 / 2) * maturity) / (volatility * np.sqrt(maturity))
d2 = d1 - volatility * np.sqrt(maturity)
price = spot * norm.cdf(d1) - strike * np.exp(-rate * maturity) * norm.cdf(d2)
delta = norm.cdf(d1)

print("price", round(price, 2))
print("initial hedge shares", round(delta, 3))`
      },
      scratch: {
        label: "Python · normal CDF and hedge ledger from first principles",
        code: `import math, random

normal_cdf = lambda x: 0.5 * (1 + math.erf(x / math.sqrt(2)))
spot, strike, rate, vol, steps = 100.0, 100.0, .03, .20, 52
dt = 1 / steps
random.seed(9)

d1 = (math.log(spot / strike) + (rate + vol**2 / 2)) / vol
d2 = d1 - vol
price = spot * normal_cdf(d1) - strike * math.exp(-rate) * normal_cdf(d2)
shares = normal_cdf(d1)
cash = price - shares * spot

for step in range(steps):
    cash *= math.exp(rate * dt)
    spot *= math.exp((rate - vol**2 / 2) * dt + vol * math.sqrt(dt) * random.gauss(0, 1))
    if step < steps - 1:
        time_left = 1 - (step + 1) * dt
        d1 = (math.log(spot / strike) + (rate + vol**2 / 2) * time_left) / (vol * math.sqrt(time_left))
        new_shares = normal_cdf(d1)
        cash -= (new_shares - shares) * spot
        shares = new_shares

payoff = max(spot - strike, 0)
print("hedge error", round(cash + shares * spot - payoff, 2))`
      },
      notebook: "pricing-and-hedging.ipynb"
    }
  },
  "financial-text": {
    takeaway: "A text representation determines what the model can use, while the document clock determines when it may use it.",
    analogy: "A quotation is not evidence merely because it exists in an archive. You must know which edition contained it, when that edition arrived, and whether you preserved its words or only a summary.",
    tryIt: {
      title: "Turn short financial texts into features",
      description: "Fit a TF–IDF representation and a small sentiment classifier to illustrative documents.",
      library: {
        label: "Python · scikit-learn",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

docs = ["demand improved and margins expanded",
        "guidance fell as costs increased",
        "cash flow strengthened", "revenue missed expectations"]
y = [1, 0, 1, 0]

vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X = vectorizer.fit_transform(docs)
model = LogisticRegression().fit(X, y)
print(model.predict_proba(vectorizer.transform(["margins improved"]))[0, 1])`
      },
      scratch: {
        label: "Python · TF–IDF and logistic regression with NumPy",
        code: `import numpy as np

docs = ["demand improved and margins expanded", "guidance fell as costs increased",
        "cash flow strengthened", "revenue missed expectations"]
y = np.array([1, 0, 1, 0], float)
tokens = [doc.split() for doc in docs]
vocab = sorted(set(word for doc in tokens for word in doc))
counts = np.array([[doc.count(word) for word in vocab] for doc in tokens], float)
idf = np.log((1 + len(docs)) / (1 + (counts > 0).sum(axis=0))) + 1
X = counts * idf
w = np.zeros(len(vocab))

for _ in range(2000):
    probability = 1 / (1 + np.exp(-(X @ w)))
    w -= 0.2 * X.T @ (probability - y) / len(y)

test = np.array([["margins improved".split().count(word) for word in vocab]]) * idf
print(1 / (1 + np.exp(-(test @ w)))[0])`
      },
      notebook: "financial-text.ipynb"
    }
  },
  "llm-systems": {
    takeaway: "An LLM’s reliability depends on context, verification, tools, and authority—not only on the decoder.",
    analogy: "Treat the model like an analyst inside a controlled research process. The reading room supplies evidence, calculators handle arithmetic, reviewers check claims, and an authority map limits action.",
    tryIt: {
      title: "Retrieve evidence before drafting an answer",
      description: "Rank a small dated reading room and return the evidence that a generated claim would need to cite.",
      library: {
        label: "Python · scikit-learn retrieval",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

documents = [
    "2026-02-10 filing: revenue rose 8 percent.",
    "2026-05-09 filing: operating margin fell to 14 percent.",
    "2026-05-12 call: management expects lower capital spending."
]
query = "What happened to operating margin?"
vectorizer = TfidfVectorizer().fit(documents + [query])
matrix = vectorizer.transform(documents + [query])
scores = cosine_similarity(matrix[-1], matrix[:-1]).ravel()
best = scores.argmax()
print("evidence:", documents[best])
print("citation: document", best + 1)`
      },
      scratch: {
        label: "Python · token-overlap retrieval and citation check",
        code: `import re

documents = ["2026-02-10 filing: revenue rose 8 percent.",
             "2026-05-09 filing: operating margin fell to 14 percent.",
             "2026-05-12 call: management expects lower capital spending."]
query = "What happened to operating margin?"
tokens = lambda text: set(re.findall(r"[a-z]+", text.lower()))
query_tokens = tokens(query)
scores = [len(query_tokens & tokens(document)) for document in documents]
best = max(range(len(documents)), key=scores.__getitem__)

answer = "Operating margin fell to 14 percent. [document 2]"
has_citation = f"[document {best + 1}]" in answer
print(documents[best])
print(answer, "verified citation:", has_citation)`
      },
      notebook: "retrieval-and-verification.ipynb"
    }
  },
  "execution": {
    takeaway: "A strategy is not implemented until desired positions become actual trades with impact, delay, and non-completion recorded.",
    analogy: "A route on a map is not the trip. Traffic, speed, detours, and missed turns determine when—and whether—you arrive, just as execution determines the realized position.",
    tryIt: {
      title: "Trade off impact against waiting risk",
      description: "Generate an Almgren–Chriss schedule, then reconstruct its declining inventory path.",
      library: {
        label: "Python · finmlsim Almgren–Chriss",
        code: `from finmlsim import simulate as sim

schedule = sim.almgren_chriss(X=1_000_000, T=1, N=20,
                              sigma=.02, eta=2.5e-6, lam=1e-6)
print("first five trades", schedule["n_trades"][:5].round())
print("expected cost", round(schedule["E_cost"]))
print("cost risk", round(schedule["sd_cost"]))`
      },
      scratch: {
        label: "Python · continuous-time schedule with NumPy",
        code: `import numpy as np

inventory, horizon, steps = 1_000_000, 1.0, 20
sigma, eta, risk_aversion = .02, 2.5e-6, 1e-6
kappa = np.sqrt(risk_aversion * sigma**2 / eta)
times = np.linspace(0, horizon, steps + 1)
holdings = inventory * np.sinh(kappa * (horizon - times)) / np.sinh(kappa * horizon)
trades = holdings[:-1] - holdings[1:]

print("first five trades", trades[:5].round())
print("ending inventory", round(holdings[-1]))`
      },
      notebook: "optimal-execution.ipynb"
    }
  },
  "reinforcement-learning": {
    takeaway: "Reinforcement learning values actions by both immediate reward and the future states those actions create.",
    analogy: "This is closer to chess than a slot machine. A move matters not only for what it wins now, but for the positions and choices it leaves available next.",
    tryIt: {
      title: "Learn action values in a tiny changing state",
      description: "Use Gymnasium for a standard environment, then expose the same Q-learning update in a five-state world built from scratch.",
      library: {
        label: "Python · Gymnasium FrozenLake",
        code: `import gymnasium as gym
import numpy as np

rng = np.random.default_rng(2)
env = gym.make("FrozenLake-v1", is_slippery=False)
env.action_space.seed(2)
Q = np.zeros((env.observation_space.n, env.action_space.n))

for episode in range(5000):
    state, _ = env.reset(seed=episode)
    done = False
    while not done:
        action = env.action_space.sample() if rng.random() < 0.3 else Q[state].argmax()
        next_state, reward, terminated, truncated, _ = env.step(action)
        target = reward + 0.95 * Q[next_state].max() * (not terminated)
        Q[state, action] += 0.2 * (target - Q[state, action])
        state = next_state
        done = terminated or truncated

print("start-state values", Q[0].round(3))`
      },
      scratch: {
        label: "Python · Q-learning with lists and random",
        code: `import random

random.seed(2)
Q = [[0.0, 0.0] for _ in range(5)]
for episode in range(1000):
    state = 0
    while state < 4:
        explore = random.random() < 0.2
        action = random.randrange(2) if explore else max(range(2), key=lambda a: Q[state][a])
        next_state = min(4, state + (2 if action else 1))
        reward = 1.0 if next_state == 4 else -0.02
        target = reward + 0.95 * max(Q[next_state])
        Q[state][action] += 0.2 * (target - Q[state][action])
        state = next_state

for state, values in enumerate(Q):
    print(state, [round(value, 3) for value in values])`
      },
      notebook: "reinforcement-learning.ipynb"
    }
  },
  "causal-policy": {
    takeaway: "Observed outcomes do not reveal what would have happened under the action that was not taken.",
    analogy: "Seeing that one patient recovered after treatment does not reveal whether that same patient would have recovered without it. The missing alternative requires a design or assumption.",
    tryIt: {
      title: "Estimate a difference in differences",
      description: "Simulate treated and comparison groups, then recover the treatment effect from their change over time.",
      library: {
        label: "Python · statsmodels",
        code: `import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

rng = np.random.default_rng(8)
n = 200
frame = pd.DataFrame({
    "treated": np.repeat([0, 1], 2 * n),
    "post": np.tile(np.repeat([0, 1], n), 2)
})
frame["outcome"] = 10 + frame.treated + frame.post + 2.5 * frame.treated * frame.post + rng.normal(0, 1, len(frame))
model = smf.ols("outcome ~ treated * post", data=frame).fit()
print(model.params["treated:post"])`
      },
      scratch: {
        label: "Python · four cell means with NumPy",
        code: `import numpy as np

rng = np.random.default_rng(8)
control_pre = rng.normal(10, 1, 200)
control_post = control_pre + 1 + rng.normal(0, .3, 200)
treated_pre = rng.normal(11, 1, 200)
treated_post = treated_pre + 1 + 2.5 + rng.normal(0, .3, 200)

did = (treated_post.mean() - treated_pre.mean()) - (control_post.mean() - control_pre.mean())
print(f"Estimated treatment effect: {did:.2f}")`
      },
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
