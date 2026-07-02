import { useProviderContext } from "@/providers/provider-provider";
import { useMemo } from "react";

export function useProviderStatistics() {
  const { statistics, usage, activeProviderId } = useProviderContext();

  const providerUsage = useMemo(() => {
    if (!activeProviderId) return [];
    return usage.filter((u) => u.providerId === activeProviderId);
  }, [usage, activeProviderId]);

  return {
    statistics,
    providerUsage,
  };
}
