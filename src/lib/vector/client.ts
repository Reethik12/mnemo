import { db } from "@/lib/db";

export interface VectorQueryOptions {
  limit?: number;
  minSimilarity?: number;
  workspaceId: string;
}

export interface VectorSearchResult {
  id: string;
  memoryId: string;
  content: string;
  similarity: number;
}

export class VectorClient {
  /**
   * Insert or update an embedding for a memory chunk
   */
  static async upsertEmbedding(
    memoryId: string,
    content: string,
    embedding: number[],
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    const embeddingStr = `[${embedding.join(",")}]`;

    // We use Prisma's raw query to handle Unsupported vector types
    await db.$executeRawUnsafe(
      `
      INSERT INTO "MemoryChunk" ("id", "memoryId", "content", "embedding", "metadata", "createdAt")
      VALUES (gen_random_uuid(), $1, $2, $3::vector, $4::jsonb, NOW())
      `,
      memoryId,
      content,
      embeddingStr,
      metadata ? JSON.stringify(metadata) : null,
    );
  }

  /**
   * Search for similar vectors
   */
  static async search(
    embedding: number[],
    options: VectorQueryOptions,
  ): Promise<VectorSearchResult[]> {
    const limit = options.limit || 5;
    const minSimilarity = options.minSimilarity || 0.7;
    const embeddingStr = `[${embedding.join(",")}]`;

    // Perform cosine similarity search using pgvector (<=> operator)
    const results = await db.$queryRawUnsafe<
      { id: string; memoryId: string; content: string; similarity: number }[]
    >(
      `
      SELECT 
        c.id, 
        c."memoryId", 
        c.content, 
        1 - (c.embedding <=> $1::vector) as similarity
      FROM "MemoryChunk" c
      JOIN "Memory" m ON m.id = c."memoryId"
      WHERE m."workspaceId" = $2
        AND 1 - (c.embedding <=> $1::vector) > $3
      ORDER BY c.embedding <=> $1::vector
      LIMIT $4
      `,
      embeddingStr,
      options.workspaceId,
      minSimilarity,
      limit,
    );

    return results.map((r) => ({
      id: r.id,
      memoryId: r.memoryId,
      content: r.content,
      similarity: r.similarity,
    }));
  }

  /**
   * Delete chunks for a specific memory
   */
  static async deleteForMemory(memoryId: string): Promise<void> {
    await db.memoryChunk.deleteMany({
      where: { memoryId },
    });
  }
}
