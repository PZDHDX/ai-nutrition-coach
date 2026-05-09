const mealTypes = [
  { key: "breakfast", label: "早餐", short: "早" },
  { key: "lunch", label: "午餐", short: "午" },
  { key: "dinner", label: "晚餐", short: "晚" },
  { key: "snack", label: "加餐", short: "加" },
];

const baseRecognizedFoods = [
  { id: "chicken-salad", name: "鸡胸肉沙拉", weight: 180, calories: 245, protein: 32, carbs: 12, fat: 8 },
  { id: "rice", name: "米饭", weight: 120, calories: 140, protein: 3, carbs: 31, fat: 0.4 },
  { id: "egg", name: "煎蛋", weight: 55, calories: 95, protein: 7, carbs: 1, fat: 7 },
  { id: "milk", name: "牛奶", weight: 250, calories: 155, protein: 8, carbs: 12, fat: 8 },
];

const preferenceOptions = ["清淡", "低碳", "高蛋白", "素食", "不吃辣"];

const today = new Date();
const todayKey = formatKey(today);

const state = {
  user: {
    name: "营养达人",
    gender: "女",
    age: 29,
    height: 165,
    weight: 62,
    targetWeight: 56,
    goal: "减脂",
    preferences: ["清淡", "高蛋白"],
    targetCalories: 1650,
    exerciseFrequency: "每周3-4次",
  },
  water: 1200,
  exercise: 220,
  activeView: "homeView",
  activeRecordPanel: "records",
  selectedDate: todayKey,
  captureStatus: "idle",
  captureMeal: "lunch",
  recognizedFoods: [],
  chat: [
    {
      role: "ai",
      text: "你好，我会结合你的目标、今日摄入和饮食记录，给出温和可执行的饮食建议。你可以先从下面的问题开始。",
    },
  ],
  records: {
    [todayKey]: emptyMeals(),
    [shiftKey(-1)]: {
      breakfast: [
        foodRecord("燕麦酸奶碗", 300, 356, 17, 48, 10),
        foodRecord("水煮蛋", 50, 72, 6, 1, 5),
      ],
      lunch: [
        foodRecord("番茄牛肉饭", 420, 618, 34, 78, 18),
      ],
      dinner: [
        foodRecord("清蒸鱼", 160, 205, 31, 2, 7),
        foodRecord("炒青菜", 180, 118, 5, 14, 5),
      ],
      snack: [
        foodRecord("苹果", 180, 96, 0.5, 25, 0.3),
      ],
    },
    [shiftKey(-2)]: {
      breakfast: [foodRecord("全麦三明治", 220, 385, 21, 42, 14)],
      lunch: [foodRecord("鸡肉藜麦碗", 360, 520, 39, 54, 15)],
      dinner: [foodRecord("豆腐蔬菜汤", 300, 260, 18, 22, 10)],
      snack: [],
    },
  },
};

const views = {
  homeView: document.querySelector("#homeView"),
  captureView: document.querySelector("#captureView"),
  recordsView: document.querySelector("#recordsView"),
  coachView: document.querySelector("#coachView"),
  profileView: document.querySelector("#profileView"),
};

