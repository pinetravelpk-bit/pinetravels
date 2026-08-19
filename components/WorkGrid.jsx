"use client";

import { useState, useMemo } from "react";
import WorkCard from "./WorkCard";

export default function WorkGrid({ items }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-all ${
              active === cat
                ? "grad-brand text-white shadow-glow"
                : "border border-ink/10 bg-white text-ink-muted hover:border-brand-300 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
