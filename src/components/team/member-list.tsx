"use client";

import { MemberCard } from "./member-card";

interface Member {
  id: string;
  role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

interface MemberListProps {
  members: Member[];
  workspaceId: string;
  onRoleChange: (
    id: string,
    newRole: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER",
  ) => void;
  onRemove: (id: string) => void;
  canManage: boolean;
}

export function MemberList({
  members,
  workspaceId,
  onRoleChange,
  onRemove,
  canManage,
}: MemberListProps) {
  if (members.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5">
        <p className="text-text-secondary text-sm">No members found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          id={member.id}
          name={member.user.name || ""}
          email={member.user.email}
          role={member.role}
          avatar={member.user.image}
          workspaceId={workspaceId}
          onRoleChange={onRoleChange}
          onRemove={onRemove}
          canManage={canManage}
        />
      ))}
    </div>
  );
}
