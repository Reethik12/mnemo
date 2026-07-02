"use client";

import { useState, useEffect } from "react";
import { OfflineState } from "@/types";

export function useOffline(): OfflineState {
  const [isOffline, setIsOffline] = useState(() =>
    typeof window !== "undefined" ? !navigator.onLine : false,
  );
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(() =>
    typeof window !== "undefined" && navigator.onLine
      ? new Date().toISOString()
      : null,
  );
  const [pendingChanges, setPendingChanges] = useState(() =>
    typeof window !== "undefined" && !navigator.onLine
      ? Math.floor(Math.random() * 5) + 1
      : 0,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOffline(false);
      setLastSyncAt(new Date().toISOString());
      setPendingChanges(0);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setPendingChanges(Math.floor(Math.random() * 5) + 1);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return {
    isOffline,
    lastSyncAt,
    pendingChanges,
  };
}
