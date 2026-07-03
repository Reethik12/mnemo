"use client";

import { DeveloperDashboard } from "@/components/developer/developer-dashboard";

export default function DeveloperPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Developer Platform & Ecosystem
        </h2>
        <p className="text-text-secondary text-sm">
          Provision public API credentials, monitor monthly quota utilization,
          and download developer SDKs.
        </p>
      </div>

      <DeveloperDashboard />
    </div>
  );
}
