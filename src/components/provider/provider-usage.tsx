import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProviderStatistics } from "@/hooks/use-provider-statistics";
import { SectionHeader } from "@/components/shared/section-header";

export const ProviderUsage = memo(function ProviderUsage() {
  const { providerUsage } = useProviderStatistics();

  if (!providerUsage || providerUsage.length === 0) return null;

  const totalCost = providerUsage.reduce((acc, u) => acc + u.estimatedCost, 0);
  const totalTokens = providerUsage.reduce(
    (acc, u) => acc + u.inputTokens + u.outputTokens,
    0,
  );

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="30-Day Usage" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Estimated Cost</span>
          <span className="text-text-primary font-medium">
            ${totalCost.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Total Tokens</span>
          <span className="text-text-primary font-medium">
            {totalTokens.toLocaleString()}
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle mt-2 flex h-20 w-full items-end gap-1 rounded-md border p-2">
          {/* Mock bar chart */}
          {providerUsage.slice(0, 15).map((usage, i) => {
            const height = Math.max(
              10,
              Math.min(100, (usage.totalRequests / 300) * 100),
            );
            return (
              <div
                key={i}
                className="bg-primary/60 hover:bg-primary flex-1 cursor-pointer rounded-t-sm transition-colors"
                style={{ height: `${height}%` }}
                title={`Requests: ${usage.totalRequests}`}
              />
            );
          })}
        </div>
      </div>
    </GlassContainer>
  );
});
