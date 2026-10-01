# RX Direct, Domestic Staff Provider Website

A bilingual (English/Urdu), SEO-optimized website for RX Direct, built with Next.js (static export) and Tailwind CSS. Self-hosted on a VPS (nginx + a small Node API); see **Hosting on the VPS** below.

> **2026 redesign:** the look follows the new blue design (top bar, photo-collage hero with staff search, registration section, locations, two-column FAQ). Every URL from the Netlify site is unchanged — same routes, same content, same sitemaps.

## What's included

- **Multi-page site**: Home, About, Services (overview + 8 category pages), Cities (overview + Islamabad/Rawalpindi/Lahore/Karachi pages), How It Works, Blog, FAQs, Contact.
- **Mega menus** for Services, For Businesses, Locations and About Us, full mobile menu, and an EN/UR language switcher with right-to-left (RTL) layout for Urdu.
- **SEO**: per-page metadata, Open Graph/Twitter cards, JSON-LD structured data (LocalBusiness, Service, Article, FAQPage, Breadcrumbs), auto-generated `sitemap.xml` and `robots.txt`.
- **Blog**: Markdown posts in `content/blog/`, rendered as static pages. To add or edit a post, add/edit a `.md` file there (copy an existing one for the front-matter fields) and redeploy.
- **Designed blog covers**: `scripts/generate-blog-covers.mjs` draws a cover for every post (type colour from `data/blogKinds.json`, service icon, city, title) before each build, so new posts get one automatically. The post's original `featured_image` photo is still used for social previews.
- **Animated guide on every post**: `components/BlogGuide.tsx` shows a roadmap of the post's own sections (highlights where you are, click to jump) plus an animation matched to the post type: hiring steps, salary counter, or the verification checks for that service.
- **Site-wide settings**: WhatsApp number, default WhatsApp message and social links live in [`content/settings/business.json`](content/settings/business.json); photo overrides in [`content/settings/images.json`](content/settings/images.json).
- **WhatsApp-first contact**: floating WhatsApp button, WhatsApp links throughout, plus a contact form whose leads appear at `/admin/`.
- **Deep local SEO**: 8 cities × 48 housing societies × 18 services, cross-linked hub pages, ~370 blog posts, blog archive pages by city/service/society/tag, `sitemap.xml`, `robots.txt`, `llms.txt`, and JSON-LD throughout.
- **Moderated blog comments** (no login required to post): held as "pending" until approved at `/admin/` (Blog comments tab).
- **Two-line menu**: an upper navy line with all pages (Home, Jobs, Verification, Check status, Our team, Blog, FAQs, Contact) and a main line with four mega menus: Services, For Businesses, Locations, About Us.
- **Jobs board** (`/jobs`): jobs posted from the admin panel appear instantly; candidates apply with an optional CV.
- **Staff verification** (`/staff/register`, `/staff/status`): staff submit details, references and documents (CNIC, police and medical certificates). Admins tick off a 7-point checklist; approving issues an RX Direct Verified ID (`RXD-2026-0001`) and a printable ID card. Staff track progress with their reference and phone.
- **Team profiles** (`/team`): managed from the admin panel, with photos.
- **Admin panel** (`/admin/`): dashboard, staff verification, jobs, applications, contact leads, team and blog comments.

## Hosting on the VPS

`deploy/setup.sh` installs everything on a plain Ubuntu VPS and is also the update command:

```bash
curl -fsSL https://raw.githubusercontent.com/pinetravelpk-bit/pinetravels/main/rxdirect/deploy/setup.sh -o setup.sh && bash setup.sh
```

- nginx serves the static export (`out/`, copied to `/var/www/rxdirect`) with the same URL rules Netlify used (`/about` → `about.html`, `/about/` → 301 `/about`).
- `server/api.mjs` (systemd service `rxdirect-api`) serves `/api/*` (jobs, applications, staff verification, team) and the old `/.netlify/functions/*` URLs (contact leads, blog comments). Data is JSON in `/var/lib/rxdirect/data`; uploaded documents in `/var/lib/rxdirect/data/uploads/private` are only readable through the admin panel.
- `/admin/` manages everything above. Password: `ADMIN_PASSWORD` in `/etc/rxdirect.env` (printed once by the setup script).
- HTTPS via Let's Encrypt is added automatically once `rxdirect.pk` points at the server.

Back up `/var/lib/rxdirect/data` — it holds all leads, comments, staff documents, jobs and applications.

The script sets up nginx and HTTPS **before** the long build, so SSL is in place even if a build fails.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test the contact form and comments locally, also run the API in a second terminal:

```bash
ADMIN_PASSWORD=test node server/api.mjs   # http://127.0.0.1:3101
```

## Before going live, things to update

Everything below is centralized so you only need to edit one file per topic:

| What | Where |
|---|---|
| WhatsApp number, default WhatsApp message, social media links | [`content/settings/business.json`](content/settings/business.json) |
| Business name, email, address | [`data/business.ts`](data/business.ts), code-level, not exposed in the admin panel |
| Site URL (used for canonical links, sitemap, OG tags) | `siteUrl` in [`data/business.ts`](data/business.ts) |
| Contact form submissions | Stored by `server/api.mjs`, shown at `/admin/` |
| Blog comments | Stored by `server/api.mjs`; nothing appears until approved at `/admin/` |
| Service descriptions / pricing copy | [`data/services.ts`](data/services.ts) |
| City descriptions / areas covered | [`data/cities.ts`](data/cities.ts) |
| Testimonials | [`data/testimonials.ts`](data/testimonials.ts) |
| FAQs | [`data/faqs.ts`](data/faqs.ts) |
| UI/page translations (English & Urdu) | [`i18n/en.json`](i18n/en.json), [`i18n/ur.json`](i18n/ur.json) |

The email address and the social media URLs currently contain **placeholder** values, update social links in `content/settings/business.json`, and search for `PLACEHOLDER` comments in `data/business.ts` for the rest.

Stock photography is used throughout (`public/images/`, sourced from free-to-use Unsplash/Pexels/Wikimedia Commons). Swap in real photos of your team/staff whenever you have them, same file names, drop-in replacement.

## Tech stack

- **Next.js 14** (App Router, static export via `output: 'export'`), real per-page HTML for SEO/social previews, still React.
- **Tailwind CSS** for styling, with `rtl:` variants for Urdu layout.
- **server/api.mjs**: dependency-free Node API for leads and comments on the VPS.
- **gray-matter** + **remark** for parsing/rendering blog markdown at build time.
- Custom React Context i18n (`i18n/LanguageContext.tsx`), no external i18n library needed for this site's scope.

## Project structure

```
/app, pages (App Router)
/components, shared UI components
/data, business info, services, cities, testimonials, FAQs
/content/blog, blog posts (markdown)
/i18n, English/Urdu translation dictionaries + language context
/lib, markdown parsing, JSON-LD schema helpers
/public/admin, leads & comment moderation page (talks to server/api.mjs)
/server, VPS API server (replaces the old Netlify Functions)
/deploy, VPS install/update script
/public/images, stock photography, organized by section
```
