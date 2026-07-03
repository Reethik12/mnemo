"use client";

import { WorkflowDashboard } from "@/components/workflows/workflow-dashboard";

export default function WorkflowsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Multi-Agent Workflow Orchestrator
        </h2>
        <p className="text-text-secondary text-sm">
          Coordinate specialized AI processes, track step logs, and verify
          status recovery checkpoints.
        </p>
      </div>

      <WorkflowDashboard />
    </div>
  );
}
