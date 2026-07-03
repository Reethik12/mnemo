import { db } from "@/lib/db";
import {
  ROLE_PERMISSIONS,
  type PermissionAction,
  type WorkspaceRole,
} from "./roles";

export class PermissionService {
  /**
   * Resolve user role inside a workspace
   */
  static async getUserRole(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceRole | null> {
    // Direct owner verification if the user created the workspace
    const workspace = await db.workspace.findFirst({
      where: { id: workspaceId, userId },
    });

    if (workspace) return "OWNER";

    const membership = await db.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId,
        },
      },
    });

    return membership ? (membership.role as WorkspaceRole) : null;
  }

  /**
   * Assert user permission context inside a workspace
   */
  static async hasPermission(
    userId: string,
    workspaceId: string,
    action: PermissionAction,
  ): Promise<boolean> {
    const role = await this.getUserRole(userId, workspaceId);
    if (!role) return false;

    const permissions = ROLE_PERMISSIONS[role];
    return permissions.includes(action);
  }
}
