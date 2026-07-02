"use client";

import { Dropdown } from "@/components/ui/dropdown";
import { MemorySort } from "@/types";
import { MEMORY_SORT_OPTIONS } from "@/lib/constants";

interface MemorySortDropdownProps {
  currentSort: MemorySort;
  onSortChange: (sort: MemorySort) => void;
}

export function MemorySortDropdown({
  currentSort,
  onSortChange,
}: MemorySortDropdownProps) {
  return (
    <Dropdown
      trigger={
        <button
          className="text-text-secondary flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:bg-white/5"
          title="Sort Memories"
        >
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
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        </button>
      }
      items={MEMORY_SORT_OPTIONS.map((opt) => ({
        id: opt,
        label: opt,
        onClick: () => onSortChange(opt),
        // Add a checkmark for the active sort
        icon:
          currentSort === opt ? (
            <svg
              className="text-accent-purple h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <span className="h-4 w-4" /> // Placeholder for alignment
          ),
      }))}
      align="right"
    />
  );
}
