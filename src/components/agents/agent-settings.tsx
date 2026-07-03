"use client";

import { useState } from "react";
import { type Agent } from "@/types/agent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AgentSettingsProps {
  agent: Agent;
  onUpdate: (id: string, updates: Partial<Agent>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function AgentSettings({
  agent,
  onUpdate,
  onDelete,
}: AgentSettingsProps) {
  const [name, setName] = useState(agent.name);
  const [identity, setIdentity] = useState(agent.identity);
  const [description, setDescription] = useState(agent.description);
  const [instructions, setInstructions] = useState(
    agent.instructions.join("\n"),
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(agent.id, {
        name,
        identity,
        description,
        instructions: instructions.split("\n").filter((i) => i.trim() !== ""),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Agent Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Agent Identity"
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
      />
      <Input
        label="Description"
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
          rows={5}
          className="bg-surface border-border text-text-primary focus:ring-accent-purple w-full rounded-lg border px-3 py-2 font-mono text-sm focus:ring-1 focus:outline-none"
        />
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
        <Button
          variant="secondary"
          onClick={() => onDelete(agent.id)}
          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
        >
          Delete Agent
        </Button>
        <Button variant="primary" onClick={handleSave} isLoading={isUpdating}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
