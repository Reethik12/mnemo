"use client";

import {
  useRecommendations,
  useSchedules,
  useRuntimeStatistics,
  useDecision,
} from "@/hooks/use-runtime";
import { useAgent } from "@/hooks/use-agent";
import { ApprovalCenter } from "./approval-center";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function RuntimeDashboard() {
  const { statistics } = useRuntimeStatistics();
  const { recommendations } = useRecommendations();
  const { schedules, createSchedule, toggleSchedule, deleteSchedule } =
    useSchedules();
  const { activeAgent } = useAgent();
  const { decisions } = useDecision();
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false);

  // Form states
  const [cron, setCron] = useState("0 0 * * *");
  const [taskType, setTaskType] = useState("Memory Clean-up & Tag Refinement");

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAgent?.id) return;
    try {
      await createSchedule(activeAgent.id, cron, taskType);
      setIsCreatingSchedule(false);
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    {
      label: "Memory Utilized",
      value: `${statistics.memoryUsedMB} MB`,
      sub: "Max allocation sandbox 512MB",
    },
    {
      label: "Execution Cpu",
      value: `${statistics.cpuPercent}%`,
      sub: "Continuous cycles checks",
    },
    {
      label: "Automated Jobs",
      value: `${statistics.activeJobs} Active`,
      sub: "Scheduled triggers",
    },
    {
      label: "Decisions Decided",
      value: `${decisions.length} Logs`,
      sub: "Safety checks logged",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Telemetry row */}
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
            <p className="text-text-muted mt-1 text-[10px]">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left column: Approvals and Recommendations */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Safety Gate: Approval Center
            </h3>
            <ApprovalCenter />
          </div>

          <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Proactive Suggestions (Recommendation Center)
            </h3>
            <div className="space-y-4">
              {recommendations.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-white/5 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-accent-purple/10 text-accent-purple rounded px-2 py-0.5 text-[9px] font-semibold uppercase">
                      {r.type}
                    </span>
                    <span className="text-text-muted text-[10px]">
                      Confidence: {(r.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <h5 className="mt-2 text-xs font-semibold text-white">
                    {r.title}
                  </h5>
                  <p className="text-text-secondary mt-1 text-xs">
                    {r.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Scheduling */}
        <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Scheduled Automation
              </h3>
              <p className="text-text-secondary text-xs">
                Cron-like background workflows triggers
              </p>
            </div>
            {activeAgent && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreatingSchedule(true)}
              >
                Add Schedule
              </Button>
            )}
          </div>

          {isCreatingSchedule ? (
            <form
              onSubmit={handleCreateSchedule}
              className="flex flex-col gap-3"
            >
              <Input
                label="Cron Expression"
                required
                value={cron}
                onChange={(e) => setCron(e.target.value)}
              />
              <Input
                label="Task Type"
                required
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              />
              <div className="mt-1 flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreatingSchedule(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Schedule
                </Button>
              </div>
            </form>
          ) : (
            <div className="custom-scrollbar max-h-[300px] space-y-3 overflow-y-auto pr-2">
              {schedules.length === 0 ? (
                <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
                  <p className="text-text-secondary text-xs">
                    No automated schedules configured
                  </p>
                </div>
              ) : (
                schedules.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
                  >
                    <div>
                      <h5 className="text-xs font-semibold text-white">
                        {s.taskType}
                      </h5>
                      <p className="text-text-secondary mt-1 font-mono text-[10px]">
                        Cron: {s.cron}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className={`h-7 text-[10px] ${s.isActive ? "border-emerald-500/20 text-emerald-400" : ""}`}
                        onClick={() => toggleSchedule(s.id, !s.isActive)}
                      >
                        {s.isActive ? "Active" : "Disabled"}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 border-red-500/20 text-[10px] text-red-400 hover:bg-red-500/10"
                        onClick={() => deleteSchedule(s.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
