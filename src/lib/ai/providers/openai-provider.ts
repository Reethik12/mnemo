import { generateText, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { BaseAIProvider } from "../provider";
import { AIRequest, AIResponse, AIStreamResponse } from "../types";

export class OpenAIProvider extends BaseAIProvider {
  private openai;

  constructor(apiKey?: string) {
    super("openai", "OpenAI", apiKey);
    this.openai = createOpenAI({ apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const { text, finishReason, usage } = await generateText({
      model: this.openai(request.modelId || "gpt-4o"),
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
      model: this.openai(request.modelId || "gpt-4o"),
      messages: request.messages as NonNullable<
        Parameters<typeof generateText>[0]["messages"]
      >,
      system: request.system,
      temperature: request.temperature,
      /* maxTokens: request.maxTokens */
    });

    // We can convert the async generator textStream to a ReadableStream
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
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    ];
  }

  async health(): Promise<boolean> {
    try {
      if (!this.apiKey) return false;
      // Light ping check (models list)
      const res = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
