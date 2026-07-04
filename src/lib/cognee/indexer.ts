import { CogneeClient } from "./client";

export class CogneeIndexer {
  /**
   * Syncs a memory into the Cognee Knowledge Graph
   */
  static async syncMemory(
    memoryId: string,
    content: string,
    workspaceId: string,
  ): Promise<void> {
    const datasetId = `memory_${memoryId}`;

    // 1. Add data to Cognee
    await CogneeClient.add({
      data: {
        id: memoryId,
        content,
        workspaceId,
        type: "Memory",
      },
      dataset_id: datasetId,
    });

    // 2. Trigger Cognify to build graph
    await CogneeClient.cognify([datasetId]);
  }

  static async removeMemory(memoryId: string): Promise<void> {
    const datasetId = `memory_${memoryId}`;
    await CogneeClient.deleteDataset(datasetId);
    console.log(`[Cognee] Removed dataset ${datasetId}`);
  }
}
