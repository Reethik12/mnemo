import { Memory } from "@/types";
import { MOCK_MEMORIES } from "@/lib/constants";

class MemoryService {
  private memories: Memory[] = [...MOCK_MEMORIES];

  // Helper to simulate network delay
  private async delay(ms: number = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getMemories(): Promise<Memory[]> {
    await this.delay();
    // Return all memories including archived, the filtering will happen in the hooks
    return [...this.memories];
  }

  async createMemory(
    memory: Omit<Memory, "id" | "createdAt" | "updatedAt">,
  ): Promise<Memory> {
    await this.delay();
    const newMemory: Memory = {
      ...memory,
      id: `mem-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.memories = [newMemory, ...this.memories];
    return newMemory;
  }

  async updateMemory(id: string, updates: Partial<Memory>): Promise<Memory> {
    await this.delay();
    const index = this.memories.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Memory not found");

    const updatedMemory = {
      ...this.memories[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.memories[index] = updatedMemory;
    return updatedMemory;
  }

  async deleteMemory(id: string): Promise<void> {
    await this.delay();
    this.memories = this.memories.filter((m) => m.id !== id);
  }

  async duplicateMemory(id: string): Promise<Memory> {
    await this.delay();
    const existing = this.memories.find((m) => m.id === id);
    if (!existing) throw new Error("Memory not found");

    const duplicate: Memory = {
      ...existing,
      id: `mem-${Date.now()}`,
      title: `${existing.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.memories = [duplicate, ...this.memories];
    return duplicate;
  }

  async favoriteMemory(id: string, favorite: boolean): Promise<Memory> {
    return this.updateMemory(id, { favorite });
  }

  async pinMemory(id: string, pinned: boolean): Promise<Memory> {
    return this.updateMemory(id, { pinned });
  }

  async archiveMemory(id: string): Promise<Memory> {
    return this.updateMemory(id, { archived: true, pinned: false });
  }

  async restoreMemory(id: string): Promise<Memory> {
    return this.updateMemory(id, { archived: false });
  }
}

export const memoryService = new MemoryService();
