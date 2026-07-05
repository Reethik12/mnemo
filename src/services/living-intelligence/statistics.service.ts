import type { IntelligenceScore, MemoryGrowth } from "./types";
import type { MemorySearchResult } from "@/services/memory.service";

export function calculateStatistics(memories: MemorySearchResult[]): {
  score: IntelligenceScore;
  growth: MemoryGrowth;
} {
  if (memories.length === 0) return getMockStatistics();

  const total = memories.length;
  // Simple heuristic
  return {
    score: {
      overall: Math.min(Math.round(45 + total * 2), 98),
      memoryQuality: 82,
      graphCompleteness: Math.min(Math.round(20 + total * 3), 100),
      knowledgeGrowth: 15,
    },
    growth: {
      daily: Math.round(total * 0.1),
      weekly: Math.round(total * 0.4),
      monthly: Math.round(total * 0.8),
      total: total,
    },
  };
}

export function getMockStatistics(): {
  score: IntelligenceScore;
  growth: MemoryGrowth;
} {
  return {
    score: {
      overall: 87,
      memoryQuality: 92,
      graphCompleteness: 78,
      knowledgeGrowth: +14, // treated as positive change percentage
    },
    growth: {
      daily: 12,
      weekly: 45,
      monthly: 128,
      total: 1420,
    },
  };
}
