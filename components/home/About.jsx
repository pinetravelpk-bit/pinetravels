"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, Star, Check } from "lucide-react";
import { stats } from "../../lib/site";

const bars = [
  { label: "Creative campaigns", value: 94 },
  { label: "Client retention", value: 98 },
];

function ProgressBar({ label, value, inView, delay = 0 }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-ink">{label}</span>
        <span className="font-display text-lg font-extrabold grad-text">{value}%</span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-brand-100">
        <div
          className="h-full rounded-full grad-brand transition-[width] duration-[1200ms] ease-out"
          style={{ width: inView ? `${value}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div className="aurora left-1/4 top-10 h-72 w-96 bg-brand-300/30" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        {/* Left: copy + progress */}
        <div className="reveal is-visible flex flex-col gap-6">
          <span className="tagline">About Us</span>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-[42px]">
            We're a strategic <span className="grad-text">creative marketing</span> agency
          </h2>
          <p className="text-lg leading-relaxed text-ink-muted">
            To scale customer acquisition and retention for modern brands, we work across the entire
            journey — video, design, campaigns and creators — with a track record of helping brands grow.
          </p>

          <div className="mt-2 grid gap-6 rounded-2xl border border-line bg-white/60 p-6 sm:grid-cols-2">
            {bars.map((b, i) => (
              <ProgressBar key={b.label} {...b} inView={inView} delay={i * 200} />
            ))}
          </div>

          <div>
            <Link href="/about" className="btn-primary mt-1 w-fit">
              About us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right: original social-proof visual */}
        <div className="reveal is-visible relative mx-auto w-full max-w-md">
          {/* organic blob backdrop */}
          <div className="absolute inset-0 grad-brand opacity-90 blur-[2px]" style={{ borderRadius: "42% 58% 46% 54% / 52% 44% 56% 48%" }} aria-hidden="true" />
          <div className="absolute inset-0 grid-lines opacity-20" style={{ borderRadius: "42% 58% 46% 54% / 52% 44% 56% 48%" }} aria-hidden="true" />

          <div className="relative flex aspect-square items-center justify-center p-8">
            {/* central glass panel */}
            <div className="w-full max-w-[15rem] rounded-3xl bg-white/95 p-6 shadow-lift backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl grad-aurora text-white">
                  <Star className="h-6 w-6 fill-white" />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold leading-none text-ink">4.9/5</p>
                  <p className="text-xs text-ink-muted">from 600+ reviews</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="font-semibold text-ink">{s.value}</span>
                    <span className="text-ink-muted">{s.label.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* floating like badge */}
            <div className="absolute left-2 top-6 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-lift animate-floaty">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-coral text-white">
                <Heart className="h-3.5 w-3.5 fill-white" />
              </span>
              <span className="font-display text-sm font-extrabold text-ink">999</span>
            </div>

            {/* floating happy-clients pill */}
            <div className="absolute bottom-6 right-0 flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-lift animate-floaty" style={{ animationDelay: "1.2s" }}>
              <div className="flex -space-x-2">
                {["grad-brand", "grad-aurora", "bg-azure-500", "bg-coral"].map((c, i) => (
                  <span key={i} className={`h-6 w-6 rounded-full ring-2 ring-white ${c}`} />
                ))}
              </div>
              <span className="font-display text-sm font-bold text-ink">1.5k Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
