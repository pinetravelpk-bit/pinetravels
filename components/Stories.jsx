"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, ArrowUpRight, Star, Quote, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CardScene } from "./Scenery";
import { inspirations, testimonials, ratingBadge, faqs } from "../lib/data";

export function Inspirations() {
  return (
    <section id="inspirations" className="py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="From the road" title="Travel Inspirations"
            intro="Notes, guides and honest write-ups from the valleys we drive through every season." />
          <Reveal delay={120}>
            <Link href="/contact" className="btn-ghost whitespace-nowrap">View all inspiration</Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {inspirations.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pine-600/10 grad-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-44 overflow-hidden">
                  <CardScene tone={b.tone} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-900/60 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-pine-700 backdrop-blur">
                    {b.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-faint">
                    <Calendar className="h-3.5 w-3.5 text-pine-600" /> {b.date}
                  </span>
                  <h3 className="mt-2 font-display text-[16.5px] font-bold leading-snug text-ink transition-colors group-hover:text-pine-700">
                    {b.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{b.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-maroon-600">
                    Read more <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const per = 3;
  const max = Math.max(0, testimonials.length - per);
  const go = (d) => setI((v) => Math.min(max, Math.max(0, v + d)));

  return (
    <section id="reviews" className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Traveller reviews" title="Hear it from travellers"
            intro="We go beyond booking trips — we build the kind of journey people talk about for years." />
          <Reveal delay={100} className="flex items-center gap-3">
            <div className="grad-card flex items-center gap-3 rounded-xl border border-pine-600/10 px-4 py-3 shadow-card">
              <span className="font-display text-2xl font-extrabold text-pine-700">{ratingBadge.score}</span>
              <span className="text-[12px] leading-tight text-ink-soft">
                <span className="flex gap-0.5 text-maroon-500">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-current" />)}
                </span>
                {ratingBadge.count}
                <span className="block text-ink-faint">{ratingBadge.source}</span>
              </span>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button onClick={() => go(-1)} disabled={i === 0} aria-label="Previous"
                className="grid h-10 w-10 place-items-center rounded-full border border-pine-600/20 text-pine-700 transition hover:bg-pine-50 disabled:opacity-30">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => go(1)} disabled={i >= max} aria-label="Next"
                className="grad-pine grid h-10 w-10 place-items-center rounded-full text-cream transition disabled:opacity-30">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${i} * (100% / ${per} )))` }}>
            {testimonials.map((t) => (
              <figure key={t.name}
                className="grad-card flex w-full shrink-0 flex-col rounded-2xl border border-pine-600/10 p-7 shadow-card sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <Quote className="h-8 w-8 text-pine-200" />
                <div className="mt-3 flex gap-0.5 text-maroon-500">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <h3 className="mt-3 font-display text-[16px] font-bold text-ink">{t.title}</h3>
                <blockquote className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-soft">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-pine-600/10 pt-5">
                  <span className="grad-pine grid h-11 w-11 place-items-center rounded-full font-display text-base font-bold text-cream">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold text-ink">{t.name}</span>
                    <span className="block text-[12.5px] text-ink-faint">{t.trip}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faqs" className="py-20 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHead eyebrow="Questions & answers" title="Everything you might ask"
          intro="Anything else on your mind? Message us on WhatsApp — we usually reply within the hour." />
        <div className="grad-card divide-y divide-pine-600/10 rounded-2xl border border-pine-600/10 px-2 shadow-card">
          {faqs.map((f, k) => {
            const isOpen = open === k;
            return (
              <div key={f.q}>
                <button onClick={() => setOpen(isOpen ? -1 : k)} aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
                  <span className="font-display text-[16px] font-bold text-ink">{f.q}</span>
                  <span className={"grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all " +
                    (isOpen ? "grad-pine text-cream" : "bg-gradient-to-br from-pine-50 to-mist text-pine-700")}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className="grid overflow-hidden transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="min-h-0"><p className="px-5 pb-6 text-[14.5px] leading-relaxed text-ink-soft">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
