import PageHero from "../../components/PageHero";
import WorkGrid from "../../components/WorkGrid";
import Reveal from "../../components/Reveal";
import { work, stats } from "../../lib/site";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../lib/seo";

export const metadata = {
  title: "Our Work — Campaigns, Films, Brands & Growth",
  description:
    "See selected work from InventiveClicks — video animation, brand design, creative campaigns and influencer programs, each with the results to prove it.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/work", name: "Our Work", description: metadata.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />

      <PageHero
        eyebrow="Our work"
        title="Proof that great ideas"
        accent="perform."
        lead="A selection of projects across every discipline — filter by what you're looking for, and notice the numbers under every headline."
        crumbs={[{ name: "Work" }]}
      />

      {/* impact strip */}
      <section className="border-b border-ink/5 bg-white py-10">
        <div className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="text-center">
              <p className="font-display text-3xl font-extrabold grad-text sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-x">
          <WorkGrid items={work} />
        </div>
      </section>
    </>
  );
}
