import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassMintCard } from "@/components/ui/GlassMintCard";
import { Button } from "@/components/ui/button";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export function PricingModal({ open, onClose }: PricingModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative glass-card max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/40 hover:text-white" />
            </button>

            <div className="text-center mb-10">
              <h2 className="font-serif italic text-4xl text-white mb-2">Pricing</h2>
              <p className="text-white/60">Choose the intelligence level you need.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Free Plan */}
              <GlassCard className="p-6 flex flex-col h-full relative overflow-hidden" hoverEffect={false}>
                <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Free</h3>
                  <div className="w-2 h-2 rounded-full bg-mint shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <div className="text-3xl font-serif text-white mb-6">$0</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {["AI Camera Scanning", "Text Search", "Full MRP Results", "VLU Certified Badge"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button disabled className="w-full bg-transparent border border-mint/30 text-mint hover:bg-mint/10 cursor-default opacity-60">
                  Current Plan
                </Button>
              </GlassCard>

              {/* Pro Plan */}
              <GlassMintCard className="p-6 flex flex-col h-full rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-mint text-black text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                  Coming Soon
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">Pro</h3>
                <div className="text-3xl font-serif text-white mb-6">TBD<span className="text-sm font-sans text-white/40 ml-1">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-2 text-sm text-white/80 font-medium">
                    <Check className="w-4 h-4 text-mint mt-0.5 shrink-0" />
                    Everything in Free
                  </li>
                  {["Advanced Analytics", "Price Tracking & Alerts", "Historical Charts", "Data Export", "Negotiation Insights"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-mint mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-mint text-black hover:bg-mint/90">
                  Get Notified
                </Button>
              </GlassMintCard>

              {/* API Plan */}
              <GlassCard className="p-6 flex flex-col h-full relative" hoverEffect={false}>
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">API</h3>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">B2B</span>
                </div>
                <div className="text-3xl font-serif text-white mb-6">Custom</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Pricing Engine Access", "VLU Badge Licensing", "Bulk Valuation Endpoints", "Data Feeds", "Custom Integrations"].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </GlassCard>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-white font-medium mb-1">Get notified when Pro launches</h4>
                <p className="text-sm text-white/40">Be the first to access advanced market intelligence tools.</p>
              </div>
              <div className="flex w-full md:w-auto max-w-sm gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-mint/50 flex-1 min-w-0"
                />
                <Button className="rounded-full bg-mint text-black hover:bg-mint/90 px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}