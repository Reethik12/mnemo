import { useState, useCallback, useEffect } from "react";
import type {
  Notification,
  SearchResult,
  MnemoChatMessage,
} from "@/services/mnemo-ai/types";
import { useToast } from "@/hooks/use-toast";

export function useMnemoAI() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
  const { error } = useToast();

  const fetchNotifications = useCallback(async () => {
    setIsNotificationsLoading(true);
    try {
      const res = await fetch("/api/mnemo/notifications");
      if (res.ok) {
        setNotifications(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsNotificationsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchNotifications();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchNotifications]);

  const markNotificationRead = async (id: string) => {
    try {
      const res = await fetch(`/api/mnemo/notifications/${id}/read`, {
        method: "POST",
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const globalSearch = async (query: string): Promise<SearchResult[]> => {
    try {
      const res = await fetch(
        `/api/mnemo/search?q=${encodeURIComponent(query)}`,
      );
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const chat = async (message: string): Promise<MnemoChatMessage | null> => {
    try {
      const res = await fetch("/api/mnemo/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      error("Failed to connect to Mnemo AI");
    }
    return null;
  };

  return {
    notifications,
    isNotificationsLoading,
    markNotificationRead,
    globalSearch,
    chat,
    refetchNotifications: fetchNotifications,
  };
}
