import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

export function WorkflowShowcase() {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [showBrandIntro, setShowBrandIntro] = useState(false);
  const brandIntroStarted = useRef(false);
  const brandIntroTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (brandIntroTimer.current) window.clearTimeout(brandIntroTimer.current);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void element.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        element.pause();
        setPlaying(false);
      }
    }, { rootMargin: "160px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced]);

  const togglePlayback = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      void element.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      element.pause();
      setPlaying(false);
    }
  };

  const handlePlay = () => {
    setPlaying(true);
    if (reduced || brandIntroStarted.current) return;
    brandIntroStarted.current = true;
    setShowBrandIntro(true);
    brandIntroTimer.current = window.setTimeout(() => setShowBrandIntro(false), 2400);
  };

  return (
    <section id="in-the-app" className="workflow-section section-space">
      <div className="page-width workflow-layout">
        <Reveal>
          <div className="workflow-film">
            <video ref={video} src="/media/workflow-showcase.mp4" poster="/opengraph.jpg" muted loop playsInline preload={reduced ? "none" : "metadata"} aria-label="MKTVLU workflow in the app" onPlay={handlePlay} onPause={() => setPlaying(false)} />
            <AnimatePresence>
              {showBrandIntro && <motion.div className="workflow-brand-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: 0.55 }} aria-hidden="true">
                <motion.img src="/icon-180.png" alt="" initial={{ opacity: 0, scale: 0.78, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} />
                <motion.div className="workflow-brand-wordmark" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}>mkt<span>·</span>vlu</motion.div>
                <motion.div className="workflow-brand-line" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.75, ease: "easeOut" }}>Bridging the <em>information gap.</em></motion.div>
              </motion.div>}
            </AnimatePresence>
            <button className="workflow-control" type="button" onClick={togglePlayback} aria-label={playing ? "Pause the workflow film" : "Play the workflow film"}>
              {playing ? <Pause size={14} /> : <Play size={14} />}
              <span>{playing ? "Pause film" : "Play film"}</span>
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="workflow-copy">
          <p className="eyebrow">In the app</p>
          <h2>From a glance<br /><em>to a grounded answer.</em></h2>
          <p>MKTVLU turns the moment of “what is this worth?” into a short, legible sequence: identify the object, compare the market, then see the price with the evidence attached.</p>
          <a className="action-text" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Try the live app <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>
    </section>
  );
}
