import { ExternalLink, PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { industryNetwork, researchAreas, sources } from '../data/siteContent'
import { paperCategoryCounts, papers } from '../lib/papers'

export function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="RESEARCH"
        title="研究方向"
        english="Research Areas"
        description={`依據 papers.csv 的 ${papers.length} 筆研究紀錄，整理為 AI 模型與硬體加速、電源完整性與設計自動化、電腦視覺與事件感知、語音與音訊處理四個核心領域。`}
      />

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="RESEARCH AREAS"
            title="核心研究領域"
          />
          <div className="research-detail-grid">
            {researchAreas.map((area, index) => (
              <article className="research-detail" id={area.id} key={area.id}>
                <span className="research-index">CLUSTER 0{index + 1}</span>
                <h3>{area.title.zh}</h3>
                <p className="research-detail-english" lang="en">{area.title.en}</p>
                <span className="research-record-count">{paperCategoryCounts[area.id]} RECORDS</span>
                <p>{area.summary.zh}</p>
                <ul>
                  {area.topics.map((topic) => (
                    <li lang="en" key={topic.en}>{topic.en}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <SourceBadge href={sources.professor.url} label="Professor profile" />
          </div>
        </div>
      </section>

      <section className="section-pad dark-section">
        <div className="container">
          <SectionHeading
            eyebrow="RESEARCH NETWORK"
            title="產學研究網絡"
            english="Research Network"
            description="結合大學研究、法人研發與半導體產業資源，發展兼具學術深度與工程價值的研究成果。"
          />
          <div className="research-detail-grid">
            {industryNetwork.map((item) => (
              <article className="research-detail" key={item.title.en}>
                <h3 lang="en">{item.title.en}</h3>
                <p>{item.description.zh}</p>
                <ExternalLink href={item.source.url}>{item.source.label}</ExternalLink>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
