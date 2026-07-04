"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";

// ─── Composed Provider ───────────────────────────────

/**
 * Composes all application-level providers into a single wrapper.
 * Order: Theme → Auth → Workspace → Realtime → Agent → Planner → Orchestrator → Runtime → Developer → Plugin → Admin → Notification
 */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        {/*
        <WorkspaceProvider>
          <RealtimeProvider>
            <AgentProvider>
              <PlannerProvider>
                <OrchestratorProvider>
                  <RuntimeProvider>
                    <DeveloperProvider>
                      <PluginProvider>
                        <AdminProvider>
                          <NotificationProvider>
                            <ToastProvider>
                              <MemoryProvider>{children}</MemoryProvider>
                            </ToastProvider>
                          </NotificationProvider>
                        </AdminProvider>
                      </PluginProvider>
                    </DeveloperProvider>
                  </RuntimeProvider>
                </OrchestratorProvider>
              </PlannerProvider>
            </AgentProvider>
          </RealtimeProvider>
        </WorkspaceProvider>
        */}
      </AuthProvider>
    </ThemeProvider>
  );
}
