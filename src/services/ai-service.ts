import {
  AIProvider,
  AIModel,
  Conversation,
  ConversationSummary,
  ChatMessage,
  UsageStatistics,
  TokenUsage,
} from "@/types/ai";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// Mock Data: Providers
// ==========================================
export const MOCK_PROVIDERS: AIProvider[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "Advanced language models",
    website: "https://openai.com",
    capabilities: [
      "vision",
      "reasoning",
      "streaming",
      "function-calling",
      "json-mode",
    ],
    status: "connected",
    health: {
      isAvailable: true,
      latencyMs: 120,
      lastChecked: new Date().toISOString(),
    },
    isLocal: false,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude models for safety and nuance",
    website: "https://anthropic.com",
    capabilities: ["vision", "streaming", "function-calling"],
    status: "connected",
    health: {
      isAvailable: true,
      latencyMs: 150,
      lastChecked: new Date().toISOString(),
    },
    isLocal: false,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Multimodal AI by Google",
    website: "https://deepmind.google/technologies/gemini/",
    capabilities: ["vision", "multimodal", "streaming", "audio"],
    status: "connected",
    health: {
      isAvailable: true,
      latencyMs: 110,
      lastChecked: new Date().toISOString(),
    },
    isLocal: false,
  },
  {
    id: "groq",
    name: "Groq",
    description: "Fastest inference for open models",
    website: "https://groq.com",
    capabilities: ["streaming", "json-mode"],
    status: "connected",
    health: {
      isAvailable: true,
      latencyMs: 15,
      lastChecked: new Date().toISOString(),
    },
    isLocal: false,
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "Run local LLMs",
    website: "https://ollama.com",
    capabilities: ["streaming"],
    status: "connected",
    health: {
      isAvailable: true,
      latencyMs: 50,
      lastChecked: new Date().toISOString(),
    },
    isLocal: true,
  },
];

// ==========================================
// Mock Data: Models
// ==========================================
export const MOCK_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    providerId: "openai",
    name: "GPT-4o",
    description: "High intelligence and speed",
    capabilities: ["vision", "streaming", "function-calling"],
    contextWindow: { maxTokens: 128000, inputTokens: 0, outputTokens: 0 },
    pricing: { inputCostPer1k: 0.005, outputCostPer1k: 0.015, currency: "USD" },
    isDefault: true,
  },
  {
    id: "gpt-5-mock",
    providerId: "openai",
    name: "GPT-5 Mock",
    description: "Next-gen experimental model",
    capabilities: ["reasoning", "streaming"],
    contextWindow: { maxTokens: 256000, inputTokens: 0, outputTokens: 0 },
  },
  {
    id: "claude-3-5-sonnet",
    providerId: "anthropic",
    name: "Claude 3.5 Sonnet",
    description: "Balanced speed and intelligence",
    capabilities: ["vision", "streaming"],
    contextWindow: { maxTokens: 200000, inputTokens: 0, outputTokens: 0 },
  },
  {
    id: "claude-3-opus",
    providerId: "anthropic",
    name: "Claude 3 Opus",
    description: "Most capable Claude model",
    capabilities: ["vision", "streaming"],
    contextWindow: { maxTokens: 200000, inputTokens: 0, outputTokens: 0 },
  },
  {
    id: "gemini-2.5-pro",
    providerId: "gemini",
    name: "Gemini 2.5 Pro",
    description: "Advanced reasoning and multimodality",
    capabilities: ["multimodal", "streaming", "audio"],
    contextWindow: { maxTokens: 2000000, inputTokens: 0, outputTokens: 0 },
  },
  {
    id: "llama-3-70b",
    providerId: "groq",
    name: "Llama 3 70B",
    description: "Fast Llama 3 via Groq",
    capabilities: ["streaming"],
    contextWindow: { maxTokens: 8192, inputTokens: 0, outputTokens: 0 },
  },
  {
    id: "llama-3-8b-local",
    providerId: "ollama",
    name: "Llama 3 8B (Local)",
    description: "Locally running model",
    capabilities: ["streaming"],
    contextWindow: { maxTokens: 8192, inputTokens: 0, outputTokens: 0 },
  },
];

// ==========================================
// Mock Data: Conversations
// ==========================================
const createMockMessage = (
  id: string,
  role: "user" | "assistant" | "system",
  content: string,
): ChatMessage => ({
  id,
  role,
  content,
  timestamp: new Date().toISOString(),
  status: "sent",
});

const generateMockConversations = (): Conversation[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `conv-${i}`,
    title: `Mock Conversation ${i + 1}`,
    updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    isPinned: i < 2,
    isFavorite: i % 4 === 0,
    status: "active",
    modelId: i % 2 === 0 ? "gpt-4o" : "claude-3-5-sonnet",
    visibility: "private",
    messages: [
      createMockMessage(
        `msg-${i}-1`,
        "user",
        `Can you help me with topic ${i + 1}?`,
      ),
      createMockMessage(
        `msg-${i}-2`,
        "assistant",
        `Absolutely! Topic ${i + 1} is fascinating. Here is a detailed response covering key architectural principles.`,
      ),
    ],
  }));
};

