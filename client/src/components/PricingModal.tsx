import { ArrowUpRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

interface PricingModalProps { open: boolean; onClose: () => void; }

export function PricingModal({ open, onClose }: PricingModalProps) {
  return (
    <Dialog open={open} onOpenChange={value => { if (!value) onClose(); }}>
      <DialogContent className="pricing-dialog">
        <DialogTitle>Start with a clearer price.</DialogTitle>
        <DialogDescription>The current web experience is free. Explore a valuation before you buy or sell.</DialogDescription>
        <div className="pricing-grid">
          <div><h3>Available today</h3><p className="pricing-value">$0 <span>Free to use</span></p><ul>{["Photo or text search", "Market reference and range", "Evidence and confidence"].map(item=><li key={item}><Check size={13} />{item}</li>)}</ul><a className="action-primary" href="https://mktvlu.co" target="_blank" rel="noopener noreferrer">Open MKTVLU <ArrowUpRight size={14} /></a></div>
          <div><h3>What’s next</h3><p className="pricing-value">Pro <span>In development</span></p><ul>{["Price tracking and alerts", "Deeper market insights", "Tools for regular sellers"].map(item=><li key={item}><Check size={13} />{item}</li>)}</ul><a className="action-text" href="mailto:contact@mktvlu.co?subject=MKTVLU%20Pro%20interest">Ask about Pro <ArrowUpRight size={14} /></a></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
