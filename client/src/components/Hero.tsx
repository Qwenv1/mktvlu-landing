import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleSphere from "@/components/ParticleSphere";

const INTRO_DURATION_MS = 3000;
const ORBIT_START_MS = 900;
const ORBIT_LOOP_SECONDS = 36;
const ARC_TEXT = "See through the market noise. Find the real price - not the listed one.";

function CornerSet({ colorClass }: { colorClass: string }) {
  return (
    <>
      <div className={`pointer-events-none absolute left-2 top-2 h-20 w-20 rounded-tl-[30px] border-l-[4px] border-t-[4px] ${colorClass}`} />
      <div className={`pointer-events-none absolute right-2 top-2 h-20 w-20 rounded-tr-[30px] border-r-[4px] border-t-[4px] ${colorClass}`} />
      <div className={`pointer-events-none absolute bottom-2 left-2 h-20 w-20 rounded-bl-[30px] border-b-[4px] border-l-[4px] ${colorClass}`} />
      <div className={`pointer-events-none absolute bottom-2 right-2 h-20 w-20 rounded-br-[30px] border-b-[4px] border-r-[4px] ${colorClass}`} />
    </>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const orbitPathId = useId();
  const topArcPathId = useId();

  const [introComplete, setIntroComplete] = useState(false);
  const [orbitActive, setOrbitActive] = useState(prefersReducedMotion);
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
    if (prefersReducedMotion) {
      setOrbitActive(true);
      return;
    }

    setOrbitActive(false);
    const orbitTimer = window.setTimeout(() => {
      setOrbitActive(true);
    }, ORBIT_START_MS);

    return () => window.clearTimeout(orbitTimer);
  }, [prefersReducedMotion]);

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
          return Math.min(prev + 1, ARC_TEXT.length);
        });
      }, 56);
    }, 860);

    return () => {
      window.clearTimeout(startTimer);
      if (textTimer) window.clearInterval(textTimer);
    };
  }, [prefersReducedMotion, introComplete]);

  const withDelay = (delay: number) => (prefersReducedMotion ? 0 : delay);
  const showIntro = !prefersReducedMotion && !introComplete;

  const orbitPath = useMemo(() => {
    const cx = sphereSize / 2;
    const cy = sphereSize / 2;
    const orbitRadius = sphereSize * 0.43;
    const bottomY = cy + orbitRadius;
    // Keep the path seam at the bottom so the top-arch pass is visually continuous.
    return `M ${cx} ${bottomY} A ${orbitRadius} ${orbitRadius} 0 1 1 ${cx - 0.01} ${bottomY} A ${orbitRadius} ${orbitRadius} 0 1 1 ${cx} ${bottomY}`;
  }, [sphereSize]);

  const topArcPath = useMemo(() => {
    const cx = sphereSize / 2;
    const cy = sphereSize / 2;
    const r = sphereSize * 0.43;
    const a1 = (210 * Math.PI) / 180;
    const a2 = (330 * Math.PI) / 180;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const x2 = cx + Math.cos(a2) * r;
    const y2 = cy + Math.sin(a2) * r;
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  }, [sphereSize]);

  const isMobile = sphereSize < 400;

  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,black_84%)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1500px] flex-col px-6 pb-10 pt-6 md:px-10 md:pt-8">
        <motion.div
          className="pointer-events-none z-20 mb-6 text-left md:absolute md:left-10 md:top-8 md:mb-0 md:max-w-[860px]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.0), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="font-serif text-[48px] leading-[0.95] tracking-tight text-white md:text-[72px] lg:text-[86px] xl:text-[92px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(1.28), duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Bridging the </span>
            <span className="text-mint-gradient">Information Gap.</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-[24px] leading-tight text-white/62 md:text-[34px] lg:text-[40px] xl:text-[44px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(1.46), duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Market Intelligence 2.0
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-2 md:mt-16"
          style={{ width: sphereSize, height: sphereSize }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: withDelay(0.08), duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        >
          <ParticleSphere
            size={sphereSize}
            interactive={true}
            showText={false}
            className="opacity-35 pointer-events-auto"
          />

          <div className="pointer-events-none absolute inset-0">
            {prefersReducedMotion ? (
              <CornerSet colorClass="border-mint/90" />
            ) : (
              <>
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 0.24, duration: 0.44, ease: "easeOut" }}
                >
                  <CornerSet colorClass="border-[#f1c453]/95" />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.42, ease: "easeOut" }}
                >
                  <CornerSet colorClass="border-mint/90" />
                </motion.div>
              </>
            )}
          </div>

          <motion.svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${sphereSize} ${sphereSize}`}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: withDelay(0.9), duration: 0.36 }}
          >
            <defs>
              <path id={orbitPathId} d={orbitPath} fill="none" />
              <path id={topArcPathId} d={topArcPath} fill="none" />
            </defs>

            {isMobile ? (
              <text
                fill="rgba(52,211,153,0.82)"
                fontSize={12}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="0.12em"
              >
                <textPath href={`#${topArcPathId}`} startOffset="50%" textAnchor="middle">
                  {ARC_TEXT.slice(0, arcChars)}
                </textPath>
              </text>
            ) : (
              <motion.g
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: withDelay(0.92), duration: 0.35 }}
              >
                <motion.g
                  style={{ transformOrigin: `${sphereSize / 2}px ${sphereSize / 2}px` }}
                  initial={false}
                  animate={orbitActive ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    orbitActive
                      ? {
                          duration: prefersReducedMotion ? 0.2 : ORBIT_LOOP_SECONDS,
                          repeat: Infinity,
                          ease: "linear",
                        }
                      : { duration: 0 }
                  }
                >
                  <text
                    fill="rgba(52,211,153,0.82)"
                    fontSize={sphereSize < 400 ? 12 : 15}
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    letterSpacing="0.12em"
                  >
                    <textPath href={`#${orbitPathId}`} startOffset="50%" textAnchor="middle">
                      {ARC_TEXT.slice(0, arcChars)}
                    </textPath>
                  </text>

                  <circle
                    cx={sphereSize / 2}
                    cy={sphereSize * 0.07}
                    r={sphereSize < 400 ? 2.6 : 3.6}
                    fill="rgba(52,211,153,0.95)"
                  />
                </motion.g>
              </motion.g>
            )}
          </motion.svg>

          {showIntro && (
            <motion.div
              className="pointer-events-none absolute inset-7 rounded-full border border-mint/15"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: [0, 0.35, 0], scale: [0.97, 1.02, 1.06] }}
              transition={{ delay: 0.22, duration: 1.02, ease: "easeOut" }}
            />
          )}
        </motion.div>

        <motion.div
          className="hidden pointer-events-auto md:absolute md:right-10 md:top-1/2 md:flex md:-translate-y-[10%] md:flex-col md:items-start"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: withDelay(1.72), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="https://mktvlu.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-mint px-8 py-4 text-[30px] font-semibold text-black shadow-[0_0_24px_rgba(52,211,153,0.26)] transition-opacity hover:opacity-90 lg:text-[38px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: withDelay(1.72), duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
          >
            Launch App <ArrowRight className="ml-3 h-6 w-6" />
          </motion.a>

          <motion.button
            className="mt-4 text-[34px] font-medium text-white/50 transition-colors hover:text-white/75 lg:text-[44px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(1.92), duration: 0.38, ease: "easeOut" }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-7 flex items-center justify-center gap-5 md:hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.76), duration: 0.46 }}
        >
          <Button size="lg" className="rounded-full h-12 px-8 bg-mint hover:bg-mint/90 text-black font-medium group">
            <a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Launch App <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          <button className="text-lg font-medium text-white/55 hover:text-white/75">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
