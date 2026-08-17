import Link from "next/link";
import Avatar from "../visuals/Avatar";
import { Stagger, StaggerItem } from "../ui/motion";
import { SectionHeading, Button } from "../ui/primitives";
import { team as defaultTeam } from "../../lib/data";

function TeamCard({ member }) {
  return (
    <StaggerItem>
      <div className="group">
        <div className="relative overflow-hidden rounded-3xl border border-line">
          <Avatar
            initials={member.initials}
            palette={member.palette}
            seed={member.slug}
            rounded="rounded-none"
            className="aspect-[4/5] w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-lg font-bold text-cream">{member.name}</h3>
            <p className="text-sm text-brand">{member.role}</p>
            <div className="mt-3 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {member.socials.map((s) => (
                <span
                  key={s}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/30 text-xs font-semibold text-cream backdrop-blur"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function TeamGrid({
  items = defaultTeam,
  limit,
  showHeader = true,
  eyebrow = "The people",
  title = "Senior operators, not account managers",
  description = "You work directly with the strategists, buyers and creatives doing the work — every day.",
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
              <Button href="/team" variant="ghost" icon="up-right" className="shrink-0">
                Meet the team
              </Button>
            )}
          </div>
        )}
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((m) => (
            <TeamCard key={m.slug} member={m} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
