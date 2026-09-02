export const PAPER_CATEGORY_IDS = [
  'ai-acceleration',
  'eda-power-integrity',
  'computer-vision',
  'speech-audio',
] as const

export type PaperCategoryId = (typeof PAPER_CATEGORY_IDS)[number]

export interface PaperCategory {
  readonly id: PaperCategoryId
  readonly label: string
  readonly englishLabel: string
  readonly description: string
}

export interface PaperClassification {
  readonly categoryId: PaperCategoryId
  readonly tags: readonly string[]
}

export const PAPER_CATEGORIES: readonly PaperCategory[] = [
  {
    id: 'ai-acceleration',
    label: 'AI 模型與硬體加速',
    englishLabel: 'AI Models & Hardware Acceleration',
    description: 'AI 模型、模型壓縮、推論最佳化，以及面向硬體的高效運算架構。',
  },
  {
    id: 'eda-power-integrity',
    label: '電源完整性與設計自動化',
    englishLabel: 'Power Integrity & Design Automation',
    description: '電源分佈網路、時序、封裝、可靠度與積體電路設計自動化。',
  },
  {
    id: 'computer-vision',
    label: '電腦視覺與事件感知',
    englishLabel: 'Computer Vision & Event-based Perception',
    description: '電腦視覺、事件相機、3D 人體建模、姿態理解與深度估計。',
  },
  {
    id: 'speech-audio',
    label: '語音與音訊處理',
    englishLabel: 'Speech & Audio Processing',
    description: '語音辨識、關鍵字偵測、語音活動偵測與低功耗音訊 AI。',
  },
] as const

export const PAPER_CATEGORY_BY_ID: Readonly<Record<PaperCategoryId, PaperCategory>> = {
  'ai-acceleration': PAPER_CATEGORIES[0],
  'eda-power-integrity': PAPER_CATEGORIES[1],
  'computer-vision': PAPER_CATEGORIES[2],
  'speech-audio': PAPER_CATEGORIES[3],
}

const CATEGORY_RULES: readonly {
  readonly id: PaperCategoryId
  readonly patterns: readonly RegExp[]
}[] = [
  {
    id: 'speech-audio',
    patterns: [
      /語音|音訊|音頻|關鍵字/u,
      /speech|audio|keyword\s*spotting|voice\s*activity/i,
    ],
  },
  {
    id: 'computer-vision',
    patterns: [
      /電腦視覺|影像|圖像|姿態|骨架|步態|事件相機|事件視覺|深度估計|3D|JPEG/u,
      /computer\s*vision|image|vision|event\s*camera|depth|gait|skeleton|JPEG/i,
    ],
  },
  {
    id: 'ai-acceleration',
    patterns: [
      /人工智慧|機器學習|深度學習|神經網路|類神經|強化學習|量化|模型|推理|推論|稀疏|語意|分類|大型語言/u,
      /artificial\s*intelligence|machine\s*learning|deep\s*learning|neural|reinforcement|quantization|model|inference|sparse|language|LLM|transformer/i,
    ],
  },
  {
    id: 'eda-power-integrity',
    patterns: [
      /晶片|電源|電壓|時序|時脈|電路|積體電路|VLSI|封裝|中介層|矽穿孔|可靠|功耗|功率|延遲|匯流排|邏輯合成|設計自動化/u,
      /chip|power|voltage|timing|clock|circuit|VLSI|package|interposer|TSV|reliab|power\s*gating|logic\s*synthesis|design\s*automation|IR-?drop/i,
    ],
  },
] as const

