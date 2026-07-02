"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GlassContainer } from "@/components/shared/glass-container";

export function MemoryLoading() {
  return (
    <div className="bg-border/50 flex h-full w-full gap-px">
      {/* Sidebar List Skeleton */}
      <div className="bg-bg-primary flex w-[320px] shrink-0 flex-col space-y-4 p-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="space-y-2 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <GlassContainer key={i} className="h-24 p-3">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="mb-3 h-3 w-1/2" />
              <Skeleton className="h-3 w-1/4" />
            </GlassContainer>
          ))}
        </div>
      </div>

      {/* Editor Skeleton */}
      <div className="bg-bg-primary flex-1 space-y-6 p-8">
        <Skeleton className="h-12 w-1/2" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Inspector Skeleton (Desktop Only) */}
      <div className="bg-bg-primary border-border/50 hidden w-[340px] shrink-0 flex-col space-y-6 border-l p-6 lg:flex">
        <Skeleton className="mb-4 h-6 w-1/2" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton className="mb-2 h-3 w-1/4" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
