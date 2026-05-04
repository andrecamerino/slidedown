import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { EnvironmentalSection } from "@/components/landing/EnvironmentalSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0f] flex flex-col gap-20">
      <Hero />
      <Features />
      <EnvironmentalSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
