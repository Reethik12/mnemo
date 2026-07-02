export interface PromptCategory {
  readonly id: string;
  readonly name: string;
  readonly color?: string;
  readonly icon?: string;
}

export interface PromptVariables {
  readonly [key: string]: string | number | boolean;
}

export interface PromptTemplate {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly content: string;
  readonly categoryId: string;
  readonly isFavorite: boolean;
  readonly tags: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly variables: readonly string[]; // Variable names extracted from content (e.g. {{name}})
}

export interface PromptPreview {
  readonly content: string;
  readonly missingVariables: readonly string[];
  readonly hasErrors: boolean;
  readonly isReady: boolean;
}

export interface TokenEstimate {
  readonly promptTokens: number;
  readonly contextTokens: number;
  readonly totalTokens: number;
  readonly maxTokens: number;
  readonly percentageUsed: number;
  readonly isOverLimit: boolean;
}

export interface ContextMemory {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly tokenCount: number;
  readonly type: "note" | "document" | "webpage" | "code";
  readonly selected: boolean;
}

export interface ContextWindow {
  readonly id: string;
  readonly name: string;
  readonly maxTokens: number;
  readonly availableTokens: number;
  readonly currentTokens: number;
}

export interface ContextInjection {
  readonly memoryIds: readonly string[];
  readonly injectionStrategy: "append" | "prepend" | "inline";
  readonly separator: string;
}

export interface Prompt {
  readonly id: string;
  readonly templateId?: string;
  readonly content: string;
  readonly compiledContent: string;
  readonly variables: PromptVariables;
  readonly contextIds: readonly string[];
}

export interface PromptExecution {
  readonly promptId: string;
  readonly prompt: Prompt;
  readonly tokens: TokenEstimate;
  readonly timestamp: string;
  readonly modelId: string;
  readonly durationMs: number;
  readonly success: boolean;
}

export interface PromptHistory {
  readonly id: string;
  readonly execution: PromptExecution;
  readonly resultPreview?: string;
  readonly timestamp: string;
}

export interface PromptSession {
  readonly activePromptId?: string;
  readonly activeTemplateId?: string;
  readonly variables: PromptVariables;
  readonly selectedContextIds: readonly string[];
}

export interface PromptStatistics {
  readonly totalTemplates: number;
  readonly totalExecutions: number;
  readonly favoriteTemplates: number;
  readonly mostUsedTemplateId?: string;
  readonly averageTokensUsed: number;
}

export interface PromptSuggestion {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly promptText: string;
  readonly category: string;
}
