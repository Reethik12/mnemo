import { GlassContainer } from "@/components/shared/glass-container";
import { Skeleton } from "@/components/ui/skeleton";

export function RelationshipLoading() {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="flex w-64 shrink-0 flex-col gap-6">
        <GlassContainer className="flex flex-col gap-4 p-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="mt-2 h-10 w-full" />
        </GlassContainer>
        <GlassContainer className="flex-1 p-4">
          <Skeleton className="mb-4 h-6 w-1/2" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <GlassContainer className="h-32 p-4">
          <Skeleton className="mb-4 h-6 w-1/4" />
          <div className="flex h-full items-center justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-24" />
            ))}
          </div>
        </GlassContainer>
        <GlassContainer className="flex-1 p-4">
          <Skeleton className="mb-6 h-6 w-1/4" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
