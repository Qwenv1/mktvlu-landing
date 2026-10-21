import { lazy, Suspense, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { examples, money, type ProductExample } from "@/lib/examples";
import { Reveal, editorialEase } from "./Reveal";
import { AnimatedValue, DrawLine, TextReveal } from "./SiteMotion";
const PriceChart = lazy(() => import("./PriceChart").then(module => ({ default: module.PriceChart })));

type Condition = "Good" | "Fair" | "Poor";
const factors: Record<Condition, number> = { Good: 1, Fair: 0.85, Poor: 0.67 };

export function ProductShowcase({ example, onSelect }: { example: ProductExample; onSelect: (example: ProductExample) => void }) {
  const [condition, setCondition] = useState<Condition>("Good");
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const reduced = useReducedMotion();
  const report = useRef<HTMLDivElement>(null);
  const showChart = useInView(report, { once: true, margin: "200px" });
  const factor = factors[condition];
  const price = Math.round(example.price * factor);
  return (
    <section id="product" className="product-section section-space">
      <div className="page-width">
        <Reveal className="section-heading"><div><p className="eyebrow">The answer, up close</p><h2><TextReveal lines={["See the number.", "Read the evidence."]} mutedLast /></h2></div><p>One clear reference for the item in front of you, with the range, match quality, and market evidence that make the number useful.</p></Reveal>
        <Reveal>
          <div className="product-switcher" role="group" aria-label="Choose an example product">
            {examples.map(item => <button key={item.id} onClick={() => onSelect(item)} aria-pressed={example.id === item.id} className={example.id === item.id ? "active" : ""}>
              {example.id === item.id && <motion.span className="selection-highlight" layoutId="product-selection" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }} />}
              <span className="selection-label">{item.category}</span>
            </button>)}
          </div>
          <div className="product-display">
            <div className="product-visual">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img key={example.id} src={example.image} alt={example.alt} width={700} height={900} loading="lazy" initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: 0.35, ease: editorialEase }} style={{ objectPosition: example.position }} />
              </AnimatePresence>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={example.id} className="product-image-caption" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.35, ease: editorialEase }}>
                  <span>{example.category} / Market perspective</span><h3>{example.name}</h3><p>{example.detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div ref={report} className="valuation-report" aria-label="Interactive example valuation">
              <div className="report-header"><span className="mini-wordmark">MKT<span>VLU</span></span><span className="sample-label">Interactive example</span></div>
              <p className="report-eyebrow">Market reference price</p>
              <div className="report-price-line">
                <p className="report-price" aria-live="polite"><AnimatedValue value={price} format={money} /><span>CAD</span></p>
                <motion.span className="confidence-chip" title="A match-quality signal based on configuration fit, evidence volume, and price consistency — not a guarantee." initial={reduced ? false : { opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.5 }}><Check size={13} /><AnimatedValue value={example.confidence} />% confidence</motion.span>
              </div>
              <p className="confidence-note">Confidence reflects configuration fit, evidence volume, and price consistency — not a guarantee.</p>
              <Suspense fallback={<div className="price-chart" />}>
                {showChart ? <PriceChart key={example.id} price={price} /> : <div className="price-chart" />}
              </Suspense>
              <div className="chart-caption"><span>30-day example history</span><span>Market reference</span></div>
              <div className="report-range">{[["Lower range", Math.round(example.low * factor)], ["Upper range", Math.round(example.high * factor)]].map(([label, value], index) =>
                <motion.div key={label} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12, ease: editorialEase }}><span>{label}</span><strong><AnimatedValue value={Number(value)} format={money} /></strong></motion.div>
              )}</div>
              <div className="report-verdict"><div><span>Market read</span><strong>{example.asking > price ? "Above the reference" : "Within the reference range"}</strong></div><small>Asking {money(example.asking)} · Reference {money(price)}</small></div>
              <div className="condition-row"><span>Condition</span><div role="group" aria-label="Example item condition">{(["Good", "Fair", "Poor"] as Condition[]).map(item => <button key={item} onClick={() => setCondition(item)} aria-pressed={condition === item} className={condition === item ? "active" : ""}>
                {condition === item && <motion.span className="selection-highlight condition-highlight" layoutId="condition-selection" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 30 }} />}
                <span className="selection-label">{item}</span>
              </button>)}</div></div>
              <div className="source-row"><div><strong><AnimatedValue value={example.listings} /></strong><span>Comparable listings</span></div><button onClick={() => setSourcesOpen(!sourcesOpen)} aria-expanded={sourcesOpen} aria-controls="example-evidence">View evidence <ChevronDown size={14} className={sourcesOpen ? "rotate-180" : ""} /></button></div>
              <AnimatePresence initial={false}>{sourcesOpen && <motion.div id="example-evidence" className="evidence-detail" initial={{ height: reduced ? "auto" : 0, opacity: reduced ? 1 : 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: reduced ? "auto" : 0, opacity: reduced ? 1 : 0 }} transition={{ duration: 0.3 }}><div className="report-detail-grid"><div><span>Trend</span><strong>Prices holding steady</strong><small>30 days · {money(Math.max(0, price - 39))} → {money(price)}</small></div><div><span>Evidence</span><strong>{example.listings} comparable listings</strong><small>Configuration matched · outliers filtered</small></div><div className="report-factor-list"><span>Price factors</span><p><b>Up</b> configuration match</p><p><b>Down</b> seasonal timing</p></div><p className="report-evidence-note">Evidence is shown with its source type — active asking prices and completed sales are kept distinct when available.</p><p className="report-illustrative-note">Illustrative data. The app shows the available evidence for your item.</p></div></motion.div>}</AnimatePresence>
              <a className="report-action" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Value an item <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </Reveal>
        <div className="product-benefits">{[
          ["01", "A grounded reference.", "One reference to help you compare an asking price or plan your own listing."],
          ["02", "The details make a difference.", "Model, configuration, condition, and location all influence an item's value."],
          ["03", "Evidence you can inspect.", "See the range and confidence instead of relying on a number without context."],
        ].map(([number,title,copy],index)=><Reveal key={number} delay={index*0.12}><DrawLine delay={index*0.12} /><span className="benefit-number">{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </div>
    </section>
  );
}
