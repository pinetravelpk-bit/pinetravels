// Animated SVG scenes for the home hero slider. Pure SVG + CSS keyframes
// (see the hs-* rules in globals.css), so they stay sharp and light.

const SKIN = "#c98b62";
const SKIN_DARK = "#a86d48";
const NAVY = "#0b1f4d";
const BLUE = "#1d4ed8";
const BLUE_LIGHT = "#dbe7ff";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#dbe9ff" />
        <stop offset="1" stopColor="#f7faff" />
      </linearGradient>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#eef4ff" />
        <stop offset="1" stopColor="#ffffff" />
      </linearGradient>
    </defs>
  );
}

/* ---------------- Driver driving a car ---------------- */
export function DriverScene() {
  const city = (x: number) => (
    <g transform={`translate(${x} 0)`} fill="#c7d7f5">
      <rect x="10" y="120" width="46" height="130" rx="4" />
      <rect x="64" y="90" width="36" height="160" rx="4" fill="#b6c9ef" />
      <rect x="108" y="140" width="58" height="110" rx="4" />
      <rect x="176" y="105" width="40" height="145" rx="4" fill="#b6c9ef" />
      <rect x="226" y="150" width="70" height="100" rx="4" />
      <rect x="306" y="80" width="34" height="170" rx="4" fill="#b6c9ef" />
      <rect x="350" y="130" width="60" height="120" rx="4" />
      <rect x="420" y="110" width="50" height="140" rx="4" fill="#b6c9ef" />
      {[20, 74, 118, 186, 236, 316, 360, 430].map((wx) =>
        [0, 1, 2, 3].map((r) => <rect key={`${wx}-${r}`} x={wx + 4} y={150 + r * 22} width="8" height="10" rx="1.5" fill="#eef4ff" opacity="0.9" />)
      )}
    </g>
  );
  const trees = (x: number) => (
    <g transform={`translate(${x} 0)`}>
      {[30, 150, 270, 390].map((tx) => (
        <g key={tx}>
          <rect x={tx - 3} y="232" width="6" height="30" fill="#7a5b3d" />
          <circle cx={tx} cy="222" r="20" fill="#3fa36b" />
          <circle cx={tx + 12} cy="230" r="13" fill="#4cb87b" />
        </g>
      ))}
    </g>
  );
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy="302" r="21" fill="#1f2937" />
      <circle cx={cx} cy="302" r="11" fill="#d1d5db" />
      <g className="hs-spin" style={{ transformOrigin: `${cx}px 302px` }}>
        <rect x={cx - 1.5} y="292" width="3" height="20" fill="#6b7280" />
        <rect x={cx - 10} y="300.5" width="20" height="3" fill="#6b7280" />
      </g>
    </g>
  );
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Driver driving a car">
      <Defs id="drv" />
      <rect width="480" height="360" fill="url(#drv-sky)" />
      <circle cx="400" cy="70" r="30" fill="#ffd36e" className="hs-pulse" />
      <g className="hs-pan-slow">
        {city(0)}
        {city(480)}
      </g>
      <g className="hs-pan-fast">
        {trees(0)}
        {trees(480)}
      </g>
      <rect y="262" width="480" height="98" fill="#374151" />
      <rect y="262" width="480" height="6" fill="#9ca3af" />
      <line x1="0" y1="318" x2="480" y2="318" stroke="#f9fafb" strokeWidth="5" strokeDasharray="34 26" className="hs-road" />
      {/* speed lines */}
      <g stroke="#93b4fd" strokeWidth="3" strokeLinecap="round" className="hs-speed">
        <line x1="40" y1="230" x2="90" y2="230" />
        <line x1="20" y1="252" x2="80" y2="252" />
        <line x1="50" y1="274" x2="96" y2="274" />
      </g>
      <g className="hs-bob">
        {/* car body */}
        <path d="M110 300 L110 262 Q112 248 128 246 L176 242 L210 206 Q218 198 232 198 L318 198 Q334 198 344 210 L374 244 L404 250 Q422 254 424 272 L424 300 Z" fill={BLUE} />
        <path d="M222 212 Q228 206 236 206 L282 206 L282 244 L192 244 Z" fill="#bfdbfe" />
        <path d="M290 206 L316 206 Q328 206 336 216 L360 244 L290 244 Z" fill="#bfdbfe" />
        {/* driver */}
        <circle cx="262" cy="224" r="11" fill={SKIN} />
        <path d="M250 220 Q262 206 274 220 L274 216 Q262 204 250 216 Z" fill={NAVY} />
        <rect x="248" y="234" width="28" height="12" rx="5" fill={NAVY} />
        <circle cx="240" cy="236" r="8" fill="none" stroke="#1f2937" strokeWidth="3" />
        <rect x="110" y="270" width="314" height="8" fill="#1e40af" />
        <rect x="404" y="258" width="14" height="8" rx="3" fill="#fde68a" className="hs-blink" />
        <rect x="112" y="258" width="10" height="8" rx="3" fill="#fca5a5" />
        <rect x="300" y="252" width="16" height="4" rx="2" fill="#93c5fd" />
        {wheel(170)}
        {wheel(364)}
      </g>
    </svg>
  );
}

