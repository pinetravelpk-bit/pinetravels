"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MessageCircle } from "lucide-react";
import Reveal from "../Reveal";
import { faqs as defaultFaqs } from "../../lib/site";

export default function FAQ({ items = defaultFaqs, eyebrow = "FAQ", title = "Questions,", accent = "answered." }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {title} <span className="grad-text">{accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-ink-muted">
              Can't find what you're looking for? We're happy to talk it through — no pressure, no jargon.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Link href="/contact" className="btn-primary w-fit">
              <MessageCircle className="h-4 w-4" /> Ask us anything
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? "border-brand-200 bg-white shadow-card" : "border-ink/8 bg-white/60"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-bold text-ink sm:text-lg">{f.q}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "grad-brand text-white rotate-45" : "bg-cloud text-ink-muted"}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-ink-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
