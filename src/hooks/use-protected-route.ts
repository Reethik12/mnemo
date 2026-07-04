"use client";

import { useEffect, useState } from "react";
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
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsTimeout(true), 5000);
      return () => clearTimeout(timer);
    }
    setIsTimeout(false);
  }, [isLoading]);

  useEffect(() => {
    if ((!isLoading || isTimeout) && !isAuthenticated) {
      // Clear cookies manually to prevent infinite redirect loops with middleware 
      // when the backend is unreachable (e.g., Prisma errors)
      document.cookie = "better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "__Secure-better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      router.replace("/login");
    }
  }, [isLoading, isTimeout, isAuthenticated, router]);

  // If it's still loading but we hit the timeout, we stop showing the loading screen
  // If we are not authenticated, we keep the loading screen up while the router redirects
  return { isLoading: (isLoading && !isTimeout) || !isAuthenticated };
}