const TAG_PATTERNS: readonly { readonly label: string; readonly pattern: RegExp }[] = [
  { label: 'AI 模型', pattern: /AI\s*模型|AI\s*model|人工智慧|artificial\s*intelligence/i },
  { label: '深度學習', pattern: /深度學習|deep\s*learning/i },
  { label: '機器學習', pattern: /機器學習|machine\s*learning/i },
  { label: '神經網路', pattern: /神經網路|類神經|neural\s*network/i },
  { label: 'Transformer', pattern: /transformer/i },
  { label: '大型語言模型', pattern: /大型語言模型|large\s*language\s*model|LLM/i },
  { label: '語言模型', pattern: /語言模型|language\s*model/i },
  { label: '模型壓縮', pattern: /模型壓縮|model\s*compression/i },
  { label: '量化', pattern: /量化|quantization/i },
  { label: '神經架構搜尋', pattern: /神經網路搜索|神經架構搜尋|neural\s*architecture\s*search/i },
  { label: '圖神經網路', pattern: /圖神經網路|graph\s*neural\s*network/i },
  { label: '記憶體內運算', pattern: /內存計算|記憶體內運算|computing-in-memory|CIM/i },
  { label: '分佈偏移', pattern: /分佈偏移|distribution\s*shift/i },
  { label: '知識檢索', pattern: /知識檢索|knowledge\s*retrieval/i },
  { label: '對話系統', pattern: /任務導向.{0,4}對話|task[- ]oriented\s*dialogue/i },
  { label: '物理資訊神經算子', pattern: /物理啟發神經算子|physics[- ]informed\s*neural\s*operator/i },
  { label: '機器人抓取', pattern: /抓取生成|grasp\s*generation|GraspGen/i },
  { label: '電源完整性', pattern: /電源完整性|power\s*integrity/i },
  { label: '電源分佈網路', pattern: /電源分佈網路|power\s*distribution\s*network|PDN/i },
  { label: '動態壓降', pattern: /動態壓降|IR-?drop|voltage\s*drop/i },
  { label: '動態電壓調節', pattern: /動態電壓.{0,6}(緩降|調配|縮放)|dynamic\s*voltage\s*scal/i },
  { label: '時序分析', pattern: /時序分析|timing\s*analysis/i },
  { label: '時脈樹', pattern: /時脈樹|時鐘樹|clock\s*tree|clock\s*network/i },
  { label: '時脈偏移', pattern: /時脈偏移|時鐘偏移|clock\s*skew/i },
  { label: '封裝與3D晶片', pattern: /封裝|3D[- ]?IC|三維晶片|interposer|TSV|chiplet/i },
  { label: '堆疊式晶片', pattern: /堆疊式晶片|堆疊晶片|stacked[- ]die/i },
  { label: '矽穿孔', pattern: /矽穿孔|through[- ]silicon\s*via|TSV/i },
  { label: '中介層', pattern: /中介層|interposer/i },
  { label: '設計自動化', pattern: /設計自動化|design\s*automation|EDA/i },
  { label: '可靠度', pattern: /可靠度|可靠性|reliability/i },
  { label: '電路老化', pattern: /電路老化|過時化|老化問題|circuit\s*aging|aging\s*problem/i },
  { label: '硬體驗證', pattern: /硬體驗證|系統層級.{0,6}驗證|隨機驗證|亂數驗證|design\s*verification|system[- ]level.{0,12}verification|random\s*verification/i },
  { label: '快取一致性', pattern: /窺探式快取|探聽過濾器|竊聽過濾器|snoop\s*(filter|based\s*cache)|cache\s*coherence/i },
  { label: '片上匯流排', pattern: /晶片內建匯流排|片上匯流排|on[- ]chip[- ]bus|AMBA/i },
  { label: '電腦視覺', pattern: /電腦視覺|computer\s*vision/i },
  { label: '事件相機', pattern: /事件相機|事件視覺|event\s*camera/i },
  { label: '深度估計', pattern: /深度估計|depth\s*estimation/i },
  { label: '3D 人體建模', pattern: /3D人體|3D 人體|人體模型|3D\s*(human|avatar)|human\s*model/i },
  { label: '影像辨識', pattern: /影像辨識|圖像識別|image\s*recognition/i },
  { label: '步態辨識', pattern: /步態|走路姿態|walking\s*gesture|gait|skeleton\s*sequence/i },
  { label: '動作估計', pattern: /移動估計|motion\s*estimation/i },
  { label: '語音 AI', pattern: /語音|speech|audio/i },
  { label: '關鍵字偵測', pattern: /關鍵字|keyword\s*spotting/i },
  { label: '語音活動偵測', pattern: /語音活動|voice\s*activity/i },
  { label: '語音增強', pattern: /語音增強|speech\s*enhancement/i },
  { label: '低功耗', pattern: /低功耗|低功率|低能耗|low[- ]power|power\s*(efficien|minimization)/i },
  { label: '強化學習', pattern: /強化學習|reinforcement\s*learning/i },
  { label: '邏輯合成', pattern: /邏輯合成|logic\s*synthesis/i },
  { label: '時序變異', pattern: /時序|時脈|clock|timing|delay|PVT/i },
  { label: '硬體加速', pattern: /硬體加速|hardware\s*acceleration|GPU|CUDA/i },
  { label: '最大瞬間電流', pattern: /最大瞬間電流|maximum\s+instan\w*\s+current/i },
  { label: '字串比對', pattern: /字串比對|正規表示式|pattern\s*matching|regular\s*expression\s*matching|string\s*matching/i },
  { label: '電源門控', pattern: /電源門控|電源閘控|power\s*gating/i },
  { label: '軟錯誤容忍', pattern: /軟錯誤|soft[- ]error\s*toleran/i },
  { label: '熱感知設計', pattern: /溫度限制|溫度感知|thermal(?:ly)?\s*constrain|thermal[- ]aware/i },
  { label: '睡眠電晶體', pattern: /睡眠電晶體|sleep\s*transistor/i },
  { label: '漏電流', pattern: /漏電流|leakage\s*(current|power)/i },
  { label: '工程變更', pattern: /工程變更|engineering\s*change|spare\s*cells?/i },
  { label: '元件庫生成', pattern: /元件庫自動產生|細胞元件庫|cell\s*library\s*generator/i },
  { label: '多核心系統', pattern: /多核心(系統|處理器)|multi[- ]core\s*(system|processor)/i },
]

