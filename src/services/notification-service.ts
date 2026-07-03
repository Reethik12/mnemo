import { apiClient } from "@/lib/api-client";
import { Notification } from "@/types/notification";

const USER_ID = "00000000-0000-0000-0000-000000000000";

export const notificationService = {
  async getNotifications(page = 1, limit = 50): Promise<Notification[]> {
    return apiClient.get<Notification[]>(
      `/api/notifications?userId=${USER_ID}&page=${page}&limit=${limit}`,
    );
  },

  async markAsRead(id: string): Promise<Notification> {
    return apiClient.patch<Notification>(`/api/notifications/${id}`, {});
  },

  async markAllRead(): Promise<void> {
    const notifications = await this.getNotifications();
    await Promise.all(
      notifications.filter((n) => !n.read).map((n) => this.markAsRead(n.id)),
    );
  },

  async deleteNotification(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/notifications/${id}`);
  },
};
