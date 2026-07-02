/**
 * Mock user service.
 * Provides user data operations.
 * Designed to be swapped for real API calls later.
 */

import type { User } from "@/types/user";

/** Simulate network delay */
function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const userService = {
  /**
   * Update user profile.
   * Mock: returns updated user after simulated delay.
   */
  async updateProfile(
    user: User,
    updates: Partial<Pick<User, "name" | "email" | "avatar">>,
  ): Promise<User> {
    await delay();
    return { ...user, ...updates };
  },
};
