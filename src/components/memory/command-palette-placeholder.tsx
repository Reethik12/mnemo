"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { useFocusMode } from "@/hooks";

export function CommandPalettePlaceholder() {
  const [isOpen, setIsOpen] = useState(false);
  const { isFocusMode } = useFocusMode();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isFocusMode) return null; // Hide completely in focus mode if desired, though modal might be fine

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      ariaLabel="Command Palette"
      className="bg-bg-secondary max-w-2xl overflow-hidden p-0"
    >
      <div className="border-border flex items-center border-b px-4 py-3">
        <svg
          className="text-text-tertiary h-5 w-5"
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
          placeholder="Search memories, tags, or commands... (Cmd+K)"
          className="text-text-primary placeholder:text-text-tertiary flex-1 bg-transparent px-3 text-sm focus:outline-none"
          autoFocus
        />
        <div className="flex items-center gap-1">
          <kbd className="border-border bg-surface text-text-tertiary hidden rounded-md border px-2 py-0.5 text-[10px] font-medium sm:inline-block">
            esc
          </kbd>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
          <svg
            className="text-text-tertiary mb-4 h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <h3 className="text-text-secondary text-sm font-medium">
            Semantic Search & Commands
          </h3>
          <p className="text-text-tertiary mt-1 text-xs">
            This feature will be unlocked in Phase 4 (Memory Fabric).
          </p>
        </div>
      </div>
    </Modal>
  );
}
