"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { AuthDivider } from "@/components/auth/auth-divider";
import { PasswordInput } from "@/components/auth/password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, loginWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your Mnemo account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-accent-purple-light hover:text-accent-purple font-medium transition-colors"
          >
            Register
          </Link>
        </>
      }
    >
      <SocialLoginButtons
        isLoading={isLoading}
        onGoogleClick={() => {
          loginWithGoogle().then(() => router.push("/dashboard"));
        }}
        onMagicLinkClick={() => {
          if (!email) {
            setError("Please enter your email for the magic link");
            return;
          }
          loginWithMagicLink(email).then(() => {
            setError("Magic link sent to your email!");
          });
        }}
      />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="alex@mnemo.ai"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <label className="text-text-secondary flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              className="bg-surface border-border accent-accent-purple rounded"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-accent-purple-light hover:text-accent-purple text-xs font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          className="mt-2 w-full"
        >
          Sign In
        </Button>
      </form>
    </AuthCard>
  );
}