const screenTitle = document.querySelector("#screenTitle");
const toast = document.querySelector("#toast");
const detailModal = document.querySelector("#detailModal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

function emptyMeals() {
  return { breakfast: [], lunch: [], dinner: [], snack: [] };
}

function foodRecord(name, weight, calories, protein, carbs, fat) {
  return {
    uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    weight,
    calories,
    protein,
    carbs,
    fat,
    createdAt: new Date().toISOString(),
  };
}

function formatKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftKey(offset) {
  const date = new Date(today);
  date.setDate(today.getDate() + offset);
  return formatKey(date);
}

function formatDisplayDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function weekday(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function totalsFor(dateKey = todayKey) {
  const meals = state.records[dateKey] || emptyMeals();
  const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  mealTypes.forEach((meal) => {
    meals[meal.key].forEach((food) => {
      totals.calories += food.calories;
      totals.protein += food.protein;
      totals.carbs += food.carbs;
      totals.fat += food.fat;
    });
  });
  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: Math.round(totals.fat),
  };
}

function mealCalories(dateKey = todayKey) {
  const meals = state.records[dateKey] || emptyMeals();
  return mealTypes.map((meal) => ({
    ...meal,
    value: Math.round(meals[meal.key].reduce((sum, food) => sum + food.calories, 0)),
  }));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function setView(viewId) {
  state.activeView = viewId;
  Object.entries(views).forEach(([id, el]) => el.classList.toggle("active", id === viewId));
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.target === viewId);
  });
  screenTitle.textContent = views[viewId].dataset.title;
  render();
}

function render() {
  renderHome();
  renderCapture();
  renderRecords();
  renderCoach();
  renderProfile();
}

function renderHome() {
  const totals = totalsFor(todayKey);
  const target = state.user.targetCalories;
  const progress = clamp((totals.calories / target) * 100, 0, 100);
  const dateLabel = `${today.getMonth() + 1}月${today.getDate()}日 ${weekday(todayKey)}`;

  views.homeView.innerHTML = `
    <section class="hero">
      <div class="hero-row">
        <div>
          <h2>你好，${state.user.name}！</h2>
          <p>今天先保证优质蛋白和蔬菜，再根据饥饿感安排主食份量。</p>
        </div>
        <span class="date-pill">${dateLabel}</span>
      </div>
    </section>

    <button class="camera-button" data-action="open-capture">
      ${cameraIcon()}
      <span>拍照识别</span>
    </button>

    <section class="metric-grid">
      <article class="metric-card primary">
        <div class="metric-label"><span>今日已摄入热量</span><span>${progress.toFixed(0)}%</span></div>
        <div><span class="metric-value">${totals.calories}</span><span class="metric-unit"> / ${target} 千卡</span></div>
        <div class="mini-progress"><span style="width:${progress}%"></span></div>
      </article>
      ${metricCard("推荐目标热量", target, "千卡", "green")}
      ${metricCard("蛋白质", totals.protein, "g", "green")}
      ${metricCard("碳水", totals.carbs, "g", "orange")}
      ${metricCard("脂肪", totals.fat, "g", "blue")}
      ${metricCard("饮水量", state.water, "ml", "blue")}
      ${metricCard("运动消耗", state.exercise, "千卡", "orange")}
    </section>

    <section class="section">
      <div class="section-title">
        <h2>今日饮食记录</h2>
        <button class="analysis-link" data-action="open-analysis">
          ${chartIcon()} 分析
        </button>
      </div>
      <div class="meal-list">${renderMeals(todayKey, true)}</div>
    </section>
  `;
}

function metricCard(label, value, unit, tone) {
  const color = tone === "orange" ? "var(--orange)" : tone === "blue" ? "var(--blue)" : "var(--green)";
  return `
    <article class="metric-card">
      <div class="metric-label"><span>${label}</span><span style="color:${color}">●</span></div>
      <div><span class="metric-value">${value}</span><span class="metric-unit"> ${unit}</span></div>
    </article>
  `;
}

