const mealTypes = [
  { key: "breakfast", label: "早餐", short: "早" },
  { key: "lunch", label: "午餐", short: "午" },
  { key: "dinner", label: "晚餐", short: "晚" },
  { key: "snack", label: "加餐", short: "加" },
];

const baseRecognizedFoods = [
  {
    id: "braised-pork-rice",
    name: "红烧肉盖饭",
    weight: 420,
    calories: 680,
    protein: 26,
    carbs: 76,
    fat: 31,
    sodium: 1320,
    fiber: 4.5,
    addedSugar: 8,
    saturatedFat: 10.5,
    riskTags: ["高盐", "精制碳水", "饱和脂肪"],
    suggestion: "酱汁少拌饭，肥肉减半，补一份绿叶菜会更稳。",
  },
  {
    id: "milk-tea",
    name: "珍珠奶茶",
    weight: 350,
    calories: 310,
    protein: 3,
    carbs: 56,
    fat: 7,
    sodium: 160,
    fiber: 0.5,
    addedSugar: 32,
    saturatedFat: 4,
    riskTags: ["添加糖", "精制碳水"],
    suggestion: "三高风险人群建议改成无糖茶、无糖豆浆或少量低糖水果。",
  },
  {
    id: "greens",
    name: "清炒青菜",
    weight: 180,
    calories: 115,
    protein: 5,
    carbs: 12,
    fat: 6,
    sodium: 420,
    fiber: 5.2,
    addedSugar: 0,
    saturatedFat: 0.8,
    riskTags: ["高纤维"],
    suggestion: "蔬菜量不错，后续可以继续保持半盘蔬菜。",
  },
  {
    id: "soy-milk",
    name: "无糖豆浆",
    weight: 250,
    calories: 90,
    protein: 8,
    carbs: 5,
    fat: 4,
    sodium: 80,
    fiber: 1.5,
    addedSugar: 0,
    saturatedFat: 0.6,
    riskTags: ["优质蛋白"],
    suggestion: "作为饮品更适合稳糖控脂，注意选择无糖版本。",
  },
];

