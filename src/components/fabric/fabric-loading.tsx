import { GlassContainer } from "@/components/shared/glass-container";
import { Skeleton } from "@/components/ui/skeleton";

export function FabricLoading() {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="w-64 shrink-0">
        <GlassContainer className="flex h-full flex-col gap-4">
          <Skeleton className="h-8 w-1/2" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="flex-1 overflow-hidden">
        <GlassContainer className="flex h-full flex-col gap-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
