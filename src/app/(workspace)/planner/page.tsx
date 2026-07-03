"use client";

import { PlannerDashboard } from "@/components/planner/planner-dashboard";

export default function PlannerPage() {
  return (
    <div className="flex-1 space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Agent Planning & Task Engine
        </h2>
        <p className="text-text-secondary text-sm">
          Track agent goal plans, execution dependency chains, and progress
          checklists.
        </p>
      </div>

      <PlannerDashboard />
    </div>
  );
}
