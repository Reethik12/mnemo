"use client";

import { Dropdown } from "@/components/ui/dropdown";
import { Memory } from "@/types";
import { useMemoryContext } from "@/providers/memory-provider";

interface MemoryActionsProps {
  memory: Memory;
  onDeleteRequest: (id: string) => void;
}

export function MemoryActions({ memory, onDeleteRequest }: MemoryActionsProps) {
  const {
    duplicateMemory,
    toggleFavorite,
    togglePin,
    archiveMemory,
    restoreMemory,
  } = useMemoryContext();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        trigger={
          <button className="text-text-tertiary hover:text-text-primary flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        }
        items={[
          {
            id: "pin",
            label: memory.pinned ? "Unpin" : "Pin to Top",
            onClick: () => togglePin(memory.id, memory.pinned),
          },
          {
            id: "favorite",
            label: memory.favorite ? "Remove Favorite" : "Add to Favorites",
            onClick: () => toggleFavorite(memory.id, memory.favorite),
          },
          {
            id: "duplicate",
            label: "Duplicate",
            onClick: () => duplicateMemory(memory.id),
          },
          {
            id: "archive",
            label: memory.archived ? "Restore" : "Archive",
            onClick: () =>
              memory.archived
                ? restoreMemory(memory.id)
                : archiveMemory(memory.id),
          },
          {
            id: "delete",
            label: "Delete",
            onClick: () => onDeleteRequest(memory.id),
            // Need a custom class for destructive actions in future, using simple style for now
          },
        ]}
        align="right"
      />
    </div>
  );
}
