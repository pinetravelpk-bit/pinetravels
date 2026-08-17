import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";
import MarqueeStrip from "../components/home/MarqueeStrip";
import AboutIntro from "../components/home/AboutIntro";
import ServicesGrid from "../components/sections/ServicesGrid";
import ProcessSteps from "../components/sections/ProcessSteps";
import ProjectsGrid from "../components/sections/ProjectsGrid";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import TeamGrid from "../components/sections/TeamGrid";
import PricingTables from "../components/sections/PricingTables";
import PostsGrid from "../components/sections/PostsGrid";
import FaqAccordion from "../components/sections/FaqAccordion";
import CTA from "../components/CTA";
import { hero } from "../lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid limit={6} footer />
      <AboutIntro />
      <MarqueeStrip words={hero.marquee} />
      <ProcessSteps />
      <ProjectsGrid limit={4} footer />
      <Stats />
      <Testimonials />
      <TeamGrid limit={4} footer />
      <PricingTables />
      <PostsGrid limit={3} footer />
      <FaqAccordion />
      <CTA />
    </>
  );
}
