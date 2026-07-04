"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { MODULE_CARDS } from "@/lib/constants";

export default function TimelinePage() {
  const moduleData = MODULE_CARDS.find((m) => m.id === "time-machine")!;

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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-text-primary text-2xl font-bold tracking-tight">
                {moduleData.title}
              </h1>
            </div>
            <p className="text-text-secondary mt-1">{moduleData.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
