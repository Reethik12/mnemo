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
import { type Workflow, type WorkflowStep } from "@/types/orchestrator";

interface OrchestratorContextType {
  workflows: Workflow[];
  activeWorkflow: Workflow | null;
  history: Record<string, unknown>[];
  isLoading: boolean;
  setActiveWorkflow: (w: Workflow | null) => void;
  loadWorkflows: () => Promise<void>;
  createWorkflow: (name: string, steps: WorkflowStep[]) => Promise<void>;
  updateStepStatus: (
    workflowId: string,
    stepId: string,
    status: string,
    result?: Record<string, unknown>,
  ) => Promise<void>;
  loadHistory: (workflowId: string) => Promise<void>;
}

const OrchestratorContext = createContext<OrchestratorContextType | null>(null);

export function OrchestratorProvider({ children }: { children: ReactNode }) {
  const { activeWorkspace } = useWorkspace();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [history, setHistory] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const workspaceId = activeWorkspace?.id;

  const loadWorkflows = useCallback(async () => {
    if (!workspaceId) {
      setWorkflows([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/workflows?workspaceId=${workspaceId}`);
      const payload = await res.json();
      if (payload.success && Array.isArray(payload.data)) {
        setWorkflows(payload.data);
        if (payload.data.length > 0) {
          setActiveWorkflow(payload.data[0]);
        } else {
          setActiveWorkflow(null);
        }
      }
    } catch (err) {
      console.error("Failed to load workflows", err);
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadWorkflows();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadWorkflows]);

  const createWorkflow = useCallback(
    async (name: string, steps: WorkflowStep[]) => {
      try {
        const res = await fetch("/api/workflows", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceId, name, steps }),
        });
        if (res.ok) {
          await loadWorkflows();
        }
      } catch (err) {
        console.error("Failed to create workflow", err);
      }
    },
    [workspaceId, loadWorkflows],
  );

  const updateStepStatus = useCallback(
    async (
      workflowId: string,
      stepId: string,
      status: string,
      result?: Record<string, unknown>,
    ) => {
      try {
        const res = await fetch("/api/orchestrator", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workflowId, stepId, status, result }),
        });
        if (res.ok) {
          await loadWorkflows();
        }
      } catch (err) {
        console.error("Failed to update step status", err);
      }
    },
    [loadWorkflows],
  );

  const loadHistory = useCallback(async (workflowId: string) => {
    try {
      const res = await fetch(
        `/api/workflows/history?workflowId=${workflowId}`,
      );
      const payload = await res.json();
      if (payload.success) {
        setHistory(payload.data);
      }
    } catch (err) {
      console.error("Failed to load history", err);
    }
  }, []);

  const value = useMemo(
    () => ({
      workflows,
      activeWorkflow,
      history,
      isLoading,
      setActiveWorkflow,
      loadWorkflows,
      createWorkflow,
      updateStepStatus,
      loadHistory,
    }),
    [
      workflows,
      activeWorkflow,
      history,
      isLoading,
      loadWorkflows,
      createWorkflow,
      updateStepStatus,
      loadHistory,
    ],
  );

  return (
    <OrchestratorContext.Provider value={value}>
      {children}
    </OrchestratorContext.Provider>
  );
}

export function useOrchestratorContext() {
  const ctx = useContext(OrchestratorContext);
  if (!ctx) {
    throw new Error(
      "useOrchestratorContext must be used within an OrchestratorProvider",
    );
  }
  return ctx;
}
