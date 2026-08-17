import Icon from "../visuals/Icon";
import Poster from "../visuals/Poster";
import { Reveal } from "../ui/motion";
import { Button, Eyebrow } from "../ui/primitives";
import { about } from "../../lib/data";

export default function AboutIntro() {
  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <Reveal className="relative order-last lg:order-first">
            <Poster
              palette={["#c8f94e", "#5eead4"]}
              seed="about-intro"
              className="aspect-[4/3] w-full"
            />
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 w-52 rounded-3xl border border-line bg-ink-800/95 p-5 shadow-soft backdrop-blur-xl sm:-right-6">
              <div className="font-display text-4xl font-extrabold text-brand">480+</div>
              <div className="mt-1 text-sm text-muted">Projects delivered since 2016</div>
            </div>
            {/* Badge */}
            <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-full border border-line bg-ink-800/95 px-4 py-2.5 shadow-soft backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
              <span className="text-sm font-semibold text-cream">Senior team, no hand-offs</span>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>{about.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-3xl font-bold balance sm:text-4xl md:text-[2.85rem] md:leading-[1.05]">
                {about.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-muted">{about.lead}</p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {about.values.slice(0, 4).map((v, i) => (
                <Reveal key={v.title} delay={0.12 + i * 0.06} className="flex gap-3">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
                    <Icon name={v.icon} size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-cream">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-9">
              <Button href="/about" variant="ghost" icon="up-right">
                More about us
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
