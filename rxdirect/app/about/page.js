import Icon from "@/components/Icon";
import PageBanner from "@/components/PageBanner";
import SectionHead from "@/components/SectionHead";
import CtaBand from "@/components/CtaBand";
import { site, stats, why } from "@/lib/site";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="About us" title={`About ${site.name}`} text={site.tagline} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-lg text-ink-soft">
            <SectionHead eyebrow="Our story" title="Built for Pakistan's healthcare sector" />
            <p>
              Hiring the right pharmacist or nurse shouldn't take months. {site.name} was founded to give hospitals,
              clinics and pharmacies a faster, more reliable way to find qualified people — and to give healthcare
              professionals a trustworthy route to good jobs.
            </p>
            <p>
              We focus only on healthcare. Every candidate is interviewed by our team and every licence is checked
              with the relevant council before a CV reaches an employer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-navy-900 p-6 text-white">
                <p className="font-display text-4xl font-extrabold text-brand-500">{s.value}</p>
                <p className="mt-1 text-sm text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <SectionHead center eyebrow="Our values" title="What we stand for" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="card p-6">
                <Icon name={w.icon} className="h-8 w-8 text-brand-500" />
                <h3 className="mt-4 font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
