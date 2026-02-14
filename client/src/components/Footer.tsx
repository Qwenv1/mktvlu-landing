import logo from "@assets/mktvlu-logo_1771035935629.png";
import { Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <img src={logo} alt="MKTVLU" width={24} height={24} className="invert opacity-80" />
            <span className="font-bold tracking-[1px] text-white/80 text-[14px]">MKTVLU</span>
        </div>

        <div className="flex gap-8 text-[13px] font-medium text-white/40">
            <a href="#technology" className="hover:text-white transition-colors">Technology</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Brand Kit</a>
        </div>

        <div className="flex gap-6">
            <a href="https://x.com/mktvlu" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Twitter size={18} />
            </a>
            <a href="https://instagram.com/mktvlu" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <Instagram size={18} />
            </a>
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-4">
        <p className="text-[9px] uppercase tracking-[3px] text-white/20">
            Intelligence layers for the global economy.
        </p>
        <p className="text-[11px] text-white/20">
            &copy; 2026 MKTVLU. All rights reserved.
        </p>
      </div>
    </footer>
  );
}