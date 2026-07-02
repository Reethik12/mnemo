import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProviderStatistics } from "@/hooks/use-provider-statistics";
import { SectionHeader } from "@/components/shared/section-header";

export const ProviderStatistics = memo(function ProviderStatistics() {
  const { statistics } = useProviderStatistics();

  if (!statistics) return null;

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="Global Telemetry" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {statistics.totalProviders}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Providers
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-success text-xl font-bold">
            {statistics.activeProviders}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Active
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {statistics.totalModels}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Models
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {(statistics.totalUsage30d / 1000000).toFixed(1)}M
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Tokens (30d)
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            ${statistics.totalCost30d.toFixed(2)}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Cost (30d)
          </span>
        </div>
      </div>
    </GlassContainer>
  );
});
