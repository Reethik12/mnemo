"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { FAQ_ITEMS, KEYBOARD_SHORTCUTS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassContainer } from "@/components/shared/glass-container";
import { Card } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <SectionHeader
        title="Help Center"
        description="Learn how to use Mnemo and find answers to common questions."
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Quick Links */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <Card variant="glass" className="p-6">
            <h3 className="text-text-primary mb-2 text-lg font-semibold">
              Documentation
            </h3>
            <p className="text-text-tertiary mb-4 text-sm">
              Read our comprehensive guides and tutorials.
            </p>
            <span className="text-accent-purple-light cursor-not-allowed text-sm font-medium opacity-50">
              Coming Soon →
            </span>
          </Card>
          <Card variant="glass" className="p-6">
            <h3 className="text-text-primary mb-2 text-lg font-semibold">
              Contact Support
            </h3>
            <p className="text-text-tertiary mb-4 text-sm">
              Get help from our dedicated support team.
            </p>
            <span className="text-accent-purple-light cursor-not-allowed text-sm font-medium opacity-50">
              Coming Soon →
            </span>
          </Card>
        </motion.div>

        {/* Keyboard Shortcuts */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-text-primary mb-6 text-xl font-bold">
            Keyboard Shortcuts
          </h3>
          <GlassContainer className="overflow-hidden p-0">
            <div className="divide-border divide-y">
              {KEYBOARD_SHORTCUTS.map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <span className="text-text-primary text-sm font-medium">
                    {shortcut.description}
                  </span>
                  <div className="flex gap-1.5">
                    {shortcut.keys.map((k) => (
                      <kbd
                        key={k}
                        className="bg-surface border-border text-text-secondary flex h-6 min-w-[24px] items-center justify-center rounded border px-1.5 font-mono text-xs font-medium"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassContainer>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-text-primary mb-6 text-xl font-bold">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <GlassContainer key={item.id} className="p-5">
                <h4 className="text-text-primary mb-2 text-base font-semibold">
                  {item.question}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.answer}
                </p>
              </GlassContainer>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
