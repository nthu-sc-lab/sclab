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
  readonly description: string
}

export interface PaperClassification {
  readonly categoryId: PaperCategoryId
  readonly tags: readonly string[]
}

export const PAPER_CATEGORIES: readonly PaperCategory[] = [
  {
    id: 'ai-acceleration',
    label: 'AI 模型壓縮與硬體加速',
    description: '高效 AI 推論、模型壓縮、記憶體內運算與硬體感知設計',
  },
  {
    id: 'eda-power-integrity',
    label: 'EDA、時序與電源完整性',
    description: '互連、時序、動態壓降與電源分佈網路分析及最佳化',
  },
  {
    id: 'computer-vision',
    label: '電腦視覺',
    description: '3D 人體建模、事件視覺與深度估計',
  },
  {
    id: 'speech-audio',
    label: '語音與音訊 AI',
    description: '關鍵字偵測、語音活動偵測與語音增強',
  },
]

export const PAPER_CATEGORY_BY_ID: Readonly<Record<PaperCategoryId, PaperCategory>> = {
  'ai-acceleration': PAPER_CATEGORIES[0],
  'eda-power-integrity': PAPER_CATEGORIES[1],
  'computer-vision': PAPER_CATEGORIES[2],
  'speech-audio': PAPER_CATEGORIES[3],
}

/**
 * A deliberately curated taxonomy. The original titles remain untouched; these
 * tags normalize wording such as 校準／校正 and 內存計算／CIM for aggregation.
 */
export const PAPER_TAXONOMY: Readonly<Record<number, PaperClassification>> = {
  1: {
    categoryId: 'ai-acceleration',
    tags: ['AI 推論', 'Transformer', 'Softmax', '動態精度', '模型加速'],
  },
  2: {
    categoryId: 'eda-power-integrity',
    tags: ['深度學習', '晶粒互連', '散射參數', '預測'],
  },
  3: {
    categoryId: 'ai-acceleration',
    tags: ['圖神經網路', 'AI 推論', '模型加速', '資料重疊'],
  },
  4: {
    categoryId: 'ai-acceleration',
    tags: ['深度學習', '稀疏矩陣乘法', '模型加速', 'AI 硬體'],
  },
  5: {
    categoryId: 'eda-power-integrity',
    tags: ['深度學習', '時序預測', '多角分析', '預測'],
  },
  6: {
    categoryId: 'computer-vision',
    tags: ['3D 人體建模', '單張影像', '模型著色'],
  },
  7: {
    categoryId: 'computer-vision',
    tags: ['事件視覺', '事件相機', 'Transformer', '時空注意力', '影像除雨'],
  },
  8: {
    categoryId: 'computer-vision',
    tags: ['事件視覺', '事件相機', '單目深度估計', '深度估計'],
  },
  9: {
    categoryId: 'eda-power-integrity',
    tags: ['機器學習', '動態壓降', '封裝效應', '電源完整性', '預測'],
  },
  10: {
    categoryId: 'eda-power-integrity',
    tags: ['電源分佈網路', '電容器配置', '電源完整性', '最佳化'],
  },
  11: {
    categoryId: 'eda-power-integrity',
    tags: ['機器學習', '動態壓降', '資料增強', '電源完整性', '預測'],
  },
  12: {
    categoryId: 'ai-acceleration',
    tags: ['記憶體內運算 (CIM)', 'AI 模型', '矽後校正', 'AI 硬體'],
  },
  13: {
    categoryId: 'ai-acceleration',
    tags: ['後訓練量化', '模型壓縮', '輸入雜訊', 'AI 推論'],
  },
  14: {
    categoryId: 'ai-acceleration',
    tags: ['後訓練量化', '模型壓縮', '零點量化', 'AI 推論'],
  },
  15: {
    categoryId: 'ai-acceleration',
    tags: ['神經架構搜尋', '硬體感知', '峰值記憶體', '模型壓縮'],
  },
  16: {
    categoryId: 'ai-acceleration',
    tags: ['記憶體內運算 (CIM)', '深度學習', '矽後校正', 'AI 硬體'],
  },
  17: {
    categoryId: 'eda-power-integrity',
    tags: ['電源分佈網路', '阻抗預測', '極點候選網路', '電源完整性', '預測'],
  },
  18: {
    categoryId: 'speech-audio',
    tags: ['語音 AI', '關鍵字偵測', '語音活動偵測', '低功耗 AI'],
  },
  19: {
    categoryId: 'speech-audio',
    tags: ['語音 AI', '關鍵字偵測', '早期退出'],
  },
  20: {
    categoryId: 'speech-audio',
    tags: ['語音 AI', '語音增強', '雜訊消除', '注意力機制'],
  },
}

export function isPaperCategoryId(value: string): value is PaperCategoryId {
  return (PAPER_CATEGORY_IDS as readonly string[]).includes(value)
}
