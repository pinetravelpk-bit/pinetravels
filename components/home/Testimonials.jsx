"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "../../lib/site";

const AV = ["grad-brand", "grad-aurora", "bg-azure-500", "bg-coral"];
const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const n = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
      <div className="aurora right-0 top-1/4 h-80 w-80 bg-brand-300/25" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        {/* Left: circular avatar cluster */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          {/* orbit rings */}
          <div className="absolute inset-6 rounded-full border border-dashed border-brand-300/50" aria-hidden="true" />
          <div className="absolute inset-20 rounded-full border border-dashed border-azure-300/50" aria-hidden="true" />
          {/* center */}
          <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full grad-brand text-white shadow-glow">
            <Quote className="h-10 w-10" />
          </div>

          {testimonials.map((item, i) => {
            const angle = (-90 + i * (360 / n)) * (Math.PI / 180);
            const R = 40; // percent radius
            const x = 50 + R * Math.cos(angle);
            const y = 50 + R * Math.sin(angle);
            const isActive = i === active;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show review from ${item.name}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full font-display font-bold text-white ring-4 transition-all duration-300 ${AV[i % AV.length]} ${
                  isActive ? "z-10 h-20 w-20 text-xl ring-white shadow-lift" : "h-14 w-14 text-sm ring-white/70 opacity-80 hover:opacity-100"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {initials(item.name)}
              </button>
            );
          })}
        </div>

        {/* Right: heading + rotating card */}
        <div>
          <span className="tagline">Testimonials</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-[42px]">
            What our clients <span className="grad-text">say</span>
          </h2>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink-muted">
            A 98% retention rate says more than any pitch. Here's what partners tell us after the results land.
          </p>

          <figure className="mt-8 rounded-3xl bg-white p-8 shadow-lift ring-1 ring-brand-900/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`grid h-14 w-14 place-items-center rounded-full font-display text-base font-bold text-white ${AV[active % AV.length]}`}>
                  {initials(t.name)}
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.role}</p>
                  <div className="mt-1 flex gap-0.5">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <Quote className="h-10 w-10 shrink-0 text-brand-200" />
            </div>
            <blockquote className="mt-5 text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
          </figure>

          {/* controls */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + n) % n)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-200 text-brand-600 transition-all hover:border-transparent hover:bg-brand-600 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % n)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-brand-200 text-brand-600 transition-all hover:border-transparent hover:bg-brand-600 hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="ml-2 flex gap-1.5">
              {testimonials.map((_, i) => (
                <span key={i} className={`h-2 rounded-full transition-all ${i === active ? "w-6 grad-brand" : "w-2 bg-brand-200"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
