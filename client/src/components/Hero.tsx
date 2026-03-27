import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleSphere from "@/components/ParticleSphere";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SCAN_STAGES = [
  "Scanning listings",
  "Summarizing condition",
  "Filtering outliers",
  "Assembling price signal",
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);
  const [scanStageIndex, setScanStageIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroComplete(true);
      return;
    }

    const completeTimer = window.setTimeout(() => {
      setIntroComplete(true);
    }, 2200);

    return () => window.clearTimeout(completeTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || introComplete) return;

    const stepTimer = window.setInterval(() => {
      setScanStageIndex((prev) => (prev + 1) % SCAN_STAGES.length);
    }, 290);

    return () => window.clearInterval(stepTimer);
  }, [prefersReducedMotion, introComplete]);

  const withDelay = (delay: number) => (prefersReducedMotion ? 0 : delay);
  const showScanIntro = !prefersReducedMotion && !introComplete;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Sphere background - Enhanced version */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[60px]">
        <motion.div
          className="relative h-[500px] w-[500px]"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, scale: 0.92, filter: "blur(6px)" }
          }
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            delay: withDelay(0.15),
            duration: prefersReducedMotion ? 0.2 : 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ParticleSphere
            size={500}
            interactive={true}
            showText={false}
            className="opacity-35 pointer-events-auto"
          />

          {showScanIntro && (
            <>
              <motion.div
                className="pointer-events-none absolute left-[7%] right-[7%] top-0 h-[2px] bg-gradient-to-r from-transparent via-mint to-transparent shadow-[0_0_18px_rgba(52,211,153,0.65)]"
                initial={{ opacity: 0, y: 72 }}
                animate={{ opacity: [0, 1, 0.25, 0], y: [72, 222, 356, 420] }}
                transition={{
                  delay: 0.2,
                  duration: 1.02,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />

              <motion.div
                className="pointer-events-none absolute inset-7 rounded-full border border-mint/20"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: [0, 0.4, 0], scale: [0.98, 1.02, 1.06] }}
                transition={{ delay: 0.2, duration: 1.04, ease: "easeOut" }}
              />

              <motion.div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-8 rounded-full border border-mint/30 bg-black/40 px-4 py-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 1, 0.9, 0], y: [8, 0, 0, -2] }}
                transition={{ delay: 0.28, duration: 1.08, ease: "easeOut" }}
              >
                <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-mint/85">
                  {SCAN_STAGES[scanStageIndex]}
                </span>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pointer-events-none">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: withDelay(0.66),
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pointer-events-auto"
        >
          <SectionLabel>Market Intelligence 2.0</SectionLabel>
        </motion.div>

        <motion.h1
          className="font-serif italic text-6xl md:text-8xl leading-[0.9] tracking-tight mb-8"
        >
          <motion.span
            className="block text-white"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 26, clipPath: "inset(0 100% 0 0)" }
            }
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{
              delay: withDelay(0.86),
              duration: 0.58,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Bridging the
          </motion.span>
          <br />
          <motion.span
            className="block text-mint-gradient"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" }
            }
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{
              delay: withDelay(0.99),
              duration: 0.62,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Information Gap.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/60 max-w-[480px] mx-auto mb-10 leading-relaxed font-sans"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.2), duration: 0.55, ease: "easeOut" }}
        >
          See through market noise. Find the real price — not the listed one.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.34), duration: 0.56, ease: "easeOut" }}
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
