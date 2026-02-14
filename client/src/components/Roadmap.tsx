import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Roadmap() {
  const phases = [
    {
      title: "Phase 1 — Foundation",
      desc: "AI camera valuation + text search. Real-time MRP. Mobile web app.",
      status: "active"
    },
    {
      title: "Phase 2 — Expansion",
      desc: "Browser extension. Price tracking + alerts. Trend history.",
      status: "future"
    },
    {
      title: "Phase 3 — Intelligence",
      desc: "Pro subscription. Seller optimization engine. Enhanced analytics.",
      status: "future"
    },
    {
      title: "Phase 4 — Platform",
      desc: "B2B API. Avg Price Verified badge licensing. Data licensing.",
      status: "future"
    },
    {
      title: "Phase 5 — Scale",
      desc: "Cross-asset classes. Vehicle + real estate pricing. MRP Index reporting.",
      status: "future"
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
            <SectionLabel>VISION</SectionLabel>
        </motion.div>
        <motion.h2 
            className="font-serif italic text-4xl md:text-5xl mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
          The Bloomberg Terminal for physical goods.
        </motion.h2>
        <motion.p 
            className="text-white/60 max-w-2xl text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
          MKTVLU is building the independent price reference layer for the global resale economy.
        </motion.p>
      </div>

      <motion.div 
        className="max-w-3xl mx-auto pl-4 md:pl-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        <div className="relative border-l border-white/10 md:ml-6 space-y-12 py-4">
            {phases.map((phase, i) => (
                <motion.div key={i} variants={fadeUp} className="relative pl-8 md:pl-12">
                    <div className={cn(
                        "absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full border border-black",
                        phase.status === 'active' ? "bg-mint shadow-[0_0_10px_rgba(52,211,153,0.6)]" : "bg-transparent border-white/20"
                    )} />
                    
                    <h3 className={cn(
                        "font-medium text-lg mb-2",
                        phase.status === 'active' ? "text-white" : "text-white/60"
                    )}>
                        {phase.title}
                    </h3>
                    <p className="text-white/40 text-sm max-w-md">
                        {phase.desc}
                    </p>
                </motion.div>
            ))}
        </div>
      </motion.div>
    </section>
  );
}