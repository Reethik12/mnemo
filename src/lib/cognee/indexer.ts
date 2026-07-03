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
    // 1. Extract entities & relationships (mocked)
    const node = {
      id: `memory_${memoryId}`,
      label: "Memory",
      properties: { content, workspaceId },
    };

    // 2. Add to Graph
    await CogneeClient.addNodes([node]);
  }

  static async removeMemory(memoryId: string): Promise<void> {
    // TODO: remove from graph
    console.log(`[Cognee] Removed memory ${memoryId}`);
  }
}
