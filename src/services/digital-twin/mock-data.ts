import type { TwinStats, SecurityMetrics, AuditLogEntry } from "./types";

export const MOCK_TWIN_STATS: TwinStats = {
  knowledgeScore: 92,
  learningProgress: 88,
  memoryStrength: 95,
  reasoningConfidence: 87,
  graphSize: 14502,
  recentImprovements: 34,
  expertiseDomains: [
    { domain: "AI & Machine Learning", score: 95 },
    { domain: "System Architecture", score: 88 },
    { domain: "Frontend Engineering", score: 92 },
    { domain: "Music Theory", score: 75 },
  ],
  communicationStyle: "Analytical, concise, and highly technical.",
};

export const MOCK_SECURITY_METRICS: SecurityMetrics = {
  encryptedMemories: 14502,
  activeSessions: 3,
  sharedLinks: 12,
  revokedAccess: 4,
  pendingRequests: 2,
};

export let MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    action: "grant",
    entity: "Project Mnemo (Workspace)",
    actor: "Alex Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    details: "Granted Editor access to David Chen",
  },
  {
    id: "log-2",
    action: "improve",
    entity: "Memory #8492 (Transformers)",
    actor: "Digital Twin",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    details: "Identified new relationship with Attention Mechanisms",
  },
  {
    id: "log-3",
    action: "share",
    entity: "AI & ML Research",
    actor: "Alex Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    details: "Created public view-only link",
  },
  {
    id: "log-4",
    action: "remember",
    entity: "React Server Components",
    actor: "Alex Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    details: "Imported from Github Repository",
  },
];

export function addAuditLog(
  action: string,
  entity: string,
  actor: string,
  details: string,
) {
  const newLog: AuditLogEntry = {
    id: `log-${Date.now()}`,
    action: action as AuditLogEntry["action"],
    entity,
    actor,
    details,
    timestamp: new Date().toISOString(),
  };
  MOCK_AUDIT_LOGS = [newLog, ...MOCK_AUDIT_LOGS];
}
