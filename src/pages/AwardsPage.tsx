import { useMemo, useState } from 'react'
import { Award } from 'lucide-react'
import { PageHero, SourceBadge } from '../components/Shared'
import { honors, type AwardScope } from '../data/archive'

const scopeFilters: readonly { id: AwardScope | 'all'; label: string }[] = [
  { id: 'all', label: 'All records' },
  { id: 'faculty', label: 'Professor' },
  { id: 'supervised', label: 'Supervised teams' },
]

const scopeLabels: Record<AwardScope, string> = {
  faculty: 'PROFESSOR',
  supervised: 'SUPERVISED TEAMS',
}

function awardYearValue(year: string) {
  const match = year.match(/\d{4}/)
  return match ? Number(match[0]) : 0
}

export function AwardsPage() {
  const [scope, setScope] = useState<AwardScope | 'all'>('all')

  const visibleAwards = useMemo(
    () => honors
      .filter((award) => scope === 'all' || award.scope === scope)
      .slice()
      .sort((a, b) => awardYearValue(b.year) - awardYearValue(a.year)),
    [scope],
  )

  const facultyCount = honors.filter((award) => award.scope === 'faculty').length
  const supervisedCount = honors.filter((award) => award.scope === 'supervised').length

  return (
    <>
      <PageHero
        eyebrow="AWARDS"
        title="獎項與榮譽"
        english="Awards & Honors"
        description="研究成果獲國內外學術、工程與產業獎項肯定，並持續培育學生團隊參與重要設計競賽。"
      />

      <section className="section-pad awards-section">
        <div className="container">
          <div className="awards-summary">
            <div><strong>{honors.length}</strong><span>DOCUMENTED RECORDS</span></div>
            <div><strong>{facultyCount}</strong><span>PROFESSOR</span></div>
            <div><strong>{supervisedCount}</strong><span>SUPERVISED TEAMS</span></div>
          </div>

          <div className="awards-toolbar" role="group" aria-label="Filter awards">
            {scopeFilters.map((filter) => (
              <button
                className={scope === filter.id ? 'award-filter active' : 'award-filter'}
                key={filter.id}
                type="button"
                aria-pressed={scope === filter.id}
                onClick={() => setScope(filter.id)}
              >
                {filter.label}
              </button>
            ))}
            <span>{visibleAwards.length} records</span>
          </div>

          <div className="award-list">
            {visibleAwards.map((award) => (
              <article className="award-record" key={`${award.year}-${award.scope}-${award.title}`}>
                <div className="award-record-year">
                  <span>{award.year}</span>
                  <Award size={21} aria-hidden="true" />
                </div>
                <div className="award-record-body">
                  <p className="award-scope">{scopeLabels[award.scope]}</p>
                  <h2>{award.title}</h2>
                  <p className="award-detail" lang="en">{award.detail}</p>
                  <SourceBadge href={award.source.url} label={award.source.label} />
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
