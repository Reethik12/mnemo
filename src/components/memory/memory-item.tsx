"use client";

import { Memory } from "@/types";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { memorySelect } from "@/lib/animations";
import { GlassContainer } from "@/components/shared/glass-container";
import { MemoryActions } from "./memory-actions";
import { ViewMode } from "./view-switcher";
import { ContextMenu } from "@/components";
import { useState } from "react";
import { useMemoryContext } from "@/providers/memory-provider";

interface MemoryItemProps {
  memory: Memory;
  isSelected: boolean;
  isMultiSelected: boolean;
  viewMode: ViewMode;
  selectionModeActive: boolean;
  onClick: (memory: Memory) => void;
  onSelectToggle: (id: string, e: React.MouseEvent) => void;
  onDeleteRequest: (id: string) => void;
}

export function MemoryItem({
  memory,
  isSelected,
  isMultiSelected,
  viewMode,
  selectionModeActive,
  onClick,
  onSelectToggle,
  onDeleteRequest,
}: MemoryItemProps) {
  const { toggleFavorite, togglePin, archiveMemory, duplicateMemory } =
    useMemoryContext();
  const [contextMenuPos, setContextMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(memory.updatedAt));

  return (
    <>
      <ContextMenu
        position={contextMenuPos}
        onClose={() => setContextMenuPos(null)}
        items={[
          {
            id: "open",
            label: "Open Memory",
            action: () => onClick(memory),
          },
          {
            id: "duplicate",
            label: "Duplicate",
            shortcut: "⌘D",
            action: () => duplicateMemory(memory.id),
          },
          { divider: true, id: "div1", label: "", action: () => {} },
          {
            id: "favorite",
            label: memory.favorite
              ? "Remove from Favorites"
              : "Add to Favorites",
            action: () => toggleFavorite(memory.id, memory.favorite || false),
          },
          {
            id: "pin",
            label: memory.pinned ? "Unpin Memory" : "Pin Memory",
            action: () => togglePin(memory.id, memory.pinned || false),
          },
          { divider: true, id: "div2", label: "", action: () => {} },
          {
            id: "archive",
            label: "Archive",
            action: () => archiveMemory(memory.id),
          },
          {
            id: "delete",
            label: "Delete",
            danger: true,
            shortcut: "⌘⌫",
            action: () => onDeleteRequest(memory.id),
          },
        ]}
      />

      <motion.div
        variants={memorySelect}
        initial="idle"
        animate={isSelected ? "selected" : "idle"}
        className="group relative cursor-pointer px-3 py-1.5 focus:outline-none"
        onClick={() => onClick(memory)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(memory);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenuPos({ x: e.clientX, y: e.clientY });
        }}
      >
        <GlassContainer
          className={cn(
            "relative overflow-hidden transition-all duration-200",
            viewMode === "Compact" ? "p-2" : "p-3",
            isSelected
              ? "border-accent-purple/50 bg-accent-purple/5 shadow-[0_0_15px_rgba(109,91,255,0.1)]"
              : isMultiSelected
                ? "border-white/20 bg-white/10"
                : "border-transparent bg-transparent hover:bg-white/5",
          )}
        >
          <div className="flex items-start gap-2">
            {/* Multi-select Checkbox */}
            {(selectionModeActive ||
              isMultiSelected ||
              viewMode === "Comfortable") && (
              <div
                className="mt-0.5 flex shrink-0 items-center justify-center"
                onClick={(e) => onSelectToggle(memory.id, e)}
              >
                <div
                  className={cn(
                    "flex h-4 w-4 cursor-pointer items-center justify-center rounded border transition-colors",
                    isMultiSelected
                      ? "border-accent-purple bg-accent-purple text-white"
                      : "border-text-tertiary hover:border-text-secondary",
                  )}
                >
                  {isMultiSelected && (
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <h4
                  className={cn(
                    "line-clamp-1 flex-1 font-medium",
                    viewMode === "Compact" ? "text-xs" : "text-sm",
                    isSelected
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary",
                  )}
                >
                  {memory.title || "Untitled Memory"}
                </h4>

                <div className="flex shrink-0 items-center gap-1">
                  <span className="text-text-tertiary text-[10px]">
                    {formattedDate}
                  </span>
                  <MemoryActions
                    memory={memory}
                    onDeleteRequest={onDeleteRequest}
                  />
                </div>
              </div>

              {viewMode !== "Compact" && (
                <p
                  className={cn(
                    "text-text-tertiary mt-1",
                    viewMode === "Comfortable"
                      ? "line-clamp-3 text-sm"
                      : "line-clamp-2 text-xs",
                  )}
                >
                  {memory.content || "No content..."}
                </p>
              )}

              {(memory.tags.length > 0 || memory.pinned || memory.favorite) &&
                viewMode !== "Compact" && (
                  <div className="mt-2 flex items-center gap-2 overflow-hidden">
                    {memory.pinned && (
                      <svg
                        className="text-accent-purple h-3 w-3 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    )}
                    {memory.favorite && (
                      <svg
                        className="h-3 w-3 shrink-0 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {memory.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-text-secondary truncate rounded-md bg-white/5 px-1.5 py-0.5 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </GlassContainer>
      </motion.div>
    </>
  );
}
