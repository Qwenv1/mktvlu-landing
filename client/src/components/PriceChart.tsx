import { useId } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { useReducedMotion } from "framer-motion";
import { money } from "@/lib/examples";

export function PriceChart({ price }: { price: number }) {
  const reduced = useReducedMotion();
  const gradientId = `price-fill-${useId().replace(/:/g, "")}`;
  const data = [0.92, 0.94, 0.93, 0.96, 0.95, 0.97, 0.96, 0.98, 0.97, 0.99, 0.98, 1].map((ratio, i) => ({ day: `Day ${Math.round(i * 29 / 11) + 1}`, value: Math.round(price * ratio) }));
  return (
    <div className="price-chart" role="img" aria-label={`Illustrative price history ending at ${money(price)}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#79c6a8" stopOpacity={0.22} /><stop offset="100%" stopColor="#79c6a8" stopOpacity={0} /></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.07)" />
          <YAxis hide domain={[Math.round(price * 0.88), Math.round(price * 1.04)]} />
          <Tooltip cursor={false} contentStyle={{ background: "#242825", border: "1px solid #414841", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#b4bcb5" }} itemStyle={{ color: "#c7e8d5" }} formatter={(value: number) => [money(value), "Reference"]} />
          <Area type="monotone" dataKey="value" stroke="#8ad6b4" strokeWidth={2} fill={`url(#${gradientId})`} isAnimationActive={!reduced} animationDuration={850} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
