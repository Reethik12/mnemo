"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ARCHITECTURE_LAYERS } from "@/lib/constants";
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations";
import { PageContainer } from "@/components/layout/page-container";

// ─── Component ───────────────────────────────────────

export function ArchitecturePreview() {
  return (
    <PageContainer id="architecture">
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <span className="text-accent-purple text-xs font-medium tracking-[0.2em] uppercase">
            Architecture
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for the <span className="text-gradient">Future</span>
          </h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-2xl text-lg">
            Three layers working in harmony to create the world&apos;s most
            intelligent memory system.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="mx-auto max-w-3xl space-y-4">
          {ARCHITECTURE_LAYERS.map((layer, index) => (
            <motion.div
              key={layer.id}
              variants={fadeInUp}
              className="group relative"
            >
              {/* Connection line */}
              {index < ARCHITECTURE_LAYERS.length - 1 && (
                <div
                  className="absolute bottom-0 left-1/2 z-10 h-4 w-px -translate-x-1/2 translate-y-full"
                  aria-hidden="true"
                >
                  <div className="from-border animate-pulse-glow h-full w-full bg-gradient-to-b to-transparent" />
                </div>
              )}

              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl p-7",
                  "bg-gradient-to-r",
                  layer.gradient,
                  "border-border border",
                  "hover:border-border-hover transition-all duration-[var(--duration-normal)]",
                  "hover:shadow-card-hover",
                )}
              >
                {/* Layer number */}
                <div className="text-text-tertiary absolute top-5 right-6 font-mono text-xs">
                  L{ARCHITECTURE_LAYERS.length - index}
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <h3 className="text-text-primary text-lg font-semibold">
                      {layer.title}
                    </h3>
                    <p className="text-text-secondary mt-1 text-sm">
                      {layer.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          "text-text-secondary border-border border bg-white/5",
                          "group-hover:border-border-hover group-hover:text-text-primary",
                          "transition-all duration-[var(--duration-fast)]",
                        )}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
}
