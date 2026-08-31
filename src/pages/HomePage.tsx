import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { announcements } from '../data/archive'
import { researchAreas } from '../data/siteContent'
import { papers } from '../lib/papers'
import { Eyebrow, RouteLink, SectionHeading } from '../components/Shared'

function ChipVisual() {
  return (
    <div className="chip-visual" aria-hidden="true">
      <div className="chip-orbit" />
      <div className="chip-orbit orbit-two" />
      <div className="chip-core"><span>AI × SILICON</span></div>
    </div>
  )
}

export function HomePage() {
  const featuredAnnouncements = announcements
    .filter((item) => item.category === 'award')
    .slice(-4)
    .reverse()

  return (
    <>
      <section className="home-hero">
        <div className="hero-inner container">
          <div>
            <Eyebrow>NTHU · VLSI/CAD LABORATORY</Eyebrow>
            <h1>
              智慧系統
              <em>晶片實現</em>
            </h1>
            <p className="hero-lead">
              從 AI 模型、低功耗架構到 VLSI 設計自動化與半導體數位分身，
              我們讓演算法跨越到可靠、高效的實體系統。
              <br />
              <span lang="en">
                From intelligent models to efficient silicon — bridging AI systems and physical design.
              </span>
            </p>
            <div className="hero-actions">
              <Link className="button-primary" to="/research">
                探索研究 Research <ArrowRight size={18} />
              </Link>
              <Link className="button-secondary" to="/join">
                加入我們 Join us
              </Link>
            </div>
          </div>
          <ChipVisual />
        </div>
        <div className="hero-stats" aria-label="Website data summary">
          <div className="hero-stat"><strong>{papers.length}</strong><span>THESES · 2022–2025</span></div>
          <div className="hero-stat"><strong>{researchAreas.length}</strong><span>RESEARCH CLUSTERS</span></div>
          <div className="hero-stat"><strong>2000+</strong><span>ARCHIVE SINCE</span></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="CURRENT RESEARCH"
            title="研究，從模型一路走到晶片"
            english="Research from models to silicon"
            description="四個互相連結的研究群，涵蓋智慧感知、AI 系統、VLSI/EDA 與數位分身。研究方向依教授官方資料更新。"
          />
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <article className="research-card" key={area.id}>
                <span className="research-index">0{index + 1} / 0{researchAreas.length}</span>
                <h3>{area.title.zh}</h3>
                <p lang="en" className="heading-english">{area.title.en}</p>
                <p>{area.summary.zh}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 34 }}>
            <RouteLink to="/research">查看完整研究方向 View all research</RouteLink>
          </div>
        </div>
      </section>

      <section className="dark-section section-pad">
        <div className="container split-feature">
          <div className="signal-panel" aria-hidden="true">
            <div className="signal-line" />
            <div className="signal-labels">
              <span>MODEL / ARCHITECTURE</span>
              <span>EDA / PHYSICAL SYSTEMS</span>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="RESEARCH ARCHIVE"
              title="二十篇論文，一張可以探索的研究地圖"
              english="A navigable map of recent theses"
              description="依 2022–2025 論文題目建立可點擊文字雲。從 AI 推論、電源完整性、事件視覺到語音 AI，點一個詞就能找到相關研究。"
            />
            <RouteLink to="/publications">開啟論文文字雲 Explore the word cloud</RouteLink>

            <div className="home-archive-list">
              {featuredAnnouncements.slice(0, 3).map((announcement) => (
                <div className="home-archive-item" key={`${announcement.date}-${announcement.title}`}>
                  <time>{announcement.date.slice(0, 4)}</time>
                  <p>{announcement.title}</p>
                  <ArrowUpRight size={18} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <RouteLink to="/archive">瀏覽完整歷史典藏 Browse the archive</RouteLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="cta-band">
            <Eyebrow>JOIN THE LAB</Eyebrow>
            <h2>想把一個好想法，做成真正能運作的系統嗎？</h2>
            <p>
              歡迎對 AI 晶片、VLSI/EDA、智慧系統與軟硬體協同設計有熱情的學生，
              和我們一起處理真實而重要的研究問題。
            </p>
            <Link className="button-primary" to="/join">
              了解研究與加入方式 <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
