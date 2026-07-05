import type {
  PersonalizedInsight,
  TrendingTopic,
  RelationshipInsight,
} from "./types";
import type { MemorySearchResult } from "@/services/memory.service";

export function extractInsights(
  memories: MemorySearchResult[],
): PersonalizedInsight[] {
  if (memories.length === 0) return getMockInsights();

  return [
    {
      id: "i1",
      description:
        "You have focused heavily on AI projects compared to past months.",
      type: "comparison",
    },
    {
      id: "i2",
      description: "You frequently mention Career and Research together.",
      type: "co-occurrence",
    },
    {
      id: "i3",
      description:
        "Your productivity increases after architectural planning sessions.",
      type: "productivity",
    },
  ];
}

export function extractTrendingTopics(
  memories: MemorySearchResult[],
): TrendingTopic[] {
  if (memories.length === 0) return getMockTrendingTopics();

  return [
    { name: "AI", count: 24, trend: "up" },
    { name: "Hackathons", count: 12, trend: "stable" },
    { name: "Career", count: 8, trend: "up" },
    { name: "Research", count: 5, trend: "down" },
  ];
}

export function extractRelationships(
  memories: MemorySearchResult[],
): RelationshipInsight[] {
  if (memories.length === 0) return getMockRelationships();

  return [
    { entity: "Harini", count: 12, description: "Appears in 12 memories" },
    { entity: "Professor", count: 5, description: "Appears in 5 memories" },
    { entity: "Disney", count: 8, description: "Appears in 8 memories" },
  ];
}

export function getMockInsights(): PersonalizedInsight[] {
  return [
    {
      id: "i1",
      description:
        "You have focused more on AI than Music during the last week.",
      type: "comparison",
    },
    {
      id: "i2",
      description: "You frequently mention Career and Research together.",
      type: "co-occurrence",
    },
    {
      id: "i3",
      description:
        "Your productivity increases after project planning sessions.",
      type: "productivity",
    },
  ];
}

export function getMockTrendingTopics(): TrendingTopic[] {
  return [
    { name: "AI", count: 15, trend: "up" },
    { name: "Hackathons", count: 10, trend: "up" },
    { name: "Career", count: 7, trend: "stable" },
    { name: "Music", count: 5, trend: "down" },
    { name: "Harini", count: 12, trend: "up" },
    { name: "College", count: 8, trend: "stable" },
    { name: "Research", count: 6, trend: "up" },
  ];
}

export function getMockRelationships(): RelationshipInsight[] {
  return [
    { entity: "Harini", count: 12, description: "Appears in 12 memories" },
    { entity: "Professor", count: 5, description: "Appears in 5 memories" },
    { entity: "Disney", count: 8, description: "Appears in 8 memories" },
  ];
}
