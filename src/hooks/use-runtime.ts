"use client";

import { useRuntimeContext } from "@/providers/runtime-provider";
import { useMemo } from "react";

export function useRuntime() {
  const { telemetry, isLoading, loadTelemetry } = useRuntimeContext();
  return {
    telemetry,
    isLoading,
    loadTelemetry,
  };
}

export function useDecision() {
  const { decisions, approveDecision, rejectDecision, isLoading } =
    useRuntimeContext();
  return {
    decisions,
    approveDecision,
    rejectDecision,
    isLoading,
  };
}

export function useRecommendations() {
  const { recommendations, loadRecommendations, isLoading } =
    useRuntimeContext();
  return {
    recommendations,
    loadRecommendations,
    isLoading,
  };
}

export function useSchedules() {
  const {
    schedules,
    createSchedule,
    toggleSchedule,
    deleteSchedule,
    isLoading,
  } = useRuntimeContext();
  return {
    schedules,
    createSchedule,
    toggleSchedule,
    deleteSchedule,
    isLoading,
  };
}

export function useRuntimeStatistics() {
  const { telemetry } = useRuntimeContext();

  const statistics = useMemo(() => {
    return {
      memoryUsedMB: telemetry
        ? Math.round(telemetry.memoryUsageBytes / (1024 * 1024))
        : 0,
      cpuPercent: telemetry ? telemetry.cpuUsagePercentage : 0,
      activeJobs: telemetry ? telemetry.schedulesCount : 0,
      runningAgents: telemetry ? telemetry.agentsCount : 0,
    };
  }, [telemetry]);

  return {
    statistics,
  };
}
