# Pine Travel — Project Handoff

Ye document Claude Code (ya kisi bhi developer) ko project samajhne aur kaam jari rakhne
ke liye hai. Sab kuch yahan likha hai — kya ban chuka hai, kya baqi hai, aur agla step kya hai.

---

## 1. Project kya hai

**Pine Travel** — Rawalpindi based travel agency ki website.
Domain: **pinetravels.com**. Northern Pakistan ke tours, hotels, weddings aur rentals.

**Stack:** Next.js 14.2.35 (App Router, **JavaScript — TypeScript nahi**), Tailwind CSS 3.4,
lucide-react icons, mysql2. Koi ORM nahi — plain SQL.

**Hosting:** Hostinger **Business plan** (Node.js apps + managed MySQL + GitHub auto-deploy).

**Design reference:** home page ka structure `https://gofly-next-js.vercel.app/` se liya gaya hai,
lekin design original hai — Pine Travel ke brand colors aur Northern Pakistan theme me.

---

## 2. Brand tokens

Logo se derive kiye gaye (`public/images/pine-travel-logo.png`):

| Token | Hex | Use |
|---|---|---|
| `pine-600` | `#005902` | Primary green (logo) |
| `pine-800` | `#022f0b` | Dark panels |
| `maroon-600` | `#7D0000` | Accent / buttons |
| `cream` | `#F7F4EC` | Page background |
| `mist` | `#E6EFE4` | Alt sections |
| `ink` | `#16130F` | Text |

Fonts: **Archivo** (display) + **Inter** (body) — `app/layout.js` me `<link>` se load hote hain,
`next/font` se NAHI (build offline-safe rakhne ke liye; `next.config.js` me `optimizeFonts: false`).

**Gradient classes** (`app/globals.css` me `@layer components`):
`grad-pine`, `grad-pine-soft`, `grad-maroon`, `grad-gold`, `grad-card`, `grad-cream`
Plus utilities: `.marquee-track` (partners strip), `.rail` (horizontal scroll), `.reveal` (scroll animation).

**Contact (real, already set in `lib/data.js`):**
```js
phone: "+92 301 0873333"
phoneHref: "tel:+923010873333"
whatsappHref: "https://wa.me/923010873333"   // digits only, no +, no leading 0
```

---

## 3. Kya ban chuka hai (DONE)

### 3a. Public website — sab pages ban chuke hain

| Route | Kya hai |
|---|---|
| `/` | Home — 17 sections (GoFly structure) |
| `/services` | 10 services |
| `/hotels` | Hotel listing |
| `/hotels/[slug]` | Per-hotel page + booking engine |
| `/about` | Company story, values, stats |
| `/contact` | Enquiry form (WhatsApp handoff) |
| `/admin/*` | Admin panel (neeche dekhein) |

**Home page sections** (`app/page.js` me isi order me):
Hero → Offers → FeaturedDestinations → WhyUs → PopularPackages → QuoteBanner →
LastMinuteDeals → CustomizePackage → Partners → OneDayTrips → Services →
Inspirations → Testimonials → FAQ → Counters → InquiryBand → CTA

**Hero** me tabbed search hai: **Tours / Hotels / Rent**
- Tours → Destination, Departure date, Tour type, Travellers → WhatsApp enquiry
- Hotels → Hotel, Check-in, Check-out, Guests → `/hotels/[slug]#booking` par le jata hai
- Rent → Vehicle, Pickup city, Pickup date, Duration → WhatsApp enquiry

**Hero video:** `<video>` element already lagi hui hai.
File yahan rakhni hai: `public/videos/hero-bg.mp4`
Path `lib/data.js` → `hero.video` me hai. Video na ho to peeche mountain SVG dikhta hai
(site tooti nahi) — ye fallback deliberate hai.

> ⚠️ **HOTEL MODULE KO HAATH NA LAGAYEIN.** Client ne saaf mana kiya hai.
> Files: `app/hotels/`, `components/hotel/`, `lib/hotels.js`.
> Ye tested aur final hai: 3 hotels, rooms + suites + cottages (2–10 rooms per cottage),
> multi-room multi-night booking engine, live totals, offer auto-discount, WhatsApp handoff.

### 3b. Admin panel — Stage 1 COMPLETE aur TESTED

**Database (MySQL, 7 tables)** — `lib/schema.sql`:

