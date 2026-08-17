# InventiveClicks — Next.js Theme

A creative **digital marketing agency** website for **inventiveclicks.com**, built as a
modern Next.js 14 theme. The design, structure and animations follow the
_Growim – Creative Digital Marketing Agency_ template pattern, rebuilt from scratch
in React with an original, self-contained visual system.

> Live-preview reference: Growim by Jthemes (ThemeForest #54303167). This is an
> independent Next.js implementation — no theme files or copyrighted assets are used.

---

## Stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 14 (App Router, **JavaScript**) |
| Styling    | Tailwind CSS 3 + a token-based design system (`app/globals.css`) |
| Animation  | Framer Motion (reveals, stagger, counters, magnetic, tilt, marquees) |
| Icons      | lucide-react |
| Fonts      | Syne (display) + Manrope (body), self-hosted via `@fontsource` (offline-safe) |
| Imagery    | **100% generated** — inline SVG posters, avatars, brand-marks, hero graphic |

There are no external image, font or script dependencies at runtime — the whole
site is self-contained and works with no network access.

## Getting started

```bash
cd inventiveclicks
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerender to static HTML)
npm run start      # serve the production build
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, trust marquee, services, about, process, case studies, stats, testimonials, team, pricing, blog, FAQ, CTA |
| `/about` | Story, values, timeline, team, testimonials |
| `/services` | All services + process + FAQ |
| `/services/[slug]` | Service detail (8 services) |
| `/projects` | Case-study grid |
| `/projects/[slug]` | Case study detail (6 projects) |
| `/team` | Team grid + careers band |
| `/pricing` | Plans + process + FAQ |
| `/blog` | Featured post + article grid |
| `/blog/[slug]` | Article (6 posts) |
| `/contact` | Contact form + details + FAQ |
| `404` | Custom not-found |

## Where to edit

- **All content** lives in [`lib/data.js`](lib/data.js) — services, projects, team,
  posts, testimonials, pricing, nav, footer, site details. Change copy and links there.
- **Brand colours / fonts / motion** are tokens in
  [`tailwind.config.js`](tailwind.config.js) and [`app/globals.css`](app/globals.css).
  The accent is `brand` (electric lime); swap the hex values to rebrand instantly.
- **Reusable sections** are in `components/sections/` and are shared between the
  home page and inner pages, so the structure stays consistent everywhere.
- **Generated visuals** are in `components/visuals/`. To use real photography later,
  replace `<Poster />` / `<Avatar />` with `next/image` and configure
  `images.remotePatterns` in `next.config.js`.

## Project structure

```
inventiveclicks/
├─ app/                     # App Router pages
│  ├─ layout.jsx            # fonts, metadata, Header/Footer, scroll progress
│  ├─ globals.css           # design system: tokens, utilities, keyframes
│  ├─ page.jsx              # home
│  └─ about|services|projects|team|pricing|blog|contact/…
├─ components/
│  ├─ Header.jsx Footer.jsx PageHero.jsx CTA.jsx ContactForm.jsx
│  ├─ ui/                   # Button, headings, Marquee, motion primitives
│  ├─ sections/             # shared page sections (services, projects, team…)
│  ├─ home/                 # home-only sections (hero, trust bar, marquee strip)
│  └─ visuals/              # generated SVG art: Logo, Poster, Avatar, HeroGraphic…
└─ lib/data.js              # single source of all content
```

## Note on assets

The original ThemeForest theme's images could not be downloaded (blocked by the
environment's network policy), and the brief allowed recreating them. Every visual
here — the logo, hero dashboard, case-study covers, team portraits and client
logos — is generated at render time from SVG + gradients, so the site ships with a
cohesive look and **zero binary image assets to manage**. Swap in real media any
time by editing the components in `components/visuals/`.
