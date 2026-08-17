import { ChevronRight } from "lucide-react";
import Icon from "../visuals/Icon";
import { Stagger, StaggerItem } from "../ui/motion";
import { SectionHeading } from "../ui/primitives";
import { process as defaultProcess } from "../../lib/data";

export default function ProcessSteps({
  items = defaultProcess,
  showHeader = true,
  eyebrow = "How we work",
  title = "A process built to compound results",
  description = "No mystery, no busywork. A clear path from insight to impact — repeated and refined every month.",
}) {
  return (
    <section className="section">
      <div className="container">
        {showHeader && (
          <SectionHeading
            className="mb-14"
            align="center"
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        )}

        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((step, i) => (
            <StaggerItem key={step.no} className="relative">
              {i < items.length - 1 && (
                <ChevronRight
                  size={26}
                  className="absolute -right-5 top-6 hidden text-white/15 lg:block"
                />
              )}
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink-800 font-display text-lg font-extrabold text-brand">
                  {step.no}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.03] text-cream/80">
                  <Icon name={step.icon} size={20} />
                </span>
              </div>
              <h3 className="text-xl font-bold text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
