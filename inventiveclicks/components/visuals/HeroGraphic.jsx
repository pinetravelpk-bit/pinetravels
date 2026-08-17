"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Sparkles } from "lucide-react";

const float = (delay = 0, dist = 12) => ({
  animate: { y: [0, -dist, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
});

export default function HeroGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Ambient blobs */}
      <div className="absolute -left-6 top-6 h-56 w-56 rounded-full bg-brand/25 blur-3xl animate-floaty" />
      <div className="absolute bottom-4 right-0 h-52 w-52 rounded-full bg-violet/25 blur-3xl animate-floaty [animation-delay:1.5s]" />

      {/* Orbit ring */}
      <div className="absolute inset-6 rounded-full border border-white/10 animate-spin-slow">
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand shadow-glow" />
        <span className="absolute bottom-6 right-2 h-2 w-2 rounded-full bg-cyan" />
      </div>

      {/* Main dashboard card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line bg-ink-800/80 p-5 shadow-card backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand/15 text-brand">
              <TrendingUp size={16} />
            </span>
            <span className="text-sm font-semibold text-cream">Revenue</span>
          </div>
          <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-bold text-brand">+312%</span>
        </div>

        <svg viewBox="0 0 300 140" className="w-full">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#c8f94e" stopOpacity="0.4" />
              <stop offset="1" stopColor="#c8f94e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 120 L40 108 L80 116 L120 88 L160 96 L200 60 L240 70 L300 24 L300 140 L0 140 Z"
            fill="url(#areaFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d="M0 120 L40 108 L80 116 L120 88 L160 96 L200 60 L240 70 L300 24"
            fill="none"
            stroke="#c8f94e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.circle
            cx="300"
            cy="24"
            r="5"
            fill="#c8f94e"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, type: "spring" }}
          />
        </svg>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { k: "ROAS", v: "5.4x" },
            { k: "CTR", v: "8.9%" },
            { k: "CPA", v: "-41%" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-line bg-white/[0.02] p-2 text-center">
              <div className="text-sm font-bold text-cream">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted">{s.k}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        {...float(0.2, 14)}
        className="absolute left-0 top-10 flex items-center gap-2 rounded-2xl border border-line bg-ink-700/90 px-3.5 py-2.5 shadow-soft backdrop-blur"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet/20 text-violet">
          <Users size={15} />
        </span>
        <div>
          <div className="text-xs font-bold text-cream">+220%</div>
          <div className="text-[10px] text-muted">New customers</div>
        </div>
      </motion.div>

      <motion.div
        {...float(1.1, 16)}
        className="absolute -right-2 top-1/3 flex items-center gap-2 rounded-2xl border border-line bg-ink-700/90 px-3.5 py-2.5 shadow-soft backdrop-blur"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan/20 text-cyan">
          <Target size={15} />
        </span>
        <div>
          <div className="text-xs font-bold text-cream">4.9★</div>
          <div className="text-[10px] text-muted">Client rating</div>
        </div>
      </motion.div>

      <motion.div
        {...float(0.6, 12)}
        className="absolute bottom-8 left-6 flex items-center gap-2 rounded-2xl border border-line bg-ink-700/90 px-3.5 py-2.5 shadow-soft backdrop-blur"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand/20 text-brand">
          <Sparkles size={15} />
        </span>
        <div>
          <div className="text-xs font-bold text-cream">48 / mo</div>
          <div className="text-[10px] text-muted">Winning creatives</div>
        </div>
      </motion.div>
    </div>
  );
}
