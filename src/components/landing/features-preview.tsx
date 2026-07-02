"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { FEATURES } from "@/lib/constants";
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";

// ─── Icons ───────────────────────────────────────────

const featureIcons: Record<string, React.ReactNode> = {
  graph: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7.5 7.5l3 7.5m6-7.5l-3 7.5" />
    </svg>
  ),
  layers: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75L2.25 12l9.75 5.25 9.75-5.25-4.179-2.25m-11.142 0L12 6.75l5.571 3m-11.142 0L12 12.75l5.571-3"
      />
    </svg>
  ),
  connections: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  ),
  sparkle: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
      />
    </svg>
  ),
  lock: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
  code: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  ),
};

// ─── Component ───────────────────────────────────────

export function FeaturesPreview() {
  return (
    <PageContainer id="features">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <span className="text-accent-purple text-xs font-medium tracking-[0.2em] uppercase">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Memory that <span className="text-gradient">works for you</span>
          </h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-2xl text-lg">
            Built from the ground up to transform how you interact with
            knowledge and memories.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <motion.div key={feature.id} variants={fadeInUp}>
              <Card variant="glass" className="h-full">
                <div
                  className={cn(
                    "mb-4 flex h-11 w-11 items-center justify-center",
                    "bg-accent-purple/10 text-accent-purple rounded-xl",
                  )}
                >
                  {featureIcons[feature.iconKey]}
                </div>
                <h3 className="text-text-primary text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
}
