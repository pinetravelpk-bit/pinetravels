// Stylised generated portrait for team members — gradient + silhouette + initials.
function hash(str = "") {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function Avatar({
  initials = "IC",
  palette = ["#c8f94e", "#5eead4"],
  seed = initials,
  className = "",
  rounded = "rounded-3xl",
}) {
  const uid = hash(seed).toString(36);
  const [from, to] = palette;
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`av-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
          <radialGradient id={`avg-${uid}`} cx="0.5" cy="0.28" r="0.7">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="480" fill={`url(#av-${uid})`} />
        <rect width="400" height="480" fill={`url(#avg-${uid})`} />
        {/* silhouette */}
        <g fill="rgba(10,11,13,0.28)">
          <circle cx="200" cy="200" r="88" />
          <path d="M60 480 C 70 360, 140 320, 200 320 C 260 320, 330 360, 340 480 Z" />
        </g>
        <g fill="rgba(10,11,13,0.14)">
          <circle cx="200" cy="196" r="66" />
        </g>
      </svg>
      <span className="absolute left-3 bottom-3 rounded-full bg-ink-900/70 px-2.5 py-1 text-xs font-bold tracking-wider text-cream backdrop-blur">
        {initials}
      </span>
      <span className="pointer-events-none absolute inset-0 grain" />
    </div>
  );
}
