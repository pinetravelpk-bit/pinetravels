import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import ServiceIcon from "./ServiceIcon";
import { services } from "../lib/data";

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="What we do"
            title="Everything for the trip, under one roof"
            intro="Ten services built around real northern travel — from full tour management to a single jeep for the day you go off-road."
          />
          <Reveal delay={120}>
            <Link href="/services" className="btn-ghost whitespace-nowrap">Explore all services</Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <article className="group h-full rounded-2xl border border-pine-600/10 grad-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-pine-600/25 hover:shadow-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-700 transition-colors group-hover:bg-pine-600 group-hover:text-cream">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{s.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
