"use client";

import { Reorder, AnimatePresence } from "framer-motion";
import { Memory } from "@/types";
import { cn } from "@/lib/cn";

interface EditorTabsProps {
  openTabIds: string[];
  activeTabId: string | null;
  memories: Memory[];
  onTabSwitch: (id: string) => void;
  onTabClose: (id: string) => void;
  onReorder: (newOrder: string[]) => void;
}

export function EditorTabs({
  openTabIds,
  activeTabId,
  memories,
  onTabSwitch,
  onTabClose,
  onReorder,
}: EditorTabsProps) {
  return (
    <div className="border-border bg-bg-primary scrollbar-hide flex h-10 w-full shrink-0 items-end overflow-x-auto overflow-y-hidden border-b px-2">
      <Reorder.Group
        axis="x"
        values={openTabIds}
        onReorder={onReorder}
        className="flex gap-1"
      >
        <AnimatePresence initial={false}>
          {openTabIds.map((id) => {
            const memory = memories.find((m) => m.id === id);
            if (!memory) return null;
            const isActive = activeTabId === id;

            return (
              <Reorder.Item
                key={id}
                value={id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "group relative flex h-8 max-w-[200px] min-w-[120px] cursor-pointer items-center justify-between gap-2 rounded-t-md px-3 text-xs transition-colors",
                  isActive
                    ? "bg-surface/50 text-text-primary border-accent-purple/30 border-t font-medium"
                    : "text-text-secondary bg-transparent hover:bg-white/5",
                )}
                onClick={() => onTabSwitch(id)}
              >
                <div className="flex flex-1 items-center gap-2 overflow-hidden">
                  <svg
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      isActive ? "text-accent-purple" : "text-text-tertiary",
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="truncate">
                    {memory.title || "Untitled Memory"}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(id);
                  }}
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm transition-colors",
                    isActive
                      ? "text-text-tertiary hover:text-text-primary hover:bg-white/10"
                      : "text-text-tertiary hover:text-text-primary opacity-0 group-hover:opacity-100 hover:bg-white/10",
                  )}
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
