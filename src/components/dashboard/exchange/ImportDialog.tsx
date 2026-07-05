"use client";

import { motion } from "framer-motion";

export function ImportDialog({
  collectionTitle,
  onConfirm,
  onCancel,
  isImporting,
}: {
  collectionTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isImporting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass glow-border w-full max-w-md rounded-2xl p-6 text-center"
      >
        <div className="bg-accent-blue/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-accent-blue h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        </div>

        <h2 className="text-text-primary mb-2 text-xl font-semibold">
          Import Collection
        </h2>
        <p className="text-text-secondary mb-8 text-sm">
          Are you sure you want to import{" "}
          <span className="font-medium text-white">
            &quot;{collectionTitle}&quot;
          </span>{" "}
          into your Memory Fabric? This will update your knowledge graph.
        </p>

        {isImporting ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="border-t-accent-blue mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white/20" />
            <p className="text-accent-blue text-sm font-medium">
              Cognee improve() running...
            </p>
            <p className="text-text-secondary mt-2 text-xs">
              Integrating memories into your fabric.
            </p>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-accent-blue hover:bg-accent-blue/80 flex-1 rounded-xl py-3 text-sm font-medium text-white transition-colors"
            >
              Confirm Import
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
