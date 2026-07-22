import { Star, Check, Tag } from "lucide-react";
import Reveal from "../Reveal";
import SectionHead from "../SectionHead";
import { CardScene, PineMark } from "../Scenery";
import HotelIcon from "./HotelIcon";
import { priceFrom, formatPKR } from "../../lib/hotels";

export function HotelAbout({ hotel }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow"><PineMark className="h-3.5 w-3.5 text-pine-600" /> About this hotel</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-[38px]">{hotel.tagline}</h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">{hotel.about}</p>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {[
              { k: "Location", v: hotel.location },
              { k: "Rating", v: `${hotel.rating} / 5` },
              { k: "From", v: `${formatPKR(priceFrom(hotel))}/night` },
            ].map((f) => (
              <div key={f.k} className="rounded-xl border border-pine-600/10 grad-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-ink-faint">{f.k}</div>
                <div className="mt-1 font-display text-[15px] font-bold text-ink">{f.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl shadow-lift">
            <CardScene tone={hotel.tone} className="h-[420px] w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HotelFacilities({ hotel }) {
  return (
    <section className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Facilities" title="Everything you need on-site" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {hotel.facilities.map((f, i) => (
            <Reveal key={f.label} delay={(i % 4) * 70}>
              <div className="flex items-center gap-3 rounded-2xl border border-pine-600/10 grad-card p-4 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pine-50 text-pine-700">
                  <HotelIcon name={f.icon} className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-medium text-ink">{f.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HotelExperience({ hotel }) {
  return (
    <section className="relative overflow-hidden grad-pine py-20 text-cream sm:py-24">
      <div className="contour absolute inset-0" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow text-pine-200"><PineMark className="h-3.5 w-3.5 text-pine-200" /> Experience luxury</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-[40px]">{hotel.experience.title}</h2>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-cream/80">{hotel.experience.body}</p>
          <ul className="mt-7 space-y-3">
            {hotel.experience.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[15px] text-cream/90">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cream/15"><Check className="h-3 w-3" /></span>
                {p}
              </li>
            ))}
          </ul>
          <a href="#booking" className="btn-light mt-8">Check availability</a>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/15">
            <CardScene tone="deep" className="h-[380px] w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HotelFeatures({ hotel }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Why stay here" title="Special features & facilities" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hotel.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80}>
              <article className="h-full rounded-2xl border border-pine-600/10 grad-card p-6 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                  <HotelIcon name={f.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HotelGallery({ hotel }) {
  return (
    <section className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Gallery" title="A look around the property" intro="Swap these illustrated tiles for your own photos in public/images and update this section." />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {hotel.gallery.map((tone, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
              <div className={`overflow-hidden rounded-2xl shadow-card ${i % 5 === 0 ? "md:col-span-2" : ""}`}>
                <CardScene tone={tone} className="h-52 w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HotelOffer({ hotel }) {
  const o = hotel.offer;
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-maroon-700 p-8 text-cream shadow-lift sm:p-12">
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <span className="eyebrow text-cream/80"><Tag className="h-3.5 w-3.5" /> Special offer</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{o.title}</h2>
                <p className="mt-3 max-w-xl text-[15px] text-cream/85">{o.detail}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-[14px]">
                  Use code <span className="font-display font-extrabold tracking-wider">{o.code}</span>
                </div>
              </div>
              <a href="#booking" className="btn-light whitespace-nowrap">Book &amp; save {o.discountPct}%</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HotelFeedback({ hotel }) {
  return (
    <section className="grad-pine-soft py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Feedback" title="What guests say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {hotel.feedback.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-pine-600/10 grad-card p-7 shadow-card">
                <div className="flex gap-0.5 text-maroon-500">
                  {Array.from({ length: 5 }).map((_, k) => (<Star key={k} className="h-4 w-4 fill-current" />))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-pine-600/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-pine-600 font-display text-base font-bold text-cream">{t.name.charAt(0)}</span>
                  <span>
                    <span className="block font-display text-[15px] font-bold text-ink">{t.name}</span>
                    <span className="block text-[12.5px] text-ink-faint">{t.trip}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
