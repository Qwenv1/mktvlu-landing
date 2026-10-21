import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("mb-6 inline-flex items-center border-l-2 border-mint pl-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45", className)}>
      {children}
    </div>
  );
}
