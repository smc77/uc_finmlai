(() => {
  "use strict";

  const atlas = window.COURSE_ATLAS;
  const app = document.getElementById("app");
  const nav = document.getElementById("topic-navigation");
  const courseNav = document.getElementById("course-nav");
  const navToggle = document.getElementById("nav-toggle");
  const readingMode = document.getElementById("reading-mode");
  const glossary = document.getElementById("glossary");
  const glossaryToggle = document.getElementById("glossary-toggle");
  const glossaryClose = document.getElementById("glossary-close");
  const glossarySearch = document.getElementById("glossary-search");
  const glossaryScope = document.getElementById("glossary-scope");
  const glossaryCategory = document.getElementById("glossary-category");
  const glossaryCount = document.getElementById("glossary-count");
  const glossaryList = document.getElementById("glossary-list");
  const scrim = document.getElementById("scrim");

  const topicById = new Map(atlas.topics.map((topic, index) => [topic.id, { topic, index }]));
  const visualState = new Map();
  let overviewStage = 0;
  let currentTopic = null;

  const pipelineNotes = [
    "Reconstruct the records and versions available at the historical decision time.",
    "Build measurements using transformations fitted only on eligible development data.",
    "Estimate a magnitude, score, probability, representation, or action—not a vague promise of intelligence.",
    "Specify how the output changes a threshold, position, allocation, or policy.",
    "Account for constraints, market frictions, fills, permissions, and the action actually taken.",
    "Judge the frozen procedure with later observations, relevant baselines, uncertainty, and limitations."
  ];

  function esc(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function getVisualState(topic) {
    if (!visualState.has(topic.id)) {
      visualState.set(topic.id, {
        mode: 0,
        value: topic.figure.value ?? topic.figure.min ?? 0
      });
    }
    return visualState.get(topic.id);
  }

  function lectureUrl(path) {
    return `https://github.com/smc77/uc_finmlai/tree/main/${path}`;
  }

  function renderNavigation(activeId = "") {
    nav.innerHTML = atlas.chapters.map((chapter) => {
      const links = chapter.topics.map((id) => {
        const { topic, index } = topicById.get(id);
        return `
          <button class="topic-link" type="button" data-topic="${topic.id}" ${activeId === topic.id ? 'aria-current="page"' : ""}>
            <span class="topic-number">${String(index + 1).padStart(2, "0")}</span>
            <span>${esc(topic.title)}</span>
          </button>`;
      }).join("");
      return `
        <section class="chapter-nav">
          <h2 class="chapter-nav-title">${chapter.number} · ${esc(chapter.title)}</h2>
          ${links}
        </section>`;
    }).join("");
  }

  function renderOverview() {
    currentTopic = null;
    renderNavigation();
    document.title = "Financial Machine Learning & AI — Course Atlas";
    const sessionCount = atlas.courseMap.reduce((total, week) => total + week.sessions.length, 0);
    const courseMapUrl = "https://github.com/smc77/uc_finmlai/blob/main/docs/course_map.md";
    app.innerHTML = `
      <section class="overview-hero">
        <div>
          <p class="kicker">FIN 7057 · Financial Machine Learning &amp; AI</p>
          <h1 class="display-title">The course,<br>mapped from<br><em>data to decision.</em></h1>
          <p class="hero-deck">A week-by-week guide to the methods, decisions, and standards of evidence that make financial machine learning useful.</p>
        </div>
        <aside class="hero-note">
          <p>Start with the calendar below, then open an atlas topic when you want the larger argument, an interactive demonstration, or a project checklist.</p>
          <button class="hero-map-link" type="button" data-course-map-jump>Browse all weeks ↓</button>
          <small>16 weeks including setup · ${sessionCount} sessions · ${atlas.topics.length} interactive deep dives</small>
        </aside>
      </section>

      <section class="pipeline-section" aria-labelledby="pipeline-heading">
        <div class="section-heading">
          <p class="kicker">The organizing idea</p>
          <div>
            <h2 id="pipeline-heading">A model never stands alone.</h2>
            <p>Choose a stage. Each carries a different burden of proof, and every handoff can change the final result.</p>
          </div>
        </div>
        <div class="pipeline" role="list" aria-label="Financial machine learning research path">
          ${["Information", "Features", "Prediction", "Decision", "Implementation", "Evidence"].map((label, i) => `
            <button class="pipeline-step ${i === overviewStage ? "active" : ""}" type="button" data-overview-stage="${i}" role="listitem">
              <span>0${i + 1}</span><strong>${label}</strong>
            </button>`).join("")}
        </div>
        <p class="pipeline-detail" id="pipeline-detail">${pipelineNotes[overviewStage]}</p>
      </section>

      <section class="course-map-home" aria-labelledby="course-map-heading">
        <div class="course-map-intro">
          <p class="kicker">The complete course map</p>
          <div>
            <h2 id="course-map-heading">What the course covers, week by week.</h2>
            <p>Each week adds a method and a burden of proof. The sequence moves from point-in-time data to fitted models, implemented decisions, and claims that can survive scrutiny.</p>
            <a href="${courseMapUrl}">Open the repository course map ↗</a>
          </div>
        </div>

        <div class="course-map-toolbar">
          <div class="course-map-toolbar-label">
            <label class="kicker" for="course-topic-search">Find a topic</label>
            <p id="course-search-status" aria-live="polite">${atlas.courseMap.length} weeks · ${sessionCount} sessions</p>
          </div>
          <div>
            <input id="course-topic-search" class="course-topic-search" type="search" data-course-search aria-describedby="course-search-status" placeholder="Try “calibration,” “PCA,” or “governance”" autocomplete="off">
            <nav class="course-phase-nav" aria-label="Jump to a course phase">
              ${atlas.chapters.map((chapter, phaseIndex) => `<button type="button" data-course-phase-jump="${phaseIndex}"><span>${chapter.number}</span>${esc(chapter.title)}</button>`).join("")}
            </nav>
          </div>
        </div>

        ${atlas.chapters.map((chapter, phaseIndex) => {
          const weeks = atlas.courseMap.filter((week) => week.phase === phaseIndex);
          return `<section class="course-phase" data-course-phase-section="${phaseIndex}" aria-labelledby="phase-${phaseIndex}">
            <header class="course-phase-heading">
              <span>${chapter.number}</span>
              <div>
                <h2 id="phase-${phaseIndex}">${esc(chapter.title)}</h2>
                <p>${esc(chapter.description)}</p>
              </div>
            </header>
            <div class="course-weeks">
              ${weeks.map((week) => {
                const materialsUrl = week.materials ? lectureUrl(week.materials) : courseMapUrl;
                return `<article class="course-week" id="week-${week.week}" data-course-week>
                  <div class="week-stamp">
                    <span>Week ${week.week}</span>
                    <small>${esc(week.date)}</small>
                  </div>
                  <div class="week-content">
                    <h3>${esc(week.theme)}</h3>
                    <ol class="week-sessions">
                      ${week.sessions.map((session, sessionIndex) => `<li><span>${String.fromCharCode(65 + sessionIndex)}</span><strong>${esc(session)}</strong></li>`).join("")}
                    </ol>
                    <div class="week-outcome">
                      <span>You leave able to</span>
                      <p>${esc(week.outcome)}</p>
                    </div>
                  </div>
                  <footer class="week-footer">
                    <div class="week-atlas-links">
                      ${week.atlas.map((id) => {
                        const match = topicById.get(id);
                        return match ? `<a href="#${id}">${esc(match.topic.title)}</a>` : "";
                      }).join("")}
                    </div>
                    <div class="week-admin">
                      ${week.due ? `<span>${esc(week.due)}</span>` : ""}
                      <a href="${materialsUrl}">${week.materials ? "Weekly materials" : "Course map"} ↗</a>
                    </div>
                  </footer>
                </article>`;
              }).join("")}
            </div>
          </section>`;
        }).join("")}
      </section>
      <p class="site-credit">University of Cincinnati · Carl H. Lindner College of Business · Conceptual examples, not investment advice</p>`;
    window.scrollTo(0, 0);
  }

  function renderTopic(topic, index) {
    currentTopic = topic;
    renderNavigation(topic.id);
    document.title = `${topic.title} — Financial Machine Learning & AI`;
    const previous = atlas.topics[index - 1];
    const next = atlas.topics[index + 1];
    const chapter = atlas.chapters[topic.chapter];
    const upcoming = /week1[2-5]$/.test(topic.lecture);
    const materialsLink = upcoming
      ? '<a href="https://github.com/smc77/uc_finmlai/blob/main/docs/course_map.md">Course map ↗</a>'
      : `<a href="${lectureUrl(topic.lecture)}">Weekly materials ↗</a>`;
    const titleParts = topic.title.split(" ");
    const lastWord = titleParts.pop();
    const styledTitle = `${esc(titleParts.join(" "))} <em>${esc(lastWord)}</em>`;
    const relatedTerms = atlas.glossary.filter((entry) => entry.topics.includes(topic.id));
    const visibleTerms = relatedTerms.slice(0, 12);

    app.innerHTML = `
      <article>
        <header class="topic-hero">
          <div class="topic-meta">
            <span>${chapter.number} · ${esc(chapter.title)}</span>
            <span>${esc(topic.week)}</span>
            <span>${esc(topic.minutes)} read</span>
            ${materialsLink}
          </div>
          <h1 class="topic-title">${styledTitle}</h1>
          <p class="topic-thesis">${esc(topic.thesis)}</p>
          <p class="topic-question">${esc(topic.question)}</p>
        </header>

        <div class="topic-body">
          <section class="lead-grid" aria-labelledby="idea-heading">
            <div class="margin-label">The idea</div>
            <div class="prose" id="idea-heading">
              ${topic.essay.map((paragraph, i) => `<p class="${i > 0 ? "deep" : ""}">${esc(paragraph)}</p>`).join("")}
            </div>
          </section>

          <section class="method-strip" aria-label="Method anatomy">
            ${topic.method.map(([label, text]) => `
              <div class="method-item">
                <span>${esc(label)}</span>
                <strong>${esc(text)}</strong>
              </div>`).join("")}
          </section>

          <section class="topic-glossary" aria-label="Vocabulary used in this topic">
            <div>
              <p class="kicker">Vocabulary in this topic</p>
              <p>Open a definition without leaving the argument.</p>
            </div>
            <div class="topic-term-list">
              ${visibleTerms.map((entry) => `<button type="button" data-glossary-term="${esc(entry.term)}">${esc(entry.term)}</button>`).join("")}
              ${relatedTerms.length > visibleTerms.length ? `<button class="topic-term-more" type="button" data-glossary-topic>All ${relatedTerms.length} terms →</button>` : ""}
            </div>
          </section>

          <section class="interactive-figure" aria-labelledby="figure-title">
            <div class="figure-header">
              <p class="kicker">Interactive figure</p>
              <div>
                <h2 id="figure-title">${esc(topic.figure.title)}</h2>
                <p>${esc(topic.figure.description)}</p>
              </div>
            </div>
            <div id="figure-content"></div>
          </section>

          <div class="deep">
            <section class="case-note">
              <div class="margin-label">Concrete example</div>
              <p>${esc(topic.case)}</p>
            </section>

            <div class="deep-grid">
              <section class="essay-section">
                <p class="kicker">Common failure modes</p>
                <h2>Where the argument breaks</h2>
                <ul class="failure-list">
                  ${topic.failures.map(([title, text]) => `<li><strong>${esc(title)}</strong><span>${esc(text)}</span></li>`).join("")}
                </ul>
              </section>
              <section class="essay-section">
                <p class="kicker">Research checklist</p>
                <h2>Questions worth carrying</h2>
                <ol class="question-list">
                  ${topic.questions.map((question) => `<li>${esc(question)}</li>`).join("")}
                </ol>
              </section>
            </div>
          </div>

          <nav class="topic-footer" aria-label="Adjacent topics">
            ${previous ? `<a href="#${previous.id}"><small>← Previous idea</small><strong>${esc(previous.title)}</strong></a>` : `<a href="#overview"><small>← Back</small><strong>Course overview</strong></a>`}
            ${next ? `<a href="#${next.id}"><small>Next idea →</small><strong>${esc(next.title)}</strong></a>` : `<a href="#overview"><small>Return to</small><strong>Course overview →</strong></a>`}
          </nav>
        </div>
      </article>
      <p class="site-credit">FIN 7057 · Financial Machine Learning &amp; AI · Conceptual examples, not investment advice</p>`;

    renderFigure(topic);
    window.scrollTo(0, 0);
  }

  function filterCourseMap(query = "") {
    const courseMap = document.querySelector(".course-map-home");
    if (!courseMap) return;
    const normalized = query.trim().toLowerCase();
    let visibleWeeks = 0;
    let visibleSessions = 0;
    courseMap.querySelectorAll("[data-course-week]").forEach((week) => {
      const matches = !normalized || week.textContent.toLowerCase().includes(normalized);
      week.hidden = !matches;
      if (matches) {
        visibleWeeks += 1;
        visibleSessions += week.querySelectorAll(".week-sessions li").length;
      }
    });
    courseMap.querySelectorAll("[data-course-phase-section]").forEach((phase) => {
      const visible = [...phase.querySelectorAll("[data-course-week]")].some((week) => !week.hidden);
      phase.hidden = !visible;
      const phaseButton = courseMap.querySelector(`[data-course-phase-jump="${phase.dataset.coursePhaseSection}"]`);
      if (phaseButton) phaseButton.hidden = !visible;
    });
    const status = document.getElementById("course-search-status");
    if (!normalized) status.textContent = `${visibleWeeks} weeks · ${visibleSessions} sessions`;
    else if (visibleWeeks) status.textContent = `${visibleWeeks} matching week${visibleWeeks === 1 ? "" : "s"} · ${visibleSessions} sessions shown`;
    else status.textContent = `No weeks match “${query.trim()}”`;
  }

  function svgOpen(label) {
    return `<svg viewBox="0 0 800 320" role="img" aria-label="${esc(label)}">`;
  }

  function card(x, y, width, height, active = false) {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="2" class="${active ? "svg-accent" : "svg-card"}"/>`;
  }

  function label(x, y, text, className = "svg-label", anchor = "middle") {
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${className}">${esc(text)}</text>`;
  }

  function wrapLabel(x, y, text, className = "svg-label", anchor = "middle", lineHeight = 16) {
    const lines = String(text).split("\n");
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${className}">${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`).join("")}</text>`;
  }

  function renderPipelineFigure(figure, state) {
    const gap = 10;
    const width = 114;
    let body = svgOpen(figure.title);
    figure.stages.forEach((stage, i) => {
      const x = 20 + i * (width + gap);
      body += card(x, 115, width, 82, i === state.mode);
      body += label(x + width / 2, 148, `0${i + 1}`, i === state.mode ? "svg-small" : "svg-small");
      body += label(x + width / 2, 175, stage, i === state.mode ? "svg-label" : "svg-label");
      if (i < figure.stages.length - 1) body += `<path d="M ${x + width} 156 L ${x + width + gap} 156" class="svg-strong-line"/>`;
    });
    return body + "</svg>";
  }

  function renderRowFigure(state) {
    const headers = ["Decision date", "Stock", "Past return", "Volatility", "Next return"];
    const values = ["31 Jan", "ABC", "+8%", "20%", "+2%"];
    let body = svgOpen("Feature and target research row");
    headers.forEach((header, i) => {
      const x = 22 + i * 151;
      const target = i === 4;
      const active = state.mode === 0 ? i >= 2 && i <= 3 : target;
      body += card(x, 98, 142, 52, active);
      body += label(x + 71, 129, header, active ? "svg-label" : "svg-small");
      body += card(x, 150, 142, 70, active);
      body += label(x + 71, 193, values[i], active ? "svg-title" : "svg-title");
      if (target) body += label(x + 71, 246, "KNOWN LATER", "svg-small");
    });
    return body + "</svg>";
  }

  function renderTimelineFigure(figure, state) {
    const positions = [90, 295, 505, 710];
    const decisionPoint = figure.active[state.mode];
    let body = svgOpen(figure.title);
    body += `<path d="M 75 160 L 725 160" class="svg-strong-line"/>`;
    figure.points.forEach((point, i) => {
      const permitted = i <= decisionPoint;
      body += `<circle cx="${positions[i]}" cy="160" r="${i === decisionPoint ? 12 : 8}" class="${i === decisionPoint ? "svg-accent" : permitted ? "svg-teal" : "svg-card"}" stroke="var(--ink)"/>`;
      body += wrapLabel(positions[i], i % 2 ? 205 : 105, point, i === decisionPoint ? "svg-label" : "svg-small");
    });
    body += `<path d="M ${positions[decisionPoint]} 130 L ${positions[decisionPoint]} 190" class="svg-strong-line"/>`;
    return body + "</svg>";
  }

  function renderComparisonFigure(figure, state) {
    const panel = figure.panels[Math.min(state.mode, figure.panels.length - 1)];
    let body = svgOpen(figure.title);
    body += card(80, 66, 640, 188, false);
    body += label(400, 112, panel[0], "svg-small");
    body += label(400, 164, panel[1], "svg-title");
    const words = panel[2].split(" ");
    const lines = [];
    let line = "";
    words.forEach((word) => {
      if ((line + " " + word).trim().length > 70) { lines.push(line); line = word; }
      else line = (line + " " + word).trim();
    });
    lines.push(line);
    body += wrapLabel(400, 210, lines.join("\n"), "svg-label", "middle", 18);
    return body + "</svg>";
  }

  function renderSplitFigure(figure, state) {
    const train = Number(state.value);
    const validation = 2;
    let body = svgOpen(figure.title);
    for (let i = 0; i < 12; i += 1) {
      const x = 46 + i * 60;
      const className = i < train ? "svg-teal" : i < train + validation ? "svg-gold" : "svg-blue";
      body += `<rect x="${x}" y="112" width="47" height="82" rx="2" class="${className}"/>`;
      body += label(x + 23.5, 218, String(i + 1), "svg-small");
    }
    body += label(46 + train * 30, 82, "FIT", "svg-small");
    body += label(46 + train * 60 + validation * 30, 82, "CHOOSE", "svg-small");
    body += label(46 + (train + validation) * 60 + (12 - train - validation) * 30, 82, "JUDGE", "svg-small");
    return body + "</svg>";
  }

  function renderMetricsFigure(figure, state) {
    const labels = ["Magnitude", "Rank", "Probability", "Trading"];
    let body = svgOpen(figure.title);
    labels.forEach((item, i) => {
      const x = 115 + i * 190;
      body += `<circle cx="${x}" cy="150" r="${i === state.mode ? 64 : 48}" class="${i === state.mode ? "svg-accent" : "svg-card"}" stroke="var(--ink)"/>`;
      body += label(x, 155, item, i === state.mode ? "svg-label" : "svg-small");
    });
    body += label(400, 265, ["How close?", "In what order?", "How reliable are the odds?", "What survived costs and risk?"][state.mode], "svg-title");
    return body + "</svg>";
  }

  function renderScatterFigure(figure, state) {
    const angle = Number(state.value) * Math.PI / 180;
    let body = svgOpen(figure.title);
    body += `<path d="M 75 260 L 745 260 M 75 260 L 75 40" class="svg-line"/>`;
    for (let i = 0; i < 38; i += 1) {
      const along = (i - 18.5) * 15;
      const noise = Math.sin(i * 2.4) * 32 + Math.cos(i * .7) * 11;
      const x = 400 + along * Math.cos(angle) - noise * Math.sin(angle);
      const y = 155 - along * Math.sin(angle) - noise * Math.cos(angle);
      body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="svg-blue"/>`;
    }
    const dx = 300 * Math.cos(angle);
    const dy = 300 * Math.sin(angle);
    body += `<path d="M ${400 - dx} ${155 + dy} L ${400 + dx} ${155 - dy}" class="svg-strong-line" style="stroke:var(--red);stroke-width:4"/>`;
    body += label(625, 55, "DIRECTION OF VARIATION", "svg-small");
    return body + "</svg>";
  }

  function renderAllocationFigure(figure, state) {
    const weights = figure.weights[state.mode];
    const names = ["Stock A", "Stock B", "Stock C"];
    let body = svgOpen(figure.title);
    weights.forEach((weight, i) => {
      const y = 78 + i * 77;
      body += label(78, y + 23, names[i], "svg-label", "start");
      body += `<rect x="180" y="${y}" width="500" height="34" class="svg-card"/>`;
      body += `<rect x="180" y="${y}" width="${weight * 5}" height="34" class="${["svg-red", "svg-teal", "svg-blue"][i] || "svg-teal"}" style="fill:${["var(--red)", "var(--teal)", "var(--blue)"][i]}"/>`;
      body += label(705, y + 23, `${weight}%`, "svg-label", "start");
    });
    return body + "</svg>";
  }

  function renderNetworkFigure(figure, state) {
    const hidden = Number(state.value);
    const layers = hidden + 2;
    let body = svgOpen(figure.title);
    const xGap = 650 / (layers - 1);
    const counts = [3, ...Array(hidden).fill(4), 1];
    counts.forEach((count, layer) => {
      const x = 75 + layer * xGap;
      const previousCount = layer > 0 ? counts[layer - 1] : 0;
      if (layer > 0) {
        for (let node = 0; node < count; node += 1) {
          const y = 160 + (node - (count - 1) / 2) * 55;
          for (let previous = 0; previous < previousCount; previous += 1) {
            const py = 160 + (previous - (previousCount - 1) / 2) * 55;
            body += `<path d="M ${x - xGap + 10} ${py} L ${x - 10} ${y}" class="svg-line"/>`;
          }
        }
      }
      for (let node = 0; node < count; node += 1) {
        const y = 160 + (node - (count - 1) / 2) * 55;
        body += `<circle cx="${x}" cy="${y}" r="10" class="${layer === 0 ? "svg-blue" : layer === layers - 1 ? "svg-accent" : "svg-teal"}"/>`;
      }
      body += label(x, 292, layer === 0 ? "INPUT" : layer === layers - 1 ? "OUTPUT" : `HIDDEN ${layer}`, "svg-small");
    });
    return body + "</svg>";
  }

  function renderTextFigure(figure, state) {
    let body = svgOpen(figure.title);
    body += card(75, 48, 650, 64, false);
    body += label(400, 86, "“Guidance improved, but margin risk remains.”", "svg-title");
    if (state.mode === 0) {
      const terms = [["guidance", 72], ["improved", 48], ["margin", 62], ["risk", 88], ["remains", 36]];
      terms.forEach(([term, weight], i) => {
        const x = 88 + i * 130;
        body += `<rect x="${x}" y="${255 - weight}" width="90" height="${weight}" class="${i === 3 ? "svg-accent" : "svg-teal"}"/>`;
        body += label(x + 45, 278, term, "svg-small");
      });
    } else {
      for (let i = 0; i < 16; i += 1) {
        const x = 85 + i * 39;
        const value = 45 + Math.abs(Math.sin(i * 1.8)) * 92;
        body += `<rect x="${x}" y="${245 - value}" width="25" height="${value}" class="${i % 3 === 0 ? "svg-blue" : i % 3 === 1 ? "svg-teal" : "svg-gold"}"/>`;
      }
      body += label(400, 278, "DENSE VECTOR · dimensions are learned, not named terms", "svg-small");
    }
    return body + "</svg>";
  }

  function renderExecutionFigure(figure, state) {
    const urgency = Number(state.value) / 100;
    const impact = Math.pow(urgency, 1.55);
    const waiting = Math.pow(1 - urgency, 1.35);
    let body = svgOpen(figure.title);
    body += label(90, 105, "Impact", "svg-label", "start");
    body += `<rect x="200" y="79" width="500" height="38" class="svg-card"/><rect x="200" y="79" width="${500 * impact}" height="38" class="svg-accent"/>`;
    body += label(90, 184, "Waiting risk", "svg-label", "start");
    body += `<rect x="200" y="158" width="500" height="38" class="svg-card"/><rect x="200" y="158" width="${500 * waiting}" height="38" class="svg-blue"/>`;
    body += label(200, 244, "PATIENT", "svg-small", "start");
    body += label(700, 244, "URGENT", "svg-small", "end");
    body += `<path d="M 200 228 L 700 228" class="svg-strong-line"/>`;
    body += `<circle cx="${200 + 500 * urgency}" cy="228" r="9" class="svg-accent"/>`;
    return body + "</svg>";
  }

  function renderCausalFigure(figure, state) {
    const counterfactual = state.mode === 1;
    let body = svgOpen(figure.title);
    body += card(280, 38, 240, 58, false);
    body += label(400, 73, "Market state at decision", "svg-label");
    body += `<path d="M 400 96 L 230 156 M 400 96 L 570 156" class="svg-strong-line ${counterfactual ? "" : "svg-dashed"}"/>`;
    body += card(80, 156, 300, 92, !counterfactual);
    body += label(230, 191, "Observed action", "svg-small");
    body += label(230, 222, "One realized outcome", "svg-title");
    body += card(420, 156, 300, 92, counterfactual);
    body += label(570, 191, "Unchosen action", "svg-small");
    body += label(570, 222, "Missing potential outcome", "svg-title");
    return body + "</svg>";
  }

  function visualMarkup(topic, state) {
    const figure = topic.figure;
    switch (figure.type) {
      case "pipeline": return renderPipelineFigure(figure, state);
      case "row": return renderRowFigure(state);
      case "timeline": return renderTimelineFigure(figure, state);
      case "comparison": return renderComparisonFigure(figure, state);
      case "split": return renderSplitFigure(figure, state);
      case "metrics": return renderMetricsFigure(figure, state);
      case "scatter": return renderScatterFigure(figure, state);
      case "allocation": return renderAllocationFigure(figure, state);
      case "network": return renderNetworkFigure(figure, state);
      case "text": return renderTextFigure(figure, state);
      case "execution": return renderExecutionFigure(figure, state);
      case "causal": return renderCausalFigure(figure, state);
      default: return `${svgOpen(figure.title)}${label(400, 160, "Interactive figure", "svg-title")}</svg>`;
    }
  }

  function figureNote(topic, state) {
    const figure = topic.figure;
    if (figure.notes) return figure.notes[Math.min(state.mode, figure.notes.length - 1)];
    if (figure.type === "comparison") return figure.panels[Math.min(state.mode, figure.panels.length - 1)][2];
    if (figure.type === "split") return `Blocks 1–${state.value} fit the procedure; the next two choose it; the remainder judge it.`;
    if (figure.type === "scatter") return `The axis is rotated to ${state.value}°. PCA would estimate a direction from data; the return target remains outside this picture.`;
    if (figure.type === "network") return `${state.value} hidden layer${Number(state.value) === 1 ? "" : "s"} increase representational capacity without adding new information.`;
    if (figure.type === "execution") return `${state.value}% urgency shifts the illustrative balance toward immediate impact and away from waiting risk.`;
    return "Change the control to inspect the concept.";
  }

  function figureControls(topic, state) {
    const figure = topic.figure;
    const modes = figure.stages || figure.modes;
    if (modes) {
      return modes.map((mode, i) => `<button type="button" class="control-button ${state.mode === i ? "active" : ""}" data-figure-mode="${i}">${esc(mode)}</button>`).join("");
    }
    if (figure.min !== undefined) {
      const labelText = figure.type === "split" ? "Training blocks" : figure.type === "network" ? "Hidden layers" : figure.type === "execution" ? "Urgency" : "Axis angle";
      return `<label class="range-control">${labelText}<input type="range" min="${figure.min}" max="${figure.max}" value="${state.value}" data-figure-range><output>${state.value}</output></label>`;
    }
    return "";
  }

  function renderFigure(topic) {
    const target = document.getElementById("figure-content");
    if (!target) return;
    if (window.FinmlLabs && window.FinmlLabs.render(topic, target)) return;
    if (window.FinmlHero && window.FinmlHero.render(topic, target)) return;
    const state = getVisualState(topic);
    target.innerHTML = `
      <div class="figure-stage">${visualMarkup(topic, state)}</div>
      <div class="figure-controls">
        ${figureControls(topic, state)}
        <div class="figure-note" aria-live="polite">${esc(figureNote(topic, state))}</div>
      </div>`;
  }

  function renderGlossary(query = glossarySearch.value) {
    const normalized = query.trim().toLowerCase();
    const scope = glossaryScope.value;
    const category = glossaryCategory.value;
    const entries = atlas.glossary.filter((entry) => {
      const searchable = [entry.term, ...entry.aliases, entry.definition, entry.example, entry.category, ...entry.seeAlso].join(" ").toLowerCase();
      const matchesQuery = searchable.includes(normalized);
      const matchesCategory = category === "all" || entry.category === category;
      const matchesScope = scope === "all" || (scope === "core" && entry.core) || (scope === "topic" && currentTopic && entry.topics.includes(currentTopic.id));
      return matchesQuery && matchesCategory && matchesScope;
    });
    glossaryCount.textContent = `${entries.length} of ${atlas.glossary.length} terms`;
    glossaryList.innerHTML = entries.length
      ? entries.map((entry) => {
        const topicLinks = entry.topics
          .map((id) => topicById.get(id))
          .filter(Boolean)
          .map(({ topic }) => `<a href="#${topic.id}">${esc(topic.title)}</a>`)
          .join("");
        return `<div class="glossary-entry">
          <div class="glossary-entry-heading">
            <dt>${esc(entry.term)}</dt>
            <span>${entry.core ? "Core" : "Method"}</span>
          </div>
          ${entry.aliases.length ? `<dd class="glossary-aliases">Also: ${entry.aliases.map(esc).join(" · ")}</dd>` : ""}
          <dd>${esc(entry.definition)}</dd>
          ${entry.example ? `<dd class="glossary-example"><strong>Example</strong>${esc(entry.example)}</dd>` : ""}
          <dd class="glossary-meta"><span>${esc(entry.category)}</span>${topicLinks ? `<span class="glossary-topics">Used in ${topicLinks}</span>` : ""}</dd>
          ${entry.seeAlso.length ? `<dd class="glossary-see-also"><span>See also</span>${entry.seeAlso.map((related) => `<button type="button" data-glossary-query="${esc(related)}">${esc(related)}</button>`).join("")}</dd>` : ""}
        </div>`;
      }).join("")
      : `<div class="glossary-entry"><dd>No matching term.</dd></div>`;
  }

  function openGlossary(query = "", scope = null) {
    if (query) glossarySearch.value = query;
    const topicOption = glossaryScope.querySelector('option[value="topic"]');
    topicOption.disabled = !currentTopic;
    if (!currentTopic && glossaryScope.value === "topic") glossaryScope.value = "all";
    if (scope && (scope !== "topic" || currentTopic)) glossaryScope.value = scope;
    renderGlossary();
    glossary.classList.add("open");
    glossary.setAttribute("aria-hidden", "false");
    glossaryToggle.setAttribute("aria-expanded", "true");
    scrim.hidden = false;
    glossarySearch.focus();
  }

  function closeOverlays() {
    glossary.classList.remove("open");
    glossary.setAttribute("aria-hidden", "true");
    glossaryToggle.setAttribute("aria-expanded", "false");
    courseNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    scrim.hidden = true;
  }

  function route() {
    const id = location.hash.slice(1);
    if (!id || id === "overview" || !topicById.has(id)) renderOverview();
    else {
      const { topic, index } = topicById.get(id);
      renderTopic(topic, index);
    }
    closeOverlays();
  }

  nav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-topic]");
    if (button) location.hash = button.dataset.topic;
  });

  app.addEventListener("click", (event) => {
    const courseMapJump = event.target.closest("[data-course-map-jump]");
    if (courseMapJump) {
      document.getElementById("course-map-heading").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const phaseJump = event.target.closest("[data-course-phase-jump]");
    if (phaseJump) {
      document.getElementById(`phase-${phaseJump.dataset.coursePhaseJump}`).scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const glossaryTerm = event.target.closest("[data-glossary-term]");
    if (glossaryTerm) {
      openGlossary(glossaryTerm.dataset.glossaryTerm);
      return;
    }
    const topicGlossary = event.target.closest("[data-glossary-topic]");
    if (topicGlossary) {
      glossarySearch.value = "";
      openGlossary("", "topic");
      return;
    }
    const overviewButton = event.target.closest("[data-overview-stage]");
    if (overviewButton) {
      overviewStage = Number(overviewButton.dataset.overviewStage);
      document.querySelectorAll("[data-overview-stage]").forEach((button, i) => button.classList.toggle("active", i === overviewStage));
      document.getElementById("pipeline-detail").textContent = pipelineNotes[overviewStage];
      return;
    }
    const figureButton = event.target.closest("[data-figure-mode]");
    if (figureButton && currentTopic) {
      getVisualState(currentTopic).mode = Number(figureButton.dataset.figureMode);
      renderFigure(currentTopic);
    }
  });

  app.addEventListener("input", (event) => {
    if (event.target.matches("[data-course-search]")) {
      filterCourseMap(event.target.value);
      return;
    }
    if (event.target.matches("[data-figure-range]") && currentTopic) {
      getVisualState(currentTopic).value = Number(event.target.value);
      renderFigure(currentTopic);
    }
  });

  navToggle.addEventListener("click", () => {
    const open = !courseNav.classList.contains("open");
    courseNav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    scrim.hidden = !open;
  });

  readingMode.addEventListener("click", () => {
    const condensed = document.body.classList.toggle("condensed");
    readingMode.textContent = condensed ? "Expand" : "Condense";
    localStorage.setItem("finml-atlas-mode", condensed ? "condensed" : "expanded");
  });

  glossaryToggle.addEventListener("click", () => openGlossary());
  glossaryClose.addEventListener("click", closeOverlays);
  glossarySearch.addEventListener("input", () => renderGlossary(glossarySearch.value));
  glossaryScope.addEventListener("change", () => renderGlossary());
  glossaryCategory.addEventListener("change", () => renderGlossary());
  glossaryList.addEventListener("click", (event) => {
    const related = event.target.closest("[data-glossary-query]");
    if (!related) return;
    glossarySearch.value = related.dataset.glossaryQuery;
    glossaryScope.value = "all";
    glossaryCategory.value = "all";
    renderGlossary();
    glossarySearch.focus();
  });
  scrim.addEventListener("click", closeOverlays);

  window.addEventListener("hashchange", route);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && event.target.matches?.("[data-course-search]") && event.target.value) {
      event.target.value = "";
      filterCourseMap();
      return;
    }
    if (event.key === "Escape") closeOverlays();
  });

  if (localStorage.getItem("finml-atlas-mode") === "condensed") {
    document.body.classList.add("condensed");
    readingMode.textContent = "Expand";
  }

  [...new Set(atlas.glossary.map((entry) => entry.category))].sort().forEach((category) => {
    glossaryCategory.insertAdjacentHTML("beforeend", `<option value="${esc(category)}">${esc(category)}</option>`);
  });
  renderGlossary();
  renderNavigation();
  route();
})();
