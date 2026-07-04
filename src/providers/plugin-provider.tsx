import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { type PlatformPlugin } from "@/types/platform";
import { type MCPTool } from "@/lib/mcp/server";

interface PluginContextType {
  plugins: PlatformPlugin[];
  mcpTools: MCPTool[];
  isLoading: boolean;
  loadPlugins: () => Promise<void>;
  loadMCPTools: () => Promise<void>;
  togglePlugin: (id: string, isActive: boolean) => Promise<void>;
}

const PluginContext = createContext<PluginContextType | null>(null);

export function PluginProvider({ children }: { children: ReactNode }) {
  const [plugins, setPlugins] = useState<PlatformPlugin[]>([]);
  const [mcpTools, setMcpTools] = useState<MCPTool[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPlugins = useCallback(async () => {
    try {
      const res = await fetch("/api/plugins");
      const payload = await res.json();
      if (payload.success) {
        setPlugins(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadMCPTools = useCallback(async () => {
    try {
      const res = await fetch("/api/mcp");
      const payload = await res.json();
      if (payload.success) {
        setMcpTools(payload.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const togglePlugin = useCallback(
    async (id: string, isActive: boolean) => {
      try {
        const res = await fetch("/api/plugins/install", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, isActive }),
        });
        if (res.ok) {
          await loadPlugins();
        }
      } catch (err) {
        console.error(err);
      }
    },
    [loadPlugins],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
      const loadAll = async () => {
        try {
          await Promise.all([loadPlugins(), loadMCPTools()]);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      loadAll();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadPlugins, loadMCPTools]);

  const value = useMemo(
    () => ({
      plugins,
      mcpTools,
      isLoading,
      loadPlugins,
      loadMCPTools,
      togglePlugin,
    }),
    [plugins, mcpTools, isLoading, loadPlugins, loadMCPTools, togglePlugin],
  );

  return (
    <PluginContext.Provider value={value}>{children}</PluginContext.Provider>
  );
}

export function usePluginContext() {
  const ctx = useContext(PluginContext);
  if (!ctx) {
    throw new Error("usePluginContext must be used within a PluginProvider");
  }
  return ctx;
}
