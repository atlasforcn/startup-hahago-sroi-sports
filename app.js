const events = [
  {
    id: "run-books",
    title: "城市接力 Run for Books",
    sport: "路跑",
    cause: "education",
    related: ["health", "inclusion"],
    district: "新竹市全區",
    ngo: "竹塹少年閱讀行動",
    company: "芯動企業聯盟",
    participants: 420,
    scale: 72,
    distance: 5.2,
    sponsor: 180000,
    volunteerHours: 310,
    completion: 86,
    beneficiaries: 180,
    readiness: 88,
    roleFit: { participant: 92, company: 90, ngo: 84 },
    tags: ["親子路跑", "閱讀推廣", "企業志工"],
    goals: { participants: 520, kilometers: 2700, funds: 320000, hours: 420, beneficiaries: 240 },
    outcomes: { participants: 382, kilometers: 1878, funds: 268000, hours: 310, beneficiaries: 180 }
  },
  {
    id: "river-ride",
    title: "風城騎跡 River Ride",
    sport: "單車",
    cause: "environment",
    related: ["health", "education"],
    district: "頭前溪沿線",
    ngo: "溪流巡守共學站",
    company: "綠能零件供應鏈",
    participants: 260,
    scale: 56,
    distance: 18,
    sponsor: 220000,
    volunteerHours: 260,
    completion: 78,
    beneficiaries: 120,
    readiness: 82,
    roleFit: { participant: 78, company: 86, ngo: 91 },
    tags: ["單車淨溪", "環境教育", "碳足跡"],
    goals: { participants: 340, kilometers: 6100, funds: 290000, hours: 380, beneficiaries: 160 },
    outcomes: { participants: 214, kilometers: 3852, funds: 210000, hours: 248, beneficiaries: 116 }
  },
  {
    id: "hoop-inclusion",
    title: "公益三對三 Hoop Together",
    sport: "籃球",
    cause: "inclusion",
    related: ["education", "health"],
    district: "新竹市東區",
    ngo: "共融運動教室",
    company: "半導體青年社",
    participants: 180,
    scale: 48,
    distance: 3.4,
    sponsor: 150000,
    volunteerHours: 190,
    completion: 84,
    beneficiaries: 96,
    readiness: 90,
    roleFit: { participant: 88, company: 76, ngo: 93 },
    tags: ["球隊認養", "共融賽制", "青年陪伴"],
    goals: { participants: 240, kilometers: 820, funds: 210000, hours: 260, beneficiaries: 130 },
    outcomes: { participants: 156, kilometers: 530, funds: 138000, hours: 166, beneficiaries: 88 }
  },
  {
    id: "steps-health",
    title: "萬步應援 Step Relay",
    sport: "健走",
    cause: "health",
    related: ["inclusion", "environment"],
    district: "十八尖山周邊",
    ngo: "健康城市陪走隊",
    company: "園區 ESG 聯盟",
    participants: 640,
    scale: 88,
    distance: 4.8,
    sponsor: 260000,
    volunteerHours: 520,
    completion: 81,
    beneficiaries: 310,
    readiness: 80,
    roleFit: { participant: 95, company: 92, ngo: 78 },
    tags: ["健走累點", "健康促進", "員工 ESG"],
    goals: { participants: 760, kilometers: 3650, funds: 390000, hours: 610, beneficiaries: 360 },
    outcomes: { participants: 548, kilometers: 2630, funds: 312000, hours: 456, beneficiaries: 286 }
  }
];

const causeLabels = {
  education: "教育平權",
  health: "健康促進",
  inclusion: "共融參與",
  environment: "環境永續"
};

const roleLabels = {
  participant: "參與者",
  company: "企業",
  ngo: "NGO"
};

