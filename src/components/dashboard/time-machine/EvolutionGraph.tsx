"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { EvolutionDataPoint } from "@/services/timeline/types";

export function EvolutionGraph({
  data,
  isLoading,
}: {
  data: EvolutionDataPoint[];
  isLoading: boolean;
}) {
  if (isLoading || !data.length) {
    return (
      <div className="glass flex h-[400px] animate-pulse items-center justify-center rounded-2xl bg-white/5">
        <div className="border-t-accent-blue h-8 w-8 animate-spin rounded-full border-4 border-white/20" />
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border rounded-2xl bg-[#0a0a0a] p-6"
    >
      <h3 className="text-text-primary mb-6 text-lg font-semibold">
        Knowledge Evolution Graph
      </h3>
      <div className="h-[400px] w-full text-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMemories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="colorRelationships"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.5)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#12141a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              name="Memories"
              dataKey="memoryCount"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorMemories)"
              strokeWidth={2}
            />
            <Area
              yAxisId="left"
              type="monotone"
              name="Relationships"
              dataKey="relationshipCount"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorRelationships)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              name="AI Confidence %"
              dataKey="aiConfidence"
              stroke="#10b981"
              fillOpacity={0}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
