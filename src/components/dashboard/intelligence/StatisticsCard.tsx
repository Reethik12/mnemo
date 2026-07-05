"use client";

import { motion } from "framer-motion";
import type { MemoryGrowth } from "@/services/living-intelligence/types";
import { fadeInUp } from "@/lib/animations";

export function StatisticsCard({
  growth,
  isLoading,
}: {
  growth?: MemoryGrowth;
  isLoading?: boolean;
}) {
  if (isLoading || !growth) {
    return (
      <div className="glass glow-border h-[200px] animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-32 rounded bg-white/10" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 w-full rounded-xl bg-white/5" />
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
      <h3 className="text-text-primary mb-6 font-semibold">Memory Growth</h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <GrowthMetric label="Daily" value={growth.daily} />
        <GrowthMetric label="Weekly" value={growth.weekly} />
        <GrowthMetric label="Monthly" value={growth.monthly} />
        <GrowthMetric label="Total Memories" value={growth.total} isTotal />
      </div>
    </motion.div>
  );
}

function GrowthMetric({
  label,
  value,
  isTotal,
}: {
  label: string;
  value: number;
  isTotal?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/5 p-4 text-center">
      <span className="text-text-secondary text-xs">{label}</span>
      <span
        className={`text-2xl font-bold ${isTotal ? "text-accent-blue" : "text-white"}`}
      >
        {isTotal ? "" : "+"}
        {value}
      </span>
    </div>
  );
}
