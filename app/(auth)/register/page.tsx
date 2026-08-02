"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import {
  AuthCard,
  AuthHeader,
  AuthFooter,
  FormInput,
  PasswordInput,
  PasswordStrength,
  LoadingButton,
  SocialLoginButtons,
  FormDivider,
} from "@/app/components/auth";
import { registerSchema, type RegisterFormData } from "@/validation/auth";
import { cn } from "@/utils";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = watch("password");

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Register:", data);
    setIsLoading(false);
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        description="Start shortening links in seconds"
      />

      <SocialLoginButtons isLoading={isLoading} />

      <FormDivider />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormInput
          label="Full name"
          type="text"
          placeholder="John Doe"
          icon={User}
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <FormInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="space-y-3">
          <PasswordInput
            label="Password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordStrength password={password || ""} />
        </div>

        <PasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Terms checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              className={cn(
                "mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer shrink-0",
                errors.acceptTerms && "border-danger"
              )}
              {...register("acceptTerms")}
            />
            <span className="text-xs text-paragraph leading-relaxed">
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.acceptTerms && (
            <p
              role="alert"
              className="text-xs text-danger mt-1.5 ml-6 animate-fade-in"
            >
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <LoadingButton type="submit" loading={isLoading} className="mt-2">
          Create account
        </LoadingButton>
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    </AuthCard>
  );
}
