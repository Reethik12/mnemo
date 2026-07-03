export type WorkspaceRole = "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";

export type PermissionAction =
  | "read:memory"
  | "write:memory"
  | "delete:memory"
  | "manage:workspace"
  | "invite:members"
  | "manage:providers"
  | "manage:settings";

export const ROLE_PERMISSIONS: Record<WorkspaceRole, PermissionAction[]> = {
  OWNER: [
    "read:memory",
    "write:memory",
    "delete:memory",
    "manage:workspace",
    "invite:members",
    "manage:providers",
    "manage:settings",
  ],
  ADMIN: [
    "read:memory",
    "write:memory",
    "delete:memory",
    "invite:members",
    "manage:providers",
    "manage:settings",
  ],
  EDITOR: ["read:memory", "write:memory"],
  VIEWER: ["read:memory"],
};
