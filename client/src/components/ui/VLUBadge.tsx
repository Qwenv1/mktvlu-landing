import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VLUBadgeProps {
  size?: "sm" | "lg";
  className?: string;
}

export function VLUBadge({ size = "lg", className }: VLUBadgeProps) {
  if (size === "sm") {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint/[0.08] border border-mint/[0.15] text-mint font-bold text-[9px] tracking-[1.5px] uppercase",
        className
      )}>
        <ShieldCheck className="w-3 h-3" />
        <span>VLU Certified</span>
      </div>
    );
  }

  return (
    <div className={cn(
      "inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-mint/[0.06] backdrop-blur-[20px] border border-mint/20 shadow-[inset_0_0_0_0.5px_rgba(52,211,153,0.1),0_0_30px_rgba(52,211,153,0.05)]",
      className
    )}>
      <div className="w-7 h-7 rounded-full bg-mint/[0.15] flex items-center justify-center">
        <ShieldCheck className="w-4 h-4 text-mint" />
      </div>
      <div>
        <div className="font-sans text-xs font-bold tracking-[2px] uppercase text-mint leading-none mb-1">
          VLU Certified
        </div>
        <div className="font-sans text-[11px] font-normal text-white/50 tracking-normal leading-none">
          Fair Market Price
        </div>
      </div>
    </div>
  );
}