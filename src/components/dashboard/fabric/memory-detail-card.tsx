"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/cn";
import type { MemorySearchResult } from "@/services/memory.service";

export function MemoryDetailCard({
  memory,
  index,
}: {
  memory: MemorySearchResult;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      className={cn(
        "glass glow-border group relative overflow-hidden rounded-xl p-5",
        "transition-all duration-[var(--duration-normal)]",
        "hover:shadow-card-hover",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top right, rgba(109, 91, 255, 0.1), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="text-accent-purple/70 h-4 w-4"
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
            <span className="text-text-secondary text-xs font-medium">
              Memory Entry
            </span>
          </div>
          {memory.similarityScore !== undefined && (
            <span className="bg-accent-purple/10 text-accent-purple-light rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide">
              Score: {memory.similarityScore.toFixed(3)}
            </span>
          )}
        </div>

        <p className="text-text-primary line-clamp-4 text-sm leading-relaxed whitespace-pre-wrap">
          {memory.text}
        </p>

        {/* Explainability data if available via Cognee in the text string (since we encoded it earlier) */}
      </div>
    </motion.div>
  );
}
