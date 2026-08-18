# InventiveClicks — Creative Digital Marketing Agency

A fast, SEO-first, generative-AI-optimized marketing website for **InventiveClicks.com** —
a creative digital marketing agency offering **video animation, graphic design, creative
marketing** and **influencer marketing** (plus social media and web development).

Built with **Next.js 14 (App Router, JavaScript)** and **Tailwind CSS**. Design language:
violet + electric-blue gradients, Sora + Plus Jakarta Sans, smooth scroll-reveal motion.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

No database, no environment variables, no external services required — the whole site is
static and self-contained. Deploys as-is to Vercel, Netlify, or any Node host.

### Static export (optional, for shared/cPanel hosting)

Uncomment the three lines in `next.config.js` (`output: 'export'`, `trailingSlash`,
`images.unoptimized`) and run `npm run build`. The exported site lands in `out/`.

---

## Editing content

**Everything is driven from one file: [`lib/site.js`](lib/site.js).**

| Export | Controls |
|---|---|
| `site` | Brand name, tagline, contact details, address, social links |
| `nav` | Header / navigation items |
| `services` | The 6 services — cards, detail pages, deliverables, process, per-service FAQs |
| `stats` | Company counters |
| `process` | "How we work" steps |
| `whyUs` | Why-choose-us / values cards |
| `work` | Portfolio items |
| `testimonials` | Client quotes |
| `pricing` | Pricing tiers |
| `faqs` | General FAQ (home + schema) |
| `insights` | Blog articles (index + detail pages) |
| `clients` | Logo marquee wordmarks |

Change copy here and it updates across the whole site — no component edits needed.

> **Before launch:** replace the placeholder `email`, `phone`, `whatsappHref`, `address`
> and `socials` in `lib/site.js` with real details.

---

## SEO & Generative-AI optimization

This site is built to be found by search engines **and cited by AI answer engines**:

- **Structured data (JSON-LD)** on every page — see [`lib/seo.js`](lib/seo.js):
  `Organization` + `ProfessionalService`, `WebSite`, `Service`, `FAQPage`,
  `BreadcrumbList`, `WebPage`, `Article`, `Blog`, `ItemList`, `ContactPage`.
- **Per-page metadata** — titles, descriptions, canonical URLs, Open Graph & Twitter cards.
- **Dynamic OG image** — generated at `/opengraph-image` ([`app/opengraph-image.js`](app/opengraph-image.js)).
- **`sitemap.xml`** and **`robots.txt`** — generated dynamically from the content.
- **`public/llms.txt`** — a machine-readable brand summary for LLM crawlers.
- **`manifest.webmanifest`** — installable PWA metadata.

---

## Project structure

```
app/
  layout.js              Root layout: fonts, global metadata, Organization + WebSite JSON-LD
  page.js                Home (11 sections)
  services/page.js       Services index
  services/[slug]/       Dynamic service detail (Service + FAQ + Breadcrumb schema)
  work/page.js           Portfolio (filterable)
  about/page.js          About / story / values
  insights/page.js       Blog index
  insights/[slug]/       Article pages (Article schema)
  contact/page.js        Contact form (composes a prefilled email — no backend)
  not-found.js           Branded 404
  opengraph-image.js     Dynamic social image
  sitemap.js robots.js manifest.js
  globals.css            Design system (gradients, buttons, animations)

components/
  Header, Footer, Logo, Icons, SectionHead, Marquee, PageHero, Reveal
  WorkCard, WorkGrid, ContactForm
  home/                  Homepage sections (Hero, Services, About, Process, Work, …)

lib/
  site.js                All content (source of truth)
  seo.js                 JSON-LD builders + <JsonLd>
```

---

## Design tokens

| Token | Hex | Use |
|---|---|---|
| `brand` (500) | `#7C4DFF` | Primary violet |
| `azure` (500) | `#1BA5EC` | Electric-blue accent |
| `pink` / `coral` | `#FF5DA2` / `#FF6A5A` | Creative spark (gradients) |
| `ink` | `#0D0821` | Dark panels + display text |
| `cloud` | `#F6F5FB` | Page background |

Fonts: **Sora** (display) + **Plus Jakarta Sans** (body), loaded via Google Fonts `<link>`.
