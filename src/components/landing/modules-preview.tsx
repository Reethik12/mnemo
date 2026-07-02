"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { MODULES, type ModuleInfo } from "@/lib/constants";
import { staggerContainer, fadeInUp, viewportConfig } from "@/lib/animations";
import { PageContainer } from "@/components/layout/page-container";

// ─── Module Icons ────────────────────────────────────

const moduleIcons: Record<string, React.ReactNode> = {
  network: (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 7v3.5M10.5 13l-4 4.5M13.5 13l4 4.5" />
    </svg>
  ),
  brain: (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.136a9 9 0 01-3.126 0l-.772-.136c-1.717-.293-2.3-2.379-1.067-3.61L15.8 15.3m-11.6-.8l-1.402 1.402C1.566 17.134 2.148 19.22 3.865 19.513l.772.136a9 9 0 003.126 0l.772-.136c1.717-.293 2.3-2.379 1.067-3.61L8.2 14.5"
      />
    </svg>
  ),
  share: (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.5 13.2l7 4.3M15.5 6.2l-7 4.3" />
    </svg>
  ),
  clock: (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path strokeLinecap="round" d="M20.5 4.5l-2 2M3.5 4.5l2 2" />
    </svg>
  ),
  shield: (
    <svg
      className="h-8 w-8"
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
  ),
};

// ─── Module Card ─────────────────────────────────────

function ModuleCard({ module }: { module: ModuleInfo }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{
        y: -6,
        transition: { type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-7",
          "bg-surface border-border border",
          "transition-all duration-[var(--duration-normal)]",
          "hover:border-border-hover hover:shadow-card-hover",
        )}
      >
        {/* Hover glow */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100",
            "transition-opacity duration-[var(--duration-slow)]",
          )}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${module.glowColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Animated border gradient */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
            "transition-opacity duration-[var(--duration-slow)]",
          )}
          aria-hidden="true"
        >
          <div
            className="absolute inset-[-1px] rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${module.glowColor}, transparent, ${module.glowColor})`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div
            className={cn(
              "mb-5 flex h-14 w-14 items-center justify-center",
              "rounded-2xl bg-gradient-to-br",
              module.gradient,
              "text-white shadow-lg",
            )}
          >
            {moduleIcons[module.iconKey]}
          </div>
          <h3 className="text-text-primary text-xl font-semibold">
            {module.title}
          </h3>
          <p className="text-text-secondary mt-3 text-sm leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Component ───────────────────────────────────────

export function ModulesPreview() {
  return (
    <PageContainer id="modules" className="bg-bg-secondary/50">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <span className="text-accent-cyan text-xs font-medium tracking-[0.2em] uppercase">
            Core Modules
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Five Pillars of <span className="text-gradient">Memory</span>
          </h2>
          <p className="text-text-secondary mx-auto mt-4 max-w-2xl text-lg">
            Each module represents a fundamental capability of the Mnemo
            operating system.
          </p>
        </motion.div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.slice(0, 3).map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {MODULES.slice(3).map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
}
