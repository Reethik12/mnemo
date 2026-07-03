"use client";

import { useAgentContext } from "@/providers/agent-provider";
import { useState, useCallback } from "react";
import {
  type AgentSession,
  type AgentStatistics,
  type AgentStatus,
} from "@/types/agent";

export function useAgent() {
  const {
    agents,
    activeAgent,
    setActiveAgent,
    createAgent,
    deleteAgent,
    isLoading,
  } = useAgentContext();

  return {
    agents,
    activeAgent,
    setActiveAgent,
    createAgent,
    deleteAgent,
    isLoading,
  };
}

export function useAgentSession(agentId?: string) {
  const [session, setSession] = useState<AgentSession | null>(null);

  const startSession = useCallback(async () => {
    if (!agentId) return;
    setSession({
      id: `session_${Date.now()}`,
      agentId,
      status: "RUNNING",
      startedAt: new Date().toISOString(),
      context: {},
      statistics: {
        runsCount: 1,
        tokensUsed: 0,
        successRate: 100,
        averageExecutionTimeMs: 120,
      },
    });
  }, [agentId]);

  return {
    session,
    startSession,
  };
}

export function useAgentStatus() {
  const { updateAgentStatus } = useAgentContext();

  const changeStatus = useCallback(
    async (agentId: string, status: AgentStatus) => {
      await updateAgentStatus(agentId, status);
    },
    [updateAgentStatus],
  );

  return {
    changeStatus,
  };
}

export function useAgentStatistics(agentId?: string) {
  // Returns static or dynamic mock statistics
  const stats: AgentStatistics = {
    runsCount: agentId ? 142 : 0,
    tokensUsed: agentId ? 843920 : 0,
    successRate: agentId ? 98.6 : 0,
    averageExecutionTimeMs: agentId ? 1450 : 0,
  };

  return {
    stats,
  };
}

export function useAgentCapabilities() {
  const allCapabilities = [
    "Text Generation",
    "Context Synthesis",
    "Task Planning",
    "Memory De-duplication",
    "Relationship Inference",
    "Tag Generation",
    "Semantic Search",
    "Code Writing",
  ];

  return {
    allCapabilities,
  };
}
