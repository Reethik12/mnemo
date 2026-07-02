"use client";

import { useState, useCallback } from "react";

export function useRecentMemories(maxRecent = 5) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  const addRecent = useCallback(
    (id: string) => {
      setRecentIds((prev) => {
        const newRecent = [id, ...prev.filter((r) => r !== id)];
        return newRecent.slice(0, maxRecent);
      });
    },
    [maxRecent],
  );

  return { recentIds, addRecent };
}
