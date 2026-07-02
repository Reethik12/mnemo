import { GlassContainer } from "@/components/shared/glass-container";
import { Skeleton } from "@/components/ui/skeleton";

export function AILoading() {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="flex w-64 shrink-0 flex-col gap-6">
        <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
          <Skeleton className="mb-4 h-6 w-3/4" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <GlassContainer className="flex h-16 items-center justify-between p-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-32" />
        </GlassContainer>

        <GlassContainer className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <Skeleton className="h-24 w-3/4 rounded-xl" />
          </div>
          <div className="flex flex-row-reverse gap-4 self-end">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <Skeleton className="h-16 w-1/2 rounded-xl" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <Skeleton className="h-32 w-5/6 rounded-xl" />
          </div>
        </GlassContainer>

        <GlassContainer className="h-24 p-4">
          <Skeleton className="h-full w-full rounded-lg" />
        </GlassContainer>
      </div>
    </div>
  );
}
