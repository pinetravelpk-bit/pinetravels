import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getHotelForAdmin } from "../../../../../lib/cms";
import SectionEditor from "../../../../../components/admin/SectionEditor";

export const dynamic = "force-dynamic";

// Make sure the photo uploaders always show — even for hotels/rooms that
// don't have a photos field yet — by defaulting them before editing.
function withMediaFields(hotel) {
  const h = { ...hotel, photos: Array.isArray(hotel.photos) ? hotel.photos : [] };
  if (Array.isArray(h.rooms)) {
    h.rooms = h.rooms.map((r) => ({
      ...r,
      description: typeof r.description === "string" ? r.description : "",
      photos: Array.isArray(r.photos) ? r.photos : [],
    }));
  }
  delete h.slug; // slug is fixed by the URL, not edited in the form
  return h;
}

export default async function HotelEditPage({ params }) {
  const { slug } = await params;
  const hotel = await getHotelForAdmin(slug);
  if (!hotel) notFound();

  return (
    <div>
      <Link
        href="/admin/hotels"
        className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-faint hover:text-pine-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All hotels
      </Link>
      <SectionEditor
        sectionKey={slug}
        endpoint="/api/admin/hotels"
        idKey="slug"
        title={hotel.name || slug}
        description="Har hotel aur har room ke ‘Photos’ box se images upload karein. Save karte hi live."
        initial={withMediaFields(hotel)}
      />
    </div>
  );
}
