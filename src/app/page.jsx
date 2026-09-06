import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import ServicesHandled from "@/components/landing/ServicesHandled";
import CreatorOperatingSystem from "@/components/landing/CreatorOperatingSystem";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureTabs from "@/components/landing/FeatureTabs";
import TierMatrix from "@/components/landing/TierMatrix";
import Testimonials from "@/components/landing/Testimonials";
import FaqAccordion from "@/components/landing/FaqAccordion";
import CtaBanner from "@/components/landing/CtaBanner";
export default function HomePage() {
    return (<main className="space-y-0 pb-16 bg-[#faf3eb]">
      {/* 1. Hero Section - Big, Minimal, Editorial */}
      <Hero />

      {/* 2. React Bits Discovery Flow (Hero 6) */}
      <ProblemSolution />

      {/* 3. Everything Creator Deals. Handled. (Hookk style) */}
      <ServicesHandled />

      {/* 4. Creator Operating System (Bento Workspace) */}
      <CreatorOperatingSystem />

      {/* 5. 4-Step Numbered How It Works Journey */}
      <HowItWorks />

      {/* 5. For Brands vs For Creators Interactive Tabs */}
      <FeatureTabs />

      {/* 6. Algorithmic Creator Tier Matrix (Alpha, Beta, Gamma) */}
      <TierMatrix />

      {/* 7. Outcome Metrics & Verified Testimonials Wall */}
      <Testimonials />

      {/* 8. Interactive FAQ Accordion */}
      <FaqAccordion />

      {/* 9. High-Impact Burgundy CTA Banner */}
      <CtaBanner />
    </main>);
}
