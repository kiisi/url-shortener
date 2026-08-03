"use client";

import { cn } from "@/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingButton } from "../auth/LoadingButton";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-dashed border-border rounded-2xl",
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-paragraph mb-6 shadow-sm">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-heading mb-2">{title}</h3>
      <p className="text-sm text-paragraph max-w-md mx-auto mb-8">
        {description}
      </p>
      {actionLabel && onAction && (
        <LoadingButton variant="primary" onClick={onAction} className="w-auto px-6">
          {actionLabel}
        </LoadingButton>
      )}
    </motion.div>
  );
}
