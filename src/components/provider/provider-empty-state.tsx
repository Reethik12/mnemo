import { EmptyState } from "@/components/shared/empty-state";
import { memo } from "react";

export const ProviderEmptyState = memo(function ProviderEmptyState() {
  return (
    <div className="animate-in fade-in flex h-full flex-col items-center justify-center duration-500">
      <EmptyState
        title="No Providers Configured"
        description="Select a provider from the list to view its models and capabilities."
        actionLabel="View Local Models"
      />
    </div>
  );
});
