import { MousePointerClick } from "lucide-react";

export default function Logo({ className = "", showText = true, size = 36 }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative grid place-items-center rounded-[0.7rem] bg-brand text-ink-900 shadow-[0_8px_24px_-8px_rgba(200,249,78,0.6)]"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <MousePointerClick size={size * 0.55} strokeWidth={2.25} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet ring-2 ring-ink-900" />
      </span>
      {showText && (
        <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-cream">
          Inventive<span className="text-brand">Clicks</span>
        </span>
      )}
    </span>
  );
}
