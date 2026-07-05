import type { Pattern } from "./types";
import type { MemorySearchResult } from "@/services/memory.service";

export function extractPatterns(memories: MemorySearchResult[]): Pattern[] {
  if (memories.length === 0) {
    return getMockPatterns();
  }

  // Real pattern detection logic would analyze memory text
  // For the hackathon, we simulate pattern detection over the actual returned memories
  return [
    {
      id: "p1",
      description:
        "You frequently create memories related to technology and AI.",
      type: "topic",
    },
    {
      id: "p2",
      description: "Memory generation spikes in the late evening (8PM - 11PM).",
      type: "time",
    },
    {
      id: "p3",
      description:
        "Hackathon preparation is a recurring theme during weekends.",
      type: "activity",
    },
  ];
}

export function getMockPatterns(): Pattern[] {
  return [
    {
      id: "p1",
      description: "You usually create memories between 8PM and 11PM.",
      type: "time",
    },
    {
      id: "p2",
      description: "AI has become your most discussed topic.",
      type: "topic",
    },
    {
      id: "p3",
      description: "Music related memories decreased this week.",
      type: "activity",
    },
    {
      id: "p4",
      description: "You frequently work on hackathons during weekends.",
      type: "time",
    },
  ];
}
