import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn(
      "w-[320px] bg-black rounded-[48px] border-[3px] border-white/10 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden mx-auto",
      className
    )}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-[20px] z-20 border-b border-x border-white/5" />
      
      {/* Screen Content */}
      <div className="relative z-10 w-full h-full bg-black rounded-[36px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}