import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { type Goal, type AgentTask } from "@/types/planner";

interface PlannerContextType {
  goals: Goal[];
  tasks: AgentTask[];
  isLoading: boolean;
  activeGoal: Goal | null;
  setActiveGoal: (goal: Goal | null) => void;
  loadGoals: (agentId: string) => Promise<void>;
  createGoal: (
    agentId: string,
    title: string,
    description: string,
    priority?: string,
  ) => Promise<void>;
  updateTaskStatus: (
    taskId: string,
    status: string,
    errorLogs?: string,
  ) => Promise<void>;
}

const PlannerContext = createContext<PlannerContextType | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadGoals = useCallback(async (agentId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/goals?agentId=${agentId}`);
      const payload = await res.json();
      if (payload.success && Array.isArray(payload.data)) {
        setGoals(payload.data);
        if (payload.data.length > 0) {
          setActiveGoal(payload.data[0]);
          setTasks(
            (payload.data[0] as Goal & { tasks?: AgentTask[] }).tasks || [],
          );
        } else {
          setActiveGoal(null);
          setTasks([]);
        }
      }
    } catch (err) {
      console.error("Failed to load goals", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createGoal = useCallback(
    async (
      agentId: string,
      title: string,
      description: string,
      priority = "MEDIUM",
    ) => {
      try {
        const res = await fetch("/api/goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agentId, title, description, priority }),
        });
        if (res.ok) {
          await loadGoals(agentId);
        }
      } catch (err) {
        console.error("Failed to create goal", err);
      }
    },
    [loadGoals],
  );

  const updateTaskStatus = useCallback(
    async (taskId: string, status: string, errorLogs?: string) => {
      try {
        const res = await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, status, errorLogs }),
        });
        if (res.ok && activeGoal) {
          // Reload goals to update progress values
          await loadGoals(activeGoal.agentId);
        }
      } catch (err) {
        console.error("Failed to update task", err);
      }
    },
    [activeGoal, loadGoals],
  );

  // Sync tasks list when activeGoal is updated
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeGoal) {
        setTasks((activeGoal as Goal & { tasks?: AgentTask[] }).tasks || []);
      } else {
        setTasks([]);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeGoal]);

  const value = useMemo(
    () => ({
      goals,
      tasks,
      isLoading,
      activeGoal,
      setActiveGoal,
      loadGoals,
      createGoal,
      updateTaskStatus,
    }),
    [
      goals,
      tasks,
      isLoading,
      activeGoal,
      loadGoals,
      createGoal,
      updateTaskStatus,
    ],
  );

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
}

export function usePlannerContext() {
  const ctx = useContext(PlannerContext);
  if (!ctx) {
    throw new Error("usePlannerContext must be used within a PlannerProvider");
  }
  return ctx;
}
