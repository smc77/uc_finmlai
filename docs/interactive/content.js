window.COURSE_ATLAS = {
  chapters: [
    {
      number: "I",
      title: "Frame the experiment",
      description: "Before choosing an algorithm, define the row, the information boundary, the future outcome, and the decision the research is meant to support.",
      topics: ["research-path", "six-words", "information-clock"]
    },
    {
      number: "II",
      title: "Learn without fooling yourself",
      description: "Models differ in form, but all of them learn from a development sample. Honest comparison requires chronology, baselines, and metrics tied to the intended use.",
      topics: ["regression-classification", "trees", "train-validate-test", "metrics", "optimization-unsupervised"]
    },
    {
      number: "III",
      title: "Turn estimates into decisions",
      description: "Forecasts acquire financial meaning only through position sizing, risk, sequential actions, and evaluation of what was actually implemented.",
      topics: ["portfolio", "neural-networks", "pricing-hedging"]
    },
    {
      number: "IV",
      title: "Work with language and action",
      description: "Text, LLMs, execution, and reinforcement learning extend the same discipline to documents, tool-using systems, market frictions, and changing states.",
      topics: ["financial-text", "llm-systems", "execution", "reinforcement-learning"]
    },
    {
      number: "V",
      title: "Make the claim defensible",
      description: "Prediction is not intervention, a model is not authority, and a result is not complete until its evidence, limits, ownership, and implementation remain visible.",
      topics: ["causal-policy", "governance", "evidence-chain"]
    }
  ],

  topics: [
    {
      id: "research-path",
      title: "One question, one research path",
      chapter: 0,
      week: "Course spine",
      minutes: "4 min",
      question: "Which stocks will outperform next month—and what would justify acting on that answer?",
      thesis: "Financial machine learning is not a parade of algorithms. It is a chain that turns dated information into a decision and then asks later evidence whether the complete procedure helped.",
      essay: [
        "Begin with the decision, not the model. A portfolio manager has prices, filings, analyst reports, and earnings calls, but none of those records is yet a usable research design. The work begins by deciding what one row represents, what could have been known at that moment, what later outcome matters, and how a model output would alter an action.",
        "Every method in the course occupies one or more positions on this path. Feature engineering turns records into measurements. Regression, trees, and networks estimate outcomes. Portfolio construction and execution convert estimates into holdings. Evaluation and governance determine what may be claimed and what may be done. A sophisticated component cannot rescue a broken chain around it."
      ],
      method: [
        ["Input", "Dated prices, filings, text, market states, and other records"],
        ["Transformation", "Features, models, decision rules, and implementation policies"],
        ["Output", "An actual financial action—not merely a score"],
        ["Evidence", "Later, untouched observations evaluated against a feasible baseline"]
      ],
      figure: {
        type: "pipeline",
        title: "Follow one claim from source to evidence",
        description: "Select a stage to see the question that keeps it honest.",
        stages: ["Information", "Features", "Prediction", "Decision", "Implementation", "Evidence"],
        notes: [
          "What existed at the decision time, in the version then available?",
          "Which measurements were built, and on which sample were their transformations fitted?",
          "What numerical quantity, score, probability, or representation did the model produce?",
          "How did the output change an action, threshold, or position size?",
          "What actually traded, at what cost, under which constraints?",
          "Which later observations judged the frozen procedure, and what baseline did it beat?"
        ]
      },
      failures: [
        ["Model-first research", "Choosing an exciting algorithm before specifying the decision encourages a search for any favorable metric."],
        ["Broken handoffs", "A useful forecast can disappear inside poor sizing, excessive turnover, or an impossible execution assumption."],
        ["Partial evaluation", "Judging only prediction accuracy hides costs, risk, authority, and whether anyone could have acted on the result."]
      ],
      questions: [
        "What precise decision changes if the model output changes?",
        "Which component is being improved, and which surrounding components are held fixed?",
        "What simple end-to-end procedure is the relevant opponent?"
      ],
      case: "A model that raises rank correlation but doubles turnover may be a better forecaster and a worse strategy. The research path forces both statements onto the same page.",
      lecture: "lectures/week01"
    },
    {
      id: "six-words",
      title: "The six words that unlock the course",
      chapter: 0,
      week: "Weeks 1–2",
      minutes: "5 min",
      question: "What exactly is one example, what does the model know, and what later answer is it trying to predict?",
      thesis: "Row, feature, target, model, baseline, and test are enough to expose most ambiguities before they become code.",
      essay: [
        "A row is one case at one decision time: perhaps stock ABC on 31 January. Features are the clues admissible at that time, such as trailing return and volatility. The target is the later answer—February return—not another descriptive column. A model is the fitted rule that maps the eligible features to an output.",
        "A baseline is a feasible, simpler opponent: predict zero excess return, carry the previous forecast, or use a transparent momentum rank. Test data are observations kept outside every choice until the whole procedure is fixed. If a test result changes the features, hyperparameters, threshold, or story, that period has become development data."
      ],
      method: [
        ["Row", "One security × one decision date"],
        ["Features", "Only information available before that decision"],
        ["Target", "The later outcome the procedure is trained to estimate"],
        ["Comparison", "A baseline and genuinely untouched test"]
      ],
      figure: {
        type: "row",
        title: "Read one research row",
        description: "Switch the emphasis between what was knowable and what arrived later.",
        modes: ["Features", "Target"],
        notes: [
          "Past return and volatility are admissible only if their windows end before the 31 January decision.",
          "Next-month return is the answer used for learning and evaluation. It is not available when the January forecast is made."
        ]
      },
      failures: [
        ["An undefined row", "Mixing firms, events, and dates without a stable unit makes splits and metrics hard to interpret."],
        ["A target disguised as a feature", "Future returns, revised labels, or post-event summaries can quietly enter the input table."],
        ["A weak opponent", "Beating an irrelevant baseline says little about whether the added complexity earns its cost."]
      ],
      questions: [
        "Can every feature value be reconstructed as it stood at the row's decision time?",
        "Is the target aligned to the economic horizon of the proposed action?",
        "Would a practitioner have been able to run the baseline under the same constraints?"
      ],
      case: "For a 31 January stock-selection row, trailing 12-month return may be a feature; February return may be the target; a simple momentum rank may be the baseline; the following calendar year may be the untouched test.",
      lecture: "lectures/week02"
    },
    {
      id: "information-clock",
      title: "Every row has an information clock",
      chapter: 0,
      week: "Weeks 1–2",
      minutes: "5 min",
      question: "When did a value describe, when was it published, and when could the research system actually use it?",
      thesis: "Subject period, release time, revision time, and feature-ready time are different clocks. Historical research must respect the latest of them.",
      essay: [
        "A fiscal quarter may end in December, its filing may appear in February, and a vendor may correct the record in March. A January strategy cannot use any version of that filing. A February strategy can use the original release but not the March correction. The period a value describes is not the date it became public.",
        "The same rule applies to fitted transformations. A scaler, vocabulary, principal component, feature selector, or imputation rule has its own training window. If it learns from future rows and is then projected backward, the visible columns may look properly lagged while the representation itself contains future information. Point-in-time research versions both values and transformations."
      ],
      method: [
        ["Subject time", "The period the fact describes"],
        ["Availability", "The first time the original record was public"],
        ["Version", "The value actually present at that historical moment"],
        ["Feature-ready", "When ingestion and fitted transformations made it usable"]
      ],
      figure: {
        type: "timeline",
        title: "Move the decision date through the record",
        description: "The admissible data change as the clock advances.",
        points: ["Dec 31\nPeriod ends", "Jan 31\nDecision A", "Feb 15\nFiling released", "Mar 10\nVendor revision"],
        modes: ["January decision", "February decision", "March decision"],
        active: [1, 2, 3],
        notes: [
          "No filing value is admissible in January, even though the filing describes December.",
          "The original February release is admissible; the March correction is not.",
          "The revised value becomes admissible only from the revision date forward."
        ]
      },
      failures: [
        ["Period-date leakage", "Treating the end of an accounting period as the date its contents were known."],
        ["Latest-vintage history", "Using today's corrected database as if every revision had always existed."],
        ["Transformation leakage", "Fitting normalization, PCA, text vocabularies, or selection rules on the full sample."]
      ],
      questions: [
        "Which timestamp controls admissibility for each source?",
        "Can the original and revised versions be distinguished?",
        "Which preprocessing objects need to be fitted again in each walk-forward window?"
      ],
      case: "A December earnings figure released on 15 February belongs to the December subject period but to the February information set. A backtest must join on availability, not merely on fiscal period.",
      lecture: "lectures/week02"
    },
    {
      id: "regression-classification",
      title: "Regression and classification ask different questions",
      chapter: 1,
      week: "Weeks 3–4",
      minutes: "6 min",
      question: "Do we need an estimate of magnitude, a ranking score, or reliable odds for an event?",
      thesis: "Regression estimates a number; classification estimates an event or class. A score, a calibrated probability, and an action threshold are distinct objects.",
      essay: [
        "Regression might estimate next-month return. OLS provides a transparent linear baseline, while ridge and lasso trade bias for stability in noisy, correlated features. Classification might estimate whether a stock will outperform. Its raw score can order cases without representing a probability.",
        "Calibration asks whether stated odds match frequencies among comparable cases. A threshold then turns the probability into an action, and that threshold should reflect payoffs, false positives, and missed opportunities. Neither regression coefficients nor classifier outputs establish causality: they describe fitted predictive relationships under the supplied data and design."
      ],
      method: [
        ["Regression input", "Features paired with a numerical target"],
        ["Classification input", "Features paired with an event label"],
        ["Model output", "Magnitude, score, or calibrated probability"],
        ["Decision layer", "A ranking, threshold, or sizing rule tied to consequences"]
      ],
      figure: {
        type: "comparison",
        title: "Fit the function, then choose the action",
        description: "Step through gradient updates. In classification, move the threshold independently of the fitted probability curve.",
        modes: ["Magnitude", "Score", "Probability"],
        panels: [
          ["Regression", "+1.4%", "An estimate of next-month return; useful when magnitude affects sizing."],
          ["Classifier score", "0.73", "A relative signal; useful for ordering, not automatically for odds."],
          ["Calibrated probability", "64%", "A claim about event frequency; combine with payoffs to choose a threshold."]
        ]
      },
      failures: [
        ["Score–probability confusion", "A monotone score may rank perfectly while badly misstating event odds."],
        ["Default thresholding", "A 0.5 cutoff is a software convention, not a decision analysis."],
        ["Coefficient storytelling", "A predictive coefficient can reflect correlation, selection, and omitted variables rather than an intervention effect."]
      ],
      questions: [
        "Does the decision depend on magnitude, order, or event odds?",
        "Was probability calibration evaluated on later data?",
        "How do false positives and false negatives enter economic value?"
      ],
      case: "A trading desk may use a return forecast to size positions, a score to form quantiles, or a calibrated probability to trade only when expected payoff exceeds costs. Those are three different systems.",
      lecture: "lectures/week04"
    },
    {
      id: "trees",
      title: "Trees add flexible rules",
      chapter: 1,
      week: "Week 5",
      minutes: "5 min",
      question: "When does a threshold or interaction matter more than a smooth linear effect?",
      thesis: "A tree learns if–then regions, a forest averages unstable trees, and boosting adds small corrections in sequence.",
      essay: [
        "A decision tree can express a rule such as momentum helping only when volatility is low. Deeper trees create more local partitions and more opportunities to memorize accidents. A random forest reduces one tree's instability by averaging many trees trained with randomized rows or features.",
        "Gradient boosting builds an additive model sequentially: each new shallow tree improves the current ensemble's loss. Depth, learning rate, and stopping time are development choices. Tree importance records how the fitted model used a feature; it is not evidence that changing that feature would change the outcome. Trees also extrapolate poorly beyond the regions seen in training."
      ],
      method: [
        ["Tree", "Recursive threshold questions define local prediction regions"],
        ["Forest", "Randomization plus averaging reduces variance"],
        ["Boosting", "Sequential weak learners correct the current ensemble"],
        ["Validation", "Depth, features, learning rate, and stopping are chosen later in time"]
      ],
      figure: {
        type: "comparison",
        title: "Three ways to use simple trees",
        description: "Move between the individual rule, the average, and the sequence.",
        modes: ["Tree", "Forest", "Boosting"],
        panels: [
          ["One partition", "If vol < 20%…", "Readable thresholds and interactions; high sensitivity to small sample changes."],
          ["Many partitions", "Average 500 trees", "Diverse errors can cancel; interpretation shifts from one rule to an ensemble."],
          ["Ordered corrections", "Base + step₁ + step₂", "Each learner targets what the current model still gets wrong; stopping controls overfit."]
        ]
      },
      failures: [
        ["Uncontrolled depth", "Small leaves can encode noise, rare cases, or identifier-like patterns."],
        ["Importance as mechanism", "Split gain or permutation importance does not identify a causal driver."],
        ["Ignoring extrapolation", "Tree predictions remain combinations of learned regions, even when the economic state moves beyond them."]
      ],
      questions: [
        "What nonlinear structure is the tree family intended to capture?",
        "Did the forest or booster beat a linear and a simple tree baseline on later data?",
        "How stable are rankings and importance across windows and seeds?"
      ],
      case: "If momentum works only below a volatility threshold, a tree can represent the interaction directly. A forest asks whether many related partitions agree; boosting asks whether successive partitions improve the residual errors.",
      lecture: "lectures/week05"
    },
    {
      id: "train-validate-test",
      title: "Training fits, validation chooses, testing judges",
      chapter: 1,
      week: "Weeks 4–6",
      minutes: "7 min",
      question: "Which observations fitted parameters, which selected the procedure, and which remained untouched until the end?",
      thesis: "A final test evaluates a frozen research procedure once. Every inspected alternative belongs to the development record.",
      essay: [
        "Training data fit coefficients, trees, representations, and transformations. Validation data choose features, hyperparameters, prompts, seeds, thresholds, and stopping rules. The final test judges the entire selected procedure after those choices. Finance usually requires this order to be chronological.",
        "Search is itself a form of learning. Trying one hundred specifications gives luck one hundred chances to appear skillful. If target windows overlap a split boundary, purging removes contaminated training rows; an embargo can separate adjacent periods. Walk-forward evaluation repeatedly refits on eligible history and predicts the next block, matching how the method would have been operated."
      ],
      method: [
        ["Training", "Fit parameters and all learned preprocessing"],
        ["Validation", "Choose among complete candidate procedures"],
        ["Test", "Judge the frozen winner on untouched later observations"],
        ["Search record", "Count every feature, model, seed, prompt, and threshold considered"]
      ],
      figure: {
        type: "split",
        title: "Move the boundary, preserve the jobs",
        description: "Adjust the training history while validation and test retain distinct roles.",
        min: 3,
        max: 8,
        value: 5
      },
      failures: [
        ["Test-set tuning", "Changing the procedure after seeing the final result converts the test into validation data."],
        ["Random shuffling", "Mixing future and past rows creates an evaluation unlike chronological deployment."],
        ["Hidden search", "Reporting only the winning specification understates how much the data were asked to choose."]
      ],
      questions: [
        "Can each reported observation be assigned one unambiguous role?",
        "Do target windows or fitted transformations cross the evaluation boundary?",
        "Would the same code have produced the forecast at the historical date?"
      ],
      case: "A period omitted from one model fit is not necessarily out of sample. If its result selected the winning feature set, threshold, or narrative, that period is part of development.",
      lecture: "lectures/week06"
    },
    {
      id: "metrics",
      title: "The metric follows the decision",
      chapter: 1,
      week: "Week 6",
      minutes: "6 min",
      question: "What job is the output meant to perform, and which measurement reaches that job?",
      thesis: "Numerical closeness, cross-sectional rank, probability calibration, and net portfolio value are different claims with different denominators.",
      essay: [
        "Squared error asks whether numerical forecasts are close. Rank information coefficient asks whether high scores precede high outcomes within a date. Calibration asks whether stated probabilities match observed frequencies. None of those metrics alone establishes that a tradable portfolio creates value.",
        "Once forecasts enter a strategy, the ledger must include turnover, spreads, commissions, impact, financing, drawdown, tail risk, and capacity. Sharpe ratio summarizes average excess return per unit of volatility, but the best Sharpe chosen from a large search is biased upward. The correct metric follows the intended decision and includes every cost needed to implement it."
      ],
      method: [
        ["Magnitude", "Forecast error or an economically scaled loss"],
        ["Ordering", "Rank IC, top-minus-bottom spread, or retrieval ranking"],
        ["Probability", "Calibration, proper scoring rules, and threshold value"],
        ["Implemented value", "Net return, risk, drawdown, turnover, and capacity"]
      ],
      figure: {
        type: "metrics",
        title: "Change the question, change the metric",
        description: "Select the model's job to reveal the matching evidence.",
        modes: ["Magnitude", "Rank", "Probability", "Trading"],
        notes: [
          "Forecast error: how far are numerical predictions from realized values?",
          "Rank IC: do higher-scored assets later outperform lower-scored assets within the same decision date?",
          "Calibration: among cases assigned similar odds, how often does the event occur?",
          "Net value: after sizing, turnover, costs, and risk, did the implemented policy improve the financial objective?"
        ]
      },
      failures: [
        ["Metric substitution", "Optimizing an easy proxy and then speaking as if the final decision were evaluated."],
        ["Gross-only reporting", "Ignoring turnover and implementation can reverse a result."],
        ["Winner's metric", "Selecting the best Sharpe from a wide search and reporting it as if it came from one prespecified trial."]
      ],
      questions: [
        "What exact claim does the reported number support?",
        "Is the metric calculated at the same horizon and cross-section as the decision?",
        "Which costs and risks lie between model output and reported performance?"
      ],
      case: "A model can have excellent rank IC and poor net returns if its ordering changes too often. Conversely, a modest forecast may be useful if it is stable, cheap to trade, and diversifying.",
      lecture: "lectures/week06"
    },
    {
      id: "optimization-unsupervised",
      title: "Optimization is literal; unsupervised learning is still fitted",
      chapter: 1,
      week: "Week 7",
      minutes: "6 min",
      question: "What objective, geometry, or grouping did the procedure learn—and from which population?",
      thesis: "A solver optimizes the problem it was given, while PCA and clustering estimate structure from a sample. Neither guarantees economic usefulness.",
      essay: [
        "Optimization combines an objective with allowed choices and constraints. Gradient descent follows local slope; convexity can make the solution globally well behaved. Yet a mathematically correct solution may be financially poor when expected returns, covariances, costs, or constraints are misspecified. Optimizers amplify their inputs.",
        "PCA estimates directions of shared variation; clustering groups observations under a chosen representation and distance. They have no supervised target, but they are still fitted objects. Scales, component directions, and cluster centers must be learned on eligible earlier data, frozen for later rows, and tested for stability or downstream usefulness. Explaining variation is not the same as forecasting return."
      ],
      method: [
        ["Optimization", "Objective + constraints + inputs → chosen action"],
        ["PCA", "Scaled sample → orthogonal directions of variation"],
        ["Clustering", "Representation + distance → fitted groups"],
        ["Evidence", "Stability and downstream value on later observations"]
      ],
      figure: {
        type: "scatter",
        title: "Watch unsupervised structure being fitted",
        description: "Use power iteration to learn a principal axis, or alternate K-means assignment and center updates.",
        min: 0,
        max: 65,
        value: 24
      },
      failures: [
        ["Objective worship", "Treating convergence as proof that the chosen objective and inputs represent the real decision."],
        ["Full-sample structure", "Estimating scales, components, or clusters with future observations."],
        ["Tradeability leap", "Assuming a visually coherent component or cluster automatically carries a profitable signal."]
      ],
      questions: [
        "What changes when inputs are perturbed within plausible estimation error?",
        "Were every scale, direction, and center fitted inside the development window?",
        "Does the learned structure persist or help a prespecified downstream task?"
      ],
      case: "A principal component may explain a large share of cross-asset movement and still have no predictive value. Its job may instead be risk compression, hedging, or describing common exposure.",
      lecture: "lectures/week07"
    },
    {
      id: "portfolio",
      title: "A forecast does not determine a portfolio",
      chapter: 2,
      week: "Week 8",
      minutes: "6 min",
      question: "How should an estimate become a position after risk, constraints, current holdings, and costs are considered?",
      thesis: "The same forecast can support many portfolios. Sizing and implementation often determine more of the realized result than the ranking itself.",
      essay: [
        "A ranking tells us which opportunities look better, not how much capital to commit. A sizing rule maps forecasts into target positions; a risk model accounts for joint exposure; constraints bound leverage, concentration, sectors, turnover, or shorting. Current holdings then determine the trades needed to reach the target.",
        "Mean–variance optimization is sensitive to estimated returns and covariances, so small input errors can produce extreme weights. Equal weight, inverse volatility, shrinkage, and turnover-aware rules are serious baselines. Volatility targeting may stabilize realized risk without raising expected return; those are separate claims."
      ],
      method: [
        ["Forecast", "Expected return, score, or ranking for each opportunity"],
        ["Portfolio policy", "Sizing, covariance model, constraints, and risk target"],
        ["Trades", "Target holdings minus current holdings"],
        ["Outcome", "Returns earned by actual holdings after costs"]
      ],
      figure: {
        type: "allocation",
        title: "Move along the efficient frontier",
        description: "Change the price placed on variance and watch the selected portfolio and its asset weights respond.",
        modes: ["Equal", "Score-sized", "Risk-sized"],
        weights: [[34, 33, 33], [58, 28, 14], [24, 43, 33]],
        notes: [
          "Equal sizing limits estimation demands but ignores differences in score and risk.",
          "Score sizing expresses conviction directly and can concentrate noisy estimates.",
          "Risk sizing reduces positions with greater standalone or portfolio risk; the signal ranking has not changed."
        ]
      },
      failures: [
        ["Forecast–portfolio collapse", "Attributing the performance of one weight rule entirely to the prediction model."],
        ["Optimizer amplification", "Feeding unstable expected returns into an unconstrained optimizer creates extreme, fragile positions."],
        ["Target/actual confusion", "Backtests earn returns on desired positions even when the required trades were not feasible."]
      ],
      questions: [
        "What portfolio rule is fixed when forecast models are compared?",
        "How sensitive are weights to plausible input error?",
        "Are returns calculated from target positions or from achievable post-trade holdings?"
      ],
      case: "Two strategies can rank stocks identically and produce different Sharpe ratios because one uses equal weights while the other scales by forecast, covariance, turnover, and volatility target.",
      lecture: "lectures/week08"
    },
    {
      id: "neural-networks",
      title: "Neural networks buy flexible representation",
      chapter: 2,
      week: "Week 8",
      minutes: "6 min",
      question: "What extra structure can the network exploit, and does later evidence justify the additional flexibility?",
      thesis: "Layers can represent complex functions, but representation capacity is not the same as useful information, successful optimization, or generalization.",
      essay: [
        "A neural network composes weighted calculations with nonlinear activations. Backpropagation efficiently assigns each weight a contribution to the loss, and an optimizer adjusts the weights. More layers and parameters enlarge the class of relationships the system can represent.",
        "What the network actually learns depends on data quantity, coverage, architecture, initialization, regularization, and distribution shift. Different seeds can produce different fitted models, so a seed is part of the procedure. Deep learning is powerful for language, images, audio, and abundant structured functions. In low-signal tabular return prediction, linear models and boosted trees remain demanding baselines."
      ],
      method: [
        ["Input", "Scaled tabular variables, sequences, images, audio, or text representations"],
        ["Architecture", "Layers, activations, parameter sharing, and inductive structure"],
        ["Training", "Loss + backpropagation + optimizer + regularization"],
        ["Evidence", "Later performance, seed stability, and comparison with simpler models"]
      ],
      figure: {
        type: "network",
        title: "Follow a prediction forward and a gradient backward",
        description: "Step through an actual two-layer network, then train it on a deterministic XOR problem.",
        min: 1,
        max: 4,
        value: 2
      },
      failures: [
        ["Capacity as evidence", "A network's ability to fit a complex function says nothing about whether that function persists."],
        ["One-seed reporting", "Selecting or reporting a favorable initialization hides procedure-level variability."],
        ["Baseline neglect", "A costly network may add no later-data value beyond linear shrinkage or boosted trees."]
      ],
      questions: [
        "What structure in the input motivates the architecture?",
        "Does the comparison include tuning effort and compute for every model family?",
        "How does performance vary across seeds, windows, and changed regimes?"
      ],
      case: "A network can approximate a pricing surface extremely well because the surface is structured and labels are abundant. The same architecture may fail on sparse, low-signal monthly stock returns.",
      lecture: "lectures/week08"
    },
    {
      id: "pricing-hedging",
      title: "Learning a price differs from learning a hedge",
      chapter: 2,
      week: "Week 9",
      minutes: "6 min",
      question: "Is the system approximating one calculation, or choosing actions along a changing path?",
      thesis: "A pricing surrogate learns a function; a hedging policy learns sequential actions. They require different targets, error ledgers, and stress tests.",
      essay: [
        "A pricing surrogate approximates a trusted but slower evaluator. Its error is measured against that reference, not directly against market truth. Keep model error, numerical error, surrogate error, and calibration error separate: each compares different objects and supports different claims.",
        "A hedging policy repeatedly chooses trades while price, volatility, time, inventory, and costs evolve. It is judged by terminal net P&L, tail loss, turnover, and robustness in changed worlds. A tiny pricing RMSE does not establish a useful hedge because the policy's actions alter the path and accumulate frictions."
      ],
      method: [
        ["Pricing input", "Contract and market state at one valuation point"],
        ["Pricing output", "A fast approximation to a declared reference"],
        ["Hedging input", "State, inventory, time, costs, and previous actions"],
        ["Hedging evidence", "Distribution of net outcomes across paths and stress worlds"]
      ],
      figure: {
        type: "comparison",
        title: "Function approximation or sequential control?",
        description: "The evaluation changes with the object being learned.",
        modes: ["Price", "Hedge"],
        panels: [
          ["Pricing surrogate", "inputs → estimate", "Compare with the reference calculation; audit approximation error by region."],
          ["Hedging policy", "state → action → state", "Compare terminal risk, costs, turnover, and behavior under changed dynamics."]
        ]
      },
      failures: [
        ["Error-ledger collapse", "Market mismatch, numerical approximation, surrogate fit, and calibration are spoken of as one error."],
        ["Static policy scoring", "A hedge is evaluated one step at a time while ignoring path-dependent costs and risk."],
        ["Reference worship", "A surrogate can faithfully reproduce a pricing model that is itself economically misspecified."]
      ],
      questions: [
        "What is the reference object, and what assumptions does it inherit?",
        "Does the learned output change later states or actions?",
        "Which stress worlds reveal failure outside the training simulator?"
      ],
      case: "A surrogate with near-zero error against Black–Scholes has learned Black–Scholes, not the market. A hedge must still be tested with transaction costs, discrete rebalancing, and changed dynamics.",
      lecture: "lectures/week09"
    },
    {
      id: "financial-text",
      title: "Financial text is a dated measurement",
      chapter: 3,
      week: "Week 10",
      minutes: "6 min",
      question: "Which aspects of a document should become measurable, searchable, or usable as evidence?",
      thesis: "Counts, embeddings, and retrieval preserve different information. Every document also needs identity, version, subject period, and availability time.",
      essay: [
        "TF–IDF emphasizes terms that are frequent in one document and uncommon in the fitted corpus. Embeddings place passages in a learned geometry where some related uses are nearby despite different wording. Retrieval ranks evidence for a query. No representation preserves every aspect of meaning, and similarity does not establish agreement or entailment.",
        "Language inherits the same information clock as prices and filings. A document passport should record source identity, version, subject period, public availability, and feature-ready time. Vocabularies, inverse document frequencies, embedding models, indexes, and thresholds are fitted components whose versions and training windows belong in the research record."
      ],
      method: [
        ["Document", "Identified, versioned text with an availability timestamp"],
        ["Representation", "Counts, TF–IDF, embeddings, or structured extraction"],
        ["Use", "Predictive feature, retrieval candidate, or source evidence"],
        ["Evaluation", "Later labels, judged queries, and task-specific retrieval metrics"]
      ],
      figure: {
        type: "text",
        title: "Represent the same passage two ways",
        description: "Toggle between visible term weights and a dense learned vector.",
        modes: ["TF–IDF", "Embedding"],
        notes: [
          "TF–IDF keeps visible terms and corpus rarity. It is transparent and often a strong baseline.",
          "An embedding compresses aspects of learned semantic geometry. Nearby vectors may be related without making the same factual claim."
        ]
      },
      failures: [
        ["Availability blindness", "A document is assigned to its subject period instead of the date the historical system could access it."],
        ["Similarity as truth", "Retrieved proximity is treated as factual support or agreement."],
        ["Index leakage", "A vocabulary, IDF table, or retrieval index is built using future documents."]
      ],
      questions: [
        "Which meaning must the representation preserve for the downstream job?",
        "What was the exact document version and first usable time?",
        "Is retrieval evaluated with judged queries that resemble the real task?"
      ],
      case: "An earnings call about the December quarter may enter a February information set. Its TF–IDF vector, embedding, and index membership should all be created under that February boundary.",
      lecture: "lectures/week10"
    },
    {
      id: "llm-systems",
      title: "An LLM is one component of a decision system",
      chapter: 3,
      week: "Week 11",
      minutes: "7 min",
      question: "Which failures belong to context, generation, verification, tools, or authority?",
      thesis: "A decoder proposes text from context. Reliable use depends on what evidence enters, how claims are checked, which tools are routed, and where action authority stops.",
      essay: [
        "A large language model generates one token at a time from its current context. Fluent continuation does not guarantee a recoverable source. Retrieval-augmented generation adds relevant evidence to the context, but retrieval does not ensure that the model uses, cites, or interprets it correctly.",
        "Important outputs should be decomposed into atomic claims and compared with permitted evidence: supported, contradicted, absent, or unclear. Arithmetic and lookup can be routed to tools. Repeated behavior may justify prompt changes, schemas, or fine-tuning. None of those changes grants permission to trade, write, pay, or disclose; authority belongs to independent controls. Quality, cost, latency, and error consequences apply to the whole system."
      ],
      method: [
        ["Context", "Instructions, examples, retrieved records, and tool results"],
        ["Decoder", "A conditional generator, not a source database"],
        ["Verification", "Atomic claims checked against identified evidence"],
        ["Authority", "Independent permissions and human or system gates"]
      ],
      figure: {
        type: "pipeline",
        title: "Locate the failure before changing the model",
        description: "Select a system stage to see its distinct responsibility.",
        stages: ["Sources", "Retrieval", "Generation", "Claims", "Checks", "Gate"],
        notes: [
          "Sources need identity, version, time, and permission boundaries.",
          "Retrieval must find relevant evidence and be evaluated separately from generation.",
          "The model proposes an answer from the supplied context; fluency is not verification.",
          "Split the answer into small statements that can be individually assessed.",
          "Use evidence labels, calculators, schemas, or specialist review where consequences justify them.",
          "A supported proposal still requires independently authorized action."
        ]
      },
      failures: [
        ["Decoder-only diagnosis", "Every failure is blamed on the model even when the needed fact never entered context."],
        ["Citation theater", "A source is attached without checking whether it supports the specific claim."],
        ["Capability–authority collapse", "The ability to propose or call a tool is treated as permission to act."]
      ],
      questions: [
        "Which facts can change, and how are their current versions retrieved?",
        "Can each consequential claim be traced to evidence or an explicit abstention?",
        "What independent control defines the system's permitted actions?"
      ],
      case: "When an answer lacks a current filing fact, add or repair retrieval before tuning prose style. When arithmetic is wrong, route a calculator. When the action is unauthorized, no model improvement solves the control failure.",
      lecture: "lectures/week11"
    },
    {
      id: "execution",
      title: "Execution is part of the investment strategy",
      chapter: 3,
      week: "Week 12A",
      minutes: "6 min",
      question: "How does a desired position become actual inventory when immediacy, impact, and non-completion all carry costs?",
      thesis: "A forecast is not profitable until the required trades survive the market used to implement them.",
      essay: [
        "The bid–ask spread is the first price of immediacy. A large order can consume several book levels and create market impact. Trading patiently may reduce immediate cost but leaves inventory exposed to price movement and the risk of missing the deadline.",
        "An execution schedule balances modeled impact against inventory risk. Implementation shortfall compares the completed order with a declared decision-price benchmark and must state how unfilled quantity is treated. Observed book depth, transient impact, persistent response, and opportunity cost are related but not interchangeable; hidden conventions can double-count them."
      ],
      method: [
        ["Target", "Desired shares and completion horizon"],
        ["Market state", "Spread, depth, volatility, volume, and current inventory"],
        ["Policy", "Order type, size, timing, and adaptation"],
        ["Ledger", "Fills, fees, impact, price risk, and uncompleted quantity"]
      ],
      figure: {
        type: "execution",
        title: "Choose urgency; pay somewhere",
        description: "Move the schedule from patient to urgent and compare modeled cost channels.",
        min: 0,
        max: 100,
        value: 48
      },
      failures: [
        ["Frictionless holdings", "A backtest jumps directly from forecast to target position with no spread, impact, or delay."],
        ["Free non-completion", "Unfilled shares disappear from the ledger instead of carrying opportunity cost or decision consequences."],
        ["Impact double counting", "Book-walking cost and dynamic impact are added without compatible definitions."]
      ],
      questions: [
        "What benchmark defines implementation shortfall?",
        "How are partial fills and the remaining inventory valued?",
        "Which cost components are observed, modeled, or assumed?"
      ],
      case: "An urgent market order may complete reliably but walk the book; a patient schedule may save spread and impact yet miss a moving price. Both costs belong to the strategy, not to a separate operational footnote.",
      lecture: "lectures/week12"
    },
    {
      id: "reinforcement-learning",
      title: "A bandit is the one-state case of reinforcement learning",
      chapter: 3,
      week: "Week 12B",
      minutes: "7 min",
      question: "Does an action merely reveal an immediate reward, or does it alter the state and the choices that follow?",
      thesis: "Bandits trade exploration against exploitation in one recurring state; MDPs value actions through their immediate and future consequences.",
      essay: [
        "A multi-armed bandit chooses among uncertain actions, observes an immediate reward, and returns to the same decision setting. Exploration buys information; exploitation chooses the action currently believed best. Too little exploration preserves early mistakes, while too much keeps paying for knowledge that may not be worth its cost.",
        "A Markov decision process adds successor states. In execution, trading now changes remaining inventory and time, which changes later choices. A policy maps state to action; value functions summarize expected future return. Q-learning updates action values from observed reward plus the best estimated continuation. The algorithm is only as credible as the environment contract and the simulator's ability to answer alternative actions."
      ],
      method: [
        ["State", "The information needed to make the current decision"],
        ["Action", "The choice that changes reward and possibly the next state"],
        ["Reward", "The declared immediate objective contribution"],
        ["Continuation", "The value of later opportunities under the resulting state"]
      ],
      figure: {
        type: "comparison",
        title: "Explore a bandit, then propagate Bellman value",
        description: "Compare one-state exploration and cumulative regret with value updates across changing states.",
        modes: ["Bandit", "MDP"],
        panels: [
          ["Bandit", "choose → reward → repeat", "Actions reveal uncertain immediate rewards in a recurring decision state."],
          ["MDP", "state → action → new state", "Actions change what becomes possible next; immediate reward is only part of value."]
        ]
      },
      failures: [
        ["State omission", "The state excludes information needed for future rewards or transition dynamics."],
        ["Reward misspecification", "The agent optimizes a convenient signal that diverges from the actual financial objective."],
        ["Simulator certainty", "Exact learning inside a declared world is mistaken for evidence that the world matches the market."]
      ],
      questions: [
        "Does today's action change tomorrow's state or available actions?",
        "Can the environment answer what would happen under alternative actions?",
        "Which costs, constraints, and termination conditions are encoded in reward and transition?"
      ],
      case: "Order placement is closer to an MDP than a bandit because trading now changes remaining inventory, time, and risk. A one-step reward omits those continuation consequences.",
      lecture: "lectures/week12"
    },
    {
      id: "causal-policy",
      title: "Recorded actions do not reveal every alternative",
      chapter: 4,
      week: "Week 13",
      minutes: "7 min",
      question: "What would have happened under an action that was not taken?",
      thesis: "Prediction describes observed associations; causal and policy questions require assumptions or designs that identify missing counterfactual outcomes.",
      essay: [
        "Historical data record the chosen action and the outcome that followed. They do not record the same case's outcome under every unchosen action. Logged-policy evaluation therefore requires support: the historical policy must sometimes take the actions the proposed policy would choose in comparable states. Propensity-based methods also require reliable action probabilities and careful variance control.",
        "Causal inference frames the missing alternative as a potential outcome. Difference-in-differences uses changes in a treated group relative to a comparison group, relying on a credible parallel-trends argument and the absence of confounding concurrent changes. A predictive relationship may still be useful, but it does not by itself identify what an intervention will change."
      ],
      method: [
        ["Observed", "Context, chosen action, behavior probability, and realized outcome"],
        ["Missing", "Outcome under the actions not taken"],
        ["Identification", "Support, design, assumptions, or randomization"],
        ["Claim", "A bounded policy value or intervention effect"]
      ],
      figure: {
        type: "causal",
        title: "Construct the missing counterfactual",
        description: "Reveal a difference-in-differences estimate in stages, then break parallel trends and watch the bias appear.",
        modes: ["Observed", "Counterfactual"],
        notes: [
          "The historical record shows the selected action and one realized outcome.",
          "The outcome under the unchosen action is missing. Estimating it requires design or assumptions beyond ordinary prediction."
        ]
      },
      failures: [
        ["Association as intervention", "A predictive feature is interpreted as the effect of changing that feature or action."],
        ["Support violation", "A new policy chooses actions that the historical policy never took in similar states."],
        ["Unexamined comparison", "A DiD estimate is reported without defending the comparison trend or concurrent shocks."]
      ],
      questions: [
        "Which potential outcome is missing for the claim being made?",
        "Does the observed policy provide support for the proposed actions?",
        "What design feature or assumption turns association into identification?"
      ],
      case: "If historical traders never used a large order in illiquid states, their logs cannot nonparametrically evaluate a new policy that does. More prediction accuracy does not create missing action support.",
      lecture: "lectures/week13"
    },
    {
      id: "governance",
      title: "Governance surrounds the model",
      chapter: 4,
      week: "Week 14",
      minutes: "6 min",
      question: "Who owns the model, where may it act, how is it monitored, and what happens when evidence changes?",
      thesis: "Governance is the lifecycle that binds a technical result to purpose, authority, reasons, monitoring, escalation, change control, and retirement.",
      essay: [
        "A model enters an organization with a declared purpose, owner, users, affected parties, approval record, and permitted scope. Independent validation asks whether evidence supports that use. Fairness criteria make different group comparisons and can conflict; the appropriate criterion depends on the decision and harm, not on a universal software setting.",
        "Monitoring should cover inputs, outputs, outcomes, overrides, incidents, and the population to which the model is applied. An alert is not a conclusion: thresholds need investigation and escalation procedures. Material changes return through approval. When evidence, purpose, or support disappears, the correct action may be restriction or retirement rather than another round of tuning."
      ],
      method: [
        ["Purpose", "A specific decision, population, owner, and prohibited use"],
        ["Approval", "Independent evidence and documented limitations"],
        ["Operation", "Reasons, controls, monitoring, overrides, and incident handling"],
        ["Change", "Escalation, revalidation, restriction, and retirement"]
      ],
      figure: {
        type: "pipeline",
        title: "Treat deployment as a lifecycle",
        description: "Select a stage to reveal its control question.",
        stages: ["Purpose", "Validate", "Approve", "Operate", "Monitor", "Retire"],
        notes: [
          "What decision and population are in scope, and which uses are prohibited?",
          "Does independent evidence support this model, data, threshold, and implementation?",
          "Who accepts the residual risk and grants authority?",
          "How are reasons, overrides, permissions, and user behavior recorded?",
          "Which input, output, outcome, fairness, and incident indicators trigger investigation?",
          "How is use restricted or ended when support, purpose, or performance no longer holds?"
        ]
      },
      failures: [
        ["Model-only ownership", "Technical performance has an owner while the resulting decision and affected population do not."],
        ["Alert theater", "Dashboards collect drift indicators without defined investigation or escalation."],
        ["Permanent approval", "A past validation is treated as authority for new populations, purposes, or materially changed systems."]
      ],
      questions: [
        "What exact use was validated and approved?",
        "Which person or control can stop, override, or narrow the system?",
        "What evidence would cause revalidation or retirement?"
      ],
      case: "A drift alert should open a defined investigation; it should not silently retrain the model or automatically end service. Governance determines who interprets the evidence and which actions are authorized.",
      lecture: "lectures/week14"
    },
    {
      id: "evidence-chain",
      title: "The complete result is an evidence chain",
      chapter: 4,
      week: "Week 15",
      minutes: "5 min",
      question: "Can another careful reader trace the result from question to data, procedure, implementation, evidence, and limits?",
      thesis: "The capstone is not a winning number. It is a reproducible chain whose information boundary, comparisons, choices, implementation, and uncertainty remain visible.",
      essay: [
        "A defensible result starts with a decision question and point-in-time rows. It records fitted features, candidate procedures, selection rules, and the untouched evaluation. It shows how model outputs became actions, how those actions were implemented, and which costs and risks entered the final ledger.",
        "The conclusion should be no larger than the design permits. A negative result can be excellent research when the baseline is fair, the process is reproducible, and the limitations are clear. The goal of the course is not to memorize every algorithm. It is to know where each method belongs and to keep the evidence chain intact when results travel into decisions."
      ],
      method: [
        ["Question", "A decision, horizon, population, and success criterion"],
        ["Procedure", "Point-in-time data, candidates, selection, and frozen implementation"],
        ["Result", "Untouched evidence with costs, risk, uncertainty, and sensitivity"],
        ["Conclusion", "A bounded claim, reproducible record, and explicit limitations"]
      ],
      figure: {
        type: "pipeline",
        title: "Audit the final handoff",
        description: "Each link supports a different part of the conclusion.",
        stages: ["Question", "Dated data", "Frozen method", "Decision", "Later test", "Claim"],
        notes: [
          "Name the decision, horizon, population, and criterion before opening the search.",
          "Preserve what was knowable, including source versions and fitted transformations.",
          "Record every material choice and freeze the selected procedure before final evaluation.",
          "Show sizing, constraints, implementation, costs, and authority—not only predictions.",
          "Use genuinely later or otherwise untouched observations with relevant baselines and uncertainty.",
          "State only what the design supports, including null results and boundaries."
        ]
      },
      failures: [
        ["Winning-number summary", "The final metric appears without the search, baseline, implementation, or uncertainty that produced it."],
        ["Unreproducible procedure", "Data versions, code, seeds, prompts, and selection decisions cannot be reconstructed."],
        ["Oversized conclusion", "A narrow historical comparison becomes a general claim about markets, causality, or future profitability."]
      ],
      questions: [
        "Could a skeptical reader reproduce the exact information set and selected procedure?",
        "Does the reported result reach the implemented decision rather than stop at model output?",
        "What remains unknown after this study, and what evidence would change the conclusion?"
      ],
      case: "A careful null result—no improvement over a simple baseline after costs—can be more valuable than a fragile positive backtest. It closes a path honestly and leaves a reusable research record.",
      lecture: "lectures/week15"
    }
  ],

  glossary: [
    ["Baseline", "A simple, feasible procedure used as the minimum credible opponent for a more complex method."],
    ["Calibration", "Agreement between stated probabilities and observed event frequencies among comparable cases."],
    ["Counterfactual", "The outcome that would have occurred under an action or condition not observed for the same case."],
    ["Decision rule", "The mapping from model output to an action, threshold, or position size."],
    ["Embedding", "A learned vector representation that preserves selected aspects of similarity or structure."],
    ["Feature", "Information supplied to a model and admissible at the historical decision time."],
    ["Implementation shortfall", "A stated comparison between an implemented order and a decision-price benchmark, including a treatment of unfilled quantity."],
    ["Leakage", "Use of information, labels, fitted transformations, or choices that would not have been available at the historical decision time."],
    ["Model", "A fitted rule that maps inputs to an output such as a number, score, probability, representation, or action."],
    ["Point-in-time data", "Values and versions reconstructed as they were actually available at each historical moment."],
    ["Policy", "A rule that maps a state or information set to an action."],
    ["Purging", "Removing training observations whose label windows overlap an evaluation boundary."],
    ["Rank IC", "A cross-sectional correlation between model scores and later outcomes, commonly computed separately by date."],
    ["Retrieval", "The process of finding and ranking records or passages relevant to a query."],
    ["Row", "One defined case at one defined decision time."],
    ["Score", "A model output useful for ordering cases but not necessarily interpretable as a probability."],
    ["Support", "The presence of historical examples for the actions a proposed policy would take in comparable states."],
    ["Target", "The later label or outcome a supervised procedure is trained to estimate."],
    ["Test data", "Observations kept outside fitting and selection and used to judge the frozen procedure."],
    ["Validation data", "Development observations used to choose among features, models, settings, thresholds, prompts, or stopping rules."],
    ["Walk-forward evaluation", "A chronological procedure that repeatedly fits on eligible history and predicts a later block."],
    ["Volatility targeting", "Scaling portfolio exposure toward a declared risk target rather than directly toward expected return."]
  ]
};
