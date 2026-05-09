const accordOptions = ["花香", "木质", "柑橘", "茶香", "东方", "馥奇", "美食调"];
const sceneOptions = ["日常通勤", "约会", "办公", "晚宴", "运动后", "睡前"];
const seasonOptions = ["春夏", "秋冬", "四季"];
const concentrationOptions = ["古龙水", "淡香水", "浓香水", "香精"];
const diffusionOptions = ["贴肤", "适中", "明显"];
const longevityOptions = ["3-4小时", "5-7小时", "8小时以上"];
const budgetOptions = ["入门", "中等", "高级"];
const layerOptions = ["前调", "中调", "后调", "精油"];
const aromaFilterOptions = ["全部", "柑橘", "花香", "木质", "茶感", "草本", "树脂", "甜暖", "精油"];
const stockFilterOptions = ["全部", "充足", "低库存"];
const oilUsageOptions = ["扩香", "按摩油", "滚珠香氛", "浴盐/泡澡", "空间喷雾"];
const oilGoalOptions = ["清新提振", "睡前仪式", "专注氛围", "舒缓放松", "洁净空间", "温暖护理"];
const oilCarrierOptions = ["甜杏仁油", "荷荷巴油", "葡萄籽油", "无水酒精", "扩香石/扩香仪"];
const oilDilutionOptions = ["0.5% 温和", "1% 日常", "2% 局部", "仅空间扩香"];

const perfumeTemplates = {
  花香: {
    title: "晨露白花",
    visualColor: "#e97fa9",
    topPool: ["佛手柑", "梨", "粉红胡椒", "柠檬叶", "荔枝"],
    heartPool: ["茉莉", "橙花", "铃兰", "小苍兰", "玫瑰"],
    basePool: ["白麝香", "雪松", "安息香", "鸢尾", "麝香木"],
    ratios: [28, 45, 27],
    mood: "干净、柔软、带一点清晨露水感",
  },
  木质: {
    title: "雨后雪松",
    visualColor: "#8f7a5f",
    topPool: ["葡萄柚", "黑胡椒", "小豆蔻", "杜松子", "香柠檬"],
    heartPool: ["鼠尾草", "鸢尾", "茶叶", "柏木叶", "薰衣草"],
    basePool: ["雪松", "檀香", "岩兰草", "广藿香", "龙涎香"],
    ratios: [22, 33, 45],
    mood: "清冷、稳定、适合做有质感的日常签名香",
  },
  柑橘: {
    title: "青柚气泡",
    visualColor: "#f0a43a",
    topPool: ["青柠", "葡萄柚", "橙皮", "柚子", "香柠檬"],
    heartPool: ["橙花", "迷迭香", "绿茶", "罗勒", "小苍兰"],
    basePool: ["白麝香", "龙涎香", "雪松", "琥珀木", "轻麝香"],
    ratios: [45, 30, 25],
    mood: "明亮、轻快、像刚打开的冰镇柑橘汽水",
  },
  茶香: {
    title: "白茶书页",
    visualColor: "#71a58a",
    topPool: ["佛手柑", "柠檬叶", "小苍兰", "绿橘", "薄荷叶"],
    heartPool: ["白茶", "鸢尾", "茉莉茶", "龙井", "鼠尾草"],
    basePool: ["白麝香", "雪松", "琥珀", "纸莎草", "麝香木"],
    ratios: [30, 42, 28],
    mood: "安静、清透、适合办公室和低存在感场景",
  },
  东方: {
    title: "琥珀夜色",
    visualColor: "#b66b46",
    topPool: ["香柠檬", "肉桂", "藏红花", "粉红胡椒", "苦橙"],
    heartPool: ["玫瑰", "乳香", "没药", "鸢尾", "可可"],
    basePool: ["琥珀", "香草", "广藿香", "零陵香豆", "檀香"],
    ratios: [18, 34, 48],
    mood: "温暖、饱满、适合秋冬或晚间场合",
  },
  馥奇: {
    title: "绿意理发室",
    visualColor: "#4f8b6a",
    topPool: ["薰衣草", "柠檬", "罗勒", "香柠檬", "薄荷"],
    heartPool: ["天竺葵", "橡木苔", "鼠尾草", "迷迭香", "苦橙叶"],
    basePool: ["香豆素", "广藿香", "雪松", "岩兰草", "麝香"],
    ratios: [32, 36, 32],
    mood: "清洁、草本、带一点复古男香轮廓",
  },
  美食调: {
    title: "烤梨奶油",
    visualColor: "#d99a57",
    topPool: ["梨", "杏仁", "柠檬皮", "椰子水", "苹果"],
    heartPool: ["鸢尾", "牛奶", "桂花", "可可", "蜂蜜"],
    basePool: ["香草", "零陵香豆", "檀香", "琥珀", "麝香"],
    ratios: [24, 38, 38],
    mood: "柔软、甜暖、适合做亲近感强的冬日香气",
  },
};

const essentialOilTemplates = {
  清新提振: { title: "晨间清醒", visualColor: "#7abf83", oilPool: ["甜橙", "葡萄柚", "迷迭香", "薄荷", "柠檬"], ratios: [40, 35, 25], note: "适合早晨或办公前使用，重点是营造清新明亮的空间感。" },
  睡前仪式: { title: "晚安柔雾", visualColor: "#7a86c6", oilPool: ["真正薰衣草", "甜橙", "岩兰草", "雪松", "罗马洋甘菊"], ratios: [25, 45, 30], note: "用于睡前仪式感和放松氛围，不替代任何睡眠或健康建议。" },
  专注氛围: { title: "书桌绿意", visualColor: "#4f9b82", oilPool: ["迷迭香", "柠檬", "罗勒", "乳香", "雪松"], ratios: [35, 40, 25], note: "适合工作台或阅读场景，强调清晰、干净、不厚重的氛围。" },
  舒缓放松: { title: "柔风护理", visualColor: "#b28ac0", oilPool: ["薰衣草", "天竺葵", "甜橙", "乳香", "檀香"], ratios: [25, 38, 37], note: "适合低强度护理场景，建议从温和浓度开始。" },
  洁净空间: { title: "森林空气", visualColor: "#5d9f7a", oilPool: ["茶树", "尤加利", "柠檬", "松针", "雪松"], ratios: [36, 34, 30], note: "适合空间清新和气味管理，不夸大净化能力或健康承诺。" },
  温暖护理: { title: "橙花暖毯", visualColor: "#c48957", oilPool: ["甜橙", "乳香", "檀香", "天竺葵", "安息香"], ratios: [28, 34, 38], note: "适合秋冬护理仪式，注意低浓度和小范围试用。" },
};

