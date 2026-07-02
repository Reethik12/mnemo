"use client";

import { useMemo, useState } from "react";
import { Memory, MemorySort } from "@/types";

export function useMemorySort(
  memories: Memory[],
  initialSort: MemorySort = "Updated Recently",
) {
  const [sortConfig, setSortConfig] = useState<MemorySort>(initialSort);

  const sortedMemories = useMemo(() => {
    const sorted = [...memories];

    switch (sortConfig) {
      case "Newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "Oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "Alphabetical":
        sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "Updated Recently":
        sorted.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
      case "Pinned First":
        sorted.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          }
          return a.pinned ? -1 : 1;
        });
        break;
      case "Favorites First":
        sorted.sort((a, b) => {
          if (a.favorite === b.favorite) {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          }
          return a.favorite ? -1 : 1;
        });
        break;
      default:
        sorted.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
    }

    return sorted;
  }, [memories, sortConfig]);

  return { sortConfig, setSortConfig, sortedMemories };
}
