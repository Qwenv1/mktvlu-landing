import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ScrollPhoto, TextReveal } from "./SiteMotion";

export function CTA() {
  return (
    <section className="closing-section">
      <div className="page-width closing-layout">
        <Reveal><p className="eyebrow">Your next good find</p><h2><TextReveal lines={["A little knowledge.", "A better deal."]} /></h2><p>Bring a clearer perspective to the things you buy and sell.</p><a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Value an item <ArrowUpRight size={17} /></a><span className="closing-note">Free to use. Ready in your browser.</span></Reveal>
        <Reveal className="closing-photograph"><ScrollPhoto src="/images/headphones.jpg" alt="HiFiMAN headphones in warm natural light" width={700} height={700} position="55% 55%" travel={30} /><span>Good things deserve another chapter.</span></Reveal>
      </div>
    </section>
  );
}
