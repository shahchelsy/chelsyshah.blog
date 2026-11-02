
/* ── THE STRATEGY LAB: PERSONALITY QUIZ ── */
/* Five questions, four personality types */

(() => {
  "use strict";

  const questions = [
    {
      prompt: "You have an idea that could change everything. What's your first move?",
      options: [
        ["Imagine how big it could become.", "visionary"],
        ["Research whether it could actually work.", "analyst"],
        ["Start testing it immediately.", "risk"],
        ["Create a plan to make it happen.", "mastermind"]
      ]
    },
    {
      prompt: "Everyone says your idea is too ambitious. You...",
      options: [
        ["Believe they haven't seen the full picture yet.", "visionary"],
        ["Ask what evidence supports their concerns.", "analyst"],
        ["Take the chance anyway.", "risk"],
        ["Figure out a smarter way to execute it.", "mastermind"]
      ]
    },
    {
      prompt: "You unexpectedly receive $10,000. What sounds most like you?",
      options: [
        ["Invest in an idea I've always wanted to build.", "visionary"],
        ["Study the options before deciding.", "analyst"],
        ["Put some into a bold opportunity.", "risk"],
        ["Divide it strategically across priorities.", "mastermind"]
      ]
    },
    {
      prompt: "Your team is falling behind. What do you do?",
      options: [
        ["Remind everyone what they're working toward.", "visionary"],
        ["Find out exactly what's causing the delay.", "analyst"],
        ["Make a quick decision and get things moving.", "risk"],
        ["Reorganize priorities and responsibilities.", "mastermind"]
      ]
    },
    {
      prompt: "What would you most want people to say about you?",
      options: [
        ["They saw what nobody else could.", "visionary"],
        ["They always knew what they were doing.", "analyst"],
        ["They weren't afraid to go for it.", "risk"],
        ["They knew how to make things happen.", "mastermind"]
      ]
    }
  ];

  const results = {
    visionary: {
      title: "The Visionary",
      subtitle: "You see possibilities before everyone else.",
      meaning: "You're probably the friend who says, 'Okay, but imagine if...' and suddenly everyone is listening. You think beyond what's already possible and love turning ideas into something bigger.",
      strength: "Spotting opportunities and inspiring people to believe in them.",
      blindSpot: "Big ideas can lose momentum without a practical next step.",
      advice: "Keep dreaming big — then pick one small action that brings your vision into the real world."
    },

    analyst: {
      title: "The Analyst",
      subtitle: "You need the logic to make sense.",
      meaning: "You probably have a backup plan for your backup plan. You don't just make decisions; you want to understand why they work. You notice patterns other people overlook.",
      strength: "Seeing the evidence, asking good questions, and avoiding preventable mistakes.",
      blindSpot: "Waiting for perfect information can mean missing a good opportunity.",
      advice: "Trust your preparation, but give yourself permission to act before every variable is certain."
    },

    risk: {
      title: "The Risk Taker",
      subtitle: "You'd rather try than wonder.",
      meaning: "You're probably the reason your friend group has half its best stories. Uncertainty doesn't automatically scare you — sometimes it's what makes an opportunity interesting.",
      strength: "Making bold moves and finding momentum when others hesitate.",
      blindSpot: "A brave decision still needs a sense of what you could lose.",
      advice: "Keep that courage. Just make sure the risks you take are worth the reward."
    },

    mastermind: {
      title: "The Mastermind",
      subtitle: "You're already thinking three steps ahead.",
      meaning: "You're probably the person quietly figuring everything out while everyone else is still debating the problem. You know how to connect people, resources, and opportunities.",
      strength: "Turning scattered ideas into a clear plan people can follow.",
      blindSpot: "Too much control can leave little space for surprises or new perspectives.",
      advice: "Plan thoughtfully, but leave a little room for something unexpected to become your best move."
    }
  };

  const playArea = document.getElementById("strategy-game-play-area");
  const quizButton = document.getElementById("open-strategist-quiz");
  const chooser = document.querySelector("#p-games .strategy-game-grid");

  if (!playArea || !quizButton || !chooser) return;

  let step = 0;
  let answers = Array(questions.length).fill(null);

  const typeOrder = [
    "visionary",
    "analyst",
    "risk",
    "mastermind"
  ];

  function element(tag, className, content) {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;

    return node;
  }

  function addButton(parent, text, callback, kind = "") {
    const button = element("button", `sq-button ${kind}`, text);
    button.type = "button";
    button.addEventListener("click", callback);
    parent.appendChild(button);
    return button;
  }

  function openQuiz() {
    step = 0;
    answers = Array(questions.length).fill(null);

    chooser.style.display = "none";
    playArea.hidden = false;

    renderQuestion();
  }

  function goBackToGames() {
    playArea.hidden = true;
    playArea.replaceChildren();

    chooser.style.display = "";
  }

  function renderQuestion() {
    const q = questions[step];

    playArea.replaceChildren();

    const panel = element("section", "sq-panel");

    panel.appendChild(
      element(
        "div",
        "sq-kicker",
        `THE STRATEGY LAB / QUESTION ${step + 1} OF ${questions.length}`
      )
    );

    const track = element("div", "sq-progress");

    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", "Quiz progress");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", String(questions.length));
    track.setAttribute("aria-valuenow", String(step + 1));

    const fill = element("div", "sq-progress-fill");

    fill.style.width = `${((step + 1) / questions.length) * 100}%`;

    track.appendChild(fill);
    panel.appendChild(track);

    panel.appendChild(element("h2", "sq-title", q.prompt));

    panel.appendChild(
      element(
        "p",
        "sq-intro",
        "Choose the answer that feels most like you — there are no wrong answers."
      )
    );

    const options = element("div", "sq-options");
    const nextRow = element("div", "sq-actions");

    let nextButton;

    q.options.forEach(([label], index) => {
      const selected = answers[step] === index;

      const btn = element(
        "button",
        `sq-option${selected ? " selected" : ""}`,
        label
      );

      btn.type = "button";
      btn.setAttribute("aria-pressed", selected ? "true" : "false");

      btn.addEventListener("click", () => {
        answers[step] = index;

        for (const other of options.children) {
          other.classList.remove("selected");
          other.setAttribute("aria-pressed", "false");
        }

        btn.classList.add("selected");
        btn.setAttribute("aria-pressed", "true");

        nextButton.disabled = false;
      });

      options.appendChild(btn);
    });

    panel.appendChild(options);

    addButton(
      nextRow,
      "← Back",
      step === 0
        ? goBackToGames
        : () => {
            step--;
            renderQuestion();
          },
      "secondary"
    );

    nextButton = addButton(
      nextRow,
      step === questions.length - 1
        ? "Reveal my personality →"
        : "Next question →",
      () => {
        if (answers[step] === null) return;

        if (step === questions.length - 1) {
          renderResult();
        } else {
          step++;
          renderQuestion();
        }
      }
    );

    nextButton.disabled = answers[step] === null;

    panel.appendChild(nextRow);
    playArea.appendChild(panel);
  }

  function findResult() {
    const scores = Object.fromEntries(
      typeOrder.map(type => [type, 0])
    );

    answers.forEach((choice, i) => {
      const type = questions[i].options[choice][1];
      scores[type]++;
    });

    const highestScore = Math.max(...Object.values(scores));

    const tied = typeOrder.filter(
      type => scores[type] === highestScore
    );

    if (tied.length === 1) return tied[0];

    // For ties, use the latest answer among tied types.
    for (let i = answers.length - 1; i >= 0; i--) {
      const type = questions[i].options[answers[i]][1];

      if (tied.includes(type)) return type;
    }

    return tied[0];
  }

  function renderResult() {
    const type = findResult();
    const result = results[type];

    playArea.replaceChildren();

    const panel = element("section", "sq-panel sq-result");

    panel.appendChild(
      element("div", "sq-kicker", "YOUR STRATEGY PERSONALITY")
    );

    panel.appendChild(
      element("h2", "sq-result-title", result.title)
    );

    panel.appendChild(
      element("p", "sq-result-subtitle", result.subtitle)
    );

    panel.appendChild(
      element("p", "sq-result-meaning", result.meaning)
    );

    const feedback = [
      ["Your greatest strength", result.strength],
      ["Your strategic blind spot", result.blindSpot],
      ["A little advice from Chelsy", result.advice]
    ];

    feedback.forEach(([heading, description]) => {
      const block = element("div", "sq-result-detail");

      block.appendChild(element("h3", "", heading));
      block.appendChild(element("p", "", description));

      panel.appendChild(block);
    });

    panel.appendChild(
      element(
        "p",
        "sq-disclaimer",
        "For fun and reflection — not a scientific personality assessment."
      )
    );

    const actions = element("div", "sq-actions");

    addButton(actions, "Play again ↻", openQuiz);

    addButton(
      actions,
      "All games ←",
      goBackToGames,
      "secondary"
    );

    addButton(
      actions,
      "Copy my result",
      () => {
        const copyText =
          `I got ${result.title} on The Strategy Lab! ` +
          `${result.subtitle} https://chelsyshah.blog`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(copyText)
            .then(() => {
              window.alert("Result copied!");
            })
            .catch(() => {
              window.prompt("Copy your result:", copyText);
            });
        } else {
          window.prompt("Copy your result:", copyText);
        }
      },
      "secondary"
    );

    panel.appendChild(actions);
    playArea.appendChild(panel);
  }

  quizButton.addEventListener("click", openQuiz);

})();
