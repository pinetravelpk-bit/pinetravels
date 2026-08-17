import PageHero from "../../components/PageHero";
import ProjectsGrid from "../../components/sections/ProjectsGrid";
import Stats from "../../components/sections/Stats";
import Testimonials from "../../components/sections/Testimonials";
import CTA from "../../components/CTA";

export const metadata = {
  title: "Work & Case Studies",
  description:
    "Real brands, real numbers. Explore case studies from InventiveClicks across e-commerce, SaaS, DTC, B2B and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        eyebrow="Selected work"
        title={
          <>
            Work that moves the <span className="gradient-text">numbers</span>
          </>
        }
        description="We're judged on outcomes, so that's what we show. Here's a slice of the growth we've helped ambitious brands create."
      />
      <ProjectsGrid showHeader={false} />
      <Stats />
      <Testimonials />
      <CTA title="Want results like these?" />
    </>
  );
}
