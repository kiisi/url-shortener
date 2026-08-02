"use client";

import Link from "next/link";
import { AuthCard, SuccessScreen, LoadingButton } from "@/app/components/auth";

export default function ResetSuccessPage() {
  return (
    <AuthCard>
      <SuccessScreen
        title="Password updated"
        description="Your password has been updated successfully. You can now sign in with your new password."
      >
        <Link href="/login">
          <LoadingButton variant="primary">Go to sign in</LoadingButton>
        </Link>
      </SuccessScreen>
    </AuthCard>
  );
}
