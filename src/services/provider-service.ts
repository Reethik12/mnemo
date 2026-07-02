import {
  Provider,
  ProviderModel,
  ProviderUsage,
  ProviderStatistics,
  ProviderHealth,
  ProviderConnection,
  ProviderConfiguration,
} from "@/types/provider";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_PROVIDERS: Provider[] = [
  {
    id: "openai",
    name: "OpenAI",
    description: "Industry-leading foundation models.",
    icon: "O",
    website: "https://openai.com",
    status: "active",
    capabilities: {
      hasVision: true,
      hasFunctionCalling: true,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: true,
      hasEmbeddings: true,
    },
    limits: {
      rpm: 10000,
      tpm: 1000000,
      dailyLimit: 5000000,
      maxConcurrent: 50,
    },
    models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo", "o1-preview"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Highly capable and safe models.",
    icon: "A",
    website: "https://anthropic.com",
    status: "active",
    capabilities: {
      hasVision: true,
      hasFunctionCalling: true,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: true,
      hasEmbeddings: false,
    },
    limits: { rpm: 4000, tpm: 400000, dailyLimit: 2000000, maxConcurrent: 20 },
    models: ["claude-3-5-sonnet", "claude-3-opus", "claude-3-haiku"],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's multimodal powerhouse.",
    icon: "G",
    website: "https://deepmind.google",
    status: "active",
    capabilities: {
      hasVision: true,
      hasFunctionCalling: true,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: false,
      hasEmbeddings: true,
    },
    limits: {
      rpm: 1500,
      tpm: 2000000,
      dailyLimit: 10000000,
      maxConcurrent: 30,
    },
    models: ["gemini-1.5-pro", "gemini-1.5-flash"],
  },
  {
    id: "groq",
    name: "Groq",
    description: "Ultra-low latency LPU inference.",
    icon: "Q",
    website: "https://groq.com",
    status: "active",
    capabilities: {
      hasVision: false,
      hasFunctionCalling: true,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: false,
      hasEmbeddings: false,
    },
    limits: {
      rpm: 14400,
      tpm: 500000,
      dailyLimit: 5000000,
      maxConcurrent: 100,
    },
    models: ["llama3-70b-8192", "mixtral-8x7b-32768"],
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "Run models locally on your machine.",
    icon: "L",
    website: "https://ollama.com",
    status: "unconfigured",
    capabilities: {
      hasVision: true,
      hasFunctionCalling: false,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: false,
      hasEmbeddings: true,
    },
    limits: { rpm: 9999, tpm: 999999, dailyLimit: 9999999, maxConcurrent: 5 },
    models: ["llama3", "mistral", "phi3"],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description: "Open-weight and commercial models.",
    icon: "M",
    website: "https://mistral.ai",
    status: "active",
    capabilities: {
      hasVision: false,
      hasFunctionCalling: true,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: false,
      hasEmbeddings: true,
    },
    limits: { rpm: 2000, tpm: 200000, dailyLimit: 1000000, maxConcurrent: 15 },
    models: ["mistral-large-latest", "open-mixtral-8x22b"],
  },
  {
    id: "cohere",
    name: "Cohere",
    description: "Enterprise-grade language AI.",
    icon: "C",
    website: "https://cohere.com",
    status: "active",
    capabilities: {
      hasVision: false,
      hasFunctionCalling: true,
      hasJsonMode: false,
      hasStreaming: true,
      hasReasoning: false,
      hasEmbeddings: true,
    },
    limits: { rpm: 1000, tpm: 100000, dailyLimit: 500000, maxConcurrent: 10 },
    models: ["command-r-plus", "command-r"],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Unified API for multiple LLMs.",
    icon: "R",
    website: "https://openrouter.ai",
    status: "inactive",
    capabilities: {
      hasVision: true,
      hasFunctionCalling: true,
      hasJsonMode: true,
      hasStreaming: true,
      hasReasoning: true,
      hasEmbeddings: false,
    },
    limits: { rpm: 5000, tpm: 500000, dailyLimit: 2000000, maxConcurrent: 40 },
    models: [
      "openai/gpt-4o",
      "anthropic/claude-3-opus",
      "meta-llama/llama-3-70b-instruct",
    ],
  },
];

const generateMockModels = (): ProviderModel[] => {
  const models: ProviderModel[] = [];
  MOCK_PROVIDERS.forEach((provider) => {
    provider.models.forEach((modelId, index) => {
      models.push({
        id: modelId,
        providerId: provider.id,
        name: modelId.replace(/-/g, " ").toUpperCase(),
        description: `Mock description for ${modelId}`,
        contextWindow: 8192 * (index + 1),
        maxOutputTokens: 4096,
        capabilities: provider.capabilities,
        pricing: {
          inputPer1k: 0.01 * (index + 1),
          outputPer1k: 0.03 * (index + 1),
          currency: "USD",
        },
        isDefault: index === 0,
        isDeprecated: false,
      });
    });
  });
  return models;
};

const MOCK_MODELS = generateMockModels();

const MOCK_USAGE: ProviderUsage[] = Array.from({ length: 30 }, (_, i) => ({
  providerId: MOCK_PROVIDERS[i % MOCK_PROVIDERS.length].id,
  date: new Date(Date.now() - i * 86400000).toISOString(),
  inputTokens: 50000 + i * 1000,
  outputTokens: 10000 + i * 500,
  totalRequests: 200 + i * 5,
  estimatedCost: 1.5 + i * 0.1,
}));

export class ProviderManagementService {
  static async loadProviders(): Promise<Provider[]> {
    await delay(300);
    return [...MOCK_PROVIDERS];
  }

  static async loadModels(): Promise<ProviderModel[]> {
    await delay(200);
    return [...MOCK_MODELS];
  }

  static async loadUsage(): Promise<ProviderUsage[]> {
    await delay(400);
    return [...MOCK_USAGE];
  }

  static async loadStatistics(): Promise<ProviderStatistics> {
    await delay(250);
    return {
      totalProviders: MOCK_PROVIDERS.length,
      activeProviders: MOCK_PROVIDERS.filter((p) => p.status === "active")
        .length,
      totalModels: MOCK_MODELS.length,
      totalUsage30d: 1500000,
      totalCost30d: 45.5,
    };
  }

  static async checkHealth(providerId: string): Promise<ProviderHealth> {
    await delay(500);
    const provider = MOCK_PROVIDERS.find((p) => p.id === providerId);
    return {
      status: provider?.status || "error",
      latency: { averageMs: 450, p95Ms: 800, lastPingMs: 320 },
      errorRate: 0.01,
      uptime: 99.99,
      lastCheck: new Date().toISOString(),
      activeIncidents: 0,
    };
  }

  static async testConnection(
    providerId: string,
    config: ProviderConfiguration,
  ): Promise<ProviderConnection> {
    await delay(800); // Simulate network handshake
    if (!config.apiKey && providerId !== "ollama") {
      return {
        isConnected: false,
        latencyMs: 0,
        lastTested: new Date().toISOString(),
        error: "Missing API Key",
      };
    }
    return {
      isConnected: true,
      latencyMs: Math.floor(Math.random() * 500) + 100,
      lastTested: new Date().toISOString(),
    };
  }
}
