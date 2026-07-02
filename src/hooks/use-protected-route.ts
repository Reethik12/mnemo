"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

/**
 * Route protection hook.
 * Redirects to /login if user is not authenticated.
 * Returns loading state so the component can show a loading indicator.
 */
export function useProtectedRoute(): { isLoading: boolean } {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return { isLoading: isLoading || !isAuthenticated };
}
