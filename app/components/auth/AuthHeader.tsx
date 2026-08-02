"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "../ui/Logo";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      {/* Logo */}
      <Logo />

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl font-bold tracking-tight text-heading"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-2 text-sm text-paragraph"
      >
        {description}
      </motion.p>
    </div>
  );
}
