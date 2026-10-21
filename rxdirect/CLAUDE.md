# Project identity: RX Direct (rxdirect.pk)

- **Code**: `rxdirect/` folder of `pinetravelpk-bit/pinetravels` (moved here from `realtoheed/rx-direct`).
- **Live domain**: `rxdirect.pk`
- **Hosting**: Hostinger VPS (72.62.193.221). `deploy/setup.sh` builds the static export and serves it with nginx; `server/api.mjs` replaces the old Netlify Functions at the same URLs. No Netlify anymore.

## URLs must never change

The site moved from Netlify with every URL preserved (~2,100 pages). Do not rename routes, slugs, blog filenames or `/images` paths. After any change, build and compare the page list against the previous build; nothing may disappear.

## SEO: rxdirect.pk is self-canonical

Every page's `<link rel="canonical">` points back at its own rxdirect.pk URL (see `canonicalOrigin`/`canonicalUrl()` in `data/business.ts`). Do not point canonical tags, `sitemap.xml`, `robots.txt`, or JSON-LD `url`/`logo`/`image` fields at any other domain without being explicitly asked.
