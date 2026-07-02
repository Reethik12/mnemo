"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants";
import { staggerContainer, fadeInUp, transitions } from "@/lib/animations";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/effects/aurora";
import { AnimatedGrid } from "@/components/effects/animated-grid";
import { Particles } from "@/components/effects/particles";
import { NoiseTexture } from "@/components/effects/noise-texture";

// ─── Component ───────────────────────────────────────

export function Hero() {
  const { normalizedX, normalizedY } = useMousePosition();

  // Subtle parallax offset based on mouse position
  const offsetX = (normalizedX - 0.5) * 20;
  const offsetY = (normalizedY - 0.5) * 20;

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Effects */}
      <Aurora />
      <AnimatedGrid />
      <Particles count={12} />
      <NoiseTexture />

      {/* Mouse-tracking glow */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full"
        animate={{
          x: offsetX * 3,
          y: offsetY * 3,
        }}
        transition={{ type: "tween", duration: 1.5, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(109, 91, 255, 0.08) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer(0.15, 0.3)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8"
      >
        {/* Overline */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5",
              "rounded-full text-xs font-medium tracking-wide",
              "glass text-text-secondary",
            )}
          >
            <span className="bg-accent-purple animate-pulse-glow h-1.5 w-1.5 rounded-full" />
            Powered by Cognee Cloud
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span className="text-text-primary block">The</span>
          <span className="text-gradient block">
            {SITE.tagline.replace("The ", "")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className={cn(
            "text-text-secondary mx-auto mt-8 max-w-2xl text-lg leading-relaxed",
            "sm:text-xl",
          )}
        >
          Unlike ChatGPT memory or NotebookLM, Mnemo creates a persistent memory
          fabric that grows with you across applications, devices, AI agents and
          time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            variant="primary"
            size="lg"
            rightIcon={
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            }
          >
            Get Started
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, ...transitions.slow }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-text-tertiary flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
