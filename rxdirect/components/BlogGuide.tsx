"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  ClipboardList,
  ListChecks,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users2,
} from "lucide-react";
import kindsData from "@/data/blogKinds.json";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { salaries } from "@/data/salaries";
import { whatsappLink } from "@/data/business";
import { useTranslation } from "@/i18n/LanguageContext";
import { ServiceIcon, WhatsAppIcon } from "@/components/icons";

interface Kind {
  key: string;
  match: string;
  label: { en: string; ur: string };
  color: string;
  widget: "hiring" | "salary" | "checks";
}
const KINDS = kindsData.kinds as Kind[];
const kindFor = (slug: string) => KINDS.find((k) => new RegExp(k.match).test(slug)) ?? KINDS[KINDS.length - 1];

// Plays the animation once the guide scrolls into view (and again on "Play again").
function usePlay<T extends Element>() {
  const ref = useRef<T>(null);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun((r) => (r === 0 ? 1 : r));
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, run, replay: () => setRun((r) => r + 1) };
}

// Counts up to `to` once `run` becomes truthy.
function useCountUp(to: number, run: number, ms = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, run, ms]);
  return value;
}

function Panel({ title, icon, accent, children, onReplay, replayLabel }: { title: string; icon: ReactNode; accent: string; children: ReactNode; onReplay?: () => void; replayLabel?: string }) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      {onReplay && (
        <button
          type="button"
          onClick={onReplay}
          title={replayLabel}
          aria-label={replayLabel}
          className="absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Play className="h-3.5 w-3.5" />
        </button>
      )}
      <h3 className="mb-5 flex items-center gap-3 pe-8 text-base font-bold leading-snug text-navy sm:text-lg">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: accent }}>
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ---------- the three animations ----------

