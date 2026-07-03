import { MemoryRepository } from "@/repositories/memory.repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { BackgroundJob } from "@/lib/workers/background-job";
import { CogneeIndexer } from "@/lib/cognee/indexer";
import { ChunkingService } from "./chunking.service";
import { EmbeddingService } from "@/lib/ai/embeddings";
import { VectorClient } from "@/lib/vector/client";
import { RealtimeServer } from "@/lib/realtime/server";

export class MemoryService {
  /**
   * Helper to index a memory in the background
   */
  private static async indexMemory(
    memoryId: string,
    content: string,
    workspaceId: string,
  ) {
    await BackgroundJob.enqueue(
      `index-memory-${memoryId}`,
      { memoryId },
      async () => {
        // 1. Sync to Cognee Knowledge Graph
        await CogneeIndexer.syncMemory(memoryId, content, workspaceId);

        // 2. Chunk and Embed for Vector DB
        // First clean up old vectors
        await VectorClient.deleteForMemory(memoryId);

        const chunks = ChunkingService.splitText(content);
        const embeddings = await EmbeddingService.generateEmbeddings(chunks);

        for (let i = 0; i < chunks.length; i++) {
          if (embeddings[i]) {
            await VectorClient.upsertEmbedding(
              memoryId,
              chunks[i],
              embeddings[i],
            );
          }
        }
      },
    );
  }

  static async createMemory(
    workspaceId: string,
    data: Prisma.MemoryUncheckedCreateWithoutWorkspaceInput,
  ) {
    const memory = await MemoryRepository.create({ ...data, workspaceId });
    await this.indexMemory(memory.id, memory.content, workspaceId);

    // Broadcast event
    RealtimeServer.broadcast({
      type: "MemoryCreated",
      workspaceId,
      payload: { id: memory.id, workspaceId, title: memory.title },
      timestamp: new Date().toISOString(),
    });

    return memory;
  }

  static async getMemory(id: string) {
    const memory = await MemoryRepository.findById(id);
    if (!memory) throw new NotFoundError("Memory not found");
    return memory;
  }

  static async getMemoriesByWorkspace(
    workspaceId: string,
    page = 1,
    limit = 50,
  ) {
    const skip = (page - 1) * limit;
    return MemoryRepository.findAllByWorkspace(workspaceId, skip, limit);
  }

  static async updateMemory(id: string, data: Prisma.MemoryUpdateInput) {
    const memory = await MemoryRepository.findById(id);
    if (!memory) throw new NotFoundError("Memory not found");

    const updated = await MemoryRepository.update(id, data);

    // Re-index on background job if content changed
    if (updated.content) {
      await this.indexMemory(updated.id, updated.content, updated.workspaceId);
    }

    // Broadcast event
    RealtimeServer.broadcast({
      type: "MemoryUpdated",
      workspaceId: updated.workspaceId,
      payload: {
        id: updated.id,
        workspaceId: updated.workspaceId,
        title: updated.title,
      },
      timestamp: new Date().toISOString(),
    });

    return updated;
  }

  static async deleteMemory(id: string) {
    const memory = await MemoryRepository.findById(id);
    if (!memory) throw new NotFoundError("Memory not found");

    await MemoryRepository.delete(id);

    await BackgroundJob.enqueue(`delete-memory-${id}`, { id }, async () => {
      await CogneeIndexer.removeMemory(id);
      await VectorClient.deleteForMemory(id);
    });

    // Broadcast event
    RealtimeServer.broadcast({
      type: "MemoryDeleted",
      workspaceId: memory.workspaceId,
      payload: { id: memory.id, workspaceId: memory.workspaceId },
      timestamp: new Date().toISOString(),
    });

    return memory;
  }
}
