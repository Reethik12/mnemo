"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { fadeInUp } from "@/lib/animations";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title={isSent ? "Check your email" : "Forgot password"}
      description={
        isSent
          ? `We've sent a reset link to ${email}`
          : "Enter your email to receive a password reset link"
      }
      footer={
        <Link
          href="/login"
          className="text-accent-purple-light hover:text-accent-purple font-medium transition-colors"
        >
          ← Back to Login
        </Link>
      }
    >
      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.form
            key="form"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <Input
              label="Email"
              type="email"
              placeholder="alex@mnemo.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
            >
              Send Reset Link
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center py-4"
          >
            <div className="bg-status-success/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-status-success h-8 w-8"
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
            <p className="text-text-secondary text-sm">
              Didn&apos;t receive an email?{" "}
              <button
                onClick={() => setIsSent(false)}
                className="text-accent-purple-light font-medium"
              >
                Try again
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthCard>
  );
}
