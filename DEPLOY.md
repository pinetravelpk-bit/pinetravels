# Deploying InventiveClicks

The InventiveClicks marketing site (Next.js) lives on branch
**`claude/modest-dirac-bho65g`** of repo `pinetravelpk-bit/pinetravels`.
Keep it fully separate from `pinetravels` (the `main` branch / pinetravels.com).
**Do not modify `main`.**

This repo is configured for **static export** (`output: 'export'` in
`next.config.js`) — the whole site is plain HTML/CSS/JS with no server needed.

## Option A — Static hosting (simplest, recommended)
Host it exactly like an ordinary website on any hosting (shared/cPanel/VPS/panel):

```bash
npm install
npm run build      # generates the ./out folder (static site)
```
Upload **everything inside `out/`** (index.html, `_next/`, `about/`, `services/`,
`contact/`, `work/`, `insights/`, …) into the web root of `inventiveclicks.com`
(usually `public_html`). Point the domain's DNS at that host. Done — no Node,
no reverse proxy, no build step on the server.

## Option B — Managed platform
Vercel / Netlify / Cloudflare Pages: connect the repo, set the production branch
to `claude/modest-dirac-bho65g`, deploy. They build and serve it automatically
with SSL. Add the domain `inventiveclicks.com` in the platform, then point DNS as
that platform instructs.

## Editing content later
All copy/services/work/testimonials live in `lib/site.js`. Edit there, run
`npm run build` again, re-upload `out/`.
