import { AIProvider, AIRequest, AIResponse, AIStreamResponse } from "./types";

export abstract class BaseAIProvider implements AIProvider {
  constructor(
    public readonly id: string,
    public readonly name: string,
    protected readonly apiKey?: string,
  ) {}

  abstract generate(request: AIRequest): Promise<AIResponse>;
  abstract stream(request: AIRequest): Promise<AIStreamResponse>;
  abstract listModels(): Promise<{ id: string; name: string }[]>;
  abstract health(): Promise<boolean>;

  async countTokens(text: string, _modelId?: string): Promise<number> {
    // Basic approximation if not overridden by specific provider
    return Math.ceil(text.length / 4);
  }
}
