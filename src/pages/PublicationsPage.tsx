import { useMemo, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
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

export function PublicationsPage() {
  const [categoryId, setCategoryId] = useState<PaperCategoryId | null>(null)
  const [year, setYear] = useState<number | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const cloudTerms = useMemo(
    () => buildWordCloudTerms(papers, { categoryId }),
    [categoryId],
  )

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
        eyebrow="PUBLICATIONS · 2022–2025"
        title="用題目看見研究的連結"
        english="Explore recent theses by topic"
        description="目前收錄 papers.txt 中 20 篇碩士論文。文字雲權重依含該標籤的論文篇數計算，不使用點閱或下載數。"
      />

      <section className="section-pad">
        <div className="container">
          <div className="publication-summary">
            <div className="stat-card"><strong>{papers.length}</strong><span>收錄論文 Collected theses</span></div>
            <div className="stat-card"><strong>{paperPublicationYears.length}</strong><span>出版年度 Publication years</span></div>
            <div className="stat-card"><strong>{PAPER_CATEGORIES.length}</strong><span>主要領域 Primary fields</span></div>
            <div className="stat-card"><strong>{new Set(papers.flatMap((paper) => paper.tags)).size}</strong><span>正規化標籤 Curated tags</span></div>
          </div>

          <div className="cloud-panel">
            <SectionHeading
              eyebrow="INTERACTIVE WORD CLOUD"
              title="研究文字雲"
              english="Click a term to filter the thesis list"
              description="先選領域切換文字雲，再點擊關鍵詞；所有篩選條件會同步套用到下方論文清單。"
            />
            <div className="topic-tabs" aria-label="Research categories">
              <button
                className={!categoryId ? 'topic-tab active' : 'topic-tab'}
                type="button"
                onClick={() => { setCategoryId(null); setTag(null) }}
              >
                全部 All
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

            <div className="word-cloud" aria-label="Clickable research term cloud">
              {cloudTerms.map((term, index) => (
                <button
                  key={term.text}
                  className={tag === term.text ? 'cloud-word active' : 'cloud-word'}
                  type="button"
                  style={{ '--weight': term.value, '--rank': index } as CSSProperties}
                  aria-pressed={tag === term.text}
                  aria-label={`${term.text}，${term.documentFrequency} 篇論文`}
                  onClick={() => setTag((current) => current === term.text ? null : term.text)}
                >
                  {term.text}
                </button>
              ))}
            </div>
          </div>

          <div className="publication-controls">
            <div className="control-field">
              <label htmlFor="paper-search">搜尋 Search</label>
              <div style={{ position: 'relative' }}>
                <Search size={17} style={{ position: 'absolute', top: 16, left: 14, color: '#698087' }} />
                <input
                  id="paper-search"
                  value={query}
                  style={{ paddingLeft: 42 }}
                  placeholder="題目、姓名或關鍵詞"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="control-field">
              <label htmlFor="paper-category">領域 Field</label>
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
              <label htmlFor="paper-year">年份 Year</label>
              <select id="paper-year" value={year ?? ''} onChange={(event) => setYear(event.target.value ? Number(event.target.value) : null)}>
                <option value="">全部年份</option>
                {paperPublicationYears.map((publicationYear) => <option key={publicationYear} value={publicationYear}>{publicationYear}</option>)}
              </select>
            </div>
            <button className="clear-button" type="button" disabled={!hasFilters} onClick={clearFilters}>清除 Clear</button>
          </div>

          <div className="result-bar" aria-live="polite">
            <span>顯示 {visiblePapers.length} / {papers.length} 篇論文</span>
            {tag && <span className="selected-filter">TAG / {tag}</span>}
          </div>

          {visiblePapers.length === 0 ? (
            <div className="empty-state">沒有符合條件的論文。請調整篩選或清除條件。</div>
          ) : (
            <div className="paper-list">
              {visiblePapers.map((paper) => (
                <article className="paper-card" key={paper.id}>
                  <span className="paper-number">#{String(paper.id).padStart(2, '0')}</span>
                  <div>
                    <span className="topic-pill">{PAPER_CATEGORY_BY_ID[paper.categoryId].label}</span>
                    <h3 style={{ marginTop: 14 }}>{paper.title}</h3>
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
                    <ArrowUpRight size={19} />
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
