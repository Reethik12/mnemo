"use client";

import { useEffect, useState } from "react";
import { useAgent } from "@/hooks/use-agent";
import { usePlanner } from "@/hooks/use-planner";
import { GoalCard } from "./goal-card";
import { TaskList } from "./task-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PlannerDashboard() {
  const { activeAgent } = useAgent();
  const {
    goals,
    tasks,
    loadGoals,
    createGoal,
    activeGoal,
    setActiveGoal,
    updateTaskStatus,
  } = usePlanner();
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  useEffect(() => {
    if (activeAgent?.id) {
      loadGoals(activeAgent.id);
    }
  }, [activeAgent?.id, loadGoals]);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAgent?.id) return;
    try {
      await createGoal(activeAgent.id, title, description, priority);
      setIsCreating(false);
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskStatusChange = async (taskId: string, status: string) => {
    await updateTaskStatus(taskId, status);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Sidebar goals listing */}
      <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Active Goals</h3>
            <p className="text-text-secondary text-xs">
              Decomposed targets for: {activeAgent?.name || "None"}
            </p>
          </div>
          {activeAgent && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreating(true)}
            >
              New Goal
            </Button>
          )}
        </div>

        {isCreating ? (
          <form
            onSubmit={handleCreateGoal}
            className="mt-2 flex flex-col gap-3"
          >
            <Input
              label="Goal Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <label className="text-text-secondary mb-1 block text-xs font-medium">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
                }
                className="bg-surface border-border text-text-primary focus:ring-accent-purple w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
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
                Decompose
              </Button>
            </div>
          </form>
        ) : (
          <div className="custom-scrollbar flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-2">
            {goals.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
                <p className="text-text-secondary text-xs">No goals defined</p>
              </div>
            ) : (
              goals.map((g) => (
                <GoalCard
                  key={g.id}
                  goal={g}
                  isActive={g.id === activeGoal?.id}
                  onSelect={() => setActiveGoal(g)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Main planner checklist workspace */}
      <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md md:col-span-2">
        {activeGoal ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {activeGoal.title}
                </h3>
                <p className="text-text-secondary text-xs">
                  {activeGoal.description}
                </p>
              </div>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-0.5 text-xs text-blue-400">
                {activeGoal.status}
              </span>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold text-white">
                Decomposed Plan (Checklist & Dependencies)
              </h4>
              <TaskList tasks={tasks} onUpdateStatus={handleTaskStatusChange} />
            </div>
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center">
            <p className="text-text-secondary text-sm">
              Select a planning goal to view execution details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
