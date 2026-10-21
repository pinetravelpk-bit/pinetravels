import { CalendarCheck, ChevronDown, ListChecks, MessageCircleQuestion, Zap } from "lucide-react";
import type { PageContent } from "@/lib/pageContent";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// Long-form guide for a page (content/pages/*.md): a short direct answer,
// a table of contents, the article itself and its questions and answers.
// English copy; the page's own sections above it stay bilingual.
export default function PageArticle({ page, id = "guide" }: { page: PageContent | null; id?: string }) {
  if (!page) return null;
  return (
    <section id={id} className="section-py border-t border-gray-100 bg-white" dir="ltr" lang="en">
      <div className="container-px mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden lg:block">
          {page.headings.length > 2 && (
            <nav aria-label="On this page" className="sticky top-[136px] rounded-2xl border border-gray-100 bg-brand-50/40 p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                <ListChecks className="h-4 w-4 text-brand-600" />
                On this page
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {page.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="block leading-snug text-gray-600 hover:text-brand-700">
                      {h.text}
                    </a>
                  </li>
                ))}
                {page.faqs.length > 0 && (
                  <li>
                    <a href={`#${id}-faqs`} className="block leading-snug text-gray-600 hover:text-brand-700">
                      Questions and answers
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}
        </aside>

        <div className="min-w-0">
          {page.answer && (
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
                <Zap className="h-4 w-4" />
                Quick answer
              </p>
              <p className="mt-2 text-base leading-relaxed text-gray-800">{page.answer}</p>
            </div>
          )}

          <article
            className="prose-rxdirect prose mt-8 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy prose-a:no-underline prose-table:text-sm prose-th:bg-brand-50 prose-th:px-3 prose-td:px-3"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />

          <p className="mt-8 flex items-center gap-2 text-xs text-gray-500">
            <CalendarCheck className="h-4 w-4 text-brand-600" />
            Last updated {formatDate(page.updated)} by the RX Direct placement team, Rawalpindi.
          </p>

          {page.faqs.length > 0 && (
            <div id={`${id}-faqs`} className="mt-12 scroll-mt-36">
              <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-navy">
                <MessageCircleQuestion className="h-6 w-6 text-brand-600" />
                Questions and answers
              </h2>
              <div className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-200">
                {page.faqs.map((f) => (
                  <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-navy">
                      <h3 className="text-base">{f.q}</h3>
                      <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-gray-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
