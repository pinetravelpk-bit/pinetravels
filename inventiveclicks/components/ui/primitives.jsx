import { Children } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";

/* ------------------------------------------------------------------ Button */
export function Button({
  href = "#",
  children,
  variant = "primary",
  icon = "right",
  className = "",
  ...rest
}) {
  const styles = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    dark: "btn-dark",
  };
  const Arrow = icon === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Link href={href} className={`group ${styles[variant] || styles.primary} ${className}`} {...rest}>
      <span>{children}</span>
      {icon && (
        <Arrow
          size={17}
          strokeWidth={2.25}
          className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}

/* ----------------------------------------------------------------- Eyebrow */
export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`eyebrow ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- SectionHeading */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
}) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`text-3xl font-bold sm:text-4xl md:text-[2.85rem] balance ${titleClassName}`}>{title}</h2>
      {description && <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------- Marquee */
export function Marquee({ children, reverse = false, durationSeconds = 32, className = "", itemClassName = "mx-6", pauseOnHover = true }) {
  const items = Children.toArray(children);
  const Group = ({ hidden }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((c, i) => (
        <div key={i} className={`flex items-center ${itemClassName}`}>
          {c}
        </div>
      ))}
    </div>
  );
  return (
    <div className={`marquee-mask overflow-hidden ${pauseOnHover ? "pause-hover" : ""} ${className}`}>
      <div
        className={`marquee ${reverse ? "marquee-rev" : ""}`}
        style={{ "--marquee-duration": `${durationSeconds}s` }}
      >
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- misc */
export function Divider({ className = "" }) {
  return <div className={`hair ${className}`} />;
}

export function Tag({ children, className = "" }) {
  return <span className={`chip ${className}`}>{children}</span>;
}