function pushUnique(target: string[], value: string): void {
  const normalized = value.trim().replace(/[.,;:()[\]{}]+$/gu, '')
  if (normalized.length >= 2 && !target.includes(normalized)) target.push(normalized)
}

/** Classify a catalogue record from its title and library subject metadata. */
export function classifyPaperText(text: string): PaperClassification {
  const category = CATEGORY_RULES
    .map((rule) => ({
      id: rule.id,
      score: rule.patterns.reduce((score, pattern) => score + (pattern.test(text) ? 1 : 0), 0),
    }))
    .sort((left, right) => right.score - left.score)[0]

  const tags: string[] = []
  for (const { label, pattern } of TAG_PATTERNS) {
    if (pattern.test(text)) pushUnique(tags, label)
  }

  const metadataTokens = text
    .replace(/[|/、，。；：,:;]+/gu, ' ')
    .split(/\s+/u)
  for (const token of metadataTokens) {
    const cleaned = token.replace(/^[()[\]{}]+|[()[\]{}.,;:]+$/gu, '')
    // Chinese prose fragments such as "方法用於" or "應用於" are not
    // meaningful research tags. Chinese terms must be explicitly curated above;
    // only established all-caps technical abbreviations are inferred here.
    if (/^[A-Z][A-Z0-9-]{1,}$/u.test(cleaned)) pushUnique(tags, cleaned)
  }

  if (tags.length === 0) pushUnique(tags, 'VLSI / CAD')

  return {
    categoryId: category.score > 0 ? category.id : 'eda-power-integrity',
    tags,
  }
}

export function isPaperCategoryId(value: string): value is PaperCategoryId {
  return (PAPER_CATEGORY_IDS as readonly string[]).includes(value)
}
