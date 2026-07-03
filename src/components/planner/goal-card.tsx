"use client";

import { type Goal } from "@/types/planner";
import { cn } from "@/lib/cn";

interface GoalCardProps {
  goal: Goal;
  isActive: boolean;
  onSelect: () => void;
}

export function GoalCard({ goal, isActive, onSelect }: GoalCardProps) {
  const statusColors = {
    PENDING: "border-gray-500/10 text-gray-400 bg-gray-500/5",
    RUNNING: "border-blue-500/20 text-blue-400 bg-blue-500/5 animate-pulse",
    COMPLETED: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    FAILED: "border-red-500/20 text-red-400 bg-red-500/5",
  };

  const priorityColors = {
    LOW: "text-gray-400 bg-gray-400/10",
    MEDIUM: "text-accent-purple bg-accent-purple/10",
    HIGH: "text-red-400 bg-red-400/10",
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
        <span
          className={cn(
            "rounded px-2 py-0.5 text-[9px] font-semibold",
            priorityColors[goal.priority],
          )}
        >
          {goal.priority}
        </span>
        <span
          className={cn(
            "rounded-full border px-1.5 py-0.5 text-[9px] font-medium",
            statusColors[goal.status],
          )}
        >
          {goal.status}
        </span>
      </div>
      <h4 className="mt-2 line-clamp-1 text-sm font-semibold text-white">
        {goal.title}
      </h4>
      <p className="text-text-secondary mt-1 line-clamp-2 text-xs">
        {goal.description}
      </p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="text-text-muted mb-1 flex items-center justify-between text-[10px]">
          <span>Decomposition Progress</span>
          <span>{Math.round(goal.progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="bg-accent-purple h-full rounded-full transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
