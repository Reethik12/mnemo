import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/user";

export const userService = {
  async updateProfile(
    userId: string,
    updates: Partial<Pick<User, "name" | "email" | "avatar">>,
  ): Promise<User> {
    return apiClient.patch<User>(`/api/users/${userId}`, updates);
  },
  async getProfile(userId: string): Promise<User> {
    return apiClient.get<User>(`/api/users/${userId}`);
  },
};
