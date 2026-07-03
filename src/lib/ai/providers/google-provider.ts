import { generateText, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { BaseAIProvider } from "../provider";
import { AIRequest, AIResponse, AIStreamResponse } from "../types";

export class GoogleProvider extends BaseAIProvider {
  private google;

  constructor(apiKey?: string) {
    super("google", "Google", apiKey);
    this.google = createGoogleGenerativeAI({ apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const { text, finishReason, usage } = await generateText({
      model: this.google(request.modelId || "gemini-1.5-pro"),
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
      model: this.google(request.modelId || "gemini-1.5-pro"),
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
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    ];
  }

  async health(): Promise<boolean> {
    try {
      if (!this.apiKey) return false;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`,
      );
      return res.ok;
    } catch {
      return false;
    }
  }
}
