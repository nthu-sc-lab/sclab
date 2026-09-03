import {
  ArrowUpRight,
  BookOpen,
  Building2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  ExternalLink,
  SectionHeading,
  SourceBadge,
} from "../components/Shared";
import {
  coursesTaught,
  professor,
  professorMilestones,
  professorPhoto,
} from "../data/siteContent";

export function AdvisorPage() {
  return (
    <>
      <section className="advisor-hero section-pad">
        <div className="container advisor-hero-grid">
          <figure className="advisor-portrait">
            <img
              src={professorPhoto.member}
              alt="張世杰教授 Prof. Shih-Chieh Chang"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = professorPhoto.fallback;
              }}
            />
            <figcaption>
              <span>PRINCIPAL INVESTIGATOR</span>
              <strong>NTHU · SC LAB</strong>
            </figcaption>
          </figure>

          <div className="advisor-intro">
            <p className="eyebrow title-eyebrow">指導教授</p>
            <p className="advisor-name-zh">張世杰 教授</p>
            <h1 lang="en">
              Shih-Chieh
              <br />
              Chang
            </h1>
            <p className="advisor-title">{professor.title.zh}</p>
            <p className="advisor-summary">{professor.introduction.zh}</p>

            <div className="advisor-contact-list">
              <a href={`mailto:${professor.email}`}>
                <Mail size={17} aria-hidden="true" />
                <span>
                  <small>EMAIL</small>
                  {professor.email}
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={`tel:+886-${professor.phone.replace(/^0/, "")}`}>
                <Phone size={17} aria-hidden="true" />
                <span>
                  <small>PHONE</small>
                  {professor.phone}
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <div>
                <MapPin size={17} aria-hidden="true" />
                <span>
                  <small>OFFICE</small>
                  {professor.office}
                </span>
              </div>
            </div>

            <ExternalLink href={professor.source.url}>
              Official profile
            </ExternalLink>
          </div>
        </div>
      </section>

      <section className="section-pad advisor-details">
        <div className="container advisor-details-grid">
          <div>
            <SectionHeading
              eyebrow="學術與專業經歷"
              title="Academic &  Experience"
            />
            <div className="milestone-list">
              {professorMilestones.map((milestone) => (
                <div
                  className="milestone"
                  key={`${milestone.period}-${milestone.title}`}
                >
                  <time>{milestone.period}</time>
                  <div>
                    <p>{milestone.title}</p>
                    <p lang="en">{milestone.english}</p>
                    <SourceBadge
                      href={milestone.source.url}
                      label={milestone.source.label}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="advisor-facts">
            <p className="eyebrow">PROFILE</p>
            <div className="advisor-fact">
              <Building2 size={18} aria-hidden="true" />
              <div>
                <small>RESEARCH UNITS</small>
                <p>
                  資訊工程學系
                  <br />
                  半導體研究學院
                </p>
              </div>
            </div>
            {professor.education.map((education) => (
              <div className="advisor-fact" key={education}>
                <GraduationCap size={19} aria-hidden="true" />
                <div>
                  <small>EDUCATION</small>
                  <p lang="en">{education}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section-pad ">
        <div className="container">
          <SectionHeading eyebrow="授課紀錄" title="Courses Taught" />

          <div className="course-catalog">
            <aside className="course-catalog-intro">
              <div className="course-catalog-icon" aria-hidden="true">
                <BookOpen size={25} strokeWidth={1.5} />
              </div>
              <p className="eyebrow">CURRICULUM ARCHIVE</p>
              <strong>{String(coursesTaught.length).padStart(2, "0")}</strong>
              <span>COURSES </span>

              <p className="course-catalog-note"></p>
              <ExternalLink href="https://curricul.site.nthu.edu.tw/p/406-1208-290365,r7880.php?Lang=zh-tw">
                NTHU course database
              </ExternalLink>
            </aside>

            <div className="course-catalog-list">
              {coursesTaught.map((course, index) => (
                <article
                  className={`course-record${course.period === "earlier" ? " course-record-earlier" : ""}`}
                  key={`${course.zh}-${course.en}`}
                >
                  <div className="course-record-index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>
                      {course.period === "earlier" ? "ARCHIVE" : "COURSE"}
                    </small>
                  </div>
                  <div className="course-record-body">
                    <div className="course-record-heading">
                      <div>
                        <p>{course.code}</p>
                        <h3>{course.zh}</h3>
                        <span lang="en">{course.en}</span>
                      </div>
                      <span className="course-record-status">
                        {course.period === "earlier"
                          ? "EARLIER COURSE"
                          : "PREVIOUSLY TAUGHT"}
                      </span>
                    </div>
                    <p className="course-record-summary">{course.summary}</p>
                    <div className="course-record-footer">
                      <div>
                        <span>{course.credits} CREDITS</span>
                        <span>{course.area}</span>
                      </div>
                      <a
                        href={course.source.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {course.source.label}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section-compact advisor-research-focus">
        <div className="container">
          <SectionHeading eyebrow="近期研究重點" title="Current Research" />
          <div className="advisor-focus-list advisor-focus-grid">
            {researchAreas.map((area, index) => (
              <article key={area.id}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{area.title.zh}</h3>
                  <p lang="en">{area.title.en}</p>
                  <div className="advisor-topic-list">
                    {area.topics.slice(0, 3).map((topic) => (
                      <span key={topic.en}>{topic.en}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
