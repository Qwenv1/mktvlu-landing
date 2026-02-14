import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export function Personas() {
  const personas = [
    {
      role: "Buyers",
      desc: "Know the real price before you buy. Stop overpaying on Facebook Marketplace.",
      accent: "bg-mint"
    },
    {
      role: "Sellers",
      desc: "Price competitively. List at the optimal price to sell faster.",
      accent: "bg-blue-400"
    },
    {
      role: "Platforms",
      desc: "Add pricing legitimacy to your listings. Increase transaction velocity.",
      accent: "bg-purple-400",
      sub: "Future"
    }
  ];

  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
            <SectionLabel>USE CASES</SectionLabel>
        </motion.div>
        <motion.h2 
            className="font-serif italic text-4xl md:text-5xl mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
          For everyone in the market.
        </motion.h2>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        {personas.map((persona, i) => (
          <GlassCard key={i} className="relative overflow-hidden p-8 flex flex-col gap-4">
            <div className={cn("absolute top-0 left-0 right-0 h-[2px]", persona.accent)} />
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-3xl text-white">{persona.role}</h3>
              {persona.sub && (
                <span className="text-[10px] uppercase tracking-widest text-white/40">{persona.sub}</span>
              )}
            </div>
            <p className="text-white/60 leading-relaxed">
              {persona.desc}
            </p>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}