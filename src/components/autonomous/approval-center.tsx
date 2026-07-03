"use client";

import { useDecision } from "@/hooks/use-runtime";
import { Button } from "@/components/ui/button";

export function ApprovalCenter() {
  const { decisions, approveDecision, rejectDecision } = useDecision();

  const pending = decisions.filter((d) => d.status === "PENDING_APPROVAL");

  if (pending.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
        <p className="text-text-secondary text-xs">
          No pending operations require manual overrides
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {pending.map((d) => (
        <div
          key={d.id}
          className="bg-surface/20 flex items-center justify-between gap-4 rounded-xl border border-white/5 p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-red-500/20 bg-red-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-red-400">
                Requires Override
              </span>
              <h5 className="text-xs font-semibold text-white">{d.action}</h5>
            </div>
            <p className="text-text-secondary mt-1 text-[10px]">
              Risk:{" "}
              <span className="font-medium text-red-400">
                {(d.riskScore * 100).toFixed(0)}%
              </span>{" "}
              | Confidence: {(d.confidence * 100).toFixed(0)}%
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-7 border-red-500/20 text-[10px] text-red-400 hover:bg-red-500/10"
              onClick={() => rejectDecision(d.id)}
            >
              Block
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="h-7 border-emerald-500/20 bg-emerald-500/20 text-[10px] text-emerald-400 hover:bg-emerald-500/30"
              onClick={() => approveDecision(d.id)}
            >
              Authorize
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
