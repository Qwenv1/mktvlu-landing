import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";
import { Camera, Cpu, Search, CheckCircle } from "lucide-react";
import ParticleSphere from "@/components/ParticleSphere";
import { CountUp } from "@/components/ui/CountUp";
import { fadeUp, stagger, flowDotAnimation } from "@/lib/animations";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const Connector = () => (
  <div className="hidden md:flex flex-1 h-[1px] bg-white/10 relative mx-4 self-center overflow-hidden">
    <motion.div 
      className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-mint shadow-[0_0_8px_rgba(52,211,153,0.8)]"
      variants={flowDotAnimation}
      animate="animate"
    />
  </div>
);

const MobileConnector = () => (
  <div className="md:hidden w-[1px] h-16 bg-white/10 relative mx-auto my-2 overflow-hidden">
    <motion.div 
      className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-mint shadow-[0_0_8px_rgba(52,211,153,0.8)]"
      animate={{
        top: ["0%", "100%"],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1]
      }}
    />
  </div>
);

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className="h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-[11px] text-mint uppercase tracking-widest font-semibold"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32 px-6 max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionLabel>HOW IT WORKS</SectionLabel>
        </motion.div>
        
        <motion.h2 
          className="font-serif italic text-4xl md:text-5xl mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Point. Scan. Know.
        </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch relative">
        {/* Stage 1: Capture */}
        <motion.div 
          className="flex-1 min-w-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <GlassCard className="h-full flex flex-col items-center text-center p-6 md:p-8">
            <div className="mb-6 relative w-24 h-24 flex items-center justify-center rounded-2xl border border-white/20 bg-black">
              {/* Brackets Animation */}
              <div className="absolute inset-2 border-x-2 border-white/30 rounded-lg animate-pulse" />
              <div className="absolute inset-2 border-y-2 border-white/30 rounded-lg animate-pulse" />
              <Camera className="w-8 h-8 text-white relative z-10" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Scan Any Product</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Point your camera at any product — electronics, watches, furniture, anything.
            </p>
          </GlassCard>
        </motion.div>

        <Connector />
        <MobileConnector />

        {/* Stage 2: Identify */}
        <motion.div 
          className="flex-1 min-w-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="h-full flex flex-col items-center text-center p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-40 opacity-20 pointer-events-none">
                 <ParticleSphere size={180} className="mx-auto -mt-10" />
            </div>
            <div className="mb-6 relative w-24 h-24 flex items-center justify-center rounded-full bg-mint/10 text-mint z-10">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">AI Identifies It</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Claude Vision AI recognizes brand, model, storage, color, and condition.
            </p>
            <TypewriterText texts={["Identifying product...", "Matching config...", "Analyzing condition..."]} />
          </GlassCard>
        </motion.div>

        <Connector />
        <MobileConnector />

        {/* Stage 3: Aggregate */}
        <motion.div 
          className="flex-1 min-w-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="h-full flex flex-col items-center text-center p-6 md:p-8">
            <div className="mb-6 relative w-24 h-24 flex items-center justify-center">
              <Search className="w-8 h-8 text-white mb-2" />
              {/* Animated pills stack effect - simulated with CSS or simple divs */}
              <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-1 opacity-50 blur-[1px]">
                 <span className="w-6 h-1 bg-white/40 rounded-full"/>
                 <span className="w-8 h-1 bg-white/40 rounded-full"/>
                 <span className="w-5 h-1 bg-white/40 rounded-full"/>
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Search Everything</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Real-time data from eBay, Facebook, Swappa, Craigslist, and more.
            </p>
          </GlassCard>
        </motion.div>

        <Connector />
        <MobileConnector />

        {/* Stage 4: Valuate */}
        <motion.div 
          className="flex-1 min-w-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="h-full flex flex-col items-center text-center p-6 md:p-8">
            <div className="mb-6 relative w-24 h-24 flex items-center justify-center rounded-full bg-mint text-black">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Get Your MRP</h3>
            <div className="text-3xl font-serif italic text-mint my-2">
              $<CountUp to={987} />
            </div>
            <motion.p 
              className="text-xs text-mint/80 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              94% Confidence
            </motion.p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}