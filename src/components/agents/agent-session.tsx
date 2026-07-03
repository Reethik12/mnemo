"use client";

import { type Agent, type AgentStatus } from "@/types/agent";
import { Button } from "@/components/ui/button";

interface AgentSessionProps {
  agent: Agent;
  onStatusChange: (id: string, status: AgentStatus) => Promise<void>;
}

export function AgentSession({ agent, onStatusChange }: AgentSessionProps) {
  const lifecycleStates: AgentStatus[] = [
    "IDLE",
    "THINKING",
    "PLANNING",
    "RUNNING",
    "WAITING",
    "COMPLETED",
    "FAILED",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-text-secondary text-xs font-medium">
          Current Status
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div className="bg-accent-purple h-2.5 w-2.5 animate-ping rounded-full" />
          <span className="text-sm font-semibold text-white">
            {agent.status}
          </span>
        </div>
      </div>

      <div>
        <p className="text-text-secondary mb-2 text-xs font-medium">
          Simulate State Transition
        </p>
        <div className="flex flex-wrap gap-2">
          {lifecycleStates.map((s) => (
            <Button
              key={s}
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange(agent.id, s)}
              className={
                agent.status === s
                  ? "border-accent-purple/40 bg-accent-purple/10 text-white"
                  : ""
              }
            >
              {s}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
