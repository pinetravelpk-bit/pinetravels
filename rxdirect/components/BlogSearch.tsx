"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import type { BlogPostMeta } from "@/lib/types";
import { useTranslation } from "@/i18n/LanguageContext";
import { postMatchesQuery } from "@/lib/blogSearchMatch";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function BlogSearch({
  onFilter,
}: {
  onFilter: (filtered: BlogPostMeta[] | null, query: string) => void;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<BlogPostMeta[] | null>(null);
  const trackedRef = useRef<string | null>(null);
  const loadingRef = useRef(false);

  // The blog is paginated, so search loads the full post list on first use.
  useEffect(() => {
    if (posts || loadingRef.current || query.trim().length < 2) return;
    loadingRef.current = true;
    fetch("/blog-search.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((list: BlogPostMeta[]) => setPosts(list))
      .catch(() => setPosts([]))
      .finally(() => {
        loadingRef.current = false;
      });
  }, [query, posts]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (q.length < 2 || !posts) return null;
    return posts.filter((p) => postMatchesQuery(p, q));
  }, [query, posts]);

  useEffect(() => {
    onFilter(filtered, query.trim());
  }, [filtered, query, onFilter]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;

    const timeout = setTimeout(() => {
      if (trackedRef.current === q) return;
      trackedRef.current = q;
      const count = filtered?.length ?? 0;

      window.gtag?.("event", "site_search", {
        search_term: q,
        results_count: count,
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, [query, filtered]);

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-4" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("blogPage.searchPlaceholder")}
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 rtl:pl-4 rtl:pr-11"
        />
      </div>
    </div>
  );
}
