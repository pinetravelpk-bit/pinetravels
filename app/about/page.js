import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icons";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import { stats, whyUs, site } from "../../lib/site";
import { JsonLd, breadcrumbSchema, webPageSchema } from "../../lib/seo";

export const metadata = {
  title: "About — One creative team, every channel",
  description:
    "InventiveClicks is a remote-first creative digital marketing agency founded in 2019. Meet the team behind the video, design, campaigns and creators that make brands click.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  "Creativity should carry a number.",
  "Speed is a feature, not a compromise.",
  "One team beats five vendors.",
  "Clarity builds trust — always.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/about", name: "About InventiveClicks", description: metadata.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <PageHero
        eyebrow="About us"
        title="We're the creative team behind the brands that"
        accent="click."
        lead="Founded in 2019, InventiveClicks brings strategy, motion, design, influence and web under one roof — so ambitious brands get big ideas that actually perform."
        crumbs={[{ name: "About" }]}
      />

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 flex flex-col gap-5 lg:order-1">
            <span className="eyebrow w-fit">Our story</span>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Started by makers tired of the <span className="grad-text">handoff.</span>
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              InventiveClicks began with a simple frustration: great campaigns kept dying in the gaps
              between agencies. The video team didn't talk to the designers; the designers never met
              the media buyers; the creators were an afterthought.
            </p>
            <p className="leading-relaxed text-ink-muted">
              So we built the opposite — one integrated studio where animators, designers, strategists,
              creator managers and developers sit together and ship together. Six years and 1,200+
              projects later, that's still the whole idea: remove the handoffs, and the work gets
              better, faster and far more accountable.
            </p>
            <ul className="mt-2 grid gap-3 sm:grid-cols-2">
              {beliefs.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] font-semibold text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full grad-brand text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl3 grad-brand p-8 shadow-lift">
              <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
              <div className="aurora -bottom-10 -right-10 h-56 w-56 bg-azure-400/50" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between text-white">
                <p className="max-w-[16rem] font-display text-2xl font-bold leading-snug">
                  “We don't hand off. We build the whole thing, together.”
                </p>
                <div>
                  <div className="flex -space-x-2">
                    {["bg-white/90", "bg-azure-300", "bg-pink", "bg-coral", "bg-white/70"].map((c, i) => (
                      <span key={i} className={`h-10 w-10 rounded-full ring-2 ring-brand-600 ${c}`} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-white/80">A 40-person creative team across 9 time zones.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative overflow-hidden grad-ink py-16">
        <div className="aurora -left-16 top-0 h-72 w-72 bg-brand-500/40" aria-hidden="true" />
        <div className="aurora right-0 bottom-0 h-64 w-64 bg-azure-500/30" aria-hidden="true" />
        <div className="container-x relative grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-brand-100/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="How we operate"
            title="The principles behind every"
            accent="click."
            lead="Not wall art — the actual rules we work by, on every project, for every client."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="card card-hover h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl grad-brand text-white shadow-glow">
                    <Icon name={w.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <Link href="/contact" className="btn-primary">
              Work with us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
