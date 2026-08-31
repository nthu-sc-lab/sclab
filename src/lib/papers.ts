import papersSource from '../../papers.txt?raw'
import {
  PAPER_CATEGORY_BY_ID,
  PAPER_CATEGORY_IDS,
  PAPER_TAXONOMY,
  type PaperCategoryId,
} from '../data/paperTaxonomy'

export interface Paper {
  readonly id: number
  readonly title: string
  readonly student: string
  readonly advisor: string
  readonly institution: string
  readonly department: string
  readonly degree: string
  /** Republic of China academic year, as recorded in the source. */
  readonly graduationAcademicYear: number
  readonly publicationYear: number
  readonly url: string
  /** The complete persistent Handle identifier, for example `11296/jg9tzh`. */
  readonly handle: string
  readonly citations: number
  readonly views: number
  readonly rating: number
  readonly downloads: number
  readonly bookmarks: number
  readonly categoryId: PaperCategoryId
  readonly tags: readonly string[]
}

export interface PaperFilters {
  readonly categoryId?: PaperCategoryId | null
  readonly publicationYear?: number | null
  readonly graduationAcademicYear?: number | null
  readonly tag?: string | null
  readonly query?: string | null
}

export interface WordCloudOptions {
  readonly categoryId?: PaperCategoryId | null
  readonly minDocumentFrequency?: number
}

export interface PaperWordCloudTerm {
  readonly text: string
  /** Alias used by common word-cloud renderers. */
  readonly value: number
  /** Number of distinct papers containing this normalized tag. */
  readonly documentFrequency: number
  readonly paperIds: readonly number[]
  readonly categoryIds: readonly PaperCategoryId[]
}

const SOURCE_FIELD_BY_LABEL = {
  論文名稱: 'title',
  研究生: 'student',
  指導教授: 'advisor',
  校院名稱: 'institution',
  系所名稱: 'department',
  學位類別: 'degree',
  畢業學年度: 'graduationAcademicYear',
  論文出版年: 'publicationYear',
  被引用: 'citations',
  點閱: 'views',
  評分: 'rating',
  下載: 'downloads',
  書目收藏: 'bookmarks',
} as const

type SourceField = (typeof SOURCE_FIELD_BY_LABEL)[keyof typeof SOURCE_FIELD_BY_LABEL]

interface PendingPaper {
  readonly id: number
  readonly values: Partial<Record<SourceField | 'url', string>>
}

function requireValue(pending: PendingPaper, field: SourceField | 'url'): string {
  const value = pending.values[field]

  if (value === undefined || value === '') {
    throw new Error(`Paper ${pending.id} is missing required field: ${field}`)
  }

  return value
}

function parseNonNegativeInteger(value: string, field: string, paperId: number): number {
  if (!/^\d+$/.test(value)) {
    throw new Error(`Paper ${paperId} has an invalid ${field}: ${value}`)
  }

  return Number(value)
}

function parseNonNegativeNumber(value: string, field: string, paperId: number): number {
  if (!/^\d+(?:\.\d+)?$/.test(value)) {
    throw new Error(`Paper ${paperId} has an invalid ${field}: ${value}`)
  }

  return Number(value)
}

function parseHandle(url: string, paperId: number): string {
  let parsedUrl: URL

  try {
    parsedUrl = new URL(url)
  } catch {
    throw new Error(`Paper ${paperId} has an invalid URL: ${url}`)
  }

  if (parsedUrl.hostname !== 'hdl.handle.net') {
    throw new Error(`Paper ${paperId} does not use hdl.handle.net: ${url}`)
  }

  const handle = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')
  if (!handle) {
    throw new Error(`Paper ${paperId} has an empty Handle identifier`)
  }

  return handle
}

