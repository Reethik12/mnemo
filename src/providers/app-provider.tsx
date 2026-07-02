"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { NotificationProvider } from "./notification-provider";
import { MemoryProvider } from "./memory-provider";
import { ToastProvider } from "./toast-provider";

// ─── Composed Provider ───────────────────────────────

/**
 * Composes all application-level providers into a single wrapper.
 * Order: Auth → Theme → Notification
 */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ToastProvider>
            <MemoryProvider>{children}</MemoryProvider>
          </ToastProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
