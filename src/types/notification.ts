/**
 * Notification type definitions.
 */

export type NotificationType = "info" | "success" | "warning";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}
