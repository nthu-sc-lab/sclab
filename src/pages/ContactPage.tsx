import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import { ExternalLink, PageHero, SectionHeading, SourceBadge } from '../components/Shared'
import { professor, sources } from '../data/siteContent'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="讓對話成為合作的起點"
        english="Start a conversation"
        description="現況聯絡資訊以張世杰教授官方首頁為準；舊站的 R2341 與 R644 僅保留於歷史脈絡。"
      />

      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="DIRECT CONTACT"
            title="聯絡資訊"
            english="Professor and laboratory contact"
          />
          <div className="contact-grid">
            <article className="contact-card">
              <Mail size={30} />
              <h3>電子郵件 Email</h3>
              <a href={`mailto:${professor.email}`}>{professor.email}</a>
              <p>研究、招生或產學合作，請在信件中簡要說明主題與背景。</p>
            </article>
            <article className="contact-card">
              <Phone size={30} />
              <h3>電話 Phone</h3>
              <a href={`tel:+886-${professor.phone.replace(/^0/, '').replace('-', '-')}`}>{professor.phone}</a>
              <p>National Tsing Hua University, Hsinchu, Taiwan</p>
            </article>
            <article className="contact-card">
              <Building2 size={30} />
              <h3>辦公室 Office</h3>
              <p>{professor.office}</p>
              <p>National Tsing Hua University</p>
            </article>
            <article className="contact-card">
              <MapPin size={30} />
              <h3>校園 Campus</h3>
              <p>新竹市光復路二段 101 號<br />No. 101, Section 2, Kuang-Fu Road, Hsinchu</p>
              <ExternalLink href="https://maps.google.com/?q=National+Tsing+Hua+University">Google Maps</ExternalLink>
            </article>
          </div>
          <div style={{ marginTop: 30 }}>
            <SourceBadge href={sources.professor.url} label="聯絡資料官方來源 Official source" />
          </div>
        </div>
      </section>
    </>
  )
}