function HiringWidget({ accent, serviceSlug, cityName, run, replay }: { accent: string; serviceSlug?: string; cityName?: string; run: number; replay: () => void }) {
  const { t, locale } = useTranslation();
  const svc = services.find((s) => s.slug === serviceSlug);
  const steps = [
    { icon: MessageCircle, title: t("home.how1Title"), desc: t("home.how1Desc") },
    { icon: ListChecks, title: t("home.how2Title"), desc: t("home.how2Desc") },
    { icon: Users2, title: t("home.how3Title"), desc: t("home.how3Desc") },
    { icon: UserCheck, title: t("home.how4Title"), desc: t("home.how4Desc") },
  ];
  const title = svc
    ? `${t("guide.hiringTitle", { service: svc.name[locale] })}${cityName ? ` ${t("guide.inCity", { city: cityName })}` : ""}`
    : t("guide.hiringTitleGeneric");
  return (
    <Panel title={title} accent={accent} icon={svc ? <ServiceIcon name={svc.icon} className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />} onReplay={replay} replayLabel={t("guide.replay")}>
      <ol key={run} className="relative space-y-4 ps-1" data-run={run ? "1" : "0"}>
        <span className="guide-line absolute bottom-3 start-[19px] top-3 w-0.5 origin-top rounded bg-gray-200" aria-hidden>
          <span className="guide-line-fill absolute inset-0 origin-top rounded" style={{ background: accent }} />
        </span>
        {steps.map((s, i) => (
          <li key={s.title} className="guide-step relative flex gap-4" style={{ animationDelay: `${i * 0.45}s` }}>
            <span className="guide-dot relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white" style={{ borderColor: accent, color: accent, animationDelay: `${i * 0.45 + 0.15}s` }}>
              <s.icon className="h-5 w-5" />
            </span>
            <div className="pt-1">
              <p className="text-sm font-bold text-navy">
                {i + 1}. {s.title}
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="guide-step mt-5 rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800" style={{ animationDelay: "1.9s" }}>
        {t("guide.typical")}
      </p>
    </Panel>
  );
}

function SalaryWidget({ accent, serviceSlugs, run, replay }: { accent: string; serviceSlugs: string[]; run: number; replay: () => void }) {
  const { t, locale } = useTranslation();
  const rows = serviceSlugs
    .map((slug) => ({ slug, svc: services.find((s) => s.slug === slug), sal: salaries[slug] }))
    .filter((r) => r.svc && r.sal)
    .slice(0, 4);
  const max = Math.max(...rows.map((r) => r.sal!.amount ?? 0), 1);
  const main = rows[0];
  const count = useCountUp(main?.sal?.amount ?? 0, run);
  if (!main) return null;
  return (
    <Panel title={t("guide.salaryTitle")} accent={accent} icon={<ServiceIcon name={main.svc!.icon} className="h-5 w-5" />} onReplay={replay} replayLabel={t("guide.replay")}>
      <div className="rounded-xl p-5 text-white" style={{ background: `linear-gradient(135deg, #0b1f4d, ${accent})` }}>
        <p className="text-sm font-semibold opacity-90">{main.svc!.name[locale]}</p>
        {main.sal!.amount ? (
          <p className="mt-1 font-mono text-4xl font-extrabold tracking-tight" dir="ltr">
            {count.toLocaleString("en-PK")} <span className="text-base font-semibold opacity-80">{t("guide.perMonth")}</span>
          </p>
        ) : (
          <p className="mt-1 text-2xl font-extrabold">{t("guide.perJob")}</p>
        )}
      </div>
      {rows.length > 1 && (
        <div key={run} className="mt-5 space-y-3" data-run={run ? "1" : "0"}>
          {rows.map((r, i) => (
            <div key={r.slug}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-navy">{r.svc!.name[locale]}</span>
                <span className="font-mono text-gray-600" dir="ltr">{r.sal!.amount ? `PKR ${r.sal!.amount.toLocaleString("en-PK")}+` : t("guide.perJob")}</span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="guide-bar h-full rounded-full"
                  style={{ width: `${Math.max(12, ((r.sal!.amount ?? max * 0.5) / max) * 100)}%`, background: accent, animationDelay: `${i * 0.2}s` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs leading-relaxed text-gray-500">{t("guide.salaryNote")}</p>
    </Panel>
  );
}

function ChecksWidget({ accent, kindKey, serviceSlug, run, replay }: { accent: string; kindKey: string; serviceSlug?: string; run: number; replay: () => void }) {
  const { t, locale } = useTranslation();
  const svc = services.find((s) => s.slug === serviceSlug);
  const checks = svc?.checks[locale]?.length ? svc.checks[locale] : services[0].checks[locale];
  const serviceName = svc ? svc.name[locale] : t("guide.allStaff");
  const titleKey = ["verify", "red-flags", "interview", "why-agency", "become-verified"].includes(kindKey) ? kindKey : "default";
  const isStaff = kindKey === "become-verified";
  return (
    <Panel title={t(`guide.checksTitle.${titleKey}`, { service: serviceName })} accent={accent} icon={<ShieldCheck className="h-5 w-5" />} onReplay={replay} replayLabel={t("guide.replay")}>
      <div key={run} className="flex flex-1 flex-col gap-5" data-run={run ? "1" : "0"}>
        <div className="relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center">
          <span className="guide-ring absolute inset-0 rounded-full border-4 border-dashed" style={{ borderColor: accent }} />
          <span className="guide-scan absolute inset-2 overflow-hidden rounded-full bg-brand-50">
            <span className="guide-scanline absolute inset-x-0 h-6 opacity-40" style={{ background: `linear-gradient(transparent, ${accent}, transparent)` }} />
          </span>
          {svc ? <ServiceIcon name={svc.icon} className="relative h-11 w-11 text-navy" /> : <ClipboardList className="relative h-11 w-11 text-navy" />}
          <span className="guide-badge absolute -bottom-1 -end-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-white" style={{ background: accent, animationDelay: `${checks.length * 0.5 + 0.2}s` }}>
            <BadgeCheck className="h-5 w-5" />
          </span>
        </div>
        <ul className="grid gap-2.5">
          {checks.map((c, i) => (
            <li key={c} className="guide-step flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/70 px-3 py-2.5 text-sm font-medium text-gray-800" style={{ animationDelay: `${i * 0.5}s` }}>
              <span className="guide-tick flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ background: accent, animationDelay: `${i * 0.5 + 0.25}s` }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path className="guide-tickpath" d="M5 12.5l4.5 4.5L19 7.5" style={{ animationDelay: `${i * 0.5 + 0.3}s` }} />
                </svg>
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
      <p className="guide-step mt-5 flex items-center gap-2 text-sm font-bold" style={{ color: accent, animationDelay: `${checks.length * 0.5 + 0.4}s` }}>
        <BadgeCheck className="h-5 w-5" />
        {t("guide.verifiedBadge")}
      </p>
      <div className="mt-4">
        {isStaff ? (
          <Link href="/staff/register" className="btn-primary w-full sm:w-auto">
            {t("guide.staffCta")}
          </Link>
        ) : (
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
            <WhatsAppIcon className="h-4 w-4" />
            {t("guide.hireCta")}
          </a>
        )}
      </div>
    </Panel>
  );
}

// ---------- roadmap of the post's own sections ----------

function Roadmap({ headings, accent, run }: { headings: { id: string; text: string }[]; accent: string; run: number }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  // Highlight the section the reader is currently in.
  useEffect(() => {
    if (!headings.length) return;
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => Boolean(e));
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let idx = -1;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top + window.scrollY <= y) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  const progress = headings.length ? Math.max(0, (active + 1) / headings.length) : 0;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-navy sm:text-lg">{t("guide.inThisGuide")}</h3>
        <span className="text-xs font-semibold text-gray-500">
          {headings.length} {t("guide.sections")}
        </span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${progress * 100}%`, background: accent }} />
      </div>
      <ol key={run} className="space-y-1" data-run={run ? "1" : "0"}>
        {headings.map((h, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li key={h.id} className="guide-step" style={{ animationDelay: `${Math.min(i, 10) * 0.12}s` }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
                }}
                className={`flex items-start gap-3 rounded-lg px-2 py-2 text-sm transition-colors ${current ? "bg-brand-50 font-semibold text-navy" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
                  style={done || current ? { background: accent, color: "#fff" } : { background: "#eef2f7", color: "#475569" }}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span>
                  {h.text}
                  {current && <span className="ms-2 text-xs font-semibold" style={{ color: accent }}>· {t("guide.reading")}</span>}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ---------- main ----------

export default function BlogGuide({
  slug,
  serviceSlugs = [],
  citySlugs = [],
  headings,
}: {
  slug: string;
  serviceSlugs?: string[];
  citySlugs?: string[];
  headings: { id: string; text: string }[];
}) {
  const { t, locale } = useTranslation();
  const kind = kindFor(slug);
  const { ref, run, replay } = usePlay<HTMLElement>();
  const service = serviceSlugs.find((s) => services.some((x) => x.slug === s));
  const cityName = cities.find((c) => citySlugs.includes(c.slug))?.name[locale];
  const hasSalary = serviceSlugs.some((s) => salaries[s]);
  const widget = kind.widget === "salary" && !hasSalary ? "hiring" : kind.widget;

  return (
    <section ref={ref} className="blog-guide mt-8 rounded-3xl p-1" style={{ background: `linear-gradient(135deg, ${kind.color}22, #eff5ff)` }} aria-label={t("guide.title")}>
      <div className="flex items-center gap-2 px-4 pb-2 pt-3">
        <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: kind.color }} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: kind.color }}>
          {t("guide.title")} · {kind.label[locale]}
        </span>
      </div>
      <div className={`grid gap-3 p-2 ${headings.length >= 2 ? "xl:grid-cols-2" : ""}`}>
        {widget === "salary" ? (
          <SalaryWidget accent={kind.color} serviceSlugs={serviceSlugs} run={run} replay={replay} />
        ) : widget === "checks" ? (
          <ChecksWidget accent={kind.color} kindKey={kind.key} serviceSlug={service} run={run} replay={replay} />
        ) : (
          <HiringWidget accent={kind.color} serviceSlug={service} cityName={cityName} run={run} replay={replay} />
        )}
        {headings.length >= 2 && <Roadmap headings={headings} accent={kind.color} run={run} />}
      </div>
    </section>
  );
}
