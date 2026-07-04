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
    workspaceId: string,
  ): Promise<GraphQueryResult[]> {
    try {
      const response = await CogneeClient.search({
        query,
        search_type: "chunks",
      });

      // Assuming the response from /api/v1/search is a list of results
      if (Array.isArray(response)) {
        return response.map((item: any) => ({
          nodeId: item.id || item.node_id || "unknown",
          content: item.text || item.content || JSON.stringify(item),
          score: item.score || 1.0,
        }));
      }

      return [];
    } catch (error) {
      console.error("[CogneeRetriever] Search failed:", error);
      return [];
    }
  }
}
