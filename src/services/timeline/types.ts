export interface TimelineEvent {
  id: string;
  memoryId: string;
  title: string;
  date: string; // ISO String
  tags: string[];
  source: string;
  summary: string;
  relationshipCount: number;
  confidence: number; // 0-100
  type: "created" | "improved" | "restored" | "forgotten";
}

export interface MemoryVersion {
  versionId: string;
  versionNumber: number;
  date: string;
  summary: string;
  relationships: { id: string; target: string; type: string }[];
  newConceptsLearned: string[];
  confidenceScore: number;
}

export interface MemoryReplay {
  memoryId: string;
  title: string;
  versions: MemoryVersion[];
  currentVersion: number;
}

export interface EvolutionDataPoint {
  date: string;
  memoryCount: number;
  relationshipCount: number;
  aiConfidence: number; // 0-100
  knowledgeGrowthPercentage: number;
}

export interface CompareResult {
  memoryId: string;
  v1: MemoryVersion;
  v2: MemoryVersion;
  addedKnowledge: string[];
  removedKnowledge: string[];
  improvedSummaries: string;
  relationshipChanges: { added: number; removed: number };
  confidenceDifference: number; // Positive or negative
}

export interface AssistantMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface TimelineStats {
  totalMemories: number;
  timelineEvents: number;
  evolutionCount: number;
  averageConfidence: number;
  restoredVersions: number;
  forgottenMemories: number;
}
