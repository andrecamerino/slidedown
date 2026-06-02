import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/features/Features";
import { EnvironmentalSection } from "@/components/landing/enironmental/EnvironmentalSection";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0f] flex flex-col gap-20">
      <Hero />
      <Features />
      <EnvironmentalSection />
      <HowItWorks />
    </div>
  );
}
