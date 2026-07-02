import { useAIContext } from "@/providers/ai-provider";

export function useChatStream() {
  const { streamingState, cancelGeneration, isGenerating } = useAIContext();

  return {
    streaming: isGenerating,
    cancel: cancelGeneration,
    progress: streamingState.currentText,
    status: streamingState.status,
    error: streamingState.error,
  };
}
