import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import Poster from "../visuals/Poster";
import { Stagger, StaggerItem } from "../ui/motion";
import { SectionHeading, Button } from "../ui/primitives";
import { posts as allPosts, formatDate } from "../../lib/data";

function PostCard({ post }) {
  return (
    <StaggerItem className="h-full">
      <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col">
        <div className="overflow-hidden">
          <Poster
            palette={post.palette}
            seed={post.slug}
            label={post.category}
            rounded="rounded-none"
            className="aspect-[16/10] w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-3 text-xs text-faint">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {post.read}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-snug text-cream transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-5 text-sm">
            <span className="text-cream/80">{post.author}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-cream transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-ink-900">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}

export default function PostsGrid({
  items = allPosts,
  limit,
  showHeader = true,
  eyebrow = "From the blog",
  title = "Ideas worth clicking",
  description = "Playbooks, teardowns and lessons from the front lines of growth marketing.",
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
              <Button href="/blog" variant="ghost" icon="up-right" className="shrink-0">
                Read the blog
              </Button>
            )}
          </div>
        )}
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
