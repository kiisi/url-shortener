"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { passwordRequirements, getPasswordStrength } from "@/validation/auth";
import { cn } from "@/utils";

interface PasswordStrengthProps {
  password: string;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
const strengthColors = [
  "bg-border",
  "bg-danger",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-success",
];

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3"
    >
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-paragraph">
            Password strength
          </span>
          <span
            className={cn(
              "text-xs font-semibold",
              strength <= 1 && "text-danger",
              strength === 2 && "text-orange-500",
              strength === 3 && "text-yellow-500",
              strength === 4 && "text-lime-500",
              strength === 5 && "text-success"
            )}
          >
            {strengthLabels[strength]}
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                i < strength ? strengthColors[strength] : "bg-border"
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      <ul className="space-y-1">
        {passwordRequirements.map((req) => {
          const met = req.test(password);
          return (
            <li
              key={req.label}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-200",
                met ? "text-success" : "text-paragraph/50"
              )}
            >
              {met ? (
                <Check size={12} className="shrink-0" />
              ) : (
                <X size={12} className="shrink-0" />
              )}
              {req.label}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
