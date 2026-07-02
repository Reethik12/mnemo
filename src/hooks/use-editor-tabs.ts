"use client";

import { useState, useCallback } from "react";

export function useEditorTabs(maxTabs = 10) {
  const [openTabIds, setOpenTabIds] = useState<string[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const openTab = useCallback(
    (id: string) => {
      setOpenTabIds((prev) => {
        if (prev.includes(id)) return prev;
        const newTabs = [...prev, id];
        if (newTabs.length > maxTabs) {
          newTabs.shift(); // Remove oldest if exceeding max
        }
        return newTabs;
      });
      setActiveTabId(id);
    },
    [maxTabs],
  );

  const closeTab = useCallback((id: string) => {
    setOpenTabIds((prev) => {
      const newTabs = prev.filter((tabId) => tabId !== id);

      setActiveTabId((currentActive) => {
        if (currentActive === id) {
          return newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
        }
        return currentActive;
      });

      return newTabs;
    });
  }, []);

  const reorderTabs = useCallback((newOrder: string[]) => {
    setOpenTabIds(newOrder);
  }, []);

  return {
    openTabIds,
    activeTabId,
    setActiveTabId,
    openTab,
    closeTab,
    reorderTabs,
  };
}
