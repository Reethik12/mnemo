import {
  Conversation,
  ConversationSummary,
  ConversationFolder,
  ConversationCategory,
  ConversationStatistics,
  ConversationSearch,
  ConversationFilter,
  ConversationSort,
} from "@/types/conversation";
import { ChatMessage } from "@/types/ai";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_FOLDERS: ConversationFolder[] = [
  { id: "f1", name: "Programming", color: "#3B82F6", order: 0 },
  { id: "f2", name: "Research", color: "#10B981", order: 1 },
  { id: "f3", name: "Design", color: "#8B5CF6", order: 2 },
  { id: "f4", name: "Learning", color: "#F59E0B", order: 3 },
  { id: "f5", name: "Business", color: "#EF4444", order: 4 },
  { id: "f6", name: "Health", color: "#EC4899", order: 5 },
];

const MOCK_CATEGORIES: ConversationCategory[] = [
  { id: "c1", name: "Code", icon: "💻" },
  { id: "c2", name: "Writing", icon: "✍️" },
  { id: "c3", name: "Analysis", icon: "📊" },
  { id: "c4", name: "Brainstorming", icon: "🧠" },
];

const generateMockConversations = (): Conversation[] => {
  return Array.from({ length: 30 }, (_, i) => {
    const isArchived = i > 25;
    const isPinned = i < 8;
    const isFavorite = i % 3 === 0;

    return {
      id: `conv-full-${i}`,
      title: `Conversation Topic ${i + 1}`,
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
      createdAt: new Date(Date.now() - (i + 5) * 86400000).toISOString(),
      isPinned: !isArchived && isPinned,
      isFavorite: !isArchived && isFavorite,
      status: isArchived ? "archived" : "active",
      modelId: i % 2 === 0 ? "gpt-4o" : "claude-3-5-sonnet",
      visibility: "private",
      folderId: MOCK_FOLDERS[i % MOCK_FOLDERS.length].id,
      categoryId: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].id,
      messageCount: 2 + (i % 10),
      messages: Array.from({ length: 2 + (i % 10) }, (_, j): ChatMessage => ({
        id: `msg-${i}-${j}`,
        role: j % 2 === 0 ? "user" : "assistant",
        content: `This is mock message content for message ${j + 1} in conversation ${i + 1}.`,
        timestamp: new Date(
          Date.now() - i * 86400000 + j * 3600000,
        ).toISOString(),
        status: "sent",
      })),
    };
  });
};

let MOCK_DATA = generateMockConversations();
const MOCK_FOLDERS_DATA = [...MOCK_FOLDERS];

export class ConversationWorkspaceService {
  static async loadFolders(): Promise<ConversationFolder[]> {
    await delay(300);
    return [...MOCK_FOLDERS_DATA];
  }

  static async loadCategories(): Promise<ConversationCategory[]> {
    await delay(200);
    return [...MOCK_CATEGORIES];
  }

  static async loadConversations(): Promise<ConversationSummary[]> {
    await delay(400);
    return MOCK_DATA.map((c) => ({
      id: c.id,
      title: c.title,
      updatedAt: c.updatedAt,
      folderId: c.folderId,
      categoryId: c.categoryId,
      isPinned: c.isPinned,
      isFavorite: c.isFavorite,
      status: c.status,
      modelId: c.modelId,
      messageCount: c.messageCount,
    }));
  }

  static async loadConversation(id: string): Promise<Conversation | null> {
    await delay(300);
    return MOCK_DATA.find((c) => c.id === id) || null;
  }

  static async createConversation(
    modelId: string,
    folderId?: string,
  ): Promise<Conversation> {
    await delay(400);
    const newConv: Conversation = {
      id: `conv-full-${Date.now()}`,
      title: "New Conversation",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isPinned: false,
      isFavorite: false,
      status: "active",
      modelId,
      visibility: "private",
      folderId,
      messageCount: 0,
      messages: [],
    };
    MOCK_DATA = [newConv, ...MOCK_DATA];
    return newConv;
  }

  static async duplicateConversation(id: string): Promise<Conversation | null> {
    await delay(500);
    const source = MOCK_DATA.find((c) => c.id === id);
    if (!source) return null;

    const duplicate: Conversation = {
      ...source,
      id: `conv-full-${Date.now()}`,
      title: `${source.title} (Copy)`,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isPinned: false,
      isFavorite: false,
      status: "active",
      messages: source.messages.map((m) => ({
        ...m,
        id: `msg-${Date.now()}-${Math.random()}`,
      })),
    };
    MOCK_DATA = [duplicate, ...MOCK_DATA];
    return duplicate;
  }

