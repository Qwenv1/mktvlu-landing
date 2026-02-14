import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/animations";
import { GlassCard } from "@/components/ui/GlassCard";

export function Solution() {
  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionLabel>THE SOLUTION</SectionLabel>
        </motion.div>
        
        <motion.h2 
          className="font-serif italic text-4xl md:text-5xl mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          One number. Every marketplace.
        </motion.h2>
        
        <motion.p 
          className="text-white/60 max-w-2xl text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          The Market Reference Price (MRP) aggregates real-time and historical pricing across 10+ platforms, applies statistical filtering, and returns the true market value of any used product — adjusted for condition, configuration, and region.
        </motion.p>
      </div>

      <motion.div 
        className="max-w-md mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        animate={{
            y: [0, -4, 0],
            transition: {
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        }}
      >
        <GlassCard className="p-8 backdrop-blur-xl border-white/10 bg-white/[0.04]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-white">iPhone 15 Pro Max</h3>
                <p className="text-sm text-white/40">256GB · Good Condition</p>
              </div>
              <div className="px-2 py-1 rounded bg-white/5 text-[10px] uppercase tracking-wider text-white/40 border border-white/5">
                Valuated
              </div>
            </div>

            <div className="text-center py-4">
              <div className="text-mint font-serif italic text-6xl mb-2">$987</div>
              <div className="text-xs text-mint/60 uppercase tracking-widest font-semibold">Market Reference Price</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/40">
                <span>Floor $820</span>
                <span>Ceiling $1,140</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full relative overflow-hidden">
                <div className="absolute left-[30%] right-[30%] top-0 bottom-0 bg-mint/20 rounded-full"></div>
                <div className="absolute left-[45%] top-0 bottom-0 w-1 bg-mint rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[11px] text-white/50">42 listings</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[11px] text-white/50">4 platforms</span>
              <span className="px-3 py-1 bg-mint/10 text-mint rounded-full text-[11px]">94% confidence</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}