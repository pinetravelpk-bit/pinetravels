"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Mail, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/LanguageContext";
import { apiGet, publicFileUrl, type TeamMember } from "@/lib/api";
import { PageIntro } from "@/components/FormKit";
import CTABanner from "@/components/CTABanner";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

export default function TeamClient({ article }: { article?: ReactNode } = {}) {
  const { t } = useTranslation();
  const [team, setTeam] = useState<TeamMember[] | null>(null);

  useEffect(() => {
    apiGet<TeamMember[]>("/api/team")
      .then(setTeam)
      .catch(() => setTeam([]));
  }, []);

  return (
    <>
      <PageIntro eyebrow={t("teamPage.eyebrow")} title={t("teamPage.title")} subtitle={t("teamPage.subtitle")} />
      <section className="section-py container-px mx-auto max-w-8xl">
        {team === null ? (
          <p className="flex items-center gap-2 text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> {t("teamPage.loading")}
          </p>
        ) : team.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-600">{t("teamPage.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((m) => (
              <article key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-100 to-brand-50">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={publicFileUrl(m.photo)} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-5xl font-extrabold text-brand-300">{initials(m.name)}</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-bold text-navy">{m.name}</h2>
                  {m.role && <p className="text-sm font-semibold text-brand-700">{m.role}</p>}
                  {m.bio && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-600">{m.bio}</p>}
                  <div className="mt-auto flex gap-2 pt-4">
                    {m.phone && (
                      <a href={`tel:${m.phone.replace(/[^\d+]/g, "")}`} aria-label={`Call ${m.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white">
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    {m.email && (
                      <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white">
                        <LinkedinIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-12 rounded-2xl bg-brand-50 p-6 text-center">
          <p className="font-semibold text-navy">{t("teamPage.join")}</p>
          <Link href="/jobs" className="btn-primary mt-3">
            {t("teamPage.joinCta")}
          </Link>
        </div>
      </section>
      {article}

      <CTABanner />
    </>
  );
}
