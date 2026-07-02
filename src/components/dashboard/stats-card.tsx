"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { cardAppear } from "@/lib/animations";
import type { DashboardStat } from "@/lib/constants";

// ─── Icon Map ────────────────────────────────────────

function StatIcon({ iconKey }: { iconKey: string }) {
  const cls = "h-5 w-5";
  switch (iconKey) {
    case "brain":
      return (
        <svg
          className={cls}
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
      );
    case "grid":
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
      );
    case "shield":
      return (
        <svg
          className={cls}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Component ───────────────────────────────────────

interface StatsCardProps {
  stat: DashboardStat;
  index?: number;
}

export function StatsCard({ stat, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      variants={cardAppear}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className={cn(
        "glass glow-border rounded-xl p-5",
        "transition-all duration-[var(--duration-normal)]",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text-tertiary text-xs font-medium tracking-wider uppercase">
            {stat.label}
          </p>
          <p className="text-text-primary mt-1.5 text-2xl font-bold tracking-tight">
            {stat.value}
          </p>
          <p className="text-text-tertiary mt-1 text-xs">{stat.description}</p>
        </div>
        <div className="bg-accent-purple/10 text-accent-purple-light flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
          <StatIcon iconKey={stat.iconKey} />
        </div>
      </div>
    </motion.div>
  );
}
