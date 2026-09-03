# SCLAB

National Tsing Hua University SCLAB website, built with React and Vite.

The thesis and dissertation archive is loaded from [`papers.csv`](./papers.csv), the 124-record NTHU library export. Verified journal and conference publications are maintained separately in [`src/data/researchPublications.ts`](./src/data/researchPublications.ts). The site derives recent research areas and a year-range topic index from thesis title and subject metadata. Advisor and member profiles live under `#/about`, while the photo collection is available at `#/gallery`.

## Local development

On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Before publishing, run the same checks as CI:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run test
npm.cmd run build
```

## Gallery photos

Website-ready photos belong in `public/gallery/`. Use WebP when possible, keep
landscape photos around 1600–1920px wide, and aim for less than 500 KB per file.
After adding a file, register its path, original width and height, title, label,
and alt text in the `galleryPhotos` array in `src/data/siteContent.ts`. The
Gallery uses those dimensions to preserve the entire photo, arrange panoramic
images across a full row, and update pagination automatically. Keep
full-resolution originals outside `public/` so they are not served to visitors.

## GitHub Pages

The Vite base path is `/sclab/`, and client-side pages use hash routes so that
refreshing a route works on GitHub Pages. Pushes to `main` deploy `dist/` through
the GitHub Pages workflow. A repository administrator must select **GitHub
Actions** under **Settings → Pages → Build and deployment → Source** once before
the first deployment.
