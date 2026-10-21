import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { DrawLine, MotionAccordion, TextReveal } from "./SiteMotion";

const questions = [
  ["What is a Market Reference Price?", "An estimate built from comparable market evidence. It gives you a starting point for buying or selling, alongside a range and confidence score. It is not a guaranteed sale price."],
  ["Why does condition change the price?", "Two items with the same model can have very different values. Wear, configuration, accessories, and location affect the comparison. Confirm the item details in the app for a more useful result."],
  ["Are these example prices live?", "The examples on this page are illustrative, in CAD, and designed to show how the result works. Use the app to get a valuation for your own item from the evidence available at the time."],
  ["Do I need an account?", "You can try the current mobile web experience without creating an account. Open MKTVLU, take a photo or describe an item, and explore the result."],
];

export function Technology() {
  return (
    <section id="technology" className="method-section section-space">
      <div className="page-width">
        <Reveal className="method-intro"><p className="eyebrow">The thinking behind the price</p><h2><TextReveal lines={["Good decisions", "start with good context."]} /></h2><p>Asking prices tell only part of the story. MKTVLU brings the useful details together so you can see a more complete picture.</p></Reveal>
        <div className="method-principles">{[
          ["01 / Relevance", "Compare like with like.", "Start with the right model and configuration. A closer match makes for a more meaningful comparison."],
          ["02 / Perspective", "Look beyond one listing.", "Consider comparable market evidence and filter unusual prices that could distort the result."],
          ["03 / Clarity", "Show the uncertainty.", "A useful estimate comes with a range and confidence. See how much evidence supports your next move."],
        ].map(([label,title,text],index)=><Reveal key={label} delay={index*0.12}><DrawLine delay={index*0.14} /><p className="principle-label">{label}</p><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
        <div className="faq-layout">
          <Reveal><p className="eyebrow">A little more clarity</p><h2><TextReveal lines={["Good questions."]} /></h2><a className="action-text" href="mailto:contact@mktvlu.co">Talk to us <ArrowUpRight size={16} /></a></Reveal>
          <Reveal className="faq-list">{questions.map(([question,answer])=><MotionAccordion key={question} question={question} answer={answer} />)}</Reveal>
        </div>
      </div>
    </section>
  );
}
