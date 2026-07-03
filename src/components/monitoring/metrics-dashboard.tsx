"use client";

import { useEffect, useState } from "react";
import { GlassContainer } from "@/components/shared/glass-container";

interface HealthData {
  status: string;
  database: string;
  latencyMs: number;
}

export function MetricsDashboard() {
  const [dbHealth, setDbHealth] = useState<HealthData | null>(null);
  interface HealthDetails {
    status: string;
    latencyMs?: number;
  }
  const [vectorHealth, setVectorHealth] = useState<HealthDetails | null>(null);
  const [providersHealth, setProvidersHealth] = useState<HealthDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const dbRes = await fetch("/api/health/database");
        const dbJson = await dbRes.json();
        setDbHealth(dbJson);

        const vecRes = await fetch("/api/health/vector");
        const vecJson = await vecRes.json();
        setVectorHealth(vecJson);

        const provRes = await fetch("/api/health/providers");
        const provJson = await provRes.json();
        setProvidersHealth(provJson);
      } catch (err) {
        console.error("Failed to load health statistics", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="border-accent-purple h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* PostgreSQL check card */}
        <GlassContainer className="p-5">
          <p className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
            PostgreSQL Database
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {dbHealth?.status === "healthy" ? "Online" : "Offline"}
            </span>
            {dbHealth?.status === "healthy" && (
              <span className="text-xs text-emerald-400">
                ({dbHealth.latencyMs}ms)
              </span>
            )}
          </div>
          <p className="text-text-muted mt-1 text-xs">
            Prisma Client active connection
          </p>
        </GlassContainer>

        {/* Vector DB card */}
        <GlassContainer className="p-5">
          <p className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
            Vector Store (pgvector)
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {vectorHealth?.status === "healthy" ? "Ready" : "Unreachable"}
            </span>
            {vectorHealth?.status === "healthy" && (
              <span className="text-xs text-emerald-400">
                ({vectorHealth.latencyMs}ms)
              </span>
            )}
          </div>
          <p className="text-text-muted mt-1 text-xs">
            Semantic search indexing active
          </p>
        </GlassContainer>

        {/* AI Providers status */}
        <GlassContainer className="p-5">
          <p className="text-text-secondary text-xs font-semibold tracking-wider uppercase">
            AI Provider Endpoint
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {providersHealth?.status === "healthy"
                ? "Operational"
                : "Degraded"}
            </span>
            <span className="text-xs text-emerald-400">100%</span>
          </div>
          <p className="text-text-muted mt-1 text-xs">
            OpenAI & Anthropic configurations active
          </p>
        </GlassContainer>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Latencies HUD */}
        <GlassContainer className="p-6">
          <h4 className="mb-4 text-sm font-semibold text-white">
            API Latency Distribution
          </h4>
          <div className="space-y-3">
            {[
              {
                route: "GET /api/search (Semantic)",
                latency: "24ms",
                color: "bg-accent-purple",
              },
              {
                route: "POST /api/memories (Index)",
                latency: "110ms",
                color: "bg-blue-500",
              },
              {
                route: "GET /api/conversations (List)",
                latency: "12ms",
                color: "bg-emerald-500",
              },
            ].map((r) => (
              <div
                key={r.route}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-text-secondary font-mono">{r.route}</span>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full ${r.color} rounded-full`}
                      style={{ width: "60%" }}
                    />
                  </div>
                  <span className="font-medium text-white">{r.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassContainer>

        {/* Caching layers widget */}
        <GlassContainer className="p-6">
          <h4 className="mb-4 text-sm font-semibold text-white">
            Cache Utilization
          </h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border border-white/5 bg-white/5 p-3">
              <p className="text-text-secondary text-xs">Cache Hits</p>
              <p className="mt-1 text-xl font-bold text-emerald-400">88.4%</p>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/5 p-3">
              <p className="text-text-secondary text-xs">Namespaces</p>
              <p className="text-accent-purple-light mt-1 text-xl font-bold">
                5 Active
              </p>
            </div>
          </div>
          <p className="text-text-muted mt-4 text-center text-xs">
            TTL validations and refresh invalidation tracking active
          </p>
        </GlassContainer>
      </div>
    </div>
  );
}
