import { Star } from "lucide-react";
import { Marquee } from "../ui/primitives";

export default function MarqueeStrip({ words = [], tone = "brand" }) {
  const bg = tone === "brand" ? "bg-brand text-ink-900" : "bg-ink-800 text-cream";
  return (
    <section className={`${bg} py-5 md:py-7`} aria-hidden="true">
      <Marquee durationSeconds={24} pauseOnHover={false} itemClassName="mx-0">
        {words.map((w, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="font-display text-2xl font-extrabold tracking-tight md:text-4xl">{w}</span>
            <Star size={20} fill="currentColor" strokeWidth={0} className="opacity-70" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
