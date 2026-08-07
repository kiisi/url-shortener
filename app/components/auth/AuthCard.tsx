"use client";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      className="w-full rounded-l-2xl rounded-r-2xl lg:rounded-r-none border border-border bg-white p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] sm:p-8"
    >
      {children}
    </div>
  );
}
