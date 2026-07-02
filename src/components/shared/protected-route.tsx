"use client";

import type { ReactNode } from "react";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { LoadingIndicator } from "@/components/ui/loading-indicator";

/**
 * Protects child routes by requiring authentication.
 * Redirects to /login if user is not authenticated.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoading } = useProtectedRoute();

  if (isLoading) {
    return (
      <div className="bg-bg-primary flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-gradient">Mnemo</span>
          </div>
          <LoadingIndicator variant="dots" size="md" label="Loading Mnemo" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
