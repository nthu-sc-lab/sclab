import { useMemo, useState } from "react";
import { Search, UserRound } from "lucide-react";
import { ExternalLink, PageHero, SectionHeading } from "../components/Shared";
import { historicalPeople, peopleSource } from "../data/archive";

type FormerMemberGroup = "phd" | "master" | "alumni";

const formerMemberGroups: readonly { id: FormerMemberGroup; title: string }[] =
  [
    { id: "phd", title: "Ph.D. Students" },
    { id: "master", title: "Master's Students" },
    { id: "alumni", title: "Alumni" },
  ];

type MemberGroupFilter = FormerMemberGroup | "all";

const memberFilters: readonly { id: MemberGroupFilter; title: string }[] = [
  { id: "all", title: "All members" },
  ...formerMemberGroups,
];

const currentMembers = [
  { name: "林言蓉", level: "碩二", role: "特助" },
  { name: "李子賢", level: "碩二", role: "網管" },
  { name: "林奕安", level: "碩二", role: "林奕安天才加博士先生" },
  { name: "翁嘉妤", level: "碩二", role: "康樂" },
  { name: "許昊彣", level: "碩二", role: "帥潮" },
] as const;
const formerMembers = historicalPeople.filter(
  (person) =>
    person.group === "phd" ||
    person.group === "master" ||
    person.group === "alumni",
);
const currentMemberGroups = [
  {
    id: "collaborator",
    title: "Collaborators",
    people: historicalPeople.filter(
      (person) => person.group === "collaborator",
    ),
  },
  {
    id: "staff",
    title: "Staff",
    people: historicalPeople.filter((person) => person.group === "staff"),
  },
] as const;

export function PeoplePage() {
  const [activeGroup, setActiveGroup] = useState<MemberGroupFilter>("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("zh-TW");

  const visibleMembers = useMemo(
    () =>
      formerMembers.filter((person) => {
        if (activeGroup !== "all" && person.group !== activeGroup) return false;
        if (!normalizedQuery) return true;
        return [person.name, person.period, person.detail]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("zh-TW")
          .includes(normalizedQuery);
      }),
    [activeGroup, normalizedQuery],
  );

  return (
    <>
      <PageHero
        eyebrow="ABOUT / MEMBERS"
        title="團隊成員"
        english="Members"
        description="匯聚人工智慧、積體電路與設計自動化領域的研究人才，記錄現任與歷屆團隊成員。"
      />

      <section className="section-pad current-members-section">
        <div className="container">
          <SectionHeading title="現任成員" english="Current Members" />
          <div className="current-member-group-head">
            <p className="eyebrow">STUDENTS</p>
            <span>{currentMembers.length} CURRENT</span>
          </div>
          <div
            className="current-member-grid"
            aria-label="Current member profiles"
          >
            {currentMembers.map((member, index) => (
              <article className="current-member-card" key={member.name}>
                <div className="current-member-photo" aria-hidden="true">
                  <UserRound size={30} strokeWidth={1.35} />
                </div>
                <div className="current-member-content">
                  <div className="current-member-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>MASTER'S STUDENT</span>
                  </div>
                  <h3>{member.name}</h3>
                  <div className="current-member-tags">
                    <span>{member.level}</span>
                    {"role" in member && member.role && (
                      <span>{member.role}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="current-affiliate-groups">
            {currentMemberGroups.map((group) => (
              <section key={group.id}>
                <div className="current-member-group-head">
                  <p className="eyebrow">{group.id.toUpperCase()}</p>
                  <span>{group.people.length} CURRENT</span>
                </div>
                <h3 className="current-affiliate-title" lang="en">
                  {group.title}
                </h3>
                <div className="current-affiliate-grid">
                  {group.people.map((person) => (
                    <article
                      className="current-affiliate-card"
                      key={`${group.id}-${person.name}`}
                    >
                      <div
                        className="current-affiliate-avatar"
                        aria-hidden="true"
                      >
                        {person.name.trim().slice(0, 1)}
                      </div>
                      <div>
                        <span>CURRENT</span>
                        <h4>{person.name}</h4>
                        <p>{person.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad former-members-section">
        <div className="container">
          <SectionHeading title="歷屆成員" english="Former Members" />
          <div className="member-directory-summary">
            <div>
              <strong>{formerMembers.length}</strong>
              <span>TOTAL RECORDS</span>
            </div>
            <div>
              <strong>
                {
                  formerMembers.filter((person) => person.group === "phd")
                    .length
                }
              </strong>
              <span>PH.D. STUDENTS</span>
            </div>
            <div>
              <strong>
                {
                  formerMembers.filter((person) => person.group === "master")
                    .length
                }
              </strong>
              <span>MASTER'S STUDENTS</span>
            </div>
            <div>
              <strong>
                {
                  formerMembers.filter((person) => person.group === "alumni")
                    .length
                }
              </strong>
              <span>ALUMNI</span>
            </div>
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
            <div
              className="member-filter-row"
              role="group"
              aria-label="Filter members by category"
            >
              {memberFilters.map((filter) => (
                <button
                  className={
                    activeGroup === filter.id
                      ? "member-filter active"
                      : "member-filter"
                  }
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
            <div className="empty-state">
              No member records match the current filters.
            </div>
          ) : (
            <div className="member-directory-groups">
              {formerMemberGroups
                .map((group) => ({
                  ...group,
                  members: visibleMembers.filter(
                    (person) => person.group === group.id,
                  ),
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
                        <article
                          className="member-card"
                          key={`${group.id}-${person.name}-${person.period}`}
                        >
                          <div className="member-photo-slot" aria-hidden="true">
                            {person.photo ? (
                              <img src={person.photo} alt="" loading="lazy" />
                            ) : (
                              <span>{person.name.trim().slice(0, 1)}</span>
                            )}
                          </div>
                          <div className="member-card-content">
                            <div className="member-card-top">
                              <span className="member-card-id">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span>{person.period}</span>
                            </div>
                            <h4>{person.name}</h4>
                            <div className="member-card-details">
                              {person.degree && (
                                <div>
                                  <span>DEGREE</span>
                                  <p>{person.degree}</p>
                                </div>
                              )}
                              {person.thesis && (
                                <div>
                                  <span>THESIS / RESEARCH</span>
                                  <p>{person.thesis}</p>
                                </div>
                              )}
                              {person.status && (
                                <div>
                                  <span>STATUS</span>
                                  <p>{person.status}</p>
                                </div>
                              )}
                              {person.detail && (
                                <div>
                                  <span>RECORD</span>
                                  <p>{person.detail}</p>
                                </div>
                              )}
                              {!person.degree &&
                                !person.thesis &&
                                !person.status &&
                                !person.detail && (
                                  <p className="member-card-empty">
                                    Roster entry only.
                                  </p>
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
  );
}
