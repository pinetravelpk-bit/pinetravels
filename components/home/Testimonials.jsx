import { Star, Quote } from "lucide-react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { testimonials } from "../../lib/site";

const AV = ["grad-brand", "grad-aurora", "bg-azure-500", "bg-coral"];

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="aurora -left-20 top-1/3 h-80 w-80 bg-brand-300/30" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead
          eyebrow="Kind words"
          title="Brands don't just like us —"
          accent="they stay."
          lead="A 98% retention rate says more than any pitch. Here's what partners say after the results land."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 90}>
              <figure className="card flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-brand-200" />
                </div>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-ink/5 pt-5">
                  <span className={`grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold text-white ${AV[i % AV.length]}`}>
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