| Table | Kya rakhta hai |
|---|---|
| `users` | Admin login (scrypt hashed passwords) |
| `content` | key → JSON. 22 sections (site, hero, offers, faqs…) |
| `packages` | kind = `package` \| `deal` \| `daytrip`, slug + JSON |
| `hotels` | slug + JSON |
| `posts` | Blog / inspirations, slug + JSON |
| `enquiries` | Website forms se aane wali enquiries |
| `media` | Upload ki hui images/videos ka record |

**Design choice:** content JSON columns me hai, 20 alag tables ke bajaye. Isse admin
bohat simple ban jata hai aur naye fields add karne par migration nahi chahiye.
Hotels/packages/posts alag rows me hain kyunke unhe slug se query karna hota hai.

**Files jo ban chuki hain:**

```
lib/db.js            mysql2 pool + query helpers. DB down ho to null return karta hai (throw nahi)
lib/auth.js          scrypt password hash + HMAC signed session cookie. ZERO extra deps
lib/cms.js           Content layer — DB se padhta hai, na mile to lib/data.js se fallback
lib/schema.sql       Tables
lib/sections.js      Admin ke liye section titles + grouping
scripts/setup.mjs    `npm run setup` — tables banata hai, content seed karta hai, admin user banata hai
middleware.js        /admin routes protect karta hai

app/admin/login/page.js                    Login page (LoginForm Suspense me wrapped hai — zaroori)
app/admin/(panel)/layout.js                Sidebar shell + auth check
app/admin/(panel)/page.js                  Dashboard (DB health + counts)
app/admin/(panel)/sections/page.js         Sab sections ki list
app/admin/(panel)/sections/[key]/page.js   Kisi bhi section ka editor
app/admin/(panel)/media/page.js            Media library
app/admin/(panel)/enquiries/page.js        Enquiries inbox

app/api/admin/login/route.js     POST login
app/api/admin/logout/route.js    POST logout
app/api/admin/content/route.js   GET + PUT content
app/api/admin/media/route.js     GET list + POST upload

components/admin/AdminNav.jsx       Sidebar
components/admin/LoginForm.jsx      Login form
components/admin/SectionEditor.jsx  ⭐ Auto-form generator — kisi bhi JSON shape ka form banata hai
components/admin/MediaUploader.jsx  Upload + copy URL
```

**`SectionEditor.jsx` sabse important file hai.** Ye data ki shape dekh kar khud form banata hai:
- string → text input (lamba ho to textarea)
- number → number input
- boolean → checkbox
- array of strings → add/remove list
- array of objects → repeatable cards (add / delete / up / down)
- nested object → fieldset
- Jis field ke naam me `video|image|img|photo|logo|poster|cover` ho → upload button khud aa jata hai
- "Code view" toggle — raw JSON edit karne ke liye

**Test results (sab pass):**
```
npm run setup     →  7 tables, 22 content sections, 6 packages, 3 deals,
                     4 day trips, 3 hotels, 4 posts, admin user ✓
/admin (no login) →  307 redirect to /admin/login ✓
Wrong password    →  401 "Email ya password ghalat hai." ✓
Correct password  →  200, pt_session cookie set ✓
All admin pages   →  200 with session ✓
PUT content       →  200, database me save ho gaya ✓
npm run build     →  Clean, 17 routes ✓
```

---

## 4. ⚠️ PENDING — agla kaam yahi hai

### Problem

**Admin me save karne par website par tabdeeli nazar nahi aati.**

Test se confirm hua: `site.phone` ko admin se `+92 333 1122334` kar diya, database me
save bhi ho gaya — lekin home page par purana number `+92 301 0873333` hi dikh raha tha.

**Wajah:** saare components abhi bhi `lib/data.js` se seedha import kar rahe hain,
`lib/cms.js` se nahi. `lib/cms.js` mukammal hai aur kaam karta hai — bas koi use nahi kar raha.

```js
// components/Header.jsx — abhi aisa hai
import { site } from "../lib/data";        // ❌ file se, hamesha static

// aisa hona chahiye — server page se prop aaye
export default function Header({ site }) { // ✓ DB se aa sakta hai
```

### Jo files badalni hain

Ye components abhi `lib/data.js` se import karte hain:

