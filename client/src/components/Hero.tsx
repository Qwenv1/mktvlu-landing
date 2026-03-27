import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleSphere from "@/components/ParticleSphere";

const INTRO_DURATION_MS = 2100;
const ARC_TEXT = "See through market noise. Find the real price — not the listed one.";
const SCAN_STAGES = [
  "Scanning listings",
  "Summarizing condition",
  "Filtering outliers",
  "Assembling price signal",
];

function CaptureCorners() {
  return (
    <>
      <div className="pointer-events-none absolute left-2 top-2 h-20 w-20 rounded-tl-[30px] border-l-[4px] border-t-[4px] border-white/25" />
      <div className="pointer-events-none absolute right-2 top-2 h-20 w-20 rounded-tr-[30px] border-r-[4px] border-t-[4px] border-white/25" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-20 w-20 rounded-bl-[30px] border-b-[4px] border-l-[4px] border-white/25" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-20 w-20 rounded-br-[30px] border-b-[4px] border-r-[4px] border-white/25" />

      <div className="pointer-events-none absolute left-2 top-2 h-20 w-20 rounded-tl-[30px] border-l-[4px] border-t-[4px] border-mint/90" />
      <div className="pointer-events-none absolute right-2 top-2 h-20 w-20 rounded-tr-[30px] border-r-[4px] border-t-[4px] border-mint/90" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-20 w-20 rounded-bl-[30px] border-b-[4px] border-l-[4px] border-mint/90" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-20 w-20 rounded-br-[30px] border-b-[4px] border-r-[4px] border-mint/90" />
    </>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const arcPathId = useId();

  const [introComplete, setIntroComplete] = useState(false);
  const [scanStageIndex, setScanStageIndex] = useState(0);
  const [arcChars, setArcChars] = useState(prefersReducedMotion ? ARC_TEXT.length : 0);
  const [sphereSize, setSphereSize] = useState(560);

  useEffect(() => {
    const updateSphereSize = () => {
      if (window.innerWidth < 640) {
        setSphereSize(340);
      } else if (window.innerWidth < 1024) {
        setSphereSize(440);
      } else {
        setSphereSize(560);
      }
    };

    updateSphereSize();
    window.addEventListener("resize", updateSphereSize);
    return () => window.removeEventListener("resize", updateSphereSize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroComplete(true);
      setArcChars(ARC_TEXT.length);
      return;
    }

    const completeTimer = window.setTimeout(() => {
      setIntroComplete(true);
      setArcChars(ARC_TEXT.length);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(completeTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || introComplete) return;

    const stageTimer = window.setInterval(() => {
      setScanStageIndex((prev) => (prev + 1) % SCAN_STAGES.length);
    }, 290);

    return () => window.clearInterval(stageTimer);
  }, [prefersReducedMotion, introComplete]);

  useEffect(() => {
    if (prefersReducedMotion || introComplete) {
      setArcChars(ARC_TEXT.length);
      return;
    }

    let textTimer: number | null = null;
    const startTimer = window.setTimeout(() => {
      textTimer = window.setInterval(() => {
        setArcChars((prev) => {
          if (prev >= ARC_TEXT.length) {
            if (textTimer) window.clearInterval(textTimer);
            return ARC_TEXT.length;
          }
          return Math.min(prev + 2, ARC_TEXT.length);
        });
      }, 36);
    }, 520);

    return () => {
      window.clearTimeout(startTimer);
      if (textTimer) window.clearInterval(textTimer);
    };
  }, [prefersReducedMotion, introComplete]);

  const withDelay = (delay: number) => (prefersReducedMotion ? 0 : delay);
  const showScanIntro = !prefersReducedMotion && !introComplete;

  const arcPath = useMemo(() => {
    const r = sphereSize * 0.54;
    const y = sphereSize * 0.58;
    const startX = sphereSize * 0.2;
    const endX = sphereSize * 0.8;
    return `M ${startX} ${y} A ${r} ${r} 0 0 1 ${endX} ${y}`;
  }, [sphereSize]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,black_82%)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1500px] flex-col px-6 pb-10 pt-6 md:px-10 md:pt-8">
        <motion.div
          className="pointer-events-none z-20 mb-6 text-left md:absolute md:left-10 md:top-8 md:mb-0 md:max-w-[860px]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(0.78), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-[48px] leading-[0.95] tracking-tight text-white md:text-[72px] lg:text-[86px] xl:text-[92px]">
            <span>Bridging the </span>
            <span className="text-mint-gradient">Information Gap.</span>
          </h1>

          <p className="mt-3 text-[24px] leading-tight text-white/62 md:text-[34px] lg:text-[40px] xl:text-[44px]">
            Market Intelligence 2.0
          </p>
        </motion.div>

        <div
          className="relative mx-auto mt-2 md:mt-16"
          style={{ width: sphereSize, height: sphereSize }}
        >
          <ParticleSphere
            size={sphereSize}
            interactive={true}
            showText={false}
            className="opacity-35 pointer-events-auto"
          />

          <CaptureCorners />

          {showScanIntro && (
            <>
              <motion.div
                className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-[2px] bg-gradient-to-r from-transparent via-mint to-transparent shadow-[0_0_18px_rgba(52,211,153,0.72)]"
                initial={{ opacity: 0, y: sphereSize * 0.2 }}
                animate={{
                  opacity: [0, 1, 0.35, 0],
                  y: [sphereSize * 0.2, sphereSize * 0.48, sphereSize * 0.71, sphereSize * 0.8],
                }}
                transition={{ delay: 0.18, duration: 1.05, ease: [0.25, 1, 0.5, 1] }}
              />

              <motion.div
                className="pointer-events-none absolute inset-7 rounded-full border border-mint/20"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: [0, 0.42, 0], scale: [0.97, 1.02, 1.06] }}
                transition={{ delay: 0.18, duration: 1.08, ease: "easeOut" }}
              />

              <motion.div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-9 rounded-full border border-mint/30 bg-black/45 px-4 py-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 1, 0.95, 0], y: [8, 0, 0, -2] }}
                transition={{ delay: 0.25, duration: 1.1, ease: "easeOut" }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint/85 md:text-xs">
                  {SCAN_STAGES[scanStageIndex]}
                </span>
              </motion.div>
            </>
          )}

          <motion.svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${sphereSize} ${sphereSize}`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: withDelay(0.64), duration: 0.42 }}
          >
            <defs>
              <path id={arcPathId} d={arcPath} fill="none" />
            </defs>
            <text
              fill="rgba(52,211,153,0.9)"
              fontSize={sphereSize < 400 ? 13 : 16}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              letterSpacing="0.16em"
            >
              <textPath href={`#${arcPathId}`} startOffset="50%" textAnchor="middle">
                {ARC_TEXT.slice(0, arcChars)}
              </textPath>
            </text>
          </motion.svg>
        </div>

        <motion.div
          className="hidden pointer-events-auto md:absolute md:right-10 md:top-1/2 md:flex md:-translate-y-[10%] md:flex-col md:items-start"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: withDelay(1.22), duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="https://mktvlu.co"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-[54px] leading-none text-mint transition-opacity hover:opacity-90 lg:text-[72px] xl:text-[86px]"
          >
            Launch App
          </a>

          <button className="mt-2 text-[34px] font-medium text-white/68 transition-colors hover:text-white lg:text-[46px] xl:text-[58px]">
            Learn More
          </button>
        </motion.div>

        <motion.div
          className="pointer-events-none mt-4 text-center md:hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.02), duration: 0.5 }}
        >
          <p className="text-base leading-relaxed text-white/65">
            {ARC_TEXT}
          </p>
        </motion.div>

        <motion.div
          className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row md:hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.16), duration: 0.52 }}
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
