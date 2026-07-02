"use client";

import { motion } from "framer-motion";
import { fadeInUp, scaleIn, viewportConfig } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { GradientMesh } from "@/components/effects/gradient-mesh";
import { GlowOrbs } from "@/components/effects/glow-orbs";

// ─── Component ───────────────────────────────────────

export function CTASection() {
  return (
    <div className="relative overflow-hidden">
      <GradientMesh />
      <GlowOrbs />

      <PageContainer narrow>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="py-8 text-center lg:py-16"
        >
          <motion.h2
            variants={scaleIn}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            Ready to remember <span className="text-gradient">everything</span>?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-text-secondary mx-auto mt-6 max-w-xl text-lg leading-relaxed"
          >
            Join the future of memory. Start building your living knowledge
            graph today.
          </motion.p>

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
              Get Started — Free
            </Button>
            <Button variant="secondary" size="lg">
              View Documentation
            </Button>
          </motion.div>
        </motion.div>
      </PageContainer>
    </div>
  );
}
