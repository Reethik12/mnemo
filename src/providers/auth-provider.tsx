"use client";

import {
  createContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { User } from "@/types/user";
import type { LoginCredentials, RegisterData } from "@/types/auth";
import { authService, mapBetterAuthUser } from "@/services/auth-service";
import { useSession, signOut } from "@/lib/auth/client";

// ─── Context Type ────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isMutating, setIsMutating] = useState(false);

  // Only block rendering if it's loading AND we don't have session data yet
  const isLoading = (isSessionLoading && session === undefined) || isMutating;

  const user = useMemo(() => {
    if (!session?.user) return null;
    return mapBetterAuthUser(session.user as Record<string, unknown>);
  }, [session?.user]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsMutating(true);
    try {
      await authService.login(credentials);
    } finally {
      setIsMutating(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setIsMutating(true);
    try {
      await authService.loginWithGoogle();
    } finally {
      setIsMutating(false);
    }
  }, []);

  const loginWithMagicLink = useCallback(async (email: string) => {
    setIsMutating(true);
    try {
      await authService.loginWithMagicLink(email);
    } finally {
      setIsMutating(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<User> => {
    setIsMutating(true);
    try {
      return await authService.register(data);
    } finally {
      setIsMutating(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsMutating(true);
    try {
      await signOut();
      window.location.href = "/login";
    } finally {
      setIsMutating(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setIsMutating(true);
    try {
      await authService.forgotPassword(email);
    } finally {
      setIsMutating(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    setIsMutating(true);
    try {
      await authService.resetPassword(token, password);
    } finally {
      setIsMutating(false);
    }
  }, []);

  const verifyEmail = useCallback(async (code: string) => {
    setIsMutating(true);
    try {
      await authService.verifyEmail(code);
    } finally {
      setIsMutating(false);
    }
  }, []);

  const handleSetUser = useCallback((_updatedUser: User) => {
    // With Better Auth managing the session natively, manually setting 
    // the user context is an anti-pattern. Updates should go through Better Auth.
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      loginWithGoogle,
      loginWithMagicLink,
      register,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      setUser: handleSetUser,
    }),
    [
      user,
      isLoading,
      login,
      loginWithGoogle,
      loginWithMagicLink,
      register,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      handleSetUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
