"use client";

import { type Workflow } from "@/types/orchestrator";
import { cn } from "@/lib/cn";

interface WorkflowCardProps {
  workflow: Workflow;
  isActive: boolean;
  onSelect: () => void;
}

export function WorkflowCard({
  workflow,
  isActive,
  onSelect,
}: WorkflowCardProps) {
  const statusColors = {
    IDLE: "border-white/5 text-text-muted bg-white/5",
    RUNNING: "border-blue-500/20 text-blue-400 bg-blue-500/5 animate-pulse",
    COMPLETED: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    FAILED: "border-red-500/20 text-red-400 bg-red-500/5",
  };

  const completedSteps = workflow.steps.filter(
    (s) => s.status === "COMPLETED",
  ).length;
  const progressRatio =
    workflow.steps.length > 0
      ? (completedSteps / workflow.steps.length) * 100
      : 0;

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
        <span className="text-text-muted text-[10px]">
          Version v{workflow.version}
        </span>
        <span
          className={cn(
            "rounded-full border px-1.5 py-0.5 text-[9px] font-medium",
            statusColors[workflow.status],
          )}
        >
          {workflow.status}
        </span>
      </div>
      <h4 className="mt-2 line-clamp-1 text-sm font-semibold text-white">
        {workflow.name}
      </h4>

      <div className="mt-4">
        <div className="text-text-muted mb-1 flex items-center justify-between text-[10px]">
          <span>Execution Progress</span>
          <span>{Math.round(progressRatio)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="bg-accent-purple h-full rounded-full transition-all duration-500"
            style={{ width: `${progressRatio}%` }}
          />
        </div>
      </div>
    </div>
  );
}
