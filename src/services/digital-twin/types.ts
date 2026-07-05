export interface TwinStats {
  knowledgeScore: number;
  learningProgress: number;
  memoryStrength: number;
  reasoningConfidence: number;
  graphSize: number;
  recentImprovements: number;
  expertiseDomains: { domain: string; score: number }[];
  communicationStyle: string;
}

export interface SecurityMetrics {
  encryptedMemories: number;
  activeSessions: number;
  sharedLinks: number;
  revokedAccess: number;
  pendingRequests: number;
}

export interface AuditLogEntry {
  id: string;
  action:
    | "grant"
    | "remove"
    | "share"
    | "import"
    | "forget"
    | "improve"
    | "recall"
    | "remember";
  entity: string;
  actor: string;
  timestamp: string;
  details?: string;
}

export interface TwinChatResponse {
  message: string;
  sources: string[];
}
