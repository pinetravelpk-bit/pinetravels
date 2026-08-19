import Link from "next/link";

// Original InventiveClicks lockup: a gradient "click" mark (cursor spark)
// + wordmark. `variant="light"` flips the wordmark white for dark panels.
export function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="url(#ic-grad)" />
      {/* cursor / click glyph */}
      <path
        d="M15 12.5 26.5 18.2c.9.45.83 1.77-.12 2.12l-4.3 1.6-1.6 4.3c-.35.95-1.67 1.02-2.12.12L12.5 15c-.42-.85.65-1.92 1.5-1.5Z"
        fill="#fff"
      />
      <circle cx="27.5" cy="27.5" r="3.4" fill="#fff" fillOpacity="0.9" />
      <circle cx="27.5" cy="27.5" r="1.5" fill="url(#ic-grad)" />
      <defs>
        <linearGradient id="ic-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B4BF0" />
          <stop offset="0.55" stopColor="#5B3AEE" />
          <stop offset="1" stopColor="#219BE4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Logo({ variant = "dark", className = "" }) {
  const wordColor = variant === "light" ? "text-white" : "text-ink";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="InventiveClicks — home"
    >
      <span className="transition-transform duration-300 group-hover:rotate-[-6deg]">
        <LogoMark />
      </span>
      <span className={`font-display text-[20px] font-extrabold tracking-tight ${wordColor}`}>
        Inventive<span className="grad-text">Clicks</span>
      </span>
    </Link>
  );
}
