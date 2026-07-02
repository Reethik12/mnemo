import { memo } from "react";
import { useAIModel } from "@/hooks/use-ai-model";

export const AIModelSelector = memo(function AIModelSelector() {
  const { availableModels, selectedProvider, selectedModel, switchModel } =
    useAIModel();

  if (!selectedProvider) return null;

  const providerModels = availableModels.filter(
    (m) => m.providerId === selectedProvider.id,
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-text-secondary text-xs">Model</label>
      <select
        value={selectedModel?.id || ""}
        onChange={(e) => switchModel(e.target.value)}
        className="bg-bg-secondary border-border-subtle text-text-primary focus:border-primary w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none"
      >
        <option value="" disabled>
          Select a model...
        </option>
        {providerModels.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
});
