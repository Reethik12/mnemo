/**
 * Mock notification service.
 * Provides notification data and operations.
 * Designed to be swapped for real API calls later.
 */

import type { Notification } from "@/types/notification";

// ─── Mock Data ───────────────────────────────────────

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_001",
    title: "Welcome to Mnemo",
    message:
      "Your Living Memory Operating System is ready. Start by exploring the dashboard.",
    type: "success",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "notif_002",
    title: "Getting Started",
    message:
      "Check out the available modules to see what Mnemo can do for you.",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: "notif_003",
    title: "Privacy First",
    message:
      "Your data stays private. Review your privacy settings anytime in Settings.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

/** Simulate network delay */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Service ─────────────────────────────────────────

export const notificationService = {
  /**
   * Get all notifications.
   */
  async getNotifications(): Promise<Notification[]> {
    await delay();
    return [...MOCK_NOTIFICATIONS];
  },

  /**
   * Mark a single notification as read.
   */
  async markAsRead(id: string): Promise<void> {
    await delay(200);
    const notif = MOCK_NOTIFICATIONS.find((n) => n.id === id);
    if (notif) notif.read = true;
  },

  /**
   * Mark all notifications as read.
   */
  async markAllRead(): Promise<void> {
    await delay(200);
    MOCK_NOTIFICATIONS.forEach((n) => {
      n.read = true;
    });
  },
};
