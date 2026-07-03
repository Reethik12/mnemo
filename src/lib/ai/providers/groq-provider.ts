import { generateText, streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { BaseAIProvider } from "../provider";
import { AIRequest, AIResponse, AIStreamResponse } from "../types";

export class GroqProvider extends BaseAIProvider {
  private groq;

  constructor(apiKey?: string) {
    super("groq", "Groq", apiKey);
    this.groq = createGroq({ apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const { text, finishReason, usage } = await generateText({
      model: this.groq(request.modelId || "llama3-8b-8192"),
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
      model: this.groq(request.modelId || "llama3-8b-8192"),
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
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B" },
      { id: "llama-3.1-70b-versatile", name: "Llama 3.1 70B" },
      { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B" },
    ];
  }

  async health(): Promise<boolean> {
    try {
      if (!this.apiKey) return false;
      const res = await fetch("https://api.groq.com/openai/v1/models", {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
