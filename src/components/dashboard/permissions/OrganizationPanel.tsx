"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function OrganizationPanel() {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border space-y-4 rounded-2xl bg-white/5 p-8 text-center"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
        <svg
          className="text-accent-purple h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white">
        Workspace & Organization
      </h3>
      <p className="text-text-secondary mx-auto max-w-lg">
        Manage teams, assign memory spaces across departments, and transfer
        ownership. This feature is currently limited in the local environment.
      </p>
      <button className="mt-8 rounded-xl bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/20">
        Manage Workspace (Mock)
      </button>
    </motion.div>
  );
}
