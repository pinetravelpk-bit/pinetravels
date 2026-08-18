import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { process } from "../../lib/site";

export default function Process() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="How we work"
          title="A clear path from idea to"
          accent="impact."
          lead="No mystery, no bloated decks. A simple, repeatable process built to keep momentum and prove results."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line on desktop */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand-200 via-azure-300 to-brand-200 lg:block" aria-hidden="true" />

          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 90} className="relative flex flex-col gap-4">
              <div className="relative flex items-center gap-4">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl grad-brand font-display text-lg font-extrabold text-white shadow-glow">
                  {p.step}
                </span>
                <span className="h-px flex-1 bg-ink/10 lg:hidden" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
