# Deploying InventiveClicks (for a developer)

The InventiveClicks marketing site (Next.js) lives on this branch:
**`claude/modest-dirac-bho65g`** of repo `pinetravelpk-bit/pinetravels`.

Keep it fully separate from `pinetravels` (the `main` branch / pinetravels.com).
**Do not modify `main`.**

## Option A — Vercel (fastest, recommended)
A Vercel project already exists (imported from this repo) and the domain
`inventiveclicks.com` points to it, but it is deploying the wrong branch
(`main` = old Pine Travel). To fix:

1. Open the Vercel project → **Settings → Git**.
2. Set **Production Branch** to `claude/modest-dirac-bho65g` → **Save**.
   (Newer Vercel UI: alternatively, go to **Deployments**, open the latest
   deployment built from `claude/modest-dirac-bho65g`, click **⋯ → Promote to
   Production**.)
3. **Settings → Domains** → make sure `inventiveclicks.com` and
   `www.inventiveclicks.com` are added.
4. Vercel auto-issues SSL. Confirm `inventiveclicks.com` shows the violet/blue
   InventiveClicks site.

DNS for Vercel (Hostinger → DNS Zone for inventiveclicks.com):
- `A  @  → 76.76.21.21`
- `CNAME  www  → cname.vercel-dns.com`

## Option B — On a server / VPS (Node)
```bash
git clone https://github.com/pinetravelpk-bit/pinetravels.git
cd pinetravels && git checkout claude/modest-dirac-bho65g
npm install && npm run build
npm i -g pm2 && pm2 start npm --name inventiveclicks -- start   # serves :3000
```
Then reverse-proxy `inventiveclicks.com` → `http://localhost:3000` in the
server's web server / panel, and issue SSL. Do not disturb other sites on the box.
