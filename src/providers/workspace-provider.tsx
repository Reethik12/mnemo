import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth } from "@/hooks/use-auth";
import type { WorkspaceState } from "@/types";

interface WorkspaceContextType {
  workspaces: WorkspaceState[];
  activeWorkspace: WorkspaceState | null;
  isLoading: boolean;
  switchWorkspace: (id: string) => void;
  createWorkspace: (name: string) => Promise<void>;
  refreshWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<WorkspaceState[]>([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaces = useCallback(async () => {
    if (!user) {
      setWorkspaces([]);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/workspaces?userId=${user.id}`);
      const payload = await res.json();
      if (payload.success && Array.isArray(payload.data)) {
        const mapped: WorkspaceState[] = payload.data.map(
          (w: { id: string; name: string }, index: number) => ({
            id: w.id,
            name: w.name,
            color:
              index % 3 === 0
                ? "bg-accent-purple"
                : index % 3 === 1
                  ? "bg-blue-500"
                  : "bg-emerald-500",
            isActive: false,
          }),
        );

        setWorkspaces(mapped);

        // Restore active selection from local storage
        const savedId = localStorage.getItem(`mnemo_active_ws_${user.id}`);
        const found = mapped.find((w) => w.id === savedId);
        if (found) {
          setActiveWorkspaceId(found.id);
        } else if (mapped.length > 0) {
          setActiveWorkspaceId(mapped[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load workspaces", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      fetchWorkspaces();
    }, 0);
  }, [fetchWorkspaces]);

  const switchWorkspace = useCallback(
    (id: string) => {
      if (user) {
        localStorage.setItem(`mnemo_active_ws_${user.id}`, id);
      }
      setActiveWorkspaceId(id);
    },
    [user],
  );

  const createWorkspace = useCallback(
    async (name: string) => {
      try {
        const res = await fetch("/api/workspaces", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        const payload = await res.json();
        if (payload.success) {
          await setTimeout(() => {
            fetchWorkspaces();
          }, 0);
          // Switch to the newly created workspace
          if (payload.data && payload.data.id) {
            switchWorkspace(payload.data.id);
          }
        }
      } catch (err) {
        console.error("Failed to create workspace", err);
      }
    },
    [fetchWorkspaces, switchWorkspace],
  );

  const activeWorkspace = useMemo(() => {
    const found = workspaces.find((w) => w.id === activeWorkspaceId);
    if (found) return { ...found, isActive: true };
    if (workspaces.length > 0) return { ...workspaces[0], isActive: true };
    return null;
  }, [workspaces, activeWorkspaceId]);

  const finalWorkspaces = useMemo(() => {
    return workspaces.map((w) => ({
      ...w,
      isActive: w.id === activeWorkspace?.id,
    }));
  }, [workspaces, activeWorkspace]);

  const value = useMemo(
    () => ({
      workspaces: finalWorkspaces,
      activeWorkspace,
      isLoading,
      switchWorkspace,
      createWorkspace,
      refreshWorkspaces: fetchWorkspaces,
    }),
    [
      finalWorkspaces,
      activeWorkspace,
      isLoading,
      switchWorkspace,
      createWorkspace,
      fetchWorkspaces,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error(
      "useWorkspaceContext must be used within a WorkspaceProvider",
    );
  }
  return ctx;
}
