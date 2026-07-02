"use client";

import { useMemoryContext } from "@/providers/memory-provider";

export function useMemory() {
  return useMemoryContext();
}
