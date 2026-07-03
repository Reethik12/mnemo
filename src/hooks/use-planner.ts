"use client";

import { usePlannerContext } from "@/providers/planner-provider";
import { useMemo } from "react";

export function usePlanner() {
  const {
    goals,
    tasks,
    isLoading,
    activeGoal,
    setActiveGoal,
    loadGoals,
    createGoal,
    updateTaskStatus,
  } = usePlannerContext();

  return {
    goals,
    tasks,
    isLoading,
    activeGoal,
    setActiveGoal,
    loadGoals,
    createGoal,
    updateTaskStatus,
  };
}

export function useGoals(agentId?: string) {
  const { goals, createGoal, isLoading } = usePlannerContext();

  return {
    goals: agentId ? goals.filter((g) => g.agentId === agentId) : goals,
    createGoal,
    isLoading,
  };
}

export function useAgentTasks(goalId?: string) {
  const { tasks, updateTaskStatus } = usePlannerContext();

  return {
    tasks: goalId ? tasks.filter((t) => t.goalId === goalId) : tasks,
    updateTaskStatus,
  };
}

export function useTaskQueue() {
  const { tasks } = usePlannerContext();

  const queue = useMemo(() => {
    return tasks.filter((t) => t.status === "READY" || t.status === "RUNNING");
  }, [tasks]);

  return {
    queue,
  };
}

export function useTaskProgress(goalId?: string) {
  const { goals } = usePlannerContext();

  const progress = useMemo(() => {
    const goal = goals.find((g) => g.id === goalId);
    return goal ? goal.progress : 0;
  }, [goals, goalId]);

  return {
    progress,
  };
}
