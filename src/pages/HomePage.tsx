import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { announcements } from "../data/archive";
import {
  professorPhoto,
  researchAreas,
} from "../data/siteContent";
import { paperPublicationYears, papers } from "../lib/papers";
import { Eyebrow, RouteLink } from "../components/Shared";

function ResearchArtwork({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 420 230" aria-hidden="true">
        <path
          className="art-line"
          d="M54 117 132 62l82 54 84-65 68 69M54 117l80 61 80-62 84 59 68-55"
        />
        <path
          className="art-line art-line-soft"
          d="m132 62 2 116m80-62 0 72m84-137v124"
        />
        {[
          ["54", "117"],
          ["132", "62"],
          ["134", "178"],
          ["214", "116"],
          ["214", "188"],
          ["298", "51"],
          ["298", "175"],
          ["366", "120"],
        ].map(([cx, cy]) => (
          <circle
            className="art-node"
            cx={cx}
            cy={cy}
            r="8"
            key={`${cx}-${cy}`}
          />
        ))}
        <circle className="art-focus" cx="214" cy="116" r="26" />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg viewBox="0 0 420 230" aria-hidden="true">
        <rect
          className="art-chip"
          x="132"
          y="44"
          width="156"
          height="142"
          rx="5"
        />
        <rect className="art-chip-core" x="172" y="82" width="76" height="66" />
        <path
          className="art-line"
          d="M35 71h97m156 0h97M35 115h97m156 0h97M35 159h97m156 0h97"
        />
        <path
          className="art-line art-line-soft"
          d="M160 24v20m34-20v20m34-20v20m34-20v20M160 186v20m34-20v20m34-20v20m34-20v20"
        />
        <path
          className="art-signal"
          d="M35 115h47l18-23 21 47 11-24h40l16-20 24 42 18-22h58"
        />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg viewBox="0 0 420 230" aria-hidden="true">
        <path
          className="art-frame"
          d="M66 68V39h47M307 39h47v29M66 162v29h47M307 191h47v-29"
        />
        <circle className="art-eye" cx="210" cy="115" r="72" />
        <circle className="art-focus" cx="210" cy="115" r="35" />
        <circle className="art-node" cx="210" cy="115" r="8" />
        <path className="art-line art-line-soft" d="M96 115h228M210 20v190" />
        <path
          className="art-dash"
          d="M128 63c42-35 122-35 164 0M128 167c42 35 122 35 164 0"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 420 230" aria-hidden="true">
      <path className="art-line art-line-soft" d="M36 115h348" />
      <path
        className="art-wave"
        d="M36 115h34l14-35 22 78 24-115 27 151 25-105 23 55 25-99 25 143 24-80 19 49 18-42h68"
      />
      {[65, 104, 143, 182, 221, 260, 299, 338].map((x, index) => (
        <rect
          className="art-bar"
          x={x}
          y={95 - (index % 4) * 12}
          width="8"
          height={40 + (index % 4) * 24}
          rx="4"
          key={x}
        />
      ))}
    </svg>
  );
}

