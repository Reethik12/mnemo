"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { MODULE_CARDS } from "@/lib/constants";
import { useTimeline } from "@/hooks/useTimeline";
import { StatsCards } from "@/components/dashboard/time-machine/StatsCards";
import { EvolutionGraph } from "@/components/dashboard/time-machine/EvolutionGraph";
import { TimelineView } from "@/components/dashboard/time-machine/TimelineView";
import { ReplayPanel } from "@/components/dashboard/time-machine/ReplayPanel";

export default function TimeMachinePage() {
  const moduleData = MODULE_CARDS.find((m) => m.id === "memory-time-machine");
  const { events, stats, evolution, isLoading, query, setQuery, refetch } =
    useTimeline();
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);

  // Filters State
  const [filterType, setFilterType] = useState<string>("all");

  const filteredEvents = events.filter(
    (e) => filterType === "all" || e.type === filterType,
  );

  if (!moduleData) return null;

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="initial"
      animate="animate"
      className="space-y-12"
    >
      <motion.div
        variants={fadeInUp}
        className="relative flex flex-col items-center justify-center space-y-6 py-12 text-center"
      >
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${moduleData.gradient} text-white shadow-lg`}
        >
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="max-w-2xl space-y-2">
          <h1 className="text-text-primary text-4xl font-bold tracking-tight">
            {moduleData.title}
          </h1>
          <p className="text-text-secondary text-lg">
            {moduleData.description}
          </p>
        </div>
      </motion.div>

      <StatsCards stats={stats} isLoading={isLoading} />

      <EvolutionGraph data={evolution} isLoading={isLoading} />

      <motion.div variants={fadeInUp} className="space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <h2 className="text-text-primary text-2xl font-semibold">
            Evolution Timeline
          </h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search memories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="focus:border-accent-blue/50 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="focus:border-accent-blue/50 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="created">Created</option>
              <option value="improved">Improved</option>
              <option value="restored">Restored</option>
              <option value="forgotten">Forgotten</option>
            </select>
          </div>
        </div>

        <TimelineView
          events={filteredEvents}
          isLoading={isLoading}
          onSelectEvent={setSelectedMemoryId}
        />
      </motion.div>

      <AnimatePresence>
        {selectedMemoryId && (
          <ReplayPanel
            memoryId={selectedMemoryId}
            onClose={() => setSelectedMemoryId(null)}
            onForget={() => {
              refetch();
              setSelectedMemoryId(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