const builtInMaterials = [
  material("m-bergamot", "佛手柑", "香精原料", "前调", "Firmenich", "意大利卡拉布里亚", "B-2403", "10ml", 6.5, "ml", "充足", "柑橘", ["柑橘", "清新", "明亮"], "明亮带苦感的柑橘开场，适合茶香、花香和馥奇结构。", "可与白茶、橙花、雪松搭配，提亮前调。", "builtIn"),
  material("m-grapefruit", "葡萄柚", "香精原料", "前调", "IFF", "美国佛罗里达", "G-1188", "10ml", 2.1, "ml", "低库存", "柑橘", ["柑橘", "微苦", "气泡感"], "清亮微苦，适合做现代柑橘和木质香的第一印象。", "适合与黑胡椒、雪松、龙涎香搭配。", "builtIn"),
  material("m-pink-pepper", "粉红胡椒", "香精原料", "前调", "Givaudan", "马达加斯加", "P-0912", "5ml", 4.8, "ml", "充足", "辛香", ["辛香", "轻盈", "微果感"], "轻快的辛香扩散材料，可以让花香和柑橘更有跳跃感。", "少量加入梨、玫瑰或香柠檬中。", "builtIn"),
  material("m-white-tea", "白茶", "香精原料", "中调", "Symrise", "中国福建", "T-2210", "10ml", 8.2, "ml", "充足", "茶感", ["茶感", "透明", "干净"], "透明、柔和、低甜度的茶感中调，适合办公室和日常香气。", "可与佛手柑、鸢尾、白麝香构成清透骨架。", "builtIn"),
  material("m-jasmine", "茉莉", "香精原料", "中调", "Robertet", "埃及", "J-0873", "5ml", 3.4, "ml", "充足", "花香", ["白花", "柔软", "扩散"], "经典白花主体，能够增加配方的圆润度和存在感。", "适合与橙花、梨、白麝香搭配。", "builtIn"),
  material("m-orris", "鸢尾", "香精原料", "中调", "Mane", "法国格拉斯", "O-5321", "3ml", 1.4, "ml", "低库存", "粉感", ["粉感", "柔雾", "高级感"], "带粉质和根茎感，适合让茶香、花香和木质结构更细腻。", "用量克制，搭配白茶、雪松或檀香。", "builtIn"),
  material("m-cedar", "雪松", "香精原料", "后调", "IFF", "美国弗吉尼亚", "C-2201", "15ml", 11, "ml", "充足", "木质", ["木质", "干燥", "定香"], "干燥、干净、稳定的木质骨架，是日常香和茶香常用尾调。", "适合与白麝香、佛手柑、茶叶搭配。", "builtIn"),
  material("m-sandalwood", "檀香", "香精原料", "后调", "Takasago", "澳大利亚", "S-6720", "10ml", 5.5, "ml", "充足", "木质", ["奶感", "木质", "温暖"], "柔滑温暖的木质尾调，适合增加亲近感和留香厚度。", "适合东方调、美食调和温暖护理方向。", "builtIn"),
  material("m-white-musk", "白麝香", "香精原料", "后调", "Givaudan", "瑞士", "M-0188", "15ml", 9.8, "ml", "充足", "麝香", ["干净", "柔软", "贴肤"], "干净贴肤的收束材料，适合让尾调更柔和。", "可与茶香、白花、柑橘和雪松搭配。", "builtIn"),
  material("m-lavender-oil", "真正薰衣草", "精油", "精油", "Florihana", "法国普罗旺斯", "EO-103", "10ml", 7.5, "ml", "充足", "草本", ["草本", "柔和", "睡前仪式"], "经典草本花香精油，适合营造睡前和放松氛围。", "可与甜橙、雪松、罗马洋甘菊搭配。", "builtIn"),
  material("m-sweet-orange", "甜橙", "精油", "精油", "doTERRA", "巴西", "EO-208", "15ml", 12, "ml", "充足", "柑橘", ["明亮", "甜感", "空间"], "亲和、明亮、甜润的柑橘精油，适合空间扩香和护理仪式。", "可与薰衣草、乳香、雪松搭配。", "builtIn"),
  material("m-rosemary", "迷迭香", "精油", "精油", "Pranarom", "摩洛哥", "EO-330", "10ml", 2.4, "ml", "低库存", "草本", ["草本", "清醒", "专注"], "清晰有草本轮廓，适合营造工作台和阅读场景。", "可与柠檬、罗勒、雪松搭配。", "builtIn"),
];

const importMockMaterials = [
  material("import-neroli", "橙花精油", "精油", "精油", "Natura Labs", "突尼斯", "OCR-014", "5ml", 3.2, "ml", "充足", "花香", ["白花", "柔和", "护理"], "柔和白花和微苦绿意，适合滚珠香氛与睡前仪式。", "可与甜橙、薰衣草、荷荷巴油搭配。", "photoImport"),
  material("import-amber", "琥珀木", "香精原料", "后调", "AromaTech", "瑞士", "OCR-117", "10ml", 1.8, "ml", "低库存", "树脂", ["温暖", "木质", "定香"], "干净温暖的琥珀木质感，适合增强尾调稳定度。", "可与雪松、香草、粉红胡椒搭配。", "photoImport"),
  material("import-green-tea", "绿茶香基", "香精原料", "中调", "Local Blend", "中国杭州", "OCR-221", "10ml", 6, "ml", "充足", "茶感", ["茶感", "清透", "微涩"], "带清透茶叶和微涩感，适合茶香与柑橘结构。", "可与佛手柑、白麝香、柠檬叶搭配。", "photoImport"),
];

const state = {
  productMode: "perfume",
  activeView: "homeView",
  selectedAccord: "茶香",
  selectedScene: "日常通勤",
  selectedSeason: "春夏",
  selectedConcentration: "淡香水",
  selectedDiffusion: "适中",
  selectedLongevity: "5-7小时",
  selectedBudget: "中等",
  avoidNotes: "动物感、过甜香草",
  selectedOilUsage: "扩香",
  selectedOilGoal: "睡前仪式",
  selectedOilCarrier: "扩香石/扩香仪",
  selectedOilDilution: "仅空间扩香",
  oilSafetyNote: "孕期、婴幼儿、宠物环境和敏感人群需先咨询专业人士；皮肤使用前先做局部测试。",
  intensity: 58,
  variationSeed: 0,
  currentFormula: null,
  materialsInventory: [...builtInMaterials],
  libraryFilters: { aroma: "全部", stock: "全部", layer: "全部" },
  drawer: { open: false, layer: "top", tab: "library", amount: 10 },
  customMaterial: { name: "", aromaProfile: "", recommendedLayer: "前调", intro: "", sync: true },
  importStatus: "idle",
  pendingImportedMaterials: [],
  formulaHistory: [],
  profile: {
    name: "香气探索者",
    experience: "入门",
    favoriteAccord: "茶香",
    preferredConcentration: "淡香水",
    budget: "中等",
    avoidNotes: "动物感、过甜香草",
  },
  chat: [
    {
      role: "ai",
      text: "你好，我是 AI 调香师。你可以问我香水结构、精油搭配、原料库存、留香扩散和合规表达，我会结合当前工作台给出建议。",
    },
  ],
};

