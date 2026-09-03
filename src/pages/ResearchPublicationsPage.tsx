import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionHeading } from "../components/Shared";
import { researchPublications } from "../data/researchPublications";

export function ResearchPublicationsPage() {
  const featuredPublication = researchPublications[0];
  const latestYear = featuredPublication?.year ?? "—";
  const journalCount = researchPublications.filter(
    (publication) => publication.type === "Journal Article",
  ).length;
  const conferenceCount = researchPublications.length - journalCount;

  return (
    <>
      <PageHero
        eyebrow="學術發表"
        title="Publications"
        description="發表於國際期刊或研討會的研究成果。"
      />

      <section className="section-pad research-publications-section">
        <div className="container">
          <div className="published-overview">
            <SectionHeading
              eyebrow="期刊與研討會論文"
              title="Published Works"
            />
            {/* <div className="published-overview-source">
              <BookOpenText size={22} aria-hidden="true" />
              <div>
                <span>LATEST PUBLICATION</span>
                {featuredPublication && (
                  <ExternalLink href={featuredPublication.url}>
                    Open latest DOI record
                  </ExternalLink>
                )}
              </div>
            </div> */}
          </div>

          <div className="published-summary" aria-label="Publication summary">
            <div>
              <strong>
                {String(researchPublications.length).padStart(2, "0")}
              </strong>
              <span>VERIFIED RECORDS</span>
            </div>
            <div>
              <strong>{latestYear}</strong>
              <span>LATEST YEAR</span>
            </div>
            <div>
              <strong>
                {journalCount} / {conferenceCount}
              </strong>
              <span>JOURNAL / CONFERENCE</span>
            </div>
          </div>

          <div className="published-paper-list">
            {researchPublications.map((publication, index) => (
              <article className="published-paper" key={publication.id}>
                <div className="published-paper-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{publication.year}</strong>
                </div>
                <div className="published-paper-body">
                  <div className="published-paper-labels">
                    <span>{publication.type}</span>
                    <span>{publication.topic}</span>
                  </div>
                  <h3 lang="en">{publication.title}</h3>
                  <p className="published-paper-authors" lang="en">
                    {publication.authors}
                  </p>
                  <p className="published-paper-venue" lang="en">
                    {publication.venue}
                  </p>
                  {publication.doi && (
                    <span className="published-paper-doi">
                      DOI {publication.doi}
                    </span>
                  )}
                </div>
                <a
                  className="published-paper-link"
                  href={publication.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open official record for ${publication.title}`}
                >
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
