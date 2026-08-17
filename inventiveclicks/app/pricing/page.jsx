import PageHero from "../../components/PageHero";
import PricingTables from "../../components/sections/PricingTables";
import ProcessSteps from "../../components/sections/ProcessSteps";
import Testimonials from "../../components/sections/Testimonials";
import FaqAccordion from "../../components/sections/FaqAccordion";
import CTA from "../../components/CTA";

export const metadata = {
  title: "Pricing",
  description:
    "Transparent, scalable monthly plans from InventiveClicks — Starter, Growth and Scale. No lock-in, no surprises.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        align="center"
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        eyebrow="Pricing"
        title={
          <>
            Plans that scale with your <span className="gradient-text">ambition</span>
          </>
        }
        description="Pick the plan that fits today. Move up the moment you're ready — there's no lock-in and no penalty for growing fast."
      />

      <PricingTables showHeader={false} />
      <ProcessSteps
        eyebrow="What you get"
        title="Every plan, the same standard"
        description="Whatever you spend, you get senior people, honest reporting and a relentless focus on results."
      />
      <Testimonials />
      <FaqAccordion />
      <CTA />
    </>
  );
}
