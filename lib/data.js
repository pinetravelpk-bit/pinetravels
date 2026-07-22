// ─────────────────────────────────────────────────────────────
// PINE TRAVEL — SAARA CONTENT YAHIN HAI
// Har home page section ka data neeche alag block me hai.
// Admin panel isi shape ka data serve karega, is liye jab admin
// lagega to sirf import badlega — components waise ke waise rahenge.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Pine Travel",
  domain: "pinetravels.com",
  tagline: "Journeys through the north, done right.",
  phone: "+92 301 0873333",
  phoneHref: "tel:+923010873333",
  whatsapp: "+92 301 0873333",
  whatsappHref: "https://wa.me/923010873333",
  email: "hello@pinetravels.com",
  address: "Saddar, Rawalpindi, Punjab, Pakistan",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/",
  },
};

// ── 1. Quick search chips (hero ke upar) ──────────────────────
export const quickSearch = [
  "Hunza Tour", "Skardu Tour", "Fairy Meadows", "Naran Kaghan",
  "Swat Valley", "Neelum Valley", "Honeymoon Trip",
];

// ── 2. Hero (video background) ────────────────────────────────
export const hero = {
  headline: "All-in-one Northern Travel.",
  highlight: "Northern",
  sub: "Tours, hotels and vehicles across Pakistan's mountains — booked in one place, by a team that actually drives these roads.",
  // Apni video yahan rakhein: public/videos/hero-bg.mp4
  // Video na ho to khud-ba-khud illustrated mountain scene chal jayega.
  video: "/videos/hero-bg.mp4",
  poster: "",
};

export const tourTypes = ["Group Tour", "Family Tour", "Customized Tour", "Corporate Tour", "Honeymoon"];
export const travellerOptions = ["1 Adult", "2 Adults", "3–5 People", "6–10 People", "10+ People"];
export const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5–8 Guests", "8+ Guests"];
export const vehicles = ["4x4 Jeep", "Sedan Car", "Toyota Hiace", "Coaster (30 seats)", "Land Cruiser"];
export const pickupCities = ["Rawalpindi", "Islamabad", "Gilgit", "Skardu", "Naran", "Chilas"];
export const durations = ["1 Day", "2 Days", "3 Days", "5 Days", "7 Days", "10+ Days"];

// ── 3. Discounts & Offers ─────────────────────────────────────
export const offers = [
  { title: "Autumn in Hunza", off: "20% OFF", note: "Sep–Nov departures", tone: "amber" },
  { title: "Skardu Circuit", off: "15% OFF", note: "Groups of 6+", tone: "slate" },
  { title: "Naran Weekend", off: "10% OFF", note: "Every Fri–Sun", tone: "green" },
  { title: "Honeymoon Special", off: "Free Upgrade", note: "Suite on 4+ nights", tone: "deep" },
  { title: "Corporate Retreats", off: "Custom Rates", note: "Teams of 15+", tone: "teal" },
];

