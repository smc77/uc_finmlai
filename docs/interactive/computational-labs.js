(function computationalLabs() {
  "use strict";

  const LAB_IDS = new Set([
    "regression-classification",
    "optimization-unsupervised",
    "portfolio",
    "neural-networks",
    "reinforcement-learning",
    "causal-policy"
  ]);
  const C = { ink: "#19201f", muted: "#66706a", rule: "#c7c2b7", paper: "#f8f6f0", teal: "#2d625b", red: "#a94332", blue: "#346d87", gold: "#bb842c", pale: "#e9e5da" };
  let active = null;
  let state = null;
  let timer = null;

  const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  const sigmoid = (x) => 1 / (1 + Math.exp(-x));
  const line = (x1, y1, x2, y2, color = C.rule, width = 1.5, dash = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
  const text = (x, y, value, size = 13, color = C.ink, anchor = "middle", weight = 400) => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="system-ui,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
  const circle = (x, y, r, fill, stroke = "none", width = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
  const rect = (x, y, w, h, fill = C.paper, stroke = C.rule, radius = 4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}"/>`;
  const svg = (label, body, view = "0 0 800 420") => `<svg viewBox="${view}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  const deterministicUnit = (a, b = 0) => {
    const x = Math.sin((a + 1) * 12.9898 + (b + 3) * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function controls(extra = "") {
    return `<div class="lab-toolbar" aria-label="Visualization controls">
      <button type="button" data-lab-action="play">Play</button>
      <button type="button" data-lab-action="step">Step</button>
      <button type="button" data-lab-action="reset">Reset</button>
      <span class="lab-step" id="lab-step-label"></span>
      ${extra}
    </div>`;
  }

  function shell(extra = "") {
    return `<div class="computational-lab" data-lab-id="${active}">
      <div class="lab-stage" id="lab-stage" tabindex="0" aria-label="Interactive teaching visualization; use the controls below to advance it"></div>
      ${controls(extra)}
      <p class="lab-note" id="lab-note" aria-live="polite"></p>
      <p class="lab-disclosure">Deterministic teaching simulation · values are illustrative, not empirical estimates or investment advice.</p>
    </div>`;
  }

  function regressionData() {
    return Array.from({ length: 24 }, (_, i) => {
      const x = -1 + 2 * i / 23;
      const noise = 0.33 * Math.sin(i * 2.17) + 0.12 * Math.cos(i * .71);
      return { x, y: .35 + .72 * x + noise };
    });
  }

  function classificationData() {
    return Array.from({ length: 28 }, (_, i) => {
      const x = -2.6 + 5.2 * i / 27;
      const p = sigmoid(-.25 + 1.35 * x);
      return { x, y: deterministicUnit(i, 11) < p ? 1 : 0 };
    });
  }

  function initRegression() {
    return { mode: "regression", iteration: 0, visible: 6, b0: -.65, b1: -.55, threshold: .5, reg: regressionData(), cls: classificationData() };
  }

  function regressionStep() {
    const allData = state.mode === "regression" ? state.reg : state.cls;
    if (state.visible < allData.length) {
      state.visible = Math.min(allData.length, state.visible + 3);
      return;
    }
    const data = allData.slice(0, state.visible);
    let g0 = 0, g1 = 0;
    if (state.mode === "regression") {
      data.forEach((d) => { const error = state.b0 + state.b1 * d.x - d.y; g0 += error; g1 += error * d.x; });
      state.b0 -= .18 * 2 * g0 / data.length;
      state.b1 -= .18 * 2 * g1 / data.length;
    } else {
      data.forEach((d) => { const error = sigmoid(state.b0 + state.b1 * d.x) - d.y; g0 += error; g1 += error * d.x; });
      state.b0 -= .32 * g0 / data.length;
      state.b1 -= .32 * g1 / data.length;
    }
    state.iteration += 1;
  }

  function drawRegression() {
    const regression = state.mode === "regression";
    const allData = regression ? state.reg : state.cls;
    const data = allData.slice(0, state.visible);
    const x0 = 78, x1 = 748, y0 = 342, y1 = 42;
    const sx = (x) => regression ? x0 + (x + 1) / 2 * (x1 - x0) : x0 + (x + 2.6) / 5.2 * (x1 - x0);
    const sy = (y) => y0 - (regression ? (y + .7) / 2.1 : y) * (y0 - y1);
    let body = line(x0, y0, x1, y0, C.ink, 1.5) + line(x0, y0, x0, y1, C.ink, 1.5);
    body += text(413, 397, regression ? "Feature x" : "Classifier input x", 12, C.muted);
    body += text(23, 192, regression ? "Target y" : "Probability", 12, C.muted, "middle", 500);
    if (regression) {
      data.forEach((d) => {
        const fitted = state.b0 + state.b1 * d.x;
        body += line(sx(d.x), sy(d.y), sx(d.x), sy(fitted), C.rule, 1);
        body += circle(sx(d.x), sy(d.y), 4.5, C.blue);
      });
      body += line(sx(-1), sy(.35 - .72), sx(1), sy(.35 + .72), C.teal, 2, "7 6");
      body += line(sx(-1), sy(state.b0 - state.b1), sx(1), sy(state.b0 + state.b1), C.red, 4);
      const mse = data.reduce((sum, d) => sum + (state.b0 + state.b1 * d.x - d.y) ** 2, 0) / data.length;
      body += rect(520, 56, 210, 82, "#fbfaf6", C.rule) + text(538, 79, `${data.length} / ${allData.length} examples`, 12, C.muted, "start") + text(538, 101, `Iteration ${state.iteration}`, 12, C.muted, "start") + text(538, 124, `Mean squared error ${mse.toFixed(3)}`, 15, C.ink, "start", 600);
      body += text(535, 156, "dashed: data-generating trend", 11, C.teal, "start");
    } else {
      data.forEach((d) => body += circle(sx(d.x), sy(d.y ? .96 : .04), 5, d.y ? C.blue : C.gold));
      let path = "";
      for (let i = 0; i <= 100; i += 1) {
        const x = -2.6 + 5.2 * i / 100;
        const y = sigmoid(state.b0 + state.b1 * x);
        path += `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)} `;
      }
      body += `<path d="${path}" fill="none" stroke="${C.red}" stroke-width="4"/>`;
      body += line(x0, sy(state.threshold), x1, sy(state.threshold), C.teal, 2, "7 6");
      const boundary = Math.abs(state.b1) < .001 ? 0 : (Math.log(state.threshold / (1 - state.threshold)) - state.b0) / state.b1;
      if (boundary > -2.6 && boundary < 2.6) body += line(sx(boundary), y0, sx(boundary), y1, C.teal, 2);
      const loss = -data.reduce((sum, d) => { const p = clamp(sigmoid(state.b0 + state.b1 * d.x), 1e-6, 1 - 1e-6); return sum + d.y * Math.log(p) + (1 - d.y) * Math.log(1 - p); }, 0) / data.length;
      body += rect(505, 56, 225, 102, "#fbfaf6", C.rule) + text(523, 79, `${data.length} / ${allData.length} examples`, 12, C.muted, "start") + text(523, 101, `Iteration ${state.iteration}`, 12, C.muted, "start") + text(523, 124, `Log loss ${loss.toFixed(3)}`, 15, C.ink, "start", 600) + text(523, 148, `Action if p ≥ ${state.threshold.toFixed(2)}`, 12, C.teal, "start");
    }
    document.getElementById("lab-stage").innerHTML = svg(regression ? "Gradient descent fits a regression line" : "Logistic regression turns a score into a probability and threshold decision", body);
    document.getElementById("lab-note").textContent = state.visible < allData.length
      ? "The first steps reveal the deterministic sample. This separates seeing the data from fitting a function to it."
      : regression
        ? "Each later step follows the loss gradient. The red fitted line moves toward the data while the residual segments shrink."
        : "Training changes the red probability curve. The threshold changes the action boundary without retraining the classifier.";
    document.getElementById("lab-step-label").textContent = state.visible < allData.length ? `${state.visible} / ${allData.length} examples` : `Training iteration ${state.iteration}`;
  }

  function pcaPoints() {
    return Array.from({ length: 30 }, (_, i) => {
      const t = (i - 14.5) / 7;
      const n = .34 * Math.sin(i * 2.31);
      return { x: 1.15 * t - .38 * n, y: .68 * t + .64 * n };
    });
  }

  function clusterPoints() {
    const centers = [[-1.7, -.7], [.15, 1.1], [1.75, -.45]];
    return Array.from({ length: 36 }, (_, i) => {
      const c = centers[i % 3];
      return { x: c[0] + .48 * Math.cos(i * 1.71), y: c[1] + .38 * Math.sin(i * 2.09) };
    });
  }

  function clusterReset(k = 3) {
    const seeds = [[-2.3, 1.5], [0, -1.65], [2.3, 1.4], [-.2, .1]];
    state.centers = seeds.slice(0, k).map((p) => [...p]);
    state.assignments = Array(state.cluster.length).fill(-1);
    state.phase = "assign";
    state.iteration = 0;
  }

  function initUnsupervised() {
    const s = { mode: "pca", iteration: 0, vector: [1, 0], pca: pcaPoints(), cluster: clusterPoints(), k: 3 };
    state = s;
    clusterReset(3);
    return s;
  }

  function unsupervisedStep() {
    if (state.mode === "pca") {
      const means = state.pca.reduce((m, p) => [m[0] + p.x / state.pca.length, m[1] + p.y / state.pca.length], [0, 0]);
      let xx = 0, xy = 0, yy = 0;
      state.pca.forEach((p) => { const x = p.x - means[0], y = p.y - means[1]; xx += x * x; xy += x * y; yy += y * y; });
      const [vx, vy] = state.vector;
      const next = [xx * vx + xy * vy, xy * vx + yy * vy];
      const norm = Math.hypot(...next);
      state.vector = next.map((v) => v / norm);
      state.iteration += 1;
      return;
    }
    if (state.phase === "assign") {
      state.assignments = state.cluster.map((p) => {
        let best = 0, distance = Infinity;
        state.centers.forEach((c, j) => { const d = (p.x - c[0]) ** 2 + (p.y - c[1]) ** 2; if (d < distance) { distance = d; best = j; } });
        return best;
      });
      state.phase = "update";
    } else {
      state.centers = state.centers.map((center, j) => {
        const group = state.cluster.filter((_, i) => state.assignments[i] === j);
        return group.length ? [group.reduce((a, p) => a + p.x, 0) / group.length, group.reduce((a, p) => a + p.y, 0) / group.length] : center;
      });
      state.phase = "assign";
      state.iteration += 1;
    }
  }

  function drawUnsupervised() {
    const mapX = (x) => 400 + x * 130, mapY = (y) => 215 - y * 82;
    let body = line(70, 215, 735, 215, C.rule) + line(400, 35, 400, 385, C.rule);
    if (state.mode === "pca") {
      const [vx, vy] = state.vector;
      state.pca.forEach((p) => {
        const projection = p.x * vx + p.y * vy;
        const px = projection * vx, py = projection * vy;
        body += line(mapX(p.x), mapY(p.y), mapX(px), mapY(py), C.rule, 1);
        body += circle(mapX(p.x), mapY(p.y), 4.5, C.blue);
        body += circle(mapX(px), mapY(py), 2.3, C.red);
      });
      body += line(mapX(-3 * vx), mapY(-3 * vy), mapX(3 * vx), mapY(3 * vy), C.red, 4);
      const angle = Math.atan2(vy, vx) * 180 / Math.PI;
      body += rect(535, 48, 185, 70, "#fbfaf6", C.rule) + text(552, 73, `Power iteration ${state.iteration}`, 12, C.muted, "start") + text(552, 99, `Axis angle ${angle.toFixed(1)}°`, 16, C.ink, "start", 600);
      document.getElementById("lab-note").textContent = "Each step multiplies the current direction by the sample covariance matrix, then normalizes it. The projected red dots show the one-dimensional representation PCA is learning.";
      document.getElementById("lab-step-label").textContent = `Power iteration ${state.iteration}`;
    } else {
      const palette = [C.blue, C.red, C.gold, C.teal];
      state.cluster.forEach((p, i) => {
        const a = state.assignments[i];
        if (a >= 0) body += line(mapX(p.x), mapY(p.y), mapX(state.centers[a][0]), mapY(state.centers[a][1]), palette[a], .8);
        body += circle(mapX(p.x), mapY(p.y), 5, a >= 0 ? palette[a] : C.muted);
      });
      state.centers.forEach((c, i) => {
        body += circle(mapX(c[0]), mapY(c[1]), 12, C.paper, palette[i], 4);
        body += line(mapX(c[0]) - 7, mapY(c[1]), mapX(c[0]) + 7, mapY(c[1]), palette[i], 3);
        body += line(mapX(c[0]), mapY(c[1]) - 7, mapX(c[0]), mapY(c[1]) + 7, palette[i], 3);
      });
      const inertia = state.assignments[0] < 0 ? null : state.cluster.reduce((sum, p, i) => { const c = state.centers[state.assignments[i]]; return sum + (p.x - c[0]) ** 2 + (p.y - c[1]) ** 2; }, 0);
      body += rect(535, 48, 185, 74, "#fbfaf6", C.rule) + text(552, 73, `Lloyd iteration ${state.iteration}`, 12, C.muted, "start") + text(552, 99, inertia === null ? "Centers initialized" : `Within-cluster loss ${inertia.toFixed(2)}`, 14, C.ink, "start", 600);
      document.getElementById("lab-note").textContent = state.phase === "update" ? "Assignment step complete: every point chose its nearest center. Step again to move each center to its assigned mean." : "Update step complete: the centers moved. Step again to reassign points under the new geometry.";
      document.getElementById("lab-step-label").textContent = `${state.phase === "assign" ? "Next: assign points" : "Next: update centers"}`;
    }
    document.getElementById("lab-stage").innerHTML = svg(state.mode === "pca" ? "Power iteration learns the first principal axis and projects each point" : "K-means alternates assignment and center update steps", body);
  }

  const portfolioAssets = [
    { name: "Bond-like", mu: .045, color: C.teal },
    { name: "Balanced", mu: .078, color: C.blue },
    { name: "Growth", mu: .115, color: C.red }
  ];
  const covariance = [[.0064, .0022, .0027], [.0022, .0196, .0105], [.0027, .0105, .0484]];

  function portfolioPoint(w) {
    const ret = w.reduce((sum, x, i) => sum + x * portfolioAssets[i].mu, 0);
    let variance = 0;
    w.forEach((wi, i) => w.forEach((wj, j) => variance += wi * wj * covariance[i][j]));
    return { w, ret, risk: Math.sqrt(variance), variance };
  }

  function portfolioCloud() {
    const points = [];
    for (let a = 0; a <= 100; a += 2) for (let b = 0; b <= 100 - a; b += 2) points.push(portfolioPoint([a / 100, b / 100, (100 - a - b) / 100]));
    return points;
  }

  function initPortfolio() {
    const cloud = portfolioCloud();
    return { riskPenalty: 5, direction: -1, iteration: 0, cloud };
  }

  function portfolioChoice() {
    return state.cloud.reduce((best, p) => (p.ret - .5 * state.riskPenalty * p.variance > best.ret - .5 * state.riskPenalty * best.variance ? p : best), state.cloud[0]);
  }

  function portfolioStep() {
    state.riskPenalty += state.direction * .5;
    if (state.riskPenalty <= 0) { state.riskPenalty = 0; state.direction = 1; }
    if (state.riskPenalty >= 10) { state.riskPenalty = 10; state.direction = -1; }
    state.iteration += 1;
  }

  function drawPortfolio() {
    const chosen = portfolioChoice();
    const px = (risk) => 65 + (risk - .065) / .17 * 470;
    const py = (ret) => 335 - (ret - .04) / .08 * 275;
    let body = line(65, 335, 540, 335, C.ink) + line(65, 335, 65, 45, C.ink);
    state.cloud.filter((_, i) => i % 3 === 0).forEach((p) => body += circle(px(p.risk), py(p.ret), 1.6, "#c9c5bb"));
    const frontier = [...state.cloud].sort((a, b) => a.risk - b.risk).reduce((acc, p) => { if (!acc.length || p.ret > acc[acc.length - 1].ret + .0002) acc.push(p); return acc; }, []);
    body += `<path d="${frontier.map((p, i) => `${i ? "L" : "M"}${px(p.risk).toFixed(1)},${py(p.ret).toFixed(1)}`).join(" ")}" fill="none" stroke="${C.teal}" stroke-width="4"/>`;
    body += circle(px(chosen.risk), py(chosen.ret), 9, C.red, C.paper, 3);
    body += text(300, 390, "Expected volatility", 12, C.muted) + text(21, 190, "Expected return", 12, C.muted);
    body += rect(570, 45, 185, 290, "#fbfaf6", C.rule);
    body += text(590, 72, `Risk penalty λ = ${state.riskPenalty.toFixed(1)}`, 13, C.ink, "start", 600);
    body += text(590, 96, `Return ${(chosen.ret * 100).toFixed(1)}%`, 12, C.muted, "start") + text(590, 116, `Volatility ${(chosen.risk * 100).toFixed(1)}%`, 12, C.muted, "start");
    chosen.w.forEach((w, i) => {
      const y = 153 + i * 57;
      body += text(590, y, portfolioAssets[i].name, 11, C.muted, "start") + rect(590, y + 9, 135, 18, C.pale, C.pale, 2) + rect(590, y + 9, 135 * w, 18, portfolioAssets[i].color, portfolioAssets[i].color, 2) + text(735, y + 23, `${Math.round(w * 100)}%`, 11, C.ink, "end");
    });
    document.getElementById("lab-stage").innerHTML = svg("An efficient frontier and portfolio weights respond to the risk penalty", body);
    document.getElementById("lab-note").textContent = "The gray cloud contains feasible long-only portfolios; the green edge is the efficient frontier. Raising λ makes variance more expensive and changes the selected red portfolio and its weights.";
    document.getElementById("lab-step-label").textContent = `λ ${state.riskPenalty.toFixed(1)}`;
    const slider = document.querySelector("[data-lab-range='riskPenalty']");
    if (slider) slider.value = state.riskPenalty;
  }

  function neuralInitWeights() {
    return { w1: [[.35, -.48], [-.28, .62], [.54, .21]], b1: [-.1, .12, -.18], w2: [.42, -.57, .36], b2: -.08 };
  }

  const xorData = [{ x: [0, 0], y: 0 }, { x: [0, 1], y: 1 }, { x: [1, 0], y: 1 }, { x: [1, 1], y: 0 }];
  function neuralForward(weights, x) {
    const h = weights.w1.map((row, j) => Math.tanh(row[0] * x[0] + row[1] * x[1] + weights.b1[j]));
    const z = weights.w2.reduce((sum, w, j) => sum + w * h[j], weights.b2);
    return { h, p: sigmoid(z) };
  }

  function neuralTrainEpoch(weights, learningRate) {
    const g = { w1: [[0, 0], [0, 0], [0, 0]], b1: [0, 0, 0], w2: [0, 0, 0], b2: 0 };
    xorData.forEach((d) => {
      const f = neuralForward(weights, d.x), dz = f.p - d.y;
      f.h.forEach((h, j) => { g.w2[j] += dz * h; const dh = dz * weights.w2[j] * (1 - h * h); g.w1[j][0] += dh * d.x[0]; g.w1[j][1] += dh * d.x[1]; g.b1[j] += dh; });
      g.b2 += dz;
    });
    const scale = learningRate / xorData.length;
    weights.w1.forEach((row, j) => row.forEach((_, i) => weights.w1[j][i] -= scale * g.w1[j][i]));
    weights.b1.forEach((_, j) => weights.b1[j] -= scale * g.b1[j]);
    weights.w2.forEach((_, j) => weights.w2[j] -= scale * g.w2[j]);
    weights.b2 -= scale * g.b2;
  }

  function neuralLoss() {
    return xorData.reduce((sum, d) => { const p = clamp(neuralForward(state.weights, d.x).p, 1e-6, 1 - 1e-6); return sum - d.y * Math.log(p) - (1 - d.y) * Math.log(1 - p); }, 0) / xorData.length;
  }

  function initNeural() {
    return { phase: 0, epoch: 0, learningRate: .8, weights: neuralInitWeights(), losses: [] };
  }

  function neuralStep() {
    state.phase = (state.phase + 1) % 4;
    if (state.phase === 0) {
      for (let i = 0; i < 8; i += 1) neuralTrainEpoch(state.weights, state.learningRate);
      state.epoch += 8;
      state.losses.push(neuralLoss());
      if (state.losses.length > 70) state.losses.shift();
    }
  }

  function drawNeural() {
    const sample = xorData[Math.floor(state.epoch / 16) % 4], f = neuralForward(state.weights, sample.x), loss = neuralLoss();
    const xs = [105, 330, 555], inputY = [135, 255], hiddenY = [95, 195, 295], outputY = 195;
    let body = "";
    state.weights.w1.forEach((row, j) => row.forEach((w, i) => body += line(xs[0] + 16, inputY[i], xs[1] - 16, hiddenY[j], state.phase >= 1 ? (w >= 0 ? C.blue : C.gold) : C.rule, 1 + Math.abs(w) * 2)));
    state.weights.w2.forEach((w, j) => body += line(xs[1] + 16, hiddenY[j], xs[2] - 16, outputY, state.phase >= 2 ? (w >= 0 ? C.blue : C.gold) : C.rule, 1 + Math.abs(w) * 2));
    sample.x.forEach((value, i) => { body += circle(xs[0], inputY[i], 25, state.phase >= 0 ? C.blue : C.pale); body += text(xs[0], inputY[i] + 5, value.toFixed(0), 15, "white", "middle", 700); });
    f.h.forEach((value, j) => { body += circle(xs[1], hiddenY[j], 25, state.phase >= 1 ? C.teal : C.pale); body += text(xs[1], hiddenY[j] + 5, value.toFixed(2), 12, state.phase >= 1 ? "white" : C.muted, "middle", 600); });
    body += circle(xs[2], outputY, 31, state.phase >= 2 ? C.red : C.pale) + text(xs[2], outputY + 5, f.p.toFixed(2), 14, state.phase >= 2 ? "white" : C.muted, "middle", 700);
    body += text(xs[0], 350, "INPUTS", 11, C.muted) + text(xs[1], 350, "HIDDEN ACTIVATIONS", 11, C.muted) + text(xs[2], 350, "PREDICTED PROBABILITY", 11, C.muted);
    const phases = ["Load inputs", "Compute hidden layer", "Compute output and loss", "Backpropagate gradients"];
    body += rect(620, 55, 145, 270, "#fbfaf6", C.rule) + text(638, 82, phases[state.phase], 12, C.ink, "start", 700) + text(638, 108, `Epoch ${state.epoch}`, 12, C.muted, "start") + text(638, 130, `Loss ${loss.toFixed(3)}`, 12, C.muted, "start");
    xorData.forEach((d, i) => { const p = neuralForward(state.weights, d.x).p; body += text(638, 170 + i * 28, `${d.x.join(" ⊕ ")} → ${p.toFixed(2)}  [${d.y}]`, 11, Math.abs(p - d.y) < .25 ? C.teal : C.red, "start"); });
    document.getElementById("lab-stage").innerHTML = svg("Forward propagation and backpropagation train a small neural network on XOR", body);
    document.getElementById("lab-note").textContent = state.phase < 3 ? "Follow one example from inputs to hidden activations to predicted probability. Line color shows the sign of each weight; thickness shows its magnitude." : "The loss gradient now flows backward. The next step applies eight batch-gradient updates, then the four XOR predictions are evaluated again.";
    document.getElementById("lab-step-label").textContent = `${phases[state.phase]} · epoch ${state.epoch}`;
  }

  function initReinforcement() {
    return { mode: "bandit", step: 0, epsilon: .18, means: [.28, .50, .68], counts: [0, 0, 0], estimates: [0, 0, 0], regret: 0, regretHistory: [0], lastArm: -1, values: [0, 0, 0, 0], bellmanState: 2, gamma: .9, lastBackup: "Step to perform a Bellman backup." };
  }

  function rlStep() {
    if (state.mode === "bandit") {
      const explore = deterministicUnit(state.step, 41) < state.epsilon;
      let arm;
      if (explore) arm = Math.floor(deterministicUnit(state.step, 73) * 3);
      else {
        const untried = state.counts.findIndex((n) => n === 0);
        arm = untried >= 0 ? untried : state.estimates.indexOf(Math.max(...state.estimates));
      }
      const reward = deterministicUnit(state.step, arm + 101) < state.means[arm] ? 1 : 0;
      state.counts[arm] += 1;
      state.estimates[arm] += (reward - state.estimates[arm]) / state.counts[arm];
      state.regret += Math.max(...state.means) - state.means[arm];
      state.step += 1; state.lastArm = arm; state.regretHistory.push(state.regret);
      return;
    }
    const s = state.bellmanState;
    const q = (action) => {
      const intended = clamp(s + action, 0, 3), slipped = clamp(s - action, 0, 3);
      const rewardFor = (next) => next === 3 ? 1 : -.05;
      return .8 * (rewardFor(intended) + state.gamma * state.values[intended]) + .2 * (rewardFor(slipped) + state.gamma * state.values[slipped]);
    };
    const left = q(-1), right = q(1), next = Math.max(left, right);
    state.values[s] = next;
    state.lastBackup = `V(${s}) ← max(${left.toFixed(3)}, ${right.toFixed(3)}) = ${next.toFixed(3)}`;
    state.bellmanState = s === 0 ? 2 : s - 1;
    state.step += 1;
  }

  function drawReinforcement() {
    let body = "";
    if (state.mode === "bandit") {
      body += rect(35, 45, 430, 305, "#fbfaf6", C.rule) + text(55, 73, "Estimated reward by arm", 13, C.ink, "start", 700);
      state.estimates.forEach((q, i) => {
        const x = 85 + i * 125, h = q * 220;
        body += rect(x, 105, 70, 220, C.pale, C.pale, 2) + rect(x, 325 - h, 70, h, i === state.lastArm ? C.red : C.blue, i === state.lastArm ? C.red : C.blue, 2);
        body += line(x, 325 - state.means[i] * 220, x + 70, 325 - state.means[i] * 220, C.teal, 3, "5 4");
        body += text(x + 35, 345, `Arm ${i + 1}`, 11, C.muted) + text(x + 35, 96, `n=${state.counts[i]}`, 11, C.muted);
      });
      body += rect(495, 45, 270, 305, "#fbfaf6", C.rule) + text(515, 73, "Cumulative expected regret", 13, C.ink, "start", 700);
      const maxR = Math.max(1, ...state.regretHistory), history = state.regretHistory.slice(-80);
      const path = history.map((r, i) => `${i ? "L" : "M"}${515 + i / Math.max(1, history.length - 1) * 225},${315 - r / maxR * 205}`).join(" ");
      body += line(515, 315, 740, 315, C.ink) + line(515, 315, 515, 95, C.ink) + `<path d="${path}" fill="none" stroke="${C.red}" stroke-width="3"/>`;
      body += text(515, 337, "decisions", 10, C.muted, "start") + text(740, 92, state.regret.toFixed(2), 12, C.red, "end", 700);
      document.getElementById("lab-note").textContent = "The dashed marks are the arms' hidden reward rates. Epsilon sometimes explores; otherwise the policy exploits its current estimate. Regret accumulates whenever it chooses a lower-mean arm.";
      document.getElementById("lab-step-label").textContent = `${state.step} pulls · regret ${state.regret.toFixed(2)}`;
    } else {
      const positions = [110, 290, 470, 650];
      body += text(400, 54, "A changing state adds continuation value", 17, C.ink, "middle", 600);
      positions.forEach((x, i) => {
        const activeState = i === state.bellmanState;
        body += circle(x, 180, 48, i === 3 ? C.teal : activeState ? C.red : C.pale, C.ink, activeState ? 3 : 1);
        body += text(x, 174, i === 3 ? "GOAL" : `State ${i}`, 12, i === 3 || activeState ? "white" : C.ink, "middle", 700);
        body += text(x, 197, `V=${state.values[i].toFixed(2)}`, 11, i === 3 || activeState ? "white" : C.muted);
        if (i < 3) body += line(x + 52, 166, positions[i + 1] - 52, 166, C.blue, 3) + text((x + positions[i + 1]) / 2, 153, "right", 10, C.blue);
        if (i > 0 && i < 3) body += line(x - 52, 198, positions[i - 1] + 52, 198, C.gold, 2) + text((x + positions[i - 1]) / 2, 220, "left", 10, C.gold);
      });
      body += rect(130, 280, 540, 80, "#fbfaf6", C.rule) + text(400, 309, state.lastBackup, 15, C.ink, "middle", 700) + text(400, 337, `80% intended transition · 20% slip · γ=${state.gamma.toFixed(2)}`, 12, C.muted);
      document.getElementById("lab-note").textContent = "A Bellman backup compares actions using immediate reward plus discounted successor value. The highlighted state updates next; repeated sweeps propagate the goal's value backward.";
      document.getElementById("lab-step-label").textContent = `${state.step} backups`;
    }
    document.getElementById("lab-stage").innerHTML = svg(state.mode === "bandit" ? "A one-state bandit balances exploration, exploitation, and regret" : "Bellman updates propagate value through state transitions", body);
  }

  function initCausal() {
    return { stage: 0, effect: 3, trendGap: 0, iteration: 0 };
  }

  function causalStep() {
    state.stage = (state.stage + 1) % 4;
    state.iteration += 1;
  }

  function drawCausal() {
    const times = [-3, -2, -1, 0, 1, 2], px = (t) => 85 + (t + 3) / 5 * 610, py = (v) => 345 - (v - 7) / 12 * 280;
    const control = times.map((t) => 10 + .7 * t);
    const counter = times.map((t) => 12 + (.7 + state.trendGap) * t);
    const treated = counter.map((v, i) => v + (times[i] >= 0 ? state.effect : 0));
    const path = (values) => values.map((v, i) => `${i ? "L" : "M"}${px(times[i])},${py(v)}`).join(" ");
    let body = line(65, 345, 725, 345, C.ink) + line(65, 345, 65, 45, C.ink) + line(px(-.5), 45, px(-.5), 345, C.rule, 2, "7 6");
    body += text(px(-.5), 32, "INTERVENTION", 10, C.muted);
    body += `<path d="${path(control)}" fill="none" stroke="${C.blue}" stroke-width="4"/>`;
    body += `<path d="${path(treated)}" fill="none" stroke="${C.red}" stroke-width="4"/>`;
    times.forEach((t, i) => { body += circle(px(t), py(control[i]), 4, C.blue) + circle(px(t), py(treated[i]), 4, C.red); });
    if (state.stage >= 2) body += `<path d="${path(counter)}" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="8 6"/>`;
    if (state.stage >= 3) {
      const last = times.length - 1;
      body += line(px(2) + 12, py(counter[last]), px(2) + 12, py(treated[last]), C.teal, 4) + text(px(2) - 5, (py(counter[last]) + py(treated[last])) / 2, `effect ${state.effect.toFixed(1)}`, 11, C.teal, "end", 700);
    }
    body += text(90, 63, "Treated", 12, C.red, "start", 700) + text(90, 82, "Comparison", 12, C.blue, "start", 700);
    if (state.stage >= 2) body += text(90, 101, "Treated counterfactual", 12, C.gold, "start", 700);
    const did = (treated[5] - treated[2]) - (control[5] - control[2]);
    const labels = ["1 · Observe two paths", "2 · Compare pre/post changes", "3 · Construct the counterfactual", "4 · Subtract the changes"];
    body += rect(455, 52, 255, 84, "#fbfaf6", C.rule) + text(473, 78, labels[state.stage], 12, C.ink, "start", 700) + text(473, 103, state.stage >= 3 ? `DiD estimate = ${did.toFixed(2)}` : "DiD estimate = not yet", 15, C.teal, "start", 700) + text(473, 124, `Planted effect = ${state.effect.toFixed(2)}`, 11, C.muted, "start");
    document.getElementById("lab-stage").innerHTML = svg("Difference in differences constructs a counterfactual from a comparison trend", body);
    document.getElementById("lab-note").textContent = state.trendGap === 0
      ? "With parallel untreated trends, subtracting the comparison group's change removes the shared time trend and recovers the planted treatment effect."
      : "The groups no longer have parallel untreated trends. DiD now mixes the planted treatment effect with the trend gap—an assumption failure the arithmetic cannot repair.";
    document.getElementById("lab-step-label").textContent = labels[state.stage];
  }

  const configs = {
    "regression-classification": {
      init: initRegression, step: regressionStep, draw: drawRegression,
      extras: `<span class="lab-segmented"><button type="button" data-lab-mode="regression" aria-pressed="true">Regression</button><button type="button" data-lab-mode="classification" aria-pressed="false">Classification</button></span><label class="lab-parameter classification-only">Decision threshold <input type="range" min="0.25" max="0.75" step="0.05" value="0.5" data-lab-range="threshold"><output data-lab-output="threshold">0.50</output></label>`
    },
    "optimization-unsupervised": {
      init: initUnsupervised, step: unsupervisedStep, draw: drawUnsupervised,
      extras: `<span class="lab-segmented"><button type="button" data-lab-mode="pca" aria-pressed="true">PCA</button><button type="button" data-lab-mode="kmeans" aria-pressed="false">K-means</button></span><label class="lab-parameter kmeans-only">Clusters <select data-lab-select="k"><option>2</option><option selected>3</option><option>4</option></select></label>`
    },
    "portfolio": {
      init: initPortfolio, step: portfolioStep, draw: drawPortfolio,
      extras: `<label class="lab-parameter">Risk penalty λ <input type="range" min="0" max="10" step="0.5" value="5" data-lab-range="riskPenalty"><output data-lab-output="riskPenalty">5.0</output></label>`
    },
    "neural-networks": {
      init: initNeural, step: neuralStep, draw: drawNeural,
      extras: `<label class="lab-parameter">Learning rate <input type="range" min="0.2" max="1.4" step="0.1" value="0.8" data-lab-range="learningRate"><output data-lab-output="learningRate">0.8</output></label>`
    },
    "reinforcement-learning": {
      init: initReinforcement, step: rlStep, draw: drawReinforcement,
      extras: `<span class="lab-segmented"><button type="button" data-lab-mode="bandit" aria-pressed="true">Bandit</button><button type="button" data-lab-mode="bellman" aria-pressed="false">Bellman updates</button></span><label class="lab-parameter bandit-only">Exploration ε <input type="range" min="0" max="0.5" step="0.05" value="0.18" data-lab-range="epsilon"><output data-lab-output="epsilon">0.18</output></label><label class="lab-parameter bellman-only">Discount γ <input type="range" min="0.5" max="0.99" step="0.01" value="0.9" data-lab-range="gamma"><output data-lab-output="gamma">0.90</output></label>`
    },
    "causal-policy": {
      init: initCausal, step: causalStep, draw: drawCausal,
      extras: `<label class="lab-parameter">True effect <input type="range" min="0" max="5" step="0.5" value="3" data-lab-range="effect"><output data-lab-output="effect">3.0</output></label><label class="lab-parameter">Trend gap <input type="range" min="0" max="0.8" step="0.1" value="0" data-lab-range="trendGap"><output data-lab-output="trendGap">0.0</output></label>`
    }
  };

  function syncConditionalControls() {
    document.querySelectorAll(".classification-only").forEach((el) => { el.hidden = state.mode !== "classification"; });
    document.querySelectorAll(".kmeans-only").forEach((el) => { el.hidden = state.mode !== "kmeans"; });
    document.querySelectorAll(".bandit-only").forEach((el) => { el.hidden = state.mode !== "bandit"; });
    document.querySelectorAll(".bellman-only").forEach((el) => { el.hidden = state.mode !== "bellman"; });
  }

  function draw() {
    if (!active || !document.getElementById("lab-stage")) return;
    configs[active].draw();
    syncConditionalControls();
    const play = document.querySelector("[data-lab-action='play']");
    if (play) { play.textContent = timer ? "Pause" : "Play"; play.setAttribute("aria-pressed", String(Boolean(timer))); }
  }

  function reset() {
    stop();
    state = configs[active].init();
    draw();
  }

  function render(topic, target) {
    stop();
    if (!LAB_IDS.has(topic.id)) { active = null; state = null; return false; }
    active = topic.id;
    state = configs[active].init();
    target.innerHTML = shell(configs[active].extras);
    draw();
    return true;
  }

  document.addEventListener("click", (event) => {
    if (!active || !event.target.closest("[data-lab-id]")) return;
    const action = event.target.closest("[data-lab-action]");
    const mode = event.target.closest("[data-lab-mode]");
    if (mode) {
      stop();
      state.mode = mode.dataset.labMode;
      if (active === "regression-classification") { state.iteration = 0; state.visible = 6; state.b0 = -.65; state.b1 = -.55; }
      if (active === "optimization-unsupervised") { state.iteration = 0; state.vector = [1, 0]; if (state.mode === "kmeans") clusterReset(state.k); }
      if (active === "reinforcement-learning") { const modeName = state.mode; const fresh = initReinforcement(); Object.assign(state, fresh, { mode: modeName }); }
      document.querySelectorAll("[data-lab-mode]").forEach((button) => button.setAttribute("aria-pressed", String(button === mode)));
      draw();
      return;
    }
    if (!action) return;
    if (action.dataset.labAction === "step") { stop(); configs[active].step(); draw(); }
    if (action.dataset.labAction === "reset") reset();
    if (action.dataset.labAction === "play") {
      if (timer) { stop(); draw(); return; }
      const delay = active === "neural-networks" ? 260 : 520;
      timer = window.setInterval(() => { if (!active || !document.getElementById("lab-stage")) { stop(); return; } configs[active].step(); draw(); }, delay);
      draw();
    }
  });

  document.addEventListener("input", (event) => {
    if (!active || !event.target.closest("[data-lab-id]") || !event.target.dataset.labRange) return;
    const key = event.target.dataset.labRange;
    state[key] = Number(event.target.value);
    const out = document.querySelector(`[data-lab-output='${key}']`);
    if (out) out.value = state[key].toFixed(key === "riskPenalty" || key === "effect" || key === "trendGap" || key === "learningRate" ? 1 : 2);
    draw();
  });

  document.addEventListener("change", (event) => {
    if (!active || !event.target.closest("[data-lab-id]") || event.target.dataset.labSelect !== "k") return;
    stop(); state.k = Number(event.target.value); clusterReset(state.k); draw();
  });

  document.addEventListener("visibilitychange", () => { if (document.hidden) { stop(); draw(); } });
  window.addEventListener("hashchange", stop);
  window.FinmlLabs = { render, stop };
})();
