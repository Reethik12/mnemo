"use client";

import { type AgentTask } from "@/types/planner";
import { TaskCard } from "./task-card";

interface TaskListProps {
  tasks: AgentTask[];
  onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function TaskList({ tasks, onUpdateStatus }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
        <p className="text-text-secondary text-xs">
          No subtasks decomposed for this goal yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdateStatus={onUpdateStatus} />
      ))}
    </div>
  );
}