function renderMeals(dateKey, includeEmptyCta = false) {
  const meals = state.records[dateKey] || emptyMeals();
  const allFoods = mealTypes.flatMap((meal) => meals[meal.key]);

  if (allFoods.length === 0) {
    return `
      <article class="meal-card empty-state">
        ${emptyPlateIcon()}
        <h3>今天还没有饮食记录</h3>
        <p class="empty-copy">点击拍照识别，AI 会帮你估算食物重量和营养数据。</p>
        ${
          includeEmptyCta
            ? `<button class="text-button" data-action="open-capture">去拍照识别</button>`
            : ""
        }
      </article>
    `;
  }

  return mealTypes
    .map((meal) => {
      const foods = meals[meal.key];
      const mealTotal = Math.round(foods.reduce((sum, food) => sum + food.calories, 0));
      const rows = foods
        .map(
          (food) => `
            <div class="food-row">
              <button data-action="food-detail" data-date="${dateKey}" data-id="${food.uid}">
                <div class="food-name">${food.name}</div>
                <div class="food-meta">${food.weight}g · 蛋白${round1(food.protein)}g · 碳水${round1(food.carbs)}g · 脂肪${round1(food.fat)}g</div>
              </button>
              <span class="calories">${Math.round(food.calories)} 千卡</span>
            </div>
          `,
        )
        .join("");

      return `
        <article class="meal-card">
          <div class="meal-head">
            <h3 class="meal-name"><span class="meal-icon">${meal.short}</span>${meal.label}</h3>
            <span class="meal-total">${mealTotal} 千卡</span>
          </div>
          ${foods.length ? rows : `<p class="empty-copy">暂无${meal.label}记录</p>`}
        </article>
      `;
    })
    .join("");
}

function renderCapture() {
  if (state.captureStatus === "loading") {
    views.captureView.innerHTML = `
      <section class="capture-card loading-box">
        <div>
          <div class="spinner"></div>
          <h2>AI 正在识别食物</h2>
          <p class="empty-copy">正在估算份量、热量和三大营养素，请稍等。</p>
        </div>
      </section>
    `;
    return;
  }

  if (state.captureStatus === "success") {
    const total = sumFoods(state.recognizedFoods);
    views.captureView.innerHTML = `
      <section class="capture-card">
        <div class="section-title">
          <div>
            <h2>识别成功</h2>
            <p class="caption">你可以调整份量，或删除不准确的食物项。</p>
          </div>
          <button class="text-button" data-action="reset-capture">重拍</button>
        </div>
        <div class="photo-plate" aria-label="模拟食物照片"></div>
        <div class="recognition-list">
          ${state.recognizedFoods.map(renderRecognizedItem).join("")}
        </div>
        <div class="meal-picker" aria-label="选择餐次">
          ${mealTypes
            .map(
              (meal) => `
                <button data-action="pick-meal" data-meal="${meal.key}" class="${state.captureMeal === meal.key ? "active" : ""}">
                  ${meal.label}
                </button>
              `,
            )
            .join("")}
        </div>
        <article class="record-summary card">
          <div class="record-top">
            <strong>本次合计</strong>
            <span class="calories">${Math.round(total.calories)} 千卡</span>
          </div>
          <div class="summary-grid">
            <div class="summary-cell"><strong>${Math.round(total.protein)}g</strong><span>蛋白质</span></div>
            <div class="summary-cell"><strong>${Math.round(total.carbs)}g</strong><span>碳水</span></div>
            <div class="summary-cell"><strong>${Math.round(total.fat)}g</strong><span>脂肪</span></div>
            <div class="summary-cell"><strong>${state.recognizedFoods.length}</strong><span>食物</span></div>
          </div>
        </article>
        <button class="primary-button" style="width:100%" data-action="confirm-foods">确认加入${mealLabel(state.captureMeal)}</button>
      </section>
    `;
    return;
  }

  views.captureView.innerHTML = `
    <section class="capture-card">
      <div class="photo-drop">
        <div>
          <div class="photo-plate" aria-label="模拟食物照片"></div>
          <h2>上传或拍摄食物照片</h2>
          <p class="empty-copy">MVP 使用模拟识别结果，适合演示从拍照到记录联动的完整流程。</p>
        </div>
      </div>
      <div class="capture-actions">
        <button class="primary-button" data-action="simulate-capture">拍摄照片</button>
        <button class="secondary-button" data-action="simulate-capture">从相册选择</button>
      </div>
      <p class="caption" style="margin-top:12px">建议拍清楚主食、蛋白质来源和配菜，估算会更接近实际。</p>
    </section>
  `;
}

