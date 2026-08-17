import Link from "next/link";
import PageHero from "../../components/PageHero";
import ServicesGrid from "../../components/sections/ServicesGrid";
import ProcessSteps from "../../components/sections/ProcessSteps";
import Stats from "../../components/sections/Stats";
import Testimonials from "../../components/sections/Testimonials";
import FaqAccordion from "../../components/sections/FaqAccordion";
import CTA from "../../components/CTA";

export const metadata = {
  title: "Services",
  description:
    "SEO, paid media, social, content, web & CRO, branding, email and analytics — a full-funnel growth toolkit from InventiveClicks.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="What we do"
        title={
          <>
            Everything you need to <span className="gradient-text">grow</span>, under one roof
          </>
        }
        description="Pick a single channel or let us run the entire engine. Whatever the mix, it's built around one thing: measurable, compounding growth."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            Get a proposal
          </Link>
          <Link href="/projects" className="btn-ghost">
            See the results
          </Link>
        </div>
      </PageHero>

      <ServicesGrid showHeader={false} />
      <ProcessSteps />
      <Stats />
      <Testimonials showHeader />
      <FaqAccordion />
      <CTA />
    </>
  );
}
