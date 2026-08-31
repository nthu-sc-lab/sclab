import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { announcements } from '../data/archive'
import { researchAreas } from '../data/siteContent'
import { papers } from '../lib/papers'
import { Eyebrow, RouteLink } from '../components/Shared'

function ResearchFocusPanel() {
  return (
    <div className="focus-panel" aria-label="Research focus">
      <div className="focus-panel-head">
        <span>RESEARCH FOCUS</span>
        <span>NTHU / SC LAB</span>
      </div>
      <div className="focus-panel-list">
        {researchAreas.map((area, index) => (
          <div className="focus-row" key={area.id}>
            <span>0{index + 1}</span>
            <strong lang="en">{area.title.en}</strong>
            <i aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="focus-panel-foot">
        <span>COMPUTER SCIENCE</span>
        <span>Hsinchu, Taiwan</span>
      </div>
    </div>
  )
}

export function HomePage() {
  const archiveSignals = announcements
    .filter((item) => item.category === 'award')
    .slice(-3)
    .reverse()

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-inner container">
          <div className="hero-copy">
            <div className="hero-identity">
              <span className="hero-identity-mark">SC</span>
              <span>National Tsing Hua University<br />Department of Computer Science</span>
            </div>
            <Eyebrow>VLSI / CAD LABORATORY</Eyebrow>
            <h1>VLSI/CAD<br /><em>Laboratory</em></h1>
            <p className="hero-chinese">國立清華大學資訊工程學系<br />張世杰教授研究團隊</p>
            <p className="hero-lead">
              研究涵蓋深度學習、低功耗 AI 架構、VLSI 設計自動化，以及半導體數位分身與機器人系統。
            </p>
            <div className="hero-actions">
              <Link className="button-primary" to="/research">Research <ArrowRight size={16} /></Link>
              <Link className="button-secondary" to="/people">Members <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <ResearchFocusPanel />
        </div>
        <div className="hero-meta container">
          <span>SC LAB / NTHU</span>
          <span>VLSI · EDA · AI SYSTEMS</span>
          <span>ESTABLISHED IN ACADEMIC RESEARCH</span>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="container">
          <div className="section-bar"><Eyebrow>RESEARCH AREAS</Eyebrow><span>01</span></div>
          <div className="section-lead-grid">
            <h2>研究範疇</h2>
            <p>
              我們關注計算方法與實體系統之間的連結，從演算法、模型與硬體架構，到設計自動化與系統驗證。
            </p>
          </div>
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <Link className={`research-card research-card-${index + 1}`} to={`/research#${area.id}`} key={area.id}>
                <div className="research-card-head">
                  <span className="research-index">0{index + 1}</span>
                  <ArrowUpRight size={18} />
                </div>
                <h3>{area.title.zh}</h3>
                <p className="research-card-summary">{area.summary.zh}</p>
              </Link>
            ))}
          </div>
          <div className="section-link"><RouteLink to="/research">View research areas</RouteLink></div>
        </div>
      </section>

      <section className="lab-profile section-pad">
        <div className="container lab-profile-grid">
          <div>
            <div className="section-bar"><Eyebrow>PRINCIPAL INVESTIGATOR</Eyebrow><span>02</span></div>
            <h2>張世杰教授</h2>
            <p className="profile-role">Professor, Department of Computer Science<br />College of Semiconductor Research, NTHU</p>
            <p className="profile-summary">
              研究橫跨 VLSI/EDA、低功耗 AI、智慧感知、半導體數位分身與機器人系統，並持續與學術及產業夥伴合作。
            </p>
            <RouteLink to="/people">View profile</RouteLink>
          </div>
          <div className="profile-facts">
            <div><strong>{researchAreas.length}</strong><span>RESEARCH AREAS</span></div>
            <div><strong>{papers.length}</strong><span>THESIS RECORDS</span></div>
            <div><strong>NTHU</strong><span>COMPUTER SCIENCE</span></div>
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="container">
          <div className="section-bar"><Eyebrow>SELECTED PUBLICATIONS</Eyebrow><span>03</span></div>
          <div className="section-lead-grid">
            <h2>論文與研究成果</h2>
            <p>近期論文依研究主題整理，完整資料與 Handle 連結收錄於 Publications。</p>
          </div>
          <div className="paper-preview-list">
            {papers.slice(0, 3).map((paper) => (
              <a className="paper-preview" href={paper.url} target="_blank" rel="noreferrer" key={paper.id}>
                <span className="paper-preview-year">{paper.publicationYear}</span>
                <div><h3>{paper.title}</h3><p>{paper.student} · {paper.department}</p></div>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
          <div className="section-link"><RouteLink to="/publications">Browse all publications</RouteLink></div>
        </div>
      </section>

      <section className="archive-strip">
        <div className="container archive-strip-inner">
          <div>
            <div className="section-bar section-bar-dark"><Eyebrow>HIGHLIGHTS & ARCHIVE</Eyebrow><span>04</span></div>
            <h2>研究紀錄</h2>
            <p>保存歷年研究成果、競賽與實驗室活動，並標示資料來源與年代。</p>
          </div>
          <div className="archive-signal-list">
            {archiveSignals.map((item) => (
              <div className="archive-signal" key={`${item.date}-${item.title}`}>
                <time>{item.date.slice(0, 4)}</time><span>{item.title}</span>
              </div>
            ))}
            <RouteLink to="/archive">Open archive</RouteLink>
          </div>
        </div>
      </section>

      <section className="join-cta section-pad">
        <div className="container join-cta-inner">
          <div><Eyebrow>JOIN THE LAB</Eyebrow><h2>對 VLSI、EDA 或 AI 系統研究有興趣？</h2></div>
          <Link className="button-primary" to="/join">Information for applicants <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
