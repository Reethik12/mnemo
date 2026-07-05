"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { getShareUrl } from "@/lib/url";

type Member = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: "owner" | "admin" | "editor" | "viewer";
  joinedAt: string;
};

export function OrganizationPanel() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const { success, error } = useToast();

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/permissions/members");
      if (res.ok) {
        setMembers(await res.json());
      }
    } catch {
      error("Failed to fetch workspace members");
    } finally {
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchMembers();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchMembers]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setIsInviting(true);
    try {
      const res = await fetch("/api/permissions/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });
      if (res.ok) {
        success(`Invited ${inviteEmail} to workspace`);
        setInviteEmail("");
        await fetchMembers();
      } else {
        error("Failed to invite member");
      }
    } catch {
      error("Failed to invite member");
    } finally {
      setIsInviting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl("invite/workspace-join-xyz"));
    success("✓ Invite link copied to clipboard");
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/permissions/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        success("Member role updated");
        await fetchMembers();
      }
    } catch {
      error("Failed to update role");
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      const res = await fetch(`/api/permissions/members?userId=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        success("Member removed from workspace");
        await fetchMembers();
      }
    } catch {
      error("Failed to remove member");
    }
  };

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      <div className="glass glow-border rounded-2xl bg-white/5 p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-white">Invite Members</h2>
        <form onSubmit={handleInvite} className="flex gap-4">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Email address..."
            className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-white outline-none focus:bg-white/10"
            required
          />
          <button
            type="submit"
            disabled={isInviting}
            className="bg-accent-purple hover:bg-accent-purple-hover shadow-accent-purple/20 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-colors disabled:opacity-50"
          >
            {isInviting ? "Inviting..." : "Invite by Email"}
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-xl bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/20"
          >
            Copy Invite Link
          </button>
        </form>
      </div>

      <div className="glass glow-border overflow-hidden rounded-2xl bg-white/5">
        <div className="border-b border-white/10 p-6">
          <h2 className="text-xl font-bold text-white">Workspace Members</h2>
        </div>

        {isLoading ? (
          <div className="text-text-secondary p-6 text-center">
            Loading members...
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-6 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 font-bold text-white shadow-lg">
                    {member.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      {member.userName}
                    </h4>
                    <span className="text-text-secondary text-sm">
                      {member.userEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleChangeRole(member.userId, e.target.value)
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-white/20 focus:bg-white/10"
                  >
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>

                  <button
                    onClick={() => handleRemoveMember(member.userId)}
                    className="text-text-secondary p-2 transition-colors hover:text-red-400"
                    title="Remove Member"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
