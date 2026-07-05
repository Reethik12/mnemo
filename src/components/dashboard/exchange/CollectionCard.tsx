"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MemoryCollection } from "@/services/exchange/types";

export function CollectionCard({
  collection,
}: {
  collection: MemoryCollection;
}) {
  return (
    <Link href={`/dashboard/exchange/${collection.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass glow-border group relative flex h-full flex-col gap-4 rounded-2xl p-5 transition-all hover:bg-white/10"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-text-primary text-lg font-semibold">
              {collection.title}
            </h3>
            <p className="text-text-secondary text-xs">
              by {collection.author}{" "}
              {collection.organization && `• ${collection.organization}`}
            </p>
          </div>
          {collection.isTrending && (
            <span className="bg-accent-blue/10 text-accent-blue border-accent-blue/20 flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              Trending
            </span>
          )}
        </div>

        <p className="text-text-secondary line-clamp-2 flex-grow text-sm">
          {collection.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {collection.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-text-secondary rounded-md bg-white/5 px-2 py-1 text-xs"
            >
              #{tag}
            </span>
          ))}
          {collection.tags.length > 3 && (
            <span className="text-text-secondary rounded-md bg-white/5 px-2 py-1 text-xs">
              +{collection.tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="text-text-secondary flex gap-4 text-xs">
            <div className="flex items-center gap-1">
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {collection.downloads}
            </div>
            <div className="flex items-center gap-1">
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
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              {collection.forks}
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {collection.rating}
            </div>
          </div>
          <span className="text-text-secondary text-xs">
            {collection.memoryCount} Memories
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
