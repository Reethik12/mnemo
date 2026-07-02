"use client";

import { Memory } from "@/types";
import { GlassContainer } from "@/components/shared/glass-container";
import { motion } from "framer-motion";

interface MemoryInspectorProps {
  memory: Memory;
}

export function MemoryInspector({ memory }: MemoryInspectorProps) {
  const formatDate = (isoStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoStr));
  };

  const wordCount = memory.content.trim()
    ? memory.content.trim().split(/\s+/).length
    : 0;
  const charCount = memory.content.length;

  return (
    <div className="bg-surface/30 flex h-full w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex-col overflow-y-auto p-6 backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-text-secondary text-sm font-semibold tracking-wider uppercase">
          Inspector
        </h3>
        <span className="text-text-tertiary rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium">
          {wordCount > 500 ? "Long Read" : "Quick Read"}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, staggerChildren: 0.1 }}
        className="space-y-6"
      >
        <motion.div>
          <GlassContainer className="border-border/50 border p-4 transition-all hover:bg-white/5">
            <h4 className="text-text-primary mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide">
              <svg
                className="text-accent-purple h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Metadata
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Created</span>
                <span className="text-text-primary font-medium">
                  {formatDate(memory.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Updated</span>
                <span className="text-text-primary font-medium">
                  {formatDate(memory.updatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Category</span>
                <span className="text-text-primary font-medium">
                  {memory.category || "None"}
                </span>
              </div>
            </div>
          </GlassContainer>
        </motion.div>

        <motion.div>
          <GlassContainer className="border-border/50 border p-4 transition-all hover:bg-white/5">
            <h4 className="text-text-primary mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide">
              <svg
                className="text-accent-purple h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Properties
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Words</span>
                <span className="text-text-primary font-medium">
                  {wordCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Characters</span>
                <span className="text-text-primary font-medium">
                  {charCount}
                </span>
              </div>
              <div className="border-border flex items-center justify-between border-t pt-2">
                <span className="text-text-secondary">Status</span>
                <div className="flex gap-2">
                  {memory.pinned && (
                    <span className="text-accent-purple bg-accent-purple/10 rounded px-2 py-0.5 text-xs">
                      Pinned
                    </span>
                  )}
                  {memory.favorite && (
                    <span className="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">
                      Favorite
                    </span>
                  )}
                  {!memory.pinned && !memory.favorite && (
                    <span className="text-text-tertiary rounded bg-white/5 px-2 py-0.5 text-xs">
                      Normal
                    </span>
                  )}
                </div>
              </div>
            </div>
          </GlassContainer>
        </motion.div>

        {memory.tags.length > 0 && (
          <motion.div>
            <GlassContainer className="border-border/50 border p-4 transition-all hover:bg-white/5">
              <h4 className="text-text-primary mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide">
                <svg
                  className="text-accent-purple h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent-purple/10 border-accent-purple/20 text-accent-purple-light hover:bg-accent-purple/20 cursor-pointer rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </GlassContainer>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
