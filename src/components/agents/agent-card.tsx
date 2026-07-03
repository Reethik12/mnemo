"use client";

import { type Agent } from "@/types/agent";
import { cn } from "@/lib/cn";

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  onSelect: () => void;
}

export function AgentCard({ agent, isActive, onSelect }: AgentCardProps) {
  const statusColors = {
    IDLE: "bg-gray-400/20 text-gray-400 border-gray-400/20",
    THINKING:
      "bg-accent-purple/20 text-accent-purple border-accent-purple/20 animate-pulse",
    PLANNING: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    RUNNING: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20",
    WAITING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
    COMPLETED: "bg-green-500/20 text-green-400 border-green-500/20",
    FAILED: "bg-red-500/20 text-red-400 border-red-500/20",
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "cursor-pointer rounded-xl border p-4 backdrop-blur-md transition-all duration-300",
        isActive
          ? "border-accent-purple/40 bg-accent-purple/5 shadow-accent-purple/5 shadow-lg"
          : "bg-surface/20 hover:bg-surface/30 border-white/5 hover:border-white/10",
      )}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
            statusColors[agent.status],
          )}
        >
          {agent.status}
        </span>
      </div>
      <p className="text-text-secondary mt-1 line-clamp-1 text-xs">
        {agent.identity}
      </p>
      <p className="text-text-muted mt-2 line-clamp-2 text-xs">
        {agent.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {agent.capabilities.slice(0, 3).map((cap) => (
          <span
            key={cap}
            className="text-text-secondary rounded border border-white/5 bg-white/5 px-2 py-0.5 text-[9px]"
          >
            {cap}
          </span>
        ))}
        {agent.capabilities.length > 3 && (
          <span className="text-text-muted rounded border border-white/5 bg-white/5 px-2 py-0.5 text-[9px]">
            +{agent.capabilities.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}