let MOCK_CONVERSATIONS = generateMockConversations();

export class AIService {
  static async loadProviders(): Promise<AIProvider[]> {
    await delay(300);
    return [...MOCK_PROVIDERS];
  }

  static async loadModels(providerId?: string): Promise<AIModel[]> {
    await delay(300);
    if (providerId) {
      return MOCK_MODELS.filter((m) => m.providerId === providerId);
    }
    return [...MOCK_MODELS];
  }

  static async loadConversations(): Promise<ConversationSummary[]> {
    await delay(400);
    return MOCK_CONVERSATIONS.map((c) => ({
      id: c.id,
      title: c.title,
      updatedAt: c.updatedAt,
      folderId: c.folderId,
      isPinned: c.isPinned,
      isFavorite: c.isFavorite,
      status: c.status,
      modelId: c.modelId,
    }));
  }

  static async loadConversation(id: string): Promise<Conversation | null> {
    await delay(400);
    return MOCK_CONVERSATIONS.find((c) => c.id === id) || null;
  }

  static async createConversation(modelId: string): Promise<Conversation> {
    await delay(300);
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      title: "New Conversation",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isPinned: false,
      isFavorite: false,
      status: "active",
      modelId,
      visibility: "private",
      messages: [],
    };
    MOCK_CONVERSATIONS = [newConv, ...MOCK_CONVERSATIONS];
    return newConv;
  }

  static async renameConversation(id: string, title: string): Promise<void> {
    await delay(200);
    MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.map((c) =>
      c.id === id ? { ...c, title, updatedAt: new Date().toISOString() } : c,
    );
  }

  static async deleteConversation(id: string): Promise<void> {
    await delay(200);
    MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.filter((c) => c.id !== id);
  }

  static async archiveConversation(id: string): Promise<void> {
    await delay(200);
    MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.map((c) =>
      c.id === id
        ? { ...c, status: "archived", updatedAt: new Date().toISOString() }
        : c,
    );
  }

  static async favoriteConversation(
    id: string,
    isFavorite: boolean,
  ): Promise<void> {
    await delay(200);
    MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.map((c) =>
      c.id === id
        ? { ...c, isFavorite, updatedAt: new Date().toISOString() }
        : c,
    );
  }

  static async pinConversation(id: string, isPinned: boolean): Promise<void> {
    await delay(200);
    MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.map((c) =>
      c.id === id ? { ...c, isPinned, updatedAt: new Date().toISOString() } : c,
    );
  }

  static async sendMessage(
    conversationId: string,
    content: string,
  ): Promise<ChatMessage> {
    await delay(600); // simulate generation time
    const response: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: `Here is a mocked response to: "${content}". This architecture supports streaming, but this is the full blocked response.`,
      timestamp: new Date().toISOString(),
      status: "sent",
    };
    MOCK_CONVERSATIONS = MOCK_CONVERSATIONS.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          updatedAt: new Date().toISOString(),
          messages: [
            ...c.messages,
            createMockMessage(`msg-${Date.now()}-user`, "user", content),
            response,
          ],
        };
      }
      return c;
    });
    return response;
  }

  static async streamMessage(
    content: string,
    onChunk: (chunk: string) => void,
    onComplete: (fullText: string) => void,
    signal?: AbortSignal,
  ): Promise<void> {
    const text = `I am a mocked streaming response to your message: "${content}". I will stream chunk by chunk simulating a real LLM response to provide a fluid user experience.`;
    const words = text.split(" ");
    let fullText = "";

    for (const word of words) {
      if (signal?.aborted) throw new Error("AbortError");
      await delay(Math.random() * 50 + 20); // 20-70ms per word
      const chunk = word + " ";
      fullText += chunk;
      onChunk(chunk);
    }

    if (!signal?.aborted) {
      onComplete(fullText.trim());
    }
  }

  static async cancelGeneration(): Promise<void> {
    // Usually handled via AbortController in streamMessage
    await delay(100);
  }

  static async regenerateResponse(
    conversationId: string,
    messageId: string,
  ): Promise<ChatMessage> {
    await delay(800);
    return {
      id: `msg-regen-${Date.now()}`,
      role: "assistant",
      content:
        "This is a regenerated mock response replacing the previous one.",
      timestamp: new Date().toISOString(),
      status: "sent",
      parentId: messageId,
    };
  }

  static async estimateTokens(text: string): Promise<number> {
    await delay(10);
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
    await delay(200);
    return {
      promptTokens: 14500,
      completionTokens: 32000,
      totalTokens: 46500,
      estimatedCostUsd: 0.45,
    };
  }

  static async getStatistics(): Promise<UsageStatistics> {
    await delay(300);
    return {
      periodStart: new Date(Date.now() - 30 * 86400000).toISOString(),
      periodEnd: new Date().toISOString(),
      totalTokens: 1250000,
      totalCostUsd: 12.45,
      byProvider: [],
      byModel: {},
    };
  }
}
