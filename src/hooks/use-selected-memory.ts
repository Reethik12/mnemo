"use client";

import { useMemoryContext } from "@/providers/memory-provider";

export function useSelectedMemory() {
  const { selectedMemory, setSelectedMemory } = useMemoryContext();
  return { selectedMemory, setSelectedMemory };
}
