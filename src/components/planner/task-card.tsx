"use client";

import { type AgentTask } from "@/types/planner";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: AgentTask;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function TaskCard({ task, onUpdateStatus }: TaskCardProps) {
  const statusColors = {
    PENDING: "text-text-muted border-white/5 bg-white/5",
    READY: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    RUNNING:
      "text-accent-purple-light border-accent-purple/20 bg-accent-purple/5 animate-pulse",
    WAITING: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
    COMPLETED: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    CANCELLED: "text-gray-400 border-gray-500/20 bg-gray-500/5",
    FAILED: "text-red-400 border-red-500/20 bg-red-500/5",
  };

  return (
    <div className="bg-surface/20 flex items-center justify-between gap-4 rounded-xl border border-white/5 p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-1.5 py-0.5 text-[9px] font-semibold",
              statusColors[task.status],
            )}
          >
            {task.status}
          </span>
          <h5 className="truncate text-xs font-semibold text-white">
            {task.title}
          </h5>
        </div>
        <p className="text-text-secondary mt-1 line-clamp-1 text-xs">
          {task.description}
        </p>

        {task.executionTime && (
          <span className="text-text-muted mt-2 inline-block font-mono text-[10px]">
            Execution Duration: {task.executionTime}ms
          </span>
        )}
      </div>

      <div className="flex shrink-0 gap-1.5">
        {task.status !== "COMPLETED" && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUpdateStatus(task.id, "RUNNING")}
              className="h-7 text-[10px]"
            >
              Run
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onUpdateStatus(task.id, "COMPLETED")}
              className="h-7 border-emerald-500/20 bg-emerald-500/20 text-[10px] text-emerald-400 hover:bg-emerald-500/30"
            >
              Complete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
