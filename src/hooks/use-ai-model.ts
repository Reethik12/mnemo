import { useAIContext } from "@/providers/ai-provider";

export function useAIModel() {
  const {
    availableProviders,
    availableModels,
    selectedProvider,
    selectedModel,
    switchProvider,
    switchModel,
  } = useAIContext();

  return {
    availableProviders,
    availableModels,
    selectedProvider,
    selectedModel,
    switchProvider,
    switchModel,
    metadata: selectedModel,
    contextWindow: selectedModel?.contextWindow,
    capabilities: selectedModel?.capabilities || [],
  };
}
