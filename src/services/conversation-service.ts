import { apiClient } from "@/lib/api-client";
import {
  Conversation,
  ConversationSummary,
  ConversationFolder,
  ConversationFilter,
  ConversationStatistics,
} from "@/types/conversation";

const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

function toSummary(c: unknown): ConversationSummary {
  const backendConv = c as {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    modelId?: string;
    messages: unknown[];
  };
  return {
    id: backendConv.id,
    title: backendConv.title,
    preview: "...",
    updatedAt: backendConv.updatedAt,
    isPinned: false,
    folderId: "",
    modelId: backendConv.modelId || undefined,
  } as unknown as ConversationSummary;
}

export class ConversationWorkspaceService {
  static async loadConversations(
    _filter?: ConversationFilter,
  ): Promise<ConversationSummary[]> {
    const data = await apiClient.get<unknown[]>(
      `/api/conversations?workspaceId=${WORKSPACE_ID}&limit=100`,
    );
    return data.map(toSummary);
  }

  static async loadConversation(id: string): Promise<Conversation> {
    const data = await apiClient.get<unknown>(`/api/conversations/${id}`);
    const c = data as {
      id: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      modelId?: string;
      messages: unknown[];
    };
    return {
      id: c.id,
      title: c.title,
      messages: Array.isArray(c.messages) ? (c.messages as unknown[]) : [],
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      modelId: c.modelId as string,
      isPinned: false,
      folderId: "",
    } as unknown as Conversation;
  }

  static async createConversation(
    modelId?: string,
    folderId?: string,
  ): Promise<Conversation> {
    const res = await apiClient.post<unknown>("/api/conversations", {
      workspaceId: WORKSPACE_ID,
      title: "New Conversation",
      modelId: modelId || null,
      messages: [],
    });
    const c = res as {
      id: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      modelId?: string;
      messages: unknown[];
    };
    return {
      id: c.id,
      title: c.title,
      messages: [],
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      modelId: c.modelId as string,
      isPinned: false,
      folderId: folderId || "",
    } as unknown as Conversation;
  }

  static async duplicateConversation(id: string): Promise<Conversation> {
    return this.loadConversation(id);
  }

  static async renameConversation(
    id: string,
    title: string,
  ): Promise<Conversation> {
    const res = await apiClient.patch<unknown>(`/api/conversations/${id}`, {
      title,
    });
    const c = res as {
      id: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      modelId?: string;
      messages: unknown[];
    };
    return {
      id: c.id,
      title: c.title,
      messages: [],
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      modelId: c.modelId as string,
      isPinned: false,
      folderId: "",
    } as unknown as Conversation;
  }

  static async deleteConversation(id: string): Promise<void> {
    await apiClient.delete<void>(`/api/conversations/${id}`);
  }

  static async deleteConversationsBulk(ids: string[]): Promise<void> {
    await Promise.all(ids.map((id) => this.deleteConversation(id)));
  }

  static async archiveConversation(_id: string): Promise<Conversation> {
    throw new Error("Not implemented");
  }

  static async archiveConversationsBulk(_ids: string[]): Promise<void> {}

  static async restoreConversation(_id: string): Promise<Conversation> {
    throw new Error("Not implemented");
  }

  static async favoriteConversation(
    id: string,
    isFavorite?: boolean,
  ): Promise<Conversation> {
    return this.loadConversation(id);
  }

  static async togglePin(
    id: string,
    _isPinned: boolean,
  ): Promise<Conversation> {
    return this.loadConversation(id);
  }

  static async pinConversation(
    id: string,
    _pin: boolean,
  ): Promise<Conversation> {
    return this.loadConversation(id);
  }

  static async moveConversation(
    id: string,
    _folderId: string | null | undefined,
  ): Promise<Conversation> {
    return this.loadConversation(id);
  }

  static async searchConversations(
    query: string,
  ): Promise<{
    query: string;
    results: ConversationSummary[];
    isSearching: boolean;
  }> {
    const all = await this.loadConversations();
    return {
      query,
      results: all.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase()),
      ),
      isSearching: false,
    };
  }

  static async loadFolders(): Promise<ConversationFolder[]> {
    return [];
  }

  static async createFolder(
    name: string,
    color?: string,
  ): Promise<ConversationFolder> {
    return {
      id: `folder-${Date.now()}`,
      name,
      color: color || "#FFFFFF",
      order: 0,
    };
  }

  static async generateSummary(_messages: unknown[]): Promise<string> {
    return "New Summary";
  }

  static async loadStatistics(): Promise<ConversationStatistics> {
    return {} as unknown as ConversationStatistics;
  }
}