// ── 4. Featured Destinations (region tabs) ────────────────────
export const destinationRegions = [
  {
    region: "Gilgit-Baltistan",
    items: [
      { name: "Hunza Valley", tours: 42, departures: 96, guests: "5,240", note: "Rakaposhi views, forts and golden autumn.", tone: "amber" },
      { name: "Skardu", tours: 38, departures: 84, guests: "4,610", note: "Cold deserts, alpine lakes and the road to K2.", tone: "slate" },
      { name: "Fairy Meadows", tours: 26, departures: 58, guests: "3,180", note: "Pine meadows beneath Nanga Parbat.", tone: "pine" },
      { name: "Khunjerab Pass", tours: 18, departures: 40, guests: "2,050", note: "The highest paved border crossing on earth.", tone: "deep" },
      { name: "Deosai Plains", tours: 21, departures: 46, guests: "2,470", note: "The Land of Giants, above the clouds.", tone: "teal" },
      { name: "Shigar Valley", tours: 14, departures: 32, guests: "1,690", note: "Fort, orchards and the gateway to K2 treks.", tone: "green" },
    ],
  },
  {
    region: "Khyber Pakhtunkhwa",
    items: [
      { name: "Naran & Kaghan", tours: 46, departures: 110, guests: "6,120", note: "Saif-ul-Malook, waterfalls and jeep tracks.", tone: "teal" },
      { name: "Swat Valley", tours: 34, departures: 78, guests: "4,330", note: "Green terraces, rivers and Malam Jabba.", tone: "green" },
      { name: "Kalash Valleys", tours: 12, departures: 26, guests: "1,140", note: "Ancient culture deep in the Hindu Kush.", tone: "amber" },
      { name: "Kumrat Valley", tours: 19, departures: 44, guests: "2,260", note: "Deodar forest and river camping.", tone: "pine" },
      { name: "Babusar Top", tours: 23, departures: 52, guests: "2,810", note: "The pass that links Kaghan to the north.", tone: "slate" },
      { name: "Malam Jabba", tours: 16, departures: 36, guests: "1,920", note: "Pakistan's ski slopes and chairlift.", tone: "deep" },
    ],
  },
  {
    region: "Azad Kashmir",
    items: [
      { name: "Neelum Valley", tours: 29, departures: 66, guests: "3,540", note: "River-hugging villages and deep pine forest.", tone: "deep" },
      { name: "Rawalakot", tours: 15, departures: 34, guests: "1,780", note: "Banjosa Lake and rolling green bowls.", tone: "green" },
      { name: "Arang Kel", tours: 11, departures: 24, guests: "1,210", note: "A meadow village above the Neelum.", tone: "pine" },
      { name: "Ratti Gali Lake", tours: 13, departures: 28, guests: "1,460", note: "Alpine lake reached by jeep and trek.", tone: "teal" },
      { name: "Toli Peer", tours: 9, departures: 20, guests: "980", note: "Open ridgelines and sunrise camping.", tone: "slate" },
      { name: "Banjosa Lake", tours: 8, departures: 18, guests: "870", note: "Quiet pine-ringed lake near Rawalakot.", tone: "amber" },
    ],
  },
];

// ── 5. Why choose us ──────────────────────────────────────────
export const whyUs = {
  title: "We're providing the best service ever!",
  intro: "Twelve years on these roads means we know which hotel is worth it, which driver to trust and which shortcut is actually open.",
  features: [
    { icon: "Compass", title: "Local Guidance", body: "Guides who are from the north and know every valley, viewpoint and dhaba worth stopping at." },
    { icon: "BadgePercent", title: "Deals & Discounts", body: "Direct hotel and transport rates, passed to you without the middleman markup." },
    { icon: "PiggyBank", title: "Saves Money", body: "No hidden fees, no tourist traps. Multi-destination and budget-friendly options planned upfront." },
    { icon: "ShieldCheck", title: "Safe & Reliable", body: "Maintained vehicles, experienced drivers and realistic driving days for families and elders." },
  ],
  banner: { text: "Flat 20% off all autumn packages", cta: "Check Offer", href: "/#packages" },
};

// ── 6. Popular packages ───────────────────────────────────────
export const packages = [
  {
    title: "Hunza & Attabad Explorer", region: "Gilgit-Baltistan", days: "6 Days / 5 Nights",
    price: 45000, oldPrice: null, badge: "Best Seller", tone: "amber",
    highlights: ["Karimabad & Baltit Fort", "Attabad Lake boating", "Passu Cones & Khunjerab"],
    experience: "Includes Eagle's Nest sunrise, Attabad boating, Passu glacier walk and the Khunjerab drive.",
    inclusion: "Covers hotels, daily breakfast and dinner, all transport, entry fees and a local guide.",
  },
  {
    title: "Skardu Grand Circuit", region: "Gilgit-Baltistan", days: "7 Days / 6 Nights",
    price: 58000, oldPrice: null, badge: "Adventure", tone: "slate",
    highlights: ["Shangrila & Upper Kachura", "Deosai Plains by jeep", "Cold Desert & Shigar"],
    experience: "Deosai plateau crossing, Sadpara lake, cold desert jeep run and Shigar fort.",
    inclusion: "Hotels, meals, 4x4 jeeps for off-road sectors, permits and an experienced guide.",
  },
  {
    title: "Naran Kaghan Weekend", region: "Khyber Pakhtunkhwa", days: "4 Days / 3 Nights",
    price: 28000, oldPrice: null, badge: "Family Friendly", tone: "teal",
    highlights: ["Lake Saif-ul-Malook jeep", "Lulusar & Babusar Top", "Riverside stay"],
    experience: "Saif-ul-Malook jeep ride, Lulusar lake stop and the climb to Babusar Top.",
    inclusion: "Riverside hotel, breakfast and dinner, coaster transport and jeep for the lake.",
  },
  {
    title: "Fairy Meadows & Nanga Parbat", region: "Gilgit-Baltistan", days: "5 Days / 4 Nights",
    price: 39000, oldPrice: null, badge: "Trekking", tone: "pine",
    highlights: ["Raikot jeep track", "Meadow cottage stay", "Base camp day trek"],
    experience: "The famous Raikot jeep track, a night under Nanga Parbat and the base camp trek.",
    inclusion: "Jeep transfers, cottage stay, all meals in the meadows and a trekking guide.",
  },
  {
    title: "Swat & Kumrat Green Route", region: "Khyber Pakhtunkhwa", days: "6 Days / 5 Nights",
    price: 42000, oldPrice: null, badge: "New", tone: "green",
    highlights: ["Malam Jabba chairlift", "Kumrat deodar forest", "Riverside camping"],
    experience: "Malam Jabba slopes, Kalam river valley and a night camping in Kumrat's deodar forest.",
    inclusion: "Hotels plus one camping night, meals, transport and forest permits.",
  },
  {
    title: "Neelum Valley Discovery", region: "Azad Kashmir", days: "5 Days / 4 Nights",
    price: 34000, oldPrice: null, badge: "Popular", tone: "deep",
    highlights: ["Arang Kel cable car", "Ratti Gali jeep track", "Kel & Sharda stops"],
    experience: "Sharda ruins, the Arang Kel climb and a jeep run up to Ratti Gali lake.",
    inclusion: "Guest house stays, meals, transport and the jeep sector to Ratti Gali.",
  },
];

