"use client";

import { useState, useCallback } from "react";
import { WorkspaceState } from "@/types";

const MOCK_WORKSPACES: WorkspaceState[] = [
  {
    id: "personal",
    name: "Personal Hub",
    color: "bg-accent-purple",
    isActive: true,
  },
  { id: "work", name: "Acme Corp", color: "bg-blue-500", isActive: false },
  {
    id: "research",
    name: "AI Research",
    color: "bg-emerald-500",
    isActive: false,
  },
];

export function useWorkspace() {
  const [workspaces, setWorkspaces] =
    useState<WorkspaceState[]>(MOCK_WORKSPACES);

  const activeWorkspace = workspaces.find((w) => w.isActive) || workspaces[0];

  const switchWorkspace = useCallback((id: string) => {
    setWorkspaces((prev) =>
      prev.map((w) => ({
        ...w,
        isActive: w.id === id,
      })),
    );
  }, []);

  return {
    workspaces,
    activeWorkspace,
    switchWorkspace,
  };
}
