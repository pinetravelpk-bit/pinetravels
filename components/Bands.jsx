"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Compass, BadgePercent, PiggyBank, ShieldCheck, Check, Quote as QuoteIcon,
  ArrowRight, MessageCircle, Mail, Phone, Sparkles,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CardScene, PineMark } from "./Scenery";
import { whyUs, quote, customize, partners, counters, site } from "../lib/data";

const ICONS = { Compass, BadgePercent, PiggyBank, ShieldCheck };

export function WhyUs() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead center eyebrow="Why Pine Travel" title={whyUs.title} intro={whyUs.intro} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.features.map((f, i) => {
            const Icon = ICONS[f.icon] || Compass;
            return (
              <Reveal key={f.title} delay={(i % 4) * 80}>
                <article className="group h-full rounded-2xl border border-pine-600/10 grad-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="grid h-13 w-13 h-[52px] w-[52px] place-items-center rounded-xl bg-gradient-to-br from-pine-50 to-mist text-pine-700 transition-all group-hover:grad-pine group-hover:text-cream">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{f.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-10">
          <div className="grad-maroon relative overflow-hidden rounded-2xl px-7 py-7 text-cream shadow-lift sm:px-10">
            <div className="contour absolute inset-0 opacity-60" />
            <div className="relative flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream/15">
                  <Sparkles className="h-5 w-5" />
                </span>
                <p className="font-display text-xl font-extrabold sm:text-2xl">{whyUs.banner.text}</p>
              </div>
              <Link href={whyUs.banner.href} className="btn-light shrink-0">
                {whyUs.banner.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function QuoteBanner() {
  return (
    <section className="grad-pine relative overflow-hidden py-20 text-cream sm:py-24">
      <div className="contour absolute inset-0" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <span className="eyebrow text-pine-200"><PineMark className="h-3.5 w-3.5 text-pine-200" /> {quote.kicker}</span>
          <QuoteIcon className="mt-5 h-10 w-10 text-pine-300/60" />
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-[42px]">{quote.text}</h2>
          <div className="mt-7 flex items-center gap-3">
            <span className="grad-gold grid h-12 w-12 place-items-center rounded-full font-display text-lg font-extrabold text-pine-900">P</span>
            <span>
              <span className="block font-display text-[15px] font-bold text-cream">{quote.author}</span>
              <span className="block text-[13px] text-cream/65">{quote.role}</span>
            </span>
          </div>
          <Link href={quote.href} className="btn-gold mt-8">{quote.cta} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/15">
            <CardScene tone="deep" className="h-[340px] w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CustomizePackage() {
  const [picked, setPicked] = useState([customize.cities[0]]);
  const toggle = (c) => setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const send = () => {
    const text =
      "Assalam-o-Alaikum Pine Travel!\n\nI'd like a customized package.\nPlaces: " +
      (picked.length ? picked.join(", ") : "Not decided yet") +
      "\n\nPlease help me plan this trip.";
    window.open(site.whatsappHref + "?text=" + encodeURIComponent(text), "_blank");
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <span className="eyebrow"><PineMark className="h-3.5 w-3.5 text-pine-600" /> Build your own</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-[38px]">{customize.title}</h2>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-soft">{customize.intro}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {customize.cities.map((c) => {
              const on = picked.includes(c);
              return (
                <button key={c} onClick={() => toggle(c)}
                  className={"rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 " +
                    (on ? "grad-pine text-cream shadow-card" : "border border-pine-600/20 text-ink-soft hover:border-pine-600/50 hover:bg-pine-50")}>
                  {c}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={send} className="btn-primary">Search Now <ArrowRight className="h-4 w-4" /></button>
            <span className="text-[13.5px] text-ink-faint">
              {picked.length ? picked.length + " selected" : "Pick one or more places"}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grad-card rounded-2xl border border-pine-600/10 p-7 shadow-card">
            <ul className="space-y-5">
              {customize.points.map((p, i) => (
                <li key={p} className="flex items-start gap-4">
                  <span className="grad-pine grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-[14px] font-extrabold text-cream">
                    {i + 1}
                  </span>
                  <span className="pt-2 font-display text-[16px] font-bold text-ink">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 overflow-hidden rounded-xl">
              <CardScene tone="pine" className="h-40 w-full" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-pine-600/10 pt-5">
              <span className="font-display text-[15px] font-bold text-ink">{customize.guideLine}</span>
              <Link href="/contact" className="btn-ghost px-5 py-2 text-[13px]">Contact Now</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Partners() {
  const row = [...partners, ...partners];
  return (
    <section className="grad-pine-soft border-y border-pine-600/10 py-12">
      <div className="container-x">
        <p className="text-center font-display text-[13px] font-bold uppercase tracking-eyebrow text-ink-faint">
          Companies you can easily trust
        </p>
      </div>
      <div className="marquee-wrap mt-7 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-4">
          {row.map((p, i) => (
            <span key={p + i}
              className="grad-card flex h-16 min-w-[190px] items-center justify-center rounded-xl border border-pine-600/10 px-7 font-display text-[15px] font-bold text-ink-soft shadow-card">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Counters() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="grad-pine relative overflow-hidden py-16 text-cream">
      <div className="contour absolute inset-0" />
      <div className="container-x relative grid grid-cols-2 gap-8 md:grid-cols-4">
        {counters.map((c, i) => (
          <div key={c.label} className="text-center">
            <div className="font-display text-4xl font-extrabold sm:text-5xl">
              <CountUp to={c.value} run={on} delay={i * 120} />
              <span className="text-pine-200">{c.suffix}</span>
            </div>
            <div className="mt-2 text-[12.5px] uppercase tracking-widest text-cream/70">{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountUp({ to, run, delay = 0 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const timer = setTimeout(() => {
      const step = (t) => {
        if (!start) start = t;
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); if (raf) cancelAnimationFrame(raf); };
  }, [run, to, delay]);
  return <>{n}</>;
}

export function InquiryBand() {
  const items = [
    { Icon: MessageCircle, label: "WhatsApp", value: site.whatsapp, href: site.whatsappHref },
    { Icon: Mail, label: "Mail us", value: site.email, href: "mailto:" + site.email },
    { Icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
  ];
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="grad-card rounded-2xl border border-pine-600/10 p-7 shadow-card sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="eyebrow"><PineMark className="h-3.5 w-3.5 text-pine-600" /> For more inquiry</span>
                <h2 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                  Don&rsquo;t hesitate — call Pine Travel.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {items.map(({ Icon, label, value, href }) => (
                  <a key={label} href={href}
                    className="flex items-center gap-3 rounded-xl border border-pine-600/10 bg-gradient-to-br from-pine-50/60 to-mist/60 p-4 transition-all hover:-translate-y-0.5 hover:shadow-card">
                    <span className="grad-pine grid h-11 w-11 shrink-0 place-items-center rounded-lg text-cream">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wider text-ink-faint">{label}</span>
                      <span className="block truncate font-display text-[14px] font-bold text-ink">{value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