state.formulaHistory = [
  createSeedFormula({
    mode: "perfume",
    name: "雨后雪松 V1",
    version: 1,
    date: "2026-05-07",
    accord: "木质",
    scene: "办公",
    concentration: "淡香水",
    intensity: 62,
    top: refs(["葡萄柚", "黑胡椒", "小豆蔻"]),
    heart: refs(["鼠尾草", "鸢尾", "白茶"]),
    base: refs(["雪松", "檀香", "白麝香"]),
    ratios: [22, 33, 45],
    diffusion: "贴肤",
    longevity: "5-7小时",
    note: "木质基底安静稳重，适合低打扰场景。",
    aiComment: "如果想更有现代感，可以增加一点葡萄柚亮度。",
    visualColor: "#8f7a5f",
  }),
  createSeedFormula({
    mode: "essentialOil",
    name: "晚安柔雾 V1",
    version: 1,
    date: "2026-05-05",
    scene: "睡前",
    intensity: 42,
    experienceGoal: "睡前仪式",
    usageMethod: "扩香",
    carrier: "扩香石/扩香仪",
    oilBlend: ratioRefs([{ name: "真正薰衣草", ratio: 45 }, { name: "甜橙", ratio: 30 }, { name: "雪松", ratio: 25 }]),
    dilutionHint: "仅空间扩香",
    safetyNote: "保持通风，宠物和婴幼儿环境谨慎使用。",
    note: "用于睡前仪式感和放松氛围，不替代任何睡眠或健康建议。",
    aiComment: "整体柔和，适合低强度扩香；如果觉得甜，可以减少甜橙。",
    visualColor: "#7a86c6",
  }),
];

const views = {
  homeView: document.querySelector("#homeView"),
  recordsView: document.querySelector("#recordsView"),
  coachView: document.querySelector("#coachView"),
  profileView: document.querySelector("#profileView"),
};

const screenTitle = document.querySelector("#screenTitle");
const toast = document.querySelector("#toast");
const detailModal = document.querySelector("#detailModal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

function material(id, name, category, recommendedLayer, manufacturer, origin, batch, spec, remainingAmount, unit, stockStatus, aromaProfile, tags, intro, pairingTips, source) {
  return { id, name, category, recommendedLayer, manufacturer, origin, batch, spec, remainingAmount, unit, stockStatus, aromaProfile, tags, intro, pairingTips, source };
}

function refs(names) {
  return names.map((name) => materialRef(name));
}

function ratioRefs(items) {
  return items.map((item) => ({ ...materialRef(item.name), ratio: item.ratio }));
}

function materialRef(name, ratio) {
  const found = state?.materialsInventory?.find((item) => item.name === name);
  return { name, materialId: found?.id, ratio };
}

function names(items) {
  return (items || []).map((item) => (typeof item === "string" ? item : item.name));
}

function createSeedFormula(record) {
  return {
    id: `r-${record.date}-${record.name}`,
    materials: record.mode === "perfume" ? [...names(record.top), ...names(record.heart), ...names(record.base)] : names(record.oilBlend),
    ...record,
  };
}

function todayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.target === viewId));
  screenTitle.textContent = views[viewId].dataset.title;
  render();
}

function render() {
  renderHome();
  renderMaterialLibrary();
  renderCoach();
  renderProfile();
}

function currentPerfumeTemplate() {
  return perfumeTemplates[state.selectedAccord] || perfumeTemplates.茶香;
}

function currentOilTemplate() {
  return essentialOilTemplates[state.selectedOilGoal] || essentialOilTemplates.睡前仪式;
}

function pickFromPool(pool, count, seed) {
  const available = pool.filter((name) => {
    const materialItem = state.materialsInventory.find((item) => item.name === name);
    return !materialItem || materialItem.stockStatus !== "低库存" || count > 2;
  });
  const source = available.length >= count ? available : pool;
  const picked = [];
  for (let i = 0; i < count; i += 1) {
    picked.push(source[(seed + i * 2) % source.length]);
  }
  return picked;
}

function adjustedRatios(baseRatios, seed = 0) {
  const baseBoost = state.intensity > 70 ? 6 : state.intensity < 42 ? -5 : 0;
  const topBoost = state.selectedSeason === "春夏" ? 4 : state.selectedSeason === "秋冬" ? -3 : 0;
  const swing = (seed % 5) - 2;
  let top = Math.max(14, baseRatios[0] + topBoost - baseBoost / 2 + swing);
  let base = Math.max(18, baseRatios[2] + baseBoost - swing);
  let heart = 100 - top - base;
  if (heart < 25) {
    heart = 25;
    base = 100 - top - heart;
  }
  return [Math.round(top), Math.round(heart), Math.round(base)];
}

function createFormulaVariation(baseTemplate) {
  const seed = state.variationSeed;
  const version = seed + 1;
  if (state.productMode === "essentialOil") {
    const oilNames = pickFromPool(baseTemplate.oilPool, 3, seed + state.selectedOilUsage.length);
    const ratios = adjustedRatios(baseTemplate.ratios, seed).sort((a, b) => b - a);
    const oilBlend = oilNames.map((name, index) => materialRef(name, ratios[index]));
    return {
      id: `f-${Date.now()}-${seed}`,
      version,
      mode: "essentialOil",
      name: `${baseTemplate.title} V${version}`,
      date: todayKey(),
      scene: state.selectedOilGoal,
      intensity: state.intensity,
      experienceGoal: state.selectedOilGoal,
      usageMethod: state.selectedOilUsage,
      carrier: state.selectedOilCarrier,
      oilBlend,
      dilutionHint: state.selectedOilDilution,
      safetyNote: state.oilSafetyNote,
      materials: names(oilBlend),
      visualColor: baseTemplate.visualColor,
      note: baseTemplate.note,
      aiComment: oilPrediction(state, oilBlend),
    };
  }

  const ratios = adjustedRatios(baseTemplate.ratios, seed);
  const top = refs(pickFromPool(baseTemplate.topPool, 3, seed + state.selectedScene.length));
  const heart = refs(pickFromPool(baseTemplate.heartPool, 3, seed + state.selectedAccord.length));
  const base = refs(pickFromPool(baseTemplate.basePool, 3, seed + state.selectedConcentration.length));
  return {
    id: `f-${Date.now()}-${seed}`,
    version,
    mode: "perfume",
    name: `${baseTemplate.title}${state.selectedScene === "晚宴" ? "夜版" : ""} V${version}`,
    date: todayKey(),
    accord: state.selectedAccord,
    scene: state.selectedScene,
    season: state.selectedSeason,
    concentration: state.selectedConcentration,
    intensity: state.intensity,
    top,
    heart,
    base,
    ratios,
    diffusion: state.selectedDiffusion,
    longevity: state.selectedLongevity,
    materials: [...names(top), ...names(heart), ...names(base)],
    visualColor: baseTemplate.visualColor,
    note: `${baseTemplate.mood}。比例 ${ratios.join("/")}; ${state.selectedDiffusion}扩散，目标留香 ${state.selectedLongevity}。`,
    aiComment: perfumePrediction(state, top, heart, base),
  };
}

