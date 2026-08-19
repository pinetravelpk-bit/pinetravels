import Link from "next/link";
import { ArrowUpRight, Play, Star, Check } from "lucide-react";
import Reveal from "../Reveal";
import { site } from "../../lib/site";

function FloatCard({ className = "", delay = 0, rotate = "", children }) {
  return (
    <div
      className={`absolute rounded-2xl bg-white/90 p-4 shadow-lift ring-1 ring-ink/5 backdrop-blur animate-floaty ${rotate} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden grad-soft pt-28">
      {/* aurora field */}
      <div className="aurora -left-24 top-10 h-[26rem] w-[26rem] bg-brand-400/40" aria-hidden="true" />
      <div className="aurora right-[-6rem] top-0 h-96 w-96 bg-azure-400/30" aria-hidden="true" />
      <div className="aurora left-1/3 top-40 h-80 w-80 bg-pink/20" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-[0.5]" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <span className="eyebrow">
              <span className="inline-block h-1.5 w-1.5 rounded-full grad-brand" />
              Creative digital marketing agency
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
              Ideas that make your brand{" "}
              <span className="grad-text-aurora">click.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
              We turn attention into growth with scroll-stopping{" "}
              <strong className="font-semibold text-ink">video animation</strong>,{" "}
              <strong className="font-semibold text-ink">graphic design</strong>,{" "}
              <strong className="font-semibold text-ink">creative marketing</strong> and{" "}
              <strong className="font-semibold text-ink">influencer</strong> campaigns —
              all built to be felt, and tuned to perform.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/work" className="btn-ghost">
                <span className="grid h-6 w-6 place-items-center rounded-full grad-brand text-white">
                  <Play className="h-3 w-3 fill-white" />
                </span>
                See our work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-ink">4.9/5 client rating</span>
              </div>
              <div className="h-8 w-px bg-ink/10" />
              <div className="text-sm text-ink-muted">
                <span className="font-bold text-ink">250+</span> brands · <span className="font-bold text-ink">1,200+</span> projects
              </div>
            </div>
          </Reveal>
        </div>

        {/* Visual collage */}
        <Reveal delay={200} className="relative hidden h-[30rem] lg:block">
          {/* central gradient panel */}
          <div className="absolute inset-6 rounded-[2rem] grad-brand opacity-90 shadow-glow" />
          <div className="absolute inset-6 rounded-[2rem] grid-lines opacity-30" aria-hidden="true" />
          <div className="absolute inset-6 flex items-center justify-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/95 shadow-lift">
              <Play className="h-7 w-7 translate-x-0.5 fill-brand-600 text-brand-600" />
            </div>
          </div>

          {/* Video views card */}
          <FloatCard className="left-0 top-4 w-52" delay={0} rotate="rotate-[-4deg]">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
              <span className="grid h-6 w-6 place-items-center rounded-md grad-brand text-white">
                <Play className="h-3 w-3 fill-white" />
              </span>
              Video Animation
            </div>
            <div className="mt-3 flex items-end gap-1">
              {[10, 18, 12, 24, 16, 28, 20, 30, 22].map((h, i) => (
                <span key={i} className="w-2 rounded-full grad-brand" style={{ height: h }} />
              ))}
            </div>
            <p className="mt-3 font-display text-lg font-extrabold text-ink">2.4M views</p>
          </FloatCard>

          {/* Conversion card */}
          <FloatCard className="right-0 top-24 w-48" delay={1.4} rotate="rotate-[5deg]">
            <p className="text-xs font-semibold text-ink-muted">Campaign ROAS</p>
            <p className="mt-1 font-display text-3xl font-extrabold grad-text">3.1x</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" /> +38% conversions
            </div>
          </FloatCard>

          {/* Palette card */}
          <FloatCard className="bottom-16 left-2 w-44" delay={0.7} rotate="rotate-[3deg]">
            <p className="text-xs font-semibold text-ink-muted">Brand system</p>
            <div className="mt-2 flex gap-1.5">
              {["bg-brand-500", "bg-azure-500", "bg-pink", "bg-coral", "bg-ink"].map((c) => (
                <span key={c} className={`h-7 w-7 rounded-lg ${c}`} />
              ))}
            </div>
          </FloatCard>

          {/* Creators card */}
          <FloatCard className="bottom-2 right-4 w-52" delay={2} rotate="rotate-[-3deg]">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {["grad-brand", "grad-aurora", "bg-azure-500", "bg-coral"].map((c, i) => (
                  <span key={i} className={`h-7 w-7 rounded-full ring-2 ring-white ${c}`} />
                ))}
              </div>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-2.5 text-sm font-bold text-ink">48 creators matched</p>
            <p className="text-xs text-ink-muted">9.2M authentic reach</p>
          </FloatCard>
        </Reveal>
      </div>
    </section>
  );
}
