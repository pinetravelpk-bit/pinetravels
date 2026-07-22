// Original SVG artwork for Pine Travel — layered northern scenery, pine ridgelines,
// and a compact pine mark. No external images required.

export function MountainScene({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#02310b" />
          <stop offset="1" stopColor="#005902" />
        </linearGradient>
        <linearGradient id="ridge1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a4d18" />
          <stop offset="1" stopColor="#063a11" />
        </linearGradient>
        <linearGradient id="ridge2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f5f20" />
          <stop offset="1" stopColor="#0a4a18" />
        </linearGradient>
        <linearGradient id="ridge3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14371a" />
          <stop offset="1" stopColor="#0c2712" />
        </linearGradient>
      </defs>
      <rect width="1440" height="640" fill="url(#sky)" />
      <circle cx="1140" cy="130" r="52" fill="#f7f4ec" opacity="0.9" />
      <circle cx="1120" cy="120" r="52" fill="#005902" opacity="0.55" />
      <path d="M0 300 L150 200 L250 250 L360 150 L470 250 L560 190 L700 300 L800 230 L940 320 L1040 240 L1180 330 L1280 260 L1440 340 L1440 640 L0 640 Z" fill="url(#ridge1)" opacity="0.9" />
      <path d="M360 150 L410 195 L390 205 L360 190 L335 208 L320 196 Z" fill="#dfeadd" opacity="0.85" />
      <path d="M1040 240 L1085 278 L1065 286 L1042 274 L1022 288 L1008 278 Z" fill="#dfeadd" opacity="0.8" />
      <path d="M0 400 L120 330 L260 410 L380 320 L520 420 L640 350 L780 430 L900 360 L1050 440 L1180 370 L1320 440 L1440 390 L1440 640 L0 640 Z" fill="url(#ridge2)" />
      <path d="M0 470 C120 450 200 500 320 490 C460 478 520 520 680 512 C820 505 900 540 1040 528 C1200 514 1300 548 1440 522 L1440 640 L0 640 Z" fill="url(#ridge3)" />
      <g fill="#08210c">
        {[80, 150, 230, 320, 410, 520, 640, 760, 880, 1000, 1120, 1240, 1360].map((x, i) => (
          <Pine key={i} x={x} y={512 + (i % 3) * 8} s={0.9 + (i % 4) * 0.16} />
        ))}
      </g>
    </svg>
  );
}

function Pine({ x, y, s = 1 }) {
  const h = 92 * s;
  const w = 34 * s;
  return (
    <path
      transform={`translate(${x - w / 2}, ${y - h})`}
      d={`M${w / 2} 0
         L${w * 0.78} ${h * 0.34} L${w * 0.62} ${h * 0.34}
         L${w * 0.86} ${h * 0.6} L${w * 0.66} ${h * 0.6}
         L${w * 0.95} ${h * 0.86} L${w * 0.56} ${h * 0.86}
         L${w * 0.56} ${h} L${w * 0.44} ${h}
         L${w * 0.44} ${h * 0.86} L${w * 0.05} ${h * 0.86}
         L${w * 0.34} ${h * 0.6} L${w * 0.14} ${h * 0.6}
         L${w * 0.38} ${h * 0.34} L${w * 0.22} ${h * 0.34} Z`}
    />
  );
}

// A slim pine ridgeline used as a section divider. `flip` points it downward.
export function PineRidge({ className = "", color = "#005902", flip = false }) {
  return (
    <svg className={className} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <path fill={color} d="M0 90 L0 52 C90 44 130 60 210 54 C300 47 340 30 430 44 C520 58 560 34 660 42 C760 50 810 26 920 40 C1030 54 1080 36 1180 46 C1290 57 1350 40 1440 50 L1440 90 Z" />
    </svg>
  );
}

// Small pine mark for eyebrows / bullets.
export function PineMark({ className = "", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 L16 8 L14 8 L18 13 L15 13 L19 19 L13 19 L13 22 L11 22 L11 19 L5 19 L9 13 L6 13 L10 8 L8 8 Z" fill={color} />
    </svg>
  );
}

// Gentle illustrated scene used for cards without photos.
export function CardScene({ tone = "pine", className = "" }) {
  const palettes = {
    amber: ["#7a4a12", "#a9721f", "#d19a3a"],
    slate: ["#1f2d38", "#39505f", "#5c7688"],
    pine: ["#02310b", "#0a4d18", "#14371a"],
    teal: ["#0b3b3a", "#12615c", "#2a8079"],
    green: ["#083517", "#0f5f20", "#2f7d3a"],
    deep: ["#04240b", "#083517", "#0d2a13"],
  };
  const c = palettes[tone] || palettes.pine;
  return (
    <svg className={className} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill={c[0]} />
      <circle cx="315" cy="60" r="30" fill="#f7f4ec" opacity="0.55" />
      <path d="M0 150 L70 95 L130 150 L190 100 L260 160 L330 110 L400 165 L400 260 L0 260 Z" fill={c[1]} />
      <path d="M0 195 L80 160 L160 200 L240 165 L320 205 L400 175 L400 260 L0 260 Z" fill={c[2]} opacity="0.92" />
      <g fill="#06200a">
        {[40, 95, 150, 210, 270, 330, 375].map((x, i) => (
          <Pine key={i} x={x} y={232 + (i % 2) * 6} s={0.7 + (i % 3) * 0.12} />
        ))}
      </g>
    </svg>
  );
}