function perfumePrediction(currentState, top, heart, base) {
  const diffusionCopy = {
    贴肤: "扩散会比较克制，适合近距离闻到细节",
    适中: "扩散感适中，适合日常通勤和办公场景",
    明显: "开场存在感更强，更适合社交或晚间场景",
  }[currentState.selectedDiffusion];
  const moodCopy = {
    花香: "整体会偏柔和、干净、有亲近感",
    木质: "整体会偏稳定、干燥、有质感",
    柑橘: "整体会偏明亮、清爽、带轻快开场",
    茶香: "整体会偏清透、安静、低打扰",
    东方: "整体会偏温暖、包裹、有晚间氛围",
    馥奇: "整体会偏清洁、草本、略带复古轮廓",
    美食调: "整体会偏甜暖、柔软、有亲密感",
  }[currentState.selectedAccord] || "整体层次会比较均衡";
  return `配方味道功效预测：前调 ${top[0].name} 会带来第一印象，${heart[0].name} 负责主体记忆点，${base[0].name} 会让尾调更稳定。${moodCopy}；${diffusionCopy}。更适合营造“${currentState.selectedScene}”里的香气氛围，不做医疗或绝对化承诺。`;
}

function oilPrediction(currentState, oilBlend) {
  const hero = oilBlend[0]?.name || "精油组合";
  const support = oilBlend[1]?.name || "辅助精油";
  return `配方味道功效预测：${hero} 会形成主要气味印象，${support} 负责柔化和过渡。整体适合辅助营造“${currentState.selectedOilGoal}”氛围，用于${currentState.selectedOilUsage}时建议短时多次、保持通风；皮肤使用需遵循低浓度和局部测试原则。`;
}

function generateFormula() {
  state.variationSeed += 1;
  state.currentFormula = createFormulaVariation(state.productMode === "perfume" ? currentPerfumeTemplate() : currentOilTemplate());
  showToast("已生成一版新的调香方案");
  renderHome();
}

function ensureCurrentFormula() {
  if (!state.currentFormula || state.currentFormula.mode !== state.productMode) {
    state.currentFormula = createFormulaVariation(state.productMode === "perfume" ? currentPerfumeTemplate() : currentOilTemplate());
  }
  return state.currentFormula;
}

function saveFormula() {
  const formula = ensureCurrentFormula();
  const record = { ...formula, id: `r-${Date.now()}`, date: todayKey() };
  state.formulaHistory.unshift(record);
  state.chat.push({ role: "ai", text: `已保存「${record.name}」到我的配方。后续可以从「我的」载入为模板继续换版。` });
  showToast("配方已保存到我的配方");
  render();
}

function renderHome() {
  const formula = ensureCurrentFormula();
  views.homeView.innerHTML = `
    <section class="hero perfume-hero">
      <div class="hero-row">
        <div>
          <h2>你好，${state.profile.name}！</h2>
          <p>先写清 brief，再从真实原料库选料。保存后的配方会进入我的配方。</p>
        </div>
        <span class="date-pill">${state.productMode === "perfume" ? "香水配方" : "精油方案"}</span>
      </div>
    </section>

    <div class="mode-switch">
      <button data-action="switch-mode" data-mode="perfume" class="${state.productMode === "perfume" ? "active" : ""}">香水配方</button>
      <button data-action="switch-mode" data-mode="essentialOil" class="${state.productMode === "essentialOil" ? "active" : ""}">精油方案</button>
    </div>

    <section class="section">
      <div class="section-title">
        <h2>专业调香工作台</h2>
        <button class="analysis-link" data-action="generate-formula">${sparkIcon()} 生成配方</button>
      </div>
      <article class="profile-card perfume-panel">
        ${state.productMode === "perfume" ? perfumeBriefPanel() : oilBriefPanel()}
      </article>
    </section>

    <section class="section">
      <div class="section-title">
        <h2>当前配方</h2>
        <button class="text-button" data-action="save-formula">保存</button>
      </div>
      ${formulaCard(formula, true)}
    </section>
    ${materialDrawer()}
  `;
}

function perfumeBriefPanel() {
  return `
    <div class="brief-head">
      <div>
        <strong>调香 Brief</strong>
        <p class="caption">目标气味、骨架和限制条件会影响生成策略。</p>
      </div>
      <span>${state.selectedBudget}预算</span>
    </div>
    <label class="caption">香调骨架</label>
    <div class="preference-tags">${accordOptions.map((item) => tagButton(item, "select-accord", state.selectedAccord === item)).join("")}</div>
    <div class="settings-grid compact-grid">
      ${selectRow("使用场景", "scene", sceneOptions, state.selectedScene)}
      ${selectRow("季节", "season", seasonOptions, state.selectedSeason)}
      ${selectRow("浓度", "concentration", concentrationOptions, state.selectedConcentration)}
      ${selectRow("扩散感", "diffusion", diffusionOptions, state.selectedDiffusion)}
      ${selectRow("留香目标", "longevity", longevityOptions, state.selectedLongevity)}
      ${selectRow("预算", "budget", budgetOptions, state.selectedBudget)}
      ${inputRow("避免香材", "avoidNotes", state.avoidNotes)}
    </div>
    ${rangeControl("气味强度", "越高越强调尾调存在感和记忆点")}
  `;
}

function oilBriefPanel() {
  return `
    <div class="brief-head">
      <div>
        <strong>精油 Brief</strong>
        <p class="caption">以使用方式、体验方向和安全提示为核心，不做医疗承诺。</p>
      </div>
      <span>合规表达</span>
    </div>
    <div class="settings-grid compact-grid">
      ${selectRow("使用方式", "oilUsage", oilUsageOptions, state.selectedOilUsage)}
      ${selectRow("体验方向", "oilGoal", oilGoalOptions, state.selectedOilGoal)}
      ${selectRow("空间/时段", "scene", sceneOptions, state.selectedScene)}
      ${selectRow("基底/扩香", "oilCarrier", oilCarrierOptions, state.selectedOilCarrier)}
      ${selectRow("浓度提示", "oilDilution", oilDilutionOptions, state.selectedOilDilution)}
    </div>
    <div class="safety-box"><strong>禁忌提醒</strong><p>${state.oilSafetyNote}</p></div>
    ${rangeControl("体验强度", "越高越强调空间存在感，皮肤使用仍建议低浓度")}
  `;
}

function tagButton(label, action, active) {
  return `<button data-action="${action}" data-value="${label}" class="${active ? "active" : ""}">${label}</button>`;
}

