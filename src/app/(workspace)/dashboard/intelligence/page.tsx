"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { ComingSoonBadge } from "@/components/shared/coming-soon-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { MODULE_CARDS } from "@/lib/constants";

export default function IntelligencePage() {
  const router = useRouter();
  const moduleData = MODULE_CARDS.find((m) => m.id === "living-intelligence")!;

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl space-y-8"
    >
      <motion.div variants={fadeInUp}>
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${moduleData.gradient} text-white shadow-lg`}
          >
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
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-text-primary text-2xl font-bold tracking-tight">
                {moduleData.title}
              </h1>
              <ComingSoonBadge />
            </div>
            <p className="text-text-secondary mt-1">{moduleData.description}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card
          variant="glass"
          className="border-accent-purple-light/20 relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at top right, ${moduleData.glowColor}, transparent 50%)`,
            }}
            aria-hidden="true"
          />
          <EmptyState
            icon={
              <svg
                className="text-accent-purple-light h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            }
            title="Awakening Intelligence"
            description="Living Intelligence is currently in training. It will soon provide deep reasoning across your entire memory graph."
            actionLabel="Return to Dashboard"
            onAction={() => router.push("/dashboard")}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
