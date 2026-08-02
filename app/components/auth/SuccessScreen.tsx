"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function SuccessScreen({
  icon,
  title,
  description,
  children,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      {/* Animated success icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className="mb-6"
      >
        {icon || (
          <div className="relative">
            {/* Pulse ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full bg-success/20"
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 size={32} className="text-success" strokeWidth={2} />
            </div>
          </div>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-xl font-bold text-heading mb-2"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-sm text-paragraph leading-relaxed max-w-[320px]"
      >
        {description}
      </motion.p>

      {children && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 w-full space-y-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
