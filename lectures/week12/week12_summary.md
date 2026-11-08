# Week 12 Summary — Execution, Bandits, and Sequential Decisions

This file begins with a short entry ramp. The later sections are the complete
reference for review. Foundational terms such as feature, target, policy, state,
action, reward, and test are defined in the
[Core Vocabulary](../CORE_GLOSSARY.md).

## Start here

Week 12 begins after a portfolio has decided what it wants to own. The remaining
problem is how to trade from the current holdings to the desired holdings. A
large order can cross the spread, consume displayed liquidity, move prices, and
change the inventory and time available for later decisions.

| Word | Plain-English meaning | Week 12 example |
|---|---|---|
| **Order book** | Displayed offers to buy and sell at different prices and quantities. | The best ask shows the cheapest displayed shares available to buy. |
| **Market impact** | A price response associated with the act of trading. | A large buy order pushes execution prices upward. |
| **Implementation shortfall** | Cost relative to a declared decision price, including filled and unfilled quantities under the stated convention. | Compare the completed order with buying the full amount at the decision price. |
| **Bandit** | A one-state reinforcement-learning problem that chooses among uncertain actions and receives immediate rewards. | Repeatedly choose among three venues with unknown fill quality. |
| **MDP** | A model of states, actions, rewards, and action-dependent successor states. | Trading now changes remaining inventory and time. |
| **Q-learning** | A method that learns the long-run value of state–action pairs from sampled transitions. | Learn how much to trade in each inventory-time state. |

Execution is a journey with tolls. The cheapest next step may leave an expensive
remaining route. That is why Part A studies the execution ledger before Part B
introduces sequential control.

## Required / explain / recognize

| Level | What Week 12 expects |
|---|---|
| **USE** | Walk a displayed book, reconcile implementation shortfall, and write an environment contract. |
| **EXPLAIN** | Why a bandit is the one-state RL case, why exploration buys information, and why immediate reward differs from journey value. |
| **RECOGNIZE** | Square-root impact, Almgren–Chriss, Bellman equations, value iteration, Q-learning convergence conditions, and policy gradients. |

## Full reference

## Core ideas

1. **A desired position is not an executed position.** The order type, venue,
   schedule, fill process, and cost convention determine what is actually held.
2. **The quoted spread is only the first toll.** A large marketable order may
   consume several price levels. The marginal price of the final share and the
   average price of the order are different.
3. **Displayed depth is not the entire market.** Queue position, cancellations,
   hidden liquidity, replenishment, and other traders' responses remain unknown
   in a static snapshot.
4. **Do not double-count impact.** A visible book-walk concession, temporary
   response, and persistent price response are related quantities whose exact
   meaning depends on the measurement convention.
5. **Impact models require an operating range.** A linear fit can look adequate
   over small participation rates and extrapolate badly. The square-root law is
   an empirical approximation, not a universal physical law.
6. **Execution schedules trade urgency against cost.** Trading faster reduces
   exposure to price risk and deadline failure but can increase temporary
   impact. Trading slowly does the reverse.
7. **Implementation shortfall closes the ledger.** Include delay, execution
   concession, explicit fees, and a declared treatment of unfilled quantity.
8. **A multi-armed bandit isolates exploration.** Every action returns to the
   same decision state, so continuation value is common across arms. The agent
   learns which immediate reward distribution is best.
9. **Exploration has an opportunity cost.** Pure greed can preserve an early
   sampling mistake; excessive exploration keeps choosing inferior actions
   after the ranking is fairly clear.
10. **A full MDP adds coupled decisions.** The current action changes the state
    from which the next choice is made. Inventory and time make execution a
    sequential problem rather than an ordinary bandit.
11. **Reward is immediate; return spans the episode.** A costly action now may
    lead to a better successor state. A cheap action now may create a large
    terminal penalty.
12. **Bellman equations express consistency across time.** A value equals the
    current reward plus discounted value of possible successor states.
13. **Exact dynamic programming supplies known truth in a declared small
    world.** Value iteration lets us verify what a sampled learner should
    recover before moving to a market-like environment.
14. **Q-learning needs coverage.** A near-optimal result from one initial state
    does not establish accurate action values in rarely visited states.
15. **The environment remains a model.** Recovering the simulator's optimum
    validates learning inside that simulator; it does not validate the
    simulator as a description of markets.

## Terms and vocabulary

| Term | Plain-English meaning |
|---|---|
| **Bid / ask** | Highest displayed buy price / lowest displayed sell price. |
| **Bid–ask spread** | Ask minus bid; a basic price of immediacy. |
| **Market order** | Instruction to trade immediately against available prices. |
| **Limit order** | Instruction that sets the worst acceptable price; execution is not guaranteed. |
| **Depth concession** | Additional cost from consuming displayed prices beyond the best quote. |
| **Participation rate** | Order quantity relative to market volume over a stated interval. |
| **Temporary impact** | Modeled short-lived price response associated with trading. |
| **Persistent impact** | Longer-lasting price response associated with order flow, difficult to separate from information and market drift. |
| **Almgren–Chriss** | A classical framework balancing modeled impact cost with inventory risk over an execution horizon. |
| **Parent / child order** | The full quantity to execute / the smaller individual orders used to execute it. |
| **Implementation shortfall** | Difference between the implemented outcome and a declared decision-price benchmark. |
| **Multi-armed bandit** | One recurrent decision state with several actions, immediate uncertain rewards, and no action-dependent next state. |
| **Exploration / exploitation** | Gather information about alternatives / choose the action currently believed best. |
| **Regret** | Reward lost relative to a stated better policy or known optimal action. |
| **Markov decision process (MDP)** | A declared state, action, reward, transition, horizon, and initial/terminal convention. |
| **Policy** | Rule mapping a state to an action or action distribution. |
| **Return** | Discounted or undiscounted sum of rewards across the remaining episode. |
| **Value function** | Expected future return from a state under a policy. |
| **Q-function** | Expected future return after taking one action in one state and then continuing. |
| **Bellman equation** | Recursive statement linking current value to reward and successor value. |
| **Value iteration** | Repeated exact Bellman optimality updates in a known finite environment. |
| **Temporal-difference target** | Current reward plus an estimate of successor value. |
| **Q-learning** | Off-policy temporal-difference learning of optimal action values from experience. |
| **Visitation coverage** | How often the learner experienced relevant states and actions. |

## Research protocol after Week 12

- Declare order side, size, benchmark, horizon, permitted order types, and cost
  convention before comparing execution rules.
- Separate displayed depth, dynamic impact, fees, timing risk, and opportunity
  cost so overlapping estimates are not silently added twice.
- State the state, actions, rewards, transitions, constraints, terminal rule,
  and reset distribution before naming an RL algorithm.
- Solve a small declared environment exactly when possible, then compare the
  frozen learned policy with that answer across starts and repeated seeds.
- Report policy value and visitation support, not only a training-reward curve.
- Stress the environment separately from the learning algorithm.

## Quiz check

You should be able to:

- walk a buy order through several ask levels;
- distinguish spread, displayed-depth concession, and modeled market impact;
- explain the impact–risk bargain in an execution schedule;
- reconcile implementation shortfall including unfilled shares;
- formulate a bandit as a one-state MDP;
- explain exploration versus exploitation;
- distinguish immediate reward, return, state value, and action value;
- read one numerical Bellman backup; and
- explain why simulator optimality is conditional on the environment contract.
