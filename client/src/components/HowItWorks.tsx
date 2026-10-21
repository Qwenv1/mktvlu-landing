import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Camera, Check, ArrowUpRight } from "lucide-react";
import { Reveal, editorialEase } from "./Reveal";
import { AnimatedValue, TextReveal } from "./SiteMotion";
import { money } from "@/lib/examples";

const chapters = [
  { number: "01", title: "Start with what you see.", text: "Take a photo or describe the item. The details that matter — brand, model, and configuration — become the starting point." },
  { number: "02", title: "Let the market add context.", text: "Comparable listings help build the picture. Condition, location, and available evidence refine the result." },
  { number: "03", title: "Make your next move.", text: "Use the reference price and range to judge an asking price, set a listing, or begin a conversation." },
];

export function HowItWorks() {
  const story = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: story, offset: ["start 30%", "end 80%"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.13]);
  useMotionValueEvent(scrollYProgress, "change", value => setStage(Math.min(2, Math.floor(value * 3))));
  return (
    <section id="how-it-works" className="process-section section-space">
      <div className="page-width">
        <Reveal className="section-heading"><div><p className="eyebrow">From a photo to perspective</p><h2><TextReveal lines={["Simple on the surface.", "Considered underneath."]} mutedLast /></h2></div><p>Three steps between seeing something you like and knowing where you stand.</p></Reveal>
        <div className="process-story" ref={story}>
          <div className="process-sticky">
            <div className="process-scene">
              <motion.img src="/images/iphone-titanium.jpg" alt="Titanium iPhone used to demonstrate the valuation process" loading="lazy" width={700} height={800} style={reduced ? undefined : { scale: photoScale }} />
              <div className="scene-label"><span>MKTVLU / A closer look</span><span>Example</span></div>
              <div className="process-scene-panel">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={stage} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.32, ease: editorialEase }}>
                    {stage === 0 && <><Camera size={24} strokeWidth={1.4} /><h3>It starts with a photo.</h3><p>iPhone 15 Pro · Natural Titanium</p></>}
                    {stage === 1 && <><p className="scene-panel-label">Comparable evidence</p>{["Matching model", "Condition considered", "Price range compared"].map((label, index) =>
                      <motion.div className="scene-comparable" key={label} initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.14, ease: editorialEase }}><span>{label}</span><Check size={15} /></motion.div>
                    )}</>}
                    {stage === 2 && <><p className="scene-panel-label">Your market reference</p><div className="scene-price"><AnimatedValue value={999} format={money} /><span>CAD</span></div><p>Example range: $890–$1,120</p></>}
                  </motion.div>
                </AnimatePresence>
                <div className="scene-step-track">{chapters.map((chapter,index)=><span key={chapter.number} className={stage >= index ? "complete" : ""} />)}</div>
              </div>
            </div>
          </div>
          <div className="process-chapters">{chapters.map((chapter,index)=><Reveal className={"process-chapter " + (stage === index ? "current" : "")} key={chapter.number}><span className="chapter-number">{chapter.number}</span><h3>{chapter.title}</h3><p>{chapter.text}</p>{index === 2 && <a className="action-text" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Try it with your own item <ArrowUpRight size={16} /></a>}</Reveal>)}</div>
        </div>
      </div>
    </section>
  );
}
