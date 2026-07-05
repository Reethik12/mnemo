import { MOCK_NOTIFICATIONS } from "./mock-data";
import type { Notification, SearchResult, MnemoChatMessage } from "./types";
import { ProviderFactory } from "@/lib/ai/provider-factory";
import {
  searchMemory,
  rememberMemory,
  type MemorySearchResult,
} from "@/services/memory.service";
import {
  getLivingIntelligenceData,
  triggerImprovement,
} from "@/services/living-intelligence.service";
import { MOCK_COLLECTIONS } from "@/services/exchange/mock-data";
import { MOCK_TIMELINE_EVENTS } from "@/services/timeline/mock-data";
import { digitalTwinService } from "@/services/digital-twin/digital-twin.service";
import { permissionsService } from "@/services/permissions/permissions.service";

export class MnemoAIService {
  async getNotifications(): Promise<Notification[]> {
    return MOCK_NOTIFICATIONS;
  }

  async markNotificationRead(id: string): Promise<boolean> {
    const notif = MOCK_NOTIFICATIONS.find((n) => n.id === id);
    if (notif) {
      notif.isRead = true;
      return true;
    }
    return false;
  }

  // Basic semantic matcher for keywords
  private calculateSemanticScore(text: string, queryTokens: string[]): number {
    const t = text.toLowerCase();
    let score = 0;
    for (const token of queryTokens) {
      if (t.includes(token)) score += 1;
    }
    return score;
  }

  async globalSearch(query: string): Promise<SearchResult[]> {
    if (!query) return [];

    const queryTokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 2);
    if (queryTokens.length === 0) return [];

    const results: SearchResult[] = [];

    // 1. Search Fabric
    try {
      const memories = await searchMemory(query);
      for (const m of memories) {
        results.push({
          id: m.id,
          module: "fabric",
          title: "Memory Fabric Match",
          snippet: m.text.substring(0, 100) + "...",
          url: "/dashboard/fabric",
        });
      }
    } catch (e) {
      console.warn("Fabric search failed", e);
    }

    // 2. Search Exchange
    for (const c of MOCK_COLLECTIONS) {
      if (
        this.calculateSemanticScore(
          c.title + " " + c.description,
          queryTokens,
        ) > 0
      ) {
        results.push({
          id: c.id,
          module: "exchange",
          title: c.title,
          snippet: c.description,
          url: `/dashboard/exchange/${c.id}`,
        });
      }
    }

    // 3. Search Timeline
    for (const e of MOCK_TIMELINE_EVENTS) {
      if (
        this.calculateSemanticScore(e.title + " " + e.summary, queryTokens) > 0
      ) {
        results.push({
          id: e.id,
          module: "timeline",
          title: e.title,
          snippet: e.summary,
          url: "/dashboard/timeline",
        });
      }
    }

    // 4. Search Permissions
    const spaces = await permissionsService.getSpaces();
    for (const s of spaces) {
      if (
        this.calculateSemanticScore(s.name + " " + s.description, queryTokens) >
        0
      ) {
        results.push({
          id: s.id,
          module: "permissions",
          title: s.name,
          snippet: s.description,
          url: "/dashboard/permissions",
        });
      }
    }

