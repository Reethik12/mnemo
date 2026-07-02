"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Card } from "@/components/ui/card";
import { ComingSoonBadge } from "@/components/shared/coming-soon-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { MODULE_CARDS } from "@/lib/constants";

export default function PermissionsPage() {
  const router = useRouter();
  const moduleData = MODULE_CARDS.find((m) => m.id === "permissions-twin")!;

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
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
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
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            }
            title="Securing the Twin"
            description="Permissions & Digital Twin is coming soon. You'll gain complete ownership over your memory and AI representations."
            actionLabel="Return to Dashboard"
            onAction={() => router.push("/dashboard")}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
