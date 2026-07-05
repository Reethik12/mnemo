"use client";

import { motion } from "framer-motion";
import type { TrendingTopic } from "@/services/living-intelligence/types";
import { fadeInUp } from "@/lib/animations";

export function TrendingTopics({
  topics = [],
  isLoading,
}: {
  topics?: TrendingTopic[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="glass glow-border h-[300px] animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-32 rounded bg-white/10" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-white/5" />
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
      <h3 className="text-text-primary mb-4 font-semibold">Trending Topics</h3>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:bg-white/10"
          >
            <span className="text-text-primary text-sm font-medium">
              {topic.name}
            </span>
            <span className="text-text-tertiary rounded-md bg-black/20 px-1.5 py-0.5 text-xs">
              {topic.count}
            </span>
            {topic.trend === "up" && (
              <span className="text-xs text-emerald-400">↑</span>
            )}
            {topic.trend === "down" && (
              <span className="text-xs text-red-400">↓</span>
            )}
            {topic.trend === "stable" && (
              <span className="text-text-tertiary text-xs">-</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
