import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const editorialEase = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.75, delay, ease: editorialEase }}>{children}</motion.div>;
}

export function scrollToSection(id: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = document.getElementById(id);
  if (!target) return;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 82);
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
