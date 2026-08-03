"use client";

import { cn } from "@/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = "neutral",
  className,
}: StatCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white border border-border rounded-2xl p-6 transition-all duration-200 group relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
        <Icon size={120} className="text-primary -mt-8 -mr-8 rotate-12" />
      </div>
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-paragraph">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-heading group-hover:text-primary group-hover:border-primary/30 transition-colors">
          <Icon size={18} />
        </div>
      </div>
      <div className="relative z-10 flex items-baseline gap-3">
        <div className="text-3xl font-bold text-heading">{value}</div>
        {trend && (
          <div
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1",
              trendDirection === "up" && "text-success bg-success/10",
              trendDirection === "down" && "text-danger bg-danger/10",
              trendDirection === "neutral" && "text-paragraph bg-surface border border-border"
            )}
          >
            {trendDirection === "up" && "↑"}
            {trendDirection === "down" && "↓"}
            {trend}
          </div>
        )}
      </div>
    </motion.div>
  );
}
