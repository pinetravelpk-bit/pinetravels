import PageBanner from "@/components/PageBanner";
import { CandidateForm } from "@/components/Forms";
import { jobs } from "@/lib/site";

export const metadata = { title: "Apply", description: "Submit your CV to RxDirect." };

export default function ApplyPage({ searchParams }) {
  const job = jobs.find((j) => j.slug === searchParams?.job);
  return (
    <>
      <PageBanner
        eyebrow="Apply"
        title={job ? `Apply: ${job.title}` : "Submit your CV"}
        text={job ? `${job.location} · ${job.type}` : "Register with RxDirect and we'll match you with verified healthcare employers."}
      />
      <section className="py-16">
        <div className="container-x max-w-4xl">
          <CandidateForm job={job ? job.slug : "general"} />
        </div>
      </section>
    </>
  );
}
