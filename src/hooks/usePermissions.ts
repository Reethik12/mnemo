import { useState, useCallback, useEffect } from "react";
import type {
  MemorySpace,
  AccessRequest,
  PermissionLevel,
  ShareLink,
} from "@/services/permissions/types";
import { useToast } from "@/hooks/use-toast";

export function usePermissions() {
  const [spaces, setSpaces] = useState<MemorySpace[]>([]);
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToast();

  const fetchPermissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const [spacesRes, requestsRes] = await Promise.all([
        fetch("/api/permissions"),
        fetch("/api/permissions/requests"),
      ]);

      if (spacesRes.ok && requestsRes.ok) {
        setSpaces(await spacesRes.json());
        setRequests(await requestsRes.json());
      }
    } catch (err) {
      console.error(err);
      error("Failed to fetch permissions data");
    } finally {
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchPermissions();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchPermissions]);

  const respondToRequest = async (
    requestId: string,
    action: "approve" | "reject",
  ) => {
    try {
      const res = await fetch("/api/permissions/requests/respond", {
        method: "POST",
        body: JSON.stringify({ requestId, action }),
      });
      if (res.ok) {
        success(`Request ${action}d successfully`);
        await fetchPermissions();
        return true;
      }
    } catch {
      error(`Failed to ${action} request`);
    }
    return false;
  };

  const generateShareLink = async (
    spaceId: string,
    level: PermissionLevel,
  ): Promise<ShareLink | null> => {
    try {
      const res = await fetch("/api/permissions/share", {
        method: "POST",
        body: JSON.stringify({ spaceId, level }),
      });
      if (res.ok) {
        success("Share link generated!");
        return await res.json();
      }
    } catch {
      error("Failed to generate share link");
    }
    return null;
  };

  return {
    spaces,
    requests,
    isLoading,
    respondToRequest,
    generateShareLink,
    refetch: fetchPermissions,
  };
}