    // Filter duplicates and return top 5
    return results.slice(0, 5);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private generateMockFallback(message: string, context: any): string {
    const q = message.toLowerCase();
    if (
      q.includes("who am i") ||
      q.includes("digital twin") ||
      q.includes("profile")
    ) {
      return `According to your Digital Twin profile, your primary expertise domains are ${context.twin?.expertiseDomains?.map((e: { domain: string }) => e.domain).join(", ") || "AI and Technology"}.`;
    }
    if (q.includes("project") || q.includes("work")) {
      return `Looking at your Memory Fabric, you're currently working on projects involving ${context.fabric
        .slice(0, 2)
        .map((m: MemorySearchResult) => m.text.substring(0, 20))
        .join(", ")}. Would you like me to summarize these repositories?`;
    }
    if (
      q.includes("share") ||
      q.includes("permission") ||
      q.includes("access")
    ) {
      return `In your Memory Permissions, you currently have ${context.spaces.length} spaces. Let me know if you want to approve any pending requests.`;
    }
    if (
      q.includes("last month") ||
      q.includes("time") ||
      q.includes("history")
    ) {
      return `In your Timeline, I see recent events like: ${context.timeline
        .slice(0, 1)
        .map((t: { title: string }) => t.title)
        .join(", ")}.`;
    }
    if (q.includes("strength") || q.includes("skill") || q.includes("best")) {
      const topSkill =
        context.twin?.expertiseDomains?.[0]?.domain || "rapid learning";
      return `Based on all your memories, your strongest skill is definitely ${topSkill}.`;
    }
    if (
      q.includes("tomorrow") ||
      q.includes("recommend") ||
      q.includes("next")
    ) {
      return `Based on your Living Intelligence insights, I recommend you focus on: ${context.intelligence?.recommendations?.[0]?.action || "reviewing your recent projects"}.`;
    }
    if (
      q.includes("ml") ||
      q.includes("machine learning") ||
      q.includes("ai")
    ) {
      return `I found several matches for Machine Learning across your modules, including your imported Exchange packs and Fabric memories. You have deep knowledge in neural networks and transformers.`;
    }

    // Generic context-aware fallback
    return `I am Mnemo AI. I scanned your 5 modules and found ${context.fabric.length} fabric memories and ${context.spaces.length} shared spaces related to your prompt. How else can I help?`;
  }

  async chat(message: string): Promise<MnemoChatMessage> {
    console.log("[MNEMO AI] Starting chat pipeline for:", message);

    // 1. Build Context
    const [fabricMemories, intelligence, spaces, twinStats] = await Promise.all(
      [
        searchMemory(message).catch(() => []),
        getLivingIntelligenceData().catch(() => null),
        permissionsService.getSpaces().catch(() => []),
        digitalTwinService.getStats().catch(() => null),
      ],
    );

    const context = {
      fabric: fabricMemories,
      intelligence,
      spaces,
      timeline: MOCK_TIMELINE_EVENTS,
      exchange: MOCK_COLLECTIONS,
      twin: twinStats,
    };

    let reply = "";

    try {
      // 2. Try to use real AI Provider
      const availableProviders = ProviderFactory.getAvailableProviders();

      // If we have API keys (meaning length > 1 because "ollama" is always there but we only want to use it if it's explicitly configured or we have an openai key)
      // Actually, if openai or anthropic are present, they are pushed to the array.
      const realProviderId = availableProviders.find(
        (p) => p !== "ollama" || process.env.OLLAMA_HOST,
      );

      if (realProviderId) {
        const provider = ProviderFactory.getProvider(realProviderId);
        const systemPrompt = `You are Mnemo AI, the central intelligence for a Memory Operating System.
You have access to the user's 5 modules: Fabric (memories), Living Intelligence (insights), Exchange (shared packs), Timeline (history), and Permissions/Twin (profile).
User's Digital Twin expertise: ${twinStats?.expertiseDomains?.map((e: { domain: string }) => e.domain).join(", ")}.
Recent insights: ${intelligence?.insights?.map((i: { description: string }) => i.description).join(", ")}.
Fabric Matches: ${fabricMemories.map((m) => m.text).join(" | ")}.
Keep your answer conversational, helpful, and concise. Don't mention that you are an AI using context directly, just answer naturally as their intelligent assistant.`;

        const response = await provider.generate({
          modelId: "default",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        });
        reply = response.text;
      } else {
        throw new Error("No real provider available");
      }
    } catch (err) {
      console.log("[MNEMO AI] Falling back to dynamic mock generator", err);
      // 3. Fallback to Dynamic Mock Generator
      reply = this.generateMockFallback(message, context);
    }

    // 4. Remember this conversation
    try {
      await rememberMemory({
        title: `Chat with Mnemo AI`,
        content: `User: ${message}\nAI: ${reply}`,
        category: "Conversation",
        tags: ["ai", "chat"],
      });
      // 5. Trigger graph improvement
      await triggerImprovement();
    } catch (e) {
      console.warn("Failed to remember or improve", e);
    }

    return {
      id: `msg-${Date.now()}`,
      role: "ai",
      content: reply,
      timestamp: new Date().toISOString(),
    };
  }
}

export const mnemoAIService = new MnemoAIService();
