
const DB_KEY = 'autoiq-highscore';
const QUESTIONS = [
  {
    "category": "Cars",
    "difficulty": "Easy",
    "q": "Which configuration is known as a 'V' engine?",
    "choices": [
      "Cylinders in a straight line",
      "Cylinders arranged in two banks meeting at an angle",
      "Opposed cylinders on a single plane",
      "Single‑cylinder"
    ],
    "a": 1
  },
  {
    "category": "Cars",
    "difficulty": "Medium",
    "q": "Which brand introduced the first mass‑produced hybrid car, the Prius?",
    "choices": [
      "Honda",
      "Toyota",
      "Ford",
      "Hyundai"
    ],
    "a": 1
  },
  {
    "category": "Cars",
    "difficulty": "Medium",
    "q": "Turbochargers primarily increase which engine parameter?",
    "choices": [
      "Displacement",
      "Compression ratio",
      "Air intake density",
      "Fuel octane"
    ],
    "a": 2
  },
  {
    "category": "Cars",
    "difficulty": "Hard",
    "q": "What does ‘BHP’ stand for in engine specs?",
    "choices": [
      "Brake Horsepower",
      "Boosted Horsepower",
      "Base Heat Power",
      "Bore Horsepower"
    ],
    "a": 0
  },
  {
    "category": "Bikes",
    "difficulty": "Easy",
    "q": "A typical sportbike uses which engine layout?",
    "choices": [
      "Inline‑four",
      "V10",
      "W16",
      "Flat‑eight"
    ],
    "a": 0
  },
  {
    "category": "Bikes",
    "difficulty": "Medium",
    "q": "‘CC’ in bikes stands for cubic capacity of what?",
    "choices": [
      "Fuel tank",
      "Engine displacement",
      "Exhaust volume",
      "Radiator capacity"
    ],
    "a": 1
  },
  {
    "category": "Bikes",
    "difficulty": "Hard",
    "q": "Ride‑by‑wire refers to:",
    "choices": [
      "Electronic throttle control",
      "Wireless brakes",
      "Remote ignition",
      "Traction‑only control"
    ],
    "a": 0
  },
  {
    "category": "Planes",
    "difficulty": "Easy",
    "q": "Commercial airliners commonly use which engines?",
    "choices": [
      "Turboshaft",
      "Turbofan",
      "Radial piston",
      "Ramjet"
    ],
    "a": 1
  },
  {
    "category": "Planes",
    "difficulty": "Medium",
    "q": "The wing component that primarily increases lift at low speeds is:",
    "choices": [
      "Aileron",
      "Flap",
      "Spoiler",
      "Rudder"
    ],
    "a": 1
  },
  {
    "category": "Planes",
    "difficulty": "Hard",
    "q": "ETOPS certification relates to:",
    "choices": [
      "Noise levels",
      "Extended operations for twins over water",
      "Cabin pressurization",
      "Wing flex limits"
    ],
    "a": 1
  },
  {
    "category": "Trains",
    "difficulty": "Easy",
    "q": "High‑speed trains like Shinkansen or TGV are primarily:",
    "choices": [
      "Diesel‑electric",
      "Maglev",
      "Electric multiple units",
      "Steam"
    ],
    "a": 2
  },
  {
    "category": "Trains",
    "difficulty": "Medium",
    "q": "What is ‘catenary’ in railway systems?",
    "choices": [
      "Brake type",
      "Overhead power line",
      "Track gauge",
      "Signal aspect"
    ],
    "a": 1
  },
  {
    "category": "Trains",
    "difficulty": "Hard",
    "q": "Regenerative braking in electric trains does what?",
    "choices": [
      "Consumes more power",
      "Converts kinetic energy back to electrical",
      "Only heats resistors",
      "Only works downhill"
    ],
    "a": 1
  },
  {
    "category": "Market",
    "difficulty": "Easy",
    "q": "Which metric often indicates how many vehicles a brand sells yearly?",
    "choices": [
      "Curb weight",
      "Wheelbase",
      "Annual unit sales",
      "Compression ratio"
    ],
    "a": 2
  },
  {
    "category": "Market",
    "difficulty": "Medium",
    "q": "A ‘facelift’ in auto industry jargon refers to:",
    "choices": [
      "Full redesign",
      "Minor design/feature update mid‑cycle",
      "Engine recall",
      "Paint refresh only"
    ],
    "a": 1
  },
  {
    "category": "Market",
    "difficulty": "Hard",
    "q": "Which factor MOST directly improves power‑to‑weight ratio?",
    "choices": [
      "Bigger wheels",
      "Heavier body shell",
      "More power or less mass",
      "More seats"
    ],
    "a": 2
  },
  {
    "category": "Engines",
    "difficulty": "Medium",
    "q": "A boxer engine is characterized by:",
    "choices": [
      "V‑layout",
      "Cylinders laid flat opposing each other",
      "Radial arrangement",
      "Single cylinder"
    ],
    "a": 1
  },
  {
    "category": "Engines",
    "difficulty": "Hard",
    "q": "Stoichiometric air‑fuel ratio for gasoline is approx:",
    "choices": [
      "7:1",
      "10:1",
      "14.7:1",
      "18:1"
    ],
    "a": 2
  },
  {
    "category": "Planes",
    "difficulty": "Medium",
    "q": "Fly‑by‑wire replaces mechanical linkages with:",
    "choices": [
      "Hydraulic backup only",
      "Electronic control systems",
      "Vacuum lines",
      "Pneumatic valves"
    ],
    "a": 1
  },
  {
    "category": "Bikes",
    "difficulty": "Medium",
    "q": "A slipper clutch mainly helps with:",
    "choices": [
      "Top speed",
      "Fuel efficiency",
      "Preventing rear‑wheel hop on aggressive downshifts",
      "Increasing engine displacement"
    ],
    "a": 2
  },
  {
    "category": "Cars",
    "difficulty": "Medium",
    "q": "Which drivetrain sends power to all wheels automatically when slip is detected?",
    "choices": [
      "RWD",
      "FWD",
      "AWD",
      "2WD"
    ],
    "a": 2
  }
];

