import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import { insights } from "../../lib/site";

export default function Insights() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Insights"
            title="Ideas worth"
            accent="clicking on."
            lead="Field notes on video, design, influence and the fast-changing world of AI-era marketing."
            className="max-w-xl"
          />
          <Reveal>
            <Link href="/insights" className="btn-ghost">
              All insights <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link href={`/insights/${post.slug}`} className="card card-hover group flex h-full flex-col p-7">
                <div className="flex items-center gap-3 text-xs">
                  <span className="chip">{post.category}</span>
                  <span className="inline-flex items-center gap-1 text-ink-faint">
                    <Clock className="h-3.5 w-3.5" /> {post.read}
                  </span>
                </div>
                <h3 className="mt-4 flex-1 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
