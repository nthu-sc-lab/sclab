import { ArrowUpRight, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router'
import { PageHero, SectionHeading } from '../components/Shared'
import { campusPhotos } from '../data/siteContent'
import { paperCategoryCounts, papers } from '../lib/papers'

export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="LABORATORY GALLERY"
        title="實驗室照片"
        english="Lab Gallery"
        description="記錄 SC Lab 所在的清華校園與研究場域。首頁保留研究重點，完整影像集中在這個獨立頁面。"
      />

      <section className="section-pad gallery-section">
        <div className="container">
          <div className="gallery-grid">
            {campusPhotos.map((photo, index) => (
              <figure className={`gallery-photo${index === 0 ? ' gallery-photo-featured' : ''}`} key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption>
                  <span>{photo.label}</span>
                  <strong>{photo.title}</strong>
                  <a href={photo.source} target="_blank" rel="noreferrer">
                    Photo source <ArrowUpRight size={14} />
                  </a>
                </figcaption>
              </figure>
            ))}
            <article className="gallery-note">
              <ImageIcon size={28} aria-hidden="true" />
              <span className="eyebrow">SC LAB · NTHU</span>
              <h2>從校園走向研究現場</h2>
              <p>研究團隊以清華大學資訊工程與半導體研究場域為基地，持續探索 AI、晶片設計自動化、視覺與音訊系統。</p>
              <div className="gallery-note-facts">
                <div><strong>{papers.length}</strong><span>CATALOGUE RECORDS</span></div>
                <div><strong>{Object.values(paperCategoryCounts).length}</strong><span>RESEARCH AREAS</span></div>
              </div>
              <Link className="text-link" to="/research">Explore research <ArrowUpRight size={17} /></Link>
            </article>
          </div>
          <div className="gallery-back-link">
            <Link className="text-link" to="/">Back to home <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section-pad dark-section">
        <div className="container">
          <SectionHeading
            eyebrow="IMAGE NOTE"
            title="校園影像"
            english="Campus context"
            description="照片素材取自國立清華大學官方新聞頁面，作為研究團隊校園場域的公開影像紀錄。"
          />
        </div>
      </section>
    </>
  )
}

