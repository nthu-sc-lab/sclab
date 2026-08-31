import { useMemo, useState } from 'react'
import { Search, UserRound } from 'lucide-react'
import { ExternalLink, PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { historicalPeople, peopleSource, type HistoricalPerson } from '../data/archive'
import { professor, professorMilestones, professorPhoto } from '../data/siteContent'

const formerMemberGroups: readonly { id: HistoricalPerson['group']; title: string }[] = [
  { id: 'phd', title: 'Ph.D. Students' },
  { id: 'master', title: "Master's Students" },
  { id: 'alumni', title: 'Alumni' },
  { id: 'collaborator', title: 'Collaborators' },
  { id: 'staff', title: 'Staff' },
]

type MemberGroupFilter = HistoricalPerson['group'] | 'all'

const memberFilters: readonly { id: MemberGroupFilter; title: string }[] = [
  { id: 'all', title: 'All members' },
  ...formerMemberGroups,
]

const currentMemberSlots = Array.from({ length: 6 }, (_, index) => index)

export function PeoplePage() {
  const [activeGroup, setActiveGroup] = useState<MemberGroupFilter>('all')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase('zh-TW')

  const visibleMembers = useMemo(
    () => historicalPeople.filter((person) => {
      if (activeGroup !== 'all' && person.group !== activeGroup) return false
      if (!normalizedQuery) return true
      return [person.name, person.period, person.detail]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('zh-TW')
        .includes(normalizedQuery)
    }),
    [activeGroup, normalizedQuery],
  )

  return (
    <>
      <PageHero
        eyebrow="PEOPLE"
        title="研究團隊"
        english="Members"
        description="由張世杰教授帶領，研究團隊匯聚人工智慧、積體電路與設計自動化領域的研究人才。"
      />

      <section className="section-pad">
        <div className="container profile-layout">
          <figure className="profile-photo professor-photo">
            <img
              src={professorPhoto.member}
              alt="Professor Shih-Chieh Chang"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = professorPhoto.fallback
              }}
            />
            <figcaption className="photo-caption">
              <span>PROFESSOR</span>
              <strong>Shih-Chieh Chang</strong>
            </figcaption>
          </figure>
          <div className="profile-content">
            <p className="eyebrow">PRINCIPAL INVESTIGATOR</p>
            <h2 lang="en">Shih-Chieh Chang</h2>
            <p className="profile-title">張世杰教授</p>
            <h3>{professor.title.zh}</h3>
            <p>{professor.introduction.zh}</p>

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
          </div>
        </div>
      </section>

      <section className="section-compact">
        <div className="container">
          <SectionHeading
            eyebrow="APPOINTMENTS"
            title="學術與專業經歷"
            english="Appointments"
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

      <section className="section-pad current-members-section">
        <div className="container">
          <SectionHeading title="現任成員" english="Current Members" />
          <div className="current-member-grid" aria-label="Current member profiles">
            {currentMemberSlots.map((slot) => (
              <article className="current-member-placeholder" key={slot} aria-label="Empty current member profile">
                <div className="current-member-photo" aria-hidden="true">
                  <UserRound size={30} strokeWidth={1.35} />
                </div>
                <div className="current-member-placeholder-copy" aria-hidden="true">
                  <span />
                  <span />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad former-members-section">
        <div className="container">
          <SectionHeading title="歷屆成員" english="Former Members" />
          <div className="member-directory-summary">
            <div><strong>{historicalPeople.length}</strong><span>TOTAL RECORDS</span></div>
            <div><strong>{historicalPeople.filter((person) => person.group === 'phd').length}</strong><span>PH.D. STUDENTS</span></div>
            <div><strong>{historicalPeople.filter((person) => person.group === 'master').length}</strong><span>MASTER'S STUDENTS</span></div>
            <div><strong>{historicalPeople.filter((person) => person.group === 'alumni').length}</strong><span>ALUMNI</span></div>
          </div>

          <div className="member-directory-controls">
            <label className="member-search" htmlFor="member-search">
              <span className="member-search-label">Search</span>
              <div className="member-search-box">
                <Search size={17} aria-hidden="true" />
                <input
                  id="member-search"
                  value={query}
                  placeholder="Name, period, or research topic"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </label>
            <div className="member-filter-row" role="group" aria-label="Filter members by category">
              {memberFilters.map((filter) => (
                <button
                  className={activeGroup === filter.id ? 'member-filter active' : 'member-filter'}
                  key={filter.id}
                  type="button"
                  aria-pressed={activeGroup === filter.id}
                  onClick={() => setActiveGroup(filter.id)}
                >
                  {filter.title}
                </button>
              ))}
            </div>
          </div>

          <div className="member-result-bar" aria-live="polite">
            <span>{visibleMembers.length} member records</span>
            {query && <span>SEARCH / {query}</span>}
          </div>

          {visibleMembers.length === 0 ? (
            <div className="empty-state">No member records match the current filters.</div>
          ) : (
            <div className="member-directory-groups">
              {formerMemberGroups
                .map((group) => ({
                  ...group,
                  members: visibleMembers.filter((person) => person.group === group.id),
                }))
                .filter((group) => group.members.length > 0)
                .map((group) => (
                  <section className="member-directory-group" key={group.id}>
                    <div className="member-directory-group-head">
                      <div>
                        <p className="eyebrow">{group.id.toUpperCase()}</p>
                        <h3 lang="en">{group.title}</h3>
                      </div>
                      <span>{group.members.length} RECORDS</span>
                    </div>
                    <div className="member-card-grid">
                      {group.members.map((person, index) => (
                        <article className="member-card" key={`${group.id}-${person.name}-${person.period}`}>
                          <div className="member-photo-slot" aria-hidden="true">
                            {person.photo ? <img src={person.photo} alt="" loading="lazy" /> : <span>{person.name.trim().slice(0, 1)}</span>}
                          </div>
                          <div className="member-card-content">
                            <div className="member-card-top">
                              <span className="member-card-id">{String(index + 1).padStart(2, '0')}</span>
                              <span>{person.period}</span>
                            </div>
                            <h4>{person.name}</h4>
                            <div className="member-card-details">
                              {person.degree && <div><span>DEGREE</span><p>{person.degree}</p></div>}
                              {person.thesis && <div><span>THESIS / RESEARCH</span><p>{person.thesis}</p></div>}
                              {person.status && <div><span>STATUS</span><p>{person.status}</p></div>}
                              {person.detail && <div><span>RECORD</span><p>{person.detail}</p></div>}
                              {!person.degree && !person.thesis && !person.status && !person.detail && (
                                <p className="member-card-empty">Roster entry only.</p>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          )}

          <div className="member-source-link">
            <ExternalLink href={peopleSource.url}>Source roster</ExternalLink>
          </div>
        </div>
      </section>
    </>
  )
}
