"use client";

import { useEffect, useCallback } from "react";

interface ShortcutHandler {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  handler: () => void;
}

/**
 * Register global keyboard shortcuts.
 * Supports ⌘ (Mac) and Ctrl (other OS) modifier.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const metaMatch = shortcut.metaKey ? e.metaKey || e.ctrlKey : true;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (metaMatch && keyMatch) {
          e.preventDefault();
          shortcut.handler();
          return;
        }
      }
    },
    [shortcuts],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
