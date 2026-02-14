import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

export function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="font-serif italic text-5xl md:text-7xl mb-6">
          Know what anything is worth.
        </h2>
        <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Available now on mobile web. Point your camera and get instant valuations.
        </p>
        
        <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="h-16 px-12 rounded-full text-lg bg-mint hover:bg-mint/90 text-black font-semibold shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all transform hover:scale-[1.02]">
                <a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">
                    Launch MKTVLU
                </a>
            </Button>
            <span className="text-xs text-white/40 uppercase tracking-wider">Free to use. No account required.</span>
        </div>
      </motion.div>
    </section>
  );
}