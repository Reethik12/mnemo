import { MOCK_SPACES, MOCK_ACCESS_REQUESTS, MOCK_MEMBERS } from "./mock-data";
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

  async approveRequest(requestId: string): Promise<boolean> {
    const req = MOCK_ACCESS_REQUESTS.find((r) => r.id === requestId);
    if (req) {
      req.status = "approved";
      return true;
    }
    return false;
  }

  async rejectRequest(requestId: string): Promise<boolean> {
    const req = MOCK_ACCESS_REQUESTS.find((r) => r.id === requestId);
    if (req) {
      req.status = "rejected";
      return true;
    }
    return false;
  }

  async generateShareLink(
    spaceId: string,
    level: PermissionLevel,
  ): Promise<ShareLink> {
    return {
      id: `link-${Date.now()}`,
      spaceId,
      url: `https://mnemo.ai/share/${Math.random().toString(36).substring(7)}`,
      accessLevel: level,
      active: true,
    };
  }
}

export const permissionsService = new PermissionsService();
