import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import PageHero from "../../components/PageHero";
import Poster from "../../components/visuals/Poster";
import PostsGrid from "../../components/sections/PostsGrid";
import CTA from "../../components/CTA";
import { Reveal } from "../../components/ui/motion";
import { posts, formatDate } from "../../lib/data";

export const metadata = {
  title: "Blog",
  description:
    "Playbooks, teardowns and lessons from the front lines of growth marketing — from the team at InventiveClicks.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="From the blog"
        title={
          <>
            Ideas worth <span className="gradient-text">clicking</span>
          </>
        }
        description="No fluff. Just the strategies, experiments and lessons we're using to grow brands right now."
      />

      {/* Featured */}
      <section className="section pt-4">
        <div className="container">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-line bg-ink-800/60 lg:grid-cols-2"
            >
              <div className="overflow-hidden">
                <Poster
                  palette={featured.palette}
                  seed={featured.slug}
                  label={featured.category}
                  rounded="rounded-none"
                  className="aspect-[16/10] h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-4 flex items-center gap-3 text-xs text-faint">
                  <span className="rounded-full bg-brand/15 px-2.5 py-1 font-semibold text-brand">Featured</span>
                  <span>{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {featured.read}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-cream transition-colors group-hover:text-brand sm:text-3xl md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-semibold text-brand">
                  Read article
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <PostsGrid items={rest} showHeader={false} />
      <CTA title="Let's write your growth story" />
    </>
  );
}
