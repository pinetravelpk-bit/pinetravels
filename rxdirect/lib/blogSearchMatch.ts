import type { BlogPostMeta } from "@/lib/types";

/** Match logic for the blog search box (components/BlogSearch.tsx). */
export function postMatchesQuery(post: BlogPostMeta, query: string): boolean {
  const q = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q) ||
    post.tags.some((t) => t.toLowerCase().includes(q))
  );
}
