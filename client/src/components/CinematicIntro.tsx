import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Camera, Check, ScanLine } from "lucide-react";
import { editorialEase, scrollToSection } from "./Reveal";
import { AnimatedValue } from "./SiteMotion";
import { examples, money } from "@/lib/examples";

const golf = examples[0];
const steps = [
  { label: "Capture", title: "Start with what you see.", body: "Point your camera at it. MKTVLU maps the item and works out the details that matter." },
  { label: "Match", title: "The market adds context.", body: "Comparable listings, condition, and location refine the picture and filter the outliers." },
  { label: "Value", title: "A grounded market reference.", body: "A reference price, a realistic range, and the evidence behind it. Ready for your next move." },
];

export function CinematicIntro() {
  const wrapper = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start start", "end end"] });
  const sceneScale = useTransform(scrollYProgress, [0, .34], [1, 1.14]);
  const sceneBlur = useTransform(scrollYProgress, [0, .34], ["blur(0px)", "blur(10px)"]);
  const veilOpacity = useTransform(scrollYProgress, [0, .78, 1], [.18, .55, .78]);
  const headlineOpacity = useTransform(scrollYProgress, [0, .08, .18], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, .18], [0, -70]);
  const phoneY = useTransform(scrollYProgress, [0, .18], [160, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0, .08, .86, .96], [.25, 1, 1, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, .3, .86, .96], [.86, 1, 1, .7]);
  const phoneX = useTransform(scrollYProgress, [.78, .96], [0, -220]);
  const phoneRotate = useTransform(scrollYProgress, [0, .18], [18, 0]);
  const captionOpacity = useTransform(scrollYProgress, [.12, .2, .78, .86], [0, 1, 1, 0]);
  const captionY = useTransform(scrollYProgress, [.12, .2], [24, 0]);
  const reportOpacity = useTransform(scrollYProgress, [.78, .86], [0, 1]);
  const reportScale = useTransform(scrollYProgress, [.78, .96], [.72, 1]);
  const reportY = useTransform(scrollYProgress, [.78, .96], [70, 0]);
  const ironsY = useTransform(scrollYProgress, [0, .3], [0, -35]);
  const ironsRotate = useTransform(scrollYProgress, [0, .3], [-3, 0]);

  useMotionValueEvent(scrollYProgress, "change", value => {
    setStep(value < .405 ? 0 : value < .605 ? 1 : 2);
  });

  return (
    <section id="top" ref={wrapper} className="cinematic-intro">
      <div className="cinematic-stage">
        <motion.div className="cinematic-studio" style={reduced ? undefined : { scale: sceneScale, filter: sceneBlur }} aria-hidden="true">
          <div className="studio-spotlight" />
          <div className="studio-floor" />
          <motion.img className="studio-irons" src="/images/golf-iron-set.png" alt="" width={900} height={1200} style={reduced ? undefined : { y: ironsY, rotate: ironsRotate }} />
        </motion.div>
        <motion.div className="cinematic-veil" style={reduced ? undefined : { opacity: veilOpacity }} aria-hidden="true" />
        <div className="page-width cinematic-content">
          <motion.div className="cinematic-headline" style={reduced ? undefined : { opacity: headlineOpacity, y: headlineY }}>
            <p className="eyebrow">A better perspective on secondhand.</p>
            <h1>Good things.<br /><em>The right price.</em></h1>
            <p className="cinematic-lede">Every listing has a price. Few have an answer. MKTVLU identifies the item in front of you, compares its exact configuration and condition with relevant resale evidence, and gives buyers and sellers a clearer reference.</p>
            <div className="cinematic-actions">
              <a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Value an item <ArrowUpRight size={17} /></a>
              <button className="action-text" onClick={() => scrollToSection("product")}>See the valuation <ArrowDown size={16} /></button>
            </div>
          </motion.div>

          <motion.div className="cinematic-caption" style={reduced ? undefined : { opacity: captionOpacity, y: captionY }}>
            <div className="caption-rail" aria-hidden="true">{steps.map((item, index) => <motion.span key={item.label} animate={{ scaleX: index <= step ? 1 : 0 }} transition={{ duration: .45, ease: editorialEase }} />)}</div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: .4, ease: editorialEase }}>
                <span className="caption-step">0{step + 1} / {steps[step].label}</span>
                <h2>{steps[step].title}</h2>
                <p>{steps[step].body}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div className="cinematic-phone" style={reduced ? undefined : { y: phoneY, x: phoneX, scale: phoneScale, opacity: phoneOpacity, rotateX: phoneRotate }}>
            <div className="phone-shell">
              <div className="phone-screen">
                <div className="phone-island" />
                <div className="phone-app-bar"><span className="phone-wordmark">MKT<span>VLU</span></span><span>⋮</span></div>
                <AnimatePresence mode="wait" initial={false}>
                  {step === 0 && <motion.div className="phone-state phone-scan" key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
                    <div className="phone-screen-label">SCAN / 001</div>
                    <img src={golf.image} alt="" />
                    <motion.span className="phone-scan-line" initial={{ y: -90 }} animate={{ y: 140 }} transition={{ duration: 1.2, repeat: 1, ease: "easeInOut" }} />
                    <div className="phone-scan-footer"><ScanLine size={16} /><span>Finding the details that matter</span></div>
                  </motion.div>}
                  {step === 1 && <motion.div className="phone-state phone-match" key="match" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
                    <span className="phone-state-kicker">✓ IDENTIFIED</span><h3>TaylorMade P770 / P7MB irons</h3><div className="phone-chips"><span>4–PW</span><span>7 clubs</span><span>Steel shafts</span><span>Good</span></div>
                    <p className="phone-listing-label">COMPARABLE LISTINGS</p>{["Sold · 5 days ago · Oakville", "Listed · this week · Toronto", "Sold · 2 weeks ago · Calgary"].map((listing, index) => <motion.div className="phone-listing" key={listing} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .12 }}><span>{listing}</span><strong>{money([1080, 975, 940][index])}</strong></motion.div>)}
                  </motion.div>}
                  {step === 2 && <motion.div className="phone-state phone-value" key="value" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
                    <span className="phone-state-kicker">MARKET REFERENCE</span><h3>TaylorMade P770 / P7MB</h3><p>4–PW · Steel · RH · Good</p><strong className="phone-price"><AnimatedValue value={999} format={money} /> <small>CAD</small></strong><div className="phone-range"><span>{money(890)}</span><div><i /></div><span>{money(1120)}</span></div><div className="phone-confidence"><Check size={14} />88% confidence · 24 comparable listings</div><a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">View full report <ArrowUpRight size={13} /></a></motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div className="cinematic-report" style={reduced ? undefined : { opacity: reportOpacity, scale: reportScale, y: reportY }}>
            <div className="report-card-header"><span>MARKET REPORT</span><span>ILLUSTRATIVE · CAD</span></div>
            <div className="report-card-grid"><div><p className="report-card-kicker">TaylorMade P770 / P7MB iron set</p><h2>A grounded market reference.</h2><p>4–PW · Steel shafts · Right-handed · Good condition</p><span className="report-card-meta">24 comparable listings · 2 outliers removed · Updated today</span></div><div className="report-card-value"><span>Market reference</span><strong><AnimatedValue value={999} format={money} /></strong><b>● 88% confidence</b><div className="report-card-range"><span>{money(890)}</span><div><i /></div><span>{money(1120)}</span></div></div></div>
            <div className="report-card-actions"><button className="action-text" onClick={() => scrollToSection("product")}>Open the full report <ArrowDown size={14} /></button><a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Value an item <ArrowUpRight size={15} /></a></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
