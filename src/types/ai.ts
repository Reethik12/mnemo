// ==========================================
// Provider Types
// ==========================================
export type ProviderStatus =
  "connected" | "disconnected" | "error" | "validating";
export type ProviderCapability =
  | "vision"
  | "reasoning"
  | "streaming"
  | "function-calling"
  | "json-mode"
  | "tool-use"
  | "multimodal"
  | "audio"
  | "image";

export interface ProviderHealth {
  readonly isAvailable: boolean;
  readonly latencyMs: number;
  readonly lastChecked: string;
  readonly errorMessage?: string;
}

export interface ProviderConfiguration {
  readonly apiKey?: string;
  readonly baseUrl?: string;
  readonly organization?: string;
  readonly customHeaders?: Record<string, string>;
}

export interface ProviderLimits {
  readonly requestsPerMinute: number;
  readonly tokensPerMinute: number;
  readonly maxConcurrentRequests: number;
}

export interface AIProvider {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly website: string;
  readonly capabilities: readonly ProviderCapability[];
  readonly status: ProviderStatus;
  readonly health: ProviderHealth;
  readonly limits?: ProviderLimits;
  readonly isLocal: boolean;
}

// ==========================================
// Model Types
// ==========================================
export type ModelCapability = ProviderCapability;

export interface ModelContextWindow {
  readonly maxTokens: number;
  readonly inputTokens: number;
  readonly outputTokens: number;
}

export interface ModelPricing {
  readonly inputCostPer1k: number;
  readonly outputCostPer1k: number;
  readonly currency: string;
}

export interface ModelLatency {
  readonly averageFirstTokenMs: number;
  readonly tokensPerSecond: number;
}

export interface AIModel {
  readonly id: string;
  readonly providerId: string;
  readonly name: string;
  readonly description: string;
  readonly capabilities: readonly ModelCapability[];
  readonly contextWindow: ModelContextWindow;
  readonly pricing?: ModelPricing;
  readonly latency?: ModelLatency;
  readonly isDefault?: boolean;
}

// ==========================================
// Chat Types
// ==========================================
export type MessageRole = "user" | "assistant" | "system" | "tool";
export type MessageStatus =
  "sending" | "sent" | "streaming" | "error" | "cancelled";

export * from "./conversation";

export interface MessageAttachment {
  readonly id: string;
  readonly type: "file" | "image" | "memory" | "code";
  readonly name: string;
  readonly url?: string;
  readonly size?: number;
  readonly metadata?: Record<string, unknown>;
}

export interface Reaction {
  readonly emoji: string;
  readonly count: number;
  readonly isReacted: boolean;
}

export interface MessageMetadata {
  readonly modelId?: string;
  readonly providerId?: string;
  readonly generationTimeMs?: number;
  readonly promptTokens?: number;
  readonly completionTokens?: number;
}

export interface ChatMessage {
  readonly id: string;
  readonly role: MessageRole;
  readonly content: string;
  readonly timestamp: string;
  readonly status: MessageStatus;
  readonly attachments?: readonly MessageAttachment[];
  readonly reactions?: readonly Reaction[];
  readonly metadata?: MessageMetadata;
  readonly parentId?: string;
}

// ==========================================
// Streaming Types
// ==========================================
export type GenerationStatus =
  "idle" | "generating" | "completed" | "error" | "cancelled";
export type AbortReason =
  "user_cancelled" | "timeout" | "max_tokens_reached" | "filter" | "unknown";

export interface StreamingStatistics {
  readonly startTime: number;
  readonly firstTokenTime?: number;
  readonly lastTokenTime?: number;
  readonly tokensGenerated: number;
  readonly averageTokensPerSecond: number;
}

export interface StreamingChunk {
  readonly text: string;
  readonly isFinal: boolean;
}

export interface StreamingState {
  readonly status: GenerationStatus;
  readonly currentText: string;
  readonly error?: string;
  readonly statistics?: StreamingStatistics;
  readonly abortReason?: AbortReason;
}

// ==========================================
// Usage Types
// ==========================================
export interface TokenUsage {
  readonly promptTokens: number;
  readonly completionTokens: number;
  readonly totalTokens: number;
  readonly estimatedCostUsd?: number;
}

export interface ConversationUsage extends TokenUsage {
  readonly conversationId: string;
  readonly messageCount: number;
}

export interface ProviderUsage extends TokenUsage {
  readonly providerId: string;
  readonly requestCount: number;
  readonly errorCount: number;
}

export interface UsageStatistics {
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly totalTokens: number;
  readonly totalCostUsd: number;
  readonly byProvider: readonly ProviderUsage[];
  readonly byModel: Record<string, TokenUsage>;
}

// ==========================================
// Session Types
// ==========================================
export interface RecentModel {
  readonly modelId: string;
  readonly lastUsedAt: string;
  readonly useCount: number;
}

export interface RecentProvider {
  readonly providerId: string;
  readonly lastUsedAt: string;
}

export interface SessionStatistics {
  readonly sessionStartTime: string;
  readonly activeTimeMs: number;
  readonly totalInteractions: number;
  readonly tokensProcessed: number;
}

export interface AISession {
  readonly id: string;
  readonly recentModels: readonly RecentModel[];
  readonly recentProviders: readonly RecentProvider[];
  readonly statistics: SessionStatistics;
}
