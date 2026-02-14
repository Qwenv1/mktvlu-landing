import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Personas } from "@/components/Personas";
import { Technology } from "@/components/Technology";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-mint/30 selection:text-white overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Personas />
      <Technology />
      <Roadmap />
      <CTA />
      <Footer />
    </div>
  );
}