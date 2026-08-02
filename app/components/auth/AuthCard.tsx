"use client";

import { motion } from "framer-motion";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-l-2xl rounded-r-2xl lg:rounded-r-none border border-border bg-white p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] sm:p-10"
    >
      {children}
    </motion.div>
  );
}