function renderRecognizedItem(food) {
  return `
    <article class="recognized-item card">
      <div class="item-top">
        <div>
          <h3>${food.name}</h3>
          <p class="caption">${food.weight}g · ${Math.round(food.calories)} 千卡</p>
        </div>
        <button class="small-button" data-action="delete-recognized" data-id="${food.id}">删除</button>
      </div>
      <div class="macro-line">
        <span>蛋白 ${round1(food.protein)}g</span>
        <span>碳水 ${round1(food.carbs)}g</span>
        <span>脂肪 ${round1(food.fat)}g</span>
      </div>
      <div class="macro-line">
        <span>调整份量</span>
        <div class="stepper">
          <button class="small-button" data-action="portion-down" data-id="${food.id}">−</button>
          <strong>${food.weight}g</strong>
          <button class="small-button" data-action="portion-up" data-id="${food.id}">＋</button>
        </div>
      </div>
    </article>
  `;
}

function renderRecords() {
  const dates = [todayKey, shiftKey(-1), shiftKey(-2)];
  const selected = state.selectedDate;

  views.recordsView.innerHTML = `
    <div class="segment-row">
      <button data-action="record-panel" data-panel="records" class="${state.activeRecordPanel === "records" ? "active" : ""}">历史记录</button>
      <button data-action="record-panel" data-panel="analysis" class="${state.activeRecordPanel === "analysis" ? "active" : ""}">营养分析</button>
    </div>
    ${
      state.activeRecordPanel === "records"
        ? `
          <div class="date-strip">
            ${dates
              .map(
                (dateKey) => `
                  <button class="date-chip ${selected === dateKey ? "active" : ""}" data-action="select-date" data-date="${dateKey}">
                    <strong>${formatDisplayDate(dateKey)}</strong><br />
                    <span>${dateKey === todayKey ? "今天" : weekday(dateKey)}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          ${renderRecordSummary(selected)}
          <div class="meal-list">${renderMeals(selected)}</div>
        `
        : renderAnalysis()
    }
  `;
}

function renderRecordSummary(dateKey) {
  const totals = totalsFor(dateKey);
  return `
    <article class="record-summary card">
      <div class="record-top">
        <div>
          <h2>${dateKey === todayKey ? "今日记录" : `${formatDisplayDate(dateKey)}记录`}</h2>
          <p class="caption">${weekday(dateKey)} · 辅助管理饮食，建立稳定习惯</p>
        </div>
        <span class="calories">${totals.calories} 千卡</span>
      </div>
      <div class="summary-grid">
        <div class="summary-cell"><strong>${totals.protein}g</strong><span>蛋白质</span></div>
        <div class="summary-cell"><strong>${totals.carbs}g</strong><span>碳水</span></div>
        <div class="summary-cell"><strong>${totals.fat}g</strong><span>脂肪</span></div>
        <div class="summary-cell"><strong>${Math.round((totals.calories / state.user.targetCalories) * 100) || 0}%</strong><span>目标</span></div>
      </div>
    </article>
  `;
}

function renderAnalysis() {
  const totals = totalsFor(todayKey);
  const target = state.user.targetCalories;
  const heatProgress = clamp((totals.calories / target) * 100, 0, 120);
  const macroCalories = {
    protein: totals.protein * 4,
    carbs: totals.carbs * 4,
    fat: totals.fat * 9,
  };
  const macroTotal = Math.max(1, macroCalories.protein + macroCalories.carbs + macroCalories.fat);
  const proteinPct = Math.round((macroCalories.protein / macroTotal) * 100);
  const carbPct = Math.round((macroCalories.carbs / macroTotal) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbPct);
  const proteinDeg = `${proteinPct * 3.6}deg`;
  const carbDeg = `${(proteinPct + carbPct) * 3.6}deg`;
  const mealData = mealCalories(todayKey);
  const maxMeal = Math.max(1, ...mealData.map((item) => item.value));
  const trend = trendPoints();

  return `
    <section class="analysis-card card">
      <div class="section-title">
        <h2>热量摄入进度</h2>
        <span class="calories">${totals.calories} / ${target}</span>
      </div>
      <div class="progress-bar"><span style="width:${clamp(heatProgress, 0, 100)}%"></span></div>
      <p class="caption" style="margin-top:8px">${heatProgress < 70 ? "今天还有充足空间，晚餐可以注意蛋白质和蔬菜。" : "今天热量接近目标，后续加餐建议以低糖水果或无糖酸奶为主。"}</p>
    </section>

    <section class="analysis-card card">
      <h2>三大营养素比例</h2>
      <div class="donut-row" style="--proteinDeg:${proteinDeg};--carbDeg:${carbDeg}">
        <div class="donut" aria-label="三大营养素比例图"></div>
        <div class="legend">
          <span><i class="dot" style="background:var(--green)"></i>蛋白质 ${proteinPct}%</span>
          <span><i class="dot" style="background:var(--orange)"></i>碳水 ${carbPct}%</span>
          <span><i class="dot" style="background:var(--blue)"></i>脂肪 ${fatPct}%</span>
        </div>
      </div>
    </section>

    <section class="analysis-card card">
      <h2>餐次分布</h2>
      <div class="meal-bars">
        ${mealData
          .map(
            (meal) => `
              <div class="bar-line">
                <span>${meal.label}</span>
                <div class="bar-track"><span style="width:${(meal.value / maxMeal) * 100}%"></span></div>
                <strong>${meal.value}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="analysis-card card">
      <h2>最近 7 天热量趋势</h2>
      <svg class="trend-chart" viewBox="0 0 320 142" role="img" aria-label="最近7天热量趋势">
        <line x1="12" y1="118" x2="308" y2="118" stroke="#e7edf0" />
        <line x1="12" y1="70" x2="308" y2="70" stroke="#eef3f1" />
        <polyline points="${trend.points}" />
        ${trend.circles}
      </svg>
      <div class="insight">${analysisCopy(totals)}</div>
    </section>
  `;
}

function trendPoints() {
  const values = [1580, 1720, 1490, 1810, 1660, totalsFor(shiftKey(-1)).calories, totalsFor(todayKey).calories || 760];
  const min = 1200;
  const max = 1900;
  const points = values
    .map((value, index) => {
      const x = 18 + index * 47;
      const y = 118 - ((value - min) / (max - min)) * 86;
      return `${x},${clamp(y, 22, 118)}`;
    })
    .join(" ");
  const circles = values
    .map((value, index) => {
      const x = 18 + index * 47;
      const y = 118 - ((value - min) / (max - min)) * 86;
      return `<circle cx="${x}" cy="${clamp(y, 22, 118)}" r="4" />`;
    })
    .join("");
  return { points, circles };
}

function analysisCopy(totals) {
  if (totals.calories === 0) {
    return "今天还没有记录。完成一次拍照识别后，我会根据餐次和营养素结构给出更具体的分析。";
  }
  const lines = [];
  if (totals.protein < 55) {
    lines.push("今天蛋白质摄入偏低，晚餐可以增加鱼、蛋、豆制品或低脂奶。");
  } else {
    lines.push("今天蛋白质基础不错，可以继续保持每餐都有优质蛋白。");
  }
  const lunch = mealCalories(todayKey).find((meal) => meal.key === "lunch")?.value || 0;
  if (lunch > totals.calories * 0.48) {
    lines.push("碳水和热量主要集中在午餐，晚餐建议减少精制主食，增加蔬菜体积。");
  } else {
    lines.push("餐次分布比较平稳，晚餐保持七分饱会更利于目标坚持。");
  }
  return lines.join(" ");
}

function renderCoach() {
  const totals = totalsFor(todayKey);
  views.coachView.innerHTML = `
    <section class="coach-layout">
      <div class="coach-summary">
        当前目标：${state.user.goal} · 今日已摄入 ${totals.calories}/${state.user.targetCalories} 千卡 · 偏好：${state.user.preferences.join("、") || "暂无"}
      </div>
      <div class="chat-list">
        ${state.chat
          .map((message) => `<div class="chat-bubble ${message.role === "ai" ? "ai" : "user"}">${message.text}</div>`)
          .join("")}
      </div>
      <div class="quick-questions">
        ${["今天吃得健康吗？", "帮我安排减脂晚餐", "我蛋白质不够怎么办？", "明天早餐吃什么？"]
          .map((question) => `<button data-action="quick-question" data-question="${question}">${question}</button>`)
          .join("")}
      </div>
      <div class="chat-input">
        <input id="chatInput" type="text" placeholder="问问 AI 营养师..." maxlength="80" />
        <button class="primary-button" data-action="send-chat">发送</button>
      </div>
    </section>
  `;
}

function aiReply(question) {
  const totals = totalsFor(todayKey);
  const targetGap = Math.max(0, state.user.targetCalories - totals.calories);
  const dinnerBase =
    state.user.goal === "增肌"
      ? "一份糙米饭或红薯、鸡胸肉或牛肉、两拳蔬菜，再搭配一杯无糖酸奶。"
      : "清蒸鱼或鸡胸肉、两拳绿叶菜、半拳到一拳杂粮主食，再加一份低糖水果。";
  const proteinHint =
    totals.protein < 55
      ? "蛋白质暂时偏少，可以在下一餐补充鱼、蛋、豆腐、低脂奶或鸡胸肉。"
      : "蛋白质摄入已有不错基础，继续保持每餐都有一个优质蛋白来源。";

  if (question.includes("健康")) {
    return `整体看，今天的记录适合继续观察，已摄入约 ${totals.calories} 千卡，距离目标还有 ${targetGap} 千卡左右。${proteinHint} 建议晚餐主食选择全谷物或薯类，蔬菜占到餐盘一半，调味保持清淡。注意这只是辅助饮食管理建议，如果近期身体状态有明显变化，建议咨询专业人士。`;
  }
  if (question.includes("晚餐")) {
    return `按你的${state.user.goal}目标，今晚可以安排：${dinnerBase} 份量上先吃到七分饱，烹调方式优先蒸、煮、少油煎。若晚上还有运动，可以保留一小份主食，避免过度饥饿影响坚持。`;
  }
  if (question.includes("蛋白质")) {
    return `${proteinHint} 比较容易执行的组合是：早餐加一个鸡蛋和无糖酸奶，午餐选择鸡胸肉沙拉或鱼肉饭，晚餐用豆腐、虾仁或鸡蛋补足。每次增加一种就好，不需要一下子把饮食改得很满。`;
  }
  if (question.includes("早餐")) {
    return `明天早餐建议选择高蛋白、稳定饱腹的组合：无糖酸奶燕麦碗加水煮蛋，或全麦三明治搭配牛奶和一份水果。若你想控糖，可以把果酱、甜饮换成坚果和低糖水果，主食控制在一拳左右。`;
  }
  return `我会结合你的${state.user.goal}目标来看：先保证每餐有蛋白质，再让蔬菜占到餐盘一半，主食选择粗细搭配。当前今日摄入约 ${totals.calories} 千卡，建议下一餐避免高油小吃，选择更容易估算份量的家常组合。`;
}

function renderProfile() {
  views.profileView.innerHTML = `
    <section class="profile-card">
      <h2>基础信息</h2>
      <div class="settings-grid">
        ${settingSelect("性别", "gender", ["女", "男"])}
        ${settingInput("年龄", "age", "岁")}
        ${settingInput("身高", "height", "cm")}
        ${settingInput("体重", "weight", "kg")}
        ${settingInput("目标体重", "targetWeight", "kg")}
        ${settingSelect("健康目标", "goal", ["减脂", "增肌", "维持体重", "控糖", "均衡饮食"])}
        ${settingInput("每日目标热量", "targetCalories", "千卡")}
        ${settingSelect("运动频率", "exerciseFrequency", ["几乎不运动", "每周1-2次", "每周3-4次", "每周5次以上"])}
      </div>
    </section>
    <section class="profile-card">
      <h2>饮食偏好</h2>
      <div class="preference-tags">
        ${preferenceOptions
          .map(
            (item) => `<button data-action="toggle-preference" data-value="${item}" class="${state.user.preferences.includes(item) ? "active" : ""}">${item}</button>`,
          )
          .join("")}
      </div>
      <p class="caption" style="margin-top:10px">保存后会影响首页推荐热量和 AI 营养师建议。</p>
    </section>
    <button class="primary-button" style="width:100%" data-action="save-profile">保存设置</button>
  `;
}

function settingInput(label, key, unit) {
  return `
    <div class="settings-row">
      <label for="${key}">${label}</label>
      <div>
        <input id="${key}" data-field="${key}" type="number" value="${state.user[key]}" />
        <span class="caption">${unit}</span>
      </div>
    </div>
  `;
}

function settingSelect(label, key, options) {
  return `
    <div class="settings-row">
      <label for="${key}">${label}</label>
      <select id="${key}" data-field="${key}">
        ${options.map((option) => `<option value="${option}" ${state.user[key] === option ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </div>
  `;
}

function simulateCapture() {
  state.captureStatus = "loading";
  setView("captureView");
  window.setTimeout(() => {
    state.recognizedFoods = baseRecognizedFoods.map((food) => ({ ...food }));
    state.captureStatus = "success";
    render();
    showToast("识别完成，可调整份量");
  }, 900);
}

function adjustPortion(id, direction) {
  state.recognizedFoods = state.recognizedFoods.map((food) => {
    if (food.id !== id) return food;
    const oldWeight = food.weight;
    const newWeight = clamp(oldWeight + direction * 10, 20, 600);
    const ratio = newWeight / oldWeight;
    return {
      ...food,
      weight: newWeight,
      calories: food.calories * ratio,
      protein: food.protein * ratio,
      carbs: food.carbs * ratio,
      fat: food.fat * ratio,
    };
  });
  renderCapture();
}

function confirmFoods() {
  if (!state.recognizedFoods.length) {
    showToast("请至少保留一种食物");
    return;
  }
  const meals = state.records[todayKey] || emptyMeals();
  meals[state.captureMeal].push(
    ...state.recognizedFoods.map((food) =>
      foodRecord(food.name, Math.round(food.weight), Math.round(food.calories), round1(food.protein), round1(food.carbs), round1(food.fat)),
    ),
  );
  state.records[todayKey] = meals;
  state.captureStatus = "idle";
  state.recognizedFoods = [];
  state.selectedDate = todayKey;
  state.chat.push({
    role: "ai",
    text: `已把这次识别加入${mealLabel(state.captureMeal)}。我会在后续建议里结合这几项食物和你的${state.user.goal}目标来判断。`,
  });
  setView("homeView");
  showToast("已加入今日饮食记录");
}

function sumFoods(foods) {
  return foods.reduce(
    (sum, food) => ({
      calories: sum.calories + food.calories,
      protein: sum.protein + food.protein,
      carbs: sum.carbs + food.carbs,
      fat: sum.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function mealLabel(key) {
  return mealTypes.find((meal) => meal.key === key)?.label || "餐次";
}

function saveProfile() {
  document.querySelectorAll("[data-field]").forEach((field) => {
    const key = field.dataset.field;
    const raw = field.value;
    state.user[key] = field.type === "number" ? Number(raw) : raw;
  });
  showToast("设置已保存，推荐和建议已更新");
  render();
}

function openFoodDetail(dateKey, uid) {
  const meals = state.records[dateKey] || emptyMeals();
  const food = mealTypes.flatMap((meal) => meals[meal.key]).find((item) => item.uid === uid);
  if (!food) return;
  modalBody.innerHTML = `
    <p class="caption">${formatDisplayDate(dateKey)} · 估算数据用于辅助饮食管理</p>
    <h3>${food.name}</h3>
    <div class="summary-grid">
      <div class="summary-cell"><strong>${food.weight}g</strong><span>重量</span></div>
      <div class="summary-cell"><strong>${Math.round(food.calories)}</strong><span>千卡</span></div>
      <div class="summary-cell"><strong>${round1(food.protein)}g</strong><span>蛋白</span></div>
      <div class="summary-cell"><strong>${round1(food.carbs)}g</strong><span>碳水</span></div>
    </div>
    <div class="insight">这类食物适合作为日常记录参考。若实际烹调油量较多，可以在记录时适当上调热量估算。</div>
  `;
  detailModal.hidden = false;
}

function cameraIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h4l2-3h4l2 3h4v11H4Z"/><circle cx="12" cy="13.5" r="3.5"/></svg>`;
}

function chartIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-7"/></svg>`;
}

function emptyPlateIcon() {
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="10"/><path d="M10 12v20M14 12v20M10 22h4M52 12v40"/></svg>`;
}

document.querySelector(".app-screen").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  button.classList.add("pressed");
  window.setTimeout(() => button.classList.remove("pressed"), 110);

  const action = button.dataset.action;
  if (button.classList.contains("tab")) {
    setView(button.dataset.target);
    return;
  }
  if (action === "open-capture") {
    state.captureStatus = "idle";
    setView("captureView");
  }
  if (action === "open-analysis") {
    state.activeRecordPanel = "analysis";
    setView("recordsView");
  }
  if (action === "simulate-capture") simulateCapture();
  if (action === "reset-capture") {
    state.captureStatus = "idle";
    state.recognizedFoods = [];
    renderCapture();
  }
  if (action === "portion-up") adjustPortion(button.dataset.id, 1);
  if (action === "portion-down") adjustPortion(button.dataset.id, -1);
  if (action === "delete-recognized") {
    state.recognizedFoods = state.recognizedFoods.filter((food) => food.id !== button.dataset.id);
    renderCapture();
    showToast("已删除该食物");
  }
  if (action === "pick-meal") {
    state.captureMeal = button.dataset.meal;
    renderCapture();
  }
  if (action === "confirm-foods") confirmFoods();
  if (action === "record-panel") {
    state.activeRecordPanel = button.dataset.panel;
    renderRecords();
  }
  if (action === "select-date") {
    state.selectedDate = button.dataset.date;
    renderRecords();
  }
  if (action === "food-detail") openFoodDetail(button.dataset.date, button.dataset.id);
  if (action === "quick-question") {
    const question = button.dataset.question;
    state.chat.push({ role: "user", text: question });
    state.chat.push({ role: "ai", text: aiReply(question) });
    renderCoach();
  }
  if (action === "send-chat") {
    const input = document.querySelector("#chatInput");
    const question = input.value.trim();
    if (!question) {
      showToast("可以先输入一个饮食问题");
      return;
    }
    state.chat.push({ role: "user", text: question });
    state.chat.push({ role: "ai", text: aiReply(question) });
    renderCoach();
  }
  if (action === "toggle-preference") {
    const value = button.dataset.value;
    state.user.preferences = state.user.preferences.includes(value)
      ? state.user.preferences.filter((item) => item !== value)
      : [...state.user.preferences, value];
    renderProfile();
  }
  if (action === "save-profile") saveProfile();
});

document.querySelector("#messageButton").addEventListener("click", () => {
  showToast("暂无新消息，今天也照顾好自己");
});

closeModal.addEventListener("click", () => {
  detailModal.hidden = true;
});

detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) detailModal.hidden = true;
});

render();
