"use client";

import { usePluginContext } from "@/providers/plugin-provider";

export function usePlugin() {
  const { plugins, mcpTools, togglePlugin, isLoading } = usePluginContext();

  return {
    plugins,
    mcpTools,
    togglePlugin,
    isLoading,
  };
}
