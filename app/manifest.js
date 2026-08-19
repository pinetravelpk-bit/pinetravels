import { site } from "../lib/site";

export default function manifest() {
  return {
    name: `${site.name} — Creative Digital Marketing Agency`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0D0821",
    theme_color: "#0D0821",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
