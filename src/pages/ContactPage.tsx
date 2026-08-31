import { ArrowUpRight, Building2, Mail, MapPin, Phone } from 'lucide-react'
import { ExternalLink, PageHero, SectionHeading } from '../components/Shared'
import { campusPhotos, professor } from '../data/siteContent'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="聯絡資訊"
        english="Contact"
        description="歡迎就研究合作、學生指導與產學計畫等事宜與實驗室聯繫。"
      />

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="DIRECT CONTACT"
            title="聯絡方式"
            english="Contact Information"
          />
          <figure className="contact-campus-photo">
            <img src={campusPhotos[0].src} alt={campusPhotos[0].alt} />
            <figcaption>
              <div>
                <span className="eyebrow">NATIONAL TSING HUA UNIVERSITY</span>
                <strong>{campusPhotos[0].title}</strong>
              </div>
              <a href={campusPhotos[0].source} target="_blank" rel="noreferrer">
                Photo source <ArrowUpRight size={14} />
              </a>
            </figcaption>
          </figure>
          <div className="contact-grid">
            <article className="contact-card">
              <Mail size={30} />
              <h3 lang="en">Email</h3>
              <a href={`mailto:${professor.email}`}>{professor.email}</a>
              <p>研究合作與產學計畫相關事宜，請來信聯繫。</p>
            </article>
            <article className="contact-card">
              <Phone size={30} />
              <h3 lang="en">Phone</h3>
              <a href={`tel:+886-${professor.phone.replace(/^0/, '').replace('-', '-')}`}>{professor.phone}</a>
              <p>National Tsing Hua University, Hsinchu, Taiwan</p>
            </article>
            <article className="contact-card">
              <Building2 size={30} />
              <h3 lang="en">Office</h3>
              <p>{professor.office}</p>
              <p>National Tsing Hua University</p>
            </article>
            <article className="contact-card">
              <MapPin size={30} />
              <h3 lang="en">Campus</h3>
              <p>新竹市光復路二段 101 號<br />No. 101, Section 2, Kuang-Fu Road, Hsinchu</p>
              <ExternalLink href="https://maps.google.com/?q=National+Tsing+Hua+University">Google Maps</ExternalLink>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
