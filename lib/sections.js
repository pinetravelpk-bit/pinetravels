// Admin panel me har section ka naam aur tafseel.
// Naya section add karna ho to yahan aur lib/cms.js ke CONTENT_KEYS me daalein.

export const SECTION_META = {
  site: { title: "Site Settings", description: "Phone, WhatsApp, email, address, social links" },
  hero: { title: "Hero & Video", description: "Home page ki badi heading aur background video" },
  quickSearch: { title: "Quick Search Links", description: "Hero ke neeche popular search words" },
  services: { title: "Services", description: "Aapki 10 services — icon, naam, tafseel" },
  offers: { title: "Discounts & Offers", description: "Home page ka offers slider" },
  destinationRegions: { title: "Featured Destinations", description: "Region tabs aur unke destinations" },
  whyUs: { title: "Why Choose Us", description: "Best service wala section aur discount banner" },
  quote: { title: "Quote Banner", description: "Bara quote wala band" },
  customize: { title: "Customize Package", description: "City chips, steps aur guide CTA" },
  partners: { title: "Partners", description: "Scrolling partner names" },
  testimonials: { title: "Traveller Reviews", description: "Reviews carousel" },
  ratingBadge: { title: "Rating Badge", description: "Reviews ke sath rating box" },
  faqs: { title: "FAQs", description: "Questions & Answers accordion" },
  counters: { title: "Counters", description: "Numbers wala section (years, travellers…)" },
  footerLinks: { title: "Footer Links", description: "Footer ke teen link columns" },
  steps: { title: "How It Works", description: "Teen steps wala section" },

  tourTypes: { title: "Tour Types", description: "Hero search ka Tour type dropdown" },
  travellerOptions: { title: "Traveller Options", description: "Hero search ka Travellers dropdown" },
  guestOptions: { title: "Guest Options", description: "Hero search ka Guests dropdown" },
  vehicles: { title: "Vehicles", description: "Rent tab ka vehicle dropdown" },
  pickupCities: { title: "Pickup Cities", description: "Rent tab ka pickup city dropdown" },
  durations: { title: "Rental Durations", description: "Rent tab ka duration dropdown" },
};

export const SECTION_GROUPS = [
  {
    title: "Zaroori",
    keys: ["site", "hero", "services"],
  },
  {
    title: "Home page sections",
    keys: [
      "offers", "destinationRegions", "whyUs", "quote", "customize",
      "partners", "testimonials", "ratingBadge", "faqs", "counters", "steps",
    ],
  },
  {
    title: "Search dropdowns",
    keys: ["tourTypes", "travellerOptions", "guestOptions", "vehicles", "pickupCities", "durations"],
  },
  {
    title: "Header & Footer",
    keys: ["quickSearch", "footerLinks"],
  },
];
