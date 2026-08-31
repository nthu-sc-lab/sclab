import papersCsvSource from '../../papers.csv?raw'
import {
  PAPER_CATEGORIES,
  PAPER_CATEGORY_BY_ID,
  PAPER_CATEGORY_IDS,
  classifyPaperText,
  type PaperCategoryId,
} from '../data/paperTaxonomy'

export interface Paper {
  readonly id: number
  readonly title: string
  readonly englishTitle: string
  readonly student: string
  readonly advisor: string
  readonly institution: string
  readonly department: string
  readonly degree: string
  readonly graduationAcademicYear: number
  readonly publicationYear: number
  readonly url: string
  /** The persistent identifier extracted from the source URL. */
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

type CsvRow = readonly string[]

const CSV_COLUMNS = {
  title: 0,
  contributor: 2,
  dissertation: 5,
  subject: 6,
  otherTitle: 11,
  creationDate: 15,
  note: 22,
  url: 31,
} as const

function parseCsvRows(raw: string): CsvRow[] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  const input = raw.replace(/^\uFEFF/u, '')

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]
    const nextCharacter = input[index + 1]

    if (quoted) {
      if (character === '"' && nextCharacter === '"') {
        field += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        field += character
      }
    } else if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(field)
      field = ''
    } else if (character === '\n' || character === '\r') {
      if (character === '\r' && nextCharacter === '\n') index += 1
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += character
    }
  }

  if (field || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows
}

function clean(value: string | undefined): string {
  return (value ?? '').replace(/\s+/gu, ' ').trim()
}

function splitTitle(value: string): { title: string; englishTitle: string } {
  const normalized = clean(value).replace(/\s*\/\s*$/u, '')
  const separator = normalized.search(/\s=\s/u)

  if (separator === -1) return { title: normalized, englishTitle: '' }

  return {
    title: clean(normalized.slice(0, separator)),
    englishTitle: clean(normalized.slice(separator + 3)),
  }
}

function parseYear(value: string): number {
  const gregorianYear = value.match(/(?:19|20)\d{2}/u)?.[0]
  if (gregorianYear) return Number(gregorianYear)

  const rocYear = value.match(/民\s*(\d{2,3})/u)?.[1]
  return rocYear ? Number(rocYear) + 1911 : 0
}

function parseAcademicYear(note: string, publicationYear: number): number {
  const recordedYear = note.match(/畢業學年度\s*[:：]\s*(\d{2,3})/u)?.[1]
  if (recordedYear) return Number(recordedYear)
  return publicationYear >= 1912 ? publicationYear - 1911 : 0
}

