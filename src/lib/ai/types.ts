export type CoreMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
};

export interface AIRequest {
  modelId: string;
  messages: CoreMessage[];
  system?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  text: string;
  finishReason: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIStreamResponse {
  stream: ReadableStream;
}

export interface AIProvider {
  id: string;
  name: string;

  /** Generate a complete response. */
  generate(request: AIRequest): Promise<AIResponse>;

  /** Stream a response back to the client. */
  stream(request: AIRequest): Promise<AIStreamResponse>;

  /** List available models for this provider. */
  listModels(): Promise<{ id: string; name: string }[]>;

  /** Check if the provider is healthy (e.g. valid API key). */
  health(): Promise<boolean>;

  /** Count the tokens for a given text. */
  countTokens(text: string, modelId?: string): Promise<number>;
}
