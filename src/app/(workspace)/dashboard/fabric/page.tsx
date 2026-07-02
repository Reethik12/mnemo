"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { ComingSoonBadge } from "@/components/shared/coming-soon-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { MODULE_CARDS } from "@/lib/constants";

export default function FabricPage() {
  const router = useRouter();
  const moduleData = MODULE_CARDS.find((m) => m.id === "memory-fabric")!;

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
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
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
          className="border-accent-purple/20 relative overflow-hidden"
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
                className="text-accent-purple h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            }
            title="Building the Fabric"
            description="The Universal Memory Fabric is currently in development. It will provide a unified knowledge graph connecting all your memories."
            actionLabel="Return to Dashboard"
            onAction={() => router.push("/dashboard")}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
