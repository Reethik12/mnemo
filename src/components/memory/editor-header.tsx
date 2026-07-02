"use client";

import { Memory } from "@/types";
import { Button } from "@/components/ui/button";

interface EditorHeaderProps {
  memory: Memory | null;
  onToggleSplitView: () => void;
  isSplitViewActive: boolean;
}

export function EditorHeader({
  memory,
  onToggleSplitView,
  isSplitViewActive,
}: EditorHeaderProps) {
  if (!memory) return null;

  return (
    <div className="border-border bg-bg-primary/50 flex h-12 shrink-0 items-center justify-between border-b px-4 backdrop-blur-md">
      <div className="text-text-tertiary flex items-center gap-2 text-xs">
        <span className="hover:text-text-primary cursor-pointer transition-colors">
          Workspace
        </span>
        <span>/</span>
        <span className="hover:text-text-primary cursor-pointer transition-colors">
          {memory.category || "Uncategorized"}
        </span>
        <span>/</span>
        <span className="text-text-secondary max-w-[200px] truncate font-medium">
          {memory.title || "Untitled Memory"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSplitView}
          className={
            isSplitViewActive
              ? "text-accent-purple bg-accent-purple/10"
              : "text-text-tertiary"
          }
          title="Split View (Coming Soon)"
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
              d="M9 19V6m12-3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-text-tertiary"
          title="Command Palette (Cmd+K)"
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