export function HomePage() {
  const archiveSignals = announcements
    .filter((item) => item.category === "award")
    .slice(-3)
    .reverse();
  const newestPublicationYear = paperPublicationYears[0] ?? "—";
  const oldestPublicationYear = paperPublicationYears.at(-1) ?? "—";

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner container">
          <div className="hero-layout">
            <div className="hero-main">
              <div className="hero-identity">
                <span className="hero-identity-mark">SC</span>
                <span>
                  National Tsing Hua University
                  <br />
                  Department of Computer Science
                </span>
              </div>
              <div className="hero-copy">
                <h1>
                  <span>VLSI/CAD</span>
                  <em>Laboratory</em>
                </h1>
                <p className="hero-chinese">
                  國立清華大學資訊工程學系 · 張世杰教授研究團隊
                </p>
                <p className="hero-lead">
                  聚焦 AI 模型與硬體加速、電源完整性與設計自動化、電腦視覺與事件感知，以及語音與音訊處理。
                </p>
                <div className="hero-actions">
                  <Link className="button-primary" to="/research">
                    Research <ArrowRight size={16} />
                  </Link>
                  <Link className="button-secondary" to="/people">
                    Members <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="research-led-visual">
                <span className="research-led-visual-mark">SC</span>
                <span className="research-led-visual-line" />
                <div>
                  <strong>{papers.length}</strong>
                  <span>CATALOGUE RECORDS</span>
                </div>
                <div>
                  <strong>{oldestPublicationYear}—{newestPublicationYear}</strong>
                  <span>PUBLICATION RANGE</span>
                </div>
                <RouteLink to="/gallery">Lab gallery</RouteLink>
              </div>
            </div>
          </div>
          <div className="hero-disciplines" aria-label="Research disciplines">
            {researchAreas.map((area) => (
              <span key={area.id}>{area.title.zh}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="container">
          <div className="section-bar">
            <Eyebrow>RESEARCH AREAS</Eyebrow>
            <span>AI · EDA · VISION · AUDIO</span>
          </div>
          <div className="section-lead-grid">
            <h2>核心研究領域</h2>
          </div>
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <Link
                className={`research-card research-card-${index + 1}`}
                to={`/research#${area.id}`}
                key={area.id}
              >
                <div className="research-card-art">
                  <ResearchArtwork variant={index} />
                </div>
                <div className="research-card-content">
                  <span className="research-card-label">{area.title.zh}</span>
                  <h3 lang="en">{area.title.en}</h3>
                  <p className="research-card-summary">{area.summary.zh}</p>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
          <div className="section-link">
            <RouteLink to="/research">View research areas</RouteLink>
          </div>
        </div>
      </section>

      <section className="lab-profile section-pad">
        <div className="container lab-profile-grid">
          <figure className="home-professor-photo">
            <img
              src={professorPhoto.local}
              alt="Professor Shih-Chieh Chang"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = professorPhoto.fallback;
              }}
            />
          </figure>
          <div className="home-professor-content">
            <div className="section-bar">
              <Eyebrow>PRINCIPAL INVESTIGATOR</Eyebrow>
              <span>PROFESSOR</span>
            </div>
            <h2 lang="en">Shih-Chieh Chang</h2>
            <p className="profile-role">
              張世杰教授
              <br />
              Department of Computer Science · College of Semiconductor
              Research, NTHU
            </p>
            <p className="profile-summary">
              研究涵蓋 AI 模型與硬體加速、電源完整性與設計自動化、電腦視覺與事件感知，以及語音與音訊處理。
            </p>
            <div className="profile-facts">
              <div>
                <strong>{researchAreas.length}</strong>
                <span>RESEARCH AREAS</span>
              </div>
              <div>
                <strong>{papers.length}</strong>
                <span>THESIS RECORDS</span>
              </div>
              <div>
                <strong>NTHU</strong>
                <span>COMPUTER SCIENCE</span>
              </div>
            </div>
            <RouteLink to="/people">View profile</RouteLink>
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="container">
          <div className="section-bar">
            <Eyebrow>SELECTED PUBLICATIONS</Eyebrow>
            <span>RECENT WORK</span>
          </div>
          <div className="section-lead-grid">
            <h2>近期研究</h2>
          </div>
          <div className="paper-preview-list">
            {papers
              .slice()
              .sort((left, right) => right.publicationYear - left.publicationYear || right.id - left.id)
              .slice(0, 3)
              .map((paper) => (
              <a
                className="paper-preview"
                href={paper.url}
                target="_blank"
                rel="noreferrer"
                key={paper.id}
              >
                <span className="paper-preview-year">
                  {paper.publicationYear}
                </span>
                <div>
                  <h3>{paper.title}</h3>
                  <p>
                    {paper.englishTitle || paper.student} · {paper.department}
                  </p>
                </div>
                <ArrowUpRight size={18} />
              </a>
              ))}
          </div>
          <div className="section-link">
            <RouteLink to="/publications">Browse all publications</RouteLink>
          </div>
        </div>
      </section>

      <section className="archive-strip">
        <div className="container archive-strip-inner">
          <div>
            <div className="section-bar section-bar-dark">
              <Eyebrow>ARCHIVE</Eyebrow>
              <span>RECORDS</span>
            </div>
            <h2>歷年資料</h2>
            <p>研究專題、競賽成果與實驗室發展紀錄。</p>
          </div>
          <div className="archive-signal-list">
            {archiveSignals.map((item) => (
              <div
                className="archive-signal"
                key={`${item.date}-${item.title}`}
              >
                <time>{item.date.slice(0, 4)}</time>
                <span>{item.title}</span>
              </div>
            ))}
            <RouteLink to="/archive">Open archive</RouteLink>
          </div>
        </div>
      </section>
    </>
  );
}
