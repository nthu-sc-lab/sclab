import { useMemo, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { useWordcloud } from '@visx/wordcloud'
import { PageHero, SectionHeading } from '../components/Shared'
import {
  PAPER_CATEGORIES,
  PAPER_CATEGORY_BY_ID,
  type PaperCategoryId,
} from '../data/paperTaxonomy'
import {
  buildWordCloudTerms,
  filterPapers,
  paperPublicationYears,
  papers,
} from '../lib/papers'

const CLOUD_COLOR_BY_CATEGORY: Readonly<Record<PaperCategoryId, string>> = {
  'ai-acceleration': '#17324d',
  'eda-power-integrity': '#557b9b',
  'computer-vision': '#647f76',
  'speech-audio': '#98634f',
}

const CLOUD_WIDTH = 980
const CLOUD_HEIGHT = 580

function getCloudFontSize(word: { value: number }) {
  return 20 + Math.min(word.value, 6) * 6
}

function getCloudFontWeight(word: { value: number }) {
  return word.value > 3 ? 700 : word.value > 1 ? 600 : 500
}

function createCloudRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function PublicationsPage() {
  const [categoryId, setCategoryId] = useState<PaperCategoryId | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const cloudTerms = useMemo(
    () => buildWordCloudTerms(papers, { categoryId }),
    [categoryId],
  )

  const cloudTermByText = useMemo(
    () => new Map(cloudTerms.map((term) => [term.text, term])),
    [cloudTerms],
  )

  const cloudSeed = categoryId
    ? PAPER_CATEGORIES.findIndex((category) => category.id === categoryId) + 101
    : 47
  const cloudRandom = useMemo(() => createCloudRandom(cloudSeed), [cloudSeed])
  const cloudWords = useWordcloud({
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    words: cloudTerms,
    font: 'IBM Plex Sans',
    fontSize: getCloudFontSize,
    fontWeight: getCloudFontWeight,
    padding: 8,
    rotate: 0,
    spiral: 'archimedean',
    random: cloudRandom,
  })

  const visiblePapers = useMemo(
    () => filterPapers(papers, { categoryId, publicationYear: year, tag, query }),
    [categoryId, query, tag, year],
  )

  const clearFilters = () => {
    setCategoryId(null)
    setYear(null)
    setTag(null)
    setQuery('')
  }

  const hasFilters = Boolean(categoryId || year || tag || query)

  return (
    <>
      <PageHero
        eyebrow="PUBLICATIONS"
        title="研究成果"
        english="Research Publications"
        description={`依據 papers.csv 彙整 ${papers.length} 筆研究紀錄，涵蓋 AI 模型與硬體加速、電源完整性與設計自動化、電腦視覺與事件感知，以及語音與音訊處理。`}
      />

      <section className="section-pad">
        <div className="container">
          <div className="publication-summary">
            <div className="stat-card"><strong>{papers.length}</strong><span>收錄論文</span></div>
            <div className="stat-card"><strong>{paperPublicationYears.length}</strong><span>出版年份</span></div>
            <div className="stat-card"><strong>{PAPER_CATEGORIES.length}</strong><span>研究領域</span></div>
            <div className="stat-card"><strong>{new Set(papers.flatMap((paper) => paper.tags)).size}</strong><span>主題標籤</span></div>
          </div>

          <div className="keyword-index">
            <div className="keyword-index-header">
              <SectionHeading title="研究主題" english="Research Topics" />
              <span className="keyword-index-count">{cloudTerms.length} TERMS</span>
            </div>
            <div className="topic-tabs" aria-label="Research categories">
              <button
                className={!categoryId ? 'topic-tab active' : 'topic-tab'}
                type="button"
                onClick={() => { setCategoryId(null); setTag(null) }}
              >
                全部領域
              </button>
              {PAPER_CATEGORIES.map((category) => (
                <button
                  className={categoryId === category.id ? 'topic-tab active' : 'topic-tab'}
                  key={category.id}
                  type="button"
                  onClick={() => { setCategoryId(category.id); setTag(null) }}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="word-cloud" aria-label="Clickable research topic index">
              <svg
                className="word-cloud-svg"
                viewBox={`0 0 ${CLOUD_WIDTH} ${CLOUD_HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                role="group"
                aria-label="Research topic cloud"
              >
                <g transform={`translate(${CLOUD_WIDTH / 2} ${CLOUD_HEIGHT / 2})`}>
                    <g className="cloud-decoration" aria-hidden="true">
                      <ellipse className="cloud-orbit cloud-orbit-outer" cx="0" cy="0" rx="430" ry="238" />
                      <ellipse className="cloud-orbit cloud-orbit-inner" cx="0" cy="0" rx="300" ry="158" />
                      <path className="cloud-axis" d="M-420 0H420M0-230V230" />
                      <circle className="cloud-node cloud-node-a" cx="-400" cy="0" r="4" />
                      <circle className="cloud-node cloud-node-b" cx="0" cy="-214" r="4" />
                      <circle className="cloud-node cloud-node-c" cx="400" cy="0" r="4" />
                      <circle className="cloud-node cloud-node-d" cx="0" cy="214" r="4" />
                    </g>
                    <g>
                      {cloudWords.map((word, index) => {
                        if (!word.text) return null
                        const wordText = word.text
                        const term = cloudTermByText.get(wordText)
                        const frequency = term?.documentFrequency ?? 1
                        const isActive = word.text === tag
                        const singleCategory = term?.categoryIds.length === 1 ? term.categoryIds[0] : null
                        const color = isActive
                          ? '#af7458'
                          : singleCategory
                            ? CLOUD_COLOR_BY_CATEGORY[singleCategory]
                            : '#17324d'
                        const prominence = frequency >= 4 ? 'major' : frequency >= 2 ? 'medium' : 'minor'
                        const motionStyle = {
                          animationDelay: `${index * 36}ms`,
                        } as CSSProperties
                        return (
                          <g
                            className="cloud-word-position"
                            key={`${word.text}-${index}`}
                            transform={`translate(${word.x ?? 0}, ${word.y ?? 0}) rotate(${word.rotate ?? 0})`}
                          >
                            <g className="cloud-word-motion" style={motionStyle}>
                              <text
                                className={`cloud-word cloud-word-${prominence}${isActive ? ' active' : ''}`}
                                textAnchor="middle"
                                fill={color}
                                fontSize={word.size}
                                fontFamily="IBM Plex Sans, Noto Sans TC, sans-serif"
                                fontWeight={word.weight ?? 500}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isActive}
                                aria-label={`${word.text}，${frequency} 篇論文，點擊以篩選`}
                                onClick={() => setTag((current) => current === wordText ? null : wordText)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    setTag((current) => current === wordText ? null : wordText)
                                  }
                                }}
                              >
                                {word.text}
                              </text>
                            </g>
                          </g>
                        )
                      })}
                    </g>
                </g>
              </svg>
            </div>
          </div>

          <div className="publication-controls">
            <div className="control-field">
              <label htmlFor="paper-search">Search</label>
              <div className="search-input-wrap">
                <Search size={16} aria-hidden="true" />
                <input
                  id="paper-search"
                  value={query}
                  placeholder="論文題目、姓名或主題"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="control-field">
              <label htmlFor="paper-category">Research area</label>
              <select
                id="paper-category"
                value={categoryId ?? ''}
                onChange={(event) => {
                  setCategoryId((event.target.value || null) as PaperCategoryId | null)
                  setTag(null)
                }}
              >
                <option value="">全部領域</option>
                {PAPER_CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
              </select>
            </div>
            <div className="control-field">
              <label htmlFor="paper-year">Year</label>
              <select id="paper-year" value={year ?? ''} onChange={(event) => setYear(event.target.value ? Number(event.target.value) : null)}>
                <option value="">全部年份</option>
                {paperPublicationYears.map((publicationYear) => <option key={publicationYear} value={publicationYear}>{publicationYear}</option>)}
              </select>
            </div>
            <button className="clear-button" type="button" disabled={!hasFilters} onClick={clearFilters}>Clear</button>
          </div>

          <div className="result-bar" aria-live="polite">
            <span>顯示 {visiblePapers.length} / {papers.length} 篇論文</span>
            {tag && <span className="selected-filter">FILTER / {tag}</span>}
          </div>

          {visiblePapers.length === 0 ? (
            <div className="empty-state">沒有符合條件的論文，請調整篩選條件。</div>
          ) : (
            <div className="paper-list">
              {visiblePapers.map((paper) => (
                <article className="paper-card" key={paper.id}>
                  <span className="paper-number">#{String(paper.id).padStart(2, '0')}</span>
                  <div>
                    <span className="topic-pill">{PAPER_CATEGORY_BY_ID[paper.categoryId].label}</span>
                    <h3>{paper.title}</h3>
                    {paper.englishTitle && <p className="paper-english-title" lang="en">{paper.englishTitle}</p>}
                    <div className="paper-meta">
                      <span>{paper.student}</span>
                      <span>{paper.publicationYear}</span>
                      <span>{paper.department}</span>
                      <span>學年度 {paper.graduationAcademicYear}</span>
                    </div>
                    <div className="paper-tags">
                      {paper.tags.map((paperTag) => <span key={paperTag}>{paperTag}</span>)}
                    </div>
                  </div>
                  <a className="paper-action" href={paper.url} target="_blank" rel="noreferrer" aria-label={`開啟 ${paper.title} 的正式論文頁`}>
                    <ArrowUpRight size={18} />
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
