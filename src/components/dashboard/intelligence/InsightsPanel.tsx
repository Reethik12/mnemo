"use client";

import { motion } from "framer-motion";
import type {
  PersonalizedInsight,
  Pattern,
} from "@/services/living-intelligence/types";
import { fadeInUp } from "@/lib/animations";

interface InsightsPanelProps {
  insights?: PersonalizedInsight[];
  patterns?: Pattern[];
  isLoading?: boolean;
}

export function InsightsPanel({
  insights = [],
  patterns = [],
  isLoading,
}: InsightsPanelProps) {
  if (isLoading) {
    return (
      <div className="glass glow-border animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-32 rounded bg-white/10" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-full rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const combined = [
    ...insights.map((i) => ({ ...i, category: "Insight", icon: "💡" })),
    ...patterns.map((p) => ({ ...p, category: "Pattern", icon: "🔍" })),
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border rounded-2xl p-6"
    >
      <h3 className="text-text-primary mb-4 font-semibold">Discoveries</h3>

      {combined.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
          <span className="text-text-secondary text-sm">
            No patterns detected yet.
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          {combined.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="group flex items-start gap-4 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-accent-blue text-xs font-medium tracking-wider uppercase">
                    {item.category}
                  </span>
                  <span className="text-text-tertiary rounded-full bg-white/5 px-1.5 py-0.5 text-[10px]">
                    {item.type}
                  </span>
                </div>
                <p className="text-text-secondary mt-1 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
