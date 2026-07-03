"use client";

import { useDeveloper } from "@/hooks/use-developer";
import { APIKeysManager } from "./api-keys";

export function DeveloperDashboard() {
  const { usage, metrics } = useDeveloper();

  const sdksList = [
    { name: "TypeScript SDK", ver: "v1.0.0", size: "12 KB", link: "#" },
    { name: "Python SDK", ver: "v1.0.0", size: "18 KB", link: "#" },
    { name: "Go SDK (Alpha)", ver: "v0.1.2", size: "9 KB", link: "#" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Sidebar developer keys */}
      <div className="flex flex-col gap-6 md:col-span-2">
        <APIKeysManager />

        {/* Usage statistics */}
        <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-sm font-semibold text-white">
            Usage & Quotas limits
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <span className="text-text-secondary text-[10px] font-semibold uppercase">
                Total Requests
              </span>
              <p className="mt-1 text-xl font-bold text-white">
                {usage?.usageCount || 0}
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="bg-accent-purple h-full rounded-full"
                  style={{ width: `${metrics.usageRatio}%` }}
                />
              </div>
              <p className="text-text-muted mt-1 text-[9px]">
                Limit: {usage?.limitQuota || 10000} monthly queries
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <span className="text-text-secondary text-[10px] font-semibold uppercase">
                Webhooks Executed
              </span>
              <p className="mt-1 text-xl font-bold text-white">
                {metrics.deliveriesCount}
              </p>
              <p className="text-text-muted mt-4 text-[9px]">
                Average response duration: 180ms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: SDK downloads and resources */}
      <div className="flex flex-col gap-6">
        <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <h3 className="mb-4 text-sm font-semibold text-white">
            Official Developer SDKs
          </h3>

          <div className="space-y-3">
            {sdksList.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
              >
                <div>
                  <h5 className="text-xs font-semibold text-white">{s.name}</h5>
                  <p className="text-text-secondary font-mono text-[10px]">
                    {s.ver} | {s.size}
                  </p>
                </div>
                <button className="text-accent-purple text-[10px] font-semibold hover:underline">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <h3 className="mb-2 text-sm font-semibold text-white">
            Webhooks Events Subscriptions
          </h3>
          <p className="text-text-secondary mb-4 text-xs">
            Deliver real-time triggers to external API services
          </p>
          <div className="space-y-2">
            {[
              "MemoryCreated",
              "MemoryUpdated",
              "ConversationCreated",
              "WorkflowCompleted",
            ].map((evt) => (
              <div
                key={evt}
                className="flex items-center justify-between border-b border-white/5 pb-1.5 text-[10px]"
              >
                <span className="font-mono text-white">{evt}</span>
                <span className="font-medium text-emerald-400">Listening</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
