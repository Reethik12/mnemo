"use client";

import { Memory } from "@/types";
import { MemoryItem } from "./memory-item";
import { MemoryToolbar } from "./memory-toolbar";
import { BulkActionsBar } from "./bulk-actions-bar";
import { SidebarGroup } from "./sidebar-groups";
import { ViewMode } from "./view-switcher";
import { AnimatePresence } from "framer-motion";
import { MemoryFilter, MemorySort } from "@/types";

interface MemoryListProps {
  memories: Memory[];
  recentIds?: string[];
  selectedMemory: Memory | null;
  selectedIds: Set<string>;
  viewMode: ViewMode;
  onSelect: (memory: Memory) => void;
  onSelectToggle: (id: string, e: React.MouseEvent) => void;
  onCreateClick: () => void;
  onDeleteRequest: (id: string) => void;
  // Toolbar Props
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentFilter: MemoryFilter;
  onFilterChange: (f: MemoryFilter) => void;
  currentSort: MemorySort;
  onSortChange: (s: MemorySort) => void;
  onViewChange: (v: ViewMode) => void;
  // Bulk Actions
  onClearSelection: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
}

export function MemoryList({
  memories,
  recentIds,
  selectedMemory,
  selectedIds,
  viewMode,
  onSelect,
  onSelectToggle,
  onCreateClick,
  onDeleteRequest,
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
  onViewChange,
  onClearSelection,
  onBulkArchive,
  onBulkDelete,
}: MemoryListProps) {
  const isSelectionActive = selectedIds.size > 0;

  // Grouping logic
  const pinnedMemories = memories.filter((m) => m.pinned);
  const favoriteMemories = memories.filter((m) => m.favorite && !m.pinned);
  const recentMemories = memories.filter(
    (m) => recentIds?.includes(m.id) && !m.pinned && !m.favorite,
  );
  const otherMemories = memories.filter(
    (m) => !m.pinned && !m.favorite && !recentIds?.includes(m.id),
  );

  // If we are filtering, we might not want to show groups, but for simplicity, we always group
  // Actually, if a filter other than "All" is active, it might be weird. Let's just render the groups.
  const hasGroups =
    pinnedMemories.length > 0 ||
    favoriteMemories.length > 0 ||
    (recentMemories.length > 0 && recentIds && recentIds.length > 0);

  return (
    <div className="bg-surface/30 relative flex h-full w-full flex-col backdrop-blur-md">
      <MemoryToolbar
        onCreateClick={onCreateClick}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
        currentSort={currentSort}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewChange={onViewChange}
      />
      <div className="flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent overflow-x-hidden overflow-y-auto py-2">
        {hasGroups ? (
          <>
            <SidebarGroup
              title="Pinned"
              memories={pinnedMemories}
              selectedMemory={selectedMemory}
              selectedIds={selectedIds}
              viewMode={viewMode}
              selectionModeActive={isSelectionActive}
              onSelect={onSelect}
              onSelectToggle={onSelectToggle}
              onDeleteRequest={onDeleteRequest}
              initiallyExpanded={true}
            />
            <SidebarGroup
              title="Favorites"
              memories={favoriteMemories}
              selectedMemory={selectedMemory}
              selectedIds={selectedIds}
              viewMode={viewMode}
              selectionModeActive={isSelectionActive}
              onSelect={onSelect}
              onSelectToggle={onSelectToggle}
              onDeleteRequest={onDeleteRequest}
              initiallyExpanded={true}
            />
            <SidebarGroup
              title="Recent"
              memories={recentMemories}
              selectedMemory={selectedMemory}
              selectedIds={selectedIds}
              viewMode={viewMode}
              selectionModeActive={isSelectionActive}
              onSelect={onSelect}
              onSelectToggle={onSelectToggle}
              onDeleteRequest={onDeleteRequest}
              initiallyExpanded={true}
            />
            <SidebarGroup
              title="Memories"
              memories={otherMemories}
              selectedMemory={selectedMemory}
              selectedIds={selectedIds}
              viewMode={viewMode}
              selectionModeActive={isSelectionActive}
              onSelect={onSelect}
              onSelectToggle={onSelectToggle}
              onDeleteRequest={onDeleteRequest}
              initiallyExpanded={true}
            />
          </>
        ) : (
          <AnimatePresence initial={false}>
            {memories.map((memory) => (
              <MemoryItem
                key={memory.id}
                memory={memory}
                isSelected={selectedMemory?.id === memory.id}
                isMultiSelected={selectedIds.has(memory.id)}
                viewMode={viewMode}
                selectionModeActive={isSelectionActive}
                onClick={onSelect}
                onSelectToggle={onSelectToggle}
                onDeleteRequest={onDeleteRequest}
              />
            ))}
          </AnimatePresence>
        )}

        {memories.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center opacity-50">
            <p className="text-text-secondary text-sm">No memories found.</p>
          </div>
        )}
      </div>

      <BulkActionsBar
        selectedCount={selectedIds.size}
        onClear={onClearSelection}
        onArchive={onBulkArchive}
        onDelete={onBulkDelete}
      />
    </div>
  );
}
