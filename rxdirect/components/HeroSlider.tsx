"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CookScene, DriverScene, NurseScene, OfficeBoyScene } from "@/components/HeroScenes";
import { useTranslation } from "@/i18n/LanguageContext";

export const heroSlides = [
  { slug: "drivers", Scene: DriverScene, key: "driver" },
  { slug: "cooks", Scene: CookScene, key: "cook" },
  { slug: "nurses", Scene: NurseScene, key: "nurse" },
  { slug: "office-boys", Scene: OfficeBoyScene, key: "officeBoy" },
] as const;

export const HERO_SLIDE_MS = 5000;

// Right side of the home hero: animated scenes that cross-fade in turn.
// The active index lives in Hero so the typed headline stays in sync.
export default function HeroSlider({
  index,
  onSelect,
  paused,
  onPause,
}: {
  index: number;
  onSelect: (i: number) => void;
  paused: boolean;
  onPause: (p: boolean) => void;
}) {
  const { t } = useTranslation();
  const active = heroSlides[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocus={() => onPause(true)}
      onBlur={() => onPause(false)}
    >
      <div className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-brand-200/60 via-white to-brand-100 blur-xl" />
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[2rem] rounded-tl-[4.5rem] rounded-br-[4.5rem] border border-white bg-white shadow-[0_30px_60px_-25px_rgba(11,31,77,0.45)]"
        aria-roledescription="carousel"
        aria-label={t("heroSlider.label")}
      >
        {heroSlides.map(({ slug, Scene }, i) => (
          <div
            key={slug}
            aria-hidden={i !== index}
            className={`hs-scene absolute inset-0 transition-all duration-700 ease-out ${
              i === index ? "is-active scale-100 opacity-100" : "pointer-events-none scale-105 opacity-0"
            }`}
          >
            <Scene />
          </div>
        ))}

        {/* caption */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur sm:inset-x-5 sm:bottom-5">
          <div key={active.key} className="min-w-0 animate-[guide-in_0.5s_ease-out]">
            <p className="truncate text-base font-extrabold text-navy sm:text-lg">{t(`heroSlider.${active.key}Title`)}</p>
            <p className="truncate text-xs text-gray-600 sm:text-sm">{t(`heroSlider.${active.key}Text`)}</p>
          </div>
          <Link
            href={`/services/${active.slug}`}
            className="flex shrink-0 items-center gap-1 rounded-full bg-brand-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-700 sm:text-sm"
          >
            {t("heroSlider.hire")}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* dots with progress */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={t(`heroSlider.${s.key}Title`)}
            aria-current={i === index}
            className={`relative h-2.5 overflow-hidden rounded-full transition-all duration-300 ${i === index ? "w-10 bg-brand-200" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
          >
            {i === index && (
              <span
                key={`${index}-${paused}`}
                className="absolute inset-0 origin-left rounded-full bg-brand-600 rtl:origin-right"
                style={{
                  animation: paused ? "none" : `hs-progress ${HERO_SLIDE_MS}ms linear forwards`,
                  transform: paused ? "scaleX(1)" : undefined,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
