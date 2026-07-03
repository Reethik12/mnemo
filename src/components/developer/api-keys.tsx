"use client";

import { useDeveloper } from "@/hooks/use-developer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function APIKeysManager() {
  const { keys, createKey, revokeKey } = useDeveloper();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [scope, setScope] = useState<"READ_ONLY" | "FULL_ACCESS">("READ_ONLY");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createKey(name, scope);
      setIsCreating(false);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-surface/10 flex flex-col gap-4 rounded-2xl border border-white/5 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            API Authentication Keys
          </h3>
          <p className="text-text-secondary text-xs">
            Integrate Mnemo client services
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsCreating(true)}>
          Create Key
        </Button>
      </div>

      {isCreating ? (
        <form onSubmit={handleCreate} className="mt-2 flex flex-col gap-3">
          <Input
            label="Key Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <label className="text-text-secondary mb-1 block text-xs font-medium">
              Access Scope
            </label>
            <select
              value={scope}
              onChange={(e) =>
                setScope(e.target.value as "READ_ONLY" | "FULL_ACCESS")
              }
              className="bg-surface border-border text-text-primary focus:ring-accent-purple w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            >
              <option value="READ_ONLY">READ_ONLY</option>
              <option value="FULL_ACCESS">FULL_ACCESS</option>
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
              Generate
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {keys.length === 0 ? (
            <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/5 bg-white/5">
              <p className="text-text-secondary text-xs">
                No API keys registered
              </p>
            </div>
          ) : (
            keys.map((k) => (
              <div
                key={k.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4"
              >
                <div>
                  <h5 className="text-xs font-semibold text-white">{k.name}</h5>
                  <p className="text-text-secondary mt-1 inline-block rounded bg-black/30 px-2 py-0.5 font-mono text-[10px]">
                    {k.key}
                  </p>
                  <span className="text-accent-purple bg-accent-purple/10 ml-2 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase">
                    {k.scope}
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-7 border-red-500/20 text-[10px] text-red-400 hover:bg-red-500/10"
                  onClick={() => revokeKey(k.id)}
                >
                  Revoke
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