| File | Kya import karta hai | Client? |
|---|---|---|
| `components/Header.jsx` | `site` | ✅ yes |
| `components/Footer.jsx` | `site`, `footerLinks` | no |
| `components/CTA.jsx` | `site` | no |
| `components/Services.jsx` | `services` | no |
| `components/Hero.jsx` | `site, hero, quickSearch, tourTypes, travellerOptions, guestOptions, vehicles, pickupCities, durations` | ✅ yes |
| `components/Discover.jsx` | `offers`, `destinationRegions` | ✅ yes |
| `components/Bands.jsx` | `whyUs, quote, customize, partners, counters, site` | ✅ yes |
| `components/PackageSections.jsx` | `packages`, `lastMinute`, `dayTrips` | ✅ yes |
| `components/Stories.jsx` | `inspirations, testimonials, ratingBadge, faqs` | ✅ yes |
| `app/services/page.js` | `services` | no |
| `app/contact/page.js` | `site`, `services` | ✅ yes |
| `app/about/page.js` | `stats` | no |

`components/hotel/HotelBooking.jsx` bhi `site` import karta hai — **usay abhi na chherein**
(hotel module frozen hai). Baad me sirf `site` prop pass karna hoga, aur kuch nahi.

### Karne ka tareeqa

**Step 1 — har component ko props-driven banayein, default file data rakhein.**
Default rakhne se kuch tootega nahi agar koi jagah prop pass na kare:

```js
// components/Discover.jsx
import { offers as defaultOffers, destinationRegions as defaultRegions } from "../lib/data";

export function Offers({ offers = defaultOffers }) { … }
export function FeaturedDestinations({ destinationRegions = defaultRegions }) { … }
```

**Step 2 — server pages content fetch kar ke props pass karein.**

`app/layout.js` (server component hai — theek hai):
```js
import { getContentMany } from "../lib/cms";

export default async function RootLayout({ children }) {
  const { site, footerLinks } = await getContentMany(["site", "footerLinks"]);
  return (
    <html lang="en">
      …
      <body>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} footerLinks={footerLinks} />
      </body>
    </html>
  );
}
```

`app/page.js`:
```js
import { getContentMany, getPackages, getPosts } from "../lib/cms";

export default async function HomePage() {
  const c = await getContentMany([
    "site","hero","quickSearch","services","offers","destinationRegions",
    "whyUs","quote","customize","partners","testimonials","ratingBadge",
    "faqs","counters","tourTypes","travellerOptions","guestOptions",
    "vehicles","pickupCities","durations",
  ]);
  const [packages, deals, dayTrips, posts] = await Promise.all([
    getPackages("package"), getPackages("deal"), getPackages("daytrip"), getPosts(),
  ]);

  return (
    <>
      <Hero {...c} />
      <Offers offers={c.offers} />
      <FeaturedDestinations destinationRegions={c.destinationRegions} />
      … baqi sections
    </>
  );
}
```

**Step 3 — save karte hi page refresh ho.**
`app/api/admin/content/route.js` ke `PUT` me save ke baad:
```js
import { revalidatePath } from "next/cache";
…
await setContent(key, data);
revalidatePath("/", "layout");   // saare pages
```
Isse pages fast (static/ISR) rehte hain lekin edit karte hi update ho jate hain.
`force-dynamic` lagana bhi chalega lekin har request par server render hoga — slow.

**Step 4 — verify karein.** Ye test dobara chalayein:
```bash
# login
curl -s -c /tmp/c.txt -X POST http://localhost:3000/api/admin/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@pinetravels.com","password":"testpass123"}'

# phone badlein
curl -s -b /tmp/c.txt "http://localhost:3000/api/admin/content?key=site" \
  | python3 -c "import json,sys; d=json.load(sys.stdin)['data']; d['phone']='+92 333 1122334'; print(json.dumps({'key':'site','data':d}))" \
  > /tmp/p.json
curl -s -b /tmp/c.txt -X PUT http://localhost:3000/api/admin/content \
  -H 'Content-Type: application/json' -d @/tmp/p.json

# website par naya number aana chahiye
curl -s http://localhost:3000/ | grep -o '+92 333 1122334'
```

---

## 5. Uske baad ke stages (abhi nahi bane)

| Stage | Kya banana hai |
|---|---|
| 2 | Packages / Deals / Day Trips ka admin CRUD (`packages` table already ready hai) |
| 3 | Hotels ka admin CRUD (`hotels` table ready — **frontend ko na chherein**) |
| 4 | Blog / Inspirations CRUD (`posts` table ready) |
| 5 | Contact aur hotel booking forms ko `saveEnquiry()` se jorna, taake enquiries inbox me aayein |

