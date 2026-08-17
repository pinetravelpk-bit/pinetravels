import { Star, Quote } from "lucide-react";
import Avatar from "../visuals/Avatar";
import { Marquee, SectionHeading } from "../ui/primitives";
import { testimonials as defaultTestimonials } from "../../lib/data";

function initialsOf(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ t }) {
  return (
    <figure className="card flex w-[330px] flex-col p-7 sm:w-[400px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-brand">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <Quote size={30} className="text-white/10" />
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-cream/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <Avatar
          initials={initialsOf(t.name)}
          palette={t.palette}
          seed={t.name}
          rounded="rounded-full"
          className="h-11 w-11 shrink-0"
        />
        <div>
          <div className="text-sm font-semibold text-cream">{t.name}</div>
          <div className="text-xs text-muted">
            {t.role}, {t.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({
  items = defaultTestimonials,
  showHeader = true,
  eyebrow = "Client love",
  title = "Teams that grow with us, stay with us",
  description = "A 96% retention rate isn't luck. It's what happens when an agency is judged on your results.",
}) {
  return (
    <section className="section overflow-hidden">
      {showHeader && (
        <div className="container mb-12">
          <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} className="mx-auto" />
        </div>
      )}
      <div className="flex flex-col gap-5">
        <Marquee durationSeconds={46} itemClassName="mx-2.5">
          {items.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>
        <Marquee durationSeconds={38} reverse itemClassName="mx-2.5">
          {[...items].reverse().map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
