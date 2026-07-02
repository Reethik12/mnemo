import { memo } from "react";
import { useAIModel } from "@/hooks/use-ai-model";

export const AIProviderSelector = memo(function AIProviderSelector() {
  const { availableProviders, selectedProvider, switchProvider } = useAIModel();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-text-secondary text-xs">Provider</label>
      <select
        value={selectedProvider?.id || ""}
        onChange={(e) => switchProvider(e.target.value)}
        className="bg-bg-secondary border-border-subtle text-text-primary focus:border-primary w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none"
      >
        <option value="" disabled>
          Select a provider...
        </option>
        {availableProviders.map((provider) => (
          <option key={provider.id} value={provider.id}>
            {provider.name} {provider.isLocal ? "(Local)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
});
