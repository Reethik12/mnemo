import { memo, useEffect } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useProviderHealth } from "@/hooks/use-provider-health";
import { SectionHeader } from "@/components/shared/section-header";

interface ProviderHealthProps {
  providerId: string;
}

export const ProviderHealth = memo(function ProviderHealth({
  providerId,
}: ProviderHealthProps) {
  const { health, refresh } = useProviderHealth(providerId);

  useEffect(() => {
    refresh();
  }, [providerId, refresh]);

  if (!health) return null;

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="System Health" />
        <button
          onClick={refresh}
          className="text-text-muted hover:text-text-primary text-[10px] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Latency (avg)</span>
          <span className="text-text-primary font-medium">
            {health.latency.averageMs}ms
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Error Rate</span>
          <span className="text-text-primary font-medium">
            {(health.errorRate * 100).toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Uptime</span>
          <span className="text-text-primary font-medium">
            {health.uptime}%
          </span>
        </div>
      </div>
    </GlassContainer>
  );
});
