import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { TimelineStats } from "@/services/timeline/types";

export function StatsCards({
  stats,
  isLoading,
}: {
  stats: TimelineStats | null;
  isLoading: boolean;
}) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="glass h-24 animate-pulse rounded-2xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  const items = [
    {
      label: "Total Memories",
      value: stats.totalMemories,
      color: "text-blue-400",
    },
    {
      label: "Timeline Events",
      value: stats.timelineEvents,
      color: "text-purple-400",
    },
    {
      label: "Evolution Count",
      value: stats.evolutionCount,
      color: "text-green-400",
    },
    {
      label: "Avg. Confidence",
      value: `${stats.averageConfidence}%`,
      color: "text-yellow-400",
    },
    {
      label: "Restored",
      value: stats.restoredVersions,
      color: "text-teal-400",
    },
    {
      label: "Forgotten",
      value: stats.forgottenMemories,
      color: "text-red-400",
    },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="glass glow-border flex flex-col items-center justify-center rounded-2xl p-4 text-center"
        >
          <span className="text-text-secondary text-xs font-medium tracking-wider uppercase">
            {item.label}
          </span>
          <span className={`mt-2 text-2xl font-bold ${item.color}`}>
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
