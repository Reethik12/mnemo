/**
 * Reusable Framer Motion animation variants and transition presets.
 * All animations respect prefers-reduced-motion at the component level
 * via Framer Motion's built-in `useReducedMotion` hook.
 */
import type { Variants, Transition } from "framer-motion";

// ─── Transition Presets ──────────────────────────────

export const transitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } satisfies Transition,

  smooth: {
    type: "tween",
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,

  snappy: {
    type: "tween",
    duration: 0.3,
    ease: [0.65, 0, 0.35, 1],
  } satisfies Transition,

  slow: {
    type: "tween",
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
} as const;

// ─── Viewport Config ─────────────────────────────────

export const viewportConfig = {
  once: true,
  margin: "-100px",
} as const;

// ─── Variants ────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: transitions.slow,
  },
};

// ─── Container Variants (Stagger Children) ───────────

export function staggerContainer(
  staggerDelay = 0.1,
  delayChildren = 0,
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };
}

// ─── Hover / Tap Presets ─────────────────────────────

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.spring,
} as const;

export const hoverLift = {
  whileHover: { y: -4 },
  transition: transitions.smooth,
} as const;
