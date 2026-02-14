import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({ to, duration = 2, prefix = "", suffix = "", className, decimals = 0 }: CountUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  
  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
    stiffness: 50,
    damping: 20
  });

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, to, spring]);

  const display = useTransform(spring, (current) => {
    // Round to specific decimals
    const fixed = current.toFixed(decimals);
    // Add commas for thousands
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${prefix}${parts.join('.')}${suffix}`;
  });

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}