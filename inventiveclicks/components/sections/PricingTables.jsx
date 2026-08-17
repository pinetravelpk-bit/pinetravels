import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Stagger, StaggerItem } from "../ui/motion";
import { SectionHeading } from "../ui/primitives";
import { pricing as defaultPricing } from "../../lib/data";

function PlanCard({ plan }) {
  const popular = plan.popular;
  return (
    <StaggerItem className="h-full">
      <div
        className={`relative flex h-full flex-col rounded-3xl border p-8 ${
          popular
            ? "border-brand/50 bg-gradient-to-b from-brand/[0.08] to-transparent shadow-glow"
            : "border-line bg-ink-800/60"
        }`}
      >
        {popular && (
          <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink-900">
            <Sparkles size={13} /> Most popular
          </span>
        )}
        <h3 className="text-lg font-bold text-cream">{plan.name}</h3>
        <div className="mt-4 flex items-end gap-1">
          <span className="font-display text-4xl font-extrabold text-cream md:text-5xl">{plan.price}</span>
          {plan.period && <span className="mb-1.5 text-sm text-muted">{plan.period}</span>}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{plan.tagline}</p>

        <ul className="mt-7 flex flex-1 flex-col gap-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-cream/85">
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  popular ? "bg-brand text-ink-900" : "bg-white/[0.06] text-brand"
                }`}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`mt-8 w-full ${popular ? "btn-primary" : "btn-ghost"}`}
        >
          {plan.cta}
        </Link>
      </div>
    </StaggerItem>
  );
}

export default function PricingTables({
  items = defaultPricing,
  showHeader = true,
  eyebrow = "Pricing",
  title = "Simple plans that scale with you",
  description = "Transparent monthly engagements. No lock-in, no surprises — just a team focused on your growth.",
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
        <Stagger className="grid items-stretch gap-6 lg:grid-cols-3">
          {items.map((p) => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </Stagger>
        <p className="mt-8 text-center text-sm text-muted">
          Need something custom?{" "}
          <Link href="/contact" className="text-brand underline-offset-4 hover:underline">
            Let&apos;s talk
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