function materializePaper(pending: PendingPaper): Paper {
  const classification = PAPER_TAXONOMY[pending.id]
  if (!classification) {
    throw new Error(`Paper ${pending.id} has no curated taxonomy entry`)
  }

  const url = requireValue(pending, 'url')

  return {
    id: pending.id,
    title: requireValue(pending, 'title'),
    student: requireValue(pending, 'student'),
    advisor: requireValue(pending, 'advisor'),
    institution: requireValue(pending, 'institution'),
    department: requireValue(pending, 'department'),
    degree: requireValue(pending, 'degree'),
    graduationAcademicYear: parseNonNegativeInteger(
      requireValue(pending, 'graduationAcademicYear'),
      'graduationAcademicYear',
      pending.id,
    ),
    publicationYear: parseNonNegativeInteger(
      requireValue(pending, 'publicationYear'),
      'publicationYear',
      pending.id,
    ),
    url,
    handle: parseHandle(url, pending.id),
    citations: parseNonNegativeInteger(
      requireValue(pending, 'citations'),
      'citations',
      pending.id,
    ),
    views: parseNonNegativeInteger(requireValue(pending, 'views'), 'views', pending.id),
    rating: parseNonNegativeNumber(requireValue(pending, 'rating'), 'rating', pending.id),
    downloads: parseNonNegativeInteger(
      requireValue(pending, 'downloads'),
      'downloads',
      pending.id,
    ),
    bookmarks: parseNonNegativeInteger(
      requireValue(pending, 'bookmarks'),
      'bookmarks',
      pending.id,
    ),
    categoryId: classification.categoryId,
    tags: classification.tags,
  }
}

/**
 * Parse the UTF-8 text export into typed papers. Both CRLF and LF inputs are
 * accepted. Field names, rather than line positions, drive parsing so a colon
 * inside a paper title cannot truncate it.
 */
export function parsePapers(raw: string): Paper[] {
  const result: Paper[] = []
  const seenIds = new Set<number>()
  let pending: PendingPaper | undefined

  const finishPendingPaper = () => {
    if (!pending) return

    if (seenIds.has(pending.id)) {
      throw new Error(`Duplicate paper id: ${pending.id}`)
    }

    result.push(materializePaper(pending))
    seenIds.add(pending.id)
    pending = undefined
  }

  const lines = raw.replace(/^\uFEFF/, '').split(/\r?\n/)

  for (const sourceLine of lines) {
    const line = sourceLine.trim()
    if (!line) continue

    const recordMatch = line.match(/^第\s+(\d+)\s+筆$/u)
    if (recordMatch) {
      finishPendingPaper()
      pending = { id: Number(recordMatch[1]), values: {} }
      continue
    }

    if (!pending) {
      throw new Error(`Content appears before the first paper record: ${line}`)
    }

    const urlMatch = line.match(/^引用網址\s+(\S+)$/u)
    if (urlMatch) {
      if (pending.values.url !== undefined) {
        throw new Error(`Paper ${pending.id} repeats field: url`)
      }
      pending.values.url = urlMatch[1]
      continue
    }

    const fieldMatch = line.match(/^([^：:]+)[：:]\s*(.*)$/u)
    if (!fieldMatch) {
      throw new Error(`Paper ${pending.id} contains an unrecognized line: ${line}`)
    }

    const label = fieldMatch[1].trim() as keyof typeof SOURCE_FIELD_BY_LABEL
    const field = SOURCE_FIELD_BY_LABEL[label]
    if (!field) {
      throw new Error(`Paper ${pending.id} contains an unknown field: ${label}`)
    }
    if (pending.values[field] !== undefined) {
      throw new Error(`Paper ${pending.id} repeats field: ${field}`)
    }

    pending.values[field] = fieldMatch[2].trim()
  }

  finishPendingPaper()
  return result
}

function assertCompleteTaxonomy(source: readonly Paper[]): void {
  const sourceIds = new Set(source.map((paper) => paper.id))
  const taxonomyIds = Object.keys(PAPER_TAXONOMY).map(Number)
  const missingFromSource = taxonomyIds.filter((paperId) => !sourceIds.has(paperId))

  if (missingFromSource.length > 0) {
    throw new Error(`Taxonomy entries have no source paper: ${missingFromSource.join(', ')}`)
  }
}