const tasks = {
  participant: [
    { id: "p-register", phase: "賽前", title: "完成公益賽事報名", detail: "選擇里程、隊伍與要支持的 NGO 議題。" },
    { id: "p-pledge", phase: "賽前", title: "設定每公里公益承諾", detail: "用運動里程累積公益款項或企業配捐。" },
    { id: "p-checkin", phase: "賽中", title: "完成 GPS 打卡與任務回報", detail: "里程、時間與任務完成率會進入成果追蹤。" },
    { id: "p-story", phase: "賽後", title: "提交公益回饋", detail: "補上活動照片、心得與受益者回饋摘要。" }
  ],
  company: [
    { id: "c-sponsor", phase: "賽前", title: "設定贊助投入與配捐上限", detail: "讓平台用 SROI 估算公益效益與品牌參與成本。" },
    { id: "c-team", phase: "賽前", title: "建立企業隊伍與志工排班", detail: "分配跑者、補給志工、成果紀錄與 NGO 對接窗口。" },
    { id: "c-match", phase: "賽中", title: "確認推薦活動與媒合條件", detail: "以角色契合、議題契合、規模與準備度排序。" },
    { id: "c-report", phase: "賽後", title: "匯出 ESG 影響力摘要", detail: "彙整投入成本、公益款項、志工時數與 SROI 倍數。" }
  ],
  ngo: [
    { id: "n-brief", phase: "賽前", title: "建立受益人與服務需求", detail: "定義活動款項用途、受益人數與可驗證成果。" },
    { id: "n-volunteer", phase: "賽前", title: "發布現場支援任務", detail: "建立補給、引導、陪跑、活動紀錄等任務。" },
    { id: "n-proof", phase: "賽中", title: "回收任務完成佐證", detail: "確認里程、志工時數、照片與活動紀錄。" },
    { id: "n-impact", phase: "賽後", title: "提交公益成果報告", detail: "用成果資料更新 SROI 拆解與下一場推薦。" }
  ]
};

const state = {
  role: "company",
  cause: "education",
  scale: 70,
  selectedEventId: "run-books",
  taskRole: "participant",
  completedTasks: {
    participant: new Set(["p-register", "p-pledge"]),
    company: new Set(["c-sponsor"]),
    ngo: new Set(["n-brief"])
  },
  sroi: {
    sponsor: 180000,
    participants: 420,
    distance: 5.2,
    volunteerHours: 310,
    completion: 86
  },
  outcomes: {},
  feed: []
};

