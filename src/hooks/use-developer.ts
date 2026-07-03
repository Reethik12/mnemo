"use client";

import { useDeveloperContext } from "@/providers/developer-provider";
import { useMemo } from "react";

export function useDeveloper() {
  const { keys, usage, isLoading, createKey, revokeKey } =
    useDeveloperContext();

  const metrics = useMemo(() => {
    return {
      usageRatio: usage ? (usage.usageCount / usage.limitQuota) * 100 : 0,
      activeKeys: keys.length,
      deliveriesCount: usage ? usage.webhookDeliveries : 0,
    };
  }, [keys, usage]);

  return {
    keys,
    usage,
    metrics,
    isLoading,
    createKey,
    revokeKey,
  };
}
