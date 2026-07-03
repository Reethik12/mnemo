import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth } from "@/hooks/use-auth";
import { useWorkspace } from "@/hooks/use-workspace";
import { RealtimeClient } from "@/lib/realtime/client";
import {
  type PresenceUser,
  type RealtimeEventType,
  type RealtimeCallback,
  type RealtimeEvent,
} from "@/lib/realtime/types";
import { usePathname } from "next/navigation";

interface RealtimeContextType {
  presenceUsers: PresenceUser[];
  isOnline: boolean;
  subscribe: <T extends RealtimeEventType>(
    type: T,
    cb: RealtimeCallback<T>,
  ) => () => void;
  publish: <T extends RealtimeEventType>(
    type: T,
    payload: RealtimeEvent<T>["payload"],
  ) => Promise<void>;
  enqueueOfflineAction: (action: () => Promise<void>) => void;
}

const RealtimeContext = createContext<RealtimeContextType | null>(null);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const pathname = usePathname();

  const [presenceUsers, setPresenceUsers] = useState<PresenceUser[]>([]);
  const [isOnline, setIsOnline] = useState(() =>
    typeof window !== "undefined" ? navigator.onLine : true,
  );
  const [_offlineQueue, _setOfflineQueue] = useState<(() => Promise<void>)[]>(
    [],
  );

  // Track online/offline states
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOnline(true);
      // Flush offline action queue
      _setOfflineQueue((prev) => {
        prev.forEach((act) =>
          act().catch((e) => console.error("Failed to sync action", e)),
        );
        return [];
      });
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const activeWorkspaceId = activeWorkspace?.id;
  const userId = user?.id;
  const client = useMemo(() => {
    if (!activeWorkspaceId || !userId) return null;
    return new RealtimeClient(activeWorkspaceId, userId);
  }, [activeWorkspaceId, userId]);

  // Handle SSE Connection and Presence reporting
  useEffect(() => {
    if (!client || !activeWorkspace?.id || !user) return;

    client.connect();

    // Subscribe to presence updates
    const unsubscribePresence = client.subscribe("PresenceUpdated", (event) => {
      setPresenceUsers(event.payload.users);
    });

    // Periodically post our active state
    const reportPresence = async () => {
      if (!isOnline) return;
      try {
        await fetch("/api/realtime/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workspaceId: activeWorkspace.id,
            presence: {
              userId: user.id,
              name: user.name,
              avatar: user.avatar,
              currentPage: pathname,
              editingStatus: pathname.includes("memory/")
                ? "editing"
                : "viewing",
              isIdle: false,
            },
          }),
        });
      } catch (err) {
        console.warn("Failed to report presence", err);
      }
    };

    reportPresence();
    const interval = setInterval(reportPresence, 12000);

    return () => {
      clearInterval(interval);
      unsubscribePresence();
      client.disconnect();
    };
  }, [client, activeWorkspace?.id, user, pathname, isOnline]);

  const subscribe = useCallback(
    <T extends RealtimeEventType>(type: T, cb: RealtimeCallback<T>) => {
      if (!client) return () => {};
      return client.subscribe(type, cb);
    },
    [client],
  );

  const publish = useCallback(
    async <T extends RealtimeEventType>(
      type: T,
      payload: RealtimeEvent<T>["payload"],
    ) => {
      if (!activeWorkspaceId) return;
      await RealtimeClient.publish(activeWorkspaceId, type, payload);
    },
    [activeWorkspaceId],
  );

  const enqueueOfflineAction = useCallback((action: () => Promise<void>) => {
    if (navigator.onLine) {
      action().catch((e) => console.error("Failed to run action directly", e));
    } else {
      _setOfflineQueue((prev) => [...prev, action]);
    }
  }, []);

  const value = useMemo(
    () => ({
      presenceUsers,
      isOnline,
      subscribe,
      publish,
      enqueueOfflineAction,
    }),
    [presenceUsers, isOnline, subscribe, publish, enqueueOfflineAction],
  );

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const ctx = useContext(RealtimeContext);
  if (!ctx) {
    throw new Error("useRealtime must be used within a RealtimeProvider");
  }
  return ctx;
}
