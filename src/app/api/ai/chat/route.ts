import { NextRequest, NextResponse } from "next/server";
import { ProviderFactory } from "@/lib/ai/provider-factory";
import { SemanticSearchService } from "@/services/backend/semantic-search.service";

export async function POST(req: NextRequest) {
  try {
    // Session is handled by middleware
    const session = true;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      providerId,
      modelId,
      messages,
      system,
      temperature,
      maxTokens,
      workspaceId = "00000000-0000-0000-0000-000000000000",
    } = await req.json();

    if (!providerId || !messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const provider = ProviderFactory.getProvider(providerId);
    if (!provider) {
      return NextResponse.json(
        { error: "Provider not supported" },
        { status: 400 },
      );
    }

    // --- RAG PIPELINE ---
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user")?.content;
    let augmentedSystemPrompt = system || "You are a helpful AI assistant.";

    if (lastUserMessage) {
      try {
        const contextMemories = await SemanticSearchService.search({
          query: lastUserMessage,
          workspaceId,
          limit: 3,
          type: "hybrid",
        });

        if (contextMemories.length > 0) {
          const contextString = contextMemories
            .map((m) => `[Memory: ${m.title}]\n${m.content}`)
            .join("\n\n");
          augmentedSystemPrompt += `\n\n--- RELEVANT CONTEXT ---\nYou have access to the following user memories to help answer the question:\n${contextString}`;
        }
      } catch (err) {
        console.error(
          "[RAG Pipeline] Search failed, falling back to standard prompt",
          err,
        );
      }
    }

    const aiRequest = {
      modelId,
      messages,
      system: augmentedSystemPrompt,
      temperature,
      maxTokens,
    };

    const streamResponse = await provider.stream(aiRequest);

    return new Response(streamResponse.stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("[AI Chat API Error]", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate response" },
      { status: 500 },
    );
  }
}
