import { Inbox, Phone, Mail } from "lucide-react";
import { listEnquiries } from "../../../../lib/cms";
import { parseJSON } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const items = await listEnquiries({ limit: 200 });

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-ink">Enquiries</h1>
      <p className="mt-1 text-[14.5px] text-ink-soft">
        Website ke forms se aane wali enquiries yahan aati hain.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-pine-600/10 bg-white px-6 py-12 text-center">
          <Inbox className="mx-auto h-7 w-7 text-ink-faint" strokeWidth={1.6} />
          <p className="mt-3 font-display text-[15px] font-bold text-ink">Abhi koi enquiry nahi</p>
          <p className="mt-1 text-[13.5px] text-ink-faint">
            Jab koi contact form ya booking bhejay ga, wo yahan nazar aayegi.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((e) => {
            const payload = parseJSON(e.payload, null);
            return (
              <article key={e.id} className="rounded-xl border border-pine-600/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-display text-[15.5px] font-bold text-ink">
                      {e.name || "Bina naam"}
                    </h2>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-soft">
                      {e.phone && (
                        <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1.5 hover:text-pine-700">
                          <Phone className="h-3.5 w-3.5" /> {e.phone}
                        </a>
                      )}
                      {e.email && (
                        <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 hover:text-pine-700">
                          <Mail className="h-3.5 w-3.5" /> {e.email}
                        </a>
                      )}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-pine-50 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-wider text-pine-700">
                      {e.type}
                    </span>
                    <time className="text-[12px] text-ink-faint">
                      {new Date(e.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </time>
                  </span>
                </div>

                {e.subject && <p className="mt-3 text-[14px] font-semibold text-ink">{e.subject}</p>}
                {e.message && <p className="mt-1.5 whitespace-pre-line text-[14px] text-ink-soft">{e.message}</p>}

                {payload && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-[13px] font-semibold text-pine-700">
                      Tafseel dekhein
                    </summary>
                    <pre className="mt-2 overflow-x-auto rounded-lg bg-[#f5f6f4] p-3 font-mono text-[12px] leading-relaxed text-ink-soft">
                      {JSON.stringify(payload, null, 2)}
                    </pre>
                  </details>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
