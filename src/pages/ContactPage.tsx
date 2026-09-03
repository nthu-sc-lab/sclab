import {
  ArrowRight,
  Building2,
  Mail,
  MapPin,
  MapPinned,
  Navigation,
  Phone,
} from "lucide-react";
import { ExternalLink, PageHero, SectionHeading } from "../components/Shared";
import { professor } from "../data/siteContent";

const labMap = {
  embed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1406.0006965789257!2d120.99197669630928!3d24.794960134150152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468360b9e03f9e3%3A0x22772dceb9fafb07!2sEECS%20Building!5e0!3m2!1sen!2stw!4v1692082800862!5m2!1sen!2stw",
  directions:
    "https://www.google.com/maps/search/?api=1&query=%E5%9C%8B%E7%AB%8B%E6%B8%85%E8%8F%AF%E5%A4%A7%E5%AD%B8%E8%B3%87%E8%A8%8A%E9%9B%BB%E6%A9%9F%E9%A4%A8",
} as const;

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="聯絡資訊"
        title="Contact"
        description="歡迎就研究合作、學生指導與產學計畫等事宜與實驗室聯繫。"
      />

      <section className="section-pad contact-section">
        <div className="container">
          <SectionHeading eyebrow="聯絡方式" title="Information" />

          <div className="contact-grid">
            <article className="contact-card">
              <Mail size={30} />
              <h3 lang="en">Email</h3>
              <a href={`mailto:${professor.email}`}>{professor.email}</a>
            </article>
            <article className="contact-card">
              <Phone size={30} />
              <h3 lang="en">Phone</h3>
              <a
                href={`tel:+886-${professor.phone.replace(/^0/, "").replace("-", "-")}`}
              >
                {professor.phone}
              </a>
              <p>National Tsing Hua University, Hsinchu, Taiwan</p>
            </article>
            <article className="contact-card">
              <Building2 size={30} />
              <h3 lang="en">Professor Office</h3>
              <p>{professor.office}</p>
              <p>National Tsing Hua University</p>
            </article>
            <article className="contact-card">
              <MapPin size={30} />
              <h3 lang="en">Campus</h3>
              <p>
                新竹市光復路二段 101 號<br />
                No. 101, Section 2, Kuang-Fu Road, Hsinchu
              </p>
              <ExternalLink href="https://maps.google.com/?q=National+Tsing+Hua+University">
                Google Maps
              </ExternalLink>
            </article>
          </div>

          <section
            className="contact-location-section"
            aria-labelledby="lab-location-title"
          >
            <header className="contact-location-header">
              <div>
                <p className="eyebrow title-eyebrow">實驗室位置</p>
                <h2 id="lab-location-title" lang="en">
                  Lab Location
                </h2>
              </div>
            </header>

            <div className="contact-location-layout">
              <div className="contact-map-frame">
                <iframe
                  src={labMap.embed}
                  title="國立清華大學資訊電機館地圖"
                  loading="eager"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <aside className="contact-location-card">
                <div className="contact-location-icon" aria-hidden="true">
                  <MapPinned size={27} strokeWidth={1.5} />
                </div>
                <h3>劉炯朗館 R2341</h3>
                <p className="contact-location-name" lang="en">
                  EECS Building, R2341
                </p>
                <dl className="contact-location-facts">
                  <div>
                    <dt>UNIVERSITY</dt>
                    <dd>國立清華大學</dd>
                  </div>
                  <div>
                    <dt>ADDRESS</dt>
                    <dd>新竹市光復路二段 101 號</dd>
                  </div>
                </dl>
                <a
                  className="button-primary contact-map-link"
                  href={labMap.directions}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation size={16} aria-hidden="true" />
                  Google Maps
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </aside>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
