import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PricingModal } from "./PricingModal";
import { editorialEase, scrollToSection } from "./Reveal";

function BrandMark() {
  const reduced = useReducedMotion();

  return (
    <span className="brand-lockup" aria-hidden="true">
      <motion.span
        className="brand-mark"
        initial={reduced ? false : { opacity: 0, scale: 0.82 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: editorialEase }}
      >
        <img src="/icon-180.png" alt="" />
        <span className="brand-mark-glint" />
      </motion.span>
      <motion.span
        className="brand-name"
        initial={reduced ? false : { opacity: 0, x: -7 }}
        animate={reduced ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.16, ease: editorialEase }}
      >mkt<span>·</span>vlu</motion.span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);
  const links = [
    { name: "Examples", action: () => scrollToSection("examples") },
    { name: "The product", action: () => scrollToSection("product") },
    { name: "How it works", action: () => scrollToSection("how-it-works") },
    { name: "Pricing", action: () => setPricingOpen(true) },
  ];
  return (
    <>
      <nav className={"editorial-nav " + (scrolled || mobileMenuOpen ? "is-scrolled" : "")} aria-label="Main navigation">
        <div className="page-width nav-inner">
          <button className="wordmark" onClick={() => { scrollToSection("top"); setMobileMenuOpen(false); }} aria-label="MKTVLU home"><BrandMark /></button>
          <div className="nav-links">{links.map(link => <button key={link.name} onClick={link.action}>{link.name}</button>)}<a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Open app <ArrowUpRight size={14} /></a></div>
          <button id="menu-toggle" className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>{mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
      <AnimatePresence>{mobileMenuOpen && <motion.div id="mobile-navigation" className="mobile-navigation" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.25, ease: editorialEase }}><div>{links.map(link => <button key={link.name} onClick={() => { link.action(); setMobileMenuOpen(false); }}>{link.name}</button>)}<a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Open app <ArrowUpRight size={15} /></a></div></motion.div>}</AnimatePresence>
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  );
}
