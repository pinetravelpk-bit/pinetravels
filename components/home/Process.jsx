import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import Icon from "../Icons";
import { process } from "../../lib/site";

const ICONS = ["target", "spark", "bolt", "share"];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 lg:py-28">
      <div className="aurora left-10 top-1/3 h-64 w-64 bg-brand-300/25" aria-hidden="true" />
      <div className="aurora right-10 bottom-10 h-64 w-72 bg-azure-300/25" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHead
          eyebrow="Work Process"
          title="Our working"
          accent="process."
          lead="A simple, repeatable path from first idea to measured impact — no mystery, no bloat."
        />

        <div className="relative mt-16">
          {/* dashed connector through circle centers (desktop) */}
          <div
            className="absolute inset-x-[12%] top-[9.5rem] hidden border-t-2 border-dashed border-brand-300/60 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((p, i) => {
              const top = i % 2 === 0; // even → text above on desktop, odd → below
              const text = (
                <div className="max-w-[15rem] text-center">
                  <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mx-auto mt-2 text-sm leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              );
              return (
                <Reveal key={p.step} delay={i * 100} className="flex flex-col items-center">
                  {/* top slot (desktop only) */}
                  <div className="hidden h-28 flex-col items-center justify-end pb-5 lg:flex">
                    {top && text}
                  </div>

                  {/* circle + number */}
                  <div className="relative z-10">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-lift ring-1 ring-brand-900/5">
                      <Icon name={ICONS[i]} className="h-8 w-8 text-brand-600" />
                    </span>
                    <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full grad-brand font-display text-sm font-extrabold text-white ring-4 ring-mist">
                      {i + 1}
                    </span>
                  </div>

                  {/* bottom area: always shown on mobile; desktop only for odd steps */}
                  <div className={`mt-5 lg:mt-0 lg:h-28 lg:pt-5 ${top ? "lg:pointer-events-none lg:opacity-0" : "lg:flex lg:flex-col lg:items-center"}`}>
                    {text}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
