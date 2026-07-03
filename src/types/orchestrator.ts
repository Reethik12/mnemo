export type WorkflowStatus = "IDLE" | "RUNNING" | "COMPLETED" | "FAILED";

export interface WorkflowStep {
  id: string;
  agentId: string;
  action: string;
  dependsOn?: string[]; // parent step IDs
  status: "PENDING" | "READY" | "RUNNING" | "COMPLETED" | "FAILED";
  result?: Record<string, unknown>;
}

export interface Workflow {
  id: string;
  workspaceId: string;
  name: string;
  status: WorkflowStatus;
  version: number;
  steps: WorkflowStep[];
  checkpoint: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowHistory {
  id: string;
  workflowId: string;
  action: string;
  status: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}
