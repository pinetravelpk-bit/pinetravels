import { nav, site } from "@/lib/site";

export default function sitemap() {
  return [...nav.map((n) => n.href), "/apply"].map((href) => ({
    url: `https://${site.domain}${href === "/" ? "" : href}`,
    lastModified: new Date(),
  }));
}
