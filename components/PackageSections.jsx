"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, MapPin, ChevronDown, Sparkles, PackageCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CardScene } from "./Scenery";
import { packages, lastMinute, dayTrips } from "../lib/data";

const pkr = (n) => "Rs " + Number(n).toLocaleString("en-US");

export function PackageCard({ p, showDays = true }) {
  const [open, setOpen] = useState(null);
  const rows = [
    { id: "exp", icon: Sparkles, label: "Experience", body: p.experience },
    { id: "inc", icon: PackageCheck, label: "Inclusion", body: p.inclusion },
  ];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-pine-600/10 grad-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-48 overflow-hidden">
        <CardScene tone={p.tone} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-900/60 to-transparent" />
        {p.badge && (
          <span className={"absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider " +
            (p.oldPrice ? "grad-gold text-pine-900" : "grad-maroon text-cream")}>
            {p.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-faint">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-pine-600" /> {p.region}</span>
          {showDays && p.days && <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-pine-600" /> {p.days}</span>}
        </div>

        <h3 className="mt-2.5 font-display text-lg font-bold leading-snug text-ink">{p.title}</h3>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {p.highlights.map((h) => (
            <li key={h} className="rounded-full bg-gradient-to-br from-pine-50 to-mist px-2.5 py-1 text-[11.5px] font-medium text-pine-700">{h}</li>
          ))}
        </ul>

        <div className="mt-4 divide-y divide-pine-600/10 border-y border-pine-600/10">
          {rows.map(({ id, icon: Icon, label, body }) => {
            const isOpen = open === id;
            return (
              <div key={id}>
                <button onClick={() => setOpen(isOpen ? null : id)} aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 py-2.5 text-left">
                  <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink">
                    <Icon className="h-4 w-4 text-pine-600" /> {label}
                  </span>
                  <ChevronDown className={"h-4 w-4 text-ink-faint transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                <div className="grid overflow-hidden transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0"><p className="pb-3 text-[13px] leading-relaxed text-ink-soft">{body}</p></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-ink-faint">Per person</span>
            <span className="flex items-baseline gap-2">
              {p.oldPrice && <span className="text-[13px] text-ink-faint line-through">{pkr(p.oldPrice)}</span>}
              <span className="font-display text-xl font-extrabold text-pine-700">{pkr(p.price)}</span>
            </span>
          </div>
          <Link href="/contact" className="btn-primary px-5 py-2.5 text-[13px]">Book Now</Link>
        </div>
      </div>
    </article>
  );
}

export function PopularPackages() {
  return (
    <section id="packages" className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Popular packages" title="Ready-to-go trips, fair fixed prices"
          intro="Fixed-departure favourites with everything included. Any of these can be made private on your own dates." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}><PackageCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LastMinuteDeals() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Book fast" title="Last Minute Deals!"
          intro="Seats already confirmed on upcoming departures — discounted to fill the last few places." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lastMinute.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}><PackageCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OneDayTrips() {
  return (
    <section className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Short escapes" title="One Day Trips"
          intro="Leave Rawalpindi or Islamabad in the morning and be home by night — no leave application needed." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dayTrips.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 80}><PackageCard p={p} showDays={false} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
