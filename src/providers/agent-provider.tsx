import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useWorkspace } from "@/hooks/use-workspace";
import { type Agent, type AgentStatus } from "@/types/agent";

interface AgentContextType {
  agents: Agent[];
  activeAgent: Agent | null;
  isLoading: boolean;
  setActiveAgent: (agent: Agent | null) => void;
  createAgent: (
    data: Omit<
      Agent,
      "id" | "createdAt" | "updatedAt" | "status" | "workspaceId" | "goals"
    >,
  ) => Promise<void>;
  updateAgentStatus: (id: string, status: AgentStatus) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  refreshAgents: () => Promise<void>;
}

const AgentContext = createContext<AgentContextType | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const { activeWorkspace } = useWorkspace();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeAgent, setActiveAgentState] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const workspaceId = activeWorkspace?.id;
  const activeAgentId = activeAgent?.id;

  const fetchAgents = useCallback(async () => {
    if (!workspaceId) {
      setAgents([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/agents?workspaceId=${workspaceId}`);
      const payload = await res.json();
      if (payload.success && Array.isArray(payload.data)) {
        setAgents(payload.data);
        if (payload.data.length > 0) {
          setActiveAgentState(payload.data[0]);
        } else {
          setActiveAgentState(null);
        }
      }
    } catch (err) {
      console.error("Failed to fetch agents", err);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAgents();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAgents]);

  const createAgent = useCallback(
    async (
      data: Omit<
        Agent,
        "id" | "createdAt" | "updatedAt" | "status" | "workspaceId" | "goals"
      >,
    ) => {
      try {
        const res = await fetch("/api/agents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, workspaceId }),
        });
        if (res.ok) {
          await fetchAgents();
        }
      } catch (err) {
        console.error("Failed to create agent", err);
      }
    },
    [workspaceId, fetchAgents],
  );

  const updateAgentStatus = useCallback(
    async (id: string, status: AgentStatus) => {
      try {
        const res = await fetch(`/api/agents/${id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceId, status }),
        });
        if (res.ok) {
          setAgents((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status } : a)),
          );
          if (activeAgentId === id) {
            setActiveAgentState((prev) => (prev ? { ...prev, status } : null));
          }
        }
      } catch (err) {
        console.error("Failed to update status", err);
      }
    },
    [workspaceId, activeAgentId],
  );

  const deleteAgent = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(
          `/api/agents/${id}?workspaceId=${workspaceId}`,
          {
            method: "DELETE",
          },
        );
        if (res.ok) {
          setAgents((prev) => prev.filter((a) => a.id !== id));
          if (activeAgentId === id) {
            setActiveAgentState(null);
          }
        }
      } catch (err) {
        console.error("Failed to delete agent", err);
      }
    },
    [workspaceId, activeAgentId],
  );

  const value = useMemo(
    () => ({
      agents,
      activeAgent,
      isLoading,
      setActiveAgent: setActiveAgentState,
      createAgent,
      updateAgentStatus,
      deleteAgent,
      refreshAgents: fetchAgents,
    }),
    [
      agents,
      activeAgent,
      isLoading,
      createAgent,
      updateAgentStatus,
      deleteAgent,
      fetchAgents,
    ],
  );

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
}

export function useAgentContext() {
  const ctx = useContext(AgentContext);
  if (!ctx) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }
  return ctx;
}
