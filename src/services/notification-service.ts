import { apiClient } from "@/lib/api-client";
import { Notification } from "@/types/notification";
import { MOCK_NOTIFICATIONS } from "@/services/mnemo-ai/mock-data";

const USER_ID = "00000000-0000-0000-0000-000000000000";

export const notificationService = {
  async getNotifications(page = 1, limit = 50): Promise<Notification[]> {
    const backendNotifs = await apiClient.get<Notification[]>(
      `/api/notifications?userId=${USER_ID}&page=${page}&limit=${limit}`,
    );

    // Transform mock notifications to match Notification type
    const mockNotifs: Notification[] = MOCK_NOTIFICATIONS.map((m) => ({
      id: m.id,
      userId: USER_ID,
      title: m.title,
      message: m.message,
      type: "info",
      read: m.isRead,
      createdAt: m.timestamp,
      updatedAt: m.timestamp,
      metadata: null,
    }));

    return [...mockNotifs, ...backendNotifs];
  },

  async markAsRead(id: string): Promise<Notification> {
    if (id.startsWith("notif-")) {
      const m = MOCK_NOTIFICATIONS.find((n) => n.id === id);
      if (m) m.isRead = true;
      return {} as Notification;
    }
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
