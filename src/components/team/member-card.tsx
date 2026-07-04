"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MemberCardProps {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
  avatar?: string | null;
  workspaceId: string;
  onRoleChange: (
    id: string,
    newRole: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER",
  ) => void;
  onRemove: (id: string) => void;
  canManage: boolean;
}

export function MemberCard({
  id,
  name,
  email,
  role,
  avatar,
  workspaceId,
  onRoleChange,
  onRemove,
  canManage,
}: MemberCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    try {
      const newRole = e.target.value;
      const res = await fetch("/api/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId, memberId: id, role: newRole }),
      });
      if (res.ok) {
        onRoleChange(id, newRole as "OWNER" | "ADMIN" | "EDITOR" | "VIEWER");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(
        `/api/members?workspaceId=${workspaceId}&memberId=${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        onRemove(id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-surface/20 flex items-center justify-between rounded-xl border border-white/5 p-4 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="bg-accent-purple/20 text-accent-purple border-accent-purple/10 flex h-10 w-10 items-center justify-center rounded-full border font-semibold">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover"
            />
          ) : name ? (
            name[0].toUpperCase()
          ) : (
            email[0].toUpperCase()
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">
            {name || "Pending user"}
          </h4>
          <p className="text-text-secondary text-xs">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {canManage && role !== "OWNER" ? (
          <>
            <select
              value={role}
              disabled={isUpdating}
              onChange={handleRoleChange}
              className="bg-surface border-border text-text-primary rounded-lg border px-2 py-1 text-xs focus:outline-none"
            >
              <option value="VIEWER">Viewer</option>
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Admin</option>
            </select>
            <Button
              variant="secondary"
              size="sm"
              disabled={isUpdating}
              onClick={handleRemove}
              className="hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-400"
            >
              Remove
            </Button>
          </>
        ) : (
          <span className="text-text-secondary rounded-lg border border-white/5 bg-white/5 px-2 py-1 text-xs">
            {role}
          </span>
        )}
      </div>
    </div>
  );
}
