"use client";

import { useProviderContext } from "@/providers/provider-provider";
import { ProviderLoading } from "@/components/provider/provider-loading";
import { ProviderDashboard } from "@/components/provider/provider-dashboard";

export default function ProvidersPage() {
  const { loading, error } = useProviderContext();

  if (loading) return <ProviderLoading />;

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <span className="mb-4 text-4xl">⚠️</span>
          <h2 className="text-error mb-2 text-lg font-semibold">
            Failed to load Provider Engine
          </h2>
          <p className="text-text-secondary text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in h-full w-full overflow-hidden p-6 duration-500">
      <ProviderDashboard />
    </div>
  );
}
