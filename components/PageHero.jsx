import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

// Inner-page banner with breadcrumb + decorative aurora on a dark panel.
export default function PageHero({ eyebrow, title, accent, lead, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden grad-ink pt-28">
      <div className="aurora -left-24 top-0 h-80 w-80 bg-brand-600/40" aria-hidden="true" />
      <div className="aurora right-0 -top-10 h-72 w-72 bg-azure-500/30" aria-hidden="true" />
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />

      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <Reveal className="flex max-w-3xl flex-col gap-5">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-brand-100/60">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.path} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {c.path ? (
                  <Link href={c.path} className="hover:text-white">{c.name}</Link>
                ) : (
                  <span className="text-white/90">{c.name}</span>
                )}
              </span>
            ))}
          </nav>

          {eyebrow && <span className="eyebrow-dark w-fit">{eyebrow}</span>}
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {title} {accent && <span className="grad-text-aurora">{accent}</span>}
          </h1>
          {lead && <p className="max-w-2xl text-lg leading-relaxed text-brand-100/70">{lead}</p>}
        </Reveal>
      </div>

      {/* curved bottom edge into page */}
      <div className="h-10 rounded-t-[2.5rem] bg-cloud sm:h-14" />
    </section>
  );
}
