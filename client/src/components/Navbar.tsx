import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/mktvlu-logo_1771035935629.png";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Technology", href: "#technology" },
    { name: "Product", href: "#features" },
    { name: "Pricing", href: "#" }, // Future
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-black/80 backdrop-blur-md border-white/[0.06] py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="MKTVLU" 
              width={32} 
              height={32} 
              className="opacity-85 transition-opacity group-hover:opacity-100 invert" 
            />
            <span className="font-bold tracking-[1px] text-white/75 group-hover:text-white transition-colors text-[18px]">
              MKTVLU
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button 
              asChild
              className="rounded-full bg-mint hover:bg-mint/90 text-black font-medium h-9 px-5 text-[13px]"
            >
              <a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">
                Launch App
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-serif italic text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button 
                asChild
                className="rounded-full bg-mint hover:bg-mint/90 text-black font-medium h-12 text-lg mt-4 w-full"
              >
                <a href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">
                  Launch App
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}