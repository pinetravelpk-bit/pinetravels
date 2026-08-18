import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "../Icons";
import Reveal from "../Reveal";
import { whyUs } from "../../lib/site";

export default function About() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Visual panel */}
        <Reveal className="relative">
          <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-xl3 grad-ink p-8 shadow-lift">
            <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
            <div className="aurora -right-10 -top-10 h-56 w-56 bg-brand-500/50" aria-hidden="true" />
            <div className="aurora -bottom-10 -left-8 h-52 w-52 bg-azure-500/40" aria-hidden="true" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-eyebrow text-brand-200">Since 2019</p>
                <p className="mt-3 max-w-xs font-display text-2xl font-bold leading-snug text-white">
                  One creative team. Every channel that matters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur ring-1 ring-white/10">
                  <p className="font-display text-3xl font-extrabold text-white">98%</p>
                  <p className="mt-1 text-xs text-brand-100/70">client retention</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur ring-1 ring-white/10">
                  <p className="font-display text-3xl font-extrabold text-white">48h</p>
                  <p className="mt-1 text-xs text-brand-100/70">reel turnaround</p>
                </div>
                <div className="col-span-2 flex items-center gap-3 rounded-2xl grad-brand p-4">
                  <span className="font-display text-3xl font-extrabold text-white">+38%</span>
                  <span className="text-sm text-white/85">average lift in conversions across retainers</span>
                </div>
              </div>
            </div>
          </div>
          {/* floating badge */}
          <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-white p-4 shadow-lift ring-1 ring-ink/5 sm:block">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl grad-aurora text-white">
                <Icon name="spark" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold leading-none text-ink">1,200+</p>
                <p className="text-xs text-ink-muted">projects shipped</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy + why-us */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="eyebrow">Why InventiveClicks</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Creative that's <span className="grad-text">felt</span> — and proven to{" "}
              <span className="grad-text">perform.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-lg leading-relaxed text-ink-muted">
              We're the creative partner brands call when "nice-looking" isn't enough. Every idea we
              ship carries a target and a way to measure it — so beauty and results never trade off.
            </p>
          </Reveal>

          <div className="mt-2 grid gap-5 sm:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Link href="/about" className="btn-ghost mt-2 w-fit">
              More about us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
