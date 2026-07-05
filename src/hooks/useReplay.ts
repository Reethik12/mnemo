import { useState, useCallback } from "react";
import type { MemoryReplay, CompareResult } from "@/services/timeline/types";
import { useToast } from "@/hooks/use-toast";

export function useReplay() {
  const [replay, setReplay] = useState<MemoryReplay | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compareResult, setCompareResult] = useState<CompareResult | null>(
    null,
  );
  const { success, error } = useToast();

  const fetchReplay = useCallback(async (memoryId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/timeline/replay?id=${memoryId}`);
      if (res.ok) {
        const data = await res.json();
        setReplay(data);
      } else {
        setReplay(null);
      }
    } catch (err) {
      console.error(err);
      setReplay(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const compareVersions = useCallback(
    async (memoryId: string, v1: string, v2: string) => {
      try {
        const res = await fetch(
          `/api/timeline/compare?id=${memoryId}&v1=${v1}&v2=${v2}`,
        );
        if (res.ok) {
          const data = await res.json();
          setCompareResult(data);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const restoreVersion = useCallback(
    async (memoryId: string, versionId: string) => {
      try {
        const res = await fetch("/api/timeline/restore", {
          method: "POST",
          body: JSON.stringify({ memoryId, versionId }),
        });
        if (res.ok) {
          success("Successfully restored version!");
          await fetchReplay(memoryId);
          return true;
        }
      } catch {
        error("Failed to restore version");
      }
      return false;
    },
    [fetchReplay, success, error],
  );

  const forgetMemory = useCallback(
    async (memoryId: string) => {
      try {
        const res = await fetch("/api/timeline/forget", {
          method: "POST",
          body: JSON.stringify({ memoryId }),
        });
        if (res.ok) {
          success("Memory forgotten entirely.");
          return true;
        }
      } catch {
        error("Failed to forget memory");
      }
      return false;
    },
    [success, error],
  );

  return {
    replay,
    isLoading,
    compareResult,
    setCompareResult,
    fetchReplay,
    compareVersions,
    restoreVersion,
    forgetMemory,
  };
}
