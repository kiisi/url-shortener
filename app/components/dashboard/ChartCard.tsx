"use client";

import { cn } from "@/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  action,
  children,
  className,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white border border-border rounded-2xl p-6",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-heading">{title}</h3>
          {description && (
            <p className="text-sm text-paragraph mt-1">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="w-full">{children}</div>
    </motion.div>
  );
}
