import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "../visuals/Icon";
import { Stagger, StaggerItem } from "../ui/motion";
import { SectionHeading, Button } from "../ui/primitives";
import { services as allServices } from "../../lib/data";

function ServiceCard({ service, index }) {
  return (
    <StaggerItem className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="card card-hover group flex h-full flex-col p-7"
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/30 bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-ink-900">
            <Icon name={service.icon} size={24} />
          </span>
          <span className="font-display text-4xl font-extrabold text-white/[0.06] transition-colors group-hover:text-white/[0.12]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-xl font-bold text-cream">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.excerpt}</p>

        <div className="mt-auto flex items-end justify-between pt-7">
          <div>
            <div className="font-display text-2xl font-extrabold text-brand">{service.metric.value}</div>
            <div className="text-xs text-faint">{service.metric.label}</div>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-ink-900">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </StaggerItem>
  );
}

export default function ServicesGrid({
  items = allServices,
  limit,
  showHeader = true,
  eyebrow = "What we do",
  title = "Services engineered for growth",
  description = "A full-funnel toolkit — pick one channel or let us run the whole engine. Everything ties back to revenue.",
  footer = false,
}) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <section className="section">
      <div className="container">
        {showHeader && (
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {footer && (
              <Button href="/services" variant="ghost" icon="up-right" className="shrink-0">
                All services
              </Button>
            )}
          </div>
        )}

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
