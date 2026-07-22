import Link from "next/link";
import { Database, Layers, Inbox, Image as ImageIcon, AlertTriangle, CheckCircle2 } from "lucide-react";
import { dbHealth, query } from "../../../lib/db";
import { currentUser } from "../../../lib/auth";

export const dynamic = "force-dynamic";

async function count(table) {
  const rows = await query(`SELECT COUNT(*) AS n FROM ${table}`);
  return rows && rows[0] ? Number(rows[0].n) : 0;
}

export default async function Dashboard() {
  const user = await currentUser();
  const health = await dbHealth();

  const [sections, packages, hotels, posts, enquiries, media] = health.ok
    ? await Promise.all([
        count("content"), count("packages"), count("hotels"),
        count("posts"), count("enquiries"), count("media"),
      ])
    : [0, 0, 0, 0, 0, 0];

  const newEnquiries = health.ok
    ? await query("SELECT COUNT(*) AS n FROM enquiries WHERE status = 'new'")
    : null;

  const cards = [
    { label: "Page sections", value: sections, href: "/admin/sections", Icon: Layers },
    { label: "Packages & trips", value: packages, href: "/admin/sections", Icon: Layers },
    { label: "Hotels", value: hotels, href: "/hotels", Icon: Layers },
    { label: "Blog posts", value: posts, href: "/admin/sections", Icon: Layers },
    { label: "Enquiries", value: enquiries, href: "/admin/enquiries", Icon: Inbox },
    { label: "Media files", value: media, href: "/admin/media", Icon: ImageIcon },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">
        Assalam-o-Alaikum{user?.name ? `, ${user.name}` : ""}
      </h1>
      <p className="mt-1 text-[14.5px] text-ink-soft">
        Yahan se poori website ka content manage kar sakte hain.
      </p>

      <div
        className={
          "mt-6 flex items-start gap-3 rounded-xl px-4 py-3.5 text-[14px] " +
          (health.ok ? "bg-pine-600/10 text-pine-800" : "bg-amber-500/15 text-amber-900")
        }
      >
        {health.ok ? (
          <>
            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0" />
            <span>Database connected. Har tabdeeli foran website par live ho jati hai.</span>
          </>
        ) : (
          <>
            <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0" />
            <span>
              Database connect nahi hai ({health.reason}). Website abhi files wale content par chal
              rahi hai. <code className="font-mono text-[13px]">.env</code> check karein aur{" "}
              <code className="font-mono text-[13px]">npm run setup</code> chalayein.
            </span>
          </>
        )}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-xl border border-pine-600/10 bg-white p-5 transition-shadow hover:shadow-card"
          >
            <c.Icon className="h-5 w-5 text-pine-600" strokeWidth={1.7} />
            <div className="mt-3 font-display text-2xl font-extrabold text-ink">{c.value}</div>
            <div className="text-[13px] text-ink-faint">{c.label}</div>
          </Link>
        ))}
      </div>

      {newEnquiries && Number(newEnquiries[0]?.n) > 0 && (
        <Link
          href="/admin/enquiries"
          className="mt-6 flex items-center gap-3 rounded-xl bg-maroon-600 px-4 py-3.5 text-cream"
        >
          <Inbox className="h-4.5 w-4.5" />
          <span className="text-[14.5px] font-semibold">
            {newEnquiries[0].n} nayi enquiry — dekhne ke liye click karein
          </span>
        </Link>
      )}

      <div className="mt-8 rounded-xl border border-pine-600/10 bg-white p-5">
        <h2 className="flex items-center gap-2 font-display text-[15px] font-bold text-ink">
          <Database className="h-4 w-4 text-pine-600" /> Jaldi shuru karein
        </h2>
        <ul className="mt-3 space-y-2 text-[14px] text-ink-soft">
          <li>· <Link href="/admin/sections/site" className="font-semibold text-pine-700 hover:underline">Site Settings</Link> — phone, WhatsApp, email, address, social links</li>
          <li>· <Link href="/admin/sections/hero" className="font-semibold text-pine-700 hover:underline">Hero & Video</Link> — home page ki heading aur background video</li>
          <li>· <Link href="/admin/sections" className="font-semibold text-pine-700 hover:underline">Page Sections</Link> — home page ka har hissa</li>
        </ul>
      </div>
    </div>
  );
}
