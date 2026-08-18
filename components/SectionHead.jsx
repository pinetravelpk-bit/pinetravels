import Reveal from "./Reveal";

// Reusable section heading: eyebrow chip + title (with optional gradient
// accent word) + optional lead paragraph. Centered by default.
export default function SectionHead({
  eyebrow,
  title,
  accent,
  lead,
  align = "center",
  dark = false,
  className = "",
}) {
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>}
      <h2 className={`font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-[42px] ${dark ? "text-white" : "text-ink"}`}>
        {title} {accent && <span className="grad-text">{accent}</span>}
      </h2>
      {lead && (
        <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-brand-100/70" : "text-ink-muted"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