function selectRow(label, field, options, value) {
  return `
    <div class="settings-row">
      <label>${label}</label>
      <select data-action="home-select" data-field="${field}">
        ${options.map((option) => `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </div>
  `;
}

function inputRow(label, field, value) {
  return `<div class="settings-row wide-row"><label>${label}</label><input data-action="home-input" data-field="${field}" type="text" value="${value}" /></div>`;
}

function rangeControl(title, hint) {
  return `
    <div class="range-row">
      <div><strong>${title}</strong><p class="caption">${hint}</p></div>
      <span>${state.intensity}%</span>
    </div>
    <input class="perfume-range" data-action="intensity" type="range" min="20" max="90" value="${state.intensity}" />
  `;
}

function formulaCard(formula, isCurrent = false) {
  const meta = formula.mode === "perfume" ? `${formula.accord} · ${formula.scene} · ${formula.concentration}` : `${formula.experienceGoal} · ${formula.usageMethod} · ${formula.dilutionHint}`;
  return `
    <article class="meal-card formula-card" style="--formulaColor:${formula.visualColor}">
      <div class="record-top">
        <div><h3>${formula.name}</h3><p class="caption">${meta}</p></div>
        <span class="perfume-badge">${formula.mode === "perfume" ? "香水" : "精油"} · ${formula.intensity}%</span>
      </div>
      ${formula.mode === "perfume" ? perfumeStructure(formula, isCurrent) : oilStructure(formula, isCurrent)}
      <div class="insight">${formula.aiComment}</div>
      <div class="capture-actions">
        <button class="secondary-button" data-action="${isCurrent ? "generate-formula" : "view-formula"}" data-id="${formula.id}">${isCurrent ? "换一版" : "查看详情"}</button>
        <button class="primary-button" data-action="${isCurrent ? "save-formula" : "copy-formula"}" data-id="${formula.id}">${isCurrent ? "保存配方" : "作为模板"}</button>
      </div>
    </article>
  `;
}

function perfumeStructure(formula, editable = false) {
  return `
    <div class="scent-pyramid">
      ${noteRow("前调", "top", formula.top, formula.ratios[0], editable)}
      ${noteRow("中调", "heart", formula.heart, formula.ratios[1], editable)}
      ${noteRow("后调", "base", formula.base, formula.ratios[2], editable)}
    </div>
    <div class="formula-meta-grid"><span>扩散：${formula.diffusion}</span><span>留香：${formula.longevity}</span></div>
  `;
}

function oilStructure(formula, editable = false) {
  return `
    <div class="scent-pyramid">
      ${noteRow("精油", "oilBlend", formula.oilBlend, 100, editable)}
    </div>
    <div class="formula-meta-grid"><span>基底：${formula.carrier}</span><span>提示：${formula.dilutionHint}</span></div>
  `;
}

function noteRow(label, layerKey, items, ratio, editable) {
  return `
    <div class="note-row material-note-row">
      <span>${label}</span>
      <div>
        <div class="selected-materials">
          ${items.map((item) => materialChip(item, layerKey, editable)).join("")}
        </div>
        <div class="bar-track"><span style="width:${Math.min(100, ratio)}%"></span></div>
      </div>
      <div class="note-actions">
        <em>${ratio}%</em>
        ${editable ? `<button class="mini-action" data-action="open-material-drawer" data-layer="${layerKey}">选料</button>` : ""}
      </div>
    </div>
  `;
}

function materialChip(item, layerKey, editable) {
  const ratio = item.ratio ? ` ${item.ratio}%` : "";
  const id = item.materialId || item.name;
  return `<span class="material-chip">${item.name}${ratio}${editable ? `<button data-action="remove-material" data-layer="${layerKey}" data-id="${id}" aria-label="删除${item.name}">×</button>` : ""}</span>`;
}

function renderMaterialLibrary() {
  const stats = getMaterialStats();
  const filtered = filteredMaterials();
  views.recordsView.innerHTML = `
    <section class="record-summary card">
      <div class="record-top">
        <div><h2>原料库</h2><p class="caption">管理现有原料、厂家、产地、剩余量和香气简介。</p></div>
        <button class="text-button" data-action="start-import">拍照导入</button>
      </div>
      <div class="summary-grid">
        <div class="summary-cell"><strong>${stats.total}</strong><span>总原料</span></div>
        <div class="summary-cell"><strong>${stats.lowStock}</strong><span>低库存</span></div>
        <div class="summary-cell"><strong>${stats.manufacturers}</strong><span>厂家</span></div>
        <div class="summary-cell"><strong>${stats.topAroma}</strong><span>常用香气</span></div>
      </div>
    </section>
    ${importPanel()}
    <section class="analysis-card card">
      <div class="section-title"><h2>筛选</h2><button class="text-button" data-action="open-material-drawer" data-layer="top">手动新增</button></div>
      <div class="library-filters">
        ${librarySelect("香气", "aroma", aromaFilterOptions, state.libraryFilters.aroma)}
        ${librarySelect("库存", "stock", stockFilterOptions, state.libraryFilters.stock)}
        ${librarySelect("层级", "layer", ["全部", ...layerOptions], state.libraryFilters.layer)}
      </div>
    </section>
    <div class="material-card-list">
      ${filtered.length ? filtered.map(materialCard).join("") : emptyLibrary()}
    </div>
    ${materialDrawer()}
  `;
}

function importPanel() {
  if (state.importStatus === "idle") {
    return `<section class="analysis-card card"><div class="section-title"><h2>自动导入</h2><span class="caption">模拟 OCR</span></div><p class="caption">拍摄标签或库存清单，AI 会识别原料名、厂家、产地、规格和余量。</p><button class="primary-button" style="width:100%" data-action="start-import">拍照识别原料</button></section>`;
  }
  if (state.importStatus === "loading") {
    return `<section class="analysis-card card loading-box"><div><div class="spinner"></div><h2>正在识别原料标签</h2><p class="empty-copy">模拟 OCR 正在读取厂家、产地、规格和剩余量。</p></div></section>`;
  }
  return `
    <section class="analysis-card card">
      <div class="section-title"><h2>识别结果</h2><button class="text-button" data-action="cancel-import">取消</button></div>
      <div class="material-card-list compact-list">${state.pendingImportedMaterials.map((item) => materialCard(item, true)).join("")}</div>
      <button class="primary-button" style="width:100%;margin-top:10px" data-action="confirm-import">确认导入 ${state.pendingImportedMaterials.length} 个原料</button>
    </section>
  `;
}

function librarySelect(label, field, options, value) {
  return `<label><span>${label}</span><select data-action="library-filter" data-field="${field}">${options.map((option) => `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
}

function materialCard(item, pending = false) {
  return `
    <article class="material-card ${item.stockStatus === "低库存" ? "low-stock" : ""}">
      <div class="record-top">
        <div>
          <h3>${item.name}</h3>
          <p class="caption">${item.manufacturer} · ${item.origin} · ${item.recommendedLayer}</p>
        </div>
        <span class="perfume-badge">${item.remainingAmount}${item.unit}</span>
      </div>
      <p>${item.intro}</p>
      <div class="material-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}<span>${item.stockStatus}</span></div>
      <div class="capture-actions">
        <button class="secondary-button" data-action="${pending ? "remove-pending" : "view-material"}" data-id="${item.id}">${pending ? "删除" : "详情"}</button>
        <button class="primary-button" data-action="use-material" data-id="${item.id}">加入当前层</button>
      </div>
    </article>
  `;
}

function emptyLibrary() {
  return `<article class="meal-card empty-state">${emptyBottleIcon()}<h3>没有匹配的原料</h3><p class="empty-copy">可以拍照导入库存清单，或通过选料抽屉手动新增。</p></article>`;
}

function materialDrawer() {
  if (!state.drawer.open) return "";
  const candidates = filteredMaterialsForLayer(state.drawer.layer);
  return `
    <div class="drawer-backdrop" data-action="close-drawer">
      <section class="material-drawer" data-drawer-panel>
        <div class="drawer-handle"></div>
        <div class="section-title">
          <h2>${layerName(state.drawer.layer)}选料</h2>
          <button class="modal-close" data-action="close-drawer" aria-label="关闭">×</button>
        </div>
        <div class="segment-row drawer-tabs">
          <button data-action="drawer-tab" data-tab="library" class="${state.drawer.tab === "library" ? "active" : ""}">从原料库中选择</button>
          <button data-action="drawer-tab" data-tab="custom" class="${state.drawer.tab === "custom" ? "active" : ""}">自定义原料</button>
        </div>
        <div class="dosage-row">
          <label>
            <span>加入用量</span>
            <input data-action="drawer-amount" type="number" min="0.1" max="100" step="0.1" value="${state.drawer.amount}" />
          </label>
          <em>${state.drawer.layer === "oilBlend" ? "精油配比 %" : "当前层级内占比 %"}</em>
        </div>
        ${
          state.drawer.tab === "library"
            ? `<div class="drawer-list">${candidates.map((item) => drawerMaterialRow(item)).join("") || "<p class='empty-copy'>当前层级暂无匹配原料。</p>"}</div>`
            : customMaterialForm()
        }
      </section>
    </div>
  `;
}

function drawerMaterialRow(item) {
  return `
    <button class="drawer-material-row" data-action="select-material" data-id="${item.id}">
      <span><strong>${item.name}</strong><small>${item.aromaProfile} · ${item.manufacturer} · ${item.remainingAmount}${item.unit}</small></span>
      <em>${item.stockStatus}</em>
    </button>
  `;
}

function customMaterialForm() {
  return `
    <div class="custom-form">
      <label>原料名称<input data-custom="name" value="${state.customMaterial.name}" placeholder="例如：黑加仑香基" /></label>
      <label>香气描述<input data-custom="aromaProfile" value="${state.customMaterial.aromaProfile}" placeholder="例如：果香、绿感、微酸" /></label>
      <label>推荐层级<select data-custom="recommendedLayer">${layerOptions.map((option) => `<option value="${option}" ${option === state.customMaterial.recommendedLayer ? "selected" : ""}>${option}</option>`).join("")}</select></label>
      <label>简介<textarea data-custom="intro" placeholder="一句话说明这个原料的气味轮廓">${state.customMaterial.intro}</textarea></label>
      <label class="check-row"><input data-custom="sync" type="checkbox" ${state.customMaterial.sync ? "checked" : ""} /> 同步保存到原料库</label>
      <button class="primary-button" style="width:100%" data-action="add-custom-material">加入当前配方</button>
    </div>
  `;
}

function renderCoach() {
  const formula = ensureCurrentFormula();
  views.coachView.innerHTML = `
    <section class="coach-layout">
      <div class="coach-summary">当前模式：${state.productMode === "perfume" ? "香水配方" : "精油方案"} · 当前方案：${formula.name} · 原料库：${state.materialsInventory.length} 个</div>
      <div class="chat-list">${state.chat.map((message) => `<div class="chat-bubble ${message.role === "ai" ? "ai" : "user"}">${message.text}</div>`).join("")}</div>
      <div class="quick-questions">
        ${["怎么用库存优化配方？", "低库存原料怎么替换？", "精油搭配要注意什么？", "原料简介怎么写？"].map((question) => `<button data-action="quick-question" data-question="${question}">${question}</button>`).join("")}
      </div>
      <div class="chat-input"><input id="chatInput" type="text" placeholder="问问 AI 调香师..." maxlength="100" /><button class="primary-button" data-action="send-chat">发送</button></div>
    </section>
  `;
}

function aiReply(question) {
  const formula = ensureCurrentFormula();
  if (question.includes("库存")) return `当前原料库有 ${state.materialsInventory.length} 个原料。建议优先使用“充足”状态的材料，低库存原料可以保留为小样验证，不要放进主推版本。`;
  if (question.includes("替换")) return "低库存替换时先看角色：前调用同类明亮材料替换，中调用同气味家族替换，后调优先保持定香功能。替换后只改一个变量，方便判断变化。";
  if (question.includes("精油")) return "精油搭配先确认使用方式，再确定体验方向。皮肤使用建议低浓度、小范围测试；空间扩香建议短时多次并保持通风。";
  if (question.includes("简介")) return "原料简介建议写三件事：气味轮廓、适合层级、搭配方向。比如“透明茶感中调，适合日常清透香，可与佛手柑、白麝香、雪松搭配”。";
  return `结合当前「${formula.name}」，建议从原料库里优先选择库存充足、香气角色清晰的材料，再用一两个低库存材料做差异化小样。`;
}

function renderProfile() {
  views.profileView.innerHTML = `
    <section class="profile-card">
      <h2>个人调香偏好</h2>
      <div class="settings-grid">
        ${profileInput("昵称", "name", "text")}
        ${profileSelect("调香经验", "experience", ["入门", "进阶", "专业"])}
        ${profileSelect("偏好香调", "favoriteAccord", accordOptions)}
        ${profileSelect("常用浓度", "preferredConcentration", concentrationOptions)}
        ${profileSelect("预算范围", "budget", budgetOptions)}
        ${profileInput("避免香材", "avoidNotes", "text")}
      </div>
    </section>
    <button class="primary-button" style="width:100%" data-action="save-profile">保存设置</button>
    <section class="profile-card">
      <div class="section-title">
        <h2>我的配方</h2>
        <span class="caption">${state.formulaHistory.length} 个</span>
      </div>
      ${profileFormulaHistory()}
    </section>
  `;
}

function profileFormulaHistory() {
  if (!state.formulaHistory.length) return "<p class='empty-copy'>还没有保存配方。</p>";
  const groups = new Map();
  state.formulaHistory.forEach((formula) => {
    const date = formula.date || todayKey();
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date).push(formula);
  });
  return [...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(
      ([date, formulas]) => `
        <div class="formula-date-group">
          <div class="formula-date">${date}</div>
          ${formulas.map(profileFormulaRow).join("")}
        </div>
      `,
    )
    .join("");
}

function profileFormulaRow(formula) {
  return `
    <article class="formula-history-row">
      <button data-action="view-formula" data-id="${formula.id}">
        <strong>${formula.name}</strong>
        <span>${formulaIntro(formula)}</span>
      </button>
      <button class="small-button" data-action="copy-formula" data-id="${formula.id}">模板</button>
    </article>
  `;
}

function formulaIntro(formula) {
  if (formula.mode === "perfume") {
    return `${formula.accord} · ${formula.concentration} · ${formula.scene}，${formula.aiComment}`;
  }
  return `${formula.experienceGoal} · ${formula.usageMethod}，${formula.note}`;
}

function profileInput(label, key, type) {
  return `<div class="settings-row"><label>${label}</label><input data-profile="${key}" type="${type}" value="${state.profile[key]}" /></div>`;
}

function profileSelect(label, key, options) {
  return `<div class="settings-row"><label>${label}</label><select data-profile="${key}">${options.map((option) => `<option value="${option}" ${state.profile[key] === option ? "selected" : ""}>${option}</option>`).join("")}</select></div>`;
}

function getMaterialStats() {
  const total = state.materialsInventory.length;
  const lowStock = state.materialsInventory.filter((item) => item.stockStatus === "低库存").length;
  const manufacturers = new Set(state.materialsInventory.map((item) => item.manufacturer)).size;
  const topAroma = topBy(state.materialsInventory.map((item) => item.aromaProfile)) || "暂无";
  return { total, lowStock, manufacturers, topAroma };
}

function topBy(items) {
  const map = new Map();
  items.forEach((item) => map.set(item, (map.get(item) || 0) + 1));
  return [...map.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

function filteredMaterials() {
  return state.materialsInventory.filter((item) => {
    const aromaOk = state.libraryFilters.aroma === "全部" || item.tags.includes(state.libraryFilters.aroma) || item.aromaProfile === state.libraryFilters.aroma;
    const stockOk = state.libraryFilters.stock === "全部" || item.stockStatus === state.libraryFilters.stock;
    const layerOk = state.libraryFilters.layer === "全部" || item.recommendedLayer === state.libraryFilters.layer;
    return aromaOk && stockOk && layerOk;
  });
}

function filteredMaterialsForLayer(layerKey) {
  const layer = layerName(layerKey);
  return state.materialsInventory.filter((item) => {
    if (layerKey === "oilBlend") return item.category === "精油" || item.recommendedLayer === "精油";
    return item.recommendedLayer === layer || item.category === "香精原料";
  });
}

function layerName(layerKey) {
  return { top: "前调", heart: "中调", base: "后调", oilBlend: "精油" }[layerKey] || layerKey;
}

function getMaterialById(id) {
  return state.materialsInventory.find((item) => item.id === id) || state.pendingImportedMaterials.find((item) => item.id === id);
}

function addMaterialToFormula(materialItem) {
  const formula = ensureCurrentFormula();
  const amount = Number(state.drawer.amount) || 1;
  const ref = { name: materialItem.name, materialId: materialItem.id, ratio: amount };
  const targetLayer = ["top", "heart", "base", "oilBlend"].includes(state.drawer.layer) ? state.drawer.layer : "top";
  if (targetLayer === "oilBlend") {
    formula.oilBlend = [...formula.oilBlend, ref];
    formula.materials = names(formula.oilBlend);
  } else {
    formula[targetLayer] = [...formula[targetLayer], ref];
    formula.materials = [...names(formula.top), ...names(formula.heart), ...names(formula.base)];
  }
}

function openFormulaDetail(id) {
  const formula = state.formulaHistory.find((item) => item.id === id) || state.currentFormula;
  if (!formula) return;
  modalBody.innerHTML = `
    <p class="caption">${formula.date || todayKey()} · ${formula.mode === "perfume" ? formula.accord : formula.experienceGoal} · ${formula.scene}</p>
    <h3>${formula.name}</h3>
    <div class="summary-grid">
      <div class="summary-cell"><strong>${formula.mode === "perfume" ? formula.concentration : formula.usageMethod}</strong><span>类型</span></div>
      <div class="summary-cell"><strong>${formula.intensity}%</strong><span>强度</span></div>
      <div class="summary-cell"><strong>V${formula.version}</strong><span>版本</span></div>
      <div class="summary-cell"><strong>${formula.materials.length}</strong><span>材料</span></div>
    </div>
    ${formula.mode === "perfume" ? perfumeStructure(formula) : oilStructure(formula)}
    <div class="insight">${formula.note} ${formula.aiComment}</div>
  `;
  detailModal.hidden = false;
}

function openMaterialDetail(id) {
  const item = getMaterialById(id);
  if (!item) return;
  modalBody.innerHTML = `
    <p class="caption">${item.category} · ${item.recommendedLayer} · ${item.stockStatus}</p>
    <h3>${item.name}</h3>
    <div class="summary-grid">
      <div class="summary-cell"><strong>${item.manufacturer}</strong><span>厂家</span></div>
      <div class="summary-cell"><strong>${item.origin}</strong><span>产地</span></div>
      <div class="summary-cell"><strong>${item.remainingAmount}${item.unit}</strong><span>余量</span></div>
      <div class="summary-cell"><strong>${item.batch}</strong><span>批次</span></div>
    </div>
    <div class="insight">${item.intro} 搭配建议：${item.pairingTips}</div>
  `;
  detailModal.hidden = false;
}

function copyFormula(id) {
  const record = state.formulaHistory.find((item) => item.id === id);
  if (!record) return;
  state.productMode = record.mode;
  state.intensity = record.intensity || 60;
  if (record.mode === "perfume") {
    state.selectedAccord = record.accord;
    state.selectedScene = record.scene;
    state.selectedConcentration = record.concentration;
    state.selectedDiffusion = record.diffusion;
    state.selectedLongevity = record.longevity;
  } else {
    state.selectedOilGoal = record.experienceGoal;
    state.selectedOilUsage = record.usageMethod;
    state.selectedOilCarrier = record.carrier;
    state.selectedOilDilution = record.dilutionHint;
  }
  state.currentFormula = { ...record, id: `f-${Date.now()}` };
  setView("homeView");
  showToast("已载入为首页模板");
}

function saveProfile() {
  document.querySelectorAll("[data-profile]").forEach((field) => {
    state.profile[field.dataset.profile] = field.value.trim();
  });
  state.selectedAccord = state.profile.favoriteAccord;
  state.selectedConcentration = state.profile.preferredConcentration;
  state.selectedBudget = state.profile.budget;
  state.avoidNotes = state.profile.avoidNotes;
  state.currentFormula = null;
  showToast("偏好已保存");
  render();
}

function startImport() {
  state.importStatus = "loading";
  renderMaterialLibrary();
  window.setTimeout(() => {
    state.pendingImportedMaterials = importMockMaterials.map((item) => ({ ...item, id: `${item.id}-${Date.now()}` }));
    state.importStatus = "success";
    renderMaterialLibrary();
    showToast("识别完成，请确认导入");
  }, 850);
}

function confirmImport() {
  state.materialsInventory.unshift(...state.pendingImportedMaterials);
  state.pendingImportedMaterials = [];
  state.importStatus = "idle";
  showToast("原料已导入原料库");
  renderMaterialLibrary();
}

function addCustomMaterial() {
  const name = state.customMaterial.name.trim();
  if (!name) {
    showToast("请先填写原料名称");
    return;
  }
  const layer = state.drawer.layer === "oilBlend" ? "精油" : state.customMaterial.recommendedLayer;
  const item = material(
    `custom-${Date.now()}`,
    name,
    layer === "精油" ? "精油" : "香精原料",
    layer,
    "自定义",
    "未填写",
    "MANUAL",
    "自定义",
    1,
    "份",
    "充足",
    state.customMaterial.aromaProfile || "自定义",
    [state.customMaterial.aromaProfile || "自定义"],
    state.customMaterial.intro || "用户自定义新增原料，可在后续版本中补充厂家、产地和批次。",
    "建议先小比例加入当前配方，观察与主香材的协调度。",
    "manual",
  );
  if (state.customMaterial.sync) state.materialsInventory.unshift(item);
  addMaterialToFormula(item);
  state.customMaterial = { name: "", aromaProfile: "", recommendedLayer: "前调", intro: "", sync: true };
  showToast("自定义原料已加入当前层");
  render();
}

function removeMaterial(layerKey, id) {
  const formula = ensureCurrentFormula();
  const match = (item) => (item.materialId || item.name) !== id;
  if (layerKey === "oilBlend") {
    formula.oilBlend = formula.oilBlend.filter(match);
    formula.materials = names(formula.oilBlend);
  } else {
    formula[layerKey] = formula[layerKey].filter(match);
    formula.materials = [...names(formula.top), ...names(formula.heart), ...names(formula.base)];
  }
  renderHome();
}

function sparkIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8Z"/></svg>`;
}

function emptyBottleIcon() {
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 8h14v10l7 8v26a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6V26l7-8Z"/><path d="M25 8h14M22 34h20M26 44h12"/></svg>`;
}

document.querySelector(".app-screen").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (event.target.closest("[data-drawer-panel]") && button.dataset.action === "close-drawer") {
    event.stopPropagation();
  }
  button.classList.add("pressed");
  window.setTimeout(() => button.classList.remove("pressed"), 110);

  if (button.classList.contains("tab")) {
    setView(button.dataset.target);
    return;
  }

  const action = button.dataset.action;
  if (action === "switch-mode") {
    state.productMode = button.dataset.mode;
    state.currentFormula = null;
    renderHome();
  }
  if (action === "select-accord") {
    state.selectedAccord = button.dataset.value;
    state.currentFormula = null;
    renderHome();
  }
  if (action === "generate-formula") generateFormula();
  if (action === "save-formula") saveFormula();
  if (action === "open-material-drawer") {
    state.drawer = { open: true, layer: button.dataset.layer, tab: button.dataset.layer === "top" && state.activeView === "recordsView" ? "custom" : "library" };
    render();
  }
  if (action === "close-drawer") {
    state.drawer.open = false;
    render();
  }
  if (action === "drawer-tab") {
    state.drawer.tab = button.dataset.tab;
    render();
  }
  if (action === "select-material" || action === "use-material") {
    const item = getMaterialById(button.dataset.id);
    if (item) {
      addMaterialToFormula(item);
      showToast(`已加入 ${item.name}`);
      render();
    }
  }
  if (action === "remove-material") removeMaterial(button.dataset.layer, button.dataset.id);
  if (action === "add-custom-material") addCustomMaterial();
  if (action === "view-material") openMaterialDetail(button.dataset.id);
  if (action === "start-import") startImport();
  if (action === "cancel-import") {
    state.importStatus = "idle";
    state.pendingImportedMaterials = [];
    renderMaterialLibrary();
  }
  if (action === "remove-pending") {
    state.pendingImportedMaterials = state.pendingImportedMaterials.filter((item) => item.id !== button.dataset.id);
    renderMaterialLibrary();
  }
  if (action === "confirm-import") confirmImport();
  if (action === "view-formula") openFormulaDetail(button.dataset.id);
  if (action === "copy-formula") copyFormula(button.dataset.id);
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
      showToast("可以先输入一个调香问题");
      return;
    }
    state.chat.push({ role: "user", text: question });
    state.chat.push({ role: "ai", text: aiReply(question) });
    renderCoach();
  }
  if (action === "save-profile") saveProfile();
});

