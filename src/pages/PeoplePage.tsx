import { ExternalLink, PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { historicalPeople, peopleSource } from '../data/archive'
import {
  externalProfiles,
  professor,
  professorMilestones,
  sources,
} from '../data/siteContent'

export function PeoplePage() {
  const alumniCount = historicalPeople.filter((person) => person.group === 'alumni').length

  return (
    <>
      <PageHero
        eyebrow="PEOPLE"
        title="一個跨越模型與晶片的研究團隊"
        english="People behind the systems"
        description="只將可由官方來源驗證的資料列為現況；舊站成員全部保留在有年代註記的歷史典藏。"
      />

      <section className="section-pad">
        <div className="container profile-layout">
          <div className="profile-photo profile-monogram" aria-label="Shih-Chieh Chang monogram portrait">
            <span>SC</span>
            <small>AI × VLSI</small>
          </div>
          <div className="profile-content">
            <p className="eyebrow">PRINCIPAL INVESTIGATOR</p>
            <h2>{professor.name.zh}</h2>
            <p className="profile-title" lang="en">{professor.name.en}</p>
            <h3>{professor.title.zh}</h3>
            <p lang="en">{professor.title.en}</p>
            <p>{professor.introduction.zh}</p>
            <p lang="en">{professor.introduction.en}</p>

            <div className="profile-meta">
              <div className="profile-card">
                <small>Research units</small>
                <p>資訊工程學系<br />半導體研究學院</p>
              </div>
              <div className="profile-card">
                <small>Office</small>
                <p>{professor.office}<br />{professor.phone}</p>
              </div>
              {professor.education.map((education) => (
                <div className="profile-card" key={education}>
                  <small>Education</small>
                  <p lang="en">{education}</p>
                </div>
              ))}
            </div>

            <div className="filter-row">
              {externalProfiles.map((profile) => (
                <ExternalLink key={profile.url} href={profile.url}>{profile.label}</ExternalLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container">
          <SectionHeading
            eyebrow="SELECTED MILESTONES"
            title="學術與產業經歷"
            english="Academic and industrial leadership"
            description="精選里程碑來自清大學者系統與工研院官方頁；完整職務紀錄請由來源連結查閱。"
          />
          <div className="milestone-list">
            {professorMilestones.map((milestone) => (
              <div className="milestone" key={`${milestone.period}-${milestone.title}`}>
                <time>{milestone.period}</time>
                <div>
                  <p>{milestone.title}</p>
                  <p lang="en">{milestone.english}</p>
                  <SourceBadge href={milestone.source.url} label={milestone.source.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad dark-section">
        <div className="container split-feature">
          <div>
            <SectionHeading
              eyebrow="HISTORICAL ROSTER"
              title="不把歷史名單冒充成現況"
              english="An archive, clearly dated"
              description={`舊站保存了博士生、碩士生、合作人員與至少 ${alumniCount} 位歷屆成員紀錄。由於資料多停在 2020 年前，新站完整保留但一律標示為歷史資料。`}
            />
            <ExternalLink href={peopleSource.url}>查看舊站原始名單 Original roster</ExternalLink>
          </div>
          <div className="signal-panel" aria-hidden="true">
            <div className="signal-line" />
            <div className="signal-labels">
              <span>2000 — 2020</span>
              <span>VERIFIED AS ARCHIVE</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container">
          <SourceBadge href={sources.scholars.url} label="清大學者系統 NTHU Scholars" />
        </div>
      </section>
    </>
  )
}
