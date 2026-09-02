import { useState } from "react";
import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { PageHero } from "../components/Shared";
import { galleryPhotos } from "../data/siteContent";

const PHOTOS_PER_PAGE = 12;

export function GalleryPage() {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(
    1,
    Math.ceil(galleryPhotos.length / PHOTOS_PER_PAGE),
  );
  const pagePhotos = galleryPhotos.slice(
    (page - 1) * PHOTOS_PER_PAGE,
    page * PHOTOS_PER_PAGE,
  );
  const featuredPhoto =
    galleryPhotos.find(
      (photo) => photo.category === "group" || photo.category === "event",
    ) ?? galleryPhotos[0];
  const rangeStart =
    galleryPhotos.length === 0 ? 0 : (page - 1) * PHOTOS_PER_PAGE + 1;
  const rangeEnd = Math.min(page * PHOTOS_PER_PAGE, galleryPhotos.length);

  return (
    <>
      <PageHero
        eyebrow="實驗室照片"
        title="Gallery"
        description="保存 SCLab 一起研究、交流與成長的時刻。"
      />

      <section className="gallery-overview section-compact">
        <div className="container gallery-overview-grid">
          {featuredPhoto ? (
            <figure
              className="gallery-spotlight"
              style={{
                aspectRatio: `${featuredPhoto.width} / ${featuredPhoto.height}`,
              }}
            >
              <img
                src={featuredPhoto.src}
                alt={featuredPhoto.alt}
                width={featuredPhoto.width}
                height={featuredPhoto.height}
              />
              <figcaption>
                <span>
                  {featuredPhoto.year} · {featuredPhoto.label}
                </span>
                <strong>{featuredPhoto.title}</strong>
              </figcaption>
            </figure>
          ) : (
            <div
              className="gallery-spotlight gallery-spotlight-empty"
              aria-hidden="true"
            >
              <Images size={44} />
            </div>
          )}

          <div className="gallery-overview-copy">
            <Camera size={28} aria-hidden="true" />
            <p className="eyebrow title-eyebrow">實驗室照片</p>
            <h2 lang="en"> Photo Archive</h2>
            <div className="gallery-overview-facts">
              <div>
                <strong>{galleryPhotos.length}</strong>
                <span>PHOTOS</span>
              </div>
              <div>
                <strong>{String(pageCount).padStart(2, "0")}</strong>
                <span>PAGES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-collection section-pad" id="photo-archive">
        <div className="container">
          <header className="gallery-archive-header">
            <div>
              <p className="eyebrow title-eyebrow">照片集錦</p>
              <h2 lang="en">Photo Archive</h2>
            </div>
            <p aria-live="polite">
              {rangeStart}—{rangeEnd} / {galleryPhotos.length}
              <span>PAGE {String(page).padStart(2, "0")}</span>
            </p>
          </header>

          {pagePhotos.length === 0 ? (
            <div className="gallery-empty-state">
              <Images size={32} aria-hidden="true" />
              <h3>相簿正在整理中</h3>
              <p>加入實驗室照片後，這裡會自動建立照片牆與頁碼。</p>
            </div>
          ) : (
            <div className="gallery-masonry">
              {pagePhotos.map((photo) => (
                <figure
                  className={`gallery-tile ${photo.width / photo.height >= 2 ? "gallery-tile-wide" : ""}`}
                  key={photo.id}
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                  />
                  <figcaption>
                    <span>
                      {photo.year} · {photo.label}
                    </span>
                    <strong>{photo.title}</strong>
                    {photo.source && (
                      <a href={photo.source} target="_blank" rel="noreferrer">
                        Photo source{" "}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <nav
              className="pagination gallery-pagination"
              aria-label="相簿分頁"
            >
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
