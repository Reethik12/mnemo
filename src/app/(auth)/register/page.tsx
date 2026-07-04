"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { AuthDivider } from "@/components/auth/auth-divider";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, loginWithMagicLink } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name,
        email,
        password,
      });

      // Registration successful → Go directly to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      description="Start building your Living Memory"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent-purple-light hover:text-accent-purple font-medium transition-colors"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SocialLoginButtons
        isLoading={isLoading}
        onGoogleClick={() => {
          loginWithGoogle().catch((err) => {
            setError(err instanceof Error ? err.message : "Google login failed");
          });
        }}
        onMagicLinkClick={() => {
          if (!email) {
            setError("Please enter your email for the magic link");
            return;
          }

          loginWithMagicLink(email)
            .then(() => {
              setError("Magic link sent to your email!");
            })
            .catch((err) => {
              setError(err instanceof Error ? err.message : "Failed to send magic link");
            });
        }}
      />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Alex Chen"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />

        <Input
          label="Email"
          type="email"
          placeholder="alex@mnemo.ai"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <div>
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <PasswordStrength password={password} />
        </div>

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          error={
            confirmPassword && password !== confirmPassword
              ? "Passwords do not match"
              : undefined
          }
        />

        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <label className="text-text-secondary flex items-start gap-2 text-xs">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="bg-surface border-border accent-accent-purple mt-0.5 rounded"
          />
          <span>
            I agree to the{" "}
            <span className="text-accent-purple-light">Terms of Service</span>{" "}
            and{" "}
            <span className="text-accent-purple-light">Privacy Policy</span>
          </span>
        </label>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="mt-2 w-full"
        >
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}