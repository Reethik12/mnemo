"use client";

import type { User } from "@/types/user";
import { useAuth } from "./use-auth";

/**
 * Convenience hook for accessing the current user.
 * Returns null if not authenticated.
 */
export function useUser(): User | null {
  const { user } = useAuth();
  return user;
}
