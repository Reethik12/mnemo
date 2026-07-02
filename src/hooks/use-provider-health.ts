import { useProviderContext } from "@/providers/provider-provider";
import { useMemo } from "react";

export function useProviderHealth(providerId: string | null) {
  const { healthStatus, checkHealth } = useProviderContext();

  const health = useMemo(() => {
    if (!providerId) return null;
    return healthStatus[providerId] || null;
  }, [healthStatus, providerId]);

  const refresh = () => {
    if (providerId) {
      checkHealth(providerId);
    }
  };

  return {
    health,
    refresh,
  };
}
