# Pine Travel — Next.js Website Theme

A modern, responsive site for **Pine Travel** (pinetravels.com), a Rawalpindi-based travel
agency specialising in tours, weddings, hotels and travel services across Northern Pakistan.

Built with **Next.js 14 (App Router)**, **Tailwind CSS** and **lucide-react**. All artwork is
original SVG — no external image dependencies — so it builds and runs anywhere.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Pages

| Route              | Description                                                             |
|--------------------|-------------------------------------------------------------------------|
| `/`                | Home — hero, services, destinations, packages, weddings, testimonials, FAQ |
| `/services`        | All 10 services                                                         |
| `/hotels`          | Hotel listing                                                           |
| `/hotels/[slug]`   | Full per-hotel page + multi-room, multi-night booking engine           |
| `/about`           | Company story, values, stats                                            |
| `/contact`         | Enquiry form (opens WhatsApp pre-filled)                                |

## The hotel system

Each hotel gets a complete page: hero, about, facilities, **Experience Luxury**, **Our Rooms &
Suites** with **cottages of 2–10 rooms**, a booking engine (pick multiple rooms/cottages for
multiple nights, live totals, auto-applied offer discount, WhatsApp handoff), special features,
gallery, special offer and feedback.

**Add a hotel:** copy one object in `lib/hotels.js`. That's it — the listing and the page,
booking, gallery and offer are generated automatically.

## Hero search (Tours / Hotels / Rent)

Home page ke hero me tabbed search bar hai — teen tabs, har tab ke apne fields:

| Tab | Fields | Search dabane par |
|--------|--------------------------------------------------|----------------------------------------|
| Tours  | Destination, Departure date, Tour type, Travellers | WhatsApp par tour enquiry chali jati hai |
| Hotels | Hotel/area, Check-in, Check-out, Guests            | Us hotel ke booking section par le jata hai |
| Rent   | Vehicle, Pickup city, Pickup date, Duration        | WhatsApp par rental enquiry chali jati hai |

Tabs, dropdown options (tour types, vehicles, pickup cities, duration) sab
`components/Hero.jsx` me file ke top par constants me hain — wahin se edit karein.

## Home page sections (gofly structure)

Home page me ye 17 sections hain, isi order me — `app/page.js` se order badal sakte hain:

1. Quick search chips  2. **Video hero** + Tours/Hotels/Rent search  3. Discounts & Offers
4. Featured Destinations (region tabs)  5. Why Choose Us + discount banner  6. Popular Packages
7. Quote banner  8. Last Minute Deals  9. Customize Your Package  10. Partners marquee
11. One Day Trips  12. Services  13. Travel Inspirations  14. Testimonials  15. FAQ
16. Counters (animated)  17. Inquiry band

## Hero video

Apni video yahan rakhein: **`public/videos/hero-bg.mp4`**

- Video na ho to hero khud-ba-khud illustrated mountain scene par chala jata hai — kuch tootega nahi.
- Recommended: 1920x1080, 10–20 second loop, **5 MB se kam** (warna page slow hoga).
- Path badalna ho to `lib/data.js` me `hero.video` edit karein.
- Poster image bhi de sakte hain: `hero.poster: "/images/hero-poster.jpg"`.

## Gradients

Saare background gradients `app/globals.css` me utility classes ke tor par hain:

| Class | Kahan |
|---|---|
| `.grad-pine` | Dark green sections (hero scrim, quote banner, counters, footer) |
| `.grad-pine-soft` | Halke alternating sections |
| `.grad-cream` | Cream panels aur search card |
| `.grad-maroon` | Accent banners |
| `.grad-gold` | Offer badges aur gold buttons |
| `.grad-card` | Saare cards |

Colors badalne ke liye sirf `globals.css` ki ye chhe lines edit karein — poori site ka look badal jayega.

## Editing content

- Site-wide info, services, packages, testimonials, FAQs → `lib/data.js`
- Hotels, rooms, cottages, facilities, offers, feedback → `lib/hotels.js`

**Contact number** — already configured in `lib/data.js` as `0301 0873333`:

```js
phone: "+92 301 0873333",
phoneHref: "tel:+923010873333",
whatsapp: "+92 301 0873333",
whatsappHref: "https://wa.me/923010873333",  // digits only, no + or spaces
```

To change it later, edit these four lines. The `wa.me` link must use the
country code with no `+`, spaces or leading zero.

## Brand colours (from your logo)

| Token          | Hex       | Use                  |
|----------------|-----------|----------------------|
| `pine` (600)   | `#005902` | Primary green        |
| `maroon` (600) | `#7D0000` | Accent / buttons     |
| `cream`        | `#F7F4EC` | Page background      |
| `mist`         | `#E6EFE4` | Alternating sections |

Defined in `tailwind.config.js`. Logo lives at `public/images/pine-travel-logo.png`.

## Using real photos

The theme ships with original illustrated scenery so it never needs stock images. To use real
photos, drop them in `public/images/` and replace a `<CardScene />` with:

```jsx
<img src="/images/hunza.jpg" alt="Hunza Valley" className="h-full w-full object-cover" />
```

## Deploy — website live kaise karein

### Option A — Vercel (recommended, free)

Next.js Vercel hi banati hai, is liye yahan sab kuch bina config ke chalta hai.

1. Code GitHub par push karein (new repo banayein, files upload karein).
2. vercel.com par GitHub se sign up karein → **Add New → Project** → apna repo import karein.
3. Settings bilkul na chherein, seedha **Deploy** dabayein. 1–2 minute me live link mil jayega.
4. Domain lagane ke liye: Project → **Settings → Domains** → `pinetravels.com` add karein.
   Vercel jo DNS records dikhaye, wo apne domain provider (GoDaddy/Namecheap/PKNIC) ke
   DNS panel me daal dein. Usually:
   - `A` record → `@` → `76.76.21.21`
   - `CNAME` record → `www` → `cname.vercel-dns.com`
5. DNS propagate hone me 10 min se 24 ghante lag sakte hain. SSL (https) khud lag jata hai.

Baad me code update karein to GitHub par push karte hi site khud update ho jayegi.

### Option B — cPanel / shared hosting (Hostinger, Namecheap, local providers)

Zyada shared hosting par Node.js nahi hota, is liye site ko **static** bana kar upload karte hain.

1. `next.config.js` kholein aur in 3 lines se comment hata dein:
   ```js
   output: 'export',
   trailingSlash: true,
   images: { unoptimized: true },
   ```
2. Terminal me:
   ```bash
   npm install
   npm run build
   ```
3. Project me **`out`** naam ka folder banega.
4. cPanel → **File Manager** → `public_html` kholein.
5. `out` folder ke **andar ka saara content** (folder khud nahi) `public_html` me upload karein.
   Zip bana kar upload karein aur wahin extract kar lein — tez rehta hai.
6. Domain par site live ho jayegi. SSL cPanel ke **SSL/TLS Status** se free lagayein.

Note: is tareeqe me har update ke baad dobara build kar ke files upload karni hongi.

### Kaunsa option behtar hai?

Vercel — free hai, tez hai, SSL khud lagta hai, aur update sirf ek push se ho jata hai.
cPanel tab lein jab hosting pehle se khareedi hui ho ya email/cPanel wahin chahiye ho.
Dono me website bilkul same chalegi — booking engine aur WhatsApp buttons bhi.


## Notes

- Hotels, prices, ratings and reviews are realistic placeholders — replace with your real data.
- Fonts (Archivo + Inter) load from Google Fonts via `<link>` in `app/layout.js`.
