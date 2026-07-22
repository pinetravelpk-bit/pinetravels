import Reveal from "./Reveal";
import { PineMark } from "./Scenery";

export default function SectionHead({ eyebrow, title, intro, center, light }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "text-pine-200" : "text-pine-600"} ${center ? "justify-center" : ""}`}>
          <PineMark className={`h-3.5 w-3.5 ${light ? "text-pine-200" : "text-pine-600"}`} />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 font-display text-3xl font-extrabold leading-tight sm:text-[40px] ${light ? "text-cream" : "text-ink"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-[15.5px] leading-relaxed ${light ? "text-cream/75" : "text-ink-soft"}`}>{intro}</p>}
    </Reveal>
  );
}
