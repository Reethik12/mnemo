import { LoadingIndicator } from "@/components/ui/loading-indicator";

export default function Loading() {
  return (
    <div className="bg-bg-primary flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-gradient">Mnemo</span>
      </div>
      <LoadingIndicator variant="dots" size="md" label="Loading Mnemo" />
    </div>
  );
}
