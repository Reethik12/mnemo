"use client";

import { useOffline } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";

export function OfflineBanner() {
  const { isOffline, pendingChanges } = useOffline();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="shadow-glow-sm fixed top-4 left-1/2 z-[var(--z-toast)] flex -translate-x-1/2 items-center gap-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-medium text-yellow-400 backdrop-blur-md"
        >
          <svg
            className="h-4 w-4 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>You are offline.</span>
          {pendingChanges > 0 && (
            <>
              <span className="h-3 w-px bg-yellow-500/30" />
              <span>{pendingChanges} changes pending sync</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
