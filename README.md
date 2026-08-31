# SCLAB

National Tsing Hua University SCLAB website, built with React and Vite.

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

## GitHub Pages

The Vite base path is `/sclab/`, and client-side pages use hash routes so that
refreshing a route works on GitHub Pages. Pushes to `main` deploy `dist/` through
the GitHub Pages workflow. A repository administrator must select **GitHub
Actions** under **Settings → Pages → Build and deployment → Source** once before
the first deployment.
