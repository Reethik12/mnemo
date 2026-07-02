import { useProviderContext } from "@/providers/provider-provider";
import { useMemo } from "react";

export function useProvider() {
  const { providers, activeProviderId, setActiveProvider } =
    useProviderContext();

  const activeProvider = useMemo(
    () => providers.find((p) => p.id === activeProviderId) || null,
    [providers, activeProviderId],
  );

  return {
    providers,
    activeProvider,
    activeProviderId,
    setActiveProvider,
  };
}
