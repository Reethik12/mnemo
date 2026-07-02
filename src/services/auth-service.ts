/**
 * Mock authentication service.
 * Simulates authentication operations with artificial delays.
 * Designed to be swapped for real API calls later.
 */

import type { User } from "@/types/user";
import type { LoginCredentials, RegisterData } from "@/types/auth";

// ─── Mock Data ───────────────────────────────────────

const MOCK_USER: User = {
  id: "usr_mnemo_001",
  name: "Alex Chen",
  email: "alex@mnemo.ai",
  workspace: {
    id: "ws_default_001",
    name: "Personal Workspace",
    plan: "free",
    memberSince: "2025-01-15",
  },
  plan: "free",
  createdAt: "2025-01-15T09:00:00Z",
};

const MOCK_CREDENTIALS = {
  email: "alex@mnemo.ai",
  password: "mnemo123",
};

/** Simulate network delay */
function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Service ─────────────────────────────────────────

export const authService = {
  /**
   * Authenticate a user with email and password.
   * Mock: accepts alex@mnemo.ai / mnemo123
   */
  async login(credentials: LoginCredentials): Promise<User> {
    await delay();
    if (
      credentials.email === MOCK_CREDENTIALS.email &&
      credentials.password === MOCK_CREDENTIALS.password
    ) {
      return { ...MOCK_USER };
    }
    throw new Error("Invalid email or password. Try alex@mnemo.ai / mnemo123");
  },

  /**
   * Register a new user.
   * Mock: always succeeds and returns a user with the provided data.
   */
  async register(data: RegisterData): Promise<User> {
    await delay(1000);
    return {
      ...MOCK_USER,
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Request a password reset email.
   * Mock: always succeeds.
   */
  async forgotPassword(email: string): Promise<void> {
    console.debug("Forgot password for", email);
    await delay();
  },

  /**
   * Reset password with a token.
   * Mock: always succeeds.
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    console.debug("Resetting with", token, newPassword);
    await delay();
    return true;
  },

  /**
   * Verify email with a code.
   * Mock: accepts "000000" as the valid code.
   */
  async verifyEmail(code: string): Promise<boolean> {
    console.debug("Verifying", code);
    await delay();
    if (code !== "000000") {
      throw new Error("Invalid verification code. Try 000000");
    }
    return true;
  },

  /**
   * Get the mock user for session restoration.
   */
  getMockUser(): User {
    return { ...MOCK_USER };
  },
};
