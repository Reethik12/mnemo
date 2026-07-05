"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MODULE_CARDS } from "@/lib/constants";
import { useLivingIntelligence } from "@/hooks/useLivingIntelligence";
import { recallAllMemories } from "@/services/memory.service";
import type { MemorySearchResult } from "@/services/memory.service";

// Components
import { IntelligenceCard } from "@/components/dashboard/intelligence/IntelligenceCard";
import { InsightsPanel } from "@/components/dashboard/intelligence/InsightsPanel";
import { TrendingTopics } from "@/components/dashboard/intelligence/TrendingTopics";
import { RelationshipCard } from "@/components/dashboard/intelligence/RelationshipCard";
import { Recommendations } from "@/components/dashboard/intelligence/Recommendations";
import { Timeline } from "@/components/dashboard/intelligence/Timeline";
import { StatisticsCard } from "@/components/dashboard/intelligence/StatisticsCard";
import { HeatMap } from "@/components/dashboard/intelligence/HeatMap";

export default function IntelligencePage() {
  const moduleData = MODULE_CARDS.find((m) => m.id === "living-intelligence")!;
  const { data, isLoading, error, refresh } = useLivingIntelligence();
  const [memories, setMemories] = useState<MemorySearchResult[]>([]);
  const [isMemoriesLoading, setIsMemoriesLoading] = useState(true);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await recallAllMemories();
        if (Array.isArray(res)) {
          setMemories(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsMemoriesLoading(false);
      }
    }
    fetchTimeline();
  }, []);

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-8 pb-12"
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${moduleData.gradient} text-white shadow-lg`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-text-primary text-2xl font-bold tracking-tight">
                {moduleData.title}
              </h1>
            </div>
            <p className="text-text-secondary mt-1">{moduleData.description}</p>
          </div>
        </div>

        <button
          onClick={refresh}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-50"
        >
          <svg
            className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isLoading ? "Analyzing..." : "Refresh Insights"}
        </button>
      </motion.div>

      {error && (
        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400"
        >
          Failed to load intelligence data: {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <IntelligenceCard score={data?.score} isLoading={isLoading} />
          <StatisticsCard growth={data?.growth} isLoading={isLoading} />
          <HeatMap isLoading={isLoading} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InsightsPanel
              insights={data?.insights}
              patterns={data?.patterns}
              isLoading={isLoading}
            />
            <Recommendations
              recommendations={data?.recommendations}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="space-y-6">
          <TrendingTopics topics={data?.trendingTopics} isLoading={isLoading} />
          <RelationshipCard
            relationships={data?.relationships}
            isLoading={isLoading}
          />
          <Timeline memories={memories} isLoading={isMemoriesLoading} />
        </div>
      </div>
    </motion.div>
  );
}
