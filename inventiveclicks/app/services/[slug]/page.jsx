import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";
import PageHero from "../../../components/PageHero";
import Poster from "../../../components/visuals/Poster";
import Icon from "../../../components/visuals/Icon";
import ProcessSteps from "../../../components/sections/ProcessSteps";
import ServicesGrid from "../../../components/sections/ServicesGrid";
import CTA from "../../../components/CTA";
import { Reveal } from "../../../components/ui/motion";
import { services, getService } from "../../../lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getService(params.slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.excerpt };
}

export default function ServiceDetail({ params }) {
  const service = getService(params.slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        eyebrow={service.tagline}
        title={service.title}
        description={service.excerpt}
      />

      <section className="section pt-0">
        <div className="container grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Main */}
          <Reveal>
            <h2 className="text-2xl font-bold sm:text-3xl">How we approach {service.title.toLowerCase()}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{service.excerpt}</p>
            <p className="mt-4 leading-relaxed text-muted">
              Every {service.title.toLowerCase()} engagement is senior-led and tied directly to your revenue
              goals. We combine strategy, execution and relentless optimisation into one accountable program —
              and report on the outcomes that actually move your business, not vanity metrics.
            </p>

            <h3 className="mt-10 text-lg font-bold text-cream">Capabilities</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-cream/90">{f}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Aside */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-line">
              <Poster palette={service.palette} seed={service.slug} rounded="rounded-none" className="aspect-[4/3] w-full" />
              <span className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-ink-900/70 text-brand backdrop-blur">
                <Icon name={service.icon} size={26} />
              </span>
            </div>

            <div className="mt-4 rounded-3xl border border-line bg-ink-800/60 p-6">
              <div className="font-display text-4xl font-extrabold text-brand">{service.metric.value}</div>
              <div className="mt-1 text-sm text-muted">{service.metric.label}</div>

              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-cream">What&apos;s included</h4>
              <ul className="mt-3 space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-cream/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand" />
                    {d}
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="btn-primary mt-6 w-full">
                Start with {service.title.split(" ")[0]}
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ProcessSteps
        eyebrow="Delivery"
        title="How we deliver, every month"
        description="A repeatable rhythm that keeps momentum high and results compounding."
      />

      <ServicesGrid
        items={others}
        showHeader
        eyebrow="Keep exploring"
        title="Other services"
        description="Great channels rarely work alone. Here's what pairs well."
      />

      <CTA />
    </>
  );
}
