import { generateText, streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { BaseAIProvider } from "../provider";
import { AIRequest, AIResponse, AIStreamResponse } from "../types";

export class AnthropicProvider extends BaseAIProvider {
  private anthropic;

  constructor(apiKey?: string) {
    super("anthropic", "Anthropic", apiKey);
    this.anthropic = createAnthropic({ apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const { text, finishReason, usage } = await generateText({
      model: this.anthropic(request.modelId || "claude-3-5-sonnet-20240620"),
      messages: request.messages as NonNullable<
        Parameters<typeof generateText>[0]["messages"]
      >,
      system: request.system,
      temperature: request.temperature,
      /* maxTokens: request.maxTokens */
    });

    return {
      text,
      finishReason,
      usage: {
        promptTokens:
          (usage as unknown as Record<string, number>).promptTokens || 0,
        completionTokens:
          (usage as unknown as Record<string, number>).completionTokens || 0,
        totalTokens:
          (usage as unknown as Record<string, number>).totalTokens || 0,
      },
    };
  }

  async stream(request: AIRequest): Promise<AIStreamResponse> {
    const { textStream } = streamText({
      model: this.anthropic(request.modelId || "claude-3-5-sonnet-20240620"),
      messages: request.messages as NonNullable<
        Parameters<typeof generateText>[0]["messages"]
      >,
      system: request.system,
      temperature: request.temperature,
      /* maxTokens: request.maxTokens */
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of textStream) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return { stream: readable };
  }

  async listModels(): Promise<{ id: string; name: string }[]> {
    return [
      { id: "claude-3-5-sonnet-20240620", name: "Claude 3.5 Sonnet" },
      { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
      { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" },
    ];
  }

  async health(): Promise<boolean> {
    try {
      if (!this.apiKey) return false;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          messages: [{ role: "user", content: "hi" }],
          max_tokens: 1,
        }),
      });
      return res.ok || res.status === 400; // 400 might mean invalid payload but key is valid
    } catch {
      return false;
    }
  }
}
