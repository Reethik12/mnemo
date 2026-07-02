"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { PageContainer } from "@/components/layout/page-container";
import { GlowOrbs } from "@/components/effects/glow-orbs";

// ─── Component ───────────────────────────────────────

export function VisionSection() {
  return (
    <div className="relative overflow-hidden" id="vision">
      <GlowOrbs />

      <PageContainer narrow>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="py-8 text-center lg:py-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-accent-purple-light text-xs font-medium tracking-[0.2em] uppercase"
          >
            Our Vision
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="mt-8 text-3xl leading-snug font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            Mnemo doesn&apos;t store files.
            <br />
            <span className="text-gradient">It stores understanding.</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-text-secondary mx-auto mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl"
          >
            We believe the next paradigm of computing is not about managing data
            — it&apos;s about building a living, breathing fabric of knowledge
            that evolves with you. Memory should be ambient, intelligent, and
            entirely yours.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-12 flex justify-center">
            <div className="flex items-center gap-3">
              {["Persistent", "Intelligent", "Private", "Yours"].map(
                (word, i) => (
                  <span
                    key={word}
                    className="glass text-text-secondary rounded-full px-4 py-1.5 text-sm font-medium"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {word}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </PageContainer>
    </div>
  );
}
