import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { GlassCard } from "@/components/ui/GlassCard";
import { VLUBadge } from "@/components/ui/VLUBadge";
import { ArrowLeft, Share, MoreHorizontal, ShoppingCart, Info, TrendingUp } from "lucide-react";

export function ProductShowcase() {
  return (
    <section id="product" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionLabel>THE PRODUCT</SectionLabel>
        </motion.div>
        
        <motion.h2 
          className="font-serif italic text-4xl md:text-5xl mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Everything you need to know. One scan.
        </motion.h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
        {/* Left Column - Phone Mockup */}
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          animate={{
            y: [0, -6, 0],
            transition: {
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        >
          {/* Glow behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-mint/5 blur-[80px] rounded-full pointer-events-none" />
          
          <PhoneFrame>
            {/* Mock App UI */}
            <div className="flex flex-col h-full bg-black p-4 pt-12 text-white">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <ArrowLeft size={20} className="text-white/60" />
                <div className="flex gap-4">
                  <Share size={20} className="text-white/60" />
                  <MoreHorizontal size={20} className="text-white/60" />
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-xl font-semibold leading-tight w-2/3">iPhone 15 Pro Max</h1>
                  <VLUBadge size="sm" />
                </div>
                <p className="text-sm text-white/40">256GB · Natural Titanium · Good</p>
              </div>

              {/* MRP Card */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-white/40 uppercase tracking-wider">Market Reference Price</span>
                  <Info size={12} className="text-white/20" />
                </div>
                <div className="text-4xl font-serif italic text-mint mb-3">$987</div>
                
                {/* Mini Chart */}
                <div className="h-12 w-full flex items-end gap-1 mb-3 opacity-80">
                  {/* Simplified SVG chart rep */}
                  <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0 35 L10 32 L20 34 L30 25 L40 28 L50 20 L60 22 L70 15 L80 18 L90 10 L100 12" fill="none" stroke="#34D399" strokeWidth="2" />
                    <path d="M0 35 L100 35" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 2" />
                  </svg>
                </div>
                
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>Low: $820</span>
                  <span>High: $1,140</span>
                </div>
              </div>

              {/* Condition */}
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1.5 rounded-lg bg-mint/10 text-mint text-xs font-medium border border-mint/20">Good</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs border border-white/5">Fair</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs border border-white/5">Poor</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-auto">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] text-white/40 uppercase mb-1">Listings</div>
                  <div className="text-lg font-medium">42</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] text-white/40 uppercase mb-1">Confidence</div>
                  <div className="text-lg font-medium text-mint">94%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="py-3 rounded-full bg-white/10 text-white font-medium text-sm">Sell</button>
                <button className="py-3 rounded-full bg-mint text-black font-medium text-sm">Buy</button>
              </div>
            </div>
          </PhoneFrame>
        </motion.div>

        {/* Right Column - Exploded Breakdown */}
        <motion.div 
          className="flex flex-col gap-4 max-w-md w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            {
              id: "01",
              title: "Market Reference Price",
              desc: "The statistically filtered average across all marketplaces. Your single source of truth.",
              visual: <span className="text-mint font-serif italic text-lg">$987</span>
            },
            {
              id: "02",
              title: "Price Range & Chart",
              desc: "Floor to ceiling range with a 30-day price trend showing market direction.",
              visual: <TrendingUp size={18} className="text-white/60" />
            },
            {
              id: "03",
              title: "Condition Assessment",
              desc: "AI-detected condition with price adjustments. Good, Fair, or Poor — each with its own MRP.",
              visual: <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-mint" /><span className="w-2 h-2 rounded-full bg-yellow-500/50" /><span className="w-2 h-2 rounded-full bg-white/20" /></div>
            },
            {
              id: "04",
              title: "Evidence & Sources",
              desc: "See exactly how many listings were analyzed and from which platforms.",
              visual: <span className="text-[10px] text-white/60">42 sources</span>
            },
            {
              id: "05",
              title: "Price DNA",
              desc: "Multi-axis radar scoring confidence, stability, liquidity, demand, and retention.",
              visual: <div className="w-5 h-5 border border-white/20 rotate-45" />
            },
            {
              id: "06",
              title: "VLU Certified",
              desc: "When the listing price falls within the validated MRP range, it earns the VLU Certified stamp.",
              visual: <VLUBadge size="sm" />
            }
          ].map((item, i) => (
            <GlassCard key={i} className="p-4 flex gap-4 items-center group hover:bg-white/5 transition-colors" hoverEffect={false}>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/40 bg-black/20">
                {item.id}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  {item.visual}
                </div>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}