import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";
import { VLUBadge } from "@/components/ui/VLUBadge";
import { GlassMintCard } from "@/components/ui/GlassMintCard";
import { ShieldCheck, Globe, BarChart3 } from "lucide-react";

export function VLUCertified() {
  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionLabel>TRUST LAYER</SectionLabel>
        </motion.div>
        
        <motion.h2 
          className="font-serif italic text-4xl md:text-5xl mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          VLU Certified.
        </motion.h2>
        
        <motion.p 
          className="text-white/60 max-w-2xl text-lg mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Not every listing is priced fairly. VLU Certified is our proprietary verification standard — a stamp that means a product's price has been cross-referenced against real market data and falls within a statistically validated range.
        </motion.p>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16"
        >
          <VLUBadge />
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <GlassMintCard>
          <div className="mb-4 w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center text-mint">
            <BarChart3 size={20} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Price Range Validation</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Listed price falls within the statistically filtered MRP range (10th to 90th percentile).
          </p>
        </GlassMintCard>

        <GlassMintCard>
          <div className="mb-4 w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center text-mint">
            <Globe size={20} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Source Diversity</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Price verified against 3+ independent marketplace sources.
          </p>
        </GlassMintCard>

        <GlassMintCard>
          <div className="mb-4 w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center text-mint">
            <ShieldCheck size={20} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Confidence Threshold</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            MRP confidence score exceeds 75%, ensuring sufficient market data.
          </p>
        </GlassMintCard>
      </motion.div>
    </section>
  );
}