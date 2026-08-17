import PageHero from "../../components/PageHero";
import ContactForm from "../../components/ContactForm";
import Icon from "../../components/visuals/Icon";
import FaqAccordion from "../../components/sections/FaqAccordion";
import { Reveal } from "../../components/ui/motion";
import { site } from "../../lib/data";

export const metadata = {
  title: "Contact",
  description:
    "Tell InventiveClicks about your goals and we'll show you the fastest, most profitable way to get there. Start a project today.",
};

const details = [
  { icon: "Mail", label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { icon: "Phone", label: "Call us", value: site.phone, href: site.phoneHref },
  { icon: "MapPin", label: "Visit us", value: site.address },
  { icon: "Clock", label: "Office hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start something <span className="gradient-text">worth clicking</span>
          </>
        }
        description="Tell us where you want to go. We'll come back with a clear, no-nonsense view of how to get there — usually within one business day."
      />

      <section className="section pt-4">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Info */}
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold sm:text-3xl">Talk to a strategist</h2>
              <p className="mt-3 leading-relaxed text-muted">
                No junior gatekeepers — you&apos;ll speak with someone who actually does the work. Prefer email or
                phone? Reach us directly below.
              </p>
            </Reveal>

            <div className="mt-8 space-y-3">
              {details.map((d, i) => {
                const Inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-brand/40">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                      <Icon name={d.icon} size={19} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-faint">{d.label}</div>
                      <div className="font-medium text-cream">{d.value}</div>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={d.label} delay={0.05 + i * 0.05}>
                    {d.href ? <a href={d.href}>{Inner}</a> : Inner}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.3} className="mt-8">
              <div className="flex gap-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.02] text-sm font-semibold text-cream/80 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <FaqAccordion />
    </>
  );
}
