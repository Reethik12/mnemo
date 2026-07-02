import { Skeleton } from "@/components/ui/skeleton";
import { GlassContainer } from "@/components/shared/glass-container";

export default function WorkspaceLoading() {
  return (
    <div className="space-y-8">
      {/* Banner Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <GlassContainer key={i} className="p-5">
            <div className="flex justify-between">
              <div className="space-y-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </GlassContainer>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (Modules) */}
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <GlassContainer key={i} className="h-40">
                <span className="sr-only">Loading module</span>
              </GlassContainer>
            ))}
          </div>
        </div>

        {/* Right Column (Quick Actions) */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <GlassContainer key={i} className="h-16">
                <span className="sr-only">Loading action</span>
              </GlassContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
