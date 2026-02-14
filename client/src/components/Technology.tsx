import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger, flowDotAnimation } from "@/lib/animations";
import { GlassCard } from "@/components/ui/GlassCard";
import { Camera, Brain, Search, Filter, Database } from "lucide-react";

export function Technology() {
  return (
    <section id="technology" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
            <SectionLabel>UNDER THE HOOD</SectionLabel>
        </motion.div>
        <motion.h2 
            className="font-serif italic text-4xl md:text-5xl mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
          Intelligence layers, not just data.
        </motion.h2>
        <motion.p 
            className="text-white/60 max-w-2xl text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
          MKTVLU's pricing engine combines computer vision, real-time web aggregation, and statistical analysis into a single API call.
        </motion.p>
      </div>

      {/* Tech Pipeline Visual */}
      <motion.div 
        className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 mb-24 overflow-x-auto pb-8 md:pb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {[
          { icon: Camera, label: "Camera Input" },
          { icon: Brain, label: "Claude Vision AI" },
          { icon: Search, label: "Multi-Platform Search" },
          { icon: Filter, label: "MAD Filtering" },
          { icon: Database, label: "MRP Output" }
        ].map((node, i, arr) => (
            <div key={i} className="flex items-center contents md:flex">
                <motion.div 
                    variants={fadeUp}
                    className="flex flex-col items-center gap-3 min-w-[120px]"
                >
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-mint">
                        <node.icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wide text-center">{node.label}</span>
                </motion.div>
                
                {i < arr.length - 1 && (
                    <div className="hidden md:block w-16 h-[1px] bg-white/10 relative mx-2">
                         <motion.div 
                            className="absolute top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-mint"
                            variants={flowDotAnimation}
                            animate="animate"
                        />
                    </div>
                )}
                 {/* Mobile connector - downward arrow or simplified */}
                 {i < arr.length - 1 && (
                    <div className="block md:hidden w-full h-8 flex justify-center items-center">
                        <div className="w-[1px] h-full bg-white/10" />
                    </div>
                 )}
            </div>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <div className="space-y-3">
            <h3 className="font-serif text-2xl text-white">Evidence Selection</h3>
            <p className="text-sm text-white/60 leading-relaxed">
                Sold prices weighted over asking prices. Region-adjusted. Time-decayed with 30-day half-life.
            </p>
        </div>
        <div className="space-y-3">
            <h3 className="font-serif text-2xl text-white">Outlier Removal</h3>
            <p className="text-sm text-white/60 leading-relaxed">
                Median Absolute Deviation filtering removes statistical anomalies, fraud listings, and miscategorized items.
            </p>
        </div>
        <div className="space-y-3">
            <h3 className="font-serif text-2xl text-white">Confidence Scoring</h3>
            <p className="text-sm text-white/60 leading-relaxed">
                0-100 score based on evidence count, source diversity, price consistency, and data recency.
            </p>
        </div>
      </motion.div>
    </section>
  );
}