import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Search,
  UserRound,
} from "lucide-react";
import { ExternalLink, PageHero, SectionHeading } from "../components/Shared";
import {
  historicalPeople,
  peopleSource,
  type HistoricalPerson,
} from "../data/archive";
import { papers, type Paper } from "../lib/papers";

type FormerMemberGroup = "phd" | "master";
type FormerMember = Omit<HistoricalPerson, "group"> & {
  readonly group: FormerMemberGroup;
  readonly publications: readonly Paper[];
};

const MEMBERS_PER_PAGE = 12;

const formerMemberGroups: readonly {
  id: FormerMemberGroup;
  title: string;
  titleZh: string;
}[] = [
  { id: "phd", title: "Ph.D. Students", titleZh: "博士班成員" },
  { id: "master", title: "Master's Students", titleZh: "碩士班成員" },
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

function memberKey(value: string) {
  const chineseName = value.match(/[\p{Script=Han}]{2,5}/u)?.[0];
  return (chineseName ?? value)
    .normalize("NFKC")
    .toLocaleLowerCase("zh-TW")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "");
}

function titleKey(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("zh-TW")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "");
}

const paperStudentAliases: Readonly<Record<string, string>> = {
  [memberKey("斌瑞")]: memberKey("Praveen Kumar"),
  [memberKey("蘇偉賢")]: memberKey("Austin So"),
};

function paperGroup(paper: Paper): FormerMemberGroup {
  return paper.degree.includes("博士") ? "phd" : "master";
}

function paperDegree(paper: Paper) {
  const department =
    {
      資訊工程學系: "Computer Science",
      資訊工程學系所: "Computer Science",
      資訊系統與應用研究所: "Information Systems and Applications",
      半導體研究學院: "Semiconductor Research",
    }[paper.department] ?? paper.department;

  return paper.degree.includes("博士")
    ? `Ph.D. in ${department}, NTHU`
    : `Master of ${department}, NTHU`;
}

function publicationPeriod(memberPapers: readonly Paper[]) {
  const years = [
    ...new Set(
      memberPapers
        .map((paper) => paper.publicationYear)
        .filter((year) => year > 0),
    ),
  ].sort((left, right) => left - right);

  if (years.length === 0) return "Thesis record";
  if (years.length === 1) return String(years[0]);
  return `${years[0]}–${years.at(-1)}`;
}

function buildFormerMembers(): readonly FormerMember[] {
  const members = new Map<string, FormerMember>();
  const archivedKeys = new Set<string>();

  historicalPeople.forEach((person) => {
    if (
      person.group !== "phd" &&
      person.group !== "master" &&
      person.group !== "alumni"
    ) {
      return;
    }

    const key = memberKey(person.name);
    const existing = members.get(key);
    const group: FormerMemberGroup = person.group === "phd" ? "phd" : "master";

    members.set(key, {
      ...existing,
      ...person,
      group,
      publications: existing?.publications ?? [],
    });
    archivedKeys.add(key);
  });

  const thesisOwners = new Map<string, string>();
  members.forEach((member, key) => {
    if (member.thesis) thesisOwners.set(titleKey(member.thesis), key);
  });

  papers.forEach((paper) => {
    const directKey = memberKey(paper.student);
    const aliasedKey = paperStudentAliases[directKey] ?? directKey;
    const titleOwner = [paper.title, paper.englishTitle]
      .filter(Boolean)
      .map(titleKey)
      .map((key) => thesisOwners.get(key))
      .find(Boolean);
    const key = members.has(aliasedKey)
      ? aliasedKey
      : (titleOwner ?? aliasedKey);
    const existing = members.get(key);
    const publications = [...(existing?.publications ?? []), paper]
      .filter(
        (publication, index, all) =>
          all.findIndex((candidate) => candidate.id === publication.id) ===
          index,
      )
      .sort(
        (left, right) =>
          right.publicationYear - left.publicationYear || right.id - left.id,
      );

    members.set(
      key,
      existing
        ? { ...existing, publications }
        : {
            name: paper.student,
            period: publicationPeriod(publications),
            group: paperGroup(paper),
            degree: paperDegree(paper),
            publications,
          },
    );
  });

  return [...members.entries()]
    .map(([key, member]) =>
      archivedKeys.has(key)
        ? member
        : { ...member, period: publicationPeriod(member.publications) },
    )
    .sort((left, right) => {
      if (left.group !== right.group) return left.group === "phd" ? -1 : 1;
      const leftYear = Math.max(
        ...left.publications.map((paper) => paper.publicationYear),
        ...(left.period.match(/(?:19|20)\d{2}/gu)?.map(Number) ?? [0]),
      );
      const rightYear = Math.max(
        ...right.publications.map((paper) => paper.publicationYear),
        ...(right.period.match(/(?:19|20)\d{2}/gu)?.map(Number) ?? [0]),
      );
      return (
        rightYear - leftYear || left.name.localeCompare(right.name, "zh-Hant")
      );
    });
}

