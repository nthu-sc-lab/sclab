import { describe, expect, it } from 'vitest'
import papersSource from '../../papers.txt?raw'
import {
  PAPER_CATEGORIES,
  PAPER_TAXONOMY,
  type PaperCategoryId,
} from '../data/paperTaxonomy'
import {
  buildWordCloudTerms,
  filterPapers,
  getPapersByTag,
  papers,
  parsePapers,
} from './papers'

function countBy<T extends string | number>(values: readonly T[]): Record<string, number> {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[String(value)] = (counts[String(value)] ?? 0) + 1
    return counts
  }, {})
}

describe('parsePapers', () => {
  it('parses all 20 UTF-8 records from CRLF input', () => {
    const crlfSource = papersSource.replace(/\r?\n/g, '\r\n')
    const parsed = parsePapers(crlfSource)

    expect(parsed).toHaveLength(20)
    expect(parsed[0]).toMatchObject({
      id: 1,
      title: '平衡準確性與效率的動態精度 Softmax 方法用於 Transformer 推論',
      student: '王興彥',
      advisor: '張世杰',
      institution: '國立清華大學',
      department: '資訊工程學系',
      degree: '碩士',
      graduationAcademicYear: 113,
      publicationYear: 2025,
      handle: '11296/jg9tzh',
      citations: 0,
      views: 63,
      rating: 0,
      downloads: 6,
      bookmarks: 0,
    })
  })

  it('does not truncate titles containing ASCII colons', () => {
    const parsed = parsePapers(papersSource)

    expect(parsed.find((paper) => paper.id === 15)?.title).toBe(
      '殘差連接搜索:以減少峰值內存為目的硬件感知神經架構搜索',
    )
    expect(parsed.find((paper) => paper.id === 17)?.title).toBe(
      'PIPPON: 改進電源分佈網路之阻抗預測使用極點候選網路',
    )
  })

  it('parses publication years without deriving them from academic years', () => {
    expect(countBy(papers.map((paper) => paper.publicationYear))).toEqual({
      2022: 6,
      2023: 5,
      2024: 4,
      2025: 5,
    })

    const crossCalendarYearPaper = papers.find((paper) => paper.id === 10)
    expect(crossCalendarYearPaper).toMatchObject({
      graduationAcademicYear: 112,
      publicationYear: 2023,
    })
  })

  it('extracts a unique persistent Handle from every source URL', () => {
    const handles = papers.map((paper) => paper.handle)

    expect(new Set(handles).size).toBe(20)
    expect(handles.every((handle) => /^11296\/[a-z0-9]+$/i.test(handle))).toBe(true)
    expect(papers.every((paper) => paper.url.endsWith(paper.handle))).toBe(true)
  })
})

describe('paper taxonomy and filtering', () => {
  it('covers every paper exactly once with the agreed 8/6/3/3 categories', () => {
    const expectedCounts: Record<PaperCategoryId, number> = {
      'ai-acceleration': 8,
      'eda-power-integrity': 6,
      'computer-vision': 3,
      'speech-audio': 3,
    }

    expect(countBy(papers.map((paper) => paper.categoryId))).toEqual(expectedCounts)
    expect(Object.keys(PAPER_TAXONOMY).map(Number).sort((a, b) => a - b)).toEqual(
      papers.map((paper) => paper.id).sort((a, b) => a - b),
    )
    expect(new Set(PAPER_CATEGORIES.map((category) => category.id)).size).toBe(4)
    expect(papers.every((paper) => paper.tags.length > 0)).toBe(true)
  })

  it('combines category, year, tag, and normalized free-text filters', () => {
    expect(
      filterPapers(papers, {
        categoryId: 'eda-power-integrity',
        publicationYear: 2024,
      }).map((paper) => paper.id),
    ).toEqual([9])

    expect(getPapersByTag('矽後校正').map((paper) => paper.id)).toEqual([12, 16])
    expect(filterPapers(papers, { query: 'cim' }).map((paper) => paper.id)).toEqual([12, 16])
  })
})

describe('buildWordCloudTerms', () => {
  it('uses distinct-paper frequency and retains supporting paper ids', () => {
    const terms = buildWordCloudTerms(papers)
    const prediction = terms.find((term) => term.text === '預測')
    const postTrainingQuantization = terms.find((term) => term.text === '後訓練量化')

    expect(prediction).toMatchObject({
      value: 5,
      documentFrequency: 5,
      paperIds: [2, 5, 9, 11, 17],
      categoryIds: ['eda-power-integrity'],
    })
    expect(postTrainingQuantization).toMatchObject({
      value: 2,
      documentFrequency: 2,
      paperIds: [13, 14],
      categoryIds: ['ai-acceleration'],
    })
  })

  it('supports category scoping and minimum document frequency', () => {
    const speechTerms = buildWordCloudTerms(papers, {
      categoryId: 'speech-audio',
      minDocumentFrequency: 2,
    })

    expect(speechTerms.map((term) => [term.text, term.documentFrequency])).toEqual([
      ['語音 AI', 3],
      ['關鍵字偵測', 2],
    ])
  })
})

