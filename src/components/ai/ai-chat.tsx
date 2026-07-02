import { memo } from "react";
import { AIChatLayout } from "./ai-chat-layout";
import { useAI } from "@/hooks/use-ai";
import { AILoading } from "./ai-loading";
import { GlassContainer } from "@/components/shared/glass-container";

export const AIChat = memo(function AIChat() {
  const { loadingState, errorState } = useAI();

  if (loadingState) {
    return <AILoading />;
  }

  if (errorState) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <GlassContainer className="border-error/20 bg-error/5 flex max-w-md flex-col items-center p-8 text-center">
          <span className="mb-4 text-4xl">⚠️</span>
          <h2 className="text-error mb-2 text-lg font-semibold">
            Core Initialization Failed
          </h2>
          <p className="text-text-secondary text-sm">{errorState}</p>
        </GlassContainer>
      </div>
    );
  }

  return <AIChatLayout />;
});
