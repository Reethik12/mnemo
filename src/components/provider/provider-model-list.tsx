import { memo } from "react";
import { useProviderModels } from "@/hooks/use-provider-models";
import { ProviderModelCard } from "./provider-model-card";

interface ProviderModelListProps {
  providerId: string;
}

export const ProviderModelList = memo(function ProviderModelList({
  providerId,
}: ProviderModelListProps) {
  const { models, activeModelId, setActiveModel } =
    useProviderModels(providerId);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {models.map((model) => (
        <ProviderModelCard
          key={model.id}
          model={model}
          isActive={activeModelId === model.id}
          onClick={() => setActiveModel(model.id)}
        />
      ))}
    </div>
  );
});
