"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  AuthHeader,
  FormInput,
  LoadingButton,
} from "@/app/components/auth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/validation/auth";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Forgot password:", data);
    router.push("/email-sent");
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email and we'll send you a reset link"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <LoadingButton type="submit" loading={isLoading} className="mt-2">
          Send reset link
        </LoadingButton>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-paragraph hover:text-heading transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </AuthCard>
  );
}