document.querySelector(".app-screen").addEventListener("click", (event) => {
  if (event.target.classList.contains("drawer-backdrop")) {
    state.drawer.open = false;
    render();
  }
});

document.querySelector(".app-screen").addEventListener("change", (event) => {
  const field = event.target;
  if (field.dataset.action === "home-select") {
    const key = field.dataset.field;
    const value = field.value;
    if (key === "scene") state.selectedScene = value;
    if (key === "season") state.selectedSeason = value;
    if (key === "concentration") state.selectedConcentration = value;
    if (key === "diffusion") state.selectedDiffusion = value;
    if (key === "longevity") state.selectedLongevity = value;
    if (key === "budget") state.selectedBudget = value;
    if (key === "oilUsage") state.selectedOilUsage = value;
    if (key === "oilGoal") state.selectedOilGoal = value;
    if (key === "oilCarrier") state.selectedOilCarrier = value;
    if (key === "oilDilution") state.selectedOilDilution = value;
    state.currentFormula = null;
    renderHome();
  }
  if (field.dataset.action === "library-filter") {
    state.libraryFilters[field.dataset.field] = field.value;
    renderMaterialLibrary();
  }
  if (field.dataset.custom) {
    state.customMaterial[field.dataset.custom] = field.type === "checkbox" ? field.checked : field.value;
  }
});

document.querySelector(".app-screen").addEventListener("input", (event) => {
  const field = event.target;
  if (field.dataset.action === "intensity") {
    state.intensity = Number(field.value);
    state.currentFormula = null;
    renderHome();
  }
  if (field.dataset.action === "home-input" && field.dataset.field === "avoidNotes") state.avoidNotes = field.value;
  if (field.dataset.action === "drawer-amount") state.drawer.amount = field.value;
  if (field.dataset.custom) state.customMaterial[field.dataset.custom] = field.value;
});

document.querySelector("#messageButton").addEventListener("click", () => {
  showToast("暂无新消息，今天也适合整理原料库");
});

closeModal.addEventListener("click", () => {
  detailModal.hidden = true;
});

detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) detailModal.hidden = true;
});

render();
