"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { motion } from "framer-motion";

interface MemoryEmptyStateProps {
  onCreateClick: () => void;
}

export function MemoryEmptyState({ onCreateClick }: MemoryEmptyStateProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[url('/noise.png')] bg-repeat p-8 opacity-90">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <EmptyState
          icon={
            <div className="relative">
              <div className="bg-accent-purple/20 absolute -inset-4 rounded-full blur-xl"></div>
              <svg
                className="text-accent-purple-light relative h-14 w-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          }
          title="Select or create a memory"
          description="Access your workspace to begin weaving your living knowledge graph. Press Cmd+K for commands."
          actionLabel="Create New Memory"
          onAction={onCreateClick}
        />
      </motion.div>
    </div>
  );
}
