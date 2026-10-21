import { useEffect, useId, useRef, useState } from "react";
import {
  animate, AnimatePresence, motion, useInView, useMotionValue,
  useReducedMotion, useScroll, useSpring, useTransform,
} from "framer-motion";
import { Plus } from "lucide-react";
import { editorialEase } from "./Reveal";

export function ReadingProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  if (reduced) return null;
  return <motion.div className="reading-progress" style={{ scaleX: progress }} aria-hidden="true" />;
}

export function TextReveal({ lines, mutedLast = false }: { lines: string[]; mutedLast?: boolean }) {
  const element = useRef<HTMLSpanElement>(null);
  const entered = useInView(element, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  return (
    <span ref={element} className="motion-heading">
      {lines.map((line, index) => (
        <span className="motion-heading-mask" key={line}>
          <motion.span className={mutedLast && index === lines.length - 1 ? "motion-heading-muted" : ""}
            initial={reduced ? false : { y: "110%", opacity: 0 }}
            animate={{ y: reduced || entered ? "0%" : "110%", opacity: reduced || entered ? 1 : 0 }}
            transition={{ duration: 0.85, delay: reduced ? 0 : index * 0.14, ease: editorialEase }}>
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function ScrollPhoto({ src, alt, width, height, position = "50% 50%", travel = 25 }: {
  src: string; alt: string; width: number; height: number; position?: string; travel?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.05]);
  return (
    <motion.div ref={frame} className="scroll-photo"
      initial={reduced ? false : { clipPath: "inset(12% 0 12% 0 round 8px)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0 round 0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: editorialEase }}>
      <motion.img src={src} alt={alt} width={width} height={height} loading="lazy"
        style={reduced ? { objectPosition: position } : { y, scale, objectPosition: position }} />
    </motion.div>
  );
}

const defaultNumberFormat = (value: number) => String(Math.round(value));

export function AnimatedValue({ value, format = defaultNumberFormat }: { value: number; format?: (value: number) => string }) {
  const element = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const entered = useInView(element, { once: true, amount: 0.3 });
  const number = useMotionValue(reduced ? value : 0);
  const display = useTransform(number, current => format(current));
  useEffect(() => {
    if (reduced) { number.set(value); return; }
    if (!entered) return;
    const controls = animate(number, value, { duration: 0.95, ease: editorialEase });
    return () => controls.stop();
  }, [entered, number, reduced, value]);
  return <span ref={element} className="animated-value"><motion.span aria-hidden="true">{display}</motion.span><span className="sr-only">{format(value)}</span></span>;
}

export function DrawLine({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.span className="motion-rule" aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay, ease: editorialEase }} />;
}

export function MotionAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const id = useId();
  return (
    <div className="faq-item">
      <button className="faq-trigger" id={"question-" + id} aria-expanded={open} aria-controls={"answer-" + id} onClick={() => setOpen(!open)}>
        {question}<motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }}><Plus size={19} strokeWidth={1.5} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div className="faq-answer" id={"answer-" + id} role="region" aria-labelledby={"question-" + id}
          initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
          exit={reduced ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35, ease: editorialEase }}>
          <p>{answer}</p>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}
