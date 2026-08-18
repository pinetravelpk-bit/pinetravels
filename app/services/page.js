import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "../../components/PageHero";
import Process from "../../components/home/Process";
import Icon from "../../components/Icons";
import Reveal from "../../components/Reveal";
import { services, site } from "../../lib/site";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../lib/seo";

export const metadata = {
  title: "Services — Video, Design, Marketing & Influencer",
  description:
    "Explore InventiveClicks' services: video animation, graphic design, creative marketing, influencer marketing, social media and web design & development. One team, every creative discipline.",
  alternates: { canonical: "/services" },
};

const ACCENT = {
  brand: "grad-brand",
  azure: "bg-gradient-to-br from-azure-400 to-azure-600",
  pink: "grad-aurora",
  coral: "bg-gradient-to-br from-coral to-pink",
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/services", name: "Services", description: metadata.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/services/${s.slug}`,
            name: s.name,
          })),
        }}
      />

      <PageHero
        eyebrow="Our services"
        title="Creative services that make brands"
        accent="click."
        lead="Six disciplines, one integrated team. Pick a single project or plug us in across the whole funnel — the work always ships with a target attached."
        crumbs={[{ name: "Services" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <div className="card card-hover flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-glow ${ACCENT[s.accent] || "grad-brand"}`}>
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink">{s.name}</h2>
                    <p className="text-sm font-semibold text-brand-700">{s.tagline}</p>
                  </div>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{s.summary}</p>

                <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-ink">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-ink/5 pt-5">
                  <div className="flex gap-6">
                    {s.outcomes.map((o) => (
                      <div key={o.label}>
                        <p className="font-display text-lg font-extrabold grad-text">{o.stat}</p>
                        <p className="text-xs text-ink-muted">{o.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-brand-700 hover:text-brand-800"
                    aria-label={`Learn more about ${s.name}`}
                  >
                    Details <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="bg-white">
        <Process />
      </div>
    </>
  );
}
