import { GlassContainer } from "@/components/shared/glass-container";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptLoading() {
  return (
    <div className="flex h-full w-full gap-6 p-6">
      <div className="flex h-full w-80 shrink-0 flex-col gap-6">
        <GlassContainer className="flex h-1/2 flex-col gap-4 p-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </GlassContainer>
        <GlassContainer className="flex h-1/2 flex-col gap-4 p-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="flex h-full flex-1 flex-col gap-6">
        <div className="grid shrink-0 grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GlassContainer key={i} className="h-24 p-4">
              <Skeleton className="h-full w-full" />
            </GlassContainer>
          ))}
        </div>

        <div className="flex flex-1 gap-6">
          <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="w-full flex-1" />
            <Skeleton className="h-10 w-full" />
          </GlassContainer>
          <div className="flex w-72 shrink-0 flex-col gap-6">
            <GlassContainer className="h-48 p-4">
              <Skeleton className="h-full w-full" />
            </GlassContainer>
            <GlassContainer className="flex-1 p-4">
              <Skeleton className="h-full w-full" />
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
