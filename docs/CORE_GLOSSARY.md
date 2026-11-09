# Core Vocabulary for Financial Machine Learning

This is the shared vocabulary for the course. Read it when a familiar-looking
word is being used in a technical way. Weekly summaries define the new terms
for that week and link back here instead of assuming that these foundations are
already automatic.

The examples use one recurring task: use information available today to predict
which stocks will outperform next month.

## Data and the prediction question

| Term | Plain-English meaning | Example |
|---|---|---|
| **Observation / case** | One thing the model can learn from or make a prediction about. | One stock on one decision date. |
| **Row** | The table entry for one observation. | Apple on 31 January, with everything known that day. |
| **Column / variable** | One type of information recorded for many rows. | Momentum, volatility, or next-month return. |
| **Dataset / sample** | The collection of rows used in an analysis. | All eligible stock-month rows from 2010–2025. |
| **Population** | The larger set of cases the conclusion is intended to describe. | Future eligible US stocks, not merely the rows already observed. |
| **Feature / input / predictor** | Information supplied to the model when it makes a prediction. | The stock's past 12-month return, known on the decision date. |
| **Target / label / outcome** | The answer the model is asked to predict. | The stock's return during the following month. |
| **Feature engineering** | Turning raw records into consistently defined model inputs. | Converting daily prices into a 12-month momentum feature. |
| **Timestamp** | A date and, when needed, a time attached to a record. | The filing was accepted at 4:05 p.m. |
| **Availability time** | The first time the decision system could actually use a value. | The parsed filing entered the database at 4:17 p.m. |
| **Missing value** | A value that is absent or not yet known, rather than zero. | A company has not yet published its quarterly revenue. |

## Models and fitting

| Term | Plain-English meaning | Example |
|---|---|---|
| **Model** | A rule that converts inputs into an output. | A regression converts momentum and volatility into a return forecast. |
| **Algorithm** | A procedure for fitting, searching, or applying a model. | Gradient descent adjusts model weights to reduce error. |
| **Parameter** | A number learned during fitting. | A regression coefficient attached to momentum. |
| **Hyperparameter** | A choice about how the fitting procedure operates, selected outside the final test. | Tree depth or ridge penalty strength. |
| **Fit / train** | Use eligible data to estimate a model's learned quantities. | Estimate coefficients using 2010–2019 rows. |
| **Predict / forecast** | Apply the fitted model to inputs to produce an output. | Forecast February return from information available on 31 January. |
| **Score** | A numerical model output that may order cases without being a probability. | A score of 2 ranks above 1, but does not necessarily mean twice as likely. |
| **Probability** | A number from zero to one intended to represent how likely an event is. | A predicted 20% default probability. |
| **Loss / error measure** | A numerical rule that says how wrong a prediction is. Lower loss is usually better. | Squared error gives a large penalty to a large forecasting miss. |
| **Objective** | The quantity a fitting or decision procedure is told to improve. | Minimize prediction loss or trading cost. |
| **Optimization** | Searching for values that make the stated objective as good as possible. | Find portfolio weights with low estimated risk. |
| **Pipeline** | The ordered sequence from raw data through transformations, model, and output. | Clean data, scale features, fit a model, then predict. |
| **Baseline / benchmark** | A simple, feasible opponent used to determine whether added complexity helps. | Predict zero excess return or use a simple momentum ranking. |

## Training and evidence

| Term | Plain-English meaning | Example |
|---|---|---|
| **Training data** | Rows allowed to fit model parameters and other learned quantities. | Use 2010–2018 to fit coefficients. |
| **Validation data** | Separate development rows used to choose features, hyperparameters, or procedures. | Use 2019–2021 to choose penalty strength. |
| **Test data / final test** | Rows kept untouched until the complete procedure is fixed. | Open 2022–2024 only after every choice is frozen. |
| **Development data** | Training and validation information used while ideas are still changing. | Any period whose result influenced the procedure. |
| **In sample** | Evaluated on data that helped fit or choose the procedure. | Training accuracy. |
| **Out of sample** | Evaluated on observations that did not help fit the model; in finance, the strongest version is also later in time. | A frozen model predicts a later year. |
| **Generalization** | Useful performance on relevant observations that did not help build the procedure. | The 2024 result resembles the earlier validation result. |
| **Overfitting** | Learning accidents of the development sample that do not persist. | A complex rule fits every past month but fails later. |
| **Model selection** | Choosing among candidate features, models, or settings. | Select one tree depth using validation data. |
| **Cross-validation** | Repeatedly hold out portions of development data to compare procedures. | Fit on earlier blocks and validate on the next block. |
| **Leakage / look-ahead** | Information crosses a boundary it should not cross. | A 2020 row uses a filing released in 2021. |
| **Point-in-time data** | Historical data preserving what value and version were available at each past decision. | Use the filing version actually public on that date. |
| **Distribution shift** | The later cases differ from those used during development. | A model trained in calm markets faces a crisis. |
| **Reproducibility** | Identified code, data, versions, and settings can recreate the result. | A clean notebook run reproduces the same table. |
| **Robustness** | The conclusion survives reasonable changes in assumptions or conditions. | The result remains useful under higher costs and a later period. |

