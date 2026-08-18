import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import PageHero from "../../../components/PageHero";
import Icon from "../../../components/Icons";
import Reveal from "../../../components/Reveal";
import SectionHead from "../../../components/SectionHead";
import FAQ from "../../../components/home/FAQ";
import { services, getService } from "../../../lib/site";
import { JsonLd, serviceSchema, breadcrumbSchema, faqSchema, webPageSchema } from "../../../lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: `${s.name} — ${s.tagline}`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.name} | InventiveClicks`,
      description: s.summary,
      url: `/services/${s.slug}`,
    },
  };
}

const ACCENT = {
  brand: "grad-brand",
  azure: "bg-gradient-to-br from-azure-400 to-azure-600",
  pink: "grad-aurora",
  coral: "bg-gradient-to-br from-coral to-pink",
};

export default function ServiceDetail({ params }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={webPageSchema({ path: `/services/${service.slug}`, name: service.name, description: service.summary })} />

      <PageHero
        eyebrow={service.short}
        title={service.name}
        lead={service.tagline}
        crumbs={[{ name: "Services", path: "/services" }, { name: service.name }]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="flex flex-col gap-5">
            <span className="eyebrow w-fit">Overview</span>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {service.summary}
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">{service.intro}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/work" className="btn-ghost">See related work</Link>
            </div>
          </Reveal>

          {/* Outcomes card */}
          <Reveal delay={120}>
            <div className={`relative overflow-hidden rounded-xl3 p-8 text-white shadow-lift ${ACCENT[service.accent] || "grad-brand"}`}>
              <div className="absolute inset-0 grid-lines opacity-25" aria-hidden="true" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <div className="relative mt-8 space-y-6">
                {service.outcomes.map((o) => (
                  <div key={o.label} className="border-t border-white/20 pt-5 first:border-0 first:pt-0">
                    <p className="font-display text-4xl font-extrabold">{o.stat}</p>
                    <p className="mt-1 text-sm text-white/80">{o.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <SectionHead
            align="left"
            eyebrow="What you get"
            title="Deliverables, made"
            accent="to ship."
            className="max-w-xl"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d, i) => (
              <Reveal key={d} delay={(i % 3) * 60}>
                <div className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-cloud/60 p-5 transition-colors hover:border-brand-200 hover:bg-white">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-body text-[15px] font-semibold text-ink">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach / process */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Our approach"
            title="How we make"
            accent={`${service.name.toLowerCase()} work.`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="card p-6">
                <span className="font-display text-sm font-extrabold grad-text">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <div className="bg-white">
        <FAQ items={service.faqs} eyebrow="FAQ" title={`${service.name},`} accent="explained." />
      </div>

      {/* Related */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead align="left" eyebrow="Keep exploring" title="Related" accent="services." className="max-w-xl" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link href={`/services/${r.slug}`} className="card card-hover group flex h-full items-center gap-4 p-6">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${ACCENT[r.accent] || "grad-brand"}`}>
                    <Icon name={r.icon} className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold text-ink">{r.name}</h3>
                    <p className="text-xs text-ink-muted">{r.short}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
