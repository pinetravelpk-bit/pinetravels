import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getContent, CONTENT_KEYS } from "../../../../../lib/cms";
import { SECTION_META } from "../../../../../lib/sections";
import SectionEditor from "../../../../../components/admin/SectionEditor";

export const dynamic = "force-dynamic";

export default async function SectionPage({ params }) {
  const { key } = await params;
  if (!CONTENT_KEYS.includes(key)) notFound();

  const meta = SECTION_META[key] || { title: key, description: "" };
  const data = await getContent(key);

  if (data === null || data === undefined) {
    return (
      <div>
        <Back />
        <h1 className="font-display text-2xl font-extrabold text-ink">{meta.title}</h1>
        <p className="mt-3 rounded-xl bg-amber-500/15 px-4 py-3 text-[14px] text-amber-900">
          Is section ka content nahi mila. <code className="font-mono">npm run setup</code> chala
          kar content database me daal lein.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Back />
      <SectionEditor
        sectionKey={key}
        title={meta.title}
        description={meta.description}
        initial={data}
      />
    </div>
  );
}

function Back() {
  return (
    <Link
      href="/admin/sections"
      className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-faint hover:text-pine-700"
    >
      <ArrowLeft className="h-3.5 w-3.5" /> All sections
    </Link>
  );
}
