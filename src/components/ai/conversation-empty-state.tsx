import { EmptyState } from "@/components/shared/empty-state";
import { memo } from "react";
import { useAIModel } from "@/hooks/use-ai-model";

export const ConversationEmptyState = memo(function ConversationEmptyState() {
  const { selectedModel, selectedProvider } = useAIModel();

  return (
    <div className="animate-in fade-in zoom-in-95 flex h-full flex-col justify-center duration-500">
      <EmptyState
        title={`Chat with ${selectedModel?.name || "AI"}`}
        description={`Powered by ${selectedProvider?.name || "the local engine"}. The AI core is ready to assist you with reasoning, semantic analysis, and general tasks.`}
        actionLabel="Send a message to begin"
      />
    </div>
  );
});
