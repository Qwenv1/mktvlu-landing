import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("inline-flex items-center px-3 py-1 rounded-full border border-mint/30 bg-mint/5 text-[11px] font-semibold tracking-[3px] uppercase text-mint backdrop-blur-sm mb-6", className)}>
      {children}
    </div>
  );
}