import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, stagger } from "@/lib/animations";
import { GlassCard } from "@/components/ui/GlassCard";
import { Camera, Globe, BarChart3, MessageSquare, Radar, Box } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Camera className="w-6 h-6 text-mint" />,
      title: "AI Camera Scanning",
      desc: "Point at any product. Our vision AI identifies brand, model, configuration, and condition from a single photo."
    },
    {
      icon: <Globe className="w-6 h-6 text-mint" />,
      title: "Cross-Platform Pricing",
      desc: "Aggregates listings from eBay, Facebook Marketplace, Swappa, Craigslist, Kijiji, OfferUp, and more."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-mint" />,
      title: "Statistical Filtering",
      desc: "MAD outlier removal, condition adjustment, and time-decay weighting ensure the MRP reflects true market value."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-mint" />,
      title: "Negotiation Mode",
      desc: "Generate data-backed counter-offers. Choose your strategy — friendly, firm, or data-driven — and share directly."
    },
    {
      icon: <Radar className="w-6 h-6 text-mint" />,
      title: "Price DNA Scoring",
      desc: "Multi-axis radar showing confidence, stability, liquidity, demand, retention, and overall value score."
    },
    {
      icon: <Box className="w-6 h-6 text-mint" />,
      title: "Browser Extension",
      desc: "See real-time MRP overlays while browsing Facebook Marketplace, eBay, and Craigslist.",
      badge: "Coming Soon"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
            <SectionLabel>CAPABILITIES</SectionLabel>
        </motion.div>
        <motion.h2 
            className="font-serif italic text-4xl md:text-5xl mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
        >
          Built for the resale economy.
        </motion.h2>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
      >
        {features.map((feature, i) => (
          <GlassCard key={i} className="group p-8">
            <div className="mb-6 w-12 h-12 rounded-xl bg-mint/10 flex items-center justify-center border border-mint/20 group-hover:bg-mint/20 transition-colors">
              {feature.icon}
            </div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif text-2xl text-white">{feature.title}</h3>
              {feature.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/60 border border-white/10 uppercase tracking-wide">
                  {feature.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {feature.desc}
            </p>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}