"use client";

import { useState } from "react";
import { useAgent } from "@/hooks/use-agent";
import { AgentList } from "./agent-list";
import { AgentSettings } from "./agent-settings";
import { AgentSession } from "./agent-session";
import { AgentStatistics } from "./agent-statistics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAgentContext } from "@/providers/agent-provider";
import { type AgentStatus, type Agent } from "@/types/agent";

export function AgentDashboard() {
  const {
    agents,
    activeAgent,
    setActiveAgent,
    createAgent,
    deleteAgent,
    isLoading,
  } = useAgent();
  const { updateAgentStatus, refreshAgents } = useAgentContext();
  const [activeTab, setActiveTab] = useState<
    "session" | "statistics" | "settings"
  >("session");
  const [isCreating, setIsCreating] = useState(false);

  // Creation State
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAgent({
        name,
        type: "ASSISTANT",
        identity,
        description,
        instructions: instructions.split("\n").filter((i) => i.trim() !== ""),
        capabilities: ["Text Generation"],
        memoryScope: "workspace",
        modelId: null,
        providerId: null,
      });
      setIsCreating(false);
      setName("");
      setIdentity("");
      setDescription("");
      setInstructions("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: string, status: AgentStatus) => {
    await updateAgentStatus(id, status);
  };

  const handleSettingsUpdate = async (id: string, updates: Partial<Agent>) => {
    try {
      const res = await fetch(`/api/agents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updates,
          workspaceId: activeAgent?.workspaceId,
        }),
      });
      if (res.ok) {
        await refreshAgents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-accent-purple h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Sidebar Agents Panel */}
      <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Registered Agents
            </h3>
            <p className="text-text-secondary text-xs">
              AI processes inside this workspace
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreating(true)}
          >
            New Agent
          </Button>
        </div>

        {isCreating ? (
          <form
            onSubmit={handleCreateAgent}
            className="mt-2 flex flex-col gap-3"
          >
            <Input
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Identity"
              required
              placeholder="e.g. Memory Analyzer"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
            />
            <Input
              label="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <label className="text-text-secondary mb-1 block text-xs font-medium">
                Instructions (one per line)
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                className="bg-surface border-border text-text-primary focus:ring-accent-purple w-full rounded-lg border px-3 py-2 font-mono text-sm focus:ring-1 focus:outline-none"
              />
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
          <AgentList
            agents={agents}
            activeAgentId={activeAgent?.id}
            onSelectAgent={setActiveAgent}
          />
        )}
      </div>

      {/* Main Configurations Console */}
      <div className="bg-surface/10 rounded-2xl border border-white/5 p-6 backdrop-blur-md md:col-span-2">
        {activeAgent ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {activeAgent.name}
                </h3>
                <p className="text-text-secondary text-xs">
                  {activeAgent.identity}
                </p>
              </div>
              <span className="bg-accent-purple/15 text-accent-purple-light border-accent-purple/20 rounded-full border px-3 py-0.5 text-xs">
                {activeAgent.type}
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-white/5 pb-2">
              {["session", "statistics", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "session" | "statistics" | "settings")
                  }
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize ${
                    activeTab === tab
                      ? "bg-accent-purple/10 border-accent-purple/20 text-white"
                      : "text-text-secondary border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Panel Views */}
            {activeTab === "session" && (
              <AgentSession
                agent={activeAgent}
                onStatusChange={handleStatusChange}
              />
            )}

            {activeTab === "statistics" && (
              <AgentStatistics agentId={activeAgent.id} />
            )}

            {activeTab === "settings" && (
              <AgentSettings
                agent={activeAgent}
                onUpdate={handleSettingsUpdate}
                onDelete={deleteAgent}
              />
            )}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center">
            <p className="text-text-secondary text-sm">
              Select an agent from the registry list to modify settings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
