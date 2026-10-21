import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

export function WorkflowShowcase() {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

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

  return (
    <section id="in-the-app" className="workflow-section section-space">
      <div className="page-width workflow-layout">
        <Reveal>
          <div className="workflow-film">
            <video ref={video} src="/media/workflow-showcase.mp4" poster="/opengraph.jpg" muted loop playsInline preload={reduced ? "none" : "metadata"} aria-label="MKTVLU workflow in the app" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
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
