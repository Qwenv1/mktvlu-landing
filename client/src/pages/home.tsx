import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { CinematicIntro } from "@/components/CinematicIntro";
import { ExampleGallery } from "@/components/ExampleGallery";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductShowcase } from "@/components/ProductShowcase";
import { WorkflowShowcase } from "@/components/WorkflowShowcase";
import { Technology } from "@/components/Technology";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { examples } from "@/lib/examples";
import { ReadingProgress } from "@/components/SiteMotion";

export default function Home() {
  const [example, setExample] = useState(examples[0]);
  return (
    <MotionConfig reducedMotion="user">
      <div className="landing-page">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <ReadingProgress />
        <main id="main-content">
          <CinematicIntro />
          <ExampleGallery onSelect={setExample} />
          <ProductShowcase example={example} onSelect={setExample} />
          <WorkflowShowcase />
          <HowItWorks />
          <Technology />
          <CTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
