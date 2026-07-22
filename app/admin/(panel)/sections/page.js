import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SECTION_META, SECTION_GROUPS } from "../../../../lib/sections";

export const dynamic = "force-dynamic";

export default function SectionsIndex() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Page Sections</h1>
      <p className="mt-1 text-[14.5px] text-ink-soft">
        Website ka har hissa yahan se edit hota hai. Save karte hi live ho jata hai.
      </p>

      <div className="mt-7 space-y-7">
        {SECTION_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-[11.5px] font-semibold uppercase tracking-wider text-ink-faint">
              {group.title}
            </h2>
            <div className="mt-2.5 overflow-hidden rounded-xl border border-pine-600/10 bg-white">
              {group.keys.map((key, i) => {
                const meta = SECTION_META[key];
                if (!meta) return null;
                return (
                  <Link
                    key={key}
                    href={`/admin/sections/${key}`}
                    className={
                      "flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-pine-50 " +
                      (i > 0 ? "border-t border-pine-600/10" : "")
                    }
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-display text-[15px] font-bold text-ink">
                        {meta.title}
                      </span>
                      <span className="block truncate text-[13px] text-ink-faint">{meta.description}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
