"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { MemorySearchResult } from "@/services/memory.service";

export function Timeline({
  memories = [],
  isLoading,
}: {
  memories?: MemorySearchResult[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="glass glow-border animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-32 rounded bg-white/10" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-white/20" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/4 rounded bg-white/10" />
                <div className="h-16 w-full rounded-xl bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border rounded-2xl p-6"
    >
      <h3 className="text-text-primary mb-6 font-semibold">Memory Timeline</h3>

      {memories.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
          <span className="text-text-secondary text-sm">
            No memories available.
          </span>
        </div>
      ) : (
        <div className="relative ml-2 space-y-8 border-l border-white/10 pb-4">
          {memories.slice(0, 10).map((memory, _i) => {
            let label = "Memory Event";
            let desc = memory.text;

            // Try to extract title from mock formatting
            if (memory.text.includes("Title:")) {
              const match = memory.text.match(/Title:\s*(.*?)\n/);
              if (match) label = match[1];
              const descMatch = memory.text.match(/Content:\n([\s\S]*)/);
              if (descMatch) desc = descMatch[1].trim();
            }

            return (
              <div key={memory.id} className="relative pl-6">
                <div className="bg-accent-blue absolute top-1.5 -left-[5px] h-2 w-2 rounded-full ring-4 ring-[#0f1115]" />
                <div className="flex flex-col gap-2">
                  <span className="text-text-primary text-sm font-medium">
                    {label}
                  </span>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-text-secondary line-clamp-3 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
