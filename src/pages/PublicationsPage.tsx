import {
  memo,
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
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

type CloudLanguage = "en" | "zh";

const CLOUD_TERM_ENGLISH: Readonly<Record<string, string>> = {
  "AI 模型": "AI Models",
  深度學習: "Deep Learning",
  機器學習: "Machine Learning",
  神經網路: "Neural Networks",
  分佈偏移: "Distribution Shift",
  語言模型: "Language Models",
  知識檢索: "Knowledge Retrieval",
  對話系統: "Dialogue Systems",
  物理資訊神經算子: "Physics-Informed Neural Operators",
  機器人抓取: "Robotic Grasping",
  大型語言模型: "Large Language Models",
  模型壓縮: "Model Compression",
  量化: "Quantization",
  神經架構搜尋: "Neural Architecture Search",
  圖神經網路: "Graph Neural Networks",
  記憶體內運算: "Computing-in-Memory",
  電源完整性: "Power Integrity",
  電源分佈網路: "Power Distribution Networks",
  動態壓降: "Dynamic IR Drop",
  動態電壓調節: "Dynamic Voltage Scaling",
  時序分析: "Timing Analysis",
  時脈樹: "Clock Trees",
  封裝與3D晶片: "3D IC & Packaging",
  設計自動化: "Design Automation",
  可靠度: "Reliability",
  電路老化: "Circuit Aging",
  硬體驗證: "Hardware Verification",
  快取一致性: "Cache Coherence",
  片上匯流排: "On-Chip Buses",
  電腦視覺: "Computer Vision",
  事件相機: "Event Cameras",
  深度估計: "Depth Estimation",
  "3D 人體建模": "3D Human Modeling",
  影像辨識: "Image Recognition",
  步態辨識: "Gait Recognition",
  動作估計: "Motion Estimation",
  "語音 AI": "Speech AI",
  關鍵字偵測: "Keyword Spotting",
  語音活動偵測: "Voice Activity Detection",
  語音增強: "Speech Enhancement",
  低功耗: "Low-Power Design",
  強化學習: "Reinforcement Learning",
  邏輯合成: "Logic Synthesis",
  時序變異: "Timing Variation",
  硬體加速: "Hardware Acceleration",
  睡眠電晶體: "Sleep Transistors",
  堆疊式晶片: "Stacked-Die Design",
  最大瞬間電流: "Peak Current",
  電源門控: "Power Gating",
  字串比對: "String Matching",
  軟錯誤容忍: "Soft-Error Tolerance",
  熱感知設計: "Thermal-Aware Design",
  工程變更: "Engineering Change Orders",
  元件庫生成: "Cell Library Generation",
  多核心系統: "Multi-Core Systems",
  矽穿孔: "Through-Silicon Vias",
  漏電流: "Leakage Current",
  時脈偏移: "Clock Skew",
  中介層: "Interposers",
  步態: "Gait Analysis",
  測試: "Testing",
  快取: "Cache",
  卷積神經網路: "Convolutional Neural Networks",
  捲積神經網路: "Convolutional Neural Networks",
} as const;

const CLOUD_TERM_CHINESE = new Map(
  Object.entries(CLOUD_TERM_ENGLISH).map(([chinese, english]) => [
    english,
    chinese,
  ]),
);

function localizeCloudTerms(
  terms: readonly PaperWordCloudTerm[],
  language: CloudLanguage,
): PaperWordCloudTerm[] {
  if (language === "zh") return [...terms];

  const localized = new Map<string, PaperWordCloudTerm>();

  terms.forEach((term) => {
    const text =
      CLOUD_TERM_ENGLISH[term.text] ??
      (!/\p{Script=Han}/u.test(term.text) ? term.text : null);
    if (!text) return;

    const existing = localized.get(text);
    const paperIds = [
      ...new Set([...(existing?.paperIds ?? []), ...term.paperIds]),
    ].sort((left, right) => left - right);
    const categoryIds = [
      ...new Set([...(existing?.categoryIds ?? []), ...term.categoryIds]),
    ];

    localized.set(text, {
      text,
      value: paperIds.length,
      documentFrequency: paperIds.length,
      paperIds,
      categoryIds,
    });
  });

  return [...localized.values()].sort(
    (left, right) =>
      right.documentFrequency - left.documentFrequency ||
      left.text.localeCompare(right.text, "en"),
  );
}

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
  language,
  onTagChange,
}: {
  terms: readonly PaperWordCloudTerm[];
  activeTag: string | null;
  language: CloudLanguage;
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
      const baseSize = language === "en" ? 15 : 16;
      const growth = language === "en" ? 40 : 50;
      const lengthScale =
        language === "en"
          ? Math.max(0.62, Math.min(1, Math.sqrt(14 / term.text.length)))
          : 1;

      return (
        (baseSize + Math.pow(relativeFrequency, 0.67) * growth) * lengthScale
      );
    },
    [language, maximum],
  );
  const fontWeight = useCallback(
    (term: PaperWordCloudTerm) =>
      term.documentFrequency >= maximum * 0.42 ? 800 : 700,
    [maximum],
  );
  const rotate = useCallback(
    (term: PaperWordCloudTerm, index: number) => {
      const rotations =
        language === "en" ? [-6, -4, 0, 0, 0, 4, 6] : CLOUD_ROTATIONS;
      const hash = [...term.text].reduce(
        (sum, character) => sum + (character.codePointAt(0) ?? 0),
        index * 17,
      );
      const angle = rotations[hash % rotations.length];

      if (term.documentFrequency >= maximum * 0.72) {
        return Math.sign(angle) * Math.min(Math.abs(angle), 4);
      }

      return angle;
    },
    [language, maximum],
  );
  const layoutTerms = useMemo(() => [...terms], [terms]);
  const cloudWords = useWordcloud({
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    words: layoutTerms,
    font:
      language === "en"
        ? "IBM Plex Sans, sans-serif"
        : "Noto Sans TC, IBM Plex Sans, sans-serif",
    fontSize,
    fontWeight,
    padding: language === "en" ? 7 : 9,
    rotate,
    spiral: "archimedean",
    random,
  });
  const termByText = useMemo(
    () => new Map(terms.map((term) => [term.text, term])),
    [terms],
  );

  return (
    <div
      className="topic-word-cloud"
      aria-label={
        language === "en"
          ? "Interactive research topic word cloud"
          : "可點選的研究主題文字雲"
      }
    >
      {terms.length === 0 ? (
        <p>
          {language === "en"
            ? "No topic terms are available for this year range."
            : "此年份範圍沒有可用的主題標籤。"}
        </p>
      ) : (
        <svg
          viewBox={`0 0 ${CLOUD_WIDTH} ${CLOUD_HEIGHT}`}
          role="group"
          aria-label={
            language === "en"
              ? "Thesis topics; larger terms appear in more theses"
              : "研究主題標籤；字體越大代表相關論文越多"
          }
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
                  aria-label={
                    language === "en"
                      ? `${text}, appears in ${term.documentFrequency} theses`
                      : `${text}，出現在 ${term.documentFrequency} 篇論文中`
                  }
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
    <nav
      className="pagination"
      aria-label="Theses and dissertations pagination"
    >
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
  const [cloudLanguage, setCloudLanguage] = useState<CloudLanguage>("en");
  const [tag, setTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const yearSpan = Math.max(newestYear - oldestYear, 1);
  const yearRangeStyle = {
    "--range-start": `${((fromYear - oldestYear) / yearSpan) * 100}%`,
    "--range-end": `${100 - ((toYear - oldestYear) / yearSpan) * 100}%`,
  } as CSSProperties;

  const cloudScope = useMemo(
    () =>
      filterPapers(papers, {
        publicationYearFrom: fromYear,
        publicationYearTo: toYear,
      }),
    [fromYear, toYear],
  );

  const cloudTerms = useMemo(() => {
    const terms = buildWordCloudTerms(papers, {
      publicationYearFrom: fromYear,
      publicationYearTo: toYear,
    });

    return localizeCloudTerms(terms, cloudLanguage).slice(0, MAX_TOPIC_TAGS);
  }, [cloudLanguage, fromYear, toYear]);

  const activeCloudTag = tag
    ? cloudLanguage === "en"
      ? (CLOUD_TERM_ENGLISH[tag] ?? tag)
      : tag
    : null;

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

  const handleTagChange = useCallback(
    (nextTag: string) => {
      const sourceTag =
        cloudLanguage === "en"
          ? (CLOUD_TERM_CHINESE.get(nextTag) ?? nextTag)
          : nextTag;
      setTag((current) => (current === sourceTag ? null : sourceTag));
      setPage(1);
    },
    [cloudLanguage],
  );

  return (
    <>
      <PageHero
        eyebrow="學位論文"
        title="Theses & Dissertations"
        description="實驗室歷年博碩士學位論文與研究主題。"
      />

      <section className="section-pad">
        <div className="container">
          <div className="publication-summary">
            <div className="stat-card">
              <strong>{papers.length}</strong>
              <span>收錄學位論文</span>
            </div>
            <div className="stat-card">
              <strong>{paperPublicationYears.length}</strong>
              <span>論文年份</span>
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
                eyebrow="研究主題"
                title="Themes"
                description=""
              />
              <span className="keyword-index-count">
                {cloudTerms.length} TERMS
              </span>
            </div>

            <div className="topic-toolbar">
              <div className="cloud-language-control" aria-label="文字雲語言">
                <span>LANGUAGE</span>
                <div role="group" aria-label="Word cloud language">
                  <button
                    className={cloudLanguage === "en" ? "active" : undefined}
                    type="button"
                    aria-pressed={cloudLanguage === "en"}
                    onClick={() => {
                      setCloudLanguage("en");
                      setTag(null);
                      setPage(1);
                    }}
                  >
                    English
                  </button>
                  <button
                    className={cloudLanguage === "zh" ? "active" : undefined}
                    type="button"
                    aria-pressed={cloudLanguage === "zh"}
                    onClick={() => {
                      setCloudLanguage("zh");
                      setTag(null);
                      setPage(1);
                    }}
                  >
                    中文
                  </button>
                </div>
              </div>

              <div className="cloud-year-range" aria-label="文字雲年份範圍">
                <div className="cloud-year-range-heading">
                  <span>YEAR RANGE</span>
                  <output
                    htmlFor="cloud-year-start cloud-year-end"
                    aria-live="polite"
                  >
                    <strong>{fromYear}</strong>
                    <span aria-hidden="true">—</span>
                    <strong>{toYear}</strong>
                  </output>
                </div>
                <div className="year-range-slider" style={yearRangeStyle}>
                  <div className="year-range-track" aria-hidden="true">
                    <span />
                  </div>
                  <input
                    id="cloud-year-start"
                    className="year-range-input year-range-input-start"
                    type="range"
                    min={oldestYear}
                    max={newestYear}
                    step="1"
                    value={fromYear}
                    aria-label="起始年份"
                    aria-valuetext={`${fromYear} 年`}
                    onChange={(event) => {
                      setFromYear(Math.min(Number(event.target.value), toYear));
                      setTag(null);
                      setPage(1);
                    }}
                  />
                  <input
                    id="cloud-year-end"
                    className="year-range-input year-range-input-end"
                    type="range"
                    min={oldestYear}
                    max={newestYear}
                    step="1"
                    value={toYear}
                    aria-label="結束年份"
                    aria-valuetext={`${toYear} 年`}
                    onChange={(event) => {
                      setToYear(Math.max(Number(event.target.value), fromYear));
                      setTag(null);
                      setPage(1);
                    }}
                  />
                </div>
                <div className="year-range-limits" aria-hidden="true">
                  <span>{oldestYear}</span>
                  <span>{newestYear}</span>
                </div>
              </div>
            </div>

            <ResearchWordCloud
              terms={cloudTerms}
              activeTag={activeCloudTag}
              language={cloudLanguage}
              onTagChange={handleTagChange}
            />
            <div className="topic-cloud-footer">
              <span>{cloudScope.length} THESES IN RANGE</span>
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
                  placeholder="學位論文題目、姓名或主題"
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
              顯示 {visiblePapers.length} / {papers.length} 篇學位論文 · 第{" "}
              {page} / {pageCount} 頁
            </span>
            {tag && (
              <span className="selected-filter">FILTER / {activeCloudTag}</span>
            )}
          </div>

          {visiblePapers.length === 0 ? (
            <div className="empty-state">
              沒有符合條件的學位論文，請調整篩選條件。
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
                      aria-label={`開啟 ${paper.title} 的學位論文典藏頁`}
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
