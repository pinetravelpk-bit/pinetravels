import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, MapPin, Quote } from "lucide-react";
import Icon from "@/components/Icon";
import SectionHead from "@/components/SectionHead";
import CtaBand from "@/components/CtaBand";
import { jobs, services, site, stats, steps, testimonials, why } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="container-x relative grid gap-12 py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
              <BadgeCheck className="h-4 w-4 text-brand-500" /> Verified healthcare professionals
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The right healthcare staff, <span className="text-brand-500">direct</span> to your door.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">{site.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/employers" className="btn-primary px-6 py-3.5 text-base">
                Hire Staff <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/jobs" className="btn border border-white/30 px-6 py-3.5 text-base text-white hover:bg-white/10">
                Find a Job
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="font-display text-4xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="What we do"
            title="Staffing for every corner of healthcare"
            text="From a single locum shift to a fully staffed new pharmacy, we supply people who are qualified, verified and ready to work."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="card p-7 transition hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <SectionHead center eyebrow="How it works" title="Simple for employers and candidates" />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {[
              { title: "For employers", list: steps.employers, href: "/employers", cta: "Request staff" },
              { title: "For candidates", list: steps.candidates, href: "/apply", cta: "Submit your CV" },
            ].map((col) => (
              <div key={col.title} className="card p-8">
                <h3 className="font-display text-2xl font-bold">{col.title}</h3>
                <ol className="mt-6 space-y-6">
                  {col.list.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-900 font-display font-bold text-white">{i + 1}</span>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="mt-1 text-ink-soft">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link href={col.href} className="btn-primary mt-8">{col.cta} <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHead
            eyebrow="Why RxDirect"
            title="A staffing partner that understands healthcare"
            text="We only recruit for healthcare, so every candidate is screened by people who know what the role actually demands."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {why.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{w.title}</h3>
                  <p className="mt-1 text-ink-soft">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest jobs */}
      <section className="bg-slate-50 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Open positions" title="Latest jobs" />
            <Link href="/jobs" className="btn-outline">View all jobs <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <Link key={job.slug} href={`/apply?job=${job.slug}`} className="card group p-6 transition hover:border-brand-500">
                <h3 className="font-display text-lg font-bold group-hover:text-brand-600">{job.title}</h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.type}</span>
                </div>
                <p className="mt-3 text-sm text-ink-soft">{job.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-x">
          <SectionHead center eyebrow="Testimonials" title="Trusted by facilities and professionals" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="card p-7">
                <Quote className="h-8 w-8 text-brand-500" />
                <blockquote className="mt-4 text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-ink-soft"> — {t.org}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
