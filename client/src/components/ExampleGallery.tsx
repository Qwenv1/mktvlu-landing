import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { examples, money, type ProductExample } from "@/lib/examples";
import { Reveal, scrollToSection } from "./Reveal";
import { ScrollPhoto, TextReveal } from "./SiteMotion";

export function ExampleGallery({ onSelect }: { onSelect: (example: ProductExample) => void }) {
  const reduced = useReducedMotion();
  return (
    <section id="examples" className="example-section section-space">
      <div className="page-width">
        <Reveal className="section-heading gallery-heading">
          <div><p className="eyebrow">A world of secondhand</p><h2><TextReveal lines={["See the object.", "Understand the value."]} mutedLast /></h2></div>
          <p>From the phone in your pocket to the chair in your studio. Explore what a clearer price looks like.</p>
        </Reveal>
        <div className="example-grid">
          {examples.map((example, index) => (
            <Reveal key={example.id} delay={index * 0.12}>
              <motion.button className="example-card" onClick={() => { onSelect(example); scrollToSection("product"); }} aria-label={`Explore ${example.name} example`}
                whileHover={reduced ? undefined : { y: -7 }} whileTap={reduced ? undefined : { scale: 0.985 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}>
                <div className="example-photo">
                  <ScrollPhoto src={example.image} alt={example.alt} width={700} height={800} position={example.position} travel={18 + index * 3} />
                  <span className="example-category">{example.category}</span><span className="example-arrow"><ArrowUpRight size={18} /></span>
                </div>
                <div className="example-description"><h3>{example.name}</h3><div><span>Example reference</span><strong>{money(example.price)}</strong></div></div>
              </motion.button>
            </Reveal>
          ))}
        </div>
        <p className="example-disclaimer">Illustrative references in CAD. Real valuations depend on model, condition, location, and available evidence.</p>
      </div>
    </section>
  );
}
