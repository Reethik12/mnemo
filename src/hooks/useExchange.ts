import { useState, useEffect } from "react";
import type { MemoryCollection } from "@/services/exchange/types";
import { useToast } from "@/hooks/use-toast";

export function useExchange() {
  const [data, setData] = useState<{
    trending: MemoryCollection[];
    featured: MemoryCollection[];
    recent: MemoryCollection[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { error } = useToast();

  useEffect(() => {
    async function fetchExchange() {
      try {
        const res = await fetch("/api/exchange/collections");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          error("Failed to load exchange");
        }
      } catch {
        error("Failed to load exchange");
      } finally {
        setIsLoading(false);
      }
    }
    fetchExchange();
  }, [error]);

  return { data, isLoading };
}
