"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { MemorySpace } from "@/services/permissions/types";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function SpacesList({
  spaces,
  isLoading,
}: {
  spaces: MemorySpace[];
  isLoading: boolean;
}) {
  const { generateShareLink } = usePermissions();
  const { success } = useToast();
  const router = useRouter();

  const handleShare = async (space: MemorySpace) => {
    const link = await generateShareLink(space.id, "viewer");
    if (link) {
      await navigator.clipboard.writeText(link.url);
      success("✓ Link copied to clipboard");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass h-48 animate-pulse rounded-2xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {spaces.map((space) => (
        <div
          key={space.id}
          className="glass glow-border group relative flex flex-col justify-between rounded-2xl bg-white/5 p-6 transition-colors hover:bg-white/10"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="group-hover:text-accent-purple text-xl font-bold text-white transition-colors">
                {space.name}
              </h3>
              <span className="text-text-secondary rounded-full border border-white/5 bg-white/10 px-3 py-1 text-xs capitalize">
                {space.visibility.replace("_", " ")}
              </span>
            </div>
            <p className="text-text-secondary mb-6 line-clamp-2 text-sm">
              {space.description}
            </p>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="text-text-secondary mb-4 flex items-center justify-between text-xs">
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
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                {space.memoryCount} Memories
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
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {space.memberCount} Members
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleShare(space)}
                className="flex-1 rounded-xl bg-white/10 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Share Space
              </button>
              {space.visibility !== "private" && (
                <button
                  onClick={() => router.push(`/dashboard/messages/${space.id}`)}
                  className="bg-accent-purple/20 text-accent-purple-light hover:bg-accent-purple/40 flex-1 rounded-xl py-2 text-sm font-medium transition-colors"
                >
                  Conversation
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
