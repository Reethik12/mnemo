"use client";

import { motion } from "framer-motion";
import type { Recommendation } from "@/services/living-intelligence/types";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/cn";

export function Recommendations({
  recommendations = [],
  isLoading,
}: {
  recommendations?: Recommendation[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="glass glow-border h-[300px] animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-48 rounded bg-white/10" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-full rounded-xl bg-white/5" />
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
      <h3 className="text-text-primary mb-4 font-semibold">
        Proactive Recommendations
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className={cn(
              "group relative overflow-hidden rounded-xl border p-4 transition-all hover:bg-white/5",
              rec.priority === "high"
                ? "border-amber-500/20 bg-amber-500/5"
                : rec.priority === "medium"
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-white/5 bg-white/5",
            )}
          >
            <div className="relative z-10 flex items-start gap-4">
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold uppercase",
                  rec.priority === "high"
                    ? "bg-amber-500/20 text-amber-400"
                    : rec.priority === "medium"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-text-tertiary bg-white/10",
                )}
              >
                {rec.priority.charAt(0)}
              </div>
              <div>
                <h4 className="text-text-primary text-sm leading-snug font-medium">
                  {rec.action}
                </h4>
                <p className="text-text-secondary mt-1 text-xs">
                  {rec.context}
                </p>
              </div>
            </div>

            <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="flex h-8 items-center justify-center rounded-lg bg-white/10 px-3 text-xs font-medium text-white hover:bg-white/20">
                Action
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
