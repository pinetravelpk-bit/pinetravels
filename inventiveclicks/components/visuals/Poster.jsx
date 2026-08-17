// Deterministic generated "cover art" — stands in for stock photography.
// Given a palette + seed it renders a distinct, on-brand abstract composition.

function hash(str = "") {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function Motif({ variant, uid }) {
  const stroke = "rgba(245,246,239,0.85)";
  if (variant === 0) {
    // Growth bars + trend line
    const bars = [40, 90, 70, 130, 110, 175, 150, 210];
    return (
      <g>
        {bars.map((h, i) => (
          <rect
            key={i}
            x={120 + i * 66}
            y={470 - h}
            width="40"
            height={h}
            rx="8"
            fill={`url(#bar-${uid})`}
            opacity={0.85}
          />
        ))}
        <polyline
          points="140,410 206,360 272,380 338,300 404,320 470,250 536,270 602,210"
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="602" cy="210" r="10" fill="var(--brand)" />
      </g>
    );
  }
  if (variant === 1) {
    // Concentric target
    return (
      <g transform="translate(400,300)">
        {[210, 160, 110, 60].map((r, i) => (
          <circle
            key={r}
            r={r}
            fill="none"
            stroke={stroke}
            strokeOpacity={0.18 + i * 0.14}
            strokeWidth="3"
          />
        ))}
        <circle r="24" fill={`url(#bar-${uid})`} />
        <line x1="-260" y1="0" x2="260" y2="0" stroke={stroke} strokeOpacity="0.12" />
        <line x1="0" y1="-240" x2="0" y2="240" stroke={stroke} strokeOpacity="0.12" />
      </g>
    );
  }
  if (variant === 2) {
    // Orbiting nodes
    const nodes = [
      [400, 300, 26],
      [230, 210, 12],
      [560, 190, 14],
      [590, 400, 10],
      [220, 420, 13],
    ];
    return (
      <g>
        <ellipse cx="400" cy="300" rx="230" ry="150" fill="none" stroke={stroke} strokeOpacity="0.16" strokeWidth="2" />
        <ellipse cx="400" cy="300" rx="150" ry="220" fill="none" stroke={stroke} strokeOpacity="0.12" strokeWidth="2" />
        {nodes.slice(1).map(([x, y], i) => (
          <line key={i} x1="400" y1="300" x2={x} y2={y} stroke={stroke} strokeOpacity="0.14" strokeWidth="2" />
        ))}
        {nodes.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i === 0 ? `url(#bar-${uid})` : "var(--brand)"} opacity={i === 0 ? 1 : 0.9} />
        ))}
      </g>
    );
  }
  // variant 3 — layered waves
  return (
    <g fill="none" strokeLinecap="round">
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M60 ${240 + i * 40} C 220 ${180 + i * 40}, 320 ${320 + i * 30}, 460 ${250 + i * 36} S 700 ${190 + i * 40}, 760 ${240 + i * 40}`}
          stroke={i === 1 ? "var(--brand)" : stroke}
          strokeOpacity={i === 1 ? 0.95 : 0.2 + i * 0.05}
          strokeWidth={i === 1 ? 4 : 3}
        />
      ))}
      <circle cx="460" cy="286" r="9" fill="var(--brand)" />
    </g>
  );
}

export default function Poster({
  palette = ["#c8f94e", "#5eead4"],
  seed = "poster",
  label,
  index,
  className = "",
  rounded = "rounded-3xl",
}) {
  const h = hash(seed);
  const uid = h.toString(36);
  const variant = h % 4;
  const [from, to] = palette;

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={label ? `${label} cover art` : "cover art"}
      >
        <defs>
          <linearGradient id={`bar-${uid}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
          <radialGradient id={`glowA-${uid}`} cx="0.2" cy="0.1" r="0.9">
            <stop offset="0" stopColor={from} stopOpacity="0.55" />
            <stop offset="1" stopColor={from} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`glowB-${uid}`} cx="0.9" cy="0.95" r="0.9">
            <stop offset="0" stopColor={to} stopOpacity="0.5" />
            <stop offset="1" stopColor={to} stopOpacity="0" />
          </radialGradient>
          <pattern id={`grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <radialGradient id={`vig-${uid}`} cx="0.5" cy="0.4" r="0.75">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>
        </defs>

        <rect width="800" height="600" fill="#0c0e11" />
        <rect width="800" height="600" fill={`url(#grid-${uid})`} />
        <rect width="800" height="600" fill={`url(#glowA-${uid})`} />
        <rect width="800" height="600" fill={`url(#glowB-${uid})`} />

        <Motif variant={variant} uid={uid} />

        {typeof index === "number" && (
          <text
            x="60"
            y="150"
            fontFamily="Syne Variable, sans-serif"
            fontSize="120"
            fontWeight="800"
            fill="rgba(245,246,239,0.08)"
          >
            {String(index).padStart(2, "0")}
          </text>
        )}

        <rect width="800" height="600" fill={`url(#vig-${uid})`} opacity="0.5" />
      </svg>

      {label && (
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold text-cream/90 backdrop-blur">
          {label}
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 grain" />
    </div>
  );
}
