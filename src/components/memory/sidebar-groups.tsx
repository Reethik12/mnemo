"use client";

import { useState } from "react";
import { MemoryItem } from "./memory-item";
import { Memory } from "@/types";
import { ViewMode } from "@/components";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarGroupProps {
  title: string;
  memories: Memory[];
  selectedMemory: Memory | null;
  selectedIds: Set<string>;
  viewMode: ViewMode;
  selectionModeActive: boolean;
  onSelect: (memory: Memory) => void;
  onSelectToggle: (id: string, e: React.MouseEvent) => void;
  onDeleteRequest: (id: string) => void;
  initiallyExpanded?: boolean;
}

export function SidebarGroup({
  title,
  memories,
  selectedMemory,
  selectedIds,
  viewMode,
  selectionModeActive,
  onSelect,
  onSelectToggle,
  onDeleteRequest,
  initiallyExpanded = true,
}: SidebarGroupProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  if (memories.length === 0) return null;

  return (
    <div className="mb-4 flex flex-col">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex w-full items-center justify-between px-3 py-1.5 transition-colors hover:bg-white/5"
      >
        <span className="text-text-tertiary group-hover:text-text-secondary text-xs font-semibold tracking-wider">
          {title.toUpperCase()} ({memories.length})
        </span>
        <svg
          className={`text-text-tertiary h-3.5 w-3.5 transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pt-1">
              {memories.map((memory) => (
                <MemoryItem
                  key={memory.id}
                  memory={memory}
                  isSelected={selectedMemory?.id === memory.id}
                  isMultiSelected={selectedIds.has(memory.id)}
                  viewMode={viewMode}
                  selectionModeActive={selectionModeActive}
                  onClick={onSelect}
                  onSelectToggle={onSelectToggle}
                  onDeleteRequest={onDeleteRequest}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
