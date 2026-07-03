"use client";

import { useAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function AdminDashboard() {
  const { telemetry, organizations, createOrganization } = useAdmin();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<"FREE" | "PRO" | "ENTERPRISE">("FREE");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization(name, plan);
      setIsCreating(false);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    { label: "Total Platform Users", value: telemetry?.usersCount || 0 },
    { label: "Workspace Instances", value: telemetry?.workspacesCount || 0 },
    {
      label: "Tenant Organizations",
      value: telemetry?.organizationsCount || 0,
    },
    {
      label: "Monthly Recurring Revenue",
      value: `$${telemetry?.monthlyRecurringRevenueUSD || 0}`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Platform numbers row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((c) => (
          <div
            key={c.label}
            className="bg-surface/20 rounded-xl border border-white/5 p-5"
          >
            <p className="text-text-secondary text-[10px] font-semibold tracking-wider uppercase">
              {c.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-white">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column: Organization Tenants Management */}
        <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Active Tenants
              </h3>
              <p className="text-text-secondary text-xs">
                Organizations namespaces list
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreating(true)}
            >
              New Org
            </Button>
          </div>

          {isCreating ? (
            <form onSubmit={handleCreate} className="mt-2 flex flex-col gap-3">
              <Input
                label="Organization Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div>
                <label className="text-text-secondary mb-1 block text-xs font-medium">
                  Billing Tier
                </label>
                <select
                  value={plan}
                  onChange={(e) =>
                    setPlan(e.target.value as "FREE" | "PRO" | "ENTERPRISE")
                  }
                  className="bg-surface border-border text-text-primary focus:ring-accent-purple w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                >
                  <option value="FREE">FREE</option>
                  <option value="PRO">PRO</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                </select>
              </div>
              <div className="mt-1 flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Create
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
                >
                  <div>
                    <h5 className="text-xs font-semibold text-white">
                      {org.name}
                    </h5>
                    <p className="text-text-secondary mt-1 font-mono text-[10px]">
                      {org.id}
                    </p>
                  </div>
                  <span className="text-accent-purple bg-accent-purple/10 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase">
                    {org.billingPlan}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Billing & Subscriptions breakdown */}
        <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Billing Plans Tier Distribution
            </h3>
            <p className="text-text-secondary text-xs">
              Active customers usage brackets
            </p>
          </div>

          <div className="space-y-3">
            {Object.entries(telemetry?.activePlansDistribution || {}).map(
              ([planName, count]) => (
                <div
                  key={planName}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
                >
                  <span className="font-mono text-xs font-semibold text-white">
                    {planName}
                  </span>
                  <span className="text-text-secondary text-xs font-semibold">
                    {count} Tenants
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
