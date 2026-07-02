import { Hero } from "@/components/landing/hero";
import { FeaturesPreview } from "@/components/landing/features-preview";
import { ModulesPreview } from "@/components/landing/modules-preview";
import { VisionSection } from "@/components/landing/vision-section";
import { ArchitecturePreview } from "@/components/landing/architecture-preview";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesPreview />
      <ModulesPreview />
      <VisionSection />
      <ArchitecturePreview />
      <CTASection />
    </>
  );
}
