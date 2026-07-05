import { MemoryReplay, CompareResult } from "./types";
import { MOCK_REPLAYS } from "./mock-data";

export async function getMemoryReplay(
  memoryId: string,
): Promise<MemoryReplay | null> {
  await new Promise((res) => setTimeout(res, 300));
  return MOCK_REPLAYS[memoryId] || null;
}

export async function compareMemoryVersions(
  memoryId: string,
  v1Id: string,
  v2Id: string,
): Promise<CompareResult | null> {
  await new Promise((res) => setTimeout(res, 300));
  const replay = MOCK_REPLAYS[memoryId];
  if (!replay) return null;

  const v1 = replay.versions.find((v) => v.versionId === v1Id);
  const v2 = replay.versions.find((v) => v.versionId === v2Id);

  if (!v1 || !v2) return null;

  return {
    memoryId,
    v1,
    v2,
    addedKnowledge: v2.newConceptsLearned.filter(
      (c) => !v1.newConceptsLearned.includes(c),
    ),
    removedKnowledge: v1.newConceptsLearned.filter(
      (c) => !v2.newConceptsLearned.includes(c),
    ),
    improvedSummaries:
      v2.summary !== v1.summary
        ? "Summary was rewritten for clarity and depth."
        : "Summary remained unchanged.",
    relationshipChanges: {
      added: Math.max(0, v2.relationships.length - v1.relationships.length),
      removed: Math.max(0, v1.relationships.length - v2.relationships.length),
    },
    confidenceDifference: v2.confidenceScore - v1.confidenceScore,
  };
}

export async function restoreMemoryVersion(
  memoryId: string,
  versionId: string,
): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 500));
  const replay = MOCK_REPLAYS[memoryId];
  if (!replay) return false;

  const version = replay.versions.find((v) => v.versionId === versionId);
  if (!version) return false;

  replay.currentVersion = version.versionNumber;
  return true;
}

export async function forgetMemory(_memoryId: string): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 500));
  // In a real system, this would call Cognee's forget() API
  return true;
}
