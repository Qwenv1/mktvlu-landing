import { motion } from "framer-motion";
import { ArrowRight, Code2, Globe, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import darkTexture from "@/assets/images/dark-texture.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20 overflow-x-hidden">
      {/* Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-50"
        style={{ backgroundImage: `url(${darkTexture})`, backgroundSize: 'cover' }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full backdrop-blur-sm"
      >
        <div className="font-serif text-2xl tracking-tight">Lumina</div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Manifesto</a>
          <a href="#" className="hover:text-foreground transition-colors">Capabilities</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-white transition-all">
          Get Access
        </Button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="relative z-20 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-6 flex justify-center">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">
              The Next Evolution
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8"
          >
            Digital <br />
            <span className="text-white/50 italic">Presence</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Crafting interfaces that bridge the gap between utility and art. 
            Experience the new standard for web development.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="rounded-full h-14 px-8 text-base bg-white text-black hover:bg-white/90">
              Start Building <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full h-14 px-8 text-base hover:bg-white/5">
              Read Documentation
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-20 py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Designed for speed,<br />engineered for precision.</h2>
          <div className="h-px w-32 bg-white/20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Lightning Fast",
              desc: "Optimized for sub-millisecond rendering times with zero configuration needed."
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Secure by Default",
              desc: "Enterprise-grade security baked into every component, ensuring your data stays safe."
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "Global Edge",
              desc: "Deploy instantly to 35+ regions worldwide with automatic CDN propagation."
            },
            {
              icon: <Code2 className="w-6 h-6" />,
              title: "Type Safe",
              desc: "Built with TypeScript from the ground up for a developer experience that just works."
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "AI Powered",
              desc: "Integrated generative capabilities to accelerate your content creation workflow."
            },
            {
              icon: <Globe className="w-6 h-6" />, // Reusing icon for visual balance
              title: "Open Source",
              desc: "Join a thriving community of contributors shaping the future of the web."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500"
            >
              <div className="mb-6 text-white/70 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote/Divider */}
      <section className="py-40 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl leading-tight"
          >
            "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
          </motion.blockquote>
          <div className="mt-8 text-muted-foreground font-sans tracking-widest text-sm uppercase">Antoine de Saint-Exupéry</div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl mb-8">Ready to begin?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            Join thousands of developers building the future of the web today.
          </p>
          <Button size="lg" className="h-16 px-10 rounded-full text-lg bg-white text-black hover:bg-white/90">
            Get Started Now
          </Button>
          
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground max-w-7xl mx-auto">
            <p>&copy; 2024 Lumina Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}