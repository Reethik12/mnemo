"use client";

import { AgentDashboard } from "@/components/agents/agent-dashboard";

export default function AgentsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          AI Agent Foundation
        </h2>
        <p className="text-text-secondary text-sm">
          Configure specialized agents, adjust prompts, and check processing
          states inside this workspace.
        </p>
      </div>

      <AgentDashboard />
    </div>
  );
}
