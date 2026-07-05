"use client";

import { motion } from "framer-motion";
import type { MemoryCollection } from "@/services/exchange/types";
import { fadeInUp } from "@/lib/animations";

export function CollectionHeader({
  collection,
}: {
  collection: MemoryCollection;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass glow-border relative overflow-hidden rounded-2xl p-8"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg className="h-48 w-48" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-text-primary text-3xl font-bold">
                {collection.title}
              </h1>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                v{collection.version}
              </span>
            </div>
            <p className="text-text-secondary">
              Published by{" "}
              <span className="font-medium text-white">
                {collection.author}
              </span>
              {collection.organization && ` for ${collection.organization}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-text-secondary flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {collection.visibility === "public" ? "Public" : "Private"}
            </span>
            <span className="text-text-secondary flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
              {collection.license}
            </span>
          </div>
        </div>

        <p className="text-text-primary max-w-3xl leading-relaxed">
          {collection.description}
        </p>

        <div className="text-text-secondary flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {collection.downloads.toLocaleString()}
            </span>{" "}
            Downloads
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {collection.forks.toLocaleString()}
            </span>{" "}
            Forks
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {collection.rating}
            </span>{" "}
            Rating
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {collection.memoryCount}
            </span>{" "}
            Memories
          </div>
        </div>
      </div>
    </motion.div>
  );
}
