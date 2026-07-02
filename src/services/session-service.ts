/**
 * Mock session management service.
 * Uses sessionStorage for persistence during the browser session.
 * Designed to be swapped for real session management later.
 */

import type { User } from "@/types/user";

const SESSION_KEY = "mnemo_session";

export const sessionService = {
  /**
   * Get the current session user from storage.
   */
  getSession(): User | null {
    if (typeof window === "undefined") return null;
    try {
      const data = sessionStorage.getItem(SESSION_KEY);
      return data ? (JSON.parse(data) as User) : null;
    } catch {
      return null;
    }
  },

  /**
   * Save a user session to storage.
   */
  setSession(user: User): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  /**
   * Clear the current session.
   */
  clearSession(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(SESSION_KEY);
  },

  /**
   * Check if a session exists.
   */
  hasSession(): boolean {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) !== null;
  },
};
