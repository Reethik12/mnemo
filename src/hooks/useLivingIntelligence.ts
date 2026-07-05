import { useState, useEffect, useCallback } from "react";
import type { IntelligenceData } from "@/services/living-intelligence/types";

export function useLivingIntelligence() {
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIntelligence = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // First trigger graph improvement asynchronously without blocking
      fetch("/api/living/refresh", { method: "POST" }).catch(console.error);

      // Fetch the unified analyze route that calls getLivingIntelligenceData()
      const res = await fetch("/api/living/analyze");
      if (!res.ok) throw new Error("Failed to fetch living intelligence data");

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIntelligence();
  }, [fetchIntelligence]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchIntelligence,
  };
}
