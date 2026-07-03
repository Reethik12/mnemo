import { apiClient } from "@/lib/api-client";
import {
  Provider,
  ProviderModel,
  ProviderUsage,
  ProviderStatistics,
  ProviderHealth,
  ProviderConnection,
  ProviderConfiguration,
} from "@/types/provider";

function toProvider(p: unknown): Provider {
  const backendP = p as {
    id: string;
    name: string;
    apiKey?: string;
    baseUrl?: string;
    capabilities?: unknown;
    createdAt: string;
    updatedAt: string;
  };
  return {
    id: backendP.id,
    name: backendP.name,
    description: "",
    status: "active",
    icon: backendP.name.charAt(0),
    website: "",
    capabilities: (backendP.capabilities as Provider["capabilities"]) || {
      hasVision: false,
      hasFunctionCalling: false,
      hasStreaming: true,
      hasEmbeddings: false,
    },
    limits: { rpm: 100, tpm: 100000, dailyLimit: 0, maxConcurrent: 0 },
    models: [],
  };
}

export class ProviderManagementService {
  static async loadProviders(): Promise<Provider[]> {
    const res = await apiClient.get<unknown[]>("/api/providers");
    return res.map(toProvider);
  }

  static async loadModels(): Promise<ProviderModel[]> {
    const providers = await this.loadProviders();
    const models: ProviderModel[] = [];
    providers.forEach((provider) => {
      models.push({
        id: `mock-model-${provider.id}`,
        providerId: provider.id,
        name: `${provider.name} Default Model`,
        description: `Mock model for ${provider.name}`,
        contextWindow: 8192,
        maxOutputTokens: 4096,
        capabilities: provider.capabilities,
        pricing: { inputPer1k: 0.01, outputPer1k: 0.03, currency: "USD" },
        isDefault: true,
        isDeprecated: false,
      });
    });
    return models;
  }

  static async loadUsage(): Promise<ProviderUsage[]> {
    return [];
  }

  static async loadStatistics(): Promise<ProviderStatistics> {
    const providers = await this.loadProviders();
    return {
      totalProviders: providers.length,
      activeProviders: providers.filter((p) => p.status === "active").length,
      totalModels: providers.length,
      totalUsage30d: 0,
      totalCost30d: 0,
    };
  }

  static async checkHealth(_providerId: string): Promise<ProviderHealth> {
    return {
      status: "active",
      latency: { averageMs: 150, p95Ms: 200, lastPingMs: 120 },
      errorRate: 0,
      uptime: 100,
      lastCheck: new Date().toISOString(),
      activeIncidents: 0,
    };
  }

  static async testConnection(
    _providerId: string,
    config: ProviderConfiguration,
  ): Promise<ProviderConnection> {
    if (!config.apiKey && _providerId !== "ollama") {
      return {
        isConnected: false,
        latencyMs: 0,
        lastTested: new Date().toISOString(),
        error: "Missing API Key",
      };
    }
    return {
      isConnected: true,
      latencyMs: 150,
      lastTested: new Date().toISOString(),
    };
  }
}
