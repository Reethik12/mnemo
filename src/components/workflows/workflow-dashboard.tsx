"use client";

import { useEffect, useState } from "react";
import { useOrchestrator } from "@/hooks/use-orchestrator";
import { WorkflowCard } from "./workflow-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type WorkflowStep, type Workflow } from "@/types/orchestrator";

interface AuditLogEntry {
  id: string;
  action: string;
  timestamp: string | number | Date;
}

export function WorkflowDashboard() {
  const {
    workflows,
    createWorkflow,
    activeWorkflow,
    setActiveWorkflow,
    updateStepStatus,
    loadHistory,
    history,
  } = useOrchestrator();
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [name, setName] = useState("");

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const steps: WorkflowStep[] = [
        {
          id: "step_1",
          agentId: "agent_researcher",
          action: "Search context archives",
          status: "READY",
        },
        {
          id: "step_2",
          agentId: "agent_editor",
          action: "Draft consolidate summaries",
          dependsOn: ["step_1"],
          status: "PENDING",
        },
      ];
      await createWorkflow(name, steps);
      setIsCreating(false);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStepRun = async (stepId: string) => {
    if (!activeWorkflow) return;
    await updateStepStatus(activeWorkflow.id, stepId, "RUNNING");
  };

  const handleStepComplete = async (stepId: string) => {
    if (!activeWorkflow) return;
    await updateStepStatus(activeWorkflow.id, stepId, "COMPLETED", {
      outputSize: 1240,
    });
  };

  useEffect(() => {
    if (activeWorkflow) {
      loadHistory(activeWorkflow.id);
    }
  }, [activeWorkflow, loadHistory]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Sidebar workflows panel */}
      <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Workflows</h3>
            <p className="text-text-secondary text-xs">
              Multi-agent orchestrations
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreating(true)}
          >
            New
          </Button>
        </div>

        {isCreating ? (
          <form
            onSubmit={handleCreateWorkflow}
            className="mt-2 flex flex-col gap-3"
          >
            <Input
              label="Workflow Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          <div className="custom-scrollbar flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-2">
            {workflows.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
                <p className="text-text-secondary text-xs">
                  No workflows configured
                </p>
              </div>
            ) : (
              workflows.map((w: Workflow) => (
                <WorkflowCard
                  key={w.id}
                  workflow={w}
                  isActive={w.id === activeWorkflow?.id}
                  onSelect={() => setActiveWorkflow(w)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Main timeline planner checklist */}
      <div className="bg-surface/10 flex flex-col gap-6 rounded-2xl border border-white/5 p-6 backdrop-blur-md md:col-span-2">
        {activeWorkflow ? (
          <>
            <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {activeWorkflow.name}
                </h3>
                <p className="text-text-secondary text-xs">
                  Orchestrated status checkpoints tracker
                </p>
              </div>
              <span className="bg-accent-purple/10 text-accent-purple border-accent-purple/20 rounded-full border px-3 py-0.5 text-xs">
                {activeWorkflow.status}
              </span>
            </div>

            {/* Steps execution queue timeline */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">
                Workflow Execution Steps
              </h4>
              <div className="space-y-4">
                {activeWorkflow.steps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-surface/20 flex items-center justify-between gap-4 rounded-xl border border-white/5 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${
                            step.status === "COMPLETED"
                              ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                              : step.status === "RUNNING"
                                ? "text-accent-purple border-accent-purple/20 bg-accent-purple/5 animate-pulse"
                                : "text-text-muted border-white/5 bg-white/5"
                          }`}
                        >
                          {step.status}
                        </span>
                        <h5 className="text-xs font-semibold text-white">
                          {step.action}
                        </h5>
                      </div>
                      <p className="text-text-secondary mt-1 font-mono text-[10px]">
                        Assigned Agent: {step.agentId}
                      </p>
                    </div>

                    {step.status !== "COMPLETED" && (
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-7 text-[10px]"
                          onClick={() => handleStepRun(step.id)}
                        >
                          Start Step
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="h-7 border-emerald-500/20 bg-emerald-500/20 text-[10px] text-emerald-400 hover:bg-emerald-500/30"
                          onClick={() => handleStepComplete(step.id)}
                        >
                          Complete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Checkpoint info panel */}
            {activeWorkflow.checkpoint && (
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <h5 className="mb-2 text-xs font-semibold text-white">
                  Workflow Checkpoint (Serialization)
                </h5>
                <pre className="text-text-secondary overflow-x-auto rounded-lg bg-black/20 p-3 font-mono text-[10px]">
                  {JSON.stringify(activeWorkflow.checkpoint, null, 2)}
                </pre>
              </div>
            )}

            {/* Auditing panel */}
            <div>
              <h4 className="mb-2 text-xs font-semibold text-white">
                Execution Logs Audit Trail
              </h4>
              <div className="custom-scrollbar max-h-[150px] space-y-2 overflow-y-auto pr-2">
                {history.map((item) => {
                  const log = item as unknown as AuditLogEntry;
                  return (
                    <div
                      key={log.id}
                      className="flex justify-between border-b border-white/5 pb-1 text-[10px]"
                    >
                      <span className="text-text-secondary font-mono">
                        {log.action}
                      </span>
                      <span className="text-text-muted">
                        {new Date(log.timestamp || log.id).toLocaleTimeString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center">
            <p className="text-text-secondary text-sm">
              Select a workflow sequence to manage checkpoints
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
