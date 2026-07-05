import { MOCK_NOTIFICATIONS } from "./mock-data";
import type { Notification, SearchResult, MnemoChatMessage } from "./types";

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

  async globalSearch(query: string): Promise<SearchResult[]> {
    if (!query) return [];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    if ("react server components".includes(q) || q.includes("react")) {
      results.push({
        id: "s1",
        module: "fabric",
        title: "React Server Components",
        snippet: "A paradigm where components render on the server...",
        url: "/dashboard/fabric",
      });
    }

    if ("ai research".includes(q) || q.includes("ai")) {
      results.push({
        id: "s2",
        module: "permissions",
        title: "AI & ML Research Space",
        snippet: "Shared workspace with Elena Rodriguez...",
        url: "/dashboard/permissions",
      });
      results.push({
        id: "s3",
        module: "exchange",
        title: "Advanced Machine Learning Concepts",
        snippet: "A public Memory Collection by David Chen...",
        url: "/dashboard/exchange",
      });
    }

    if ("evolution".includes(q) || q.includes("time")) {
      results.push({
        id: "s4",
        module: "timeline",
        title: "Memory Evolution",
        snippet: "View how your AI knowledge graph has evolved over time.",
        url: "/dashboard/timeline",
      });
    }

    if (results.length === 0) {
      // Return a generic match just to show something works
      results.push({
        id: "s5",
        module: "intelligence",
        title: `Search results for "${query}"`,
        snippet: "Found references in your Living Intelligence graph.",
        url: "/dashboard/intelligence",
      });
    }

    return results;
  }

  async chat(message: string): Promise<MnemoChatMessage> {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 500),
    );

    let reply = "";
    const m = message.toLowerCase();

    if (m.includes("find shared")) {
      reply =
        "You currently have 3 shared Memory Spaces. 'AI & ML Research' is shared with Elena Rodriguez and 'Project Mnemo' is shared with 3 team members.";
    } else if (m.includes("summarize project")) {
      reply =
        "Project Mnemo is an AI operating system built around a Memory Graph. It consists of 5 modules: Fabric, Intelligence, Exchange, Time Machine, and Permissions. The backend uses Cognee Cloud.";
    } else if (m.includes("create reminder")) {
      reply =
        "I've added a reminder for you to review Elena's access request to 'AI & ML Research'.";
    } else {
      reply =
        "I am Mnemo AI, your global assistant. I can search across all your modules, analyze your Digital Twin, and manage your memory spaces. How can I assist you further?";
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
