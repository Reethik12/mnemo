"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { VerificationCodeInput } from "@/components/auth/verification-code-input";
import { useAuth } from "@/hooks/use-auth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { verifyEmail } = useAuth();
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleComplete = useCallback(
    async (code: string) => {
      setError("");
      try {
        await verifyEmail(code);
        router.push("/welcome");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed");
      }
    },
    [verifyEmail, router],
  );

  const handleResend = () => {
    setCooldown(30);
  };

  return (
    <AuthCard
      title="Verify your email"
      description="We've sent a 6-digit code to your email address"
    >
      <div className="flex flex-col items-center gap-6 py-4">
        {/* Email icon */}
        <div className="bg-accent-purple/10 flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-accent-purple h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>

        <VerificationCodeInput onComplete={handleComplete} error={error} />

        <p className="text-text-tertiary text-sm">
          Didn&apos;t receive a code?{" "}
          {cooldown > 0 ? (
            <span className="text-text-secondary">Resend in {cooldown}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-accent-purple-light hover:text-accent-purple font-medium transition-colors"
            >
              Resend
            </button>
          )}
        </p>

        <p className="text-text-tertiary text-xs">
          Mock code: <code className="text-accent-cyan font-mono">000000</code>
        </p>
      </div>
    </AuthCard>
  );
}
