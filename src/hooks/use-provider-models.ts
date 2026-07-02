import { useProviderContext } from "@/providers/provider-provider";
import { useMemo } from "react";

export function useProviderModels(providerId: string | null) {
  const { models, activeModelId, setActiveModel } = useProviderContext();

  const providerModels = useMemo(() => {
    if (!providerId) return [];
    return models.filter((m) => m.providerId === providerId);
  }, [models, providerId]);

  const activeModel = useMemo(() => {
    return models.find((m) => m.id === activeModelId) || null;
  }, [models, activeModelId]);

  return {
    models: providerModels,
    activeModelId,
    activeModel,
    setActiveModel,
  };
}
