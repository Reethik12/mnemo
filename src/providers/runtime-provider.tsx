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
import {
  type DecisionLog,
  type AgentSchedule,
  type Recommendation,
} from "@/types/decision";

interface RuntimeTelemetry {
  status: string;
  schedulesCount: number;
  agentsCount: number;
  memoryUsageBytes: number;
  cpuUsagePercentage: number;
}

interface RuntimeContextType {
  telemetry: RuntimeTelemetry | null;
  decisions: DecisionLog[];
  schedules: AgentSchedule[];
  recommendations: Recommendation[];
  isLoading: boolean;
  loadTelemetry: () => Promise<void>;
  loadDecisions: () => Promise<void>;
  loadSchedules: () => Promise<void>;
  loadRecommendations: () => Promise<void>;
  approveDecision: (id: string) => Promise<void>;
  rejectDecision: (id: string) => Promise<void>;
  createSchedule: (
    agentId: string,
    cron: string,
    taskType: string,
  ) => Promise<void>;
  toggleSchedule: (id: string, isActive: boolean) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
}

const RuntimeContext = createContext<RuntimeContextType | null>(null);

export function RuntimeProvider({ children }: { children: ReactNode }) {
  const { activeWorkspace } = useWorkspace();
  const [telemetry, setTelemetry] = useState<RuntimeTelemetry | null>(null);
  const [decisions, setDecisions] = useState<DecisionLog[]>([]);
  const [schedules, setSchedules] = useState<AgentSchedule[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const workspaceId = activeWorkspace?.id;

  const loadTelemetry = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(`/api/runtime?workspaceId=${workspaceId}`);
      const payload = await res.json();
      if (payload.success) {
        setTelemetry(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [workspaceId]);

  const loadDecisions = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(`/api/decisions?workspaceId=${workspaceId}`);
      const payload = await res.json();
      if (payload.success) {
        setDecisions(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [workspaceId]);

  const loadSchedules = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(`/api/schedules?workspaceId=${workspaceId}`);
      const payload = await res.json();
      if (payload.success) {
        setSchedules(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [workspaceId]);

  const loadRecommendations = useCallback(async () => {
    try {
      const res = await fetch("/api/recommendations");
      const payload = await res.json();
      if (payload.success) {
        setRecommendations(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const approveDecision = useCallback(
    async (id: string) => {
      try {
        const res = await fetch("/api/decisions", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: "APPROVED" }),
        });
        if (res.ok) {
          await loadDecisions();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadDecisions],
  );

  const rejectDecision = useCallback(
    async (id: string) => {
      try {
        const res = await fetch("/api/decisions", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: "REJECTED" }),
        });
        if (res.ok) {
          await loadDecisions();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadDecisions],
  );

  const createSchedule = useCallback(
    async (agentId: string, cron: string, taskType: string) => {
      try {
        const res = await fetch("/api/schedules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceId, agentId, cron, taskType }),
        });
        if (res.ok) {
          await loadSchedules();
          await loadTelemetry();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [workspaceId, loadSchedules, loadTelemetry],
  );

  const toggleSchedule = useCallback(
    async (id: string, isActive: boolean) => {
      try {
        const res = await fetch("/api/schedules", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, isActive }),
        });
        if (res.ok) {
          await loadSchedules();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadSchedules],
  );

  const deleteSchedule = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/schedules?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          await loadSchedules();
          await loadTelemetry();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadSchedules, loadTelemetry],
  );

  // Combined fetch trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (workspaceId) {
        setIsLoading(true);
        const loadAll = async () => {
          try {
            await Promise.all([
              loadTelemetry(),
              loadDecisions(),
              loadSchedules(),
              loadRecommendations(),
            ]);
          } catch (e) {
            console.error(e);
          } finally {
            setIsLoading(false);
          }
        };
        loadAll();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [
    workspaceId,
    loadTelemetry,
    loadDecisions,
    loadSchedules,
    loadRecommendations,
  ]);

  const value = useMemo(
    () => ({
      telemetry,
      decisions,
      schedules,
      recommendations,
      isLoading,
      loadTelemetry,
      loadDecisions,
      loadSchedules,
      loadRecommendations,
      approveDecision,
      rejectDecision,
      createSchedule,
      toggleSchedule,
      deleteSchedule,
    }),
    [
      telemetry,
      decisions,
      schedules,
      recommendations,
      isLoading,
      loadTelemetry,
      loadDecisions,
      loadSchedules,
      loadRecommendations,
      approveDecision,
      rejectDecision,
      createSchedule,
      toggleSchedule,
      deleteSchedule,
    ],
  );

  return (
    <RuntimeContext.Provider value={value}>{children}</RuntimeContext.Provider>
  );
}

export function useRuntimeContext() {
  const ctx = useContext(RuntimeContext);
  if (!ctx) {
    throw new Error("useRuntimeContext must be used within a RuntimeProvider");
  }
  return ctx;
}
