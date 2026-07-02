import { memo } from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { usePromptHistory } from "@/hooks/use-prompt-history";
import { SectionHeader } from "@/components/shared/section-header";

export const PromptHistory = memo(function PromptHistory() {
  const { history } = usePromptHistory();

  return (
    <GlassContainer className="flex flex-col gap-4 p-4">
      <SectionHeader title="Recent Executions" />
      <div className="custom-scrollbar flex max-h-80 flex-col gap-2 overflow-y-auto">
        {history.slice(0, 10).map((hist) => (
          <div
            key={hist.id}
            className="bg-bg-secondary border-border-subtle hover:bg-bg-tertiary flex cursor-pointer flex-col gap-1 rounded-md border p-3 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-text-primary text-xs font-semibold">
                {hist.execution.modelId}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${hist.execution.success ? "bg-success/20 text-success" : "bg-error/20 text-error"}`}
              >
                {hist.execution.success ? "Success" : "Failed"}
              </span>
            </div>
            <span className="text-text-secondary line-clamp-1 text-xs">
              {hist.execution.prompt.content}
            </span>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-text-muted text-[10px]">
                {new Date(hist.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-text-muted bg-bg-primary border-border-subtle rounded border px-1.5 text-[10px]">
                {hist.execution.tokens.totalTokens} tkns
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassContainer>
  );
});
