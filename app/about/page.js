import PageBanner from "../../components/PageBanner";
import Reveal from "../../components/Reveal";
import SectionHead from "../../components/SectionHead";
import CTA from "../../components/CTA";
import { CardScene, PineMark } from "../../components/Scenery";
import { stats } from "../../lib/data";
import { Check } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Pine Travel is a Rawalpindi-based travel company specialising in tours, weddings and travel services across Northern Pakistan.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Honest pricing", body: "The quote you approve is the price you pay. No inflated hotel rates, no surprise add-ons on the road." },
  { title: "Local knowledge", body: "Our team and guides are from the north. We know which road is open, which view is worth the detour and where to eat." },
  { title: "Safety first", body: "Maintained vehicles, experienced drivers and realistic driving days — especially when families and elders travel." },
  { title: "One point of contact", body: "From first message to the last transfer home, one person owns your trip so nothing falls through the cracks." },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="About Pine Travel"
        title="Rooted in the north, built for travellers"
        intro="We started Pine Travel to make the mountains of Pakistan easy to reach — without the guesswork, the haggling or the last-minute stress."
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow"><PineMark className="h-3.5 w-3.5 text-pine-600" /> Our story</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-[38px]">
              From weekend trips to a full travel company
            </h2>
            <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
              <p>
                Pine Travel began with a simple habit — driving friends and family up to Hunza, Naran
                and Swat, and doing it well. Word spread, groups grew, and what started as a passion
                for the north turned into a company based in Rawalpindi.
              </p>
              <p>
                Today we plan tours, host destination weddings and run the logistics behind
                conferences and corporate retreats. The mission hasn&apos;t changed: take care of every
                detail so our travellers can simply enjoy the mountains.
              </p>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Licensed & registered", "Vetted hotels & drivers", "24/7 on-trip support", "Custom & fixed departures"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14.5px] text-ink">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-pine-600 text-cream"><Check className="h-3 w-3" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <CardScene tone="pine" className="h-[420px] w-full" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-pine-600/10 grad-card p-5 shadow-lift sm:block">
              <div className="font-display text-3xl font-extrabold text-pine-700">12+ yrs</div>
              <div className="text-[12px] uppercase tracking-widest text-ink-faint">In the mountains</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grad-pine-soft py-20 sm:py-24">
        <div className="container-x">
          <SectionHead center eyebrow="What we stand for" title="The way we work" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 80}>
                <div className="h-full rounded-2xl border border-pine-600/10 grad-card p-6 shadow-card">
                  <h3 className="font-display text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-2 gap-8 rounded-2xl grad-pine py-12 text-cream md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-extrabold">{s.value}</div>
                <div className="mt-2 text-[12px] uppercase tracking-widest text-cream/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