`lib/cms.js` me in sab ke helpers **pehle se maujood hain**:
`getPackages(kind)`, `getHotels()`, `getHotelBySlug()`, `getPosts()`,
`saveEnquiry()`, `listEnquiries()`, `listMedia()`, `recordMedia()`.

Stage 5 ke liye: `app/contact/page.js` abhi sirf WhatsApp kholta hai — usme
`saveEnquiry()` ka API call add karna hoga taake record bhi ban jaye.

---

## 6. Local par chalane ka tareeqa

```bash
npm install

cp .env.example .env      # phir .env me apni values daalein
npm run setup             # tables + content + admin user
npm run dev               # http://localhost:3000
                          # admin: http://localhost:3000/admin
```

`.env` me kya chahiye:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456789_pinetravel
DB_USER=u123456789_pine
DB_PASSWORD=…
ADMIN_EMAIL=admin@pinetravels.com
ADMIN_PASSWORD=…          # kam az kam 8 characters
AUTH_SECRET=…             # koi lamba random string
# UPLOAD_DIR=/home/uXXXX/uploads   # optional
```

**Website database ke baghair bhi chalti hai** — `lib/cms.js` khud `lib/data.js` par
fallback kar leta hai. Ye deliberate hai, isay tornay se bachein.

`npm run setup -- --force` sab content wipe kar ke dobara seed karta hai.

---

## 7. Hostinger par deploy (Business plan)

1. hPanel → **Databases** → MySQL database + user banayein. Credentials note karein.
2. hPanel → **Websites → Add Website → Deploy Web App** → GitHub repo connect karein
   (ya zip upload karein).
3. Environment variables hPanel me set karein — wahi jo `.env` me hain.
4. Pehli baar `npm run setup` chalayein (Hostinger ke terminal / SSH se).
5. Domain `pinetravels.com` attach karein, SSL free lag jata hai.

GitHub connect karne ke baad har push par khud deploy ho jata hai.

> **Static export ab possible NAHI hai.** Admin panel ko server + database chahiye.
> `next.config.js` me `output: 'export'` wali lines commented hain — unhe uncomment
> na karein, warna admin toot jayega.

---

## 8. Dhyan rakhne wali baaten

- **Hotel module frozen hai** — `app/hotels/`, `components/hotel/`, `lib/hotels.js` na badlein.
- **TypeScript nahi** — poora project plain JavaScript hai, wahi rakhein.
- `app/admin/login/page.js` me `LoginForm` **Suspense me wrapped hona zaroori hai**
  (`useSearchParams` ke liye) — warna build fail hoti hai.
- `middleware.js` sirf cookie ki maujoodgi check karta hai (Edge runtime me Node crypto nahi hota).
  Asli signature verification `lib/auth.js` → `currentUser()` server par karta hai. Dono chahiye.
- `lib/db.js` ka `query()` by default **throw nahi karta** — DB down ho to `null` deta hai
  taake site chalti rahe. Jahan error chahiye wahan `{ soft: false }` pass karein.
- Photos abhi nahi hain — har jagah original SVG illustrations (`components/Scenery.jsx` ka
  `CardScene`) use hui hain. Asli photos aane par `<CardScene />` ko `<img>` se replace karein.
- Admin panel ki UI **Roman Urdu** me hai (client ki request), public website English me.

---

## 9. Claude Code ko dene ke liye pehla prompt

> Ye Pine Travel ka Next.js project hai. `HANDOFF.md` parho — usme sab kuch likha hai.
>
> Section 4 (PENDING) ka kaam karo: saare components ko `lib/data.js` ke seedhe imports
> se hata kar props-driven banao, aur server pages (`app/layout.js`, `app/page.js`,
> `app/services/page.js`, `app/about/page.js`, `app/contact/page.js`) me `lib/cms.js` se
> content fetch kar ke props pass karo. Har component me default value file data hi rakhna
> taake kuch toote nahi. Phir content save API me `revalidatePath` add karo.
>
> `app/hotels/`, `components/hotel/` aur `lib/hotels.js` ko bilkul mat chhoona.
>
> Kaam ke baad `npm run build` chala kar confirm karo, aur Section 4 wala curl test
> chala kar dikhao ke admin se phone badalne par website par bhi badal raha hai.
