import Link from "next/link";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import PageBanner from "../../components/PageBanner";
import Reveal from "../../components/Reveal";
import CTA from "../../components/CTA";
import { CardScene } from "../../components/Scenery";
import { hotels, priceFrom, formatPKR } from "../../lib/hotels";

export const metadata = {
  title: "Hotels & Guest Houses",
  description: "Vetted hotels, resorts and guest houses across Hunza, Skardu, Naran and Northern Pakistan. Book multiple rooms or a whole cottage for several nights.",
};

export default function HotelsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Stays"
        title="Hotels, resorts & guest houses"
        intro="Hand-picked stays across the north. Open any hotel to see rooms, cottages, facilities and book several rooms for as many nights as you like."
      />
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((h, i) => (
            <Reveal key={h.slug} delay={(i % 3) * 90}>
              <Link href={`/hotels/${h.slug}`} className="group block overflow-hidden rounded-2xl border border-pine-600/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-56 overflow-hidden">
                  <CardScene tone={h.tone} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-pine-700 backdrop-blur">
                    <MapPin className="h-3 w-3" /> {h.region}
                  </span>
                  {h.rating && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-pine-800/90 px-2.5 py-1 text-[12px] font-semibold text-cream backdrop-blur">
                      <Star className="h-3 w-3 fill-current text-amber-300" /> {h.rating}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl font-bold text-ink">{h.name}</h2>
                      <p className="mt-1 text-[13.5px] text-ink-faint">{h.location}</p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-pine-600/20 text-pine-700 transition-all group-hover:bg-pine-600 group-hover:text-cream"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{h.short}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-pine-600/10 pt-4">
                    <span className="text-[13px] text-ink-faint">From <span className="font-display text-lg font-extrabold text-pine-700">{formatPKR(priceFrom(h))}</span>/night</span>
                    <span className="text-[13px] font-semibold text-maroon-600">View hotel →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
