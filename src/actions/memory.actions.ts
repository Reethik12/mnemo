"use server";

import {
  rememberMemory,
  searchMemory,
  recallAllMemories,
  importMemory,
  type MemoryInput,
  type MemorySearchResult,
} from "@/services/memory.service";

export async function createMemoryAction(
  input: MemoryInput,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!input.title || !input.content) {
      throw new Error("Title and content are required.");
    }
    await rememberMemory(input);
    return { success: true };
  } catch (error) {
    console.error("Failed to create memory:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred while saving the memory.",
    };
  }
}

export async function searchMemoriesAction(
  query: string,
): Promise<{ success: boolean; data?: MemorySearchResult[]; error?: string }> {
  try {
    const results = query
      ? await searchMemory(query)
      : await recallAllMemories();
    return { success: true, data: results };
  } catch (error) {
    console.error("Failed to search memories:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred while retrieving memories.",
    };
  }
}

export async function importMockAction(
  sourceType: string,
  content: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await importMemory(sourceType, content);
    return { success: true };
  } catch (error) {
    console.error(`Failed to import mock memory from ${sourceType}:`, error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : `An unknown error occurred while importing ${sourceType}.`,
    };
  }
}
