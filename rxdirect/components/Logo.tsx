import Link from "next/link";

// Official RX Direct logo (public/brand/rxdirect-logo.*, transparent
// background). WebP for modern browsers, PNG fallback; width/height are set
// so the header doesn't jump while it loads.
export default function Logo({ className = "h-10 w-auto lg:h-12", priority = true }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="RX Direct home">
      <picture>
        <source srcSet="/brand/rxdirect-logo.webp" type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/rxdirect-logo.png"
          alt="RX Direct - Verified Staff. Real Solutions"
          width={640}
          height={137}
          className={className}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    </Link>
  );
}
