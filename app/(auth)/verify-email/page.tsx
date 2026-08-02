"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { AuthCard, LoadingButton } from "@/app/components/auth";

type VerifyState = "loading" | "verified" | "expired" | "already-verified";

export default function VerifyEmailPage() {
  const [state, setState] = useState<VerifyState>("loading");

  // Simulate verification process
  useEffect(() => {
    const timer = setTimeout(() => {
      // For demo purposes, cycle through states randomly
      // In production, this would check the token from the URL
      setState("verified");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthCard>
      <div className="flex flex-col items-center text-center py-4">
        {state === "loading" && <LoadingState />}
        {state === "verified" && <VerifiedState />}
        {state === "expired" && <ExpiredState />}
        {state === "already-verified" && <AlreadyVerifiedState />}
      </div>
    </AuthCard>
  );
}

function LoadingState() {
  return (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Loader2 size={28} className="text-primary" />
        </div>
      </motion.div>
      <h2 className="text-xl font-bold text-heading mb-2">
        Verifying your email
      </h2>
      <p className="text-sm text-paragraph">
        Please wait while we verify your email address...
      </p>
    </>
  );
}

function VerifiedState() {
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-success/20"
          />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 size={32} className="text-success" strokeWidth={2} />
          </div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-heading mb-2"
      >
        Email verified
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-paragraph mb-8"
      >
        Your email has been verified successfully. You can now access all
        features.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full"
      >
        <Link href="/">
          <LoadingButton variant="primary">Continue to Dashboard</LoadingButton>
        </Link>
      </motion.div>
    </>
  );
}

function ExpiredState() {
  const [isResending, setIsResending] = useState(false);

  async function handleResend() {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
          <AlertTriangle
            size={28}
            className="text-orange-500"
            strokeWidth={2}
          />
        </div>
      </motion.div>

      <h2 className="text-xl font-bold text-heading mb-2">Link expired</h2>
      <p className="text-sm text-paragraph mb-8">
        This verification link has expired. Request a new one to verify your
        email.
      </p>

      <div className="w-full space-y-3">
        <LoadingButton
          variant="primary"
          onClick={handleResend}
          loading={isResending}
        >
          <RefreshCw size={14} />
          Resend verification email
        </LoadingButton>
        <Link href="/login" className="block">
          <LoadingButton variant="secondary">Back to sign in</LoadingButton>
        </Link>
      </div>
    </>
  );
}

function AlreadyVerifiedState() {
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <Info size={28} className="text-blue-500" strokeWidth={2} />
        </div>
      </motion.div>

      <h2 className="text-xl font-bold text-heading mb-2">Already verified</h2>
      <p className="text-sm text-paragraph mb-8">
        Your email address has already been verified. You&apos;re all set!
      </p>

      <div className="w-full">
        <Link href="/">
          <LoadingButton variant="primary">Continue to Dashboard</LoadingButton>
        </Link>
      </div>
    </>
  );
}
