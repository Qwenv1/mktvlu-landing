import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-panel rounded-2xl p-8 border-white/[0.06] bg-white/[0.03]",
        hoverEffect && "transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:border-white/[0.12]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}