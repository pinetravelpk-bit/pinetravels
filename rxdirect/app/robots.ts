import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/.netlify/", "/api/", "/staff/status", "/index.txt$", "/*/index.txt$"],
    },
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
