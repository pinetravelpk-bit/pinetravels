import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { pricing } from "../../lib/site";

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Engagements"
          title="Simple ways to"
          accent="work together."
          lead="Start with a single project or plug us in as your always-on creative team. Every plan is scoped up front — no surprise invoices."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-xl2 p-8 ${
                  tier.featured
                    ? "grad-ink text-white shadow-lift ring-1 ring-brand-500/40"
                    : "card"
                }`}
              >
                {tier.featured && (
                  <>
                    <div className="aurora -right-10 -top-10 h-48 w-48 bg-brand-500/40" aria-hidden="true" />
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full grad-brand px-3 py-1 text-xs font-bold text-white">
                      <Sparkles className="h-3.5 w-3.5" /> Most popular
                    </span>
                  </>
                )}
                <div className="relative">
                  <h3 className={`font-display text-lg font-bold ${tier.featured ? "text-white" : "text-ink"}`}>
                    {tier.name}
                  </h3>
                  <p className={`mt-1 text-sm ${tier.featured ? "text-brand-100/70" : "text-ink-muted"}`}>
                    {tier.for}
                  </p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className={`font-display text-4xl font-extrabold ${tier.featured ? "text-white" : "text-ink"}`}>
                      {tier.price}
                    </span>
                    {tier.cadence && (
                      <span className={`pb-1 text-sm ${tier.featured ? "text-brand-100/60" : "text-ink-faint"}`}>
                        {tier.cadence}
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            tier.featured ? "bg-white/15 text-brand-200" : "bg-brand-50 text-brand-600"
                          }`}
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span className={tier.featured ? "text-brand-100/85" : "text-ink-muted"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`mt-8 w-full ${tier.featured ? "btn-primary" : "btn-dark"}`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