function extractStudent(contributor: string): string {
  const advisorStart = contributor.search(/張世杰|CHANG,?\s*SHIH[- ]CHIEH/i)
  const studentPart = advisorStart >= 0 ? contributor.slice(0, advisorStart) : contributor
  return studentPart.match(/[\p{Script=Han}]{2,5}/u)?.[0]
    ?? studentPart.match(/[A-Z][a-z]+(?:[-'][A-Z][a-z]+)?/u)?.[0]
    ?? '研究生'
}

function extractDepartment(dissertation: string): string {
  const suffix = dissertation.split('國立清華大學')[1]
  return clean(suffix?.replace(/^[：:、\s-]+/u, '')) || '資訊工程學系'
}

function extractDegree(dissertation: string): string {
  if (dissertation.includes('博士')) return '博士'
  if (dissertation.includes('碩士')) return '碩士'
  if (dissertation.includes('學士')) return '學士'
  return '學位論文'
}

function parseIdentifier(url: string): string {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.pathname.replace(/^\/+|\/+$/gu, '').split('/').at(-1) ?? url
  } catch {
    return url
  }
}

function materializeCatalogRow(row: CsvRow, id: number): Paper {
  const rawTitle = clean(row[CSV_COLUMNS.title])
  const { title, englishTitle: titleEnglish } = splitTitle(rawTitle)
  const englishTitle = clean(row[CSV_COLUMNS.otherTitle])
    .replace(/[.]$/u, '') || titleEnglish
  const contributor = clean(row[CSV_COLUMNS.contributor])
  const dissertation = clean(row[CSV_COLUMNS.dissertation])
  const publicationYear = parseYear(clean(row[CSV_COLUMNS.creationDate]))
  const note = clean(row[CSV_COLUMNS.note])
  const metadata = [title, englishTitle, clean(row[CSV_COLUMNS.subject])].join(' ')
  const classification = classifyPaperText(metadata)
  const url = clean(row[CSV_COLUMNS.url])

  return {
    id,
    title,
    englishTitle,
    student: extractStudent(contributor),
    advisor: contributor.includes('張世杰') || /CHANG,?\s*SHIH[- ]CHIEH/i.test(contributor)
      ? '張世杰'
      : '張世杰',
    institution: '國立清華大學',
    department: extractDepartment(dissertation),
    degree: extractDegree(dissertation),
    graduationAcademicYear: parseAcademicYear(note, publicationYear),
    publicationYear,
    url,
    handle: parseIdentifier(url),
    citations: 0,
    views: 0,
    rating: 0,
    downloads: 0,
    bookmarks: 0,
    categoryId: classification.categoryId,
    tags: classification.tags,
  }
}

/** Parse the UTF-8 library CSV export, including quoted commas and line breaks. */
export function parseCatalogPapers(raw: string): Paper[] {
  const rows = parseCsvRows(raw)
  if (rows.length < 2 || rows[0]?.[CSV_COLUMNS.title] !== 'Title') {
    throw new Error('The catalogue CSV is missing its Title header')
  }

  return rows
    .slice(1)
    .filter((row) => clean(row[CSV_COLUMNS.title]) !== '')
    .map((row, index) => materializeCatalogRow(row, index + 1))
}

type LegacyField = 'title' | 'student' | 'advisor' | 'institution' | 'department' | 'degree'
  | 'graduationAcademicYear' | 'publicationYear' | 'citations' | 'views' | 'rating' | 'downloads' | 'bookmarks'

const LEGACY_FIELD_BY_LABEL: Readonly<Record<string, LegacyField>> = {
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
}

function parseNumber(value: string, field: string, paperId: number): number {
  if (!/^\d+(?:\.\d+)?$/u.test(value)) throw new Error(`Paper ${paperId} has an invalid ${field}: ${value}`)
  return Number(value)
}

function parseLegacyPapers(raw: string): Paper[] {
  const result: Paper[] = []
  let pending: { id: number; values: Partial<Record<LegacyField | 'url', string>> } | undefined

  const finish = () => {
    if (!pending) return
    const values = pending.values
    const required = (field: LegacyField | 'url') => {
      const value = values[field]
      if (value === undefined || value === '') throw new Error(`Paper ${pending?.id} is missing required field: ${field}`)
      return value
    }
    const classification = classifyPaperText(required('title'))
    result.push({
      id: pending.id,
      title: required('title'),
      englishTitle: '',
      student: required('student'),
      advisor: required('advisor'),
      institution: required('institution'),
      department: required('department'),
      degree: required('degree'),
      graduationAcademicYear: parseNumber(required('graduationAcademicYear'), 'graduationAcademicYear', pending.id),
      publicationYear: parseNumber(required('publicationYear'), 'publicationYear', pending.id),
      url: required('url'),
      handle: parseIdentifier(required('url')),
      citations: parseNumber(required('citations'), 'citations', pending.id),
      views: parseNumber(required('views'), 'views', pending.id),
      rating: parseNumber(required('rating'), 'rating', pending.id),
      downloads: parseNumber(required('downloads'), 'downloads', pending.id),
      bookmarks: parseNumber(required('bookmarks'), 'bookmarks', pending.id),
      categoryId: classification.categoryId,
      tags: classification.tags,
    })
    pending = undefined
  }

  for (const sourceLine of raw.replace(/^\uFEFF/u, '').split(/\r?\n/u)) {
    const line = sourceLine.trim()
    if (!line) continue
    const record = line.match(/^第\s+(\d+)\s+筆$/u)
    if (record) {
      finish()
      pending = { id: Number(record[1]), values: {} }
      continue
    }
    if (!pending) throw new Error(`Content appears before the first paper record: ${line}`)
    const url = line.match(/^引用網址\s+(\S+)$/u)
    if (url) { pending.values.url = url[1]; continue }
    const field = line.match(/^([^：:]+)[：:]\s*(.*)$/u)
    if (!field || !LEGACY_FIELD_BY_LABEL[field[1].trim()]) throw new Error(`Paper ${pending.id} contains an unrecognized line: ${line}`)
    pending.values[LEGACY_FIELD_BY_LABEL[field[1].trim()]] = field[2].trim()
  }
  finish()
  return result
}

/** Backwards-compatible parser for the earlier papers.txt export. */
export function parsePapers(raw: string): Paper[] {
  return /^Title,Vernacular Title,/u.test(raw.replace(/^\uFEFF/u, '').trim())
    ? parseCatalogPapers(raw)
    : parseLegacyPapers(raw)
}

export const papers: readonly Paper[] = parseCatalogPapers(papersCsvSource)

function normalizeForMatch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('zh-TW').replace(/\s+/gu, ' ').trim()
}

/** Preserve source order while applying any combination of paper filters. */
export function filterPapers(source: readonly Paper[], filters: PaperFilters = {}): Paper[] {
  const normalizedTag = filters.tag ? normalizeForMatch(filters.tag) : null
  const normalizedQuery = filters.query ? normalizeForMatch(filters.query) : null

  return source.filter((paper) => {
    if (filters.categoryId && paper.categoryId !== filters.categoryId) return false
    if (filters.publicationYear && paper.publicationYear !== filters.publicationYear) return false
    if (filters.graduationAcademicYear && paper.graduationAcademicYear !== filters.graduationAcademicYear) return false
    if (normalizedTag && !paper.tags.some((tag) => normalizeForMatch(tag) === normalizedTag)) return false
    if (normalizedQuery) {
      const searchableText = normalizeForMatch([
        paper.title,
        paper.englishTitle,
        paper.student,
        paper.advisor,
        paper.institution,
        paper.department,
        paper.degree,
        String(paper.graduationAcademicYear),
        String(paper.publicationYear),
        PAPER_CATEGORY_BY_ID[paper.categoryId].label,
        ...paper.tags,
      ].join(' '))
      if (!searchableText.includes(normalizedQuery)) return false
    }
    return true
  })
}

export function selectPapers(filters: PaperFilters = {}): Paper[] {
  return filterPapers(papers, filters)
}

export function getPapersByCategory(categoryId: PaperCategoryId, source: readonly Paper[] = papers): Paper[] {
  return filterPapers(source, { categoryId })
}

export function getPapersByTag(tag: string, source: readonly Paper[] = papers): Paper[] {
  return filterPapers(source, { tag })
}

/** Build word-cloud weights using distinct-paper frequency, never view metrics. */
export function buildWordCloudTerms(source: readonly Paper[], options: WordCloudOptions = {}): PaperWordCloudTerm[] {
  const minimum = options.minDocumentFrequency ?? 1
  if (!Number.isInteger(minimum) || minimum < 1) throw new RangeError('minDocumentFrequency must be a positive integer')

  const scopedPapers = options.categoryId ? filterPapers(source, { categoryId: options.categoryId }) : source
  const aggregate = new Map<string, { paperIds: Set<number>; categoryIds: Set<PaperCategoryId> }>()

  for (const paper of scopedPapers) {
    for (const tag of new Set(paper.tags)) {
      const current = aggregate.get(tag) ?? { paperIds: new Set<number>(), categoryIds: new Set<PaperCategoryId>() }
      current.paperIds.add(paper.id)
      current.categoryIds.add(paper.categoryId)
      aggregate.set(tag, current)
    }
  }

  return [...aggregate.entries()]
    .map(([text, data]): PaperWordCloudTerm => {
      const paperIds = [...data.paperIds].sort((left, right) => left - right)
      return {
        text,
        value: paperIds.length,
        documentFrequency: paperIds.length,
        paperIds,
        categoryIds: PAPER_CATEGORY_IDS.filter((categoryId) => data.categoryIds.has(categoryId)),
      }
    })
    .filter((term) => term.documentFrequency >= minimum)
    .sort((left, right) => right.documentFrequency - left.documentFrequency || left.text.localeCompare(right.text, 'zh-Hant'))
}

export const paperWordCloudTerms: readonly PaperWordCloudTerm[] = buildWordCloudTerms(papers)

export const paperPublicationYears: readonly number[] = [
  ...new Set(papers.map((paper) => paper.publicationYear).filter((year) => year > 0)),
].sort((left, right) => right - left)

export const paperCategoryCounts: Readonly<Record<PaperCategoryId, number>> = PAPER_CATEGORIES.reduce(
  (counts, category) => ({ ...counts, [category.id]: papers.filter((paper) => paper.categoryId === category.id).length }),
  {} as Record<PaperCategoryId, number>,
)

