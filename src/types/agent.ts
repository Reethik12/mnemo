export type AgentType =
  "PERSONAL" | "WORKSPACE" | "ASSISTANT" | "BACKGROUND" | "SYSTEM";

export type AgentStatus =
  | "IDLE"
  | "THINKING"
  | "PLANNING"
  | "RUNNING"
  | "WAITING"
  | "COMPLETED"
  | "FAILED";

export interface AgentStatistics {
  runsCount: number;
  tokensUsed: number;
  successRate: number;
  averageExecutionTimeMs: number;
}

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  identity: string;
  description: string;
  goals: string[];
  instructions: string[];
  status: AgentStatus;
  capabilities: string[];
  memoryScope: "workspace" | "personal" | "global";
  workspaceId: string;
  modelId: string | null;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AgentSession {
  id: string;
  agentId: string;
  status: AgentStatus;
  startedAt: string;
  endedAt?: string;
  context: Record<string, unknown>;
  statistics: AgentStatistics;
}
