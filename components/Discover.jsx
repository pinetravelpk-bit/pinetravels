"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin, Tag } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CardScene } from "./Scenery";
import { offers, destinationRegions } from "../lib/data";

export function Offers() {
  return (
    <section className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Limited time" title="Discounts & Offers"
          intro="A curated list of the season's best deals across our most popular northern routes." />
        <div className="rail mt-12 flex gap-5 overflow-x-auto pb-4">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={(i % 4) * 80} className="w-[280px] shrink-0 sm:w-[320px]">
              <Link href="/#packages" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <CardScene tone={o.tone} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-900/90 via-pine-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <span className="grad-gold inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-pine-900">
                    <Tag className="h-3 w-3" /> {o.off}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold">{o.title}</h3>
                  <p className="text-[13px] text-cream/75">{o.note}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedDestinations() {
  const [active, setActive] = useState(0);
  const region = destinationRegions[active];

  return (
    <section id="destinations" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Where we go" title="Featured Destinations"
          intro="Valleys worth the long drive — each with vetted stays, safe transport and a guide who knows the ground." />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {destinationRegions.map((r, i) => (
            <button key={r.region} onClick={() => setActive(i)}
              className={"rounded-full px-5 py-2.5 font-body text-[14px] font-semibold transition-all duration-200 " +
                (i === active ? "grad-pine text-cream shadow-card" : "border border-pine-600/20 text-ink-soft hover:border-pine-600/50 hover:bg-pine-50")}>
              {r.region}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {region.items.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 80}>
              <Link href="/contact" className="group block overflow-hidden rounded-2xl border border-pine-600/10 grad-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-52 overflow-hidden">
                  <CardScene tone={d.tone} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-900/70 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-pine-700 backdrop-blur">
                    <MapPin className="h-3 w-3" /> {region.region}
                  </span>
                  <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold text-cream">{d.name}</h3>
                </div>
                <div className="p-5">
                  <p className="text-[14px] leading-relaxed text-ink-soft">{d.note}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-pine-600/10 pt-4">
                    <span className="text-[12.5px] text-ink-faint">
                      <b className="text-pine-700">{d.tours}</b> tours · <b className="text-pine-700">{d.departures}</b> departures
                      <span className="block">{d.guests} guests travelled</span>
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-pine-600/20 text-pine-700 transition-all group-hover:grad-pine group-hover:text-cream">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
