import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Icon from "./Icons";
import { getService } from "../lib/site";

const COVER = {
  brand: "grad-brand",
  azure: "bg-gradient-to-br from-azure-400 to-azure-600",
  pink: "grad-aurora",
  coral: "bg-gradient-to-br from-coral to-pink",
};

export default function WorkCard({ item }) {
  const svc = getService(item.service);
  return (
    <Link href="/work" className="card card-hover group flex h-full flex-col overflow-hidden">
      {/* Cover */}
      <div className={`relative aspect-[16/10] overflow-hidden ${COVER[item.accent] || "grad-brand"}`}>
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />
        <Icon
          name={svc?.icon || "spark"}
          className="absolute -bottom-6 -right-4 h-40 w-40 text-white/15 transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.2}
        />
        <div className="absolute left-5 top-5">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {item.category}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-1.5 text-white">
          <TrendingUp className="h-4 w-4" />
          <span className="font-display text-lg font-extrabold">{item.result}</span>
        </div>
        <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-muted">{item.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
