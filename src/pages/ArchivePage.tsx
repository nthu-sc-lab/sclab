import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero, SectionHeading, SourceBadge } from "../components/Shared";
import {
  announcements,
  historicalPeople,
  peopleSource,
  seniorProjects,
  type HistoricalPerson,
} from "../data/archive";

type ArchiveSection = "people" | "announcements" | "projects";

const groupLabels: Record<HistoricalPerson["group"], string> = {
  phd: "Ph.D. Students",
  master: "Master's Students",
  alumni: "Alumni",
  collaborator: "Collaborators",
  staff: "Staff",
};

const announcementLabels = {
  news: "網站與名單",
  award: "競賽與榮譽",
  project: "專題活動",
  community: "社群活動",
} as const;

export function ArchivePage() {
  const [section, setSection] = useState<ArchiveSection>("people");
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<HistoricalPerson["group"] | "">("");

  const normalizedQuery = query.trim().toLocaleLowerCase("zh-TW");

  const visiblePeople = useMemo(
    () =>
      historicalPeople.filter((person) => {
        if (group && person.group !== group) return false;
        if (!normalizedQuery) return true;
        return [person.name, person.period, person.detail]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("zh-TW")
          .includes(normalizedQuery);
      }),
    [group, normalizedQuery],
  );

  const visibleAnnouncements = useMemo(
    () =>
      announcements.filter((announcement) => {
        if (!normalizedQuery) return true;
        return `${announcement.date} ${announcement.title}`
          .toLocaleLowerCase("zh-TW")
          .includes(normalizedQuery);
      }),
    [normalizedQuery],
  );

  const groupedPeople = Object.entries(groupLabels)
    .map(([groupId, label]) => ({
      groupId: groupId as HistoricalPerson["group"],
      label,
      people: visiblePeople.filter((person) => person.group === groupId),
    }))
    .filter((item) => item.people.length > 0);

  const selectSection = (nextSection: ArchiveSection) => {
    setSection(nextSection);
    setQuery("");
    setGroup("");
  };

  return (
    <>
      <PageHero
        eyebrow="ARCHIVE"
        title="歷年資料"
        english="Archive"
        description="彙整實驗室歷年成員、研究專題、競賽成果與重要紀錄。"
      />

      <section className="section-pad">
        <div className="container">
          <div
            className="archive-tabs"
            role="tablist"
            aria-label="Archive sections"
          >
            <button
              className={
                section === "people" ? "archive-tab active" : "archive-tab"
              }
              type="button"
              onClick={() => selectSection("people")}
            >
              People
            </button>
            <button
              className={
                section === "announcements"
                  ? "archive-tab active"
                  : "archive-tab"
              }
              type="button"
              onClick={() => selectSection("announcements")}
            >
              Announcements
            </button>
            <button
              className={
                section === "projects" ? "archive-tab active" : "archive-tab"
              }
              type="button"
              onClick={() => selectSection("projects")}
            >
              Projects
            </button>
          </div>

          {section !== "projects" && (
            <div className="archive-toolbar">
              <div className="control-field">
                <label htmlFor="archive-search">Search archive</label>
                <div style={{ position: "relative" }}>
                  <Search
                    size={17}
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 14,
                      color: "#698087",
                    }}
                  />
                  <input
                    id="archive-search"
                    value={query}
                    style={{ paddingLeft: 42 }}
                    placeholder={
                      section === "people"
                        ? "姓名、年份或研究題目"
                        : "公告標題或年份"
                    }
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>
              {section === "people" && (
                <div className="control-field">
                  <label htmlFor="archive-group">Group</label>
                  <select
                    id="archive-group"
                    value={group}
                    onChange={(event) =>
                      setGroup(
                        event.target.value as HistoricalPerson["group"] | "",
                      )
                    }
                  >
                    <option value="">全部分類</option>
                    {Object.entries(groupLabels).map(([groupId, label]) => (
                      <option key={groupId} value={groupId}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {section === "people" && (
            <>
              <div className="result-bar">
                <span>
                  顯示 {visiblePeople.length} / {historicalPeople.length}{" "}
                  筆歷史名錄
                </span>
              </div>
              {groupedPeople.length === 0 ? (
                <div className="empty-state">找不到符合條件的歷史名錄。</div>
              ) : (
                groupedPeople.map((item) => (
                  <section className="archive-group" key={item.groupId}>
                    <div className="archive-group-title">
                      <h2>{item.label}</h2>
                      <span>{item.people.length} RECORDS</span>
                    </div>
                    <div className="archive-records">
                      {item.people.map((person, index) => (
                        <article
                          className="archive-card"
                          key={`${person.group}-${person.name}-${index}`}
                        >
                          <div className="archive-card-head">
                            <h3>{person.name}</h3>
                          </div>
                          <p>{person.period}</p>
                          {person.detail && <p>{person.detail}</p>}
                        </article>
                      ))}
                    </div>
                  </section>
                ))
              )}
              <SourceBadge href={peopleSource.url} label={peopleSource.label} />
            </>
          )}

          {section === "announcements" && (
            <>
              <div className="result-bar">
                <span>
                  顯示 {visibleAnnouncements.length} / {announcements.length}{" "}
                  則歷史公告
                </span>
              </div>
              {visibleAnnouncements.length === 0 ? (
                <div className="empty-state">找不到符合條件的公告。</div>
              ) : (
                <div className="timeline">
                  {visibleAnnouncements
                    .slice()
                    .reverse()
                    .map((announcement) => (
                      <article
                        className="timeline-item"
                        key={`${announcement.date}-${announcement.title}`}
                      >
                        <time>{announcement.date}</time>
                        <div>
                          <span className="status-badge historical">
                            {announcementLabels[announcement.category]}
                          </span>
                          <h3 style={{ marginTop: 12 }}>
                            {announcement.title}
                          </h3>
                          <SourceBadge
                            href={announcement.source.url}
                            label="原始公告索引"
                          />
                        </div>
                      </article>
                    ))}
                </div>
              )}
            </>
          )}

          {section === "projects" && (
            <>
              <SectionHeading
                eyebrow="SENIOR PROJECTS"
                title="大學部專題"
                english="Senior Projects"
              />
              <div className="archive-records">
                {seniorProjects.map((project) => (
                  <article
                    className="archive-card"
                    key={`${project.year}-${project.title}`}
                  >
                    <div className="archive-card-head">
                      <h3 lang="en">{project.title}</h3>
                      <span className="status-badge historical">
                        {project.year}
                      </span>
                    </div>
                    <p>{project.result}</p>
                    <p>組員：{project.members}</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
