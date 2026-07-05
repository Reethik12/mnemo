import type { Notification } from "./types";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "Access Request",
    message: "Elena Rodriguez requested access to 'AI & ML Research'.",
    type: "access_request",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "notif-2",
    title: "Memory Improved",
    message:
      "Digital Twin found 3 new relationships for 'React Server Components'.",
    type: "memory_improved",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "notif-3",
    title: "Timeline Updated",
    message: "A new version of your project architecture was created.",
    type: "timeline_updated",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];
