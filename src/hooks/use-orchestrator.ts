"use client";

import { useOrchestratorContext } from "@/providers/orchestrator-provider";
import { type Agent } from "@/types/agent";
import { useAgent } from "./use-agent";
import { useMemo } from "react";

export function useOrchestrator() {
  return useOrchestratorContext();
}

export function useWorkflows() {
  const { workflows, createWorkflow, isLoading } = useOrchestratorContext();

  return {
    workflows,
    createWorkflow,
    isLoading,
  };
}

export function useAgentNetwork() {
  const { agents } = useAgent();

  const network = useMemo(() => {
    // Maps list of agents to exposed dynamic node listings
    return agents.map((a: Agent) => ({
      id: a.id,
      name: a.name,
      capabilities: a.capabilities,
      status: a.status,
    }));
  }, [agents]);

  return {
    network,
  };
}

export function useAgentDispatch() {
  const { updateStepStatus } = useOrchestratorContext();

  const dispatchAction = async (
    workflowId: string,
    stepId: string,
    status: string,
    result?: Record<string, unknown>,
  ) => {
    await updateStepStatus(workflowId, stepId, status, result);
  };

  return {
    dispatchAction,
  };
}

export function useWorkflowHistory(workflowId?: string) {
  const { history, loadHistory } = useOrchestratorContext();

  const reloadHistory = async () => {
    if (workflowId) {
      await loadHistory(workflowId);
    }
  };

  return {
    history,
    reloadHistory,
  };
}