const preferenceOptions = ["低盐", "稳糖", "少油", "高纤维", "优质蛋白", "素食", "不吃辣"];
const healthTargetOptions = ["控血压", "稳血糖", "护血脂"];
const riskTagMeta = {
  高盐: { tone: "red", copy: "钠含量偏高，适合少酱料、少腌制菜。" },
  精制碳水: { tone: "yellow", copy: "主食升糖负担偏高，适合换成杂粮或减半。" },
  添加糖: { tone: "red", copy: "添加糖偏多，适合换成无糖饮品或低糖水果。" },
  饱和脂肪: { tone: "red", copy: "饱和脂肪偏多，适合少肥肉、少奶油和油炸。" },
  油炸: { tone: "red", copy: "油炸频次偏高，适合换蒸煮炖或少油煎。" },
  蔬菜不足: { tone: "yellow", copy: "蔬菜量偏少，下一餐补到半盘更稳。" },
  优质蛋白: { tone: "green", copy: "蛋白来源较好，有助于稳定饱腹感。" },
  高纤维: { tone: "green", copy: "膳食纤维较好，有助于餐后更平稳。" },
  低糖水果: { tone: "green", copy: "适合作为加餐，份量仍建议适中。" },
};

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
    goal: "三高食养",
    healthTargets: ["控血压", "稳血糖", "护血脂"],
    preferences: ["低盐", "高纤维", "优质蛋白"],
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
      text: "你好，我是 AI食养专家。我会结合你的控盐、稳糖、护脂目标和饮食记录，给出温和可执行的食养建议。本工具只做饮食管理辅助，不替代医生诊断或用药建议。",
    },
  ],
  records: {
    [todayKey]: emptyMeals(),
    [shiftKey(-1)]: {
      breakfast: [
        foodRecord("燕麦酸奶碗", 300, 356, 17, 48, 10, {
          sodium: 120,
          fiber: 8,
          addedSugar: 4,
          saturatedFat: 2,
          riskTags: ["高纤维", "优质蛋白"],
        }),
        foodRecord("水煮蛋", 50, 72, 6, 1, 5, {
          sodium: 65,
          fiber: 0,
          addedSugar: 0,
          saturatedFat: 1.6,
          riskTags: ["优质蛋白"],
        }),
      ],
      lunch: [
        foodRecord("番茄牛肉饭", 420, 618, 34, 78, 18, {
          sodium: 920,
          fiber: 5,
          addedSugar: 6,
          saturatedFat: 5.5,
          riskTags: ["高盐", "精制碳水", "优质蛋白"],
        }),
      ],
      dinner: [
        foodRecord("清蒸鱼", 160, 205, 31, 2, 7, {
          sodium: 420,
          fiber: 0,
          addedSugar: 0,
          saturatedFat: 1,
          riskTags: ["优质蛋白"],
        }),
        foodRecord("炒青菜", 180, 118, 5, 14, 5, {
          sodium: 360,
          fiber: 5.8,
          addedSugar: 0,
          saturatedFat: 0.6,
          riskTags: ["高纤维"],
        }),
      ],
      snack: [
        foodRecord("苹果", 180, 96, 0.5, 25, 0.3, {
          sodium: 2,
          fiber: 4,
          addedSugar: 0,
          saturatedFat: 0,
          riskTags: ["低糖水果", "高纤维"],
        }),
      ],
    },
    [shiftKey(-2)]: {
      breakfast: [foodRecord("白粥咸菜", 260, 230, 5, 48, 2, {
        sodium: 1120,
        fiber: 1.2,
        addedSugar: 0,
        saturatedFat: 0.4,
        riskTags: ["高盐", "精制碳水"],
      })],
      lunch: [foodRecord("鸡肉藜麦碗", 360, 520, 39, 54, 15, {
        sodium: 540,
        fiber: 8.2,
        addedSugar: 2,
        saturatedFat: 2.4,
        riskTags: ["高纤维", "优质蛋白"],
      })],
      dinner: [foodRecord("豆腐蔬菜汤", 300, 260, 18, 22, 10, {
        sodium: 680,
        fiber: 6,
        addedSugar: 0,
        saturatedFat: 1.2,
        riskTags: ["高纤维", "优质蛋白"],
      })],
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

function foodRecord(name, weight, calories, protein, carbs, fat, extras = {}) {
  return {
    uid: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    weight,
    calories,
    protein,
    carbs,
    fat,
    sodium: extras.sodium || 0,
    fiber: extras.fiber || 0,
    addedSugar: extras.addedSugar || 0,
    saturatedFat: extras.saturatedFat || 0,
    riskTags: extras.riskTags || [],
    suggestion: extras.suggestion || "",
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
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sodium: 0,
    fiber: 0,
    addedSugar: 0,
    saturatedFat: 0,
    foodCount: 0,
    riskTags: {},
  };
  mealTypes.forEach((meal) => {
    meals[meal.key].forEach((food) => {
      totals.calories += food.calories;
      totals.protein += food.protein;
      totals.carbs += food.carbs;
      totals.fat += food.fat;
      totals.sodium += food.sodium || 0;
      totals.fiber += food.fiber || 0;
      totals.addedSugar += food.addedSugar || 0;
      totals.saturatedFat += food.saturatedFat || 0;
      totals.foodCount += 1;
      (food.riskTags || []).forEach((tag) => {
        totals.riskTags[tag] = (totals.riskTags[tag] || 0) + 1;
      });
    });
  });
  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: Math.round(totals.fat),
    sodium: Math.round(totals.sodium),
    fiber: round1(totals.fiber),
    addedSugar: round1(totals.addedSugar),
    saturatedFat: round1(totals.saturatedFat),
    foodCount: totals.foodCount,
    riskTags: totals.riskTags,
  };
}

function dietScores(dateKey = todayKey) {
  const totals = totalsFor(dateKey);
  if (totals.foodCount === 0) {
    return { saltScore: null, glucoseScore: null, lipidScore: null };
  }
  const tags = totals.riskTags;
  const highSalt = tags["高盐"] || 0;
  const refinedCarbs = tags["精制碳水"] || 0;
  const addedSugar = tags["添加糖"] || 0;
  const saturatedFat = tags["饱和脂肪"] || 0;
  const fried = tags["油炸"] || 0;
  return {
    saltScore: clamp(Math.round(100 - Math.max(0, totals.sodium - 700) / 18 - highSalt * 12), 35, 100),
    glucoseScore: clamp(Math.round(100 - totals.addedSugar * 1.2 - refinedCarbs * 12 - addedSugar * 8 + Math.min(totals.fiber * 1.1, 12)), 35, 100),
    lipidScore: clamp(Math.round(100 - totals.saturatedFat * 3.2 - saturatedFat * 10 - fried * 12), 35, 100),
  };
}

function scoreMeta(value) {
  if (value === null) {
    return { label: "待记录", tone: "neutral", copy: "完成一次饮食记录后更新" };
  }
  if (value >= 85) return { label: "稳定", tone: "green", copy: "继续保持当前节奏" };
  if (value >= 70) return { label: "留意", tone: "yellow", copy: "下一餐可以做小调整" };
  return { label: "需调整", tone: "red", copy: "优先减少高风险食物" };
}

function targetSummary() {
  return state.user.healthTargets?.length ? state.user.healthTargets.join("、") : "未选择";
}

function visibleRiskTags(tagCounts) {
  const riskOrder = ["高盐", "添加糖", "精制碳水", "饱和脂肪", "油炸", "蔬菜不足"];
  const positiveOrder = ["优质蛋白", "高纤维", "低糖水果"];
  const risks = riskOrder.filter((tag) => tagCounts[tag]);
  if (risks.length) return risks;
  return positiveOrder.filter((tag) => tagCounts[tag]).slice(0, 3);
}

function tagTone(tag) {
  return riskTagMeta[tag]?.tone || "neutral";
}

function renderRiskTags(tags = []) {
  if (!tags.length) return "";
  return `<div class="risk-tags">${tags.map((tag) => `<span class="risk-tag ${tagTone(tag)}">${tag}</span>`).join("")}</div>`;
}

function foodRiskTone(food) {
  const tags = food.riskTags || [];
  if (tags.some((tag) => tagTone(tag) === "red")) return "red";
  if (tags.some((tag) => tagTone(tag) === "yellow")) return "yellow";
  if (tags.some((tag) => tagTone(tag) === "green")) return "green";
  return "neutral";
}

function foodSuggestion(food) {
  if (food.suggestion) return food.suggestion;
  const tag = (food.riskTags || []).find((item) => riskTagMeta[item]);
  return tag ? riskTagMeta[tag].copy : "这类食物可以作为记录参考，实际建议还要结合烹调方式和份量。";
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
  const scores = dietScores(todayKey);
  const target = state.user.targetCalories;
  const progress = clamp((totals.calories / target) * 100, 0, 100);
  const dateLabel = `${today.getMonth() + 1}月${today.getDate()}日 ${weekday(todayKey)}`;

  views.homeView.innerHTML = `
    <section class="hero">
      <div class="hero-row">
        <div>
          <h2>AI食养专家</h2>
          <p>面向三高和慢病风险人群，帮你把控盐、稳糖、护脂落到每一餐。</p>
        </div>
        <span class="date-pill">${dateLabel}</span>
      </div>
    </section>

    <button class="camera-button" data-action="open-capture">
      ${cameraIcon()}
      <span>拍照识别食养风险</span>
    </button>

    <section class="score-grid" aria-label="今日食养状态">
      ${scoreCard("控盐", scores.saltScore, "salt")}
      ${scoreCard("稳糖", scores.glucoseScore, "glucose")}
      ${scoreCard("护脂", scores.lipidScore, "lipid")}
    </section>

    <section class="metric-grid">
      <article class="metric-card primary">
        <div class="metric-label"><span>今日已摄入热量</span><span>${progress.toFixed(0)}%</span></div>
        <div><span class="metric-value">${totals.calories}</span><span class="metric-unit"> / ${target} 千卡</span></div>
        <div class="mini-progress"><span style="width:${progress}%"></span></div>
      </article>
      ${metricCard("钠估算", totals.sodium, "mg", "red")}
      ${metricCard("膳食纤维", totals.fiber, "g", "green")}
      ${metricCard("添加糖", totals.addedSugar, "g", "orange")}
      ${metricCard("饱和脂肪", totals.saturatedFat, "g", "blue")}
      ${metricCard("蛋白质", totals.protein, "g", "green")}
      ${metricCard("碳水", totals.carbs, "g", "orange")}
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
  const color =
    tone === "orange" ? "var(--orange)" : tone === "blue" ? "var(--blue)" : tone === "red" ? "var(--red)" : "var(--green)";
  return `
    <article class="metric-card">
      <div class="metric-label"><span>${label}</span><span style="color:${color}">●</span></div>
      <div><span class="metric-value">${value}</span><span class="metric-unit"> ${unit}</span></div>
    </article>
  `;
}

function scoreCard(label, value, axis) {
  const meta = scoreMeta(value);
  const display = value === null ? "--" : value;
  const axisCopy = {
    salt: "少盐少酱",
    glucose: "控糖稳主食",
    lipid: "少油护脂",
  }[axis];
  return `
    <article class="score-card ${meta.tone}">
      <div class="score-top">
        <span>${label}</span>
        <strong>${display}</strong>
      </div>
      <div class="score-status">${meta.label}</div>
      <p>${axisCopy} · ${meta.copy}</p>
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
        <p class="empty-copy">点击拍照识别，AI 会帮你估算食物重量、营养数据和高盐高糖高脂风险。</p>
        ${
          includeEmptyCta
            ? `<button class="text-button" data-action="open-capture">去识别食养风险</button>`
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
                <div class="food-meta">${food.weight}g · 钠${Math.round(food.sodium || 0)}mg · 糖${round1(food.addedSugar || 0)}g · 纤维${round1(food.fiber || 0)}g</div>
                ${renderRiskTags(food.riskTags)}
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
          <h2>AI 正在识别食养风险</h2>
          <p class="empty-copy">正在估算份量、钠、添加糖、膳食纤维和脂肪结构，请稍等。</p>
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
            <p class="caption">你可以调整份量，查看高盐、高糖、高脂和优质搭配标签。</p>
          </div>
          <button class="text-button" data-action="reset-capture">重拍</button>
        </div>
        <div class="photo-plate" aria-label="模拟食物照片"></div>
        <div class="recognition-list">
          ${state.recognizedFoods.map(renderRecognizedItem).join("")}
        </div>
        ${captureRiskPanel(total)}
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
            <div class="summary-cell"><strong>${Math.round(total.sodium)}mg</strong><span>钠</span></div>
            <div class="summary-cell"><strong>${round1(total.fiber)}g</strong><span>纤维</span></div>
            <div class="summary-cell"><strong>${round1(total.addedSugar)}g</strong><span>添加糖</span></div>
            <div class="summary-cell"><strong>${round1(total.saturatedFat)}g</strong><span>饱和脂肪</span></div>
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
          <p class="empty-copy">MVP 使用模拟识别结果，演示从拍照到食养风险识别、记录联动和建议生成。</p>
        </div>
      </div>
      <div class="capture-actions">
        <button class="primary-button" data-action="simulate-capture">拍摄照片</button>
        <button class="secondary-button" data-action="simulate-capture">从相册选择</button>
      </div>
      <p class="caption" style="margin-top:12px">建议拍清楚主食、酱料、饮品、蛋白质来源和配菜，风险判断会更完整。</p>
    </section>
  `;
}

function captureRiskPanel(total) {
  const tagCounts = state.recognizedFoods.reduce((counts, food) => {
    (food.riskTags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
    return counts;
  }, {});
  const tags = visibleRiskTags(tagCounts);
  const copy = tags.length
    ? tags.map((tag) => riskTagMeta[tag]?.copy).filter(Boolean).join(" ")
    : "这次识别没有明显高风险标签，继续关注份量和烹调油盐即可。";
  return `
    <article class="risk-panel">
      <div class="record-top">
        <strong>食养提示</strong>
        <span>${Math.round(total.calories)} 千卡</span>
      </div>
      ${renderRiskTags(tags)}
      <p>${copy}</p>
    </article>
  `;
}

function renderRecognizedItem(food) {
  const tone = foodRiskTone(food);
  const label = { red: "需调整", yellow: "留意", green: "推荐", neutral: "参考" }[tone];
  return `
    <article class="recognized-item card">
      <div class="item-top">
        <div>
          <h3>${food.name}</h3>
          <p class="caption">${food.weight}g · ${Math.round(food.calories)} 千卡 · 钠${Math.round(food.sodium || 0)}mg</p>
        </div>
        <div class="recognized-actions">
          <span class="risk-pill ${tone}">${label}</span>
          <button class="small-button" data-action="delete-recognized" data-id="${food.id}">删除</button>
        </div>
      </div>
      ${renderRiskTags(food.riskTags)}
      <p class="food-tip">${foodSuggestion(food)}</p>
      <div class="macro-line">
        <span>蛋白 ${round1(food.protein)}g</span>
        <span>碳水 ${round1(food.carbs)}g</span>
        <span>脂肪 ${round1(food.fat)}g</span>
      </div>
      <div class="macro-line">
        <span>添加糖 ${round1(food.addedSugar || 0)}g</span>
        <span>纤维 ${round1(food.fiber || 0)}g</span>
        <span>饱和脂肪 ${round1(food.saturatedFat || 0)}g</span>
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
      <button data-action="record-panel" data-panel="analysis" class="${state.activeRecordPanel === "analysis" ? "active" : ""}">食养分析</button>
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
  const scores = dietScores(dateKey);
  return `
    <article class="record-summary card">
      <div class="record-top">
        <div>
          <h2>${dateKey === todayKey ? "今日记录" : `${formatDisplayDate(dateKey)}记录`}</h2>
          <p class="caption">${weekday(dateKey)} · 目标：${targetSummary()}</p>
        </div>
        <span class="calories">${totals.calories} 千卡</span>
      </div>
      <div class="summary-grid">
        <div class="summary-cell"><strong>${scores.saltScore ?? "--"}</strong><span>控盐</span></div>
        <div class="summary-cell"><strong>${scores.glucoseScore ?? "--"}</strong><span>稳糖</span></div>
        <div class="summary-cell"><strong>${scores.lipidScore ?? "--"}</strong><span>护脂</span></div>
        <div class="summary-cell"><strong>${totals.foodCount}</strong><span>食物</span></div>
      </div>
    </article>
  `;
}

function renderAnalysis() {
  const totals = totalsFor(todayKey);
  const scores = dietScores(todayKey);
  const tags = visibleRiskTags(totals.riskTags);
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
        <h2>今日食养状态</h2>
        <span class="caption">${targetSummary()}</span>
      </div>
      <div class="compact-score-grid">
        ${scoreCard("控盐", scores.saltScore, "salt")}
        ${scoreCard("稳糖", scores.glucoseScore, "glucose")}
        ${scoreCard("护脂", scores.lipidScore, "lipid")}
      </div>
      ${renderRiskTags(tags)}
      <p class="caption" style="margin-top:8px">分数用于饮食管理提示，不代表疾病诊断或治疗效果。</p>
    </section>

    <section class="analysis-card card">
      <div class="section-title">
        <h2>热量摄入进度</h2>
        <span class="calories">${totals.calories} / ${target}</span>
      </div>
      <div class="progress-bar"><span style="width:${clamp(heatProgress, 0, 100)}%"></span></div>
      <p class="caption" style="margin-top:8px">${heatProgress < 70 ? "今天还有记录空间，下一餐优先补蔬菜和优质蛋白。" : "今天热量接近目标，后续加餐建议以无糖饮品、低糖水果或少量坚果为主。"}</p>
    </section>

    <section class="analysis-card card">
      <h2>三高关注指标</h2>
      <div class="meal-bars nutrient-bars">
        ${nutrientBar("钠估算", totals.sodium, "mg", 2200, "red")}
        ${nutrientBar("添加糖", totals.addedSugar, "g", 40, "orange")}
        ${nutrientBar("饱和脂肪", totals.saturatedFat, "g", 22, "yellow")}
        ${nutrientBar("膳食纤维", totals.fiber, "g", 25, "green")}
      </div>
      <p class="caption" style="margin-top:8px">这里用于提示饮食结构趋势，真实摄入会受食材、调味和份量影响。</p>
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

function nutrientBar(label, value, unit, guide, tone) {
  const width = clamp((value / guide) * 100, 0, 100);
  return `
    <div class="bar-line nutrient ${tone}">
      <span>${label}</span>
      <div class="bar-track"><span style="width:${width}%"></span></div>
      <strong>${round1(value)}${unit}</strong>
    </div>
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
    return "今天还没有记录。完成一次拍照识别后，我会根据控盐、稳糖、护脂目标给出更具体的分析。";
  }
  const lines = [];
  if ((totals.riskTags["高盐"] || 0) > 0) {
    lines.push("今天出现高盐标签，下一餐优先选择少酱料、少腌制菜、汤汁少喝。");
  } else {
    lines.push("今天控盐表现较稳，继续保持少酱料和清淡烹调。");
  }
  if ((totals.riskTags["添加糖"] || 0) > 0 || totals.addedSugar > 20) {
    lines.push("含糖饮品或甜食会增加稳糖压力，可以换成无糖茶、无糖豆浆或白水。");
  } else {
    lines.push("添加糖负担不高，主食可以继续粗细搭配、控制份量。");
  }
  if ((totals.riskTags["饱和脂肪"] || 0) > 0 || totals.saturatedFat > 12) {
    lines.push("护脂方面建议少肥肉、少油炸，优先鱼虾、豆制品、去皮禽肉。");
  } else {
    lines.push("脂肪结构目前较平稳，继续把蔬菜和优质蛋白放在餐盘核心位置。");
  }
  return lines.join(" ");
}

function renderCoach() {
  const totals = totalsFor(todayKey);
  const scores = dietScores(todayKey);
  views.coachView.innerHTML = `
    <section class="coach-layout">
      <div class="coach-summary">
        食养目标：${targetSummary()} · 今日 ${totals.calories}/${state.user.targetCalories} 千卡 · 控盐 ${scores.saltScore ?? "--"} · 稳糖 ${scores.glucoseScore ?? "--"} · 护脂 ${scores.lipidScore ?? "--"}
      </div>
      <div class="chat-list">
        ${state.chat
          .map((message) => `<div class="chat-bubble ${message.role === "ai" ? "ai" : "user"}">${message.text}</div>`)
          .join("")}
      </div>
      <div class="quick-questions">
        ${["今天三高风险高吗？", "外卖怎么点更适合三高？", "今晚吃什么更稳？", "早餐如何稳糖？", "火锅怎么吃？"]
          .map((question) => `<button data-action="quick-question" data-question="${question}">${question}</button>`)
          .join("")}
      </div>
      <div class="chat-input">
        <input id="chatInput" type="text" placeholder="问问 AI食养专家..." maxlength="80" />
        <button class="primary-button" data-action="send-chat">发送</button>
      </div>
    </section>
  `;
}

function aiReply(question) {
  const totals = totalsFor(todayKey);
  const scores = dietScores(todayKey);
  const targetGap = Math.max(0, state.user.targetCalories - totals.calories);
  const safetyNote = "以上是饮食管理建议，不用于诊断或替代医生；如果指标明显异常、身体不适或涉及用药调整，请及时咨询医生。";
  const safetyKeywords = ["停药", "换药", "药量", "胰岛素", "降压药", "降糖药", "他汀", "胸痛", "呼吸困难", "昏厥", "晕倒", "低血糖", "血糖很高", "血压很高", "并发症", "肾病", "心衰", "怀孕", "妊娠", "化验单", "报告单", "指标异常"];
  if (safetyKeywords.some((keyword) => question.includes(keyword))) {
    return `这个问题已经涉及医疗判断或用药安全，我不能替你判断病情或调整药物。你可以先记录最近饮食、血压/血糖/血脂指标和不适症状，尽快带给医生或营养专业人士评估。饮食上先保持清淡、规律进餐、避免酒精和含糖饮品。`;
  }

  if (question.includes("外卖")) {
    return `外卖可以按“三步”选：第一，主菜选清蒸鱼、鸡胸、牛肉、豆腐或虾仁，避开油炸和肥肉；第二，米饭先吃半份或换杂粮饭，额外加一份绿叶菜；第三，酱料分开放，奶茶甜饮换无糖茶或水。当前还可安排约 ${targetGap} 千卡。${safetyNote}`;
  }
  if (question.includes("晚") || question.includes("今晚")) {
    return `今晚建议用“半盘蔬菜 + 一掌心优质蛋白 + 半拳到一拳杂粮主食”的组合。适合选清蒸鱼、豆腐蔬菜汤、去皮鸡肉或虾仁，调味少盐少酱，汤汁少喝；如果今天添加糖或饱和脂肪偏高，晚餐就不再安排甜饮和肥肉。${safetyNote}`;
  }
  if (question.includes("早餐") || question.includes("稳糖")) {
    return `稳糖早餐尽量避免“白粥配咸菜”单独吃。更稳的组合是无糖豆浆或低脂奶 + 水煮蛋/豆腐/鸡胸肉 + 燕麦、全麦面包或杂粮馒头半到一份，再加一小份低糖水果或蔬菜。${safetyNote}`;
  }
  if (question.includes("火锅")) {
    return `火锅可以吃，但建议选清汤锅或番茄锅，少喝汤；优先点绿叶菜、菌菇、豆腐、鱼虾、瘦肉，少选肥牛肥羊、丸子、午餐肉和油炸小吃；蘸料用葱蒜醋香菜打底，少麻酱少沙茶，主食只留小份。${safetyNote}`;
  }
  if (question.includes("风险") || question.includes("健康") || question.includes("今天")) {
    const tags = visibleRiskTags(totals.riskTags);
    const tagCopy = tags.length ? `今天需要留意：${tags.join("、")}。` : "今天暂时没有明显高风险标签。";
    return `今天已记录 ${totals.foodCount} 项食物，控盐 ${scores.saltScore ?? "--"}、稳糖 ${scores.glucoseScore ?? "--"}、护脂 ${scores.lipidScore ?? "--"}。${tagCopy} 下一餐优先少盐少酱、补半盘蔬菜，主食粗细搭配。${safetyNote}`;
  }
  return `我会按 ${targetSummary()} 来看你的饮食：先减少高盐酱料、含糖饮品、油炸和肥肉，再保证每餐有蔬菜和优质蛋白。当前今日摄入约 ${totals.calories} 千卡，下一餐建议选择清淡家常组合，份量保持七分饱。${safetyNote}`;
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
        ${settingSelect("健康目标", "goal", ["三高食养", "控压优先", "稳糖优先", "护脂优先", "均衡饮食"])}
        ${settingInput("每日目标热量", "targetCalories", "千卡")}
        ${settingSelect("运动频率", "exerciseFrequency", ["几乎不运动", "每周1-2次", "每周3-4次", "每周5次以上"])}
      </div>
    </section>
    <section class="profile-card">
      <h2>食养目标</h2>
      <div class="preference-tags">
        ${healthTargetOptions
          .map(
            (item) => `<button data-action="toggle-health-target" data-value="${item}" class="${state.user.healthTargets.includes(item) ? "active" : ""}">${item}</button>`,
          )
          .join("")}
      </div>
      <p class="caption" style="margin-top:10px">可多选。AI 会围绕控盐、稳糖和护脂给出更具体的餐食替换建议。</p>
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
      <p class="caption" style="margin-top:10px">保存后会影响首页评分和 AI食养专家建议。</p>
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
    showToast("识别完成，已生成食养标签");
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
      sodium: (food.sodium || 0) * ratio,
      fiber: (food.fiber || 0) * ratio,
      addedSugar: (food.addedSugar || 0) * ratio,
      saturatedFat: (food.saturatedFat || 0) * ratio,
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
      foodRecord(food.name, Math.round(food.weight), Math.round(food.calories), round1(food.protein), round1(food.carbs), round1(food.fat), {
        sodium: Math.round(food.sodium || 0),
        fiber: round1(food.fiber || 0),
        addedSugar: round1(food.addedSugar || 0),
        saturatedFat: round1(food.saturatedFat || 0),
        riskTags: food.riskTags || [],
        suggestion: food.suggestion || "",
      }),
    ),
  );
  state.records[todayKey] = meals;
  state.captureStatus = "idle";
  state.recognizedFoods = [];
  state.selectedDate = todayKey;
  state.chat.push({
    role: "ai",
    text: `已把这次识别加入${mealLabel(state.captureMeal)}。我会在后续建议里结合高盐、添加糖、饱和脂肪和膳食纤维标签来判断。`,
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
      sodium: sum.sodium + (food.sodium || 0),
      fiber: sum.fiber + (food.fiber || 0),
      addedSugar: sum.addedSugar + (food.addedSugar || 0),
      saturatedFat: sum.saturatedFat + (food.saturatedFat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, fiber: 0, addedSugar: 0, saturatedFat: 0 },
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
      <div class="summary-cell"><strong>${Math.round(food.sodium || 0)}mg</strong><span>钠</span></div>
      <div class="summary-cell"><strong>${round1(food.addedSugar || 0)}g</strong><span>添加糖</span></div>
    </div>
    ${renderRiskTags(food.riskTags)}
    <div class="insight">${foodSuggestion(food)}</div>
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
  if (action === "toggle-health-target") {
    const value = button.dataset.value;
    state.user.healthTargets = state.user.healthTargets.includes(value)
      ? state.user.healthTargets.filter((item) => item !== value)
      : [...state.user.healthTargets, value];
    renderProfile();
  }
  if (action === "save-profile") saveProfile();
});

document.querySelector("#messageButton").addEventListener("click", () => {
  showToast("暂无新消息，今天也好好吃饭");
});

closeModal.addEventListener("click", () => {
  detailModal.hidden = true;
});

detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) detailModal.hidden = true;
});

render();
