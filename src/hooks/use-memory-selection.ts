"use client";

import { useState, useCallback } from "react";
import { Memory } from "@/types";

export function useMemorySelection(memories: Memory[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((id: string, isMulti: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(isMulti ? prev : []);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(memories.map((m) => m.id)));
  }, [memories]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const getSelectedMemories = useCallback(() => {
    return memories.filter((m) => selectedIds.has(m.id));
  }, [memories, selectedIds]);

  return {
    selectedIds,
    toggleSelection,
    selectAll,
    clearSelection,
    getSelectedMemories,
    isSelectionActive: selectedIds.size > 0,
    selectedCount: selectedIds.size,
  };
}
