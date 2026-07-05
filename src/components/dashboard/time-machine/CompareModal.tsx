import { motion } from "framer-motion";
import type { CompareResult } from "@/services/timeline/types";

export function CompareModal({
  result,
  onClose,
}: {
  result: CompareResult | null;
  onClose: () => void;
}) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass glow-border flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#0a0a0a]"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-6">
          <div>
            <h2 className="text-xl font-bold text-white">Compare Versions</h2>
            <p className="text-text-secondary mt-1 text-sm">
              Version {result.v1.versionNumber} vs Version{" "}
              {result.v2.versionNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-white/10"
          >
            <svg
              className="text-text-secondary h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-text-primary border-b border-white/10 pb-2 font-semibold">
                Added Knowledge
              </h3>
              {result.addedKnowledge.length > 0 ? (
                <ul className="space-y-2">
                  {result.addedKnowledge.map((k, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-green-400/20 bg-green-400/10 px-3 py-2 text-sm text-green-400"
                    >
                      <span className="font-bold">+</span> {k}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-secondary text-sm">
                  No new concepts added.
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-text-primary border-b border-white/10 pb-2 font-semibold">
                Removed Knowledge
              </h3>
              {result.removedKnowledge.length > 0 ? (
                <ul className="space-y-2">
                  {result.removedKnowledge.map((k, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-400"
                    >
                      <span className="font-bold">-</span> {k}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-secondary text-sm">
                  No concepts removed.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-text-secondary text-xs tracking-wide uppercase">
                Summary Edit
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {result.improvedSummaries}
              </p>
            </div>
            <div className="glass rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-text-secondary text-xs tracking-wide uppercase">
                Relationships
              </p>
              <div className="mt-2 flex gap-4 text-sm font-medium">
                <span className="text-green-400">
                  +{result.relationshipChanges.added}
                </span>
                <span className="text-red-400">
                  -{result.relationshipChanges.removed}
                </span>
              </div>
            </div>
            <div className="glass rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-text-secondary text-xs tracking-wide uppercase">
                Confidence Delta
              </p>
              <p
                className={`mt-1 text-xl font-bold ${result.confidenceDifference >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {result.confidenceDifference > 0 ? "+" : ""}
                {result.confidenceDifference}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
