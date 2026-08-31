import { ArrowRight, BookOpen, CircuitBoard, Globe2, Users } from 'lucide-react'
import { ExternalLink, PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { recruiting } from '../data/siteContent'

const icons = [CircuitBoard, Users, Globe2, BookOpen]

export function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="JOIN US"
        title="把課堂能力，轉成研究影響力"
        english="Build, publish, and grow with us"
        description="歡迎對 AI 晶片、VLSI/EDA、機器學習與軟硬體協同設計有興趣的研究生與大學部專題生。"
      />

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="WHY SCLAB"
            title={recruiting.title.zh}
            english={recruiting.title.en}
            description={recruiting.introduction.zh}
          />
          <div className="join-grid">
            {recruiting.values.map((value, index) => {
              const Icon = icons[index]
              return (
                <article className="feature-card" key={value.en}>
                  <Icon size={30} />
                  <h3>{value.zh}</h3>
                  <p lang="en">{value.en}</p>
                </article>
              )
            })}
          </div>
          <div style={{ marginTop: 32 }}>
            <SourceBadge href={recruiting.source.url} label="教授官方招生資訊 Official recruiting page" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="cta-band">
            <p className="eyebrow">START A CONVERSATION</p>
            <h2>帶著你的興趣、作品或想解的問題來聊聊。</h2>
            <p lang="en">Tell us what you want to build, understand, or change.</p>
            <ExternalLink href="mailto:scchang@cs.nthu.edu.tw">
              寫信聯絡張世杰教授 Contact Prof. Chang <ArrowRight size={17} />
            </ExternalLink>
          </div>
        </div>
      </section>
    </>
  )
}
