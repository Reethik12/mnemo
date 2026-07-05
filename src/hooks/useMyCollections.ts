import { useState, useEffect, useCallback } from "react";
import type { MemoryCollection } from "@/services/exchange/types";

export function useMyCollections() {
  const [collections, setCollections] = useState<MemoryCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollections = useCallback(async () => {
    try {
      const res = await fetch("/api/exchange/my-collections", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setCollections(data);
      }
    } catch (err) {
      console.error("Failed to fetch my collections", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCollections();
  }, [fetchCollections]);

  return { collections, isLoading, refetch: fetchCollections };
}
