import { generateText, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { BaseAIProvider } from "../provider";
import { AIRequest, AIResponse, AIStreamResponse } from "../types";

export class OllamaProvider extends BaseAIProvider {
  private ollama;

  constructor() {
    super("ollama", "Ollama");
    // Ollama offers an OpenAI compatible endpoint
    this.ollama = createOpenAI({
      baseURL: "http://127.0.0.1:11434/v1",
      apiKey: "ollama",
    });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const { text, finishReason, usage } = await generateText({
      model: this.ollama(request.modelId || "llama3"),
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
      model: this.ollama(request.modelId || "llama3"),
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
    try {
      const res = await fetch("http://127.0.0.1:11434/api/tags");
      if (!res.ok) return [];
      const data = await res.json();
      return data.models.map((m: Record<string, unknown>) => ({
        id: m.name,
        name: m.name,
      }));
    } catch {
      return [];
    }
  }

  async health(): Promise<boolean> {
    try {
      const res = await fetch("http://127.0.0.1:11434/");
      return res.ok || res.status === 200;
    } catch {
      return false;
    }
  }
}
