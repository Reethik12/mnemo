import { apiClient } from "@/lib/api-client";
import {
  AIProvider,
  AIModel,
  Conversation,
  ConversationSummary,
  ChatMessage,
  UsageStatistics,
  TokenUsage,
} from "@/types/ai";

const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

export class AIService {
  static async loadProviders(): Promise<AIProvider[]> {
    return apiClient.get<AIProvider[]>("/api/providers");
  }

  static async loadModels(_providerId?: string): Promise<AIModel[]> {
    // This could optionally fetch from the real providers or backend
    // For now we'll fetch mock catalog from backend or just the ones from backend providers
    return [];
  }

  static async loadConversations(): Promise<ConversationSummary[]> {
    return apiClient.get<ConversationSummary[]>(
      `/api/conversations?workspaceId=${WORKSPACE_ID}`,
    );
  }

  static async loadConversation(id: string): Promise<Conversation | null> {
    try {
      return await apiClient.get<Conversation>(`/api/conversations/${id}`);
    } catch {
      return null;
    }
  }

  static async createConversation(modelId: string): Promise<Conversation> {
    return apiClient.post<Conversation>("/api/conversations", {
      workspaceId: WORKSPACE_ID,
      title: "New Conversation",
      modelId,
      messages: [],
    });
  }

  static async renameConversation(id: string, title: string): Promise<void> {
    await apiClient.patch(`/api/conversations/${id}`, { title });
  }

  static async deleteConversation(id: string): Promise<void> {
    await apiClient.delete(`/api/conversations/${id}`);
  }

  static async archiveConversation(id: string): Promise<void> {
    await apiClient.patch(`/api/conversations/${id}`, { status: "archived" });
  }

  static async favoriteConversation(
    id: string,
    isFavorite: boolean,
  ): Promise<void> {
    await apiClient.patch(`/api/conversations/${id}`, { isFavorite });
  }

  static async pinConversation(id: string, isPinned: boolean): Promise<void> {
    await apiClient.patch(`/api/conversations/${id}`, { isPinned });
  }

  static async sendMessage(
    conversationId: string,
    content: string,
    modelId?: string,
    providerId?: string,
  ): Promise<ChatMessage> {
    const response = await apiClient.post<{ message: ChatMessage }>(
      "/api/ai/completion",
      {
        conversationId,
        messages: [{ role: "user", content }],
        modelId,
        providerId,
      },
    );
    return response.message;
  }

  static async streamMessage(
    conversationId: string,
    messages: { role: string; content: string }[],
    onChunk: (chunk: string) => void,
    onComplete: (fullText: string) => void,
    modelId?: string,
    providerId?: string,
    signal?: AbortSignal,
  ): Promise<void> {
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: providerId || "openai",
          modelId: modelId || "gpt-4o",
          messages,
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        onChunk(chunk);
      }

      // Persist the generated message to the database
      if (fullText.trim().length > 0 && conversationId) {
        // Send a background request to persist the message
        apiClient
          .post(`/api/conversations/${conversationId}/messages`, {
            role: "assistant",
            content: fullText,
          })
          .catch((e) => console.error("Failed to persist message", e));
      }

      onComplete(fullText);
    } catch (error: unknown) {
      if ((error as Error).name === "AbortError") {
        console.log("Stream aborted");
        return;
      }
      throw error;
    }
  }

  static async cancelGeneration(): Promise<void> {
    // Handled entirely by AbortController signal
  }

  static async regenerateResponse(
    _conversationId: string,
    _messageId: string,
  ): Promise<ChatMessage> {
    throw new Error("Not implemented");
  }

  static async estimateTokens(text: string): Promise<number> {
    return Math.ceil(text.length / 4);
  }

  static countWords(text: string): number {
    return text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }

  static countCharacters(text: string): number {
    return text.length;
  }

  static async getUsage(): Promise<TokenUsage> {
    return {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      estimatedCostUsd: 0,
    };
  }

  static async getStatistics(): Promise<UsageStatistics> {
    return {
      periodStart: new Date(Date.now() - 30 * 86400000).toISOString(),
      periodEnd: new Date().toISOString(),
      totalTokens: 0,
      totalCostUsd: 0,
      byProvider: [],
      byModel: {},
    };
  }
}
