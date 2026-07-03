"use client";

import { PluginDashboard } from "@/components/plugins/plugin-dashboard";

export default function PluginsPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Extensibility Plugin & Tool Registry
        </h2>
        <p className="text-text-secondary text-sm">
          Configure third-party application connectives, inspect Model Context
          Protocol tools, and manage extensions.
        </p>
      </div>

      <PluginDashboard />
    </div>
  );
}
