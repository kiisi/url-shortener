"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import {
  AuthCard,
  AuthHeader,
  AuthFooter,
  FormInput,
  PasswordInput,
  LoadingButton,
  SocialLoginButtons,
  FormDivider,
} from "@/app/components/auth";
import { loginSchema, type LoginFormData } from "@/validation/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(payload: LoginFormData) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Data", data);
      toast.success(data.message);
      router.push("/home");
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }
    // Simulate API call
    console.log("Register:", payload);
    setIsLoading(false);
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        description="Sign in to your MiniURL account"
      />

      <SocialLoginButtons isLoading={isLoading} />

      <FormDivider />

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

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
            />
            <span className="text-xs text-paragraph">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <LoadingButton type="submit" loading={isLoading} className="mt-2">
          Sign in
        </LoadingButton>
      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        href="/register"
      />
    </AuthCard>
  );
}
