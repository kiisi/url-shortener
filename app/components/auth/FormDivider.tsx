"use client";

interface FormDividerProps {
  text?: string;
}

export function FormDivider({ text = "or continue with" }: FormDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-white px-3 text-paragraph/60 uppercase tracking-wider font-medium">
          {text}
        </span>
      </div>
    </div>
  );
}
