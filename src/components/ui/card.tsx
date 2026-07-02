"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

// ─── Variants ────────────────────────────────────────

const cardVariants = {
  default:
    "bg-surface border border-border hover:border-border-hover hover:shadow-card-hover",
  glass: "glass glow-border",
} as const;

// ─── Types ───────────────────────────────────────────

export type CardVariant = keyof typeof cardVariants;

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  /** Disable hover animations */
  static?: boolean;
  children: React.ReactNode;
}

// ─── Component ───────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    static: isStatic = false,
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      whileHover={
        isStatic
          ? undefined
          : {
              y: -4,
              transition: {
                type: "tween",
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              },
            }
      }
      className={cn(
        "rounded-xl p-6 transition-all duration-[var(--duration-normal)]",
        "shadow-card",
        cardVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});
