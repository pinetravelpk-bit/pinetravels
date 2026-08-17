import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./ui/motion";
import { Eyebrow } from "./ui/primitives";

export default function PageHero({ eyebrow, title, description, crumbs = [], children, align = "left" }) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-44">
      <div className="pointer-events-none absolute inset-0 mesh opacity-80" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />

      <div className="container relative">
        <div className={`flex max-w-3xl flex-col gap-5 ${centered ? "mx-auto items-center text-center" : "items-start"}`}>
          {crumbs.length > 0 && (
            <Reveal className="flex items-center gap-1.5 text-sm text-muted" y={12}>
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-brand">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-cream">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight size={14} className="text-faint" />}
                </span>
              ))}
            </Reveal>
          )}

          {eyebrow && (
            <Reveal delay={0.05}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <h1 className="text-4xl font-bold leading-[1.02] balance sm:text-5xl md:text-6xl">{title}</h1>
          </Reveal>

          {description && (
            <Reveal delay={0.16} className="max-w-2xl">
              <p className="text-lg leading-relaxed text-muted">{description}</p>
            </Reveal>
          )}

          {children && (
            <Reveal delay={0.22} className={centered ? "" : "w-full"}>
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
