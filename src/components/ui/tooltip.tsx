"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────

type Placement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: Placement;
  delay?: number;
  className?: string;
}

// ─── Placement Styles ────────────────────────────────

const placementStyles: Record<Placement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const placementMotion: Record<Placement, { x?: number; y?: number }> = {
  top: { y: 4 },
  bottom: { y: -4 },
  left: { x: 4 },
  right: { x: -4 },
};

// ─── Component ───────────────────────────────────────

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 300,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95, ...placementMotion[placement] }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, ...placementMotion[placement] }}
            transition={{ type: "tween", duration: 0.15 }}
            className={cn(
              "pointer-events-none absolute z-[var(--z-tooltip)]",
              "glass-strong rounded-lg px-3 py-1.5",
              "text-text-primary text-xs whitespace-nowrap",
              placementStyles[placement],
              className,
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
