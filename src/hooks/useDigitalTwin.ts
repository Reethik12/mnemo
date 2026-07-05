import { useState, useCallback, useEffect } from "react";
import type {
  TwinStats,
  SecurityMetrics,
  AuditLogEntry,
  TwinChatResponse,
} from "@/services/digital-twin/types";
import { useToast } from "@/hooks/use-toast";

export function useDigitalTwin() {
  const [stats, setStats] = useState<TwinStats | null>(null);
  const [security, setSecurity] = useState<SecurityMetrics | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error } = useToast();

  const fetchTwinData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/digital-twin");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setSecurity(data.security);
        setAuditLogs(data.audit);
      }
    } catch (err) {
      console.error(err);
      error("Failed to fetch digital twin data");
    } finally {
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchTwinData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchTwinData]);

  const chatWithTwin = async (
    message: string,
    isTeam: boolean = false,
  ): Promise<TwinChatResponse | null> => {
    try {
      const res = await fetch("/api/digital-twin/chat", {
        method: "POST",
        body: JSON.stringify({ message, isTeam }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      error("Failed to communicate with Digital Twin");
    }
    return null;
  };

  return {
    stats,
    security,
    auditLogs,
    isLoading,
    chatWithTwin,
    refetch: fetchTwinData,
  };
}
