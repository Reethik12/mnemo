import { GlassContainer } from "@/components/shared/glass-container";
import { Skeleton } from "@/components/ui/skeleton";

export function ConversationLoading() {
  return (
    <div className="flex h-full w-full gap-6">
      <div className="flex w-64 shrink-0 flex-col gap-6">
        <GlassContainer className="flex flex-1 flex-col gap-4 p-4">
          <Skeleton className="mb-2 h-10 w-full" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </GlassContainer>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div className="grid shrink-0 grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <GlassContainer key={i} className="h-24 p-4">
              <Skeleton className="h-full w-full rounded-md" />
            </GlassContainer>
          ))}
        </div>

        <GlassContainer className="flex-1 p-6">
          <Skeleton className="mb-6 h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