export const papers: readonly Paper[] = parsePapers(papersSource)
assertCompleteTaxonomy(papers)

function normalizeForMatch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('zh-TW').replace(/\s+/g, ' ').trim()
}

/** Preserve source order while applying any combination of paper filters. */
export function filterPapers(
  source: readonly Paper[],
  filters: PaperFilters = {},
): Paper[] {
  const normalizedTag = filters.tag ? normalizeForMatch(filters.tag) : null
  const normalizedQuery = filters.query ? normalizeForMatch(filters.query) : null

  return source.filter((paper) => {
    if (filters.categoryId && paper.categoryId !== filters.categoryId) return false
    if (filters.publicationYear && paper.publicationYear !== filters.publicationYear) return false
    if (
      filters.graduationAcademicYear &&
      paper.graduationAcademicYear !== filters.graduationAcademicYear
    ) {
      return false
    }
    if (
      normalizedTag &&
      !paper.tags.some((paperTag) => normalizeForMatch(paperTag) === normalizedTag)
    ) {
      return false
    }

    if (normalizedQuery) {
      const searchableText = normalizeForMatch(
        [
          paper.title,
          paper.student,
          paper.advisor,
          paper.institution,
          paper.department,
          paper.degree,
          String(paper.graduationAcademicYear),
          String(paper.publicationYear),
          PAPER_CATEGORY_BY_ID[paper.categoryId].label,
          ...paper.tags,
        ].join(' '),
      )

      if (!searchableText.includes(normalizedQuery)) return false
    }

    return true
  })
}

export function selectPapers(filters: PaperFilters = {}): Paper[] {
  return filterPapers(papers, filters)
}

export function getPapersByCategory(
  categoryId: PaperCategoryId,
  source: readonly Paper[] = papers,
): Paper[] {
  return filterPapers(source, { categoryId })
}

export function getPapersByTag(tag: string, source: readonly Paper[] = papers): Paper[] {
  return filterPapers(source, { tag })
}

/** Build word-cloud weights using distinct-paper frequency, never view metrics. */
export function buildWordCloudTerms(
  source: readonly Paper[],
  options: WordCloudOptions = {},
): PaperWordCloudTerm[] {
  const minimum = options.minDocumentFrequency ?? 1
  if (!Number.isInteger(minimum) || minimum < 1) {
    throw new RangeError('minDocumentFrequency must be a positive integer')
  }

  const scopedPapers = options.categoryId
    ? filterPapers(source, { categoryId: options.categoryId })
    : source
  const aggregate = new Map<
    string,
    { paperIds: Set<number>; categoryIds: Set<PaperCategoryId> }
  >()

  for (const paper of scopedPapers) {
    for (const tag of new Set(paper.tags)) {
      const current = aggregate.get(tag) ?? {
        paperIds: new Set<number>(),
        categoryIds: new Set<PaperCategoryId>(),
      }
      current.paperIds.add(paper.id)
      current.categoryIds.add(paper.categoryId)
      aggregate.set(tag, current)
    }
  }

  return [...aggregate.entries()]
    .map(([text, data]): PaperWordCloudTerm => {
      const paperIds = [...data.paperIds].sort((left, right) => left - right)
      const categoryIds = PAPER_CATEGORY_IDS.filter((categoryId) =>
        data.categoryIds.has(categoryId),
      )

      return {
        text,
        value: paperIds.length,
        documentFrequency: paperIds.length,
        paperIds,
        categoryIds,
      }
    })
    .filter((term) => term.documentFrequency >= minimum)
    .sort(
      (left, right) =>
        right.documentFrequency - left.documentFrequency ||
        left.text.localeCompare(right.text, 'zh-Hant'),
    )
}

export const paperWordCloudTerms: readonly PaperWordCloudTerm[] = buildWordCloudTerms(papers)

export const paperPublicationYears: readonly number[] = [
  ...new Set(papers.map((paper) => paper.publicationYear)),
].sort((left, right) => right - left)

