"use client";

import { usePromptContext } from "@/providers/prompt-provider";
import { PromptLoading } from "@/components/prompt/prompt-loading";
import { PromptBuilder } from "@/components/prompt/prompt-builder";
import { PromptPreview } from "@/components/prompt/prompt-preview";
import { ContextWindow } from "@/components/prompt/context-window";
import { ContextPreview } from "@/components/prompt/context-preview";
import { TokenEstimator } from "@/components/prompt/token-estimator";
import { PromptTemplateList } from "@/components/prompt/prompt-template-list";
import { PromptHistory } from "@/components/prompt/prompt-history";
import { PromptStatistics } from "@/components/prompt/prompt-statistics";
import { PromptActions } from "@/components/prompt/prompt-actions";

export default function PromptPage() {
  const { loading, error } = usePromptContext();

  if (loading) return <PromptLoading />;

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <span className="mb-4 text-4xl">⚠️</span>
          <h2 className="text-error mb-2 text-lg font-semibold">
            Failed to load Prompt Engine
          </h2>
          <p className="text-text-secondary text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in flex h-full w-full gap-6 overflow-hidden p-6 duration-500">
      <div className="custom-scrollbar flex h-full w-80 shrink-0 flex-col gap-6 overflow-y-auto pr-2">
        <PromptTemplateList />
        <ContextWindow />
      </div>

      <div className="flex h-full flex-1 flex-col gap-6 overflow-hidden">
        <div className="shrink-0">
          <PromptStatistics />
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <PromptBuilder />
            <ContextPreview />
            <PromptActions />
          </div>

          <div className="flex w-80 shrink-0 flex-col gap-6 overflow-hidden">
            <div className="shrink-0">
              <TokenEstimator />
            </div>
            <PromptPreview />
            <div className="shrink-0">
              <PromptHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
