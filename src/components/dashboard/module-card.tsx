"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { cardAppear } from "@/lib/animations";
import type { ModuleCard as ModuleCardType } from "@/lib/constants";

// ─── Component ───────────────────────────────────────

interface ModuleCardProps {
  module: ModuleCardType;
  index?: number;
}

export function ModuleCard({ module, index = 0 }: ModuleCardProps) {
  return (
    <motion.div
      variants={cardAppear}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 + index * 0.08 }}
    >
      <Link href={module.href}>
        <div
          className={cn(
            "glass glow-border group relative rounded-xl p-6",
            "transition-all duration-[var(--duration-normal)]",
            "hover:shadow-card-hover",
          )}
        >
          {/* Glow effect */}
          <div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${module.glowColor}, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          <div className="relative">
            {/* Icon + Badge */}
            <div className="mb-4 flex items-start justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  `bg-gradient-to-br ${module.gradient} text-white`,
                )}
              >
                <svg
                  className="h-5 w-5"
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
            </div>

            {/* Content */}
            <h3 className="text-text-primary mb-2 text-sm font-semibold">
              {module.title}
            </h3>
            <p className="text-text-tertiary text-xs leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
