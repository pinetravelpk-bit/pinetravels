import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Poster from "../visuals/Poster";
import { Stagger, StaggerItem } from "../ui/motion";
import { SectionHeading, Button } from "../ui/primitives";
import { projects as allProjects } from "../../lib/data";

function ProjectCard({ project, index }) {
  return (
    <StaggerItem>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-3xl border border-line">
          <Poster
            palette={project.palette}
            seed={project.slug}
            label={project.category}
            index={index + 1}
            rounded="rounded-none"
            className="aspect-[16/10] w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
          <span className="absolute bottom-4 right-4 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-brand text-ink-900 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={20} />
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs text-faint">
              <span>{project.client}</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span>{project.year}</span>
            </div>
            <h3 className="text-xl font-bold text-cream transition-colors group-hover:text-brand md:text-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m.label}
              className="inline-flex items-baseline gap-1.5 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-sm"
            >
              <span className="font-bold text-brand">{m.value}</span>
              <span className="text-xs text-muted">{m.label}</span>
            </span>
          ))}
        </div>
      </Link>
    </StaggerItem>
  );
}

export default function ProjectsGrid({
  items = allProjects,
  limit,
  showHeader = true,
  eyebrow = "Selected work",
  title = "Outcomes we're proud of",
  description = "Real brands, real numbers. Here's a slice of the growth we've helped create.",
  footer = false,
}) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <section className="section">
      <div className="container">
        {showHeader && (
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {footer && (
              <Button href="/projects" variant="ghost" icon="up-right" className="shrink-0">
                View all work
              </Button>
            )}
          </div>
        )}

        <Stagger className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
