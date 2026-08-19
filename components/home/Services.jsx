"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "../Icons";
import Reveal from "../Reveal";
import { services } from "../../lib/site";

const HEX = { clipPath: "polygon(50% 0, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" };

export default function Services() {
  const [active, setActive] = useState(0);
  const svc = services[active];
  const cards = svc.deliverables.slice(0, 4);

  return (
    <section id="services" className="relative overflow-hidden grad-ink py-20 lg:py-28">
      {/* decorative glow + dotted swirls */}
      <div className="aurora left-1/2 top-10 h-72 w-[36rem] -translate-x-1/2 bg-brand-600/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 top-24 h-72 w-72 rounded-full border border-dashed border-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-16 bottom-16 h-64 w-64 rounded-full border border-dashed border-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full conic-ring opacity-30 blur-[2px]" aria-hidden="true" />

      <div className="container-x relative">
        {/* heading */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Reveal><span className="tagline">Our Services</span></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl md:text-[42px]">
              Creative services that solve real <span className="grad-text">business problems</span>
            </h2>
          </Reveal>
        </div>

        {/* tabs */}
        <Reveal delay={120} className="mt-9">
          <div className="rail flex justify-start gap-2.5 overflow-x-auto pb-1 md:flex-wrap md:justify-center">
            {services.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setActive(i)}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 font-body text-sm font-bold transition-all ${
                  i === active
                    ? "grad-brand text-white shadow-glow"
                    : "border border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 h-px w-full bg-white/10" />

        {/* cards */}
        <div key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((title, i) => (
            <div
              key={title}
              className="group flex flex-col items-center rounded-[2.25rem] bg-white p-7 text-center shadow-lift"
            >
              {/* hexagon icon */}
              <div className="relative grid h-24 w-24 place-items-center">
                <span className="absolute inset-0 bg-gradient-to-br from-brand-100 to-azure-300/40" style={HEX} />
                <span className="relative grid h-12 w-12 place-items-center rounded-xl grad-brand text-white">
                  <Icon name={svc.icon} className="h-6 w-6" />
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">{title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                {svc.short} — delivered as part of our {svc.name.toLowerCase()} service.
              </p>

              <Link
                href={`/services/${svc.slug}`}
                aria-label={`Learn more about ${svc.name}`}
                className="mt-5 grid h-11 w-11 place-items-center rounded-full border border-brand-200 text-brand-600 transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-600 group-hover:text-white"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>

        <Reveal className="mt-11 flex justify-center">
          <Link href="/services" className="btn-primary">
            Explore all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
