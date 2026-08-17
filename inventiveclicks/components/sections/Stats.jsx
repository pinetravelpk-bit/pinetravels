import { Counter, Stagger, StaggerItem } from "../ui/motion";
import { counters as defaultCounters } from "../../lib/data";

export default function Stats({ items = defaultCounters, className = "" }) {
  return (
    <section className={`section-tight ${className}`}>
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-800/60 px-6 py-12 md:px-12">
          <div className="pointer-events-none absolute inset-0 mesh opacity-70" />
          <Stagger className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {items.map((c) => (
              <StaggerItem key={c.label} className="text-center md:text-left">
                <div className="font-display text-4xl font-extrabold text-cream md:text-5xl">
                  <Counter
                    value={c.value}
                    decimals={c.decimals || 0}
                    prefix={c.prefix || ""}
                    suffix={c.suffix || ""}
                  />
                </div>
                <div className="mt-2 text-sm text-muted">{c.label}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
