"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeInUp } from "@/lib/animations";

// ─── Types ───────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

// ─── Component ───────────────────────────────────────

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={cn("flex items-start justify-between gap-4", className)}
    >
      <div>
        <h2 className="text-text-primary text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-text-tertiary mt-1 text-sm">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
