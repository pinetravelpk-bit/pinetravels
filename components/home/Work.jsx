import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import WorkCard from "../WorkCard";
import { work } from "../../lib/site";

export default function Work() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            align="left"
            eyebrow="Selected work"
            title="Results we're proud to"
            accent="show off."
            lead="A snapshot of the brands we've helped grow — with the numbers to back the pixels."
            className="max-w-xl"
          />
          <Reveal>
            <Link href="/work" className="btn-ghost">
              View all projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {work.slice(0, 6).map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 80}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
