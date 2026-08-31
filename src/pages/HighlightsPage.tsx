import { PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { honors, seniorProjects } from '../data/archive'

export function HighlightsPage() {
  return (
    <>
      <PageHero
        eyebrow="HIGHLIGHTS"
        title="把研究做成可以被看見的成果"
        english="Research translated into impact"
        description="從 DAC 最佳論文、學生競賽到產業創新，以下成果由清大、工研院與舊實驗室網站交叉整理。"
      />

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="HONORS & AWARDS"
            title="重要里程碑"
            english="Selected honors and awards"
          />
          <div className="timeline">
            {honors.map((honor) => (
              <article className="timeline-item" key={`${honor.year}-${honor.title}`}>
                <time>{honor.year}</time>
                <div>
                  <h3>{honor.title}</h3>
                  <p lang="en">{honor.detail}</p>
                  <SourceBadge href={honor.source.url} label={honor.source.label} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad dark-section">
        <div className="container">
          <SectionHeading
            eyebrow="SENIOR PROJECTS"
            title="從題目定義到競賽舞台"
            english="Learning by building and competing"
            description="舊站記錄的大學部 CAD 專題，訓練問題定義、演算法設計、大型程式實作、團隊合作與技術簡報。"
          />
          <div className="research-detail-grid">
            {seniorProjects.map((project) => (
              <article className="research-detail" key={`${project.year}-${project.title}`}>
                <span className="research-index">{project.year}</span>
                <h3 lang="en">{project.title}</h3>
                <p>{project.result}</p>
                <p>組員：{project.members}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
