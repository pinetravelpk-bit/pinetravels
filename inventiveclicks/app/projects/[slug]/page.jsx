import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "../../../components/PageHero";
import Poster from "../../../components/visuals/Poster";
import ProjectsGrid from "../../../components/sections/ProjectsGrid";
import CTA from "../../../components/CTA";
import { Reveal } from "../../../components/ui/motion";
import { Tag } from "../../../components/ui/primitives";
import { projects, getProject } from "../../../lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return { title: "Case study not found" };
  return { title: `${project.client} — Case Study`, description: project.excerpt };
}

function Block({ label, title, children }) {
  return (
    <Reveal className="border-t border-line pt-8">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{label}</span>
      <h3 className="mt-3 text-xl font-bold text-cream sm:text-2xl">{title}</h3>
      <p className="mt-4 leading-relaxed text-muted">{children}</p>
    </Reveal>
  );
}

export default function ProjectDetail({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/projects" },
          { label: project.client },
        ]}
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.excerpt}
      >
        <div className="flex flex-wrap gap-2">
          {project.services.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </PageHero>

      {/* Cover */}
      <section className="pb-4">
        <div className="container">
          <Reveal className="overflow-hidden rounded-[2rem] border border-line">
            <Poster palette={project.palette} seed={project.slug} rounded="rounded-none" className="aspect-[16/9] w-full" />
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <section className="section-tight">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 rounded-3xl border border-line bg-ink-800/60 p-8 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <Reveal key={m.label} className="text-center">
                <div className="font-display text-4xl font-extrabold text-brand md:text-5xl">{m.value}</div>
                <div className="mt-2 text-sm text-muted">{m.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="section pt-6">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <Block label="The challenge" title="Where they were stuck">
              {project.challenge}
            </Block>
            <Block label="Our approach" title="What we did about it">
              {project.solution}
            </Block>
            <Block label="The outcome" title="What changed">
              {project.outcome}
            </Block>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-ink-800/60 p-7">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-cream">Project details</h4>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-faint">Client</dt>
                  <dd className="text-right font-medium text-cream">{project.client}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-faint">Industry</dt>
                  <dd className="text-right font-medium text-cream">{project.category}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-4">
                  <dt className="text-faint">Year</dt>
                  <dd className="text-right font-medium text-cream">{project.year}</dd>
                </div>
                <div className="flex flex-col gap-2 pb-1">
                  <dt className="text-faint">Services</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <span key={s} className="rounded-full border border-line px-2.5 py-1 text-xs text-cream/80">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <Link href="/contact" className="btn-primary mt-6 w-full">
                Start your project
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </Link>
            </div>

            <Link
              href={`/projects/${next.slug}`}
              className="group mt-4 flex items-center justify-between rounded-3xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-brand/50"
            >
              <span>
                <span className="block text-xs text-faint">Next case study</span>
                <span className="block font-semibold text-cream">{next.client}</span>
              </span>
              <ArrowRight size={18} className="text-brand transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ProjectsGrid
        items={others}
        eyebrow="More work"
        title="Keep exploring"
        description="Every brand is different. The obsession with outcomes isn't."
      />

      <div className="container">
        <Link href="/projects" className="btn-ghost">
          <ArrowLeft size={16} /> All case studies
        </Link>
      </div>

      <CTA />
    </>
  );
}
