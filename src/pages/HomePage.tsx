import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import {
  professorPhoto,
  recentResearchPeriod,
  researchAreas,
  type RecentResearchAreaId,
} from "../data/siteContent";
import { paperPublicationYears, papers } from "../lib/papers";
import { Eyebrow, RouteLink } from "../components/Shared";

const RESEARCH_ARTWORK_VARIANTS = {
  "efficient-generative-ai": 0,
  "physical-ai-robotics": 3,
  "ai-semiconductor-design": 1,
  "event-3d-vision": 2,
} satisfies Record<RecentResearchAreaId, number>;

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
      <path className="art-line art-line-soft" d="M210 24v182M55 115h310" />
      <circle className="art-focus" cx="210" cy="115" r="34" />
      <circle className="art-node" cx="210" cy="115" r="9" />
      <path
        className="art-frame"
        d="M62 55h74l38 42M62 175h74l38-42M358 55h-74l-38 42M358 175h-74l-38-42"
      />
      <path
        className="art-dash"
        d="M94 79h48M94 151h48M326 79h-48M326 151h-48"
      />
      {["62-55", "62-175", "358-55", "358-175"].map((point) => {
        const [cx, cy] = point.split("-");
        return (
          <circle className="art-node" cx={cx} cy={cy} r="7" key={point} />
        );
      })}
    </svg>
  );
}

export function HomePage() {
  const newestPublicationYear = paperPublicationYears[0] ?? "—";

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner container">
          <div className="hero-layout">
            <div className="hero-main">
              <div className="hero-copy">
                <h1>
                  <span>VLSI/CAD</span>
                  <em>Laboratory</em>
                </h1>
                <p className="hero-chinese">
                  國立清華大學資訊工程學系 · 張世杰教授研究團隊
                </p>
                <div className="hero-actions">
                  <Link className="button-primary" to="/research">
                    Research <ArrowRight size={16} />
                  </Link>
                  <Link className="button-secondary" to="/about/members">
                    Members <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-card">
                <figure className="hero-cover-photo">
                  <img
                    src={`${import.meta.env.BASE_URL}hero-research-visual.webp`}
                    alt="以半導體晶片、精密導線與運算節點構成的研究視覺"
                  />
                  <figcaption>
                    <span>VLSI / CAD RESEARCH</span>
                    <strong>AI × Semiconductor Design</strong>
                  </figcaption>
                </figure>
                <div className="hero-cover-meta">
                  <div>
                    <strong>{papers.length}</strong>
                    <span>RESEARCH RECORDS</span>
                  </div>
                  <div>
                    <strong>{newestPublicationYear}</strong>
                    <span>LATEST YEAR</span>
                  </div>
                </div>
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
            <span>
              {recentResearchPeriod.from}—{recentResearchPeriod.to}
            </span>
          </div>
          <div className="section-lead-grid">
            <h2>近年研究領域</h2>
          </div>
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <Link
                className={`research-card research-card-${index + 1}`}
                to={`/research#${area.id}`}
                key={area.id}
              >
                <div className="research-card-art">
                  <ResearchArtwork
                    variant={RESEARCH_ARTWORK_VARIANTS[area.id]}
                  />
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
            <RouteLink to="/about/advisor">View advisor profile</RouteLink>
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
              .sort(
                (left, right) =>
                  right.publicationYear - left.publicationYear ||
                  right.id - left.id,
              )
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
    </>
  );
}
