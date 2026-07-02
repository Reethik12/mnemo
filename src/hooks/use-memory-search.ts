"use client";

import { useMemo, useState } from "react";
import { Memory } from "@/types";

export function useMemorySearch(memories: Memory[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const searchedMemories = useMemo(() => {
    if (!searchQuery.trim()) return memories;

    const query = searchQuery.toLowerCase().trim();

    return memories.filter((memory) => {
      const matchTitle = memory.title?.toLowerCase().includes(query);
      const matchContent = memory.content?.toLowerCase().includes(query);
      const matchTags = memory.tags?.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      return matchTitle || matchContent || matchTags;
    });
  }, [memories, searchQuery]);

  return { searchQuery, setSearchQuery, searchedMemories };
}
