import { CogneeClient } from "./client";

export interface GraphQueryResult {
  nodeId: string;
  content: string;
  score: number;
}

export class CogneeRetriever {
  /**
   * Retrieve conceptually related memories based on graph traversal
   */
  static async retrieve(
    query: string,
    _workspaceId: string,
  ): Promise<GraphQueryResult[]> {
    try {
      const response = await CogneeClient.search({
        query,
        search_type: "chunks",
      });

      // Assuming the response from /api/v1/search is a list of results
      if (Array.isArray(response)) {
        return response.map((item: Record<string, unknown>) => ({
          nodeId: (item.id as string) || (item.node_id as string) || "unknown",
          content:
            (item.text as string) ||
            (item.content as string) ||
            JSON.stringify(item),
          score: (item.score as number) || 1.0,
        }));
      }

      return [];
    } catch (error) {
      console.error("[CogneeRetriever] Search failed:", error);
      return [];
    }
  }
}
