import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { insights, site } from "../../lib/site";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../lib/seo";

export const metadata = {
  title: "Insights — Marketing, Video, Design & AI-Era SEO",
  description:
    "Field notes from InventiveClicks on video that converts, design systems, vetting influencers and optimizing for generative-AI answer engines.",
  alternates: { canonical: "/insights" },
};

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/insights", name: "Insights", description: metadata.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${site.url}/insights`,
          name: "InventiveClicks Insights",
          publisher: { "@id": `${site.url}/#organization` },
          blogPost: insights.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${site.url}/insights/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />

      <PageHero
        eyebrow="Insights"
        title="Ideas worth"
        accent="clicking on."
        lead="Practical field notes on video, design, influence and the fast-changing world of AI-era marketing — from the team in the trenches."
        crumbs={[{ name: "Insights" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80}>
              <Link href={`/insights/${post.slug}`} className="card card-hover group flex h-full flex-col p-7">
                <div className="flex items-center gap-3 text-xs">
                  <span className="chip">{post.category}</span>
                  <span className="inline-flex items-center gap-1 text-ink-faint">
                    <Clock className="h-3.5 w-3.5" /> {post.read}
                  </span>
                </div>
                <h2 className="mt-4 flex-1 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
                  {post.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
                    <Calendar className="h-3.5 w-3.5" /> {fmtDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                    Read <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
