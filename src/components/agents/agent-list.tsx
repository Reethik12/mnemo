"use client";

import { type Agent } from "@/types/agent";
import { AgentCard } from "./agent-card";

interface AgentListProps {
  agents: Agent[];
  activeAgentId?: string;
  onSelectAgent: (agent: Agent) => void;
}

export function AgentList({
  agents,
  activeAgentId,
  onSelectAgent,
}: AgentListProps) {
  if (agents.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
        <p className="text-text-secondary text-sm">No agents registered</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isActive={agent.id === activeAgentId}
          onSelect={() => onSelectAgent(agent)}
        />
      ))}
    </div>
  );
}
