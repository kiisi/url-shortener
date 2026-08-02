"use client";

import React from "react";
import { cn } from "@/utils";
import type { LucideIcon } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  rightElement?: React.ReactNode;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, error, rightElement, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-heading"
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-paragraph/40">
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-heading placeholder:text-paragraph/40 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              Icon && "pl-10",
              rightElement && "pr-10",
              error
                ? "border-danger focus:ring-danger/20 focus:border-danger"
                : "border-border hover:border-paragraph/30",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-danger mt-1 animate-fade-in"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
