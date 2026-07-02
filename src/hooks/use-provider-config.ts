import { useProviderContext } from "@/providers/provider-provider";
import { useMemo } from "react";
import { ProviderConfiguration } from "@/types/provider";

export function useProviderConfig(providerId: string | null) {
  const { configurations, updateConfiguration, connections, testConnection } =
    useProviderContext();

  const config = useMemo(() => {
    if (!providerId) return {};
    return configurations[providerId] || {};
  }, [configurations, providerId]);

  const connection = useMemo(() => {
    if (!providerId) return null;
    return connections[providerId] || null;
  }, [connections, providerId]);

  const update = (newConfig: Partial<ProviderConfiguration>) => {
    if (!providerId) return;
    updateConfiguration(providerId, { ...config, ...newConfig });
  };

  const test = () => {
    if (!providerId) return;
    testConnection(providerId);
  };

  return {
    config,
    connection,
    update,
    test,
  };
}
