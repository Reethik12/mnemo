"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useDigitalTwin } from "@/hooks/useDigitalTwin";

export function TwinDashboard() {
  const { stats, isLoading } = useDigitalTwin();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass h-32 animate-pulse rounded-2xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  const metrics = [
    {
      label: "Knowledge Score",
      value: `${stats.knowledgeScore}%`,
      color: "text-purple-400",
    },
    {
      label: "Learning Progress",
      value: `${stats.learningProgress}%`,
      color: "text-blue-400",
    },
    {
      label: "Memory Strength",
      value: `${stats.memoryStrength}%`,
      color: "text-green-400",
    },
    {
      label: "Reasoning Confidence",
      value: `${stats.reasoningConfidence}%`,
      color: "text-yellow-400",
    },
    { label: "Graph Size", value: stats.graphSize, color: "text-white" },
    {
      label: "Recent Improvements",
      value: `+${stats.recentImprovements}`,
      color: "text-accent-blue",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className="glass glow-border flex flex-col items-center justify-center rounded-2xl bg-white/5 p-6 text-center transition-colors hover:bg-white/10"
          >
            <span className="text-text-secondary text-xs font-medium tracking-wider uppercase">
              {metric.label}
            </span>
            <span className={`mt-2 text-3xl font-bold ${metric.color}`}>
              {metric.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          variants={fadeInUp}
          className="glass glow-border rounded-2xl bg-white/5 p-6"
        >
          <h3 className="text-text-secondary mb-6 text-sm font-medium tracking-wider uppercase">
            Expertise Domains
          </h3>
          <div className="space-y-4">
            {stats.expertiseDomains.map((domain, idx) => (
              <div key={idx}>
                <div className="mb-2 flex justify-between text-sm font-medium text-white">
                  <span>{domain.domain}</span>
                  <span className="text-accent-purple">{domain.score}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${domain.score}%` }}
                    transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="glass glow-border flex flex-col items-center justify-center rounded-2xl bg-white/5 p-6 text-center"
        >
          <div className="text-accent-blue mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 className="text-text-secondary mb-2 text-sm font-medium tracking-wider uppercase">
            Communication Style
          </h3>
          <p className="max-w-sm text-lg text-white italic">
            &quot;{stats.communicationStyle}&quot;
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
