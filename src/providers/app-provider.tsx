"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { WorkspaceProvider } from "./workspace-provider";
import { RealtimeProvider } from "./realtime-provider";
import { AgentProvider } from "./agent-provider";
import { PlannerProvider } from "./planner-provider";
import { OrchestratorProvider } from "./orchestrator-provider";
import { RuntimeProvider } from "./runtime-provider";
import { DeveloperProvider } from "./developer-provider";
import { PluginProvider } from "./plugin-provider";
import { AdminProvider } from "./admin-provider";
import { NotificationProvider } from "./notification-provider";
import { ToastProvider } from "./toast-provider";
import { MemoryProvider } from "./memory-provider";

// ─── Composed Provider ───────────────────────────────

/**
 * Composes all application-level providers into a single wrapper.
 * Order: Theme → Auth → Workspace → Realtime → Agent → Planner → Orchestrator → Runtime → Developer → Plugin → Admin → Notification
 */
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  );
}
