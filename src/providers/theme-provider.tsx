"use client";

import { createContext, useMemo, type ReactNode } from "react";
import type { Theme, ThemeState } from "@/types/theme";

// ─── Context Type ────────────────────────────────────

export interface ThemeContextValue extends ThemeState {
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ────────────────────────────────────────

/**
 * Theme provider — dark mode only for Phase 2.
 * Exists for future compatibility. Theme switching is disabled.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: "dark",
      resolvedTheme: "dark",
      setTheme: () => {
        // Theme switching is disabled in Phase 2.
        // Dark mode is the only supported theme.
      },
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
