import { memo } from "react";
import { useAI } from "@/hooks/use-ai";
import { StatusPill } from "@/components/shared/status-pill";
import { ProviderStatus } from "@/types/ai";

export const AIStatus = memo(function AIStatus() {
  const { selectedProvider, selectedModel, isGenerating } = useAI();

  if (!selectedProvider || !selectedModel) return null;

  const getStatusColor = (status: ProviderStatus, isGenerating: boolean) => {
    if (isGenerating) return "active";
    switch (status) {
      case "connected":
        return "active";
      case "validating":
        return "beta";
      default:
        return "inactive";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span className="text-text-primary text-xs font-medium">
          {selectedProvider.name}
        </span>
        <span className="text-text-muted text-[10px]">
          {selectedModel.name}
        </span>
      </div>
      <StatusPill
        status={getStatusColor(selectedProvider.status, isGenerating)}
      />
      <div className="text-text-muted text-[10px]">
        {selectedProvider.health.latencyMs}ms
      </div>
    </div>
  );
});
