"use client";

import { cn } from "@/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function LoadingButton({
  loading = false,
  variant = "primary",
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={cn(
        "relative w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && [
          "bg-primary text-white",
          "hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20",
          "focus:ring-primary/40",
          "active:scale-[0.98]",
        ],
        variant === "secondary" && [
          "border border-border bg-white text-heading",
          "hover:bg-surface hover:border-paragraph/30",
          "focus:ring-primary/20",
          "active:scale-[0.98]",
        ],
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-opacity",
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Please wait...</span>
        </span>
      )}
    </button>
  );
}