const formerMembers = buildFormerMembers();
const currentMemberGroups = [
  {
    id: "collaborator",
    title: "Collaborators",
    titleZh: "研究合作夥伴",
    people: historicalPeople.filter(
      (person) => person.group === "collaborator",
    ),
  },
  {
    id: "staff",
    title: "Staff",
    titleZh: "行政人員",
    people: historicalPeople.filter((person) => person.group === "staff"),
  },
] as const;

export function PeoplePage() {
  const [activeGroup, setActiveGroup] = useState<MemberGroupFilter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const normalizedQuery = query.trim().toLocaleLowerCase("zh-TW");

  const visibleMembers = useMemo(
    () =>
      formerMembers.filter((person) => {
        if (activeGroup !== "all" && person.group !== activeGroup) return false;
        if (!normalizedQuery) return true;
        return [
          person.name,
          person.period,
          person.degree,
          person.thesis,
          person.status,
          person.detail,
          ...person.publications.flatMap((paper) => [
            paper.title,
            paper.englishTitle,
          ]),
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("zh-TW")
          .includes(normalizedQuery);
      }),
    [activeGroup, normalizedQuery],
  );
  const pageCount = Math.max(
    1,
    Math.ceil(visibleMembers.length / MEMBERS_PER_PAGE),
  );
  const pagedMembers = visibleMembers.slice(
    (page - 1) * MEMBERS_PER_PAGE,
    page * MEMBERS_PER_PAGE,
  );
  const rangeStart =
    visibleMembers.length === 0 ? 0 : (page - 1) * MEMBERS_PER_PAGE + 1;
  const rangeEnd = Math.min(page * MEMBERS_PER_PAGE, visibleMembers.length);

  return (
    <>
      <PageHero
        eyebrow="團隊成員"
        title="Members"
        description="匯聚人工智慧、積體電路與設計自動化領域的研究人才，記錄現任與歷屆團隊成員。"
      />

      <section className="section-pad current-members-section">
        <div className="container">
          <SectionHeading eyebrow="現任成員" title="Current" />
          <div className="current-member-group-head">
            <p className="eyebrow title-eyebrow">學生</p>
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
                  <p className="eyebrow title-eyebrow">{group.titleZh}</p>
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
          <SectionHeading eyebrow="歷屆成員" title="Graduated" />
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
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
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
                  onClick={() => {
                    setActiveGroup(filter.id);
                    setPage(1);
                  }}
                >
                  {filter.title}
                </button>
              ))}
            </div>
          </div>

          <div className="member-result-bar" aria-live="polite">
            <span>
              {rangeStart}–{rangeEnd} / {visibleMembers.length} member records
            </span>
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
                  members: pagedMembers.filter(
                    (person) => person.group === group.id,
                  ),
                }))
                .filter((group) => group.members.length > 0)
                .map((group) => (
                  <section className="member-directory-group" key={group.id}>
                    <div className="member-directory-group-head">
                      <div>
                        <p className="eyebrow title-eyebrow">{group.titleZh}</p>
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
                              {person.publications.length > 0 ? (
                                <div>
                                  <span>THESIS / DISSERTATION</span>
                                  <ul className="member-publication-list">
                                    {person.publications.map((paper) => (
                                      <li key={paper.id}>
                                        <a
                                          href={paper.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          aria-label={`Open ${paper.englishTitle}`}
                                        >
                                          <p>{paper.englishTitle}</p>
                                          <ArrowUpRight
                                            size={14}
                                            aria-hidden="true"
                                          />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : person.thesis ? (
                                <div>
                                  <span>THESIS / RESEARCH</span>
                                  <p>{person.thesis}</p>
                                </div>
                              ) : null}
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
                                person.publications.length === 0 &&
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

          {pageCount > 1 && (
            <nav className="pagination" aria-label="歷屆成員分頁">
              <button
                type="button"
                disabled={page === 1}
                aria-label="上一頁"
                onClick={() => setPage((current) => current - 1)}
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    className={pageNumber === page ? "active" : undefined}
                    type="button"
                    key={pageNumber}
                    aria-current={pageNumber === page ? "page" : undefined}
                    aria-label={`第 ${pageNumber} 頁`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={page === pageCount}
                aria-label="下一頁"
                onClick={() => setPage((current) => current + 1)}
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </nav>
          )}

          <div className="member-source-link">
            <ExternalLink href={peopleSource.url}>Source roster</ExternalLink>
          </div>
        </div>
      </section>
    </>
  );
}
