"use client";

import { RuntimeDashboard } from "@/components/autonomous/runtime-dashboard";

export default function AutonomousPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Autonomous Intelligence & Safety Gates
        </h2>
        <p className="text-text-secondary text-sm">
          Track background scheduler runtimes, approve high risk suggestions,
          and evaluate sandbox boundaries.
        </p>
      </div>

      <RuntimeDashboard />
    </div>
  );
}
