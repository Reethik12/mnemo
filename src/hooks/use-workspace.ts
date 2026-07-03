"use client";

import { useWorkspaceContext } from "@/providers/workspace-provider";

export function useWorkspace() {
  const {
    workspaces,
    activeWorkspace,
    switchWorkspace,
    createWorkspace,
    isLoading,
  } = useWorkspaceContext();

  return {
    workspaces,
    activeWorkspace: activeWorkspace || {
      id: "personal",
      name: "Personal Hub",
      color: "bg-accent-purple",
      isActive: true,
    },
    switchWorkspace,
    createWorkspace,
    isLoading,
  };
}
