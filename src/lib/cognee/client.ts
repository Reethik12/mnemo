import { cogneeConfig } from "./config";

export interface CogneeAddPayload {
  data: string | object | object[];
  dataset_id?: string;
}

export interface CogneeSearchPayload {
  query: string;
  search_type?: "chunks" | "insights" | "graph_completion" | "graph_summary";
}

export class CogneeClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    if (!cogneeConfig.enabled) {
      console.log(`[Cognee] Skipping request to ${endpoint} because integration is disabled.`);
      return {} as T;
    }

    const url = `${cogneeConfig.apiUrl.replace(/\/$/, "")}${endpoint}`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (cogneeConfig.apiKey) {
      headers["X-Api-Key"] = cogneeConfig.apiKey;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${JSON.stringify(errorData)}`;
        } catch {
          const errorText = await response.text();
          if (errorText) errorMessage += ` - ${errorText}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`[Cognee] Error requesting ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Health Check or Root to verify connection
   */
  static async healthCheck(): Promise<boolean> {
    try {
      // Trying the base API URL to see if it responds, or /api/v1/health if available.
      // Since docs mention /api/v1 prefix, we will try the base url or just a harmless endpoint.
      await this.request("/");
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Adds text, documents, or structured data to the knowledge base.
   */
  static async add(payload: CogneeAddPayload): Promise<any> {
    return this.request("/api/v1/add", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Transforms raw data into structured knowledge graphs.
   */
  static async cognify(datasets?: string[]): Promise<any> {
    return this.request("/api/v1/cognify", {
      method: "POST",
      body: JSON.stringify(datasets ? { datasets } : {}),
    });
  }

  /**
   * Queries the knowledge graph using natural language.
   */
  static async search(payload: CogneeSearchPayload): Promise<any> {
    return this.request("/api/v1/search", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /**
   * Removes specific data items or entire datasets.
   */
  static async deleteDataset(datasetId: string): Promise<any> {
    return this.request(`/api/v1/datasets`, {
      method: "DELETE",
      body: JSON.stringify({ dataset_id: datasetId }),
    });
  }
}
