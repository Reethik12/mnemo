import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { useTokenEstimator } from "@/hooks/use-token-estimator";
import { SectionHeader } from "@/components/shared/section-header";

export const TokenEstimator = memo(function TokenEstimator() {
  const { estimate } = useTokenEstimator();

  if (!estimate) return null;

  return (
    <GlassContainer className="flex flex-col gap-3 p-4">
      <SectionHeader title="Token Estimate" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Prompt Tokens</span>
          <span className="text-text-primary font-medium">
            {estimate.promptTokens}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Context Tokens</span>
          <span className="text-text-primary font-medium">
            {estimate.contextTokens}
          </span>
        </div>
        <div className="bg-border-subtle my-1 h-px" />
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-text-primary">Total Tokens</span>
          <span
            className={
              estimate.isOverLimit ? "text-error" : "text-text-primary"
            }
          >
            {estimate.totalTokens} / {estimate.maxTokens}
          </span>
        </div>
        <div className="bg-bg-secondary mt-2 h-2 w-full overflow-hidden rounded-full">
          <div
            className={`h-full ${estimate.isOverLimit ? "bg-error" : "bg-primary"}`}
            style={{ width: `${Math.min(100, estimate.percentageUsed)}%` }}
          />
        </div>
      </div>
    </GlassContainer>
  );
});
