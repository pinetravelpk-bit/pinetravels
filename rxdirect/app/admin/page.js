import { listSubmissions } from "@/lib/store";
import { jobs } from "@/lib/site";

// Protected by HTTP Basic auth in middleware.js.
export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false } };

const TABS = [
  { key: "candidate", label: "Candidates" },
  { key: "employer", label: "Employer requests" },
  { key: "contact", label: "Messages" },
];

const LABELS = {
  name: "Name", organisation: "Organisation", phone: "Phone", email: "Email", city: "City", role: "Role",
  job: "Applying for", experience: "Experience (yrs)", licence: "Licence", positions: "Positions",
  startDate: "Required from", subject: "Subject", message: "Message",
};

export default async function AdminPage({ searchParams }) {
  const tab = TABS.find((t) => t.key === searchParams?.tab)?.key || "candidate";
  const all = await listSubmissions();
  const rows = all.filter((s) => s.type === tab);
  const jobTitle = (slug) => (slug === "general" ? "General registration" : jobs.find((j) => j.slug === slug)?.title || slug);

  return (
    <section className="container-x py-12">
      <h1 className="font-display text-3xl font-extrabold">Submissions</h1>
      <nav className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count = all.filter((s) => s.type === t.key).length;
          return (
            <a key={t.key} href={`/admin?tab=${t.key}`} className={`rounded-xl px-4 py-2 text-sm font-semibold ${t.key === tab ? "bg-navy-900 text-white" : "bg-slate-100 text-ink hover:bg-slate-200"}`}>
              {t.label} ({count})
            </a>
          );
        })}
      </nav>
      {rows.length === 0 ? (
        <p className="mt-10 text-ink-soft">Nothing here yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {rows.map((s) => (
            <article key={s.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">{s.fields.name}{s.fields.organisation && ` — ${s.fields.organisation}`}</h2>
                <time className="text-sm text-ink-soft">{new Date(s.createdAt).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}</time>
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(s.fields).filter(([k]) => k !== "name" && k !== "organisation").map(([k, v]) => (
                  <div key={k} className={k === "message" ? "sm:col-span-2 lg:col-span-3" : ""}>
                    <dt className="text-ink-soft">{LABELS[k] || k}</dt>
                    <dd className="whitespace-pre-wrap break-words font-medium">{k === "job" ? jobTitle(v) : v}</dd>
                  </div>
                ))}
              </dl>
              {s.cv && (
                <a href={`/api/admin/cv/${s.id}`} className="btn-outline mt-4 py-2">Download CV ({s.cv.original})</a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
