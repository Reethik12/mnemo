"use client";

import { useMemo, useState } from "react";
import { Memory, MemoryFilter } from "@/types";

export function useMemoryFilter(
  memories: Memory[],
  initialFilter: MemoryFilter = "All",
) {
  const [filter, setFilter] = useState<MemoryFilter>(initialFilter);

  const filteredMemories = useMemo(() => {
    switch (filter) {
      case "Favorites":
        return memories.filter((m) => m.favorite);
      case "Pinned":
        return memories.filter((m) => m.pinned);
      case "Archived":
        return memories.filter((m) => m.archived);
      case "Recent":
        // Sort by updatedAt descending and take top 20
        return [...memories]
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .slice(0, 20);
      case "All":
      default:
        return memories.filter((m) => !m.archived);
    }
  }, [memories, filter]);

  return { filter, setFilter, filteredMemories };
}
