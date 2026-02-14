import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassMintCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function GlassMintCard({ children, className, ...props }: GlassMintCardProps) {
  return (
    <motion.div
      className={cn(
        "glass-mint rounded-3xl p-8 border border-mint/20 shadow-[0_0_20px_rgba(52,211,153,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}