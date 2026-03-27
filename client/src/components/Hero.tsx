import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleSphere from "@/components/ParticleSphere";

const INTRO_DURATION_MS = 2300;
const ORBIT_LOOP_SECONDS = 11;
const ARC_TEXT = "See through the market noise. Find the real price - not the listed one.";

function CornerSet({ colorClass }: { colorClass: string }) {
  return (
    <>
      <div className={`pointer-events-none absolute left-3 top-3 h-16 w-16 rounded-tl-[24px] border-l-[3px] border-t-[3px] ${colorClass}`} />
      <div className={`pointer-events-none absolute right-3 top-3 h-16 w-16 rounded-tr-[24px] border-r-[3px] border-t-[3px] ${colorClass}`} />
      <div className={`pointer-events-none absolute bottom-3 left-3 h-16 w-16 rounded-bl-[24px] border-b-[3px] border-l-[3px] ${colorClass}`} />
      <div className={`pointer-events-none absolute bottom-3 right-3 h-16 w-16 rounded-br-[24px] border-b-[3px] border-r-[3px] ${colorClass}`} />
    </>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const orbitPathId = useId();
  const topArcPathId = useId();

  const [introComplete, setIntroComplete] = useState(false);
  const [arcChars, setArcChars] = useState(prefersReducedMotion ? ARC_TEXT.length : 0);
  const [sphereSize, setSphereSize] = useState(460);

  useEffect(() => {
    const updateSphereSize = () => {
      if (window.innerWidth < 640) {
        setSphereSize(300);
      } else if (window.innerWidth < 1024) {
        setSphereSize(380);
      } else {
        setSphereSize(460);
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
      }, 34);
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
    const topY = cy - orbitRadius;
    // Full clockwise orbit so text can revolve around the globe perimeter.
    return `M ${cx} ${topY} A ${orbitRadius} ${orbitRadius} 0 1 1 ${cx - 0.01} ${topY} A ${orbitRadius} ${orbitRadius} 0 1 1 ${cx} ${topY}`;
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

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1500px] flex-col px-6 pb-14 pt-6 md:grid md:grid-cols-[minmax(420px,1fr)_auto_minmax(240px,1fr)] md:items-center md:gap-x-10 md:px-10 md:pt-8 lg:grid-cols-[minmax(560px,1fr)_auto_minmax(260px,1fr)]">
        <motion.div
          className="pointer-events-none z-20 mb-6 text-left md:mb-0 md:max-w-none md:self-start md:pt-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(1.0), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="font-serif text-[48px] leading-[0.95] tracking-tight text-white md:whitespace-nowrap md:text-[62px] lg:text-[72px] xl:text-[80px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(1.28), duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Bridging the </span>
            <span className="text-mint-gradient">Information Gap.</span>
          </motion.h1>

          <motion.p
            className="mt-3 text-[24px] leading-tight text-white/62 md:whitespace-nowrap md:text-[38px] lg:text-[44px] xl:text-[48px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(1.46), duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Market Intelligence 2.0
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-2 md:mt-0 md:justify-self-center"
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
                style={{ transformOrigin: `${sphereSize / 2}px ${sphereSize / 2}px` }}
                initial={prefersReducedMotion ? false : { rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                transition={{
                  rotate: {
                    delay: withDelay(0.92),
                    duration: prefersReducedMotion ? 0.2 : ORBIT_LOOP_SECONDS,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { delay: withDelay(0.92), duration: 0.2 },
                }}
              >
                <text
                  fill="rgba(52,211,153,0.82)"
                  fontSize={15}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  letterSpacing="0.12em"
                >
                  <textPath href={`#${orbitPathId}`} startOffset="0%" textAnchor="start">
                    {ARC_TEXT.slice(0, arcChars)}
                  </textPath>
                </text>

                <circle
                  cx={sphereSize / 2}
                  cy={sphereSize * 0.07}
                  r={3.6}
                  fill="rgba(52,211,153,0.95)"
                />
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
          className="hidden pointer-events-auto md:flex md:flex-col md:items-end md:self-end md:justify-self-end md:pb-20 md:text-right"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: withDelay(1.72), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="https://mktvlu.co"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif leading-none text-mint drop-shadow-[0_0_20px_rgba(52,211,153,0.22)] transition-opacity hover:opacity-90 md:text-[68px] lg:text-[82px] xl:text-[92px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: withDelay(1.72), duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
          >
            Launch App
          </motion.a>

          <motion.button
            className="mt-2 text-[34px] font-medium text-white/45 transition-colors hover:text-white/65 lg:text-[40px]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(2.24), duration: 0.38, ease: "easeOut" }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <div className="mt-7 flex items-center justify-center gap-5 md:hidden">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(1.76), duration: 0.46 }}
          >
            <Button size="lg" className="rounded-full h-12 px-8 bg-mint hover:bg-mint/90 text-black font-medium group">
              <a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer" className="flex items-center">
                Launch App <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          <motion.button
            className="text-lg font-medium text-white/55 hover:text-white/75"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: withDelay(2.24), duration: 0.38, ease: "easeOut" }}
          >
            Learn More
          </motion.button>
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 text-mint/90"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: withDelay(2.48), duration: 0.38, ease: "easeOut" }}
        >
          <ChevronDown className="h-7 w-7 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
