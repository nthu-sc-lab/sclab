import { ExternalLink, PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { industryNetwork, researchAreas, sources } from '../data/siteContent'
import { legacyResearch } from '../data/archive'

export function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="RESEARCH"
        title="讓智慧落在實體世界"
        english="Intelligence, grounded in physical systems"
        description="研究不只停在模型準確率。我們同時面對功耗、時序、可靠度、硬體限制與真實世界的系統落差。"
      />

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="FOUR CLUSTERS"
            title="現況研究方向"
            english="Current research directions"
            description="以下內容依教授官方頁與清大學者系統整理，技術詞保留中英對照。"
          />
          <div className="research-detail-grid">
            {researchAreas.map((area, index) => (
              <article className="research-detail" key={area.id}>
                <span className="research-index">CLUSTER 0{index + 1}</span>
                <h3>{area.title.zh}</h3>
                <p className="heading-english" lang="en">{area.title.en}</p>
                <p>{area.summary.zh}</p>
                <p lang="en">{area.summary.en}</p>
                <ul>
                  {area.topics.map((topic) => (
                    <li key={topic.en}>{topic.zh} · <span lang="en">{topic.en}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <SourceBadge href={sources.professor.url} label="研究方向官方來源 Official source" />
          </div>
        </div>
      </section>

      <section className="section-pad dark-section">
        <div className="container">
          <SectionHeading
            eyebrow="RESEARCH NETWORK"
            title="從校園研究走進產業生態"
            english="Academic depth, industrial reach"
            description="由清大、工研院與半導體產學平台組成的研究網絡，讓題目能跨越模型、晶片、系統與實際應用。"
          />
          <div className="research-detail-grid">
            {industryNetwork.map((item) => (
              <article className="research-detail" key={item.title.en}>
                <h3>{item.title.zh}</h3>
                <p className="heading-english" lang="en">{item.title.en}</p>
                <p>{item.description.zh}</p>
                <p lang="en">{item.description.en}</p>
                <ExternalLink href={item.source.url}>{item.source.label}</ExternalLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="LEGACY RESEARCH"
            title="歷史研究脈絡"
            english="Foundations that shaped the lab"
            description="舊站曾列為 current projects 的方向已不再冒稱現況，完整保留於此作為研究演進紀錄。"
          />
          <div className="stats-grid">
            {legacyResearch.map((topic, index) => (
              <div className="stat-card" key={topic}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <span>{topic}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <SourceBadge href={sources.oldLab.url} label="歷史研究來源 Legacy source" />
          </div>
        </div>
      </section>
    </>
  )
}
