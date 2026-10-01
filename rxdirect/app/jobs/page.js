import Link from "next/link";
import { Banknote, Briefcase, MapPin } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { jobs } from "@/lib/site";

export const metadata = { title: "Jobs", description: "Open healthcare and pharmacy jobs across Pakistan." };

export default function JobsPage() {
  return (
    <>
      <PageBanner eyebrow="Careers" title="Open healthcare jobs" text="Verified employers, fair pay and support through every step. Don't see your role? Register anyway — new positions open every week." />
      <section className="py-16">
        <div className="container-x space-y-4">
          {jobs.map((job) => (
            <article key={job.slug} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">{job.title}</h2>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{job.type}</span>
                  <span className="flex items-center gap-1.5"><Banknote className="h-4 w-4" />{job.salary}</span>
                </div>
                <p className="mt-3 max-w-2xl text-ink-soft">{job.summary}</p>
              </div>
              <Link href={`/apply?job=${job.slug}`} className="btn-primary shrink-0">Apply now</Link>
            </article>
          ))}
          <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
            <h2 className="font-display text-xl font-bold">Not seeing the right role?</h2>
            <p className="mt-2 text-ink-soft">Send us your CV and we'll contact you when a matching job opens.</p>
            <Link href="/apply" className="btn-outline mt-5">Register your CV</Link>
          </div>
        </div>
      </section>
    </>
  );
}
