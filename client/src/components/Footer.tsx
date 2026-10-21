import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="page-width">
        <Reveal className="footer-top"><a className="wordmark" href="#top" aria-label="MKTVLU home">mkt<span>·vlu</span></a><p>A better perspective on secondhand.</p><a href="mailto:contact@mktvlu.co">Get in touch <ArrowUpRight size={14} /></a></Reveal>
        <Reveal className="footer-bottom" delay={0.12}><span>© {new Date().getFullYear()} MKTVLU</span><div><a href="#examples">Examples</a><a href="#how-it-works">How it works</a><a href="#technology">Our approach</a></div><details className="photo-credits"><summary>Photography credits</summary><div><a href="https://unsplash.com/photos/a-close-up-of-a-cell-phone-on-a-blanket-aUtmNs6iMos" target="_blank" rel="noopener noreferrer">Yuheng Ouyang — iPhone</a><a href="https://unsplash.com/photos/a-black-and-white-photo-of-a-camera-MGgrhLg07Sg" target="_blank" rel="noopener noreferrer">insung yoon — Camera</a><a href="https://unsplash.com/photos/black-headset-on-beige-surface-j9MV1gV0l50" target="_blank" rel="noopener noreferrer">Petr Macháček — Headphones</a><a href="https://unsplash.com/photos/white-armless-chair-BsQxAIl2LdA" target="_blank" rel="noopener noreferrer">Agata Create — Chair</a><a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">Unsplash License</a></div></details></Reveal>
      </div>
    </footer>
  );
}
