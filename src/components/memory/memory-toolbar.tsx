"use client";

import { Button } from "@/components/ui/button";

import { MemoryFilter, MemorySort } from "@/types";
import { MemoryFilterDropdown } from "./memory-filter";
import { MemorySortDropdown } from "./memory-sort";
import { ViewSwitcher, ViewMode } from "./view-switcher";

interface MemoryToolbarProps {
  onCreateClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentFilter: MemoryFilter;
  onFilterChange: (f: MemoryFilter) => void;
  currentSort: MemorySort;
  onSortChange: (s: MemorySort) => void;
  viewMode: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

export function MemoryToolbar({
  onCreateClick,
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
  viewMode,
  onViewChange,
}: MemoryToolbarProps) {
  return (
    <div className="border-border bg-bg-primary/80 flex flex-col gap-2 border-b p-3 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <MemoryFilterDropdown
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
          />
          <MemorySortDropdown
            currentSort={currentSort}
            onSortChange={onSortChange}
          />
        </div>
        <div className="flex items-center gap-1">
          <ViewSwitcher currentView={viewMode} onViewChange={onViewChange} />
          <Button
            onClick={onCreateClick}
            variant="primary"
            size="sm"
            className="h-8 w-8 p-0"
            title="New Memory"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="relative">
        <svg
          className="text-text-tertiary absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search memories..."
          className="border-border bg-surface/50 text-text-primary placeholder:text-text-tertiary focus:border-accent-purple focus:ring-accent-purple/50 w-full rounded-md border py-1.5 pr-3 pl-9 text-sm focus:ring-1 focus:outline-none"
        />
      </div>
    </div>
  );
}
