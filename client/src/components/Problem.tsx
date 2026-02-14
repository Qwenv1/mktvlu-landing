import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { CountUp } from "@/components/ui/CountUp";
import { fadeUp, stagger } from "@/lib/animations";

export function Problem() {
  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionLabel>THE PROBLEM</SectionLabel>
        </motion.div>
        
        <motion.h2 
          className="font-serif italic text-4xl md:text-5xl mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          The resale market is a $77B blind spot.
        </motion.h2>
        
        <motion.p 
          className="text-white/60 max-w-2xl text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Millions of transactions happen daily with no reliable price reference. Buyers overpay. Sellers underprice. Platforms lose velocity. Everyone loses.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <GlassCard>
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="font-serif text-5xl md:text-6xl text-white">
              $<CountUp to={77} suffix="B" />
            </div>
            <div className="text-sm text-white/40 font-medium uppercase tracking-wider">
              Secondhand market size
              <span className="block text-[11px] mt-1 opacity-60 normal-case tracking-normal">Source: thredUP Resale Report</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="font-serif text-5xl md:text-6xl text-white">
              <CountUp to={36.2} decimals={1} suffix="M" />
            </div>
            <div className="text-sm text-white/40 font-medium uppercase tracking-wider">
              New sellers entered in 2020 alone
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="font-serif text-5xl md:text-6xl text-mint">
              <CountUp to={0} />
            </div>
            <div className="text-sm text-white/40 font-medium uppercase tracking-wider">
              Platforms offering unbiased cross-market pricing
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}