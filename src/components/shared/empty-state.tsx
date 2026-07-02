"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeInUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

// ─── Component ───────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className,
      )}
    >
      {icon && (
        <div className="text-text-tertiary mb-4 text-4xl" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-text-primary mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-text-tertiary mb-6 max-w-sm text-sm">{description}</p>
      {actionLabel && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          {...(actionHref ? { as: "a", href: actionHref } : {})}
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
