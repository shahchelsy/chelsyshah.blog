
/* ── THE STRATEGY LAB: BUILD YOUR BRAND ── */
(() => {
  "use strict";

  const startButton = document.getElementById("open-brand-game");
  const playArea = document.getElementById("strategy-game-play-area");
  const chooser = document.querySelector("#p-games .strategy-game-grid");

  if (!startButton || !playArea || !chooser) return;

  
const industries = [
  ["fashion", "Fashion & Luxury"],
  ["finance", "Finance & Investment"],
  ["consulting", "Consulting & Corporate Strategy"],
  ["supplychain", "Supply Chain & Logistics"],
  ["technology", "Technology & AI"],
  ["beauty", "Beauty & Consumer Goods"],
  ["healthcare", "Healthcare & Pharmaceuticals"],
  ["media", "Media & Marketing"],
  ["realestate", "Real Estate & Development"],
  ["hospitality", "Food & Hospitality"]
];


const markets = [
  {
    id: "mass",
    title: "Mass Market",
    description: "Large customer base and strong demand potential, but customers are price-sensitive and competition is intense.",
    suitable: ["cost", "best"],
    demand: 1.15
  },
  {
    id: "premium",
    title: "Premium Market",
    description: "Customers value quality, exclusivity, expertise, and differentiated experiences.",
    suitable: ["different", "focusdifferent"],
    demand: 1.04
  },
  {
    id: "niche",
    title: "Underserved Niche",
    description: "Serve a specialized audience with unmet needs and fewer direct competitors.",
    suitable: ["focuscost", "focusdifferent"],
    demand: 0.86
  },
  {
    id: "emerging",
    title: "Emerging Market",
    description: "Enter a rapidly developing market with growth opportunities, but uncertain demand and infrastructure.",
    suitable: ["different", "best"],
    demand: 1.12
  },
  {
    id: "saturated",
    title: "Saturated Market",
    description: "Compete in an established industry where customers have many alternatives and competitors are powerful.",
    suitable: ["cost", "different", "best"],
    demand: 0.95
  },
  {
    id: "innovation",
    title: "Innovation-Driven Market",
    description: "Target customers who actively seek new technology, advanced products, and creative solutions.",
    suitable: ["different", "focusdifferent"],
    demand: 1.08
  },
  {
    id: "enterprise",
    title: "B2B Enterprise Market",
    description: "Sell to businesses through larger contracts and long-term relationships, with demanding procurement processes.",
    suitable: ["focusdifferent", "best"],
    demand: 1.02
  },
  {
    id: "sustainable",
    title: "Sustainability-Focused Market",
    description: "Appeal to customers who prioritize environmental responsibility, transparency, and ethical business practices.",
    suitable: ["different", "focusdifferent"],
    demand: 0.98
  }
];

  const strategies = [
    {
      id: "cost",
      title: "Broad Cost Leadership",
      description: "Win a large customer base by operating efficiently and offering low prices."
    },
    {
      id: "different",
      title: "Broad Differentiation",
      description: "Stand out with distinctive products, quality, and brand identity."
    },
    {
      id: "focuscost",
      title: "Focused Cost Leadership",
      description: "Offer competitive prices to a specific, narrowly defined audience."
    },
    {
      id: "focusdifferent",
      title: "Focused Differentiation",
      description: "Deliver a highly distinctive experience to a specialized customer group."
    },
    {
      id: "best",
      title: "Best-Cost Provider Strategy",
      description: "Balance attractive prices with features and quality customers value."
    }
  ];

  const budgets = [
    {
      id: "product",
      title: "Product-First",
      description: "Invest heavily in quality and differentiation.",
      production: 35000,
      marketing: 15000,
      development: 35000,
      operations: 15000
    },
    {
      id: "growth",
      title: "Growth-First",
      description: "Prioritize customer acquisition and market visibility.",
      production: 30000,
      marketing: 40000,
      development: 15000,
      operations: 15000
    },
    {
      id: "efficient",
      title: "Operational Efficiency",
      description: "Build a scalable supply chain and control operating costs.",
      production: 40000,
      marketing: 15000,
      development: 15000,
      operations: 30000
    },
    {
      id: "balanced",
      title: "Balanced Investment",
      description: "Spread your resources across the major business functions.",
      production: 30000,
      marketing: 25000,
      development: 25000,
      operations: 20000
    }
  ];

  const challenges = [
    {
      id: "discount",
      title: "Cut your prices",
      description: "Compete on affordability, but reduce your profit margin."
    },
    {
      id: "innovate",
      title: "Improve your product",
      description: "Strengthen differentiation, but incur additional development costs."
    },
    {
      id: "community",
      title: "Build customer loyalty",
      description: "Focus on brand relationships rather than a direct price war."
    },
    {
      id: "hold",
      title: "Stay the course",
      description: "Preserve resources and trust the strategy you've already chosen."
    }
  ];

  const state = {
    step: 0,
    name: "",
    industry: null,
    market: null,
    strategy: null,
    budget: null,
    response: null
  };

  const money = amount =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(amount);

  function element(tag, className, content) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (content !== undefined) item.textContent = content;
    return item;
  }

  function button(text, callback, secondary = false) {
    const item = element(
      "button",
      "bb-button" + (secondary ? " secondary" : ""),
      text
    );
    item.type = "button";
    item.addEventListener("click", callback);
    return item;
  }

  function reset() {
    state.step = 0;
    state.name = "";
    state.industry = null;
    state.market = null;
    state.strategy = null;
    state.budget = null;
    state.response = null;
  }

  function openGame() {
    reset();
    chooser.style.display = "none";
    playArea.hidden = false;
    render();
  }

  function allGames() {
    playArea.hidden = true;
    playArea.replaceChildren();
    chooser.style.display = "";
  }

  function selectedCard(label, description, selected, callback) {
    const card = element(
      "button",
      "bb-choice" + (selected ? " selected" : "")
    );
    card.type = "button";
    card.setAttribute("aria-pressed", String(selected));

    card.appendChild(element("strong", "bb-choice-title", label));
    card.appendChild(element("span", "bb-choice-desc", description));

    card.addEventListener("click", callback);
    return card;
  }

  function makePanel(title, intro) {
    const panel = element("section", "bb-panel");

    panel.appendChild(
      element(
        "div",
        "bb-kicker",
        `THE STRATEGY LAB / DECISION ${state.step + 1} OF 5`
      )
    );

    const track = element("div", "bb-progress");
    const fill = element("div", "bb-progress-fill");
    fill.style.width = `${(state.step + 1) * 20}%`;
    track.appendChild(fill);
    panel.appendChild(track);

    panel.appendChild(element("h2", "bb-title", title));
    panel.appendChild(element("p", "bb-intro", intro));

    return panel;
  }

  function choiceGrid() {
    return element("div", "bb-choices");
  }

  function controls(panel, canContinue) {
    const row = element("div", "bb-actions");

    row.appendChild(
      button(
        "← Back",
        state.step === 0
          ? allGames
          : () => {
              state.step--;
              render();
            },
        true
      )
    );

    const next = button(
      state.step === 4 ? "See my business results →" : "Next decision →",
      () => {
        if (!canContinue()) return;
        if (state.step === 4) {
          renderResults();
        } else {
          state.step++;
          render();
        }
      }
    );

    next.disabled = !canContinue();
    row.appendChild(next);
    panel.appendChild(row);

    return () => {
      next.disabled = !canContinue();
    };
  }

  function renderBrand(panel) {
    const label = element("label", "bb-field-label", "YOUR BRAND NAME");
    label.setAttribute("for", "bb-brand-name");
    panel.appendChild(label);

    const input = element("input", "bb-input");
    input.id = "bb-brand-name";
    input.type = "text";
    input.maxLength = 40;
    input.placeholder = "e.g. The Everyday Edit";
    input.value = state.name;
    panel.appendChild(input);

   panel.appendChild(
  element("h3", "bb-section-heading", "Choose your business sector")
    );

    const grid = choiceGrid();
    const refresh = controls(panel, () =>
      state.name.trim().length > 0 && !!state.industry
    );

    for (const [id, title] of industries) {
      grid.appendChild(
        selectedCard(
          title,
          "Launch a new brand in this industry.",
          state.industry === id,
          () => {
            state.industry = id;
            render();
          }
        )
      );
    }

    panel.insertBefore(grid, panel.lastChild);

    input.addEventListener("input", () => {
      state.name = input.value;
      refresh();
    });
  }

  function renderMarket(panel) {
    panel.appendChild(
      element(
        "p",
        "bb-insight",
        "Market insight: A larger audience can mean more demand, " +
          "but it often brings stronger competitive pressure."
      )
    );

    const grid = choiceGrid();

    for (const market of markets) {
      grid.appendChild(
        selectedCard(
          market.title,
          market.description,
          state.market === market.id,
          () => {
            state.market = market.id;
            render();
          }
        )
      );
    }

    panel.appendChild(grid);
    controls(panel, () => !!state.market);
  }

  function renderStrategy(panel) {
    const grid = choiceGrid();

    for (const strategy of strategies) {
      grid.appendChild(
        selectedCard(
          strategy.title,
          strategy.description,
          state.strategy === strategy.id,
          () => {
            state.strategy = strategy.id;
            render();
          }
        )
      );
    }

    panel.appendChild(grid);
    controls(panel, () => !!state.strategy);
  }

  function renderBudget(panel) {
    const total = element(
      "div",
      "bb-budget-total",
      `AVAILABLE CAPITAL: ${money(100000)}`
    );
    panel.appendChild(total);

    const grid = choiceGrid();

    for (const budget of budgets) {
      const detail =
        `${budget.description}\n` +
        `Production ${money(budget.production)} · ` +
        `Marketing ${money(budget.marketing)} · ` +
        `Development ${money(budget.development)} · ` +
        `Operations ${money(budget.operations)}`;

      grid.appendChild(
        selectedCard(
          budget.title,
          detail,
          state.budget === budget.id,
          () => {
            state.budget = budget.id;
            render();
          }
        )
      );
    }

    panel.appendChild(grid);
    controls(panel, () => !!state.budget);
  }

  function renderChallenge(panel) {
    panel.appendChild(
      element(
        "div",
        "bb-alert",
        "MARKET SHOCK: A major competitor has just launched " +
          "a rival product with a 20% lower advertised price."
      )
    );

    panel.appendChild(
      element(
        "p",
        "bb-insight",
        "Your customers are comparing alternatives. " +
          "How will your brand respond?"
      )
    );

    const grid = choiceGrid();

    for (const challenge of challenges) {
      grid.appendChild(
        selectedCard(
          challenge.title,
          challenge.description,
          state.response === challenge.id,
          () => {
            state.response = challenge.id;
            render();
          }
        )
      );
    }

    panel.appendChild(grid);
    controls(panel, () => !!state.response);
  }

  function render() {
    const stages = [
      [
        "Every brand starts somewhere.",
        "Give your brand a name and choose the industry you want to enter.",
        renderBrand
      ],
      [
        "Which market will you compete in?",
        "Your target market determines what customers value and who you'll compete against.",
        renderMarket
      ],
      [
        "Choose your competitive advantage.",
        "How will your brand win customers and stand apart from its competitors?",
        renderStrategy
      ],
      [
        "You have $100,000. Invest wisely.",
        "Every allocation creates trade-offs. Choose how your startup will spend its initial capital.",
        renderBudget
      ],
      [
        "Your competitor just made a move.",
        "A business plan is only useful if it can survive a changing market.",
        renderChallenge
      ]
    ];

    playArea.replaceChildren();

    const [title, intro, show] = stages[state.step];
    const panel = makePanel(title, intro);

    show(panel);
    playArea.appendChild(panel);
  }

  function calculateResults() {
    const market = markets.find(m => m.id === state.market);
    const budget = budgets.find(b => b.id === state.budget);

    const marketFit = market.suitable.includes(state.strategy);

    let score = 45;
    const observations = [];

    if (marketFit) {
      score += 22;
      observations.push(
        "Your chosen competitive strategy fits your target market."
      );
    } else {
      score -= 8;
      observations.push(
        "Your strategy and target market are not naturally aligned."
      );
    }

    const budgetFit = {
      product: ["different", "focusdifferent"],
      growth: ["different", "best"],
      efficient: ["cost", "focuscost"],
      balanced: ["best", "focusdifferent", "focuscost"]
    };

    if (budgetFit[state.budget].includes(state.strategy)) {
      score += 16;
      observations.push(
        "Your spending priorities support your competitive strategy."
      );
    } else {
      score += 3;
      observations.push(
        "Your budget could support your strategic positioning more clearly."
      );
    }

    const responseFit = {
      discount: ["cost", "focuscost"],
      innovate: ["different", "focusdifferent"],
      community: ["different", "focusdifferent", "best"],
      hold: ["cost", "focuscost", "best"]
    };

    if (responseFit[state.response].includes(state.strategy)) {
      score += 15;
      observations.push(
        "Your response to competition reinforces your positioning."
      );
    } else {
      score -= 3;
      observations.push(
        "Your competitor response may weaken your original positioning."
      );
    }

    score = Math.max(20, Math.min(98, score));

    const responseCosts = {
      discount: 3000,
      innovate: 12000,
      community: 7000,
      hold: 0
    };

    const responseCost = responseCosts[state.response];

    // Illustrative single-period model, not a market forecast.
    const simulatedRevenue = Math.round(
      (95000 + score * 1550) *
        market.demand *
        (state.response === "discount" ? 0.92 : 1)
    );

    const variableCostRate =
      state.strategy === "cost" || state.strategy === "focuscost"
        ? 0.38
        : state.strategy === "best"
          ? 0.44
          : 0.48;

    const simulatedVariableCosts = Math.round(
      simulatedRevenue * variableCostRate
    );

    const simulatedProfit =
      simulatedRevenue -
      simulatedVariableCosts -
      100000 -
      responseCost;

    const resultLabel =
      score >= 85
        ? "Strategic Advantage"
        : score >= 65
          ? "Promising Potential"
          : "Time to Rethink";

    return {
      score,
      resultLabel,
      simulatedRevenue,
      simulatedProfit,
      responseCost,
      market,
      budget,
      observations
    };
  }

  function resultDetail(parent, heading, body) {
    const block = element("div", "bb-result-detail");
    block.appendChild(element("h3", "", heading));
    block.appendChild(element("p", "", body));
    parent.appendChild(block);
  }

  function renderResults() {
    playArea.replaceChildren();

    const result = calculateResults();
    const panel = element("section", "bb-panel bb-result");

    panel.appendChild(
      element("div", "bb-kicker", "YOUR BRAND PERFORMANCE REPORT")
    );

    panel.appendChild(
      element("h2", "bb-result-title", state.name.trim())
    );

    panel.appendChild(
      element("p", "bb-result-subtitle", result.resultLabel)
    );

    const metrics = element("div", "bb-metrics");

    const values = [
      ["Strategy score", `${result.score}/100`],
      ["Simulated revenue", money(result.simulatedRevenue)],
      ["Simulated profit", money(result.simulatedProfit)],
      ["Initial budget", money(100000)]
    ];

    for (const [name, value] of values) {
      const metric = element("div", "bb-metric");
      metric.appendChild(element("span", "", name));
      metric.appendChild(element("strong", "", value));
      metrics.appendChild(metric);
    }

    panel.appendChild(metrics);

    const chosenStrategy = strategies.find(
      s => s.id === state.strategy
    );

    resultDetail(
      panel,
      "Your competitive positioning",
      `${chosenStrategy.title} in ${result.market.title}. ` +
        result.observations[0]
    );

    resultDetail(
      panel,
      "Your investment decisions",
      `You allocated ${money(100000)} across production, ` +
        "marketing, product development, and operations. " +
        result.observations[1]
    );

    resultDetail(
      panel,
      "How you responded to competition",
      challenges.find(c => c.id === state.response).title +
        ". " + result.observations[2]
    );

    resultDetail(
      panel,
      "The strategic takeaway",
      result.score >= 85
        ? "Your choices form a coherent competitive strategy. " +
          "The next challenge would be validating customer demand with real data."
        : result.score >= 65
          ? "Your business has some promising strategic foundations. " +
            "Aligning your market, spending, and competitive response could make it stronger."
          : "Your choices reveal important trade-offs. " +
            "Reconsider who you serve, why customers would choose you, " +
            "and whether your investments reinforce that advantage."
    );

    panel.appendChild(
      element(
        "p",
        "bb-disclaimer",
        "Educational simulation only. Revenue and profit use an illustrative " +
          "single-period formula, not real market data or financial projections. " +
          "The initial $100,000 is treated as startup spending; " +
          "additional competitive-response costs are included in simulated profit."
      )
    );

    const actions = element("div", "bb-actions");

    actions.appendChild(button("Build another brand ↻", openGame));
    actions.appendChild(button("All games ←", allGames, true));

    panel.appendChild(actions);
    playArea.appendChild(panel);
  }

  startButton.addEventListener("click", openGame);
})();