/* ---------------- Cook cooking ---------------- */
export function CookScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Cook cooking in a kitchen">
      <Defs id="ck" />
      <rect width="480" height="360" fill="url(#ck-wall)" />
      {/* tiles */}
      <g fill="none" stroke="#dbe7ff" strokeWidth="1.5">
        {Array.from({ length: 8 }, (_, i) => <line key={`h${i}`} x1="0" y1={150 + i * 16} x2="480" y2={150 + i * 16} />)}
        {Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={i * 32} y1="150" x2={i * 32} y2="262" />)}
      </g>
      {/* window */}
      <rect x="320" y="34" width="120" height="92" rx="8" fill="#cfe1ff" stroke="#fff" strokeWidth="6" />
      <line x1="380" y1="34" x2="380" y2="126" stroke="#fff" strokeWidth="5" />
      {/* shelf + jars */}
      <rect x="40" y="96" width="180" height="8" rx="3" fill="#a16207" />
      <rect x="54" y="66" width="26" height="30" rx="5" fill="#fde68a" />
      <rect x="92" y="60" width="26" height="36" rx="5" fill="#fca5a5" />
      <rect x="130" y="70" width="26" height="26" rx="5" fill="#86efac" />
      <rect x="168" y="64" width="26" height="32" rx="5" fill="#bfdbfe" />
      {/* counter */}
      <rect x="0" y="262" width="480" height="98" fill="#e5e7eb" />
      <rect x="0" y="256" width="480" height="12" fill="#9ca3af" />
      <rect x="300" y="280" width="60" height="60" rx="4" fill="#d1d5db" />
      <rect x="380" y="280" width="60" height="60" rx="4" fill="#d1d5db" />
      {/* stove + flames */}
      <rect x="250" y="246" width="150" height="14" rx="4" fill="#374151" />
      <g className="hs-flame" style={{ transformOrigin: "325px 248px" }}>
        <path d="M300 248 Q306 230 312 248 Z" fill="#f97316" />
        <path d="M318 248 Q325 224 332 248 Z" fill="#fb923c" />
        <path d="M338 248 Q344 232 350 248 Z" fill="#f97316" />
        <path d="M321 248 Q325 236 329 248 Z" fill="#fde047" />
      </g>
      {/* pot */}
      <path d="M282 204 L368 204 L362 244 Q360 250 352 250 L298 250 Q290 250 288 244 Z" fill="#6b7280" />
      <rect x="276" y="198" width="98" height="10" rx="4" fill="#4b5563" />
      <rect x="262" y="210" width="16" height="6" rx="3" fill="#4b5563" />
      <rect x="372" y="210" width="16" height="6" rx="3" fill="#4b5563" />
      {/* steam */}
      {[300, 326, 352].map((x, i) => (
        <path
          key={x}
          d={`M${x} 190 q-10 -14 0 -28 q10 -14 0 -28`}
          fill="none"
          stroke="#c7d7f5"
          strokeWidth="5"
          strokeLinecap="round"
          className="hs-steam"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      {/* cook */}
      <g className="hs-sway" style={{ transformOrigin: "190px 340px" }}>
        <rect x="150" y="176" width="80" height="100" rx="26" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
        <rect x="152" y="236" width="76" height="60" rx="8" fill={BLUE} />
        <circle cx="178" cy="196" r="3" fill="#cbd5e1" />
        <circle cx="178" cy="214" r="3" fill="#cbd5e1" />
        <rect x="178" y="160" width="24" height="20" fill={SKIN_DARK} />
        <circle cx="190" cy="140" r="26" fill={SKIN} />
        <circle cx="181" cy="140" r="2.5" fill={NAVY} />
        <circle cx="199" cy="140" r="2.5" fill={NAVY} />
        <path d="M182 152 Q190 158 198 152" fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M178 150 Q190 146 202 150" fill="none" stroke="#3f2a1d" strokeWidth="4" strokeLinecap="round" />
        {/* chef hat */}
        <rect x="166" y="108" width="48" height="14" rx="3" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
        <circle cx="174" cy="100" r="14" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
        <circle cx="190" cy="92" r="16" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
        <circle cx="206" cy="100" r="14" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
        <rect x="168" y="100" width="44" height="16" fill="#fff" />
        {/* stirring arm */}
        <g className="hs-stir" style={{ transformOrigin: "222px 196px" }}>
          <path d="M222 196 L270 214" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
          <circle cx="274" cy="214" r="8" fill={SKIN} />
          <path d="M276 212 L318 190" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
        </g>
        <path d="M156 200 L140 236" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
        <circle cx="138" cy="240" r="8" fill={SKIN} />
      </g>
    </svg>
  );
}

/* ---------------- Nurse caring for a patient ---------------- */
export function NurseScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Nurse caring for an elderly patient">
      <Defs id="nr" />
      <rect width="480" height="360" fill="url(#nr-wall)" />
      <rect y="282" width="480" height="78" fill="#e0e7f5" />
      {/* monitor */}
      <rect x="320" y="40" width="130" height="82" rx="10" fill={NAVY} />
      <rect x="330" y="50" width="110" height="62" rx="6" fill="#0f2a63" />
      <polyline
        points="332,84 352,84 360,70 368,98 376,60 384,84 404,84 412,76 420,84 438,84"
        fill="none"
        stroke="#34d399"
        strokeWidth="3"
        strokeLinejoin="round"
        className="hs-ecg"
      />
      <text x="430" y="64" fontSize="11" fill="#34d399" fontFamily="sans-serif" textAnchor="end">72</text>
      <rect x="380" y="122" width="10" height="30" fill="#94a3b8" />
      {/* window */}
      <rect x="40" y="40" width="110" height="96" rx="8" fill="#cfe1ff" stroke="#fff" strokeWidth="6" />
      <path d="M40 120 Q70 96 96 112 T150 104 L150 136 L40 136 Z" fill="#a7d3b5" />
      {/* armchair + patient */}
      <rect x="40" y="200" width="200" height="90" rx="24" fill="#93b4fd" />
      <rect x="30" y="180" width="40" height="110" rx="16" fill="#7aa0f8" />
      <rect x="210" y="180" width="40" height="110" rx="16" fill="#7aa0f8" />
      <rect x="40" y="290" width="12" height="22" fill="#64748b" />
      <rect x="228" y="290" width="12" height="22" fill="#64748b" />
      <g className="hs-breathe" style={{ transformOrigin: "140px 260px" }}>
        <rect x="92" y="172" width="96" height="96" rx="30" fill="#f59e0b" opacity="0.9" />
        <rect x="70" y="236" width="140" height="44" rx="14" fill="#fef3c7" />
        <rect x="128" y="146" width="22" height="26" fill={SKIN_DARK} />
        <circle cx="139" cy="128" r="26" fill={SKIN} />
        <path d="M113 124 Q114 100 139 100 Q164 100 165 124 Q156 110 139 112 Q122 110 113 124 Z" fill="#e5e7eb" />
        <path d="M128 140 Q139 148 150 140" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
        <circle cx="130" cy="128" r="2.5" fill={NAVY} />
        <circle cx="148" cy="128" r="2.5" fill={NAVY} />
        <rect x="124" y="124" width="12" height="7" rx="3" fill="none" stroke={NAVY} strokeWidth="1.5" />
        <rect x="142" y="124" width="12" height="7" rx="3" fill="none" stroke={NAVY} strokeWidth="1.5" />
      </g>
      {/* nurse */}
      <g className="hs-sway" style={{ transformOrigin: "300px 340px" }}>
        <rect x="262" y="170" width="78" height="118" rx="26" fill="#14b8a6" />
        <path d="M286 170 L301 192 L316 170 Z" fill="#ffffff" />
        <rect x="270" y="286" width="22" height="46" rx="6" fill="#0f766e" />
        <rect x="310" y="286" width="22" height="46" rx="6" fill="#0f766e" />
        <rect x="290" y="150" width="22" height="22" fill={SKIN_DARK} />
        <circle cx="301" cy="128" r="26" fill={SKIN} />
        <path d="M274 130 Q272 98 301 98 Q330 98 328 130 Q326 112 301 112 Q278 112 274 130 Z" fill="#3f2a1d" />
        <path d="M326 124 Q338 150 322 168" fill="none" stroke="#3f2a1d" strokeWidth="10" strokeLinecap="round" />
        <circle cx="292" cy="130" r="2.5" fill={NAVY} />
        <circle cx="310" cy="130" r="2.5" fill={NAVY} />
        <path d="M293 142 Q301 148 309 142" fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        {/* cap */}
        <path d="M282 100 L320 100 L316 86 L286 86 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
        <rect x="298" y="89" width="6" height="10" fill="#ef4444" />
        <rect x="296" y="91" width="10" height="6" fill="#ef4444" />
        {/* stethoscope */}
        <path d="M288 176 Q290 214 301 216 Q312 214 314 176" fill="none" stroke="#1e293b" strokeWidth="3" />
        <circle cx="301" cy="220" r="5" fill="#94a3b8" />
        {/* caring arm onto patient's shoulder */}
        <g className="hs-pat" style={{ transformOrigin: "266px 190px" }}>
          <path d="M266 190 L206 196" stroke="#14b8a6" strokeWidth="18" strokeLinecap="round" />
          <circle cx="200" cy="197" r="9" fill={SKIN} />
        </g>
        {/* cup of medicine */}
        <path d="M336 196 L362 222" stroke="#14b8a6" strokeWidth="18" strokeLinecap="round" />
        <circle cx="364" cy="226" r="8" fill={SKIN} />
        <rect x="356" y="200" width="20" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      </g>
      {/* floating hearts */}
      {[{ x: 190, d: 0 }, { x: 230, d: 1.2 }, { x: 160, d: 2.4 }].map((h) => (
        <path
          key={h.x}
          d={`M${h.x} 110 c-6 -8 -18 -2 -12 8 l12 12 l12 -12 c6 -10 -6 -16 -12 -8 z`}
          fill="#f43f5e"
          className="hs-heart"
          style={{ animationDelay: `${h.d}s` }}
        />
      ))}
    </svg>
  );
}

