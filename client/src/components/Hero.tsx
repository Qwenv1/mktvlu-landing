import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Camera, Check, ScanSearch } from "lucide-react";
import { editorialEase, scrollToSection } from "./Reveal";
import { AnimatedValue } from "./SiteMotion";
import { money } from "@/lib/examples";

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [demoStage, setDemoStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  useEffect(() => {
    if (reduced) return;
    const timers = [
      window.setTimeout(() => setDemoStage(1), 1700),
      window.setTimeout(() => setDemoStage(2), 4100),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const activeStage = reduced ? 2 : demoStage;
  return (
    <section id="top" ref={hero} className="editorial-hero">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>A better perspective on secondhand.</motion.p>
          <h1 className="hero-title">
            {["Good things.", "The right price."].map((line, index) => (
              <span className="title-mask" key={line}>
                <motion.span initial={reduced ? false : { y: "110%" }} animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.12 + index * 0.1, ease: editorialEase }} className={index === 1 ? "muted-title" : ""}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: editorialEase }}>
            <p className="hero-description">Know what it’s worth. Before you buy. Before you sell. A photo is all it takes to find your market reference.</p>
            <div className="hero-actions">
              <a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Try MKTVLU <ArrowUpRight size={17} /></a>
              <button className="action-text" onClick={() => scrollToSection("examples")}>Explore the examples <ArrowDown size={16} /></button>
            </div>
            <p className="hero-footnote">Free to use. No account required.</p>
          </motion.div>
        </div>
        <motion.div className="hero-photograph" initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: editorialEase }}>
          <div className="hero-photo-crop">
            <motion.img src="/images/iphone-titanium.jpg" alt="A titanium iPhone 15 Pro, photographed in natural light" width={1400} height={933} fetchPriority="high"
              style={reduced ? undefined : { y: imageY, scale: imageScale }} />
          </div>
          <div className="photo-caption"><span>Every object has a market.</span><span>01 / 04</span></div>
          <motion.div className="hero-process-card" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.65, ease: editorialEase }}>
            <div className="hero-process-header"><span>MktVlu / Live example</span><span className="sample-label">Illustrative · USD</span></div>
            <div className="hero-process-steps" aria-label="MktVlu valuation process">
              {["Capture", "Match", "Value"].map((label, index) => <div className={index === activeStage ? "hero-process-step active" : "hero-process-step"} key={label}>
                <span>{String(index + 1).padStart(2, "0")}</span>{label}
                <motion.i className="hero-process-step-fill" initial={false} animate={{ scaleX: index <= activeStage ? 1 : 0 }} transition={{ duration: .45, ease: editorialEase }} />
              </div>)}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {activeStage === 0 && <motion.div className="hero-process-body" key="capture" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .32, ease: editorialEase }}>
                <div className="hero-process-icon"><Camera size={18} strokeWidth={1.5} /></div>
                <div className="hero-process-copy"><strong>Photo received</strong><span>iPhone 15 Pro · Natural Titanium</span></div>
                <motion.div className="hero-scan-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: .15, ease: editorialEase }} />
                <p>Recognizing model and configuration</p>
              </motion.div>}
              {activeStage === 1 && <motion.div className="hero-process-body hero-evidence" key="match" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .32, ease: editorialEase }}>
                <div className="hero-process-icon"><ScanSearch size={18} strokeWidth={1.5} /></div>
                <div className="hero-evidence-list">{["Matching model", "Condition considered", "42 listings compared"].map((label, index) => <motion.div key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .12, duration: .3, ease: editorialEase }}><span>{label}</span><Check size={14} /></motion.div>)}</div>
              </motion.div>}
              {activeStage === 2 && <motion.div className="hero-process-body hero-value" key="value" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .32, ease: editorialEase }}>
                <div><span className="hero-value-label">Market reference</span><strong><AnimatedValue value={687} format={money} /></strong></div>
                <div className="hero-value-meta"><span>iPhone 15 Pro<br /><em>256GB · Good condition</em></span><span className="hero-confidence">94% confidence</span></div>
                <div className="hero-value-range"><span>$610</span><div><motion.i initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .7, delay: .18, ease: editorialEase }} /></div><span>$760</span></div>
              </motion.div>}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
      <div className="page-width hero-bottom"><span>Photo <b>→</b> evidence <b>→</b> perspective.</span><span>For buyers, sellers, and the things in between. <ArrowDown size={14} /></span></div>
    </section>
  );
}