const state = {
  idx: 0,
  order: [],
  score: 0,
  total: 0,
  selectedCategory: 'All',
  selectedDifficulty: 'All'
};

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function filterQuestions() {
  let pool = QUESTIONS.slice();
  if (state.selectedCategory !== 'All') {
    pool = pool.filter(q => q.category === state.selectedCategory);
  }
  if (state.selectedDifficulty !== 'All') {
    pool = pool.filter(q => q.difficulty === state.selectedDifficulty);
  }
  return shuffle(pool);
}

function renderMeta() {
  const scoreEl = document.getElementById('score');
  const progEl = document.getElementById('progress');
  scoreEl.innerHTML = `🚘 <b>${state.score}</b> XP`;
  progEl.textContent = `${state.idx+1} / ${state.total}`;
}

function renderQuestion() {
  const q = state.order[state.idx];
  const qEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  qEl.textContent = q.q;
  answersEl.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.textContent = choice;
    btn.onclick = () => submitAnswer(i);
    answersEl.appendChild(btn);
  });
  renderMeta();
}

function submitAnswer(i) {
  const q = state.order[state.idx];
  const answers = document.querySelectorAll('.answer');
  answers.forEach((el, idx) => {
    el.disabled = true;
    if (idx === q.a) el.classList.add('correct');
    if (idx === i && i !== q.a) el.classList.add('wrong');
  });
  const resultEl = document.getElementById('result');
  if (i === q.a) {
    state.score += 1;
    resultEl.textContent = '✅ Correct! +1 XP';
  } else {
    resultEl.textContent = '❌ Wrong';
  }
  renderMeta();
  setTimeout(nextQuestion, 650);
}

function nextQuestion() {
  document.getElementById('result').textContent = '';
  state.idx += 1;
  if (state.idx >= state.total) return endQuiz();
  renderQuestion();
}

function endQuiz() {
  const high = Number(localStorage.getItem(DB_KEY) || 0);
  if (state.score > high) localStorage.setItem(DB_KEY, String(state.score));
  const highNow = Number(localStorage.getItem(DB_KEY) || 0);
  const container = document.getElementById('quiz');
  container.innerHTML = `
    <div class="card">
      <h2>Results</h2>
      <p>You scored <b>${state.score}</b> 🚘 XP out of ${state.total}.</p>
      <p>Best score on this device: <span class="pill">🚘 ${highNow} XP</span></p>
      <div class="controls" style="margin-top:12px">
        <button class="primary" id="restart">Play again</button>
        <button id="home">Home</button>
      </div>
    </div>
  `;
  document.getElementById('restart').onclick = startQuiz;
  document.getElementById('home').onclick = showHome;
}

function startQuiz() {
  const catSel = document.getElementById('category');
  const difSel = document.getElementById('difficulty');
  state.selectedCategory = catSel.value;
  state.selectedDifficulty = difSel.value;
  state.order = filterQuestions();
  state.total = state.order.length;
  state.idx = 0;
  state.score = 0;

  const quiz = document.getElementById('quiz');
  quiz.innerHTML = `
    <div class="card grow">
      <div class="meta">
        <div>Category: <span class="pill">${state.selectedCategory}</span></div>
        <div>Difficulty: <span class="pill">${state.selectedDifficulty}</span></div>
      </div>
      <div id="question"></div>
      <div id="answers" class="answers"></div>
      <div class="meta">
        <div id="result"></div>
        <div><span id="score" class="xp"></span> • <span id="progress"></span></div>
      </div>
    </div>
  `;
  renderQuestion();
}

function showHome() {
  document.getElementById('homeScreen').classList.remove('hidden');
  document.getElementById('quiz').innerHTML = '';
  const high = Number(localStorage.getItem(DB_KEY) || 0);
  document.getElementById('best').textContent = `Best: 🚘 ${high} XP`;
}

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
  showHome();
});