// ── 7. Quote banner ───────────────────────────────────────────
export const quote = {
  kicker: "Make meet happiness.",
  text: "Travel isn't a luxury — in the north, it's a way of life.",
  author: "Pine Travel",
  role: "Rawalpindi, Pakistan",
  cta: "Grab the deal now",
  href: "/#packages",
};

// ── 8. Last minute deals ──────────────────────────────────────
export const lastMinute = [
  {
    title: "Hunza Autumn Flash", region: "Gilgit-Baltistan", days: "5 Days",
    price: 32000, oldPrice: 45000, badge: "30% off", tone: "amber",
    highlights: ["Karimabad stay", "Attabad Lake", "Hopper Glacier"],
    experience: "A shortened Hunza run built for the autumn colour window.",
    inclusion: "Hotel, breakfast, transport and guide included.",
  },
  {
    title: "Skardu Quick Escape", region: "Gilgit-Baltistan", days: "4 Days",
    price: 34000, oldPrice: 42000, badge: "20% off", tone: "slate",
    highlights: ["Shangrila Lake", "Cold Desert", "Shigar Fort"],
    experience: "The Skardu highlights compressed into a long weekend.",
    inclusion: "Hotel, meals, airport transfers and local transport.",
  },
  {
    title: "Naran Family Saver", region: "Khyber Pakhtunkhwa", days: "3 Days",
    price: 21000, oldPrice: 28000, badge: "25% off", tone: "teal",
    highlights: ["Saif-ul-Malook", "Lulusar Lake", "Riverside hotel"],
    experience: "A gentle family-paced weekend in the Kaghan valley.",
    inclusion: "Riverside hotel, breakfast and dinner, coaster transport.",
  },
];

// ── 9. One day trips ──────────────────────────────────────────
export const dayTrips = [
  { title: "Khanpur Lake & Cliff Jumping", region: "Khanpur, KP", price: 4500, tone: "teal", badge: "Popular", highlights: ["Boating", "Cliff jumping", "BBQ lunch"], experience: "Boating, cliff diving and a lakeside BBQ.", inclusion: "Transport from Rawalpindi, lunch and life jackets." },
  { title: "Murree & Patriata Chairlift", region: "Murree, Punjab", price: 3800, tone: "pine", badge: null, highlights: ["Mall Road", "Patriata chairlift", "Pindi Point"], experience: "Mall Road, the Patriata chairlift and viewpoints.", inclusion: "Transport, chairlift tickets and a guide." },
  { title: "Taxila & Wah Gardens Heritage", region: "Taxila, Punjab", price: 3200, tone: "amber", badge: "Heritage", highlights: ["Taxila Museum", "Julian ruins", "Wah Gardens"], experience: "Gandharan ruins, the museum and Mughal gardens.", inclusion: "Transport, entry tickets and a heritage guide." },
  { title: "Neela Sandh & Margalla Trek", region: "Islamabad", price: 2900, tone: "green", badge: null, highlights: ["Waterfall", "Margalla trail", "Picnic lunch"], experience: "A waterfall hike and an easy Margalla trail.", inclusion: "Transport, lunch and a trek leader." },
];

