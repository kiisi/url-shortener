"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FormInput } from "./FormInput";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ label = "Password", error, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormInput
      ref={ref}
      label={label}
      type={visible ? "text" : "password"}
      icon={Lock}
      error={error}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-paragraph/40 hover:text-paragraph transition-colors rounded-md focus:outline-none cursor-pointer"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
