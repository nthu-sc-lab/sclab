import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { professorPhoto, researchAreas } from "../data/siteContent";
import { paperPublicationYears, papers } from "../lib/papers";
import { RouteLink } from "../components/Shared";

export function HomePage() {
  const newestPublicationYear = paperPublicationYears[0] ?? "—";

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner container">
          <div className="hero-layout">
            <div className="hero-main">
              <div className="hero-copy">
                <p className="hero-kicker">
                  <span>SC LAB</span>
                  NTHU
                </p>
                <h1 lang="en">
                  <span>VLSI / CAD</span>
                  <em>Laboratory</em>
                </h1>
                <p className="hero-chinese">
                  國立清華大學資訊工程學系 · 張世杰教授研究團隊
                </p>
                <div
                  className="hero-recruitment"
                  aria-label="NTHU programs for prospective students"
                >
                  <ul>
                    <li>
                      <strong>CS</strong>
                      {/* <span>Department of Computer Science</span> */}
                      <small>資訊工程學系</small>
                    </li>
                    <li>
                      <strong>ISA</strong>
                      <span>
                        {/* Institute of Information Systems &amp; Applications */}
                      </span>
                      <small>資訊系統與應用研究所</small>
                    </li>
                    <li>
                      <strong>CoSR</strong>
                      {/* <span>College of Semiconductor Research</span> */}
                      <small>半導體研究學院</small>
                    </li>
                  </ul>
                </div>
                <div className="hero-actions">
                  <Link className="button-primary" to="/research">
                    Explore Research <ArrowRight size={16} />
                  </Link>
                  <Link className="button-secondary" to="/contact">
                    Contact Us <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo-card">
                <figure className="hero-cover-photo">
                  <img
                    src={`${import.meta.env.BASE_URL}hero-research-illustration.jpg`}
                    alt="以晶片平面規劃、導線與神經網路節點構成的抽象研究插畫"
                  />
                  <figcaption>
                    <span>RESEARCH AT SC LAB</span>
                    <strong>From Algorithms To Silicon</strong>
                  </figcaption>
                </figure>
                <div className="hero-cover-meta">
                  <div>
                    <strong>{papers.length}</strong>
                    <span>THESIS RECORDS</span>
                  </div>
                  <div>
                    <strong>{newestPublicationYear}</strong>
                    <span>LATEST PUBLICATION</span>
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
              <p className="eyebrow title-eyebrow">指導教授</p>
              <span>PRINCIPAL INVESTIGATOR</span>
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
            <p className="eyebrow title-eyebrow">近期研究</p>
            <span>SELECTED PUBLICATIONS</span>
          </div>
          <div className="section-lead-grid">
            <h2 lang="en"> Publications</h2>
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
