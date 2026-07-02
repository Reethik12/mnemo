"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook using useSyncExternalStore.
 * Returns false during SSR, then resolves on the client.
 *
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => {
    return false;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
