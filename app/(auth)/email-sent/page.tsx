"use client";

import { useState, useEffect } from "react";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import {
  AuthCard,
  AuthHeader,
  SuccessScreen,
  LoadingButton,
} from "@/app/components/auth";

export default function EmailSentPage() {
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  async function handleResend() {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    setResendCooldown(60);
  }

  return (
    <AuthCard>
      <SuccessScreen
        icon={
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail size={28} className="text-primary" strokeWidth={1.8} />
          </div>
        }
        title="Check your inbox"
        description="We've sent a password reset link to your email address. The link will expire in 1 hour."
      >
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LoadingButton variant="primary">
            <Mail size={16} />
            Open Email App
          </LoadingButton>
        </a>

        <LoadingButton
          variant="secondary"
          onClick={handleResend}
          loading={isResending}
          disabled={resendCooldown > 0}
        >
          <RefreshCw size={14} />
          {resendCooldown > 0
            ? `Resend email in ${resendCooldown}s`
            : "Resend email"}
        </LoadingButton>

        <div className="pt-2 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-paragraph hover:text-heading transition-colors"
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </div>
      </SuccessScreen>
    </AuthCard>
  );
}
