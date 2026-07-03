export type GoalPriority = "LOW" | "MEDIUM" | "HIGH";
export type GoalStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export type TaskStatus =
  | "PENDING"
  | "READY"
  | "RUNNING"
  | "WAITING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED";

export interface Goal {
  id: string;
  agentId: string;
  title: string;
  description: string;
  priority: GoalPriority;
  status: GoalStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface AgentTask {
  id: string;
  goalId: string;
  title: string;
  description: string;
  status: TaskStatus;
  parentTaskId: string | null;
  dependencies: string[]; // Prerequisite task UUIDs
  retryCount: number;
  executionTime?: number;
  errorLogs?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskQueueItem {
  id: string;
  taskId: string;
  agentId: string;
  priority: number;
  addedAt: string;
}
