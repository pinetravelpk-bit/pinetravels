"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Star } from "lucide-react";
import HeroGraphic from "../visuals/HeroGraphic";
import { Counter, Magnetic } from "../ui/motion";
import { hero } from "../../lib/data";

const EASE = [0.22, 1, 0.36, 1];

function Line({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-0 mesh" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[70%] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1.5 pl-1.5 pr-4"
            >
              <span className="flex items-center gap-0.5 rounded-full bg-brand/15 px-2 py-1 text-brand">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span className="text-xs font-medium text-cream/80">Rated 4.9/5 by 120+ brands</span>
            </motion.div>

            <h1 className="font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-[4.4rem]">
              <Line delay={0.15}>We turn</Line>
              <Line delay={0.28}>
                <span className="relative gradient-text">
                  clicks
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M2 8 C 50 2, 150 2, 198 7"
                      stroke="#c8f94e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 1, ease: EASE }}
                    />
                  </svg>
                </span>{" "}
                into
              </Line>
              <Line delay={0.41}>compounding growth</Line>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82 }}
              className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <Link href={hero.ctaPrimary.href} className="btn-primary">
                  {hero.ctaPrimary.label}
                  <ArrowUpRight size={17} strokeWidth={2.25} />
                </Link>
              </Magnetic>
              <Link href={hero.ctaSecondary.href} className="btn-ghost group">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-ink-900">
                  <Play size={11} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                </span>
                {hero.ctaSecondary.label}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-8"
            >
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-extrabold text-cream md:text-4xl">
                    <Counter value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted md:text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="relative"
          >
            <HeroGraphic />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
