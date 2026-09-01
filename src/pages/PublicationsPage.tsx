import { memo, useCallback, useMemo, useState } from "react";
import { useWordcloud } from "@visx/wordcloud";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PageHero, SectionHeading } from "../components/Shared";
import { PAPER_CATEGORIES, PAPER_CATEGORY_BY_ID } from "../data/paperTaxonomy";
import {
  buildWordCloudTerms,
  filterPapers,
  paperPublicationYears,
  papers,
  type PaperWordCloudTerm,
} from "../lib/papers";

const PAPERS_PER_PAGE = 10;
const MAX_TOPIC_TAGS = 30;
const CLOUD_WIDTH = 940;
const CLOUD_HEIGHT = 420;
const CLOUD_ROTATIONS = [-11, -7, -4, 0, 0, 4, 7, 11] as const;
const newestYear = paperPublicationYears[0] ?? new Date().getFullYear();
const oldestYear = paperPublicationYears.at(-1) ?? newestYear;

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function cloudColor(frequency: number, maximum: number, isActive: boolean) {
  if (isActive) return "hsl(18 61% 44%)";

  const relativeFrequency = frequency / Math.max(maximum, 1);
  const lightness = 58 - relativeFrequency * 30;
  const saturation = 38 + relativeFrequency * 18;
  return `hsl(207 ${saturation.toFixed(0)}% ${lightness.toFixed(0)}%)`;
}

