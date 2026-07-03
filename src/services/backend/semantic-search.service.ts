import { VectorClient } from "@/lib/vector/client";
import { EmbeddingService } from "@/lib/ai/embeddings";
import { db } from "@/lib/db";
import { CogneeRetriever } from "@/lib/cognee/retriever";

export interface SearchOptions {
  query: string;
  workspaceId: string;
  limit?: number;
  minSimilarity?: number;
  type?: "semantic" | "keyword" | "hybrid";
}

export interface SearchResult {
  memoryId: string;
  title: string;
  content: string;
  score: number;
  source: "vector" | "keyword" | "graph";
}

export class SemanticSearchService {
  /**
   * Search memories
   */
  static async search(options: SearchOptions): Promise<SearchResult[]> {
    const { query, workspaceId, limit = 10, type = "semantic" } = options;
    if (!query.trim()) return [];

    let results: SearchResult[] = [];

    // 1. Semantic Search
    if (type === "semantic" || type === "hybrid") {
      try {
        const queryEmbedding = await EmbeddingService.generateEmbedding(query);
        const vectorResults = await VectorClient.search(queryEmbedding, {
          workspaceId,
          limit,
          minSimilarity: options.minSimilarity,
        });

        const mappedVectorResults: SearchResult[] = await Promise.all(
          vectorResults.map(async (vr) => {
            const memory = await db.memory.findUnique({
              where: { id: vr.memoryId },
            });
            return {
              memoryId: vr.memoryId,
              title: memory?.title || "Unknown",
              content: vr.content,
              score: vr.similarity,
              source: "vector" as const,
            };
          }),
        );
        results = [...results, ...mappedVectorResults];
      } catch (err) {
        console.error("[SemanticSearch] Vector search failed", err);
      }
    }

    // 2. Keyword Search (Fallback/Hybrid)
    if (type === "keyword" || type === "hybrid") {
      const keywordResults = await db.memory.findMany({
        where: {
          workspaceId,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
      });

      const mappedKeywordResults: SearchResult[] = keywordResults.map((m) => ({
        memoryId: m.id,
        title: m.title,
        content: m.content.substring(0, 500),
        score: 0.5, // Base score for keyword match
        source: "keyword" as const,
      }));
      results = [...results, ...mappedKeywordResults];
    }

    // 3. Graph Retrieval (Cognee)
    try {
      const graphResults = await CogneeRetriever.retrieve(query, workspaceId);
      const mappedGraphResults: SearchResult[] = graphResults.map((gr) => ({
        memoryId: gr.nodeId.replace("memory_", ""),
        title: "Graph Context",
        content: gr.content,
        score: gr.score,
        source: "graph" as const,
      }));
      results = [...results, ...mappedGraphResults];
    } catch (err) {
      console.error("[SemanticSearch] Graph search failed", err);
    }

    // Deduplicate and Rank
    const uniqueResults = new Map<string, SearchResult>();
    for (const r of results) {
      if (
        !uniqueResults.has(r.memoryId) ||
        uniqueResults.get(r.memoryId)!.score < r.score
      ) {
        uniqueResults.set(r.memoryId, r);
      }
    }

    return Array.from(uniqueResults.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}
