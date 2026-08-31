import { useMemo, useState } from 'react'
import { AlertTriangle, Search } from 'lucide-react'
import { PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import {
  announcements,
  historicalPeople,
  legacyResearch,
  peopleSource,
  seniorProjects,
  type HistoricalPerson,
} from '../data/archive'
import { sources } from '../data/siteContent'

type ArchiveSection = 'people' | 'announcements' | 'projects'

const groupLabels: Record<HistoricalPerson['group'], string> = {
  phd: '歷屆博士生 Ph.D. archive',
  master: '舊站最後碩士名單 Historical master roster',
  alumni: '歷屆校友 Alumni',
  collaborator: '歷史合作人員 Collaborators',
  staff: '歷史行政人員 Staff',
}

const announcementLabels = {
  news: '網站與名單',
  award: '競賽與榮譽',
  project: '專題活動',
  community: '社群活動',
} as const

export function ArchivePage() {
  const [section, setSection] = useState<ArchiveSection>('people')
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<HistoricalPerson['group'] | ''>('')

  const normalizedQuery = query.trim().toLocaleLowerCase('zh-TW')

  const visiblePeople = useMemo(
    () => historicalPeople.filter((person) => {
      if (group && person.group !== group) return false
      if (!normalizedQuery) return true
      return [person.name, person.period, person.detail]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('zh-TW')
        .includes(normalizedQuery)
    }),
    [group, normalizedQuery],
  )

  const visibleAnnouncements = useMemo(
    () => announcements.filter((announcement) => {
      if (!normalizedQuery) return true
      return `${announcement.date} ${announcement.title}`.toLocaleLowerCase('zh-TW').includes(normalizedQuery)
    }),
    [normalizedQuery],
  )

  const groupedPeople = Object.entries(groupLabels).map(([groupId, label]) => ({
    groupId: groupId as HistoricalPerson['group'],
    label,
    people: visiblePeople.filter((person) => person.group === groupId),
  })).filter((item) => item.people.length > 0)

  const selectSection = (nextSection: ArchiveSection) => {
    setSection(nextSection)
    setQuery('')
    setGroup('')
  }

  return (
    <>
      <PageHero
        eyebrow="HISTORICAL ARCHIVE"
        title="保存脈絡，也誠實標示年代"
        english="Preserving context without rewriting history"
        description="收錄舊站有效的成員、公告、研究分組與專題紀錄；所有資料都視為歷史快照，不代表 2026 現況。"
      />

      <section className="section-pad">
        <div className="container">
          <div className="archive-disclaimer">
            <AlertTriangle aria-hidden="true" size={22} />
            <p>
              舊站最新公告停在 2016 年，成員名單約更新至 2020 年。姓名、年份與公開論文資料僅為歷史保存；
              不刊登個人舊照、助理私人聯絡方式，也不將「Now」標籤延伸解讀為現況。
            </p>
          </div>

          <div className="archive-tabs" role="tablist" aria-label="Archive sections">
            <button className={section === 'people' ? 'archive-tab active' : 'archive-tab'} type="button" onClick={() => selectSection('people')}>成員與校友 People</button>
            <button className={section === 'announcements' ? 'archive-tab active' : 'archive-tab'} type="button" onClick={() => selectSection('announcements')}>歷史公告 Announcements</button>
            <button className={section === 'projects' ? 'archive-tab active' : 'archive-tab'} type="button" onClick={() => selectSection('projects')}>研究與專題 Projects</button>
          </div>

          {section !== 'projects' && (
            <div className="archive-toolbar">
              <div className="control-field">
                <label htmlFor="archive-search">搜尋典藏 Search archive</label>
                <div style={{ position: 'relative' }}>
                  <Search size={17} style={{ position: 'absolute', top: 16, left: 14, color: '#698087' }} />
                  <input
                    id="archive-search"
                    value={query}
                    style={{ paddingLeft: 42 }}
                    placeholder={section === 'people' ? '姓名、年份或研究題目' : '公告標題或年份'}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              {section === 'people' && (
                <div className="control-field">
                  <label htmlFor="archive-group">名錄分類 Group</label>
                  <select id="archive-group" value={group} onChange={(event) => setGroup(event.target.value as HistoricalPerson['group'] | '')}>
                    <option value="">全部分類</option>
                    {Object.entries(groupLabels).map(([groupId, label]) => <option key={groupId} value={groupId}>{label}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          {section === 'people' && (
            <>
              <div className="result-bar"><span>顯示 {visiblePeople.length} / {historicalPeople.length} 筆歷史名錄</span></div>
              {groupedPeople.length === 0 ? <div className="empty-state">找不到符合條件的歷史名錄。</div> : groupedPeople.map((item) => (
                <section className="archive-group" key={item.groupId}>
                  <div className="archive-group-title">
                    <h2>{item.label}</h2>
                    <span>{item.people.length} RECORDS</span>
                  </div>
                  <div className="archive-records">
                    {item.people.map((person, index) => (
                      <article className="archive-card" key={`${person.group}-${person.name}-${index}`}>
                        <div className="archive-card-head">
                          <h3>{person.name}</h3>
                          <span className="status-badge historical">Historical</span>
                        </div>
                        <p>{person.period}</p>
                        {person.detail && <p>{person.detail}</p>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
              <SourceBadge href={peopleSource.url} label={peopleSource.label} />
            </>
          )}

          {section === 'announcements' && (
            <>
              <div className="result-bar"><span>顯示 {visibleAnnouncements.length} / {announcements.length} 則歷史公告</span></div>
              {visibleAnnouncements.length === 0 ? <div className="empty-state">找不到符合條件的公告。</div> : (
                <div className="timeline">
                  {visibleAnnouncements.slice().reverse().map((announcement) => (
                    <article className="timeline-item" key={`${announcement.date}-${announcement.title}`}>
                      <time>{announcement.date}</time>
                      <div>
                        <span className="status-badge historical">{announcementLabels[announcement.category]}</span>
                        <h3 style={{ marginTop: 12 }}>{announcement.title}</h3>
                        <SourceBadge href={announcement.source.url} label="原始公告索引" />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {section === 'projects' && (
            <>
              <SectionHeading
                eyebrow="LEGACY TOPICS"
                title="舊站研究方向"
                english="Historical research topics"
              />
              <div className="stats-grid" style={{ marginBottom: 72 }}>
                {legacyResearch.map((topic, index) => (
                  <div className="stat-card" key={topic}><strong>{String(index + 1).padStart(2, '0')}</strong><span>{topic}</span></div>
                ))}
              </div>
              <SectionHeading
                eyebrow="SENIOR PROJECTS"
                title="大學部專題典藏"
                english="Undergraduate project archive"
              />
              <div className="archive-records">
                {seniorProjects.map((project) => (
                  <article className="archive-card" key={`${project.year}-${project.title}`}>
                    <div className="archive-card-head"><h3 lang="en">{project.title}</h3><span className="status-badge historical">{project.year}</span></div>
                    <p>{project.result}</p>
                    <p>組員：{project.members}</p>
                  </article>
                ))}
              </div>
              <div style={{ marginTop: 28 }}><SourceBadge href={sources.oldLab.url} label="舊實驗室網站 Legacy site" /></div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
