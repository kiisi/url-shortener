import { cn } from "@/utils";
import React from "react";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
    name?: string;
}

export default function Switch({
    checked,
    onCheckedChange,
    disabled = false,
    className = "",
    id,
    name,
}: SwitchProps) {
    return (
        <button
            id={id}
            name={name}
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={cn(
                "relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-all duration-200 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#095256]/20 disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-primary" : "bg-gray-300",
                className,
            )}
        >
            <span
                className={`absolute left-1 h-6 w-6 rounded-full bg-white transition-all duration-200 ease-out will-change-transform ${checked ? "translate-x-6" : "translate-x-0"} `}
            />
        </button>
    );
}