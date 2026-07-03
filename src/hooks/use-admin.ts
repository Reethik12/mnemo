"use client";

import { useAdminContext } from "@/providers/admin-provider";

export function useAdmin() {
  const { telemetry, organizations, isLoading, createOrganization } =
    useAdminContext();

  return {
    telemetry,
    organizations,
    isLoading,
    createOrganization,
  };
}
