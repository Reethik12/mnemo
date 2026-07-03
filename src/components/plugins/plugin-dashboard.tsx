"use client";

import { usePlugin } from "@/hooks/use-plugin";
import { Button } from "@/components/ui/button";

export function PluginDashboard() {
  const { plugins, mcpTools, togglePlugin } = usePlugin();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Left Columns: Plugin Marketplace Installed list */}
      <div className="flex flex-col gap-6 md:col-span-2">
        <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Plugin Catalog & Marketplace
            </h3>
            <p className="text-text-secondary text-xs">
              Extend Mnemo memory workflows integrations
            </p>
          </div>

          <div className="space-y-4">
            {plugins.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
                <p className="text-text-secondary text-xs">
                  No plugins registered in repository
                </p>
              </div>
            ) : (
              plugins.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${
                          p.isActive
                            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                            : "text-text-muted border-white/5"
                        }`}
                      >
                        {p.isActive ? "Active" : "Disabled"}
                      </span>
                      <h5 className="text-xs font-semibold text-white">
                        {p.name}
                      </h5>
                    </div>
                    <p className="text-text-secondary mt-1 text-xs">
                      {p.description}
                    </p>
                    <span className="text-text-muted mt-2 inline-block font-mono text-[10px]">
                      Manifest: v{p.version}
                    </span>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 text-[10px]"
                    onClick={() => togglePlugin(p.id, !p.isActive)}
                  >
                    {p.isActive ? "Disable" : "Enable"}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Column: MCP Server configurations tool discovery */}
      <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
        <div>
          <h3 className="text-sm font-semibold text-white">MCP Server Tools</h3>
          <p className="text-text-secondary text-xs">
            Model Context Protocol tool discovery schema
          </p>
        </div>

        <div className="space-y-3">
          {mcpTools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-white/5 bg-white/5 p-4"
            >
              <h5 className="font-mono text-xs font-semibold text-white">
                {tool.name}
              </h5>
              <p className="text-text-secondary mt-1 text-xs">
                {tool.description}
              </p>
              <div className="mt-3">
                <span className="text-text-muted text-[10px]">
                  Expected parameters:
                </span>
                <pre className="text-text-secondary mt-1 overflow-x-auto rounded bg-black/30 p-2 font-mono text-[9px]">
                  {JSON.stringify(tool.inputSchema, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
