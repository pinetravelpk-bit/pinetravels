import { PineRidge, PineMark } from "./Scenery";

export default function PageBanner({ eyebrow, title, intro }) {
  return (
    <section className="relative overflow-hidden grad-pine pb-24 pt-16 text-cream sm:pt-20">
      <div className="contour absolute inset-0" />
      <div className="container-x relative text-center">
        {eyebrow && (
          <span className="eyebrow justify-center text-pine-200">
            <PineMark className="h-3.5 w-3.5 text-pine-200" />
            {eyebrow}
          </span>
        )}
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-cream/80">{intro}</p>}
      </div>
      <PineRidge className="absolute bottom-0 left-0 h-8 w-full" color="#f7f4ec" />
    </section>
  );
}
