export type DecisionPolicy = "ALWAYS_ASK" | "HIGH_RISK_ONLY" | "AUTO_APPROVE";
export type DecisionStatus =
  "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "BYPASSED";

export interface DecisionLog {
  id: string;
  workspaceId: string;
  agentId: string;
  action: string;
  confidence: number;
  riskScore: number;
  status: DecisionStatus;
  policy: DecisionPolicy;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentSchedule {
  id: string;
  workspaceId: string;
  agentId: string;
  cron: string;
  taskType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "cleanup" | "security" | "indexing" | "organization";
  confidence: number;
}
