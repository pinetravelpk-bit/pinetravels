import raw from "@/content/settings/images.json";
// Generated before every dev/build by scripts/list-public-images.mjs.
import available from "@/content/settings/available-images.json";
import serviceSources from "@/data/serviceImageSources.json";

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
  // The photo isn't there (e.g. not downloaded yet): keep the default photo
  // and its own alt text, since this alt describes the missing photo.
  return undefined;
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

const pexels = serviceSources as Record<string, { pexelsId: number; alt: string }>;

// A service's photo: the downloaded copy in public/images/services/photos
// when the build fetched it (scripts/fetch-service-images.mjs), otherwise the
// same free Pexels photo straight from Pexels, so the new photo shows either way.
export function getServiceImageOverride(slug: string): ImageOverride | undefined {
  const local = usable(siteImages.services?.[slug]);
  if (local?.image) return local;
  const src = pexels[slug];
  if (!src) return local;
  return {
    image: `https://images.pexels.com/photos/${src.pexelsId}/pexels-photo-${src.pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`,
    alt: src.alt,
  };
}

export function getCityImageOverride(slug: string): ImageOverride | undefined {
  return usable(siteImages.cities?.[slug]);
}