// ── 10. Customize your package ────────────────────────────────
export const customize = {
  title: "Customize your travel package!",
  intro: "Pick a base, tell us your dates and budget, and we'll rebuild the itinerary around you.",
  cities: ["Hunza, GB", "Skardu, GB", "Naran, KP", "Swat, KP", "Fairy Meadows, GB", "Neelum, AJK", "Kumrat, KP", "Chitral, KP", "Gilgit, GB", "Murree, PB", "Kalash, KP", "Astore, GB"],
  points: ["Make your favourite package", "Easily customize tours", "Enjoy your trip"],
  guideLine: "Meet our local tour guides",
};

// ── 11. Partners ──────────────────────────────────────────────
export const partners = [
  "PTDC", "Serena Hotels", "Gilgit Jeep Union", "Hunza Lodges",
  "Skardu Transport", "Kaghan Guides", "Swat Adventures", "Alpine Club PK",
];

// ── 12. Travel inspirations (blog) ────────────────────────────
export const inspirations = [
  { category: "Hunza, GB", title: "Ten days chasing autumn colour through Hunza", date: "12 October, 2025", excerpt: "When the apricot and poplar leaves turn, the whole valley glows gold for barely three weeks.", tone: "amber" },
  { category: "Skardu, GB", title: "Crossing Deosai: what nobody tells you about the plains", date: "28 August, 2025", excerpt: "The Land of Giants sits above 4,000 m. Here's how to cross it comfortably and safely.", tone: "slate" },
  { category: "Kaghan, KP", title: "Saif-ul-Malook by jeep, step by step", date: "07 July, 2025", excerpt: "The track is short but rough. What to expect, what it costs and when to go.", tone: "teal" },
  { category: "Nanga Parbat", title: "A night in Fairy Meadows under the ninth-highest peak", date: "19 June, 2025", excerpt: "The Raikot jeep track, the walk up, and why the cottages are worth every step.", tone: "pine" },
];

// ── 13. Testimonials ──────────────────────────────────────────
export const testimonials = [
  { name: "Ayesha Khan", trip: "Hunza Family Tour", rating: 5, title: "Travelling with kids felt easy", quote: "Everything from the coaster to the guest house was arranged perfectly. First time a family trip didn't stress me out." },
  { name: "Hamza Raza", trip: "Skardu Group Tour", rating: 5, title: "Costs were exactly as quoted", quote: "The jeep drivers for Deosai were pros and the guide knew every viewpoint. No surprise charges anywhere." },
  { name: "Bilal & Mahnoor", trip: "Destination Nikah, Fairy Meadows", rating: 5, title: "Unforgettable nikah", quote: "They set up our nikah in the meadows and moved 40 guests without a single hiccup." },
  { name: "Sana Tariq", trip: "Naran Weekend", rating: 5, title: "Great value for a short trip", quote: "Three days and we still saw Saif-ul-Malook, Lulusar and Babusar. Well planned and never rushed." },
  { name: "Usman Sheikh", trip: "Corporate Retreat, Swat", rating: 5, title: "Handled 30 people flawlessly", quote: "One point of contact, clean invoicing and everything on time. Our team is already asking about next year." },
];

export const ratingBadge = { score: "4.9", count: "900+ reviews", source: "Google & Facebook" };

// ── 14. FAQs ──────────────────────────────────────────────────
export const faqs = [
  { q: "Which areas do you cover?", a: "We specialise in Northern Pakistan — Hunza, Skardu, Gilgit, Fairy Meadows, Naran & Kaghan, Swat, Kumrat and Neelum Valley — with departures from Rawalpindi and Islamabad. Trips from other cities can be arranged too." },
  { q: "Do you offer customized travel packages?", a: "Yes. Share your dates, group size, budget and interests and we build a private itinerary with your choice of hotels, transport and pace. Nothing is confirmed until you approve it." },
  { q: "Can I book hotels and transport separately?", a: "You can. Hotel booking, rent-a-car and rent-a-jeep are all available on their own — you don't have to take a full package." },
  { q: "Do you handle destination weddings and nikah setups?", a: "We do. From venue and décor to catering, photography coordination and guest travel and stay, we manage mountain nikah and destination weddings end to end." },
  { q: "What payment methods do you accept?", a: "Bank transfer, mobile wallets like JazzCash and Easypaisa, and cash at our Rawalpindi office. We take an advance to lock bookings and the balance before or at the start of the trip." },
  { q: "What should I pack for the north?", a: "Layers year-round — even summer nights are cold above 2,500 m. Add a warm jacket, comfortable walking shoes, sunblock, any personal medication and your CNIC or passport for checkpoints." },
];

