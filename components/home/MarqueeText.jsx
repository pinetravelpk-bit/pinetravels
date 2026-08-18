import Marquee from "../Marquee";

const WORDS = [
  "Video Animation",
  "Graphic Design",
  "Creative Marketing",
  "Influencer Marketing",
  "Social Media",
  "Web & SEO",
];

function Row({ reverse = false, filled = false }) {
  return (
    <Marquee speed="fast" reverse={reverse}>
      <div className="flex items-center gap-8 pr-8">
        {WORDS.map((w) => (
          <span key={w} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={
                filled
                  ? "font-display text-4xl font-extrabold text-white sm:text-5xl"
                  : "font-display text-4xl font-extrabold text-transparent sm:text-5xl [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]"
              }
            >
              {w}
            </span>
            <span className="text-2xl text-azure-300">✦</span>
          </span>
        ))}
      </div>
    </Marquee>
  );
}

export default function MarqueeText() {
  return (
    <section className="relative overflow-hidden grad-ink py-12">
      <div className="aurora left-1/4 top-0 h-40 w-96 bg-brand-500/30" aria-hidden="true" />
      <div className="relative flex flex-col gap-3">
        <Row filled />
        <Row reverse />
      </div>
    </section>
  );
}
