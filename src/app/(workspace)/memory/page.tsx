"use client";

import {
  useMemory,
  useMemoryFilter,
  useMemorySearch,
  useMemorySort,
  useMemorySelection,
  useEditorTabs,
  useRecentMemories,
  useFocusMode,
  useToast,
} from "@/hooks";
import { DEFAULT_MEMORY } from "@/lib/constants";
import { Memory } from "@/types";
import {
  MemoryList,
  MemoryEditor,
  MemoryInspector,
  MemoryEmptyState,
  MemoryDeleteDialog,
  ViewMode,
  EditorTabs,
  EditorHeader,
} from "@/components";
import { useState, useEffect } from "react";

export default function MemoryPage() {
  const {
    memories,
    selectedMemory,
    setSelectedMemory,
    createMemory,
    deleteMemory,
    archiveMemory,
  } = useMemory();

  // Phase 3.2 Hooks
  const { filter, setFilter, filteredMemories } = useMemoryFilter(
    memories,
    "All",
  );
  const { searchQuery, setSearchQuery, searchedMemories } =
    useMemorySearch(filteredMemories);
  const { sortConfig, setSortConfig, sortedMemories } = useMemorySort(
    searchedMemories,
    "Updated Recently",
  );
  const { selectedIds, toggleSelection, clearSelection } =
    useMemorySelection(sortedMemories);

  // Phase 3.3 Hooks
  const {
    openTabIds,
    activeTabId,
    setActiveTabId,
    openTab,
    closeTab,
    reorderTabs,
  } = useEditorTabs(10);
  const { recentIds, addRecent } = useRecentMemories(5);
  const { isFocusMode } = useFocusMode();

  const [viewMode, setViewMode] = useState<ViewMode>("Comfortable");
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);
  const [isSplitViewActive, setIsSplitViewActive] = useState(false);
  const { success } = useToast();

  // Sync selectedMemory when activeTabId changes
  useEffect(() => {
    if (activeTabId) {
      const activeMem = memories.find((m) => m.id === activeTabId);
      if (activeMem && activeMem.id !== selectedMemory?.id) {
        setSelectedMemory(activeMem);
      }
    } else {
      setSelectedMemory(null);
    }
  }, [activeTabId, memories, selectedMemory, setSelectedMemory]);

  const handleSelectMemory = (memory: Memory) => {
    setSelectedMemory(memory);
    openTab(memory.id);
    addRecent(memory.id);
  };

  const handleCreateMemory = async () => {
    const newMemory = await createMemory(DEFAULT_MEMORY);
    setSelectedMemory(newMemory);
    openTab(newMemory.id);
    addRecent(newMemory.id);
  };

  const handleBulkArchive = async () => {
    for (const id of selectedIds) {
      await archiveMemory(id);
    }
    success(`${selectedIds.size} memories archived`);
    clearSelection();
  };

  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      await deleteMemory(id);
    }
    success(`${selectedIds.size} memories deleted`);
    clearSelection();
  };

  return (
    <div className="flex h-full w-full">
      {/* List Panel */}
      {!isFocusMode && (
        <div className="border-border flex w-full shrink-0 flex-col border-r md:w-[320px]">
          <MemoryList
            memories={sortedMemories}
            recentIds={recentIds}
            selectedMemory={selectedMemory}
            selectedIds={selectedIds}
            viewMode={viewMode}
            onSelect={handleSelectMemory}
            onSelectToggle={(id, e) =>
              toggleSelection(id, e.shiftKey || e.metaKey || e.ctrlKey)
            }
            onCreateClick={handleCreateMemory}
            onDeleteRequest={setDeleteDialogId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentFilter={filter}
            onFilterChange={setFilter}
            currentSort={sortConfig}
            onSortChange={setSortConfig}
            onViewChange={setViewMode}
            onClearSelection={clearSelection}
            onBulkArchive={handleBulkArchive}
            onBulkDelete={handleBulkDelete}
          />
        </div>
      )}

      {/* Editor & Inspector Panel */}
      <div className="bg-bg-primary flex flex-1 flex-col overflow-hidden">
        {selectedMemory ? (
          <>
            <EditorHeader
              memory={selectedMemory}
              onToggleSplitView={() => setIsSplitViewActive(!isSplitViewActive)}
              isSplitViewActive={isSplitViewActive}
            />
            {openTabIds.length > 0 && (
              <EditorTabs
                openTabIds={openTabIds}
                activeTabId={activeTabId}
                memories={memories}
                onTabSwitch={setActiveTabId}
                onTabClose={closeTab}
                onReorder={(newOrder) => {
                  // framer-motion Reorder provides the full new array
                  // We'll update the hook to just accept the new array instead
                  reorderTabs(newOrder);
                }}
              />
            )}
            <div className="flex flex-1 overflow-hidden">
              {/* Editor Wrapper */}
              <div className="relative flex-1">
                {/* 
                  Use activeTabId as key so the editor completely remounts and gets 
                  a fresh state when switching tabs.
                */}
                <MemoryEditor
                  key={activeTabId || "empty"}
                  memory={selectedMemory}
                />
              </div>

              {/* Inspector Panel (Hidden on tablet, shown on desktop, hide in focus mode) */}
              {!isFocusMode && (
                <div className="bg-surface/30 border-border hidden w-[340px] shrink-0 border-l lg:block">
                  <MemoryInspector memory={selectedMemory} />
                </div>
              )}
            </div>
          </>
        ) : (
          <MemoryEmptyState onCreateClick={handleCreateMemory} />
        )}
      </div>

      <MemoryDeleteDialog
        isOpen={deleteDialogId !== null}
        onClose={() => setDeleteDialogId(null)}
        onConfirm={() => {
          if (deleteDialogId) {
            deleteMemory(deleteDialogId);
            setDeleteDialogId(null);
          }
        }}
      />
    </div>
  );
}
