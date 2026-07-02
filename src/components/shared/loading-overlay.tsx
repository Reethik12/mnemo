"use client";

import { motion } from "framer-motion";

export function LoadingOverlay({
  text = "Loading workspace...",
}: {
  text?: string;
}) {
  return (
    <div className="bg-bg-primary/50 fixed inset-0 z-[var(--z-toast)] flex items-center justify-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-border bg-surface shadow-glow-sm flex flex-col items-center gap-4 rounded-2xl border p-8"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="border-accent-purple/20 absolute inset-0 rounded-full border-2"></div>
          <div className="border-accent-purple absolute inset-0 animate-spin rounded-full border-2 border-t-transparent"></div>
          <span className="text-gradient text-xl font-bold">M</span>
        </div>
        <p className="text-text-secondary text-sm font-medium tracking-wide">
          {text}
        </p>
      </motion.div>
    </div>
  );
}
