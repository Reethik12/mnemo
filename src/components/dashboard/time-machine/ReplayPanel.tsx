"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReplay } from "@/hooks/useReplay";
import { AssistantPanel } from "./AssistantPanel";
import { CompareModal } from "./CompareModal";

export function ReplayPanel({
  memoryId,
  onClose,
  onForget,
}: {
  memoryId: string;
  onClose: () => void;
  onForget: () => void;
}) {
  const {
    replay,
    isLoading,
    compareVersions,
    compareResult,
    setCompareResult,
    restoreVersion,
    forgetMemory,
  } = useReplay();
  const [activeVersionIndex, setActiveVersionIndex] = useState<number>(0);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isForgetting, setIsForgetting] = useState(false);

  // Fetch replay data on mount
  useState(() => {
    // This is handled by the parent or we could expose fetchReplay from the hook and call it in useEffect
  });

  // We should call fetchReplay when the panel opens. Since useReplay encapsulates it, let's just trigger it.
  // Actually, we can use an effect:
  const { fetchReplay } = useReplay();
  const [fetched, setFetched] = useState(false);

  if (!fetched) {
    fetchReplay(memoryId);
    setFetched(true);
  }

  if (isLoading || !replay) {
    return (
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-white/10 bg-[#050505] p-6 shadow-2xl">
        <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-white/5" />
        <div className="flex-1 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const versions = replay.versions;
  const activeVersion = versions[activeVersionIndex];

  const handleCompareSelect = (vId: string) => {
    if (selectedForCompare.includes(vId)) {
      setSelectedForCompare((prev) => prev.filter((id) => id !== vId));
    } else {
      if (selectedForCompare.length < 2) {
        const next = [...selectedForCompare, vId];
        setSelectedForCompare(next);
        if (next.length === 2) {
          compareVersions(memoryId, next[0], next[1]);
        }
      }
    }
  };

  const handleRestore = async () => {
    setIsRestoring(true);
    await restoreVersion(memoryId, activeVersion.versionId);
    setIsRestoring(false);
  };

  const handleForget = async () => {
    if (
      confirm(
        "Are you sure you want to completely erase this memory from your knowledge graph? This cannot be undone.",
      )
    ) {
      setIsForgetting(true);
      const success = await forgetMemory(memoryId);
      setIsForgetting(false);
      if (success) {
        onForget();
        onClose();
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-40 flex w-full max-w-3xl flex-col border-l border-white/10 bg-[#050505] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-6">
          <div>
            <h2 className="max-w-md truncate text-xl font-bold text-white">
              {replay.title}
            </h2>
            <div className="text-text-secondary mt-2 flex gap-4 text-sm">
              <span>{versions.length} Versions</span>
              <span>Current: v{replay.currentVersion}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setCompareMode(!compareMode);
                setSelectedForCompare([]);
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${compareMode ? "bg-accent-blue text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Compare
            </button>
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
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-y-auto border-r border-white/10">
            {/* Version Navigator */}
            <div className="border-b border-white/10 bg-black/20 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
                  Evolution Timeline
                </h3>
              </div>
              <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
                {versions.map((v, idx) => {
                  const isSelected = activeVersionIndex === idx;
                  const isCompareSelected = selectedForCompare.includes(
                    v.versionId,
                  );

                  return (
                    <button
                      key={v.versionId}
                      onClick={() =>
                        compareMode
                          ? handleCompareSelect(v.versionId)
                          : setActiveVersionIndex(idx)
                      }
                      className={`min-w-[120px] rounded-xl border p-3 text-left transition-all ${
                        isCompareSelected
                          ? "border-accent-blue bg-accent-blue/20 ring-accent-blue/50 ring-2"
                          : isSelected
                            ? "border-white/30 bg-white/10"
                            : "border-white/5 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          v{v.versionNumber}
                        </span>
                        <span className="text-accent-blue bg-accent-blue/10 rounded px-1.5 py-0.5 text-[10px]">
                          {v.confidenceScore}%
                        </span>
                      </div>
                      <span className="text-text-secondary block text-[10px]">
                        {new Date(v.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </button>
                  );
                })}
              </div>
              {compareMode && selectedForCompare.length < 2 && (
                <p className="text-accent-blue mt-2 text-xs">
                  Select {2 - selectedForCompare.length} more version(s) to
                  compare.
                </p>
              )}
            </div>

            {/* Active Version Details */}
            <div className="flex-1 space-y-8 p-6">
              <div>
                <h3 className="text-text-secondary mb-2 text-sm font-medium tracking-wider uppercase">
                  Summary
                </h3>
                <p className="glass rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white">
                  {activeVersion.summary}
                </p>
              </div>

              <div>
                <h3 className="text-text-secondary mb-3 text-sm font-medium tracking-wider uppercase">
                  Learned Concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeVersion.newConceptsLearned.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-sm font-medium text-green-400"
                    >
                      + {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-text-secondary mb-3 text-sm font-medium tracking-wider uppercase">
                  Graph Relationships ({activeVersion.relationships.length})
                </h3>
                <div className="space-y-2">
                  {activeVersion.relationships.map((r) => (
                    <div
                      key={r.id}
                      className="glass flex items-center gap-3 rounded-xl border border-white/5 p-3 text-sm"
                    >
                      <span className="font-medium text-white">
                        {replay.title}
                      </span>
                      <span className="text-text-secondary rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">
                        {r.type}
                      </span>
                      <span className="text-accent-blue font-medium">
                        {r.target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between border-t border-white/10 bg-black/40 p-6">
              <button
                onClick={handleForget}
                disabled={isForgetting}
                className="rounded-xl px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"
              >
                {isForgetting ? "Forgetting..." : "Forget Memory"}
              </button>
              {activeVersion.versionNumber !== replay.currentVersion && (
                <button
                  onClick={handleRestore}
                  disabled={isRestoring}
                  className="rounded-xl bg-purple-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-colors hover:bg-purple-600 disabled:opacity-50"
                >
                  {isRestoring
                    ? "Restoring..."
                    : `Restore to v${activeVersion.versionNumber}`}
                </button>
              )}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="w-80 bg-black/20">
            <AssistantPanel memoryId={memoryId} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {compareResult && (
          <CompareModal
            result={compareResult}
            onClose={() => setCompareResult(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
