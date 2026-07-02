"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function BulkActionsBar({
  selectedCount,
  onClear,
  onArchive,
  onDelete,
}: BulkActionsBarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="border-accent-purple/30 bg-surface/90 absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border px-6 py-3 shadow-[0_0_30px_rgba(109,91,255,0.15)] backdrop-blur-xl"
        >
          <span className="text-text-primary text-sm font-medium">
            {selectedCount} selected
          </span>

          <div className="bg-border h-4 w-px" />

          <div className="flex gap-2">
            <button
              onClick={onArchive}
              className="text-text-secondary hover:text-text-primary rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-white/10"
            >
              Archive
            </button>
            <button
              onClick={onDelete}
              className="rounded-md px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-400/10 hover:text-red-300"
            >
              Delete
            </button>
          </div>

          <div className="bg-border h-4 w-px" />

          <button
            onClick={onClear}
            className="text-text-tertiary hover:text-text-primary rounded-full p-1 transition-colors hover:bg-white/10"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
