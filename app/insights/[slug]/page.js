import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, ArrowUpRight } from "lucide-react";
import PageHero from "../../../components/PageHero";
import Reveal from "../../../components/Reveal";
import { insights, site } from "../../../lib/site";
import { JsonLd, articleSchema, breadcrumbSchema } from "../../../lib/seo";

const getPost = (slug) => insights.find((p) => p.slug === slug);

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/insights/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: `/insights/${p.slug}`,
      publishedTime: p.date,
    },
  };
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function InsightDetail({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const more = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={{ ...articleSchema(post), datePublished: post.date, dateModified: post.date, image: `${site.url}/opengraph-image` }} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ name: "Insights", path: "/insights" }, { name: post.category }]}
      />

      <article className="py-16 lg:py-20">
        <div className="container-x max-w-3xl">
          <Reveal className="mb-8 flex flex-wrap items-center gap-4 border-b border-ink/5 pb-6 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-brand-600" /> {fmtDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand-600" /> {post.read}</span>
            <span className="chip">By {site.name}</span>
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <p className="text-xl font-semibold leading-relaxed text-ink">{post.excerpt}</p>
            {post.body.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h2 className="mb-3 mt-4 font-display text-2xl font-bold text-ink">{block.heading}</h2>
                )}
                <p className="text-[17px] leading-[1.75] text-ink-muted">{block.text}</p>
              </div>
            ))}
          </Reveal>

          {/* inline CTA */}
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-xl2 grad-ink p-8 text-white">
              <div className="aurora -right-8 -top-8 h-40 w-40 bg-brand-500/40" aria-hidden="true" />
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">Want this working for your brand?</h3>
                  <p className="mt-1 text-brand-100/70">Let's turn these ideas into a plan that performs.</p>
                </div>
                <Link href="/contact" className="btn-primary shrink-0">
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 flex justify-between border-t border-ink/5 pt-8">
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800">
              <ArrowLeft className="h-4 w-4" /> All insights
            </Link>
          </div>
        </div>
      </article>

      {/* more */}
      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="mb-8 font-display text-2xl font-bold text-ink">Keep reading</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/insights/${p.slug}`} className="card card-hover group flex flex-col p-7">
                <span className="chip w-fit">{p.category}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">{p.title}</h3>
                <p className="mt-2 text-[15px] text-ink-muted">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
