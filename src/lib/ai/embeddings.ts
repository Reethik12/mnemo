import { embed, embedMany, EmbeddingModel } from "ai";
import { openai } from "@ai-sdk/openai";

export class EmbeddingService {
  /**
   * Get the default embedding model
   */
  static getModel(): EmbeddingModel {
    return openai.embedding("text-embedding-3-small");
  }

  /**
   * Generate an embedding for a single text
   */
  static async generateEmbedding(text: string): Promise<number[]> {
    if (!text || text.trim() === "") {
      return [];
    }
    const { embedding } = await embed({
      model: this.getModel(),
      value: text,
    });
    return embedding;
  }

  /**
   * Generate embeddings for multiple texts
   */
  static async generateEmbeddings(texts: string[]): Promise<number[][]> {
    const validTexts = texts.filter((t) => t.trim() !== "");
    if (validTexts.length === 0) return [];

    const { embeddings } = await embedMany({
      model: this.getModel(),
      values: validTexts,
    });
    return embeddings;
  }
}
