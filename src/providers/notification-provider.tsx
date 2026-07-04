"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { Notification } from "@/types/notification";
import { notificationService } from "@/services/notification-service";

import { useSession } from "@/lib/auth/client";

// ─── Context Type ────────────────────────────────────

export interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  refresh: () => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

// ─── Provider ────────────────────────────────────────

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, isPending } = useSession();

  const fetchNotifications = useCallback(async () => {
    if (!session) return;
    setIsLoading(true);
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (isPending) return;

    if (session) {
      fetchNotifications();
    } else {
      setIsLoading(false);
      setNotifications([]);
    }
  }, [isPending, session, fetchNotifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    notificationService.markAsRead(id);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notificationService.markAllRead();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount,
      isLoading,
      markAsRead,
      markAllRead,
      refresh: fetchNotifications,
    }),
    [
      notifications,
      unreadCount,
      isLoading,
      markAsRead,
      markAllRead,
      fetchNotifications,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
