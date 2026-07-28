import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { currentUser } from "../../../../lib/auth";
import { listHotelsAdmin, getHotelForAdmin, setHotel } from "../../../../lib/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/hotels           → list of hotels (slug, name, location)
// GET /api/admin/hotels?slug=xyz  → one hotel's full data
export async function GET(request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slug = request.nextUrl.searchParams.get("slug");
  if (slug) {
    const hotel = await getHotelForAdmin(slug);
    if (!hotel) return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    return NextResponse.json({ slug, data: hotel });
  }

  const hotels = await listHotelsAdmin();
  return NextResponse.json({
    hotels: hotels.map((h) => ({ slug: h.slug, name: h.name || h.slug, location: h.location || "" })),
  });
}

// PUT /api/admin/hotels  { slug, data }  → save + refresh the public pages
export async function PUT(request) {
  if (!(await currentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, data } = body || {};
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Hotel slug chahiye" }, { status: 400 });
  }
  if (data === undefined) {
    return NextResponse.json({ error: "No data supplied" }, { status: 400 });
  }

  try {
    await setHotel(slug, data);
    revalidatePath("/hotels");
    revalidatePath(`/hotels/${slug}`);
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    return NextResponse.json(
      { error: "Save nahi hua: " + (err.code || err.message) },
      { status: 500 }
    );
  }
}
