import type { Recommendation } from "./types";
import type { MemorySearchResult } from "@/services/memory.service";

export function generateRecommendations(
  memories: MemorySearchResult[],
): Recommendation[] {
  if (memories.length === 0) return getMockRecommendations();

  return [
    {
      id: "r1",
      action: "Continue AI Internship preparation.",
      context: "Based on recent heavy focus on AI.",
      priority: "high",
    },
    {
      id: "r2",
      action: "Organize research papers.",
      context: "Due to new topics detected in memory.",
      priority: "medium",
    },
    {
      id: "r3",
      action: "Review Violin practice schedule.",
      context: "Music topic frequency has dropped.",
      priority: "low",
    },
  ];
}

export function getMockRecommendations(): Recommendation[] {
  return [
    {
      id: "r1",
      action: "Continue AI Internship preparation.",
      context: "High priority based on recent AI mentions.",
      priority: "high",
    },
    {
      id: "r2",
      action: "Review Violin practice schedule.",
      context: "Activity has decreased over the past week.",
      priority: "medium",
    },
    {
      id: "r3",
      action: "Finish pending Hackathon tasks.",
      context: "Upcoming event detected.",
      priority: "high",
    },
    {
      id: "r4",
      action: "Organize research papers.",
      context: "Several new documents were ingested.",
      priority: "low",
    },
    {
      id: "r5",
      action: "Summarize last week's memories.",
      context: "Weekly wrap-up routine.",
      priority: "medium",
    },
  ];
}
