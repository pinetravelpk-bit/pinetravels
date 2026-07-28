import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { listHotelsAdmin } from "../../../../lib/cms";

export const dynamic = "force-dynamic";

export default async function HotelsIndex() {
  const hotels = await listHotelsAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Hotels</h1>
      <p className="mt-1 text-[14.5px] text-ink-soft">
        Kisi bhi hotel ko kholein — rooms, tafseel, aur har room ki tasveerein yahan se
        upload/edit karein. Save karte hi website par live ho jata hai.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-pine-600/10 bg-white">
        {hotels.map((h, i) => (
          <Link
            key={h.slug}
            href={`/admin/hotels/${h.slug}`}
            className={
              "flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-pine-50 " +
              (i > 0 ? "border-t border-pine-600/10" : "")
            }
          >
            <span className="min-w-0">
              <span className="block truncate font-display text-[15px] font-bold text-ink">
                {h.name || h.slug}
              </span>
              <span className="block truncate text-[13px] text-ink-faint">
                {h.location || h.slug} · {h.rooms?.length || 0} rooms
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-ink-faint" />
          </Link>
        ))}
      </div>
    </div>
  );
}
