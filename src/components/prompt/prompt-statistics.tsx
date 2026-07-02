import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { usePromptContext } from "@/providers/prompt-provider";
import { SectionHeader } from "@/components/shared/section-header";

export const PromptStatistics = memo(function PromptStatistics() {
  const { statistics } = usePromptContext();

  if (!statistics) return null;

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="Prompt Statistics" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {statistics.totalTemplates}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Templates
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {statistics.totalExecutions}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Executions
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {statistics.favoriteTemplates}
          </span>
          <span className="text-warning text-[10px] tracking-wider uppercase">
            Favorites
          </span>
        </div>
        <div className="bg-bg-secondary border-border-subtle flex flex-col items-center justify-center gap-1 rounded-md border p-3 text-center">
          <span className="text-text-primary text-xl font-bold">
            {statistics.averageTokensUsed}
          </span>
          <span className="text-text-muted text-[10px] tracking-wider uppercase">
            Avg Tokens
          </span>
        </div>
      </div>
    </GlassContainer>
  );
});
