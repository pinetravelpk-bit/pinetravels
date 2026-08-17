import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import PageHero from "../../../components/PageHero";
import Poster from "../../../components/visuals/Poster";
import Avatar from "../../../components/visuals/Avatar";
import PostsGrid from "../../../components/sections/PostsGrid";
import CTA from "../../../components/CTA";
import { Reveal } from "../../../components/ui/motion";
import { posts, getPost, formatDate } from "../../../lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function initialsOf(name = "") {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function BlogDetail({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        align="center"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.category },
        ]}
        eyebrow={post.category}
        title={post.title}
      >
        <div className="flex items-center justify-center gap-3 text-sm text-muted">
          <span>{post.author}</span>
          <span className="h-1 w-1 rounded-full bg-faint" />
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-faint" />
          <span className="flex items-center gap-1">
            <Clock size={13} /> {post.read}
          </span>
        </div>
      </PageHero>

      {/* Cover */}
      <section className="pb-6">
        <div className="container">
          <Reveal className="overflow-hidden rounded-[2rem] border border-line">
            <Poster palette={post.palette} seed={post.slug} rounded="rounded-none" className="aspect-[16/8] w-full" />
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <article className="section pt-6">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <p
                  className={`mb-6 leading-relaxed ${
                    i === 0 ? "text-lg text-cream/90 md:text-xl" : "text-muted"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}

            {/* Author */}
            <div className="mt-10 flex items-center gap-4 rounded-3xl border border-line bg-ink-800/60 p-6">
              <Avatar
                initials={initialsOf(post.author)}
                palette={post.palette}
                seed={post.author}
                rounded="rounded-2xl"
                className="h-14 w-14 shrink-0"
              />
              <div>
                <div className="text-xs uppercase tracking-wide text-faint">Written by</div>
                <div className="text-lg font-bold text-cream">{post.author}</div>
                <div className="text-sm text-muted">InventiveClicks</div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/blog" className="btn-ghost">
                <ArrowLeft size={16} /> Back to blog
              </Link>
            </div>
          </div>
        </div>
      </article>

      <PostsGrid
        items={related}
        eyebrow="Keep reading"
        title="Related articles"
        description="More playbooks and lessons from the team."
      />

      <CTA />
    </>
  );
}
