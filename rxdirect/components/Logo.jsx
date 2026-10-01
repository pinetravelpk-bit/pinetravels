import Link from "next/link";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="RxDirect home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 font-display text-lg font-extrabold text-white">
        Rx
      </span>
      <span className={`font-display text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Rx<span className="text-brand-500">Direct</span>
      </span>
    </Link>
  );
}
