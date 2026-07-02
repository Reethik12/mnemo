import { memo } from "react";
import { useAI } from "@/hooks/use-ai";

export const TokenCounter = memo(function TokenCounter() {
  const { tokenUsage } = useAI();

  if (!tokenUsage) return null;

  return (
    <div className="text-text-muted flex gap-4 text-[10px]">
      <div className="flex flex-col">
        <span className="tracking-wider uppercase opacity-60">Prompt</span>
        <span className="text-text-primary font-medium">
          {tokenUsage.promptTokens.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="tracking-wider uppercase opacity-60">Completion</span>
        <span className="text-text-primary font-medium">
          {tokenUsage.completionTokens.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="tracking-wider uppercase opacity-60">Total</span>
        <span className="text-text-primary font-medium">
          {tokenUsage.totalTokens.toLocaleString()}
        </span>
      </div>
      {tokenUsage.estimatedCostUsd !== undefined && (
        <div className="border-border-subtle ml-2 flex flex-col border-l pl-4">
          <span className="tracking-wider uppercase opacity-60">Est. Cost</span>
          <span className="text-primary font-medium">
            ${tokenUsage.estimatedCostUsd.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  );
});
