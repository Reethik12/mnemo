export type ProviderStatus =
  "active" | "inactive" | "degraded" | "error" | "unconfigured";

export interface ProviderCapability {
  readonly hasVision: boolean;
  readonly hasFunctionCalling: boolean;
  readonly hasJsonMode: boolean;
  readonly hasStreaming: boolean;
  readonly hasReasoning: boolean;
  readonly hasEmbeddings: boolean;
}

export interface ProviderLimits {
  readonly rpm: number; // requests per minute
  readonly tpm: number; // tokens per minute
  readonly dailyLimit: number;
  readonly maxConcurrent: number;
}

export interface ProviderPricing {
  readonly inputPer1k: number;
  readonly outputPer1k: number;
  readonly currency: string;
}

export interface ProviderConfiguration {
  readonly apiKey?: string;
  readonly baseUrl?: string;
  readonly organizationId?: string;
  readonly customHeaders?: Record<string, string>;
}

export interface ProviderFeature {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly enabled: boolean;
}

export interface ProviderLatency {
  readonly averageMs: number;
  readonly p95Ms: number;
  readonly lastPingMs: number;
}

export interface ProviderHealth {
  readonly status: ProviderStatus;
  readonly latency: ProviderLatency;
  readonly errorRate: number;
  readonly uptime: number;
  readonly lastCheck: string;
  readonly activeIncidents: number;
}

export interface ProviderModel {
  readonly id: string;
  readonly providerId: string;
  readonly name: string;
  readonly description: string;
  readonly contextWindow: number;
  readonly maxOutputTokens: number;
  readonly capabilities: ProviderCapability;
  readonly pricing: ProviderPricing;
  readonly isDefault?: boolean;
  readonly isDeprecated?: boolean;
}

export interface Provider {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly website: string;
  readonly status: ProviderStatus;
  readonly capabilities: ProviderCapability;
  readonly limits: ProviderLimits;
  readonly models: readonly string[]; // Model IDs
}

export interface ProviderUsage {
  readonly providerId: string;
  readonly date: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalRequests: number;
  readonly estimatedCost: number;
}

export interface ProviderStatistics {
  readonly totalProviders: number;
  readonly activeProviders: number;
  readonly totalModels: number;
  readonly totalUsage30d: number;
  readonly totalCost30d: number;
}

export interface ProviderConnection {
  readonly isConnected: boolean;
  readonly latencyMs: number;
  readonly lastTested: string;
  readonly error?: string;
}

export interface ProviderSession {
  readonly activeProviderId: string | null;
  readonly activeModelId: string | null;
  readonly configuration: Record<string, ProviderConfiguration>;
}
