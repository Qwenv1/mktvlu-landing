import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleSphere from "@/components/ParticleSphere";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Sphere background - Enhanced version */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[60px]">
        <ParticleSphere 
          size={500} 
          interactive={true} 
          showText={false} 
          className="opacity-35 pointer-events-auto" 
        />
      </div>
      
      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pointer-events-none">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="pointer-events-auto"
        >
          <SectionLabel>Market Intelligence 2.0</SectionLabel>
        </motion.div>
        
        <motion.h1 
          className="font-serif italic text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
        >
          <span className="text-white">Bridging the</span>
          <br />
          <span className="text-mint-gradient">Information Gap.</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/60 max-w-[480px] mx-auto mb-10 leading-relaxed font-sans"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } }
          }}
        >
          See through market noise. Find the real price — not the listed one.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }
          }}
        >
          <Button size="lg" className="rounded-full h-12 px-8 bg-mint hover:bg-mint/90 text-black font-medium group">
            <a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Launch App <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-12 px-8 border-white/20 bg-transparent text-white hover:bg-white/10">
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}