import PageHero from "../../components/PageHero";
import Poster from "../../components/visuals/Poster";
import Icon from "../../components/visuals/Icon";
import Stats from "../../components/sections/Stats";
import TeamGrid from "../../components/sections/TeamGrid";
import Testimonials from "../../components/sections/Testimonials";
import ProcessSteps from "../../components/sections/ProcessSteps";
import CTA from "../../components/CTA";
import { Reveal, Stagger, StaggerItem } from "../../components/ui/motion";
import { SectionHeading } from "../../components/ui/primitives";
import { about } from "../../lib/data";

export const metadata = {
  title: "About",
  description:
    "InventiveClicks is a senior team of strategists, marketers, designers and analysts obsessed with your growth. Meet the agency.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="Who we are"
        title={
          <>
            A growth partner that acts like <span className="gradient-text">part of your team</span>
          </>
        }
        description={about.lead}
      />

      {/* Story */}
      <section className="section pt-4">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <Poster palette={["#a78bfa", "#c8f94e"]} seed="about-story" className="aspect-[4/3] w-full" />
            <div className="absolute -bottom-6 -left-4 w-48 rounded-3xl border border-line bg-ink-800/95 p-5 shadow-soft backdrop-blur-xl sm:-left-6">
              <div className="font-display text-4xl font-extrabold text-brand">96%</div>
              <div className="mt-1 text-sm text-muted">Client retention rate</div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow={about.eyebrow} title="Built to be measured on your results" />
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className="mt-5 leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section pt-0">
        <div className="container">
          <SectionHeading
            className="mb-12"
            align="center"
            eyebrow="What we stand for"
            title="Principles we don't compromise on"
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <StaggerItem key={v.title} className="card card-hover p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand/30 bg-brand/10 text-brand">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-cream">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Stats />

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <SectionHeading
            className="mb-14"
            align="center"
            eyebrow="Our journey"
            title="A decade of compounding"
          />
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block" />
            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {about.milestones.map((m) => (
                <StaggerItem key={m.year} className="relative">
                  <span className="relative z-10 inline-grid h-12 w-12 place-items-center rounded-full border border-brand/40 bg-ink-800 font-display text-sm font-bold text-brand">
                    ●
                  </span>
                  <div className="mt-5 font-display text-2xl font-extrabold text-cream">{m.year}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <ProcessSteps />
      <TeamGrid limit={4} footer />
      <Testimonials />
      <CTA />
    </>
  );
}