// ── 15. Counters ──────────────────────────────────────────────
export const counters = [
  { value: 9, suffix: "K+", label: "Happy travellers" },
  { value: 12, suffix: "+", label: "Years in the north" },
  { value: 60, suffix: "+", label: "Curated itineraries" },
  { value: 98, suffix: "%", label: "Would travel again" },
];

// ── 16. Services (services page + home strip) ─────────────────
export const services = [
  { slug: "group-tours", icon: "Users", title: "Group Tours", blurb: "Fixed-departure trips to the north with like-minded travellers, shared costs and a fixed itinerary." },
  { slug: "family-tours", icon: "HeartHandshake", title: "Family Tours", blurb: "Relaxed, safe itineraries built around kids and elders — comfortable stays and gentle driving days." },
  { slug: "customized-tours", icon: "Route", title: "Customized Tours", blurb: "Tell us your dates, budget and pace. We design a private trip around exactly what you want to see." },
  { slug: "corporate-tours", icon: "Briefcase", title: "Corporate Tours", blurb: "Team retreats and incentive trips with clean logistics, invoicing and a single point of contact." },
  { slug: "weddings", icon: "Gem", title: "Nikah & Destination Weddings", blurb: "Full nikah and destination-wedding setup in the mountains — venue, décor, catering and guest travel." },
  { slug: "conferences", icon: "Presentation", title: "Conferences", blurb: "Halls, stay, meals and transfers for conferences and off-sites, managed end to end." },
  { slug: "hotel-booking", icon: "BedDouble", title: "Hotel Booking", blurb: "Vetted hotels across Hunza, Skardu, Naran, Swat and more — booked at the right rate for your group." },
  { slug: "rentals", icon: "Car", title: "Rent a Car & Rent a Jeep", blurb: "Sedans and coasters for the highway, 4x4 jeeps for Fairy Meadows, Deosai and off-road tracks." },
  { slug: "guest-houses", icon: "Home", title: "Guest Houses", blurb: "Cosy, homely guest houses when you want warmth and local hospitality over a big hotel." },
  { slug: "guides", icon: "Compass", title: "Local Tour Guides", blurb: "Certified local guides who know the valleys, the shortcuts, the food and the stories behind them." },
];

// Hero tour-tab dropdown uses this flat list
export const destinations = destinationRegions.flatMap((r) =>
  r.items.map((i) => ({ name: i.name, region: r.region, note: i.note, tone: i.tone }))
);

// ── 17. Footer link columns ───────────────────────────────────
export const footerLinks = {
  topDestinations: ["Hunza Tour", "Skardu Tour", "Fairy Meadows", "Naran Kaghan", "Swat Valley", "Neelum Valley", "Kumrat Valley", "Khunjerab Pass", "Deosai Plains", "Chitral & Kalash"],
  popularSearch: ["Adventure Tours", "Honeymoon Trips", "Family Packages", "Jeep Safari", "Group Departures", "Corporate Retreats", "Winter Tours", "Last-Minute Deals", "Photography Tours", "Trekking"],
  resources: [
    { label: "About Pine Travel", href: "/about" },
    { label: "All Services", href: "/services" },
    { label: "Hotels & Guest Houses", href: "/hotels" },
    { label: "Customize a Tour", href: "/contact" },
    { label: "Travel Inspirations", href: "/#inspirations" },
    { label: "Traveller Reviews", href: "/#reviews" },
    { label: "FAQs", href: "/#faqs" },
    { label: "Contact", href: "/contact" },
  ],
};

export const steps = [
  { title: "Tell us your plan", body: "Share your dates, group size, budget and the valleys on your list. A message on WhatsApp is enough to start." },
  { title: "We design the trip", body: "You get a clear day-by-day itinerary with hotels, transport and costs — refined until it feels right." },
  { title: "Pack and go", body: "Your guide, driver and bookings are confirmed. You show up; we handle everything on the ground." },
];

export const stats = counters.map((c) => ({ value: `${c.value}${c.suffix}`, label: c.label }));