/* ---------------- Office boy at work ---------------- */
export function OfficeBoyScene() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Office boy serving tea in an office">
      <Defs id="ob" />
      <rect width="480" height="360" fill="url(#ob-wall)" />
      <rect y="290" width="480" height="70" fill="#dde5f3" />
      {/* city window */}
      <rect x="30" y="30" width="170" height="120" rx="8" fill="#cfe1ff" stroke="#fff" strokeWidth="6" />
      <g fill="#a9c2ef">
        <rect x="44" y="84" width="26" height="62" />
        <rect x="76" y="64" width="22" height="82" />
        <rect x="104" y="92" width="30" height="54" />
        <rect x="140" y="74" width="20" height="72" />
        <rect x="166" y="98" width="26" height="48" />
      </g>
      <line x1="115" y1="30" x2="115" y2="150" stroke="#fff" strokeWidth="5" />
      {/* clock */}
      <circle cx="420" cy="70" r="30" fill="#fff" stroke={NAVY} strokeWidth="4" />
      <line x1="420" y1="70" x2="420" y2="52" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <line x1="420" y1="70" x2="436" y2="70" stroke={BLUE} strokeWidth="3" strokeLinecap="round" className="hs-clock" style={{ transformOrigin: "420px 70px" }} />
      {/* plant */}
      <rect x="430" y="246" width="34" height="44" rx="6" fill="#a16207" />
      <path d="M447 246 Q430 210 440 186 Q450 214 447 246 Q456 204 470 196 Q466 226 447 246" fill="#3fa36b" className="hs-leaf" style={{ transformOrigin: "447px 246px" }} />
      {/* desk + laptop + worker */}
      <rect x="40" y="226" width="240" height="14" rx="4" fill="#92400e" />
      <rect x="54" y="240" width="12" height="60" fill="#78350f" />
      <rect x="254" y="240" width="12" height="60" fill="#78350f" />
      <rect x="160" y="176" width="88" height="50" rx="5" fill={NAVY} />
      <rect x="166" y="182" width="76" height="38" rx="3" fill={BLUE_LIGHT} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="172" y={188 + i * 10} width="50" height="4" rx="2" fill={BLUE} className="hs-type" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `172px ${190 + i * 10}px` }} />
      ))}
      <rect x="150" y="224" width="108" height="5" rx="2" fill="#475569" />
      <rect x="64" y="200" width="60" height="26" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="70" y="194" width="50" height="8" rx="2" fill="#fde68a" />
      {/* seated worker */}
      <rect x="92" y="250" width="56" height="50" rx="10" fill="#475569" />
      <rect x="90" y="166" width="56" height="70" rx="20" fill="#64748b" />
      <circle cx="118" cy="146" r="20" fill={SKIN_DARK} />
      <path d="M98 144 Q100 124 118 124 Q136 124 138 144 Q130 134 118 134 Q106 134 98 144 Z" fill="#1f2937" />
      <path d="M140 190 L168 214" stroke="#64748b" strokeWidth="14" strokeLinecap="round" />
      {/* office boy walking with a tray */}
      <g className="hs-walk">
        <g className="hs-bob">
          <rect x="330" y="160" width="62" height="96" rx="22" fill="#e0f2fe" />
          <rect x="330" y="160" width="62" height="96" rx="22" fill="none" stroke="#bae6fd" strokeWidth="2" />
          <rect x="356" y="168" width="10" height="70" fill={NAVY} opacity="0.85" />
          <rect x="350" y="140" width="22" height="22" fill={SKIN_DARK} />
          <circle cx="361" cy="120" r="24" fill={SKIN} />
          <path d="M337 118 Q338 94 361 94 Q384 94 385 118 Q376 106 361 106 Q346 106 337 118 Z" fill="#1f2937" />
          <circle cx="353" cy="122" r="2.5" fill={NAVY} />
          <circle cx="369" cy="122" r="2.5" fill={NAVY} />
          <path d="M354 133 Q361 138 368 133" fill="none" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
          {/* arm holding tray */}
          <path d="M334 184 L304 196" stroke="#e0f2fe" strokeWidth="16" strokeLinecap="round" />
          <circle cx="300" cy="196" r="8" fill={SKIN} />
          <rect x="262" y="186" width="66" height="7" rx="3" fill="#94a3b8" />
          <path d="M272 170 L292 170 L289 186 L275 186 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M298 170 L318 170 L315 186 L301 186 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {[282, 308].map((x, i) => (
            <path key={x} d={`M${x} 164 q-6 -8 0 -16 q6 -8 0 -16`} fill="none" stroke="#c7d7f5" strokeWidth="3.5" strokeLinecap="round" className="hs-steam" style={{ animationDelay: `${i * 0.6}s` }} />
          ))}
        </g>
        <g className="hs-legs">
          <rect x="340" y="250" width="16" height="44" rx="5" fill={NAVY} className="hs-leg-a" style={{ transformOrigin: "348px 252px" }} />
          <rect x="366" y="250" width="16" height="44" rx="5" fill={NAVY} className="hs-leg-b" style={{ transformOrigin: "374px 252px" }} />
        </g>
      </g>
    </svg>
  );
}
