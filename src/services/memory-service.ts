import { apiClient } from "@/lib/api-client";
import { Memory } from "@/types/memory";

const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

function toFrontendMemory(backendMemory: unknown): Memory {
  const m = backendMemory as {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    metadata: {
      isFavorite?: boolean;
      isPinned?: boolean;
      isArchived?: boolean;
      category?: string;
    } | null;
  };
  return {
    id: m.id,
    title: m.title,
    content: m.content,
    createdAt: m.createdAt,
    updatedAt: m.updatedAt,
    category: (m.metadata?.category as Memory["category"]) || "Uncategorized",
    tags: m.tags || [],
    pinned: !!m.metadata?.isPinned,
    favorite: !!m.metadata?.isFavorite,
    archived: !!m.metadata?.isArchived,
  };
}

export const memoryService = {
  async getMemories(page = 1, limit = 50): Promise<Memory[]> {
    const data = await apiClient.get<unknown[]>(
      `/api/memories?workspaceId=${WORKSPACE_ID}&page=${page}&limit=${limit}`,
    );
    return data.map(toFrontendMemory);
  },

  async getMemory(id: string): Promise<Memory> {
    const data = await apiClient.get<unknown>(`/api/memories/${id}`);
    return toFrontendMemory(data);
  },

  async createMemory(
    data: Omit<Memory, "id" | "createdAt" | "updatedAt">,
  ): Promise<Memory> {
    const payload = {
      title: data.title,
      content: data.content,
      tags: data.tags,
      metadata: {
        category: data.category,
        isPinned: data.pinned,
        isFavorite: data.favorite,
        isArchived: data.archived,
      },
      workspaceId: WORKSPACE_ID,
    };
    const res = await apiClient.post<unknown>("/api/memories", payload);
    return toFrontendMemory(res);
  },

  async updateMemory(id: string, updates: Partial<Memory>): Promise<Memory> {
    const payload = {
      title: updates.title,
      content: updates.content,
      tags: updates.tags,
      metadata: {
        category: updates.category,
        isPinned: updates.pinned,
        isFavorite: updates.favorite,
        isArchived: updates.archived,
      },
    };
    const res = await apiClient.patch<unknown>(`/api/memories/${id}`, payload);
    return toFrontendMemory(res);
  },

  async deleteMemory(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/memories/${id}`);
  },

  async duplicateMemory(id: string): Promise<Memory> {
    const original = await this.getMemory(id);
    return this.createMemory({
      ...original,
      title: `${original.title} (Copy)`,
    });
  },

  async favoriteMemory(id: string, currentState: boolean): Promise<Memory> {
    return this.updateMemory(id, { favorite: !currentState });
  },

  async pinMemory(id: string, currentState: boolean): Promise<Memory> {
    return this.updateMemory(id, { pinned: !currentState });
  },

  async archiveMemory(id: string): Promise<Memory> {
    return this.updateMemory(id, { archived: true });
  },

  async restoreMemory(id: string): Promise<Memory> {
    return this.updateMemory(id, { archived: false });
  },

  async searchMemories(query: string): Promise<Memory[]> {
    const all = await this.getMemories();
    const lower = query.toLowerCase();
    return all.filter(
      (m) =>
        m.title.toLowerCase().includes(lower) ||
        m.content.toLowerCase().includes(lower),
    );
  },
};
