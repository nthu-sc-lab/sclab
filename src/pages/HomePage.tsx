import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { announcements } from '../data/archive'
import { researchAreas } from '../data/siteContent'
import { papers } from '../lib/papers'
import { Eyebrow, RouteLink, SectionHeading } from '../components/Shared'

function SignalField() {
  return (
    <div className="signal-field" aria-hidden="true">
      <div className="signal-field-top">
        <span className="live-dot" />
        <span>SCLAB / FIELD NOTE 01</span>
        <span>HSC 24°48′N</span>
      </div>
      <div className="signal-grid-lines" />
      <div className="signal-orbit orbit-outer" />
      <div className="signal-orbit orbit-inner" />
      <div className="signal-core">
        <span>AI</span>
        <strong>×</strong>
        <span>VLSI</span>
      </div>
      <div className="signal-node signal-node-a"><span />MODEL</div>
      <div className="signal-node signal-node-b"><span />SILICON</div>
      <div className="signal-node signal-node-c"><span />SYSTEM</div>
      <div className="signal-axis axis-x" />
      <div className="signal-axis axis-y" />
      <div className="signal-field-bottom">
        <span>ROBUST / EFFICIENT / REAL</span>
        <span>01 — 04</span>
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
            <Eyebrow>NTHU · SHIH-CHIEH CHANG LAB</Eyebrow>
            <h1>
              讓智慧，
              <em>落在晶片上。</em>
            </h1>
            <p className="hero-lead">
              從 AI 模型、低功耗架構到 VLSI 設計自動化，
              我們把演算法帶進可靠、可運作的實體系統。
            </p>
            <p className="hero-lead-en" lang="en">
              Building intelligent systems that survive contact with the real world.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" to="/research">
                探索研究方向 <ArrowRight size={17} />
              </Link>
              <Link className="button-ghost" to="/join">加入我們 <ArrowUpRight size={17} /></Link>
            </div>
          </div>
          <SignalField />
        </div>
        <div className="hero-foot container">
          <span>NATIONAL TSING HUA UNIVERSITY</span>
          <span>VLSI / CAD · AI SYSTEMS · ROBOTICS</span>
          <span>Hsinchu, Taiwan</span>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="container intro-layout">
          <div className="intro-label">
            <span className="section-number">01</span>
            <span>WHAT WE DO</span>
          </div>
          <div className="intro-statement">
            <h2>研究，不只是在模型裡得到漂亮的答案。</h2>
            <p>
              真正有用的智慧，需要面對雜訊、功耗、延遲、熱效應與硬體限制。
              SC Lab 從演算法一路走到晶片與系統，研究能在真實世界持續運作的計算。
            </p>
            <div className="intro-metrics">
              <div><strong>{researchAreas.length}</strong><span>RESEARCH FRONTS</span></div>
              <div><strong>{papers.length}</strong><span>RECENT THESES</span></div>
              <div><strong>∞</strong><span>QUESTIONS TO ASK</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="research-preview section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="02 / RESEARCH"
            title="四個方向，一條從模型到實體的路。"
            english="Four connected fronts, from model to physical system"
            description="以教授官方研究方向為基礎，整理成更容易理解的研究入口。"
          />
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <Link className={`research-card research-card-${index + 1}`} to={`/research#${area.id}`} key={area.id}>
                <div className="research-card-head">
                  <span className="research-index">0{index + 1}</span>
                  <ArrowUpRight size={19} />
                </div>
                <div>
                  <h3>{area.title.zh}</h3>
                  <p className="research-card-en" lang="en">{area.title.en}</p>
                </div>
                <p className="research-card-summary">{area.summary.zh}</p>
              </Link>
            ))}
          </div>
          <div className="section-link"><RouteLink to="/research">看完整研究方向</RouteLink></div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="container">
          <div className="process-heading">
            <div>
              <Eyebrow>03 / OUR APPROACH</Eyebrow>
              <h2>把問題拆開，<br /><em>再把它做回去。</em></h2>
            </div>
            <p>從一個想法開始，經過模型、架構與驗證，最後留下能被使用的系統。</p>
          </div>
          <div className="process-row">
            <div className="process-step">
              <span>01</span>
              <div><strong>MODEL</strong><p>理解資料，建立對雜訊與變化有韌性的智慧。</p></div>
            </div>
            <div className="process-connector" aria-hidden="true">→</div>
            <div className="process-step">
              <span>02</span>
              <div><strong>ARCHITECTURE</strong><p>讓模型在功耗、速度與記憶體限制中真正有效率。</p></div>
            </div>
            <div className="process-connector" aria-hidden="true">→</div>
            <div className="process-step">
              <span>03</span>
              <div><strong>SYSTEM</strong><p>連結晶片、感知與機器，驗證它在現場如何運作。</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="container work-layout">
          <div className="work-intro">
            <Eyebrow>04 / RECENT WORK</Eyebrow>
            <h2>把研究留下來，讓下一個問題有入口。</h2>
            <p>瀏覽近期論文，或沿著歷史典藏看見研究室一路累積的軌跡。</p>
            <RouteLink to="/publications">進入論文資料庫</RouteLink>
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
        </div>
      </section>

      <section className="archive-strip">
        <div className="container archive-strip-inner">
          <div>
            <Eyebrow>FROM THE ARCHIVE</Eyebrow>
            <h2>研究會變，累積不會。</h2>
          </div>
          <div className="archive-signal-list">
            {archiveSignals.map((item) => (
              <div className="archive-signal" key={`${item.date}-${item.title}`}>
                <time>{item.date.slice(0, 4)}</time><span>{item.title}</span>
              </div>
            ))}
            <RouteLink to="/archive">瀏覽歷史典藏</RouteLink>
          </div>
        </div>
      </section>

      <section className="join-cta section-pad">
        <div className="container">
          <div className="cta-band">
            <div>
              <Eyebrow>JOIN THE LAB</Eyebrow>
              <h2>有問題想做成系統？<br /><em>來一起試。</em></h2>
            </div>
            <div className="cta-copy">
              <p>歡迎對 AI 晶片、VLSI/EDA、智慧感知與軟硬體協同設計有熱情的學生加入我們。</p>
              <Link className="button-primary" to="/join">了解加入方式 <ArrowRight size={17} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
