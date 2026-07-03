"use client";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Platform Administration
        </h2>
        <p className="text-text-secondary text-sm">
          Overview global statistics, inspect multi-tenant organizations billing
          structures, and manage license keys.
        </p>
      </div>

      <AdminDashboard />
    </div>
  );
}
