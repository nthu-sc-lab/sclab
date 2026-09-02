import { describe, expect, it } from 'vitest'
import papersSource from '../../papers.csv?raw'
import { PAPER_CATEGORIES, type PaperCategoryId } from '../data/paperTaxonomy'
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

describe('papers.csv catalogue parser', () => {
  it('parses every UTF-8 catalogue record', () => {
    const parsed = parsePapers(papersSource)

    expect(parsed).toHaveLength(124)
    expect(parsed[0]).toMatchObject({
      id: 1,
      title: '封裝考量之溫度分析及高可靠度之三維晶片設計',
      englishTitle: 'Package Aware Thermal Analysis and Reliable 3DIC Design',
      student: '俞浩',
      advisor: '張世杰',
      institution: '國立清華大學',
      publicationYear: 2013,
    })
  })

  it('keeps Chinese titles, English titles, and library identifiers', () => {
    const parsed = parsePapers(papersSource)

    expect(parsed.find((paper) => paper.title.includes('PIPPON'))?.englishTitle).toContain('Improve Impedance')
    expect(new Set(parsed.map((paper) => paper.handle)).size).toBe(124)
    expect(parsed.every((paper) => paper.url.startsWith('https://nthu.primo.exlibrisgroup.com/'))).toBe(true)
    expect(parsed.some((paper) => paper.publicationYear === 2002)).toBe(true)
  })
})

describe('paper taxonomy and filtering', () => {
  it('covers the complete catalogue with the four research areas', () => {
    const counts = countBy(papers.map((paper) => paper.categoryId)) as Record<PaperCategoryId, number>

    expect(papers).toHaveLength(124)
    expect(PAPER_CATEGORIES.map((category) => category.label)).toEqual([
      'AI 模型與硬體加速',
      '電源完整性與設計自動化',
      '電腦視覺與事件感知',
      '語音與音訊處理',
    ])
    expect(Object.values(counts).reduce((sum, value) => sum + value, 0)).toBe(124)
    expect(PAPER_CATEGORIES.every((category) => counts[category.id] > 0)).toBe(true)
    expect(papers.every((paper) => paper.tags.length > 0)).toBe(true)
  })

  it('does not turn Chinese prose fragments into research tags', () => {
    const tags = new Set(papers.flatMap((paper) => paper.tags))

    expect(tags).not.toContain('方法用於')
    expect(tags).not.toContain('應用於')
    expect(tags).not.toContain('之方法')
    expect(
      [...tags].every(
        (tag) =>
          !/\p{Script=Han}/u.test(tag) ||
          !/(方法用於|應用於|之方法|以及|進行)/u.test(tag),
      ),
    ).toBe(true)
  })

  it('combines category, year, tag, and normalized free-text filters', () => {
    expect(filterPapers(papers, { publicationYear: 2026 }).length).toBeGreaterThan(0)
    expect(filterPapers(papers, { query: 'chiplet' }).map((paper) => paper.title)).toContain(
      '基於深度學習的晶粒互連散射參數預測',
    )
    expect(getPapersByTag('深度學習').length).toBeGreaterThan(0)
    expect(filterPapers(papers, { publicationYearFrom: 2024, publicationYearTo: 2025 }))
      .toHaveLength(filterPapers(papers, { publicationYear: 2024 }).length + filterPapers(papers, { publicationYear: 2025 }).length)
  })
})

describe('buildWordCloudTerms', () => {
  it('keeps the generic fallback tag exceptional', () => {
    const fallbackPapers = papers.filter(
      (paper) => paper.tags.length === 1 && paper.tags[0] === 'VLSI / CAD',
    )

    expect(fallbackPapers).toHaveLength(0)
  })

  it('uses distinct-paper frequency and retains supporting paper ids', () => {
    const terms = buildWordCloudTerms(papers)
    const deepLearning = terms.find((term) => term.text === '深度學習')

    expect(deepLearning?.documentFrequency).toBeGreaterThan(0)
    expect(deepLearning?.paperIds.every((id) => papers.some((paper) => paper.id === id))).toBe(true)
  })

  it('supports category scoping and minimum document frequency', () => {
    const speechTerms = buildWordCloudTerms(papers, {
      categoryId: 'speech-audio',
      minDocumentFrequency: 2,
    })

    expect(speechTerms.length).toBeGreaterThan(0)
    expect(speechTerms.every((term) => term.documentFrequency >= 2)).toBe(true)
    expect(speechTerms.every((term) => term.categoryIds.includes('speech-audio'))).toBe(true)
  })
})
