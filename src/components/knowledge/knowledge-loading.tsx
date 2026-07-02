import { GlassContainer } from "@/components/shared/glass-container";
import { Skeleton } from "@/components/ui/skeleton";

export function KnowledgeLoading() {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="w-72 shrink-0">
        <GlassContainer className="flex h-full flex-col gap-6">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-32 w-full rounded-full" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="flex-1 overflow-hidden">
        <GlassContainer className="flex h-full flex-col gap-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>

          <div className="flex flex-1 gap-4">
            <div className="flex flex-1 flex-col gap-4">
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <div className="flex w-1/3 flex-col gap-4">
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
