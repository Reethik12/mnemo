export type PermissionLevel =
  "viewer" | "commenter" | "editor" | "admin" | "owner";

export type SpaceVisibility =
  "private" | "shared" | "workspace" | "public_link" | "invite_only";

export interface MemorySpace {
  id: string;
  name: string;
  description: string;
  visibility: SpaceVisibility;
  ownerId: string;
  memberCount: number;
  memoryCount: number;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface AccessRequest {
  id: string;
  spaceId: string;
  spaceName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
}

export interface SpaceMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  role: PermissionLevel;
  joinedAt: string;
}

export interface ShareLink {
  id: string;
  spaceId: string;
  url: string;
  expiresAt?: string;
  accessLevel: PermissionLevel;
  active: boolean;
}