const ResearchWordCloud = memo(function ResearchWordCloud({
  terms,
  activeTag,
  onTagChange,
}: {
  terms: readonly PaperWordCloudTerm[];
  activeTag: string | null;
  onTagChange: (tag: string) => void;
}) {
  const maximum = terms[0]?.documentFrequency ?? 1;
  const random = useMemo(() => {
    const seed = terms.reduce(
      (total, term) =>
        total +
        term.documentFrequency * 97 +
        [...term.text].reduce(
          (sum, character) => sum + (character.codePointAt(0) ?? 0),
          0,
        ),
      2166136261,
    );
    return createSeededRandom(seed);
  }, [terms]);
  const fontSize = useCallback(
    (term: PaperWordCloudTerm) => {
      const relativeFrequency = term.documentFrequency / maximum;
      return 17 + Math.pow(relativeFrequency, 0.67) * 56;
    },
    [maximum],
  );
  const fontWeight = useCallback(
    (term: PaperWordCloudTerm) =>
      term.documentFrequency >= maximum * 0.42 ? 800 : 700,
    [maximum],
  );
  const rotate = useCallback(
    (term: PaperWordCloudTerm, index: number) => {
      const hash = [...term.text].reduce(
        (sum, character) => sum + (character.codePointAt(0) ?? 0),
        index * 17,
      );
      const angle = CLOUD_ROTATIONS[hash % CLOUD_ROTATIONS.length];

      if (term.documentFrequency >= maximum * 0.72) {
        return Math.sign(angle) * Math.min(Math.abs(angle), 4);
      }

      return angle;
    },
    [maximum],
  );
  const layoutTerms = useMemo(() => [...terms], [terms]);
  const cloudWords = useWordcloud({
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    words: layoutTerms,
    font: "Noto Sans TC, IBM Plex Sans, sans-serif",
    fontSize,
    fontWeight,
    padding: 6,
    rotate,
    spiral: "archimedean",
    random,
  });
  const termByText = useMemo(
    () => new Map(terms.map((term) => [term.text, term])),
    [terms],
  );

  return (
    <div className="topic-word-cloud" aria-label="可點選的研究主題文字雲">
      {terms.length === 0 ? (
        <p>此年份範圍沒有可用的主題標籤。</p>
      ) : (
        <svg
          viewBox={`0 0 ${CLOUD_WIDTH} ${CLOUD_HEIGHT}`}
          role="group"
          aria-label="研究主題標籤；字體越大代表相關論文越多"
        >
          <g transform={`translate(${CLOUD_WIDTH / 2} ${CLOUD_HEIGHT / 2})`}>
            {cloudWords.map((word) => {
              const text = word.text ?? "";
              const term = termByText.get(text);
              if (!term) return null;
              const isActive = activeTag === text;

              return (
                <text
                  className={`topic-cloud-word${isActive ? " active" : ""}`}
                  key={text}
                  x={word.x}
                  y={word.y}
                  fill={cloudColor(term.documentFrequency, maximum, isActive)}
                  fontFamily={word.font}
                  fontSize={word.size}
                  fontWeight={word.weight}
                  textAnchor="middle"
                  transform={`rotate(${word.rotate ?? 0}, ${word.x ?? 0}, ${word.y ?? 0})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${text}，出現在 ${term.documentFrequency} 篇論文中`}
                  onClick={() => onTagChange(text)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onTagChange(text);
                    }
                  }}
                >
                  {text}
                </text>
              );
            })}
          </g>
        </svg>
      )}
    </div>
  );
});

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  const pages = Array.from(
    { length: Math.min(5, pageCount) },
    (_, index) => start + index,
  );

  return (
    <nav className="pagination" aria-label="Publications pagination">
      <button
        type="button"
        disabled={page === 1}
        aria-label="上一頁"
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={17} aria-hidden="true" />
      </button>
      {start > 1 && <span aria-hidden="true">…</span>}
      {pages.map((pageNumber) => (
        <button
          className={pageNumber === page ? "active" : undefined}
          type="button"
          key={pageNumber}
          aria-current={pageNumber === page ? "page" : undefined}
          aria-label={`第 ${pageNumber} 頁`}
          onClick={() => onChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {pages.at(-1)! < pageCount && <span aria-hidden="true">…</span>}
      <button
        type="button"
        disabled={page === pageCount}
        aria-label="下一頁"
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight size={17} aria-hidden="true" />
      </button>
    </nav>
  );
}

export function PublicationsPage() {
  const [fromYear, setFromYear] = useState(oldestYear);
  const [toYear, setToYear] = useState(newestYear);
  const [tag, setTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const cloudScope = useMemo(
    () =>
      filterPapers(papers, {
        publicationYearFrom: fromYear,
        publicationYearTo: toYear,
      }),
    [fromYear, toYear],
  );

  const cloudTerms = useMemo(
    () =>
      buildWordCloudTerms(papers, {
        publicationYearFrom: fromYear,
        publicationYearTo: toYear,
      }).slice(0, MAX_TOPIC_TAGS),
    [fromYear, toYear],
  );

  const visiblePapers = useMemo(
    () =>
      filterPapers(papers, {
        publicationYearFrom: fromYear,
        publicationYearTo: toYear,
        tag,
        query,
      })
        .slice()
        .sort(
          (left, right) =>
            right.publicationYear - left.publicationYear ||
            right.graduationAcademicYear - left.graduationAcademicYear ||
            right.id - left.id,
        ),
    [fromYear, query, tag, toYear],
  );

  const pageCount = Math.max(
    1,
    Math.ceil(visiblePapers.length / PAPERS_PER_PAGE),
  );
  const pagedPapers = visiblePapers.slice(
    (page - 1) * PAPERS_PER_PAGE,
    page * PAPERS_PER_PAGE,
  );

  const clearFilters = () => {
    setFromYear(oldestYear);
    setToYear(newestYear);
    setTag(null);
    setQuery("");
    setPage(1);
  };

  const hasFilters = Boolean(
    tag || query || fromYear !== oldestYear || toYear !== newestYear,
  );

  const handleTagChange = useCallback((nextTag: string) => {
    setTag((current) => (current === nextTag ? null : nextTag));
    setPage(1);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="PUBLICATIONS"
        title="研究成果"
        english="Research Publications"
        description="團隊近年論文成果。"
      />

      <section className="section-pad">
        <div className="container">
          <div className="publication-summary">
            <div className="stat-card">
              <strong>{papers.length}</strong>
              <span>收錄論文</span>
            </div>
            <div className="stat-card">
              <strong>{paperPublicationYears.length}</strong>
              <span>出版年份</span>
            </div>
            <div className="stat-card">
              <strong>{PAPER_CATEGORIES.length}</strong>
              <span>研究領域</span>
            </div>
            <div className="stat-card">
              <strong>
                {new Set(papers.flatMap((paper) => paper.tags)).size}
              </strong>
              <span>主題標籤</span>
            </div>
          </div>

          <div className="keyword-index">
            <div className="keyword-index-header">
              <SectionHeading
                title="研究主題"
                english="Research Topics"
                description=""
              />
              <span className="keyword-index-count">
                {cloudTerms.length} TERMS
              </span>
            </div>

            <div className="topic-toolbar">
              <div className="topic-scope" aria-label="研究主題範圍"></div>

              <div className="cloud-year-range" aria-label="文字雲年份範圍">
                <span>YEAR RANGE</span>
                <label>
                  <span className="visually-hidden">起始年份</span>
                  <select
                    aria-label="起始年份"
                    value={fromYear}
                    onChange={(event) => {
                      const nextYear = Number(event.target.value);
                      setFromYear(nextYear);
                      if (nextYear > toYear) setToYear(nextYear);
                      setTag(null);
                      setPage(1);
                    }}
                  >
                    {[...paperPublicationYears]
                      .reverse()
                      .map((publicationYear) => (
                        <option key={publicationYear} value={publicationYear}>
                          {publicationYear}
                        </option>
                      ))}
                  </select>
                </label>
                <span aria-hidden="true">—</span>
                <label>
                  <span className="visually-hidden">結束年份</span>
                  <select
                    aria-label="結束年份"
                    value={toYear}
                    onChange={(event) => {
                      const nextYear = Number(event.target.value);
                      setToYear(nextYear);
                      if (nextYear < fromYear) setFromYear(nextYear);
                      setTag(null);
                      setPage(1);
                    }}
                  >
                    {paperPublicationYears.map((publicationYear) => (
                      <option key={publicationYear} value={publicationYear}>
                        {publicationYear}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <ResearchWordCloud
              terms={cloudTerms}
              activeTag={tag}
              onTagChange={handleTagChange}
            />
            <div className="topic-cloud-footer">
              <span>{cloudScope.length} PAPERS IN RANGE</span>
            </div>
          </div>

          <div className="publication-controls publication-controls-compact">
            <div className="control-field">
              <label htmlFor="paper-search">Search</label>
              <div className="search-input-wrap">
                <Search size={16} aria-hidden="true" />
                <input
                  id="paper-search"
                  value={query}
                  placeholder="論文題目、姓名或主題"
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
            <button
              className="clear-button"
              type="button"
              disabled={!hasFilters}
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>

          <div className="result-bar" aria-live="polite">
            <span>
              顯示 {visiblePapers.length} / {papers.length} 篇論文 · 第 {page} /{" "}
              {pageCount} 頁
            </span>
            {tag && <span className="selected-filter">FILTER / {tag}</span>}
          </div>

          {visiblePapers.length === 0 ? (
            <div className="empty-state">
              沒有符合條件的論文，請調整篩選條件。
            </div>
          ) : (
            <>
              <div className="paper-list">
                {pagedPapers.map((paper, index) => (
                  <article className="paper-card" key={paper.id}>
                    <span className="paper-number">
                      #
                      {String(
                        (page - 1) * PAPERS_PER_PAGE + index + 1,
                      ).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="topic-pill">
                        {PAPER_CATEGORY_BY_ID[paper.categoryId].label}
                      </span>
                      <h3>{paper.title}</h3>
                      {paper.englishTitle && (
                        <p className="paper-english-title" lang="en">
                          {paper.englishTitle}
                        </p>
                      )}
                      <div className="paper-meta">
                        <span>{paper.student}</span>
                        <span>{paper.publicationYear}</span>
                        <span>{paper.department}</span>
                        <span>學年度 {paper.graduationAcademicYear}</span>
                      </div>
                      <div className="paper-tags">
                        {paper.tags.map((paperTag) => (
                          <span key={paperTag}>{paperTag}</span>
                        ))}
                      </div>
                    </div>
                    <a
                      className="paper-action"
                      href={paper.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`開啟 ${paper.title} 的正式論文頁`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </article>
                ))}
              </div>
              <Pagination
                page={page}
                pageCount={pageCount}
                onChange={(nextPage) => {
                  setPage(nextPage);
                  document
                    .querySelector(".result-bar")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