## Statistical language

| Term | Plain-English meaning | Example |
|---|---|---|
| **Signal** | Repeatable information related to the target. | Higher earnings growth is followed by higher returns often enough to matter. |
| **Noise** | Variation that does not provide stable information for the task. | A one-time price move with no repeatable relation to later returns. |
| **Mean / average** | Add the values and divide by how many there are. | Average monthly strategy return. |
| **Variance** | Average squared distance from the mean; a measure of spread. | Returns with larger swings have higher variance. |
| **Standard deviation / volatility** | The square root of variance, expressed in the original unit. | Monthly return volatility of 4%. |
| **Covariance** | Whether two quantities tend to move above and below their means together, in their original units. | Two bank stocks often move together. |
| **Correlation** | Standardized co-movement, usually between −1 and 1. | Correlation near 1 means the two series usually move in the same direction. |
| **Distribution** | The range of possible values and how frequently they occur. | A return distribution includes ordinary and extreme gains and losses. |
| **Rank** | A value's ordered position after sorting. | The highest forecast receives rank 1. |
| **Quantile / percentile** | A cutoff dividing an ordered distribution. | The 95th percentile exceeds 95% of observations. |
| **Bias** | A systematic tendency to miss in one direction, or the error created by an overly restrictive procedure. | Forecasts are consistently too high. |
| **Uncertainty** | What the available evidence does not pin down precisely. | A performance estimate varies across plausible samples. |

## Decisions and finance

| Term | Plain-English meaning | Example |
|---|---|---|
| **Decision rule / policy** | A rule converting available information into an action. | Buy the top-ranked stocks, subject to a risk limit. |
| **Threshold** | A cutoff at which an output triggers a different action. | Investigate when predicted fraud probability exceeds 20%. |
| **Position / holding** | The amount currently owned, borrowed, or sold short. | Hold 2% of the portfolio in one stock. |
| **Portfolio weight** | A position expressed as a share of the portfolio. | A weight of 0.02 means 2% of capital. |
| **Return** | Change in investment value relative to its starting value. | A move from $100 to $105 is a 5% simple return. |
| **Risk** | The possibility and severity of outcomes that matter to the decision. | Loss, volatility, drawdown, or failure to complete an order. |
| **Constraint** | A rule limiting permitted choices. | No stock may exceed 5% of the portfolio. |
| **Turnover** | How much the portfolio changes through trades. | Moving a weight from 1% to 3% requires a 2% trade under a simple convention. |
| **Transaction cost** | Expense created by implementing a trade. | Commission, bid–ask spread, or market impact. |
| **Gross / net result** | Performance before / after implementation costs. | Gross return of 1.0% becomes net return of 0.7% after costs. |
| **State** | The information a sequential decision rule receives before acting. | Time left, inventory, spread, and market depth. |
| **Action** | A permitted choice made by the policy. | Trade 1,000 shares now or wait. |
| **Reward** | The immediate score assigned after an action. | Negative execution cost for the current step. |

## Language-model foundations

| Term | Plain-English meaning | Example |
|---|---|---|
| **Token** | A unit of text processed by a language model; it may be a word, part of a word, or punctuation. | “profitability” may be split into several tokens. |
| **Context** | The instructions, examples, evidence, and prior text supplied for the current request. | A question plus three filing passages. |
| **Vector** | An ordered list of numbers. | An embedding represents a sentence with hundreds of numerical coordinates. |
| **Embedding** | A vector representation designed so some related items are near one another. | Similar financial passages receive nearby vectors. |
| **Inference** | Using a fitted model to answer a new request or make a new prediction. | Ask a frozen language model to extract revenue guidance. |

## Six distinctions to keep visible

1. A **feature** is an input; a **target** is the answer being predicted.
2. A **parameter** is learned during fitting; a **hyperparameter** chooses how fitting works.
3. **Training** fits; **validation** chooses; **testing** judges the frozen procedure.
4. A **score** may rank; a **probability** claims calibrated odds.
5. A **forecast** estimates an outcome; a **policy** chooses an action.
6. **Reproducible** means recoverable; **robust** means the conclusion survives a meaningful change.
