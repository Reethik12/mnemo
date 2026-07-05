"use client";

import { motion } from "framer-motion";
import type { RelationshipInsight } from "@/services/living-intelligence/types";
import { fadeInUp } from "@/lib/animations";

export function RelationshipCard({
  relationships = [],
  isLoading,
}: {
  relationships?: RelationshipInsight[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="glass glow-border h-[300px] animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-32 rounded bg-white/10" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
              </div>
            </div>
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
        Relationship Detection
      </h3>

      <div className="space-y-4">
        {relationships.map((rel, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <div className="text-accent-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 font-semibold uppercase ring-1 ring-white/10">
                {rel.entity.charAt(0)}
              </div>
              <div>
                <h4 className="text-text-primary text-sm font-medium">
                  {rel.entity}
                </h4>
                <p className="text-text-tertiary mt-0.5 text-xs">
                  {rel.description}
                </p>
              </div>
            </div>
            <div className="text-text-secondary flex h-6 items-center rounded-full bg-white/5 px-2.5 text-xs font-medium">
              {rel.count}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
