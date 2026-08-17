import Link from "next/link";
import PageHero from "../../components/PageHero";
import TeamGrid from "../../components/sections/TeamGrid";
import Stats from "../../components/sections/Stats";
import CTA from "../../components/CTA";
import { Reveal } from "../../components/ui/motion";

export const metadata = {
  title: "Our Team",
  description:
    "Meet the senior strategists, media buyers, creatives and analysts behind InventiveClicks — the people who do your work.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
        eyebrow="The people"
        title={
          <>
            Senior operators who <span className="gradient-text">do the work</span>
          </>
        }
        description="No layers, no hand-offs. The experts you meet are the experts on your account — every single day."
      />

      <TeamGrid showHeader={false} />

      <Stats />

      <section className="section pt-0">
        <div className="container">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-800/60 p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 mesh opacity-70" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold sm:text-3xl">We&apos;re always looking for great people</h2>
                <p className="mt-3 text-muted">
                  If you obsess over growth, sweat the craft and want to work with brands you&apos;re proud of, we
                  should talk — even if there&apos;s no role posted.
                </p>
              </div>
              <Link href="/contact" className="btn-primary shrink-0">
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
