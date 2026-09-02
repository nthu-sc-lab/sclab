import { ExternalLink, PageHero, SectionHeading } from "../components/Shared";
import {
  industryNetwork,
  recentResearchCounts,
  recentResearchPeriod,
  researchAreas,
} from "../data/siteContent";

export function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="研究方向"
        title="Research"
        description={`團隊近年的四個核心研究領域。`}
      />

      <section className="section-pad dark-section">
        <div className="container">
          <SectionHeading
            eyebrow="近年核心研究領域"
            title="Clusters"
            description={`主題與關鍵字依 ${recentResearchPeriod.from}—${recentResearchPeriod.to} 年論文資料整理。`}
          />
          <div className="research-detail-grid">
            {researchAreas.map((area, index) => (
              <article className="research-detail" id={area.id} key={area.id}>
                <span className="research-index">CLUSTER 0{index + 1}</span>
                <h3>{area.title.zh}</h3>
                <p className="research-detail-english" lang="en">
                  {area.title.en}
                </p>
                <span className="research-record-count">
                  {recentResearchCounts[area.id]} RECENT RECORDS
                </span>
                <p>{area.summary.zh}</p>
                <ul>
                  {area.topics.map((topic) => (
                    <li lang="en" key={topic.en}>
                      {topic.en}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad research-network-section">
        <div className="container">
          <SectionHeading
            eyebrow="產學研究網路"
            title="Partnerships"
            description="結合大學研究、法人研發與半導體產業資源，發展兼具學術深度與工程價值的研究成果。"
          />
          <div className="research-detail-grid">
            {industryNetwork.map((item) => (
              <article className="research-detail" key={item.title.en}>
                <h3 lang="en">{item.title.en}</h3>
                <p>{item.description.zh}</p>
                <ExternalLink href={item.source.url}>
                  {item.source.label}
                </ExternalLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
