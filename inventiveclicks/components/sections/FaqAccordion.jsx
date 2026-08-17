"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs as defaultFaqs } from "../../lib/data";

function Item({ item, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-cream md:text-lg">{item.q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
            open ? "border-brand bg-brand text-ink-900" : "border-line text-cream"
          }`}
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-sm leading-relaxed text-muted md:text-base">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion({
  items = defaultFaqs,
  eyebrow = "FAQ",
  title = "Questions, answered",
  description = "Everything you need to know before we start. Can't find it here? We're one message away.",
}) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <span className="eyebrow mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {eyebrow}
          </span>
          <h2 className="text-3xl font-bold balance sm:text-4xl md:text-[2.6rem] md:leading-[1.05]">{title}</h2>
          <p className="mt-4 text-muted">{description}</p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-brand/50"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand">
              <MessageCircle size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-cream">Still have questions?</span>
              <span className="block text-xs text-muted">Talk to a strategist →</span>
            </span>
          </Link>
        </div>

        <div>
          {items.map((f, i) => (
            <Item key={i} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
