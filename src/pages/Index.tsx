import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { IntroSection } from "@/components/landing/IntroSection";
import { DifferenceSection } from "@/components/landing/DifferenceSection";
import { RisksSection } from "@/components/landing/RisksSection";
import { ForYouSection } from "@/components/landing/ForYouSection";
import { WhatYouGetSection } from "@/components/landing/WhatYouGetSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <IntroSection />
      <div id="how-it-works">
        <DifferenceSection />
      </div>
      <RisksSection />
      <ForYouSection />
      <WhatYouGetSection />
      <div id="programs">
        <ProgramsSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
