import Link from "next/link";

// Wordmark from the 2026 redesign: navy "RX" with a blue slash through the X,
// "DIRECT" beside it and the tagline underneath. Pure SVG, so it stays sharp
// at any size and needs no image request.
export function LogoMark({ className = "", light = false }: { className?: string; light?: boolean }) {
  const ink = light ? "#ffffff" : "#0b1f4d";
  return (
    <svg
      viewBox="0 0 316 64"
      className={className}
      direction="ltr"
      style={{ direction: "ltr" }}
      role="img"
      aria-label="RX Direct"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="0" y="44" fontFamily="Poppins, var(--font-heading), Arial, sans-serif" fontWeight="800" fontSize="50" letterSpacing="-2" fill={ink}>
        RX
      </text>
      {/* blue slash across the X */}
      <path d="M50 52 L84 6 L94 6 L60 52 Z" fill="#1d4ed8" />
      <text x="96" y="40" fontFamily="Poppins, var(--font-heading), Arial, sans-serif" fontWeight="700" fontSize="34" letterSpacing="1" fill={ink}>
        DIRECT
      </text>
      <text x="98" y="58" fontFamily="Inter, var(--font-body), Arial, sans-serif" fontWeight="600" fontSize="10.5" letterSpacing="1.2" fill={light ? "#bfd3ff" : "#1d4ed8"}>
        VERIFIED STAFF. REAL SOLUTIONS.
      </text>
    </svg>
  );
}

export default function Logo({ className = "h-10 w-auto lg:h-12", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="RX Direct home">
      <LogoMark className={className} light={light} />
    </Link>
  );
}
