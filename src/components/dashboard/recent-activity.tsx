"use client";

import { EmptyState } from "@/components/shared/empty-state";

// ─── Component ───────────────────────────────────────

export function RecentActivity() {
  return (
    <EmptyState
      icon={
        <svg
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      title="No activity yet"
      description="Create your first memory to get started. Your recent activity will appear here."
    />
  );
}
