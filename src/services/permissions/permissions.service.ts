import {
  MOCK_SPACES,
  MOCK_ACCESS_REQUESTS,
  MOCK_MEMBERS,
  removeAccessRequest,
  addSpaceMember,
  addAccessRequest,
} from "./mock-data";
import { addAuditLog } from "../digital-twin/mock-data";
import type {
  MemorySpace,
  AccessRequest,
  SpaceMember,
  ShareLink,
  PermissionLevel,
} from "./types";

export class PermissionsService {
  async getSpaces(): Promise<MemorySpace[]> {
    return MOCK_SPACES;
  }

  async getAccessRequests(): Promise<AccessRequest[]> {
    return MOCK_ACCESS_REQUESTS;
  }

  async getSpaceMembers(spaceId: string): Promise<SpaceMember[]> {
    return MOCK_MEMBERS[spaceId] || [];
  }

  async createAccessRequest(spaceId: string, reason: string): Promise<boolean> {
    const space = MOCK_SPACES.find((s) => s.id === spaceId);
    if (space) {
      addAccessRequest({
        id: `req-${Date.now()}`,
        spaceId,
        spaceName: space.name,
        userId: "user-new",
        userName: "Guest User",
        userEmail: "guest@example.com",
        reason,
        status: "pending",
        requestedAt: new Date().toISOString(),
      });
      return true;
    }
    return false;
  }

  async approveRequest(requestId: string): Promise<boolean> {
    const req = MOCK_ACCESS_REQUESTS.find((r) => r.id === requestId);
    if (req) {
      removeAccessRequest(requestId);
      addSpaceMember(req.spaceId, {
        id: `mem-${Date.now()}`,
        userId: req.userId,
        userName: req.userName,
        userEmail: req.userEmail,
        role: "viewer",
        joinedAt: new Date().toISOString(),
      });
      addAuditLog(
        "grant",
        `Memory Space: ${req.spaceName}`,
        req.userName,
        "Approved access request",
      );
      return true;
    }
    return false;
  }

  async rejectRequest(requestId: string): Promise<boolean> {
    const req = MOCK_ACCESS_REQUESTS.find((r) => r.id === requestId);
    if (req) {
      removeAccessRequest(requestId);
      addAuditLog(
        "remove",
        `Memory Space: ${req.spaceName}`,
        req.userName,
        "Rejected access request",
      );
      return true;
    }
    return false;
  }

  async generateShareLink(
    spaceId: string,
    level: PermissionLevel,
  ): Promise<ShareLink> {
    const space = MOCK_SPACES.find((s) => s.id === spaceId);
    addAuditLog(
      "share",
      `Memory Space: ${space?.name || spaceId}`,
      "Current User",
      `Generated ${level} share link`,
    );
    return {
      id: `link-${Date.now()}`,
      spaceId,
      url: `http://localhost:3000/share/${Math.random().toString(36).substring(7)}`,
      accessLevel: level,
      active: true,
    };
  }
}

export const permissionsService = new PermissionsService();
