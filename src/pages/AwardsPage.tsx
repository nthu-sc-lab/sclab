import { useMemo, useState } from "react";
import { ArrowUpRight, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero, SourceBadge } from "../components/Shared";
import { featuredHonor, honors, type AwardScope } from "../data/archive";

const scopeFilters: readonly { id: AwardScope | "all"; label: string }[] = [
  { id: "all", label: "All records" },
  { id: "faculty", label: "Professor" },
  { id: "supervised", label: "Supervised teams" },
];

const scopeLabels: Record<AwardScope, string> = {
  faculty: "PROFESSOR",
  supervised: "SUPERVISED TEAMS",
};

const AWARDS_PER_PAGE = 8;

function awardYearValue(year: string) {
  const match = year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

export function AwardsPage() {
  const [scope, setScope] = useState<AwardScope | "all">("all");
  const [page, setPage] = useState(1);

  const visibleAwards = useMemo(
    () =>
      honors
        .filter((award) => scope === "all" || award.scope === scope)
        .slice()
        .sort((a, b) => awardYearValue(b.year) - awardYearValue(a.year)),
    [scope],
  );

  const facultyCount = honors.filter(
    (award) => award.scope === "faculty",
  ).length;
  const supervisedCount = honors.filter(
    (award) => award.scope === "supervised",
  ).length;
  const pageCount = Math.max(
    1,
    Math.ceil(visibleAwards.length / AWARDS_PER_PAGE),
  );
  const pagedAwards = visibleAwards.slice(
    (page - 1) * AWARDS_PER_PAGE,
    page * AWARDS_PER_PAGE,
  );

  return (
    <>
      <PageHero
        eyebrow="獎項與榮譽"
        title="Awards & Honors"
        description="研究成果獲國內外學術、工程與產業獎項肯定。"
      />

      <section className="section-pad awards-section">
        <div className="container">
          <div className="awards-summary">
            <div>
              <strong>{honors.length}</strong>
              <span>DOCUMENTED RECORDS</span>
            </div>
            <div>
              <strong>{facultyCount}</strong>
              <span>PROFESSOR</span>
            </div>
            <div>
              <strong>{supervisedCount}</strong>
              <span>SUPERVISED TEAMS</span>
            </div>
          </div>

          <div
            className="awards-toolbar"
            role="group"
            aria-label="Filter awards"
          >
            {scopeFilters.map((filter) => (
              <button
                className={
                  scope === filter.id ? "award-filter active" : "award-filter"
                }
                key={filter.id}
                type="button"
                aria-pressed={scope === filter.id}
                onClick={() => {
                  setScope(filter.id);
                  setPage(1);
                }}
              >
                {filter.label}
              </button>
            ))}
            <span>
              {visibleAwards.length} records · {page} / {pageCount}
            </span>
          </div>

          <div className="award-list">
            {pagedAwards.map((award) => (
              <article
                className={
                  award === featuredHonor
                    ? "award-record award-record-featured"
                    : "award-record"
                }
                key={`${award.year}-${award.scope}-${award.title}`}
              >
                <div className="award-record-year">
                  <span>{award.year}</span>
                  <Award size={21} aria-hidden="true" />
                </div>
                <div className="award-record-body">
                  <p className="award-scope">{scopeLabels[award.scope]}</p>
                  <h2>{award.title}</h2>
                  <p className="award-detail" lang="en">
                    {award.detail}
                  </p>
                  <SourceBadge
                    href={award.source.url}
                    label={award.source.label}
                  />
                </div>
                {award === featuredHonor && (
                  <figure className="award-record-media">
                    <img
                      src={featuredHonor.image}
                      alt="張世杰教授於第 32 屆東元獎頒獎典禮致詞"
                    />
                    <figcaption>
                      <a
                        href={featuredHonor.imageSource.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        NTHU PHOTO <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    </figcaption>
                  </figure>
                )}
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <nav className="pagination" aria-label="Awards pagination">
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
        </div>
      </section>
    </>
  );
}
