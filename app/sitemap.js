import { SITE_URL } from "../lib/data";
import { hotels } from "../lib/hotels";

// Next.js /sitemap.xml khud generate karta hai is file se.
export default function sitemap() {
  const now = new Date();

  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/hotels", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ].map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const hotelPages = hotels.map((h) => ({
    url: `${SITE_URL}/hotels/${h.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...hotelPages];
}
