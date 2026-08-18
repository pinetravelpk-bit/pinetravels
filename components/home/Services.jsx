import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "../Icons";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { services } from "../../lib/site";

// accent key → gradient badge + soft ring
const ACCENT = {
  brand: "grad-brand",
  azure: "btn-azure bg-none",
  pink: "grad-aurora",
  coral: "bg-coral",
};

function ServiceCard({ service, i }) {
  return (
    <Reveal delay={(i % 3) * 80}>
      <Link
        href={`/services/${service.slug}`}
        className="card card-hover group flex h-full flex-col p-7"
      >
        <div className="flex items-center justify-between">
          <span className={`grid h-14 w-14 place-items-center rounded-2xl text-white shadow-glow ${ACCENT[service.accent] || "grad-brand"}`}>
            <Icon name={service.icon} className="h-7 w-7" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cloud text-ink-muted transition-all duration-300 group-hover:grad-brand group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-bold text-ink">{service.name}</h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-muted">{service.summary}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {service.deliverables.slice(0, 3).map((d) => (
            <span key={d} className="chip">{d}</span>
          ))}
        </div>
      </Link>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-center gap-4">
          <SectionHead
            eyebrow="What we do"
            title="Everything your brand needs to"
            accent="click."
            lead="One team across every creative discipline — so strategy, motion, design, influence and web all pull in the same direction."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} i={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link href="/services" className="btn-dark">
            Explore all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
