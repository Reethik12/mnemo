"use client";

import { useState, useEffect, useRef } from "react";
import { Memory } from "@/types";
import { useMemoryContext } from "@/providers/memory-provider";
import { EditorStatusBar } from "./editor-status-bar";

interface MemoryEditorProps {
  memory: Memory;
}

export function MemoryEditor({ memory }: MemoryEditorProps) {
  const { updateMemory } = useMemoryContext();
  const [title, setTitle] = useState(memory.title);
  const [content, setContent] = useState(memory.content);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  // Mock autosave logic
  useEffect(() => {
    if (title === memory.title && content === memory.content) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      await updateMemory(memory.id, { title, content });
      setSaveStatus("saved");

      // Reset to idle after a few seconds
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000); // 1s debounce

    return () => clearTimeout(timeoutRef.current);
  }, [title, content, memory.id, memory.title, memory.content, updateMemory]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="bg-bg-primary/30 relative flex h-full flex-col">
      <div className="flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent overflow-y-auto px-8 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Memory"
            className="text-text-primary placeholder:text-text-tertiary w-full bg-transparent text-5xl font-bold tracking-tight focus:outline-none"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing..."
            className="text-text-secondary placeholder:text-text-tertiary min-h-[600px] w-full resize-none bg-transparent text-lg leading-relaxed focus:outline-none"
            style={{ height: "calc(100vh - 300px)" }} // basic auto-expand strategy for now
          />
        </div>
      </div>

      <EditorStatusBar
        wordCount={wordCount}
        charCount={charCount}
        readTime={readTime}
        saveStatus={saveStatus}
      />
    </div>
  );
}
