"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getShareUrl } from "@/lib/url";

interface InviteDialogProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  onInviteSent: () => void;
}

export function InviteDialog({
  workspaceId,
  isOpen,
  onClose,
  onInviteSent,
}: InviteDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "EDITOR" | "VIEWER">("VIEWER");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [inviteToken, setInviteToken] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInviteToken("");
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to invite user");
      }
      setInviteToken(data.data.token);
      onInviteSent();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-overlay/80 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-semibold text-white">
            Invite Team Member
          </h3>
          <button
            onClick={onClose}
            className="text-text-secondary transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>

        {inviteToken ? (
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-xs text-green-400">
              Invitation Link Generated Successfully!
            </p>
            <div className="bg-surface/50 flex items-center gap-2 rounded-lg border border-white/5 p-3">
              <input
                type="text"
                readOnly
                value={getShareUrl(`welcome?invite=${inviteToken}`)}
                className="text-text-primary w-full bg-transparent text-xs focus:outline-none"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    getShareUrl(`welcome?invite=${inviteToken}`),
                  );
                }}
              >
                Copy
              </Button>
            </div>
            <Button variant="primary" className="mt-2" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <label className="text-text-secondary mb-1 block text-xs font-medium">
                Workspace Role
              </label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "ADMIN" | "EDITOR" | "VIEWER")
                }
                className="bg-surface border-border text-text-primary focus:ring-accent-purple w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              >
                <option value="VIEWER">Viewer (Read-only)</option>
                <option value="EDITOR">
                  Editor (Create & Update Memories)
                </option>
                <option value="ADMIN">
                  Admin (Manage settings & invite others)
                </option>
              </select>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="mt-2 flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" isLoading={isLoading}>
                Send Invitation
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
