import type { User } from "@/types/user";
import type { LoginCredentials, RegisterData } from "@/types/auth";
import {
  signIn,
  signUp,
} from "@/lib/auth/client";

// ─── Mapper ──────────────────────────────────────────

export function mapBetterAuthUser(user: Record<string, unknown>): User {
  return {
    id: String(user.id || ""),
    name: String(user.name || "User"),
    email: String(user.email || ""),
    workspace: {
      id: "ws_default_001",
      name: "Personal Workspace",
      plan: "free",
      memberSince: String(user.createdAt || new Date().toISOString()),
    },
    plan: "free",
    createdAt: String(user.createdAt || new Date().toISOString()),
  };
}

// ─── Service ─────────────────────────────────────────

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const { data, error } = await signIn.email({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      if (error.message?.includes("fetch failed") || error.message?.includes("connect")) {
        throw new Error("Database connection failed. Ensure PostgreSQL is running and DATABASE_URL is correctly configured in .env.");
      }
      throw new Error(error.message || "Failed to login");
    }
    return mapBetterAuthUser(data.user as Record<string, unknown>);
  },

  async loginWithGoogle(): Promise<User> {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    if (error) {
      if (error.message?.includes("Provider not found")) {
        throw new Error(
          "Google OAuth is not configured. You must set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables. Obtain these from the Google Cloud Console (APIs & Services > Credentials).",
        );
      }
      if (error.message?.includes("fetch failed") || error.message?.includes("connect")) {
        throw new Error("Database connection failed. Ensure PostgreSQL is running and DATABASE_URL is correctly configured in .env.");
      }
      throw new Error(error.message || "Failed to login with Google");
    }
    // Browser will redirect, return dummy user to satisfy type
    return mapBetterAuthUser({ id: "", email: "", name: "" });
  },

  async loginWithMagicLink(email: string): Promise<void> {
    const { error } = await signIn.magicLink({ email });
    if (error) {
      if (error.message?.includes("fetch failed") || error.message?.includes("connect")) {
        throw new Error("Database connection failed. Ensure PostgreSQL is running and DATABASE_URL is correctly configured in .env.");
      }
      throw new Error(
        "SMTP Configuration is missing. You must configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD in your environment variables to send Magic Links.",
      );
    }
  },

  async register(data: RegisterData): Promise<User> {
    const { data: resultData, error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    if (error) {
      if (error.message?.includes("fetch failed") || error.message?.includes("connect") || error.message?.includes("PrismaClientInitializationError") || error.message?.includes("P1001")) {
        throw new Error("Database connection failed. Ensure PostgreSQL is running and DATABASE_URL is correctly configured in .env.");
      }
      throw new Error(error.message || "Failed to register");
    }
    return mapBetterAuthUser(resultData.user as Record<string, unknown>);
  },

  async forgotPassword(_email: string): Promise<void> {
    throw new Error("SMTP and Better Auth email verification configuration required for password reset.");
  },

  async resetPassword(_token: string, _newPassword: string): Promise<boolean> {
    throw new Error("SMTP and Better Auth email verification configuration required for password reset.");
  },

  async verifyEmail(_code: string): Promise<boolean> {
    throw new Error("SMTP configuration required for email verification.");
  },

  getMockUser(): User {
    return mapBetterAuthUser({
      id: "usr_mnemo_001",
      name: "Alex Chen",
      email: "alex@mnemo.ai",
    });
  },
};