  static async renameConversation(id: string, title: string): Promise<void> {
    await delay(300);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id ? { ...c, title, updatedAt: new Date().toISOString() } : c,
    );
  }

  static async moveConversation(
    id: string,
    folderId: string | undefined,
  ): Promise<void> {
    await delay(300);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id ? { ...c, folderId, updatedAt: new Date().toISOString() } : c,
    );
  }

  static async deleteConversation(id: string): Promise<void> {
    await delay(400);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id
        ? { ...c, status: "deleted", updatedAt: new Date().toISOString() }
        : c,
    );
  }

  static async deleteConversationsBulk(ids: string[]): Promise<void> {
    await delay(600);
    MOCK_DATA = MOCK_DATA.map((c) =>
      ids.includes(c.id)
        ? { ...c, status: "deleted", updatedAt: new Date().toISOString() }
        : c,
    );
  }

  static async archiveConversation(id: string): Promise<void> {
    await delay(300);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id
        ? {
            ...c,
            status: "archived",
            isPinned: false,
            isFavorite: false,
            updatedAt: new Date().toISOString(),
          }
        : c,
    );
  }

  static async archiveConversationsBulk(ids: string[]): Promise<void> {
    await delay(500);
    MOCK_DATA = MOCK_DATA.map((c) =>
      ids.includes(c.id)
        ? {
            ...c,
            status: "archived",
            isPinned: false,
            isFavorite: false,
            updatedAt: new Date().toISOString(),
          }
        : c,
    );
  }

  static async restoreConversation(id: string): Promise<void> {
    await delay(300);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id
        ? { ...c, status: "active", updatedAt: new Date().toISOString() }
        : c,
    );
  }

  static async favoriteConversation(
    id: string,
    isFavorite: boolean,
  ): Promise<void> {
    await delay(200);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id
        ? { ...c, isFavorite, updatedAt: new Date().toISOString() }
        : c,
    );
  }

  static async pinConversation(id: string, isPinned: boolean): Promise<void> {
    await delay(200);
    MOCK_DATA = MOCK_DATA.map((c) =>
      c.id === id ? { ...c, isPinned, updatedAt: new Date().toISOString() } : c,
    );
  }

  static async searchConversations(query: string): Promise<ConversationSearch> {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    const results = MOCK_DATA.filter(
      (c) =>
        c.status !== "deleted" &&
        (c.title.toLowerCase().includes(lowerQuery) ||
          c.messages.some((m) => m.content.toLowerCase().includes(lowerQuery))),
    ).map((c) => ({
      id: c.id,
      title: c.title,
      updatedAt: c.updatedAt,
      folderId: c.folderId,
      categoryId: c.categoryId,
      isPinned: c.isPinned,
      isFavorite: c.isFavorite,
      status: c.status,
      modelId: c.modelId,
      messageCount: c.messageCount,
    }));

    return {
      query,
      results,
      isSearching: false,
    };
  }

  static async filterConversations(
    summaries: ConversationSummary[],
    filter: ConversationFilter,
  ): Promise<ConversationSummary[]> {
    await delay(100);
    return summaries.filter((c) => {
      if (filter.status && c.status !== filter.status) return false;
      if (filter.isPinned !== undefined && c.isPinned !== filter.isPinned)
        return false;
      if (filter.isFavorite !== undefined && c.isFavorite !== filter.isFavorite)
        return false;
      if (filter.folderId && c.folderId !== filter.folderId) return false;
      if (filter.categoryId && c.categoryId !== filter.categoryId) return false;

      if (filter.dateRange) {
        const updated = new Date(c.updatedAt).getTime();
        const now = Date.now();
        const oneDay = 86400000;
        if (filter.dateRange === "today" && now - updated > oneDay)
          return false;
        if (filter.dateRange === "this-week" && now - updated > oneDay * 7)
          return false;
        if (filter.dateRange === "this-month" && now - updated > oneDay * 30)
          return false;
      }
      return true;
    });
  }

  static async sortConversations(
    summaries: ConversationSummary[],
    sort: ConversationSort,
  ): Promise<ConversationSummary[]> {
    await delay(100);
    return [...summaries].sort((a, b) => {
      switch (sort) {
        case "updatedDesc":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "updatedAsc":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "titleAsc":
          return a.title.localeCompare(b.title);
        case "titleDesc":
          return b.title.localeCompare(a.title);
        // Fallbacks for created dates (using updated as fallback in summary)
        case "createdDesc":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "createdAsc":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });
  }

  static async loadStatistics(): Promise<ConversationStatistics> {
    await delay(300);
    const active = MOCK_DATA.filter((c) => c.status !== "deleted");
    return {
      totalConversations: active.length,
      archivedConversations: active.filter((c) => c.status === "archived")
        .length,
      pinnedConversations: active.filter((c) => c.isPinned).length,
      favoriteConversations: active.filter((c) => c.isFavorite).length,
      recentConversations: active.filter(
        (c) => Date.now() - new Date(c.updatedAt).getTime() < 86400000 * 7,
      ).length,
      averageLength: Math.round(
        active.reduce(
          (acc, c) =>
            acc +
            (c.messages?.reduce((mAcc, m) => mAcc + m.content.length, 0) || 0),
          0,
        ) / (active.length || 1),
      ),
      averageMessages: Math.round(
        active.reduce((acc, c) => acc + (c.messageCount || 0), 0) /
          (active.length || 1),
      ),
    };
  }
}
