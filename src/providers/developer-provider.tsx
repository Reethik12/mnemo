import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useWorkspace } from "@/hooks/use-workspace";
import { type APIKey } from "@/types/platform";

interface DeveloperUsage {
  usageCount: number;
  limitQuota: number;
  activeKeysCount: number;
  webhookDeliveries: number;
}

interface DeveloperContextType {
  keys: APIKey[];
  usage: DeveloperUsage | null;
  isLoading: boolean;
  loadKeys: () => Promise<void>;
  loadUsage: () => Promise<void>;
  createKey: (name: string, scope: string) => Promise<void>;
  revokeKey: (id: string) => Promise<void>;
}

const DeveloperContext = createContext<DeveloperContextType | null>(null);

export function DeveloperProvider({ children }: { children: ReactNode }) {
  const { activeWorkspace } = useWorkspace();
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [usage, setUsage] = useState<DeveloperUsage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const workspaceId = activeWorkspace?.id;

  const loadKeys = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(`/api/developer/keys?workspaceId=${workspaceId}`);
      const payload = await res.json();
      if (payload.success) {
        setKeys(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [workspaceId]);

  const loadUsage = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(
        `/api/developer/usage?workspaceId=${workspaceId}`,
      );
      const payload = await res.json();
      if (payload.success) {
        setUsage(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [workspaceId]);

  const createKey = useCallback(
    async (name: string, scope = "READ_ONLY") => {
      try {
        const res = await fetch("/api/developer/keys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceId, name, scope }),
        });
        if (res.ok) {
          await loadKeys();
          await loadUsage();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [workspaceId, loadKeys, loadUsage],
  );

  const revokeKey = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/developer/keys?id=${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          await loadKeys();
          await loadUsage();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadKeys, loadUsage],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (workspaceId) {
        setIsLoading(true);
        Promise.all([loadKeys(), loadUsage()]).finally(() =>
          setIsLoading(false),
        );
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [workspaceId, loadKeys, loadUsage]);

  const value = useMemo(
    () => ({
      keys,
      usage,
      isLoading,
      loadKeys,
      loadUsage,
      createKey,
      revokeKey,
    }),
    [keys, usage, isLoading, loadKeys, loadUsage, createKey, revokeKey],
  );

  return (
    <DeveloperContext.Provider value={value}>
      {children}
    </DeveloperContext.Provider>
  );
}

export function useDeveloperContext() {
  const ctx = useContext(DeveloperContext);
  if (!ctx) {
    throw new Error(
      "useDeveloperContext must be used within a DeveloperProvider",
    );
  }
  return ctx;
}
