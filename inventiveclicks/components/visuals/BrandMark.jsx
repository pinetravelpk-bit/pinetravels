// A believable "logo" for the client marquee: a generated glyph + wordmark.
function hash(str = "") {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function Glyph({ variant }) {
  const c = "currentColor";
  switch (variant) {
    case 0:
      return <circle cx="14" cy="14" r="10" fill="none" stroke={c} strokeWidth="2.5" />;
    case 1:
      return <rect x="5" y="5" width="18" height="18" rx="5" fill="none" stroke={c} strokeWidth="2.5" />;
    case 2:
      return <path d="M14 4 L24 22 L4 22 Z" fill="none" stroke={c} strokeWidth="2.5" strokeLinejoin="round" />;
    case 3:
      return (
        <g fill={c}>
          <circle cx="9" cy="14" r="5" />
          <circle cx="19" cy="14" r="5" opacity="0.5" />
        </g>
      );
    default:
      return (
        <path
          d="M14 3 L17 11 L25 14 L17 17 L14 25 L11 17 L3 14 L11 11 Z"
          fill={c}
        />
      );
  }
}

export default function BrandMark({ name, className = "" }) {
  const variant = hash(name) % 5;
  return (
    <span className={`inline-flex items-center gap-2.5 text-cream/45 transition-colors duration-300 hover:text-cream/90 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden="true">
        <Glyph variant={variant} />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">{name}</span>
    </span>
  );
}
