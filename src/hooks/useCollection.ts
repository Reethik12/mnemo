import { useState, useEffect } from "react";
import type { MemoryCollection } from "@/services/exchange/types";
import { useToast } from "@/hooks/use-toast";

export function useCollection(id: string) {
  const [collection, setCollection] = useState<MemoryCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    async function fetchCollection() {
      try {
        const res = await fetch(`/api/exchange/collection?id=${id}`);
        if (res.ok) {
          const json = await res.json();
          setCollection(json);
        } else {
          error("Failed to load collection");
        }
      } catch {
        error("Failed to load collection");
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchCollection();
  }, [id, error]);

  const importCollection = async () => {
    setIsImporting(true);
    try {
      const res = await fetch("/api/exchange/import", {
        method: "POST",
        body: JSON.stringify({ collectionId: id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        success(data.message);
      } else {
        error(data.error || "Failed to import");
      }
    } catch {
      error("Failed to import");
    } finally {
      setIsImporting(false);
    }
  };

  const forkCollection = async () => {
    try {
      const res = await fetch("/api/exchange/fork", {
        method: "POST",
        body: JSON.stringify({ collectionId: id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        success(data.message);
      } else {
        error(data.error || "Failed to fork");
      }
    } catch {
      error("Failed to fork");
    }
  };

  return {
    collection,
    isLoading,
    isImporting,
    importCollection,
    forkCollection,
  };
}