const moneyFormatter = new Intl.NumberFormat("zh-TW", {
  style: "currency",
  currency: "TWD",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("zh-TW");

function formatMoney(value) {
  return moneyFormatter.format(Math.round(value));
}

function formatNumber(value) {
  return numberFormatter.format(Math.round(value));
}

function getEvent(id = state.selectedEventId) {
  return events.find((event) => event.id === id) || events[0];
}

function cloneOutcomes(event) {
  return { ...event.outcomes };
}

function getScore(event) {
  const roleScore = event.roleFit[state.role] || 75;
  const causeScore = event.cause === state.cause ? 100 : event.related.includes(state.cause) ? 86 : 62;
  const scaleScore = Math.max(46, 100 - Math.abs(event.scale - state.scale) * 1.15);
  return Math.round(roleScore * 0.34 + causeScore * 0.31 + scaleScore * 0.2 + event.readiness * 0.15);
}

function getRankedEvents() {
  return [...events].sort((a, b) => getScore(b) - getScore(a));
}

function calculateSroi() {
  const completion = state.sroi.completion / 100;
  const participants = state.sroi.participants;
  const distance = state.sroi.distance;
  const sponsor = state.sroi.sponsor;
  const volunteerHours = state.sroi.volunteerHours;
  const donationValue = sponsor * 0.82 * completion + participants * distance * 18;
  const healthValue = participants * distance * 42 * completion;
  const volunteerValue = volunteerHours * 260 * completion;
  const communityValue = participants * 135 + sponsor * 0.16;
  const totalValue = donationValue + healthValue + volunteerValue + communityValue;
  const inputCost = sponsor + participants * 95 + 52000;
  const ratio = totalValue / inputCost;

  return {
    ratio,
    totalValue,
    inputCost,
    donationValue,
    healthValue,
    volunteerValue,
    communityValue
  };
}

function getTaskCompletion(role = state.taskRole) {
  const allTasks = tasks[role];
  const done = state.completedTasks[role].size;
  return {
    done,
    total: allTasks.length,
    percent: Math.round((done / allTasks.length) * 100)
  };
}

function getAllTaskPercent() {
  const total = Object.values(tasks).reduce((sum, list) => sum + list.length, 0);
  const done = Object.values(state.completedTasks).reduce((sum, set) => sum + set.size, 0);
  return Math.round((done / total) * 100);
}

function setSelectedEvent(id) {
  state.selectedEventId = id;
  const event = getEvent(id);
  state.outcomes = cloneOutcomes(event);
  state.feed = [
    {
      title: `${event.ngo} 已建立活動成果基準`,
      detail: `${event.sport}活動，初始追蹤 ${formatNumber(event.outcomes.participants)} 人參與。`,
      time: "剛剛"
    },
    {
      title: `${event.company} 完成公益投入確認`,
      detail: `目前承諾 ${formatMoney(event.outcomes.funds)}，用於 ${causeLabels[event.cause]}。`,
      time: "12 分鐘前"
    }
  ];
}

function syncSroiWithSelectedEvent() {
  const event = getEvent();
  state.sroi = {
    sponsor: event.sponsor,
    participants: event.participants,
    distance: event.distance,
    volunteerHours: event.volunteerHours,
    completion: event.completion
  };
  updateSroiInputs();
  render();
}

function updateSroiInputs() {
  document.querySelector("#sponsor-input").value = state.sroi.sponsor;
  document.querySelector("#participants-input").value = state.sroi.participants;
  document.querySelector("#distance-input").value = state.sroi.distance;
  document.querySelector("#volunteer-input").value = state.sroi.volunteerHours;
  document.querySelector("#completion-input").value = state.sroi.completion;
}

function renderEvents() {
  const list = document.querySelector("#event-list");
  const ranked = getRankedEvents();
  list.innerHTML = ranked
    .map((event) => {
      const score = getScore(event);
      const active = event.id === state.selectedEventId ? " active" : "";
      return `
        <button class="event-option${active}" type="button" data-event-id="${event.id}">
          <span class="event-topline">
            <span>${event.sport}</span>
            <small>${event.district}</small>
          </span>
          <strong>${event.title}</strong>
          <span class="event-meta">
            <small>${event.ngo}</small>
            <small>${causeLabels[event.cause]}</small>
          </span>
          <span class="event-score">
            <small>${roleLabels[state.role]}契合</small>
            <b>${score}</b>
          </span>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".event-option").forEach((button) => {
    button.addEventListener("click", () => {
      setSelectedEvent(button.dataset.eventId);
      render();
    });
  });

  document.querySelector("#match-count").textContent = `${ranked.length} 場候選`;
}

function renderRecommendation() {
  const event = getEvent();
  const score = getScore(event);
  const topEvent = getRankedEvents()[0];
  const selectedTags = document.querySelector("#selected-tags");
  const reasons = [
    `${roleLabels[state.role]}視角下，這場活動的角色契合度為 ${event.roleFit[state.role]} 分。`,
    `公益目標目前設定為「${causeLabels[state.cause]}」，活動主題為「${causeLabels[event.cause]}」。`,
    `規模設定 ${state.scale}，活動規模 ${event.scale}，適合做為 ${event.company} 與 ${event.ngo} 的共同任務。`
  ];

  document.querySelector("#selected-score").textContent = score;
  document.querySelector("#selected-title").textContent = event.title;
  document.querySelector("#selected-meta").textContent = `${event.sport} · ${event.district} · ${event.ngo}`;
  document.querySelector("#hero-score").textContent = score;
  document.querySelector("#hero-event").textContent = event.title;
  selectedTags.innerHTML = event.tags.map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#selected-reasons").innerHTML = reasons.map((reason) => `<li>${reason}</li>`).join("");
  document.querySelector("#adopt-recommendation").disabled = topEvent.id === state.selectedEventId;
}

function renderTasks() {
  const taskList = document.querySelector("#task-list");
  const completion = getTaskCompletion();

  document.querySelectorAll("#task-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.taskRole === state.taskRole);
  });

  taskList.innerHTML = tasks[state.taskRole]
    .map((task) => {
      const checked = state.completedTasks[state.taskRole].has(task.id) ? "checked" : "";
      return `
        <label class="task-row">
          <input type="checkbox" data-task-id="${task.id}" ${checked} />
          <span>
            <strong>${task.title}</strong>
            <small>${task.detail}</small>
          </span>
          <span class="task-phase">${task.phase}</span>
        </label>
      `;
    })
    .join("");

  document.querySelectorAll("#task-list input").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        state.completedTasks[state.taskRole].add(input.dataset.taskId);
      } else {
        state.completedTasks[state.taskRole].delete(input.dataset.taskId);
      }
      render();
    });
  });

  document.querySelector("#task-progress-label").textContent = `${completion.percent}%`;
  document.querySelector("#task-progress-bar").style.width = `${completion.percent}%`;
}

function renderSroi() {
  const result = calculateSroi();
  const dial = document.querySelector("#sroi-dial");
  const ratioDegrees = Math.min(360, Math.max(18, result.ratio / 4 * 360));
  const breakdown = [
    ["公益款項", result.donationValue, "var(--coral)"],
    ["健康促進", result.healthValue, "var(--green)"],
    ["志工時數", result.volunteerValue, "var(--blue)"],
    ["社群外溢", result.communityValue, "var(--yellow)"]
  ];
  const maxValue = Math.max(...breakdown.map((item) => item[1]));

  document.querySelector("#sponsor-output").textContent = formatMoney(state.sroi.sponsor);
  document.querySelector("#participants-output").textContent = formatNumber(state.sroi.participants);
  document.querySelector("#distance-output").textContent = `${state.sroi.distance.toFixed(1)} km`;
  document.querySelector("#volunteer-output").textContent = formatNumber(state.sroi.volunteerHours);
  document.querySelector("#completion-output").textContent = `${state.sroi.completion}%`;
  document.querySelector("#sroi-ratio").textContent = `${result.ratio.toFixed(2)}x`;
  document.querySelector("#metric-sroi").textContent = `${result.ratio.toFixed(2)}x`;
  document.querySelector("#sroi-health").textContent = result.ratio >= 1.8 ? "高效益" : "需調整";
  dial.style.background = `conic-gradient(var(--green) 0deg ${ratioDegrees}deg, #e8ecdf ${ratioDegrees}deg 360deg)`;

  document.querySelector("#sroi-breakdown").innerHTML = breakdown
    .map(([label, value, color]) => {
      const width = Math.max(8, Math.round((value / maxValue) * 100));
      return `
        <div class="breakdown-row">
          <span>${label}</span>
          <span class="bar"><span style="width:${width}%; background:${color}"></span></span>
          <strong>${formatMoney(value)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderOutcomes() {
  const event = getEvent();
  const rows = [
    ["參與人數", state.outcomes.participants, event.goals.participants, "人"],
    ["累積里程", state.outcomes.kilometers, event.goals.kilometers, "km"],
    ["公益款項", state.outcomes.funds, event.goals.funds, ""],
    ["志工時數", state.outcomes.hours, event.goals.hours, "小時"],
    ["受益人數", state.outcomes.beneficiaries, event.goals.beneficiaries, "人"]
  ];

  document.querySelector("#outcome-list").innerHTML = rows
    .map(([label, value, goal, unit]) => {
      const percent = Math.min(100, Math.round((value / goal) * 100));
      const displayValue = label === "公益款項" ? formatMoney(value) : `${formatNumber(value)} ${unit}`;
      return `
        <article class="outcome-item">
          <span>${label}</span>
          <strong>${displayValue}</strong>
          <small>目標 ${label === "公益款項" ? formatMoney(goal) : `${formatNumber(goal)} ${unit}`} · ${percent}%</small>
          <div class="outcome-bar" aria-hidden="true"><span style="width:${percent}%"></span></div>
        </article>
      `;
    })
    .join("");

  document.querySelector("#activity-feed").innerHTML = state.feed
    .map((item) => `
      <article class="feed-item">
        <span>
          <strong>${item.title}</strong>
          <small>${item.detail}</small>
        </span>
        <span class="feed-time">${item.time}</span>
      </article>
    `)
    .join("");
  document.querySelector("#feed-count").textContent = state.feed.length;
  document.querySelector("#metric-funds").textContent = formatMoney(state.outcomes.funds || 0);
}

function renderMetrics() {
  const event = getEvent();
  document.querySelector("#metric-match").textContent = getScore(event);
  document.querySelector("#metric-tasks").textContent = `${getAllTaskPercent()}%`;
}

function drawImpactTrack() {
  const canvas = document.querySelector("#impact-track");
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(320, rect.width);
  const height = Math.max(240, rect.height);
  const event = getEvent();
  const outcomeRows = [
    ["人數", state.outcomes.participants / event.goals.participants, varColor("--coral")],
    ["里程", state.outcomes.kilometers / event.goals.kilometers, varColor("--green")],
    ["款項", state.outcomes.funds / event.goals.funds, varColor("--blue")],
    ["志工", state.outcomes.hours / event.goals.hours, varColor("--yellow")]
  ];

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#10211d";
  context.fillRect(0, 0, width, height);

  for (let x = -height; x < width + height; x += 34) {
    context.fillStyle = "rgba(255,255,255,0.08)";
    context.fillRect(x, 0, 12, height);
    context.translate(x, 0);
    context.rotate(-0.35);
    context.translate(-x, 0);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  context.lineCap = "round";
  context.font = "800 13px Avenir Next, sans-serif";
  outcomeRows.forEach(([label, progress, color], index) => {
    const y = 54 + index * 52;
    const startX = 68;
    const endX = width - 34;
    const clamped = Math.min(1, Math.max(0.04, progress));
    const runnerX = startX + (endX - startX) * clamped;

    context.strokeStyle = "rgba(255,255,255,0.24)";
    context.lineWidth = 16;
    context.beginPath();
    context.moveTo(startX, y);
    context.lineTo(endX, y);
    context.stroke();

    context.strokeStyle = color;
    context.lineWidth = 16;
    context.beginPath();
    context.moveTo(startX, y);
    context.lineTo(runnerX, y);
    context.stroke();

    context.fillStyle = "#ffffff";
    context.fillText(label, 18, y + 5);
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(runnerX, y, 13, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#10211d";
    context.beginPath();
    context.arc(runnerX, y, 6, 0, Math.PI * 2);
    context.fill();
  });

  context.fillStyle = "rgba(255,255,255,0.72)";
  context.font = "700 12px Avenir Next, sans-serif";
  context.fillText(`${event.sport} · ${causeLabels[event.cause]} · SROI ${(calculateSroi().ratio).toFixed(2)}x`, 18, height - 24);
}

function varColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function addOutcome() {
  const event = getEvent();
  const bump = {
    participants: Math.ceil(event.goals.participants * 0.04),
    kilometers: Math.ceil(event.goals.kilometers * 0.05),
    funds: Math.ceil(event.goals.funds * 0.045),
    hours: Math.ceil(event.goals.hours * 0.04),
    beneficiaries: Math.ceil(event.goals.beneficiaries * 0.035)
  };

  Object.entries(bump).forEach(([key, value]) => {
    state.outcomes[key] = Math.min(event.goals[key], state.outcomes[key] + value);
  });

  state.feed.unshift({
    title: `${event.title} 新增一筆成果`,
    detail: `新增 ${formatNumber(bump.kilometers)} km、${formatMoney(bump.funds)} 與 ${formatNumber(bump.hours)} 小時志工紀錄。`,
    time: "剛剛"
  });
  state.feed = state.feed.slice(0, 5);
  render();
}

function bindControls() {
  document.querySelector("#role-select").addEventListener("change", (event) => {
    state.role = event.target.value;
    render();
  });

  document.querySelector("#cause-select").addEventListener("change", (event) => {
    state.cause = event.target.value;
    render();
  });

  document.querySelector("#scale-range").addEventListener("input", (event) => {
    state.scale = Number(event.target.value);
    document.querySelector("#scale-output").textContent = state.scale;
    render();
  });

  document.querySelector("#adopt-recommendation").addEventListener("click", () => {
    setSelectedEvent(getRankedEvents()[0].id);
    render();
  });

  document.querySelector("#sync-sroi").addEventListener("click", syncSroiWithSelectedEvent);
  document.querySelector("#seed-outcome").addEventListener("click", () => {
    setSelectedEvent(state.selectedEventId);
    render();
  });

  document.querySelectorAll("#task-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.taskRole = button.dataset.taskRole;
      render();
    });
  });

  [
    ["#sponsor-input", "sponsor", Number],
    ["#participants-input", "participants", Number],
    ["#distance-input", "distance", Number],
    ["#volunteer-input", "volunteerHours", Number],
    ["#completion-input", "completion", Number]
  ].forEach(([selector, key, parser]) => {
    document.querySelector(selector).addEventListener("input", (event) => {
      state.sroi[key] = parser(event.target.value);
      render();
    });
  });

  document.querySelector("#add-outcome").addEventListener("click", addOutcome);
  document.querySelector("#reset-outcome").addEventListener("click", () => {
    setSelectedEvent(state.selectedEventId);
    render();
  });

  window.addEventListener("resize", drawImpactTrack);
}

function render() {
  renderEvents();
  renderRecommendation();
  renderTasks();
  renderSroi();
  renderOutcomes();
  renderMetrics();
  drawImpactTrack();
}

setSelectedEvent(state.selectedEventId);
updateSroiInputs();
bindControls();
render();
