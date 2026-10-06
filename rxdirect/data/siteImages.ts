import raw from "@/content/settings/images.json";
// Generated before every dev/build by scripts/list-public-images.mjs.
import available from "@/content/settings/available-images.json";

interface ImageOverride {
  image?: string;
  alt?: string;
}

interface SiteImagesShape {
  hero?: ImageOverride;
  services?: Record<string, ImageOverride>;
  cities?: Record<string, ImageOverride>;
}

const siteImages = raw as SiteImagesShape;
const availableImages = new Set(available as string[]);

// An override only counts if its file is actually in public/images (or is a
// remote URL). Otherwise the built-in default photo is used, so a missing
// upload never shows up as a broken image.
function usable(override?: ImageOverride): ImageOverride | undefined {
  const src = override?.image?.trim();
  if (!src) return override?.alt ? { alt: override.alt } : undefined;
  if (/^https?:\/\//.test(src) || availableImages.has(src)) return override;
  return override?.alt ? { alt: override.alt } : undefined;
}

export function imageExists(src: string): boolean {
  return /^https?:\/\//.test(src) || availableImages.has(src);
}

const heroOverride = usable(siteImages.hero);

export const heroImage = {
  src: heroOverride?.image?.trim() || "/images/home/hero.webp",
  alt:
    siteImages.hero?.alt?.trim() ||
    "Happy family at home with trusted domestic staff support",
};

export function getServiceImageOverride(slug: string): ImageOverride | undefined {
  return usable(siteImages.services?.[slug]);
}

export function getCityImageOverride(slug: string): ImageOverride | undefined {
  return usable(siteImages.cities?.[slug]);
}
