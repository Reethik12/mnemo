"use client";

import { useContext } from "react";
import {
  NotificationContext,
  type NotificationContextValue,
} from "@/providers/notification-provider";

/**
 * Access the notification context.
 * Must be used within a NotificationProvider.
 */
export function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
