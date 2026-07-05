"use client";

import { motion } from "framer-motion";
import type { IntelligenceScore } from "@/services/living-intelligence/types";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/cn";

export function IntelligenceCard({
  score,
  isLoading,
}: {
  score?: IntelligenceScore;
  isLoading?: boolean;
}) {
  if (isLoading || !score) {
    return (
      <div className="glass glow-border animate-pulse rounded-2xl p-6">
        <div className="mb-4 h-6 w-32 rounded bg-white/10" />
        <div className="flex gap-4">
          <div className="h-20 w-20 rounded-full bg-white/10" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border relative overflow-hidden rounded-2xl p-6"
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-3xl" />

      <h3 className="text-text-primary mb-6 font-semibold">
        Intelligence Score
      </h3>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">
              {score.overall}%
            </span>
            <span className="text-text-tertiary text-[10px] tracking-wider uppercase">
              Overall
            </span>
          </div>
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-white/5"
            />
            <circle
              cx="48"
              cy="48"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-indigo-400"
              strokeDasharray="289"
              strokeDashoffset={289 - (289 * score.overall) / 100}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          <ScoreMetric label="Memory Quality" value={score.memoryQuality} />
          <ScoreMetric
            label="Graph Completeness"
            value={score.graphCompleteness}
          />
          <ScoreMetric
            label="Knowledge Growth"
            value={score.knowledgeGrowth}
            isPercent
          />
        </div>
      </div>
    </motion.div>
  );
}

function ScoreMetric({
  label,
  value,
  isPercent,
}: {
  label: string;
  value: number;
  isPercent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-white/5 p-3">
      <span className="text-text-secondary text-xs">{label}</span>
      <div className="flex items-end gap-1.5">
        <span className="text-lg font-medium text-white">
          {isPercent && value > 0 ? "+" : ""}
          {value}
          {isPercent ? "%" : "%"}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/20">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            value > 80
              ? "from-emerald-500 to-emerald-400"
              : value > 50
                ? "from-amber-500 to-amber-400"
                : "from-red-500 to-red-400",
          )}
          style={{ width: `${Math.min(Math.abs(value), 100)}%` }}
        />
      </div>
    </div>
  );
}
