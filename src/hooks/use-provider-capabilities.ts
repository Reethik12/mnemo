import { useProviderContext } from "@/providers/provider-provider";
import { useMemo } from "react";

export function useProviderCapabilities(providerId: string | null) {
  const { providers } = useProviderContext();

  const capabilities = useMemo(() => {
    if (!providerId) return null;
    const provider = providers.find((p) => p.id === providerId);
    return provider?.capabilities || null;
  }, [providers, providerId]);

  return {
    capabilities,
  };
}
