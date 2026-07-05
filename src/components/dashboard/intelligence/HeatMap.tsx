"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/cn";

export function HeatMap({ isLoading }: { isLoading?: boolean }) {
  const weeks = 20;
  const days = 7;
  const [mapData] = useState<number[][]>(() => {
    const generateIntensity = () => {
      const r = Math.random();
      if (r > 0.8) return 4;
      if (r > 0.6) return 3;
      if (r > 0.4) return 2;
      if (r > 0.2) return 1;
      return 0;
    };

    return Array.from({ length: days }).map(() =>
      Array.from({ length: weeks }).map(() => generateIntensity()),
    );
  });

  if (isLoading) {
    return (
      <div className="glass glow-border h-[200px] animate-pulse rounded-2xl p-6">
        <div className="mb-6 h-6 w-32 rounded bg-white/10" />
        <div className="h-24 w-full rounded bg-white/5" />
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border overflow-x-auto rounded-2xl p-6"
    >
      <h3 className="text-text-primary mb-6 font-semibold">Activity Heatmap</h3>

      <div className="flex min-w-max gap-1">
        {Array.from({ length: weeks }).map((_, colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col gap-1">
            {mapData.map((row, rowIndex) => {
              const intensity = row[colIndex];
              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={cn(
                    "h-3 w-3 rounded-[2px]",
                    intensity === 4
                      ? "bg-accent-blue"
                      : intensity === 3
                        ? "bg-accent-blue/80"
                        : intensity === 2
                          ? "bg-accent-blue/50"
                          : intensity === 1
                            ? "bg-accent-blue/30"
                            : "bg-white/5",
                  )}
                  title={`${intensity} memories`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
