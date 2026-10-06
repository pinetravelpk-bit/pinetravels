import type { BlogPostMeta } from "@/lib/types";

/** Match logic for the blog search box (components/BlogSearch.tsx): every
 *  word of the query must appear in the title, excerpt or tags, so
 *  "cook islamabad" finds "Hire a Cook in Islamabad". */
export function postMatchesQuery(post: BlogPostMeta, query: string): boolean {
  const text = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}
