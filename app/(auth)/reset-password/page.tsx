"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  AuthCard,
  AuthHeader,
  PasswordInput,
  PasswordStrength,
  LoadingButton,
} from "@/app/components/auth";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/validation/auth";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Reset password:", data);
    router.push("/reset-success");
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Reset your password"
        description="Enter a new password for your account"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-3">
          <PasswordInput
            label="New password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrength password={password || ""} />
        </div>

        <PasswordInput
          label="Confirm new password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <LoadingButton type="submit" loading={isLoading} className="mt-2">
          Reset password
        </LoadingButton>
      </form>
    </AuthCard>
  );
}
